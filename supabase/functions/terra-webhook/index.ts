// supabase/functions/terra-webhook/index.ts
// Receives all events from Terra API for connected wearables.
// Registered in the Terra dashboard as a webhook destination.
//
// Handles two event types:
//   user_auth  — fired when a user completes the Terra widget OAuth flow.
//                Saves terra_user_id to participants so future activity can be matched.
//   activity   — fired when a participant's device syncs activity data.
//                Extracts Zone 2 minutes and upserts into daily_movement_log.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHmac } from 'node:crypto';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);
const TERRA_SIGNING_SECRET = Deno.env.get('TERRA_WEBHOOK_SECRET')!;

// Verifies the Terra webhook signature.
// Terra sends: terra-signature: t=<timestamp>,v1=<hmac_sha256(<timestamp>.<body>)>
function verifySignature(body: string, header: string | null): boolean {
  if (!header) return false;

  const parts = Object.fromEntries(
    header.split(',').map(p => p.split('=') as [string, string])
  );
  const timestamp = parts['t'];
  const v1 = parts['v1'];

  if (!timestamp || !v1) return false;

  const expected = createHmac('sha256', TERRA_SIGNING_SECRET)
    .update(`${timestamp}.${body}`)
    .digest('hex');

  // Constant-time comparison to prevent timing attacks
  if (expected.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ v1.charCodeAt(i);
  }
  return diff === 0;
}

Deno.serve(async (req) => {
  const body = await req.text();
  const sigHeader = req.headers.get('terra-signature');

  if (!verifySignature(body, sigHeader)) {
    console.error('Invalid Terra signature');
    return new Response('Invalid signature', { status: 401 });
  }

  const payload = JSON.parse(body);
  const { type, user, data } = payload;

  // ── user_auth: a new user connected via Terra Widget ─────────────────────
  // Save their terra_user_id so future activity webhooks can be matched.
  // reference_id is the Supabase user.id we passed when generating the widget session.
  if (type === 'user_auth') {
    const referenceId = payload.reference_id ?? user?.reference_id;

    if (!referenceId || !user?.user_id) {
      console.error('user_auth missing reference_id or user_id');
      return new Response('OK');
    }

    const { error } = await supabase
      .from('participants')
      .update({
        terra_user_id: user.user_id,
        terra_connected_at: new Date().toISOString(),
        terra_provider: user.provider ?? null,
      })
      .eq('user_id', referenceId);

    if (error) {
      console.error('Failed to save terra_user_id from user_auth:', error);
      // Return 200 so Terra doesn't retry — the save-terra-connection function
      // is the primary path; this is a belt-and-suspenders backup.
    }

    return new Response('OK');
  }

  // ── activity: device sync with heart rate data ────────────────────────────
  if (type !== 'activity' || !data?.length) {
    return new Response('OK');
  }

  // Match Terra user to REAP participant via terra_user_id
  const { data: participant } = await supabase
    .from('participants')
    .select('id, zone2_hr_low, zone2_hr_high')
    .eq('terra_user_id', user.user_id)
    .single();

  if (!participant) {
    console.error('Participant not found for terra_user_id:', user.user_id);
    return new Response('Participant not found', { status: 404 });
  }

  for (const activity of data) {
    const logDate = activity.metadata.start_time.split('T')[0];
    const hrSamples = activity.heart_rate_data?.detailed?.hr_samples ?? [];

    if (!hrSamples.length) continue;

    // Calculate the longest continuous Zone 2 run in this activity.
    // A gap between samples of >60s resets the streak (capped to avoid false runs).
    let maxContinuousSeconds = 0;
    let currentRun = 0;
    let prevTime: number | null = null;

    for (const sample of hrSamples) {
      const ts = new Date(sample.timestamp).getTime();
      const duration = prevTime ? Math.min((ts - prevTime) / 1000, 60) : 5;
      prevTime = ts;

      const inZone2 =
        sample.bpm >= participant.zone2_hr_low &&
        sample.bpm <= participant.zone2_hr_high;

      if (inZone2) {
        currentRun += duration;
        maxContinuousSeconds = Math.max(maxContinuousSeconds, currentRun);
      } else {
        currentRun = 0;
      }
    }

    const zone2MinutesContinuous = Math.floor(maxContinuousSeconds / 60);
    const summaryInterval = activity.metadata.summary_interval ?? 5;
    const zone2MinutesTotal = hrSamples.filter((s: { bpm: number }) =>
      s.bpm >= participant.zone2_hr_low && s.bpm <= participant.zone2_hr_high
    ).length * summaryInterval / 60;

    const { error } = await supabase
      .from('daily_movement_log')
      .upsert({
        participant_id: participant.id,
        log_date: logDate,
        zone2_minutes_continuous: zone2MinutesContinuous,
        zone2_minutes_total: Math.round(zone2MinutesTotal),
        peak_hr: activity.heart_rate_data?.summary?.max_hr_bpm ?? null,
        average_hr: activity.heart_rate_data?.summary?.avg_hr_bpm ?? null,
        steps: activity.distance_data?.detailed?.step_samples?.reduce(
          (sum: number, s: { steps: number }) => sum + s.steps, 0
        ) ?? null,
        data_source: user.provider,
        synced_at: new Date().toISOString(),
      }, { onConflict: 'participant_id,log_date' });

    if (error) {
      console.error('Failed to upsert daily_movement_log:', error);
    }
  }

  return new Response('OK');
});
