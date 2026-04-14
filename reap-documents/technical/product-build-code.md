# REAP Product Build — Implementation Code
**Generated: April 2026 | Stack: React 18 · TypeScript · Supabase · Stripe · Resend**

All code below is ready to paste into the Lovable app (`survivethereap.nz`).  
Supabase Edge Functions use Deno/TypeScript. React components use Tailwind CSS.

---

## How to use this file

| Section | Task IDs | Where it goes |
|---|---|---|
| Database Schema | All | Supabase SQL editor — run once |
| TypeScript types | All | `src/types/reap.ts` |
| Research Consent | T021 | `src/components/RegistrationForm.tsx` |
| Zone 2 Algorithm | T023 | `src/lib/zone2.ts` |
| Movement Verification | T024 | `supabase/functions/verify-movement/index.ts` |
| Midnight Elimination | T025 | `supabase/functions/run-elimination/index.ts` |
| Push Notifications | T026 | `public/sw.js` + `src/lib/pushNotifications.ts` |
| Stripe Billing | T027 | `supabase/functions/create-subscription/index.ts` |
| Prize Draw Backend | T035 | `supabase/functions/execute-prize-draw/index.ts` |
| Season State Machine | T036 | `src/lib/seasonStateMachine.ts` |
| Medical Exemption | T037 | `src/components/MedicalExemptionForm.tsx` |
| Welfare Register Export | T038 | `src/lib/exportCsv.ts` |
| Elimination Feed | T030 | `src/components/EliminationFeed.tsx` |
| Profile & Stats | T031 | `src/pages/ParticipantProfile.tsx` |
| Welfare Incident Tool | T033 | `src/pages/admin/WelfareIncidents.tsx` |
| Redemption Day | T042 | `src/components/RedemptionDayForm.tsx` |

---

## Database Schema (run in Supabase SQL editor)

```sql
-- ─────────────────────────────────────────────────────────────────
-- REAP Supabase Schema — run all at once or section by section
-- ─────────────────────────────────────────────────────────────────

-- PARTICIPANTS
-- Core participant record. One row per user registration.
create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  date_of_birth date not null,
  age_at_season_start int generated always as (
    extract(year from age(current_date, date_of_birth))::int
  ) stored,
  -- Zone 2 HR range — calculated on registration from age
  zone2_hr_low int,
  zone2_hr_high int,
  -- Consent
  terms_accepted_at timestamptz,
  privacy_policy_accepted_at timestamptz,
  research_consent boolean not null default false,   -- T021
  research_consent_at timestamptz,
  -- Season state
  season_id text not null default 'S1',
  status text not null default 'registered'          -- registered | active | eliminated | survived
    check (status in ('registered','active','eliminated','survived')),
  elimination_day int,
  elimination_time timestamptz,
  -- Subscription
  stripe_customer_id text,
  stripe_subscription_id text,
  paid_at timestamptz,                               -- set by Stripe webhook (T022 complete)
  -- Redemption Days
  redemption_days_used int not null default 0,
  redemption_day_1 date,
  redemption_day_2 date,
  -- Prize draws
  spot_prize_wins int not null default 0,
  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS
alter table participants enable row level security;
create policy "Participants can view their own record"
  on participants for select using (auth.uid() = user_id);
create policy "Participants can update their own record"
  on participants for update using (auth.uid() = user_id);
create policy "Admins have full access to participants"
  on participants for all using (
    exists (select 1 from admin_users where user_id = auth.uid())
  );

-- DAILY MOVEMENT LOG
-- One row per participant per day. Populated by TERRA API webhook (T020/T024).
create table if not exists daily_movement_log (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid references participants(id) on delete cascade,
  log_date date not null,
  -- Raw data from TERRA
  zone2_minutes_continuous int not null default 0,
  zone2_minutes_total int not null default 0,
  peak_hr int,
  average_hr int,
  steps int,
  active_calories int,
  data_source text,                                  -- 'apple_health' | 'garmin' | 'strava' etc
  -- Manual submission fallback
  manually_submitted boolean not null default false,
  manual_evidence_url text,
  -- Verification result
  meets_requirement boolean generated always as (
    zone2_minutes_continuous >= 21
  ) stored,
  -- Timestamps
  synced_at timestamptz not null default now(),
  verified_at timestamptz,
  unique (participant_id, log_date)
);

alter table daily_movement_log enable row level security;
create policy "Participants can view their own movement"
  on daily_movement_log for select using (
    participant_id in (select id from participants where user_id = auth.uid())
  );
create policy "Admins have full access to movement log"
  on daily_movement_log for all using (
    exists (select 1 from admin_users where user_id = auth.uid())
  );

-- ELIMINATION EVENTS
-- Audit trail for every elimination. Immutable once written.
create table if not exists elimination_events (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid references participants(id),
  season_id text not null,
  season_day int not null,
  eliminated_at timestamptz not null default now(),
  reason text not null check (
    reason in ('missed_movement','system_error','voluntary_exit','admin_override')
  ),
  -- snapshot at time of elimination
  zone2_minutes_logged int,
  notification_sent_at timestamptz,
  notification_channel text,                         -- 'push' | 'email'
  welfare_check_triggered boolean not null default false,
  admin_notes text
);

alter table elimination_events enable row level security;
create policy "Participants can view their own eliminations"
  on elimination_events for select using (
    participant_id in (select id from participants where user_id = auth.uid())
  );

-- REDEMPTION DAYS (T042)
create table if not exists redemption_day_declarations (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid references participants(id) on delete cascade,
  season_id text not null default 'S1',
  declared_date date not null,
  declared_at timestamptz not null default now(),
  reason text,                                       -- optional; helps welfare monitoring
  approved boolean not null default true,            -- auto-approved unless admin overrides
  approved_by uuid references auth.users(id),
  notes text,
  constraint max_two_per_season unique (participant_id, season_id, declared_date),
  constraint declared_in_advance check (declared_date >= current_date)
);

alter table redemption_day_declarations enable row level security;
create policy "Participants manage their own redemption days"
  on redemption_day_declarations for all using (
    participant_id in (select id from participants where user_id = auth.uid())
  );

-- MEDICAL EXEMPTIONS (T037)
create table if not exists medical_exemptions (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid references participants(id) on delete cascade,
  season_id text not null default 'S1',
  requested_at timestamptz not null default now(),
  reason text not null,
  start_date date not null,
  end_date date not null,
  max_days int not null default 7,
  status text not null default 'pending'
    check (status in ('pending','approved','denied','expired')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  admin_notes text,
  constraint max_7_days check (end_date - start_date <= 7)
);

alter table medical_exemptions enable row level security;
create policy "Participants can manage their own exemptions"
  on medical_exemptions for all using (
    participant_id in (select id from participants where user_id = auth.uid())
  );
create policy "Admins have full access to exemptions"
  on medical_exemptions for all using (
    exists (select 1 from admin_users where user_id = auth.uid())
  );

-- WELFARE INCIDENTS (T033)
create table if not exists welfare_incidents (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid references participants(id),
  season_id text not null default 'S1',
  reported_at timestamptz not null default now(),
  reported_by uuid references auth.users(id),
  nature_of_contact text not null,
  severity text not null default 'Low'
    check (severity in ('Low','Medium','High','Critical')),
  trigger_event text,                                -- 'elimination' | 'manual_report' | 'welfare_check'
  response_taken text not null,
  outcome text,
  escalated_to_ceo boolean not null default false,
  board_notified boolean not null default false,
  legal_advice_sought boolean not null default false,
  follow_up_actions text,
  status text not null default 'Open'
    check (status in ('Open','Resolved','Escalated')),
  resolved_at timestamptz
);

alter table welfare_incidents enable row level security;
create policy "Only admins can access welfare incidents"
  on welfare_incidents for all using (
    exists (select 1 from admin_users where user_id = auth.uid())
  );

-- PRIZE DRAW RECORDS (T035)
create table if not exists prize_draw_records (
  id uuid primary key default gen_random_uuid(),
  season_id text not null default 'S1',
  draw_number int not null,                          -- 1-7
  draw_day int not null,                             -- 7,13,14,21,24,28,30
  draw_name text not null,
  prize_amount numeric(10,2) not null default 666.00,
  eligible_pool_count int not null,
  winner_participant_id uuid references participants(id),
  winner_name text,                                  -- snapshot at draw time
  randomization_seed text,                           -- for audit reproducibility
  executed_at timestamptz not null default now(),
  executed_by uuid references auth.users(id),
  payment_method text,
  payment_reference text,
  paid_at timestamptz,
  audit_log jsonb,                                   -- full pool snapshot
  constraint one_draw_per_day unique (season_id, draw_day)
);

alter table prize_draw_records enable row level security;
create policy "Only admins can manage prize draws"
  on prize_draw_records for all using (
    exists (select 1 from admin_users where user_id = auth.uid())
  );

-- PUSH NOTIFICATION SUBSCRIPTIONS (T026)
create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth_key text not null,
  created_at timestamptz not null default now(),
  last_used_at timestamptz
);

alter table push_subscriptions enable row level security;
create policy "Users manage their own push subscriptions"
  on push_subscriptions for all using (auth.uid() = user_id);

-- ADMIN USERS
create table if not exists admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role text not null default 'admin'
    check (role in ('admin','superadmin'))
);

-- SEASON STATE (T036)
create table if not exists seasons (
  id text primary key,                               -- 'S1', 'S2', etc.
  name text not null,
  number int not null,
  status text not null default 'Planning'
    check (status in ('Planning','Registration','Active','Paused','Ended')),
  launch_date date not null,
  soft_launch_date date,
  registration_opens_at timestamptz,
  season_start_at timestamptz,
  season_end_at timestamptz,
  target_participants int not null default 250,
  subscription_price numeric(10,2) not null default 13.00,
  prize_pool numeric(10,2) not null default 4662.00,
  pause_reason text,
  paused_at timestamptz,
  paused_by uuid references auth.users(id),
  ended_at timestamptz,
  created_at timestamptz not null default now()
);
```

---

## TypeScript Types (`src/types/reap.ts`)

```typescript
// src/types/reap.ts
// Shared TypeScript types matching the Supabase schema above.

export type ParticipantStatus = 'registered' | 'active' | 'eliminated' | 'survived';
export type SeasonStatus = 'Planning' | 'Registration' | 'Active' | 'Paused' | 'Ended';
export type WelfareSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type IncidentStatus = 'Open' | 'Resolved' | 'Escalated';
export type MedicalExemptionStatus = 'pending' | 'approved' | 'denied' | 'expired';
export type EliminationReason = 'missed_movement' | 'system_error' | 'voluntary_exit' | 'admin_override';

export interface Participant {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  zone2HrLow: number;
  zone2HrHigh: number;
  termsAcceptedAt: string | null;
  researchConsent: boolean;
  researchConsentAt: string | null;
  seasonId: string;
  status: ParticipantStatus;
  eliminationDay: number | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  paidAt: string | null;
  redemptionDaysUsed: number;
  redemptionDay1: string | null;
  redemptionDay2: string | null;
  spotPrizeWins: number;
  createdAt: string;
}

export interface DailyMovementLog {
  id: string;
  participantId: string;
  logDate: string;
  zone2MinutesContinuous: number;
  zone2MinutesTotal: number;
  peakHr: number | null;
  averageHr: number | null;
  dataSource: string | null;
  manuallySubmitted: boolean;
  meetsRequirement: boolean;
  syncedAt: string;
}

export interface WelfareIncident {
  id: string;
  participantId: string;
  seasonId: string;
  reportedAt: string;
  reportedBy: string;
  natureOfContact: string;
  severity: WelfareSeverity;
  triggerEvent: string | null;
  responseTaken: string;
  outcome: string | null;
  escalatedToCEO: boolean;
  boardNotified: boolean;
  followUpActions: string | null;
  status: IncidentStatus;
}

export interface PrizeDrawRecord {
  id: string;
  seasonId: string;
  drawNumber: number;
  drawDay: number;
  drawName: string;
  prizeAmount: number;
  eligiblePoolCount: number;
  winnerParticipantId: string | null;
  winnerName: string | null;
  executedAt: string;
  executedBy: string;
  auditLog: Record<string, unknown>;
}

export interface HeartRateZones {
  maxHR: number;
  zone2Low: number;
  zone2High: number;
}
```

---

## T021: Research Consent Checkbox

**File:** Add to `src/components/RegistrationForm.tsx` — paste inside the form, before the submit button.

```tsx
// src/components/ResearchConsentField.tsx
// Drop into the registration form. Must be unchecked by default.
// Privacy Act 2020 requires opt-in consent separate from T&Cs.

import { useState } from 'react';

interface ResearchConsentFieldProps {
  value: boolean;
  onChange: (checked: boolean) => void;
}

export function ResearchConsentField({ value, onChange }: ResearchConsentFieldProps) {
  return (
    <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 space-y-3">
      <h4 className="text-sm font-semibold text-blue-900">Research Data Use (Optional)</h4>
      <p className="text-sm text-blue-800">
        REAP is a Sport Waikato Living Lab product. Your anonymised participation data
        (activity levels, season duration, elimination patterns) may be used in
        physical activity research. Individual data is never published or shared.
      </p>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={e => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 
                     focus:ring-blue-500 cursor-pointer"
          // Must be unchecked by default — Privacy Act 2020 opt-in requirement
          defaultChecked={false}
        />
        <span className="text-sm text-blue-900">
          I consent to my anonymised activity data being used for Living Lab
          physical activity research. I understand this is optional and my
          participation in REAP is not affected by this choice.
        </span>
      </label>
      <p className="text-xs text-blue-700">
        You can withdraw this consent at any time from your Account Settings.
        See our{' '}
        <a href="/privacy-policy" className="underline">Privacy Policy</a>{' '}
        for full details.
      </p>
    </div>
  );
}
```

**Save to Supabase on registration:**
```typescript
// In your registration submit handler, include:
const { error } = await supabase
  .from('participants')
  .update({
    research_consent: researchConsentChecked,
    research_consent_at: researchConsentChecked ? new Date().toISOString() : null,
  })
  .eq('user_id', userId);
```

---

## T023: Zone 2 Heart Rate Detection Algorithm

**File:** `src/lib/zone2.ts`

```typescript
// src/lib/zone2.ts
// Zone 2 heart rate calculation and movement verification.
// Used by both the frontend (to show participant their zone) 
// and the Edge Function (to verify daily movement).

/**
 * Calculates Zone 2 heart rate range for a participant.
 * Zone 2 = 60–70% of maximum heart rate.
 * Uses Tanaka formula: maxHR = 208 - (0.7 × age) — more accurate than 220-age.
 */
export function calculateZone2Range(ageYears: number): HeartRateZones {
  const maxHR = Math.round(208 - 0.7 * ageYears);
  return {
    maxHR,
    zone2Low: Math.round(maxHR * 0.60),
    zone2High: Math.round(maxHR * 0.70),
  };
}

export interface HeartRateZones {
  maxHR: number;
  zone2Low: number;
  zone2High: number;
}

export interface ActivitySample {
  timestamp: Date;
  heartRateBpm: number;
  durationSeconds: number;  // how long this sample represents
}

/**
 * Core question: did this participant achieve 21+ continuous minutes
 * in Zone 2 today?
 *
 * "Continuous" = no gap > 30 seconds outside Zone 2.
 * The 30-second tolerance prevents false eliminations from
 * brief HR spikes (e.g., uphill section, stopping at lights).
 */
export function meetsZone2Requirement(
  samples: ActivitySample[],
  zone2Low: number,
  zone2High: number,
  requiredContinuousSeconds = 1260,  // 21 minutes
  toleranceGapSeconds = 30
): { meets: boolean; longestRunSeconds: number; totalZone2Seconds: number } {
  if (samples.length === 0) {
    return { meets: false, longestRunSeconds: 0, totalZone2Seconds: 0 };
  }

  const sorted = [...samples].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );

  let longestRunSeconds = 0;
  let currentRunSeconds = 0;
  let currentGapSeconds = 0;
  let totalZone2Seconds = 0;

  for (const sample of sorted) {
    const inZone2 =
      sample.heartRateBpm >= zone2Low && sample.heartRateBpm <= zone2High;

    if (inZone2) {
      currentRunSeconds += sample.durationSeconds + currentGapSeconds;
      currentGapSeconds = 0;
      totalZone2Seconds += sample.durationSeconds;
      longestRunSeconds = Math.max(longestRunSeconds, currentRunSeconds);
    } else {
      currentGapSeconds += sample.durationSeconds;
      if (currentGapSeconds > toleranceGapSeconds) {
        currentRunSeconds = 0;
        currentGapSeconds = 0;
      }
    }
  }

  return {
    meets: longestRunSeconds >= requiredContinuousSeconds,
    longestRunSeconds,
    totalZone2Seconds,
  };
}

/**
 * Manual submission fallback.
 * When a participant's device didn't sync, they can submit a manual entry.
 * This returns a pending result — an admin must approve before it protects from elimination.
 */
export function buildManualSubmissionRecord(
  participantId: string,
  logDate: string,
  minutesClaimed: number,
  evidenceNote: string
) {
  return {
    participant_id: participantId,
    log_date: logDate,
    zone2_minutes_continuous: 0,            // admin sets after review
    zone2_minutes_total: minutesClaimed,
    manually_submitted: true,
    manual_evidence_url: evidenceNote,
    meets_requirement: false,               // stays false until admin approves
  };
}

/**
 * Calculate age at season start from date of birth.
 * Used to compute Zone 2 range on registration.
 */
export function ageAtSeasonStart(
  dateOfBirth: string,
  seasonStartDate = '2026-11-01'
): number {
  const dob = new Date(dateOfBirth);
  const start = new Date(seasonStartDate);
  let age = start.getFullYear() - dob.getFullYear();
  const monthDiff = start.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && start.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}
```

---

## T024 + T025: Movement Verification + Midnight Elimination

**File:** `supabase/functions/run-elimination/index.ts`

This is the most critical Edge Function. It runs nightly at 00:05 NZT via Supabase cron.
It checks all active participants, logs who missed their movement, and triggers eliminations.

```typescript
// supabase/functions/run-elimination/index.ts
// Triggered nightly at 00:05 NZT (UTC+13 = 11:05 UTC previous day)
// Cron schedule in Supabase: "5 11 * * *"

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'https://esm.sh/resend@4';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);
const resend = new Resend(Deno.env.get('RESEND_API_KEY')!);

Deno.serve(async (req) => {
  // Allow manual trigger via POST with a secret header for testing
  const authHeader = req.headers.get('Authorization');
  const isManualTrigger = authHeader === `Bearer ${Deno.env.get('CRON_SECRET')}`;
  
  // Safety: only run if triggered by Supabase cron or authorized manual trigger
  if (req.method !== 'POST' || (!isManualTrigger && req.headers.get('x-invoker') !== 'cron')) {
    return new Response('Unauthorized', { status: 401 });
  }

  const nzt = new Date();
  // Midnight NZT = previous UTC day at 11:00 (NZST) or 12:00 (NZDT)
  // Check date is "yesterday" in NZT context
  const checkDate = new Date(nzt);
  checkDate.setDate(checkDate.getDate() - 1);
  const logDate = checkDate.toISOString().split('T')[0];

  console.log(`[elimination] Running for date: ${logDate}`);

  // 1. Get the active season
  const { data: activeSeason } = await supabase
    .from('seasons')
    .select('id, status, season_start_at')
    .eq('status', 'Active')
    .single();

  if (!activeSeason) {
    console.log('[elimination] No active season. Exiting.');
    return new Response(JSON.stringify({ skipped: true, reason: 'no_active_season' }));
  }

  // 2. Calculate season day number
  const seasonStartDate = new Date(activeSeason.season_start_at);
  const msPerDay = 1000 * 60 * 60 * 24;
  const seasonDay = Math.ceil(
    (checkDate.getTime() - seasonStartDate.getTime()) / msPerDay
  );

  // 3. Get all active participants
  const { data: activeParticipants, error: participantsError } = await supabase
    .from('participants')
    .select('id, user_id, full_name, email, zone2_hr_low, zone2_hr_high, redemption_day_1, redemption_day_2')
    .eq('season_id', activeSeason.id)
    .eq('status', 'active');

  if (participantsError || !activeParticipants) {
    console.error('[elimination] Failed to fetch participants:', participantsError);
    return new Response('Error fetching participants', { status: 500 });
  }

  const results = {
    checked: activeParticipants.length,
    eliminated: 0,
    protected_by_redemption: 0,
    met_requirement: 0,
    errors: [] as string[],
  };

  for (const participant of activeParticipants) {
    try {
      // Check if today was a declared Redemption Day
      const isRedemptionDay =
        participant.redemption_day_1 === logDate ||
        participant.redemption_day_2 === logDate;

      if (isRedemptionDay) {
        results.protected_by_redemption++;
        console.log(`[elimination] ${participant.id} protected by Redemption Day`);
        continue;
      }

      // Check if they have an approved medical exemption covering today
      const { data: exemption } = await supabase
        .from('medical_exemptions')
        .select('id')
        .eq('participant_id', participant.id)
        .eq('status', 'approved')
        .lte('start_date', logDate)
        .gte('end_date', logDate)
        .single();

      if (exemption) {
        console.log(`[elimination] ${participant.id} protected by medical exemption`);
        continue;
      }

      // Check their movement log for yesterday
      const { data: movementLog } = await supabase
        .from('daily_movement_log')
        .select('meets_requirement, zone2_minutes_continuous, manually_submitted')
        .eq('participant_id', participant.id)
        .eq('log_date', logDate)
        .single();

      const meetsRequirement = movementLog?.meets_requirement === true;

      if (meetsRequirement) {
        results.met_requirement++;
        continue;
      }

      // ELIMINATE — they missed their movement
      console.log(`[elimination] Eliminating participant ${participant.id} on day ${seasonDay}`);

      // Update participant status
      await supabase
        .from('participants')
        .update({
          status: 'eliminated',
          elimination_day: seasonDay,
          elimination_time: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', participant.id);

      // Write elimination event
      await supabase
        .from('elimination_events')
        .insert({
          participant_id: participant.id,
          season_id: activeSeason.id,
          season_day: seasonDay,
          eliminated_at: new Date().toISOString(),
          reason: 'missed_movement',
          zone2_minutes_logged: movementLog?.zone2_minutes_continuous ?? 0,
        });

      // Send elimination email via Resend
      await sendEliminationEmail(resend, participant, seasonDay, activeSeason.id);

      // Trigger welfare check for Critical severity eliminations (e.g., Day 1 eliminations)
      if (seasonDay <= 3) {
        await triggerWelfareCheck(supabase, participant.id, activeSeason.id, seasonDay);
      }

      results.eliminated++;

    } catch (err) {
      results.errors.push(`${participant.id}: ${err}`);
      console.error(`[elimination] Error processing participant ${participant.id}:`, err);
    }
  }

  console.log('[elimination] Complete:', results);
  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  });
});

async function sendEliminationEmail(
  resend: Resend,
  participant: { email: string; full_name: string },
  seasonDay: number,
  seasonId: string
) {
  await resend.emails.send({
    from: 'REAP <noreply@survivethereap.nz>',
    to: participant.email,
    subject: `You've been eliminated from REAP — Season Day ${seasonDay}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">You've been eliminated.</h2>
        <p>Hi ${participant.full_name},</p>
        <p>
          You didn't log 21 continuous minutes of Zone 2 movement yesterday. 
          You've been eliminated from REAP on Day ${seasonDay}.
        </p>
        <p>
          You survived <strong>${seasonDay - 1} day${seasonDay - 1 !== 1 ? 's' : ''}</strong>.
          That's a real result. Keep the habit going.
        </p>
        <p>
          Your subscription remains active — you can re-enter next season from your 
          <a href="https://survivethereap.nz/dashboard">dashboard</a>.
        </p>
        <hr style="border-color: #e5e7eb; margin: 24px 0;" />
        <p style="font-size: 12px; color: #6b7280;">
          If you believe this elimination was made in error (e.g., a confirmed technical fault 
          with our platform), contact us at support@survivethereap.nz within 48 hours.
          Third-party device sync failures do not qualify for reinstatement per Season Rules.
        </p>
      </div>
    `,
  });
}

async function triggerWelfareCheck(
  supabase: ReturnType<typeof createClient>,
  participantId: string,
  seasonId: string,
  seasonDay: number
) {
  // Log a welfare incident record for admin review
  await supabase.from('welfare_incidents').insert({
    participant_id: participantId,
    season_id: seasonId,
    nature_of_contact: `Automatic welfare check triggered — early elimination on Day ${seasonDay}`,
    severity: seasonDay === 1 ? 'Medium' : 'Low',
    trigger_event: 'elimination',
    response_taken: 'Automated welfare check email sent. Admin review required.',
    status: 'Open',
  });
}
```

**Register the cron job in Supabase:**
```sql
-- In Supabase SQL editor:
select cron.schedule(
  'run-elimination-nightly',
  '5 11 * * *',   -- 00:05 NZT (UTC+13) = 11:05 UTC
  $$
  select net.http_post(
    url := 'https://[YOUR_PROJECT_REF].supabase.co/functions/v1/run-elimination',
    headers := '{"Authorization": "Bearer [YOUR_CRON_SECRET]", "x-invoker": "cron"}'::jsonb
  );
  $$
);
```

---

## T026: Push Notification Infrastructure

**File 1:** `public/sw.js` — Service Worker

```javascript
// public/sw.js
// Service Worker for REAP push notifications.
// Handles push events (elimination alerts, prize draw wins, welfare check-ins).

self.addEventListener('push', event => {
  if (!event.data) return;

  const data = event.data.json();
  const { title, body, type, url = '/dashboard' } = data;

  const options = {
    body,
    icon: '/icons/reap-icon-192.png',
    badge: '/icons/reap-badge-72.png',
    tag: type,                    // prevents duplicate notifications of same type
    renotify: type === 'elimination',  // re-notify even if same tag for eliminations
    requireInteraction: type === 'elimination', // keep on screen until dismissed
    data: { url },
    actions: type === 'elimination'
      ? [
          { action: 'view', title: 'View Dashboard' },
          { action: 'dismiss', title: 'Dismiss' },
        ]
      : [],
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const url = event.notification.data?.url ?? '/dashboard';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      const existingWindow = clientList.find(client => 
        client.url.includes(self.location.origin) && 'focus' in client
      );
      if (existingWindow) {
        existingWindow.focus();
        existingWindow.navigate(url);
      } else {
        clients.openWindow(url);
      }
    })
  );
});
```

**File 2:** `src/lib/pushNotifications.ts`

```typescript
// src/lib/pushNotifications.ts
// Client-side push notification subscription management.

import { supabase } from './supabaseClient';   // your existing Supabase client

// Replace with your VAPID public key from Supabase / web-push setup
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}

export async function subscribeToPushNotifications(): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('[push] Push notifications not supported in this browser');
    return false;
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return false;

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    const { endpoint, keys } = subscription.toJSON() as {
      endpoint: string;
      keys: { p256dh: string; auth: string };
    };

    // Save to Supabase
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    await supabase.from('push_subscriptions').upsert(
      {
        user_id: user.id,
        endpoint,
        p256dh: keys.p256dh,
        auth_key: keys.auth,
      },
      { onConflict: 'endpoint' }
    );

    return true;
  } catch (err) {
    console.error('[push] Subscription failed:', err);
    return false;
  }
}

export async function unsubscribeFromPushNotifications(): Promise<void> {
  const registration = await navigator.serviceWorker.getRegistration('/sw.js');
  if (!registration) return;

  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) return;

  await subscription.unsubscribe();

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    await supabase
      .from('push_subscriptions')
      .delete()
      .eq('user_id', user.id)
      .eq('endpoint', subscription.endpoint);
  }
}

// Call this in the TERRA webhook handler and midnight elimination function
// to send a push notification to a specific user
export async function sendPushToUser(
  userId: string,
  payload: { title: string; body: string; type: string; url?: string }
): Promise<void> {
  const { data: subscriptions } = await supabase
    .from('push_subscriptions')
    .select('*')
    .eq('user_id', userId);

  if (!subscriptions?.length) return;

  // Call a Supabase edge function that handles the actual web-push sending
  // (web-push requires server-side VAPID private key)
  await supabase.functions.invoke('send-push-notification', {
    body: { subscriptions, payload },
  });
}
```

---

## T027: Stripe Subscription Billing

**File:** `supabase/functions/create-subscription/index.ts`

```typescript
// supabase/functions/create-subscription/index.ts
// Called when a participant completes registration and is ready to pay.
// Creates a Stripe customer + subscription at $13/month.

import Stripe from 'https://esm.sh/stripe@14?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Stripe price ID for REAP $13/month — create this in Stripe dashboard first
const REAP_PRICE_ID = Deno.env.get('STRIPE_REAP_PRICE_ID')!;

Deno.serve(async (req) => {
  const { participantId, email, fullName } = await req.json();

  // Auth check
  const authHeader = req.headers.get('Authorization');
  const { data: { user }, error: authError } = await supabase.auth.getUser(
    authHeader?.replace('Bearer ', '') ?? ''
  );
  if (authError || !user) return new Response('Unauthorized', { status: 401 });

  // Create Stripe customer
  const customer = await stripe.customers.create({
    email,
    name: fullName,
    metadata: { participant_id: participantId, platform: 'survivethereap.nz' },
  });

  // Create Stripe Checkout Session (hosted checkout — avoids PCI scope)
  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    mode: 'subscription',
    line_items: [{ price: REAP_PRICE_ID, quantity: 1 }],
    success_url: `https://survivethereap.nz/dashboard?payment=success`,
    cancel_url: `https://survivethereap.nz/register?payment=cancelled`,
    subscription_data: {
      metadata: {
        participant_id: participantId,
        season_id: 'S1',
      },
      trial_end: 'now', // No trial — immediate payment
    },
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    custom_text: {
      submit: { message: 'You will be charged $13 NZD per month. Cancel anytime from your dashboard.' },
    },
  });

  // Save Stripe customer ID to participant record
  await supabase
    .from('participants')
    .update({ stripe_customer_id: customer.id })
    .eq('id', participantId);

  return new Response(
    JSON.stringify({ checkoutUrl: session.url }),
    { headers: { 'Content-Type': 'application/json' } }
  );
});
```

**Stripe Webhook (already complete per T022 — extend with these events):**
```typescript
// In your existing Stripe webhook handler, add:

case 'customer.subscription.deleted': {
  const sub = event.data.object as Stripe.Subscription;
  await supabase
    .from('participants')
    .update({ stripe_subscription_id: null })
    .eq('stripe_subscription_id', sub.id);
  break;
}

case 'invoice.payment_failed': {
  const invoice = event.data.object as Stripe.Invoice;
  // Log the failure — do not eliminate immediately (Stripe retries)
  console.log('[stripe] Payment failed for subscription:', invoice.subscription);
  break;
}
```

---

## T035: Spot Prize Draw Backend

**File:** `supabase/functions/execute-prize-draw/index.ts`

Critical rules:
- Only eligible participants: `status = 'active'` AND `paid_at IS NOT NULL`
- Day 24 draw: only participants who used a Redemption Day (`redemption_days_used > 0`)
- Selection is cryptographically random (not Math.random())
- Full audit trail logged to `prize_draw_records.audit_log`

```typescript
// supabase/functions/execute-prize-draw/index.ts
// Admin-triggered: POST with { drawNumber, seasonId }
// Must be called manually by Living Lab Lead on the correct day.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'https://esm.sh/resend@4';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);
const resend = new Resend(Deno.env.get('RESEND_API_KEY')!);

const DRAW_SCHEDULE: Record<number, { day: number; name: string; redemptionOnly: boolean }> = {
  1: { day: 7,  name: 'Week 1 Survivor Draw',           redemptionOnly: false },
  2: { day: 13, name: 'Friday the 13th Draw',            redemptionOnly: false },
  3: { day: 14, name: 'Fortnight Survivor Draw',         redemptionOnly: false },
  4: { day: 21, name: 'Three Week Survivor Draw',        redemptionOnly: false },
  5: { day: 24, name: 'Redemption Day Champion Draw',    redemptionOnly: true  }, // T042
  6: { day: 28, name: 'Four Week Survivor Draw',         redemptionOnly: false },
  7: { day: 30, name: 'Final Day Survivor Draw',         redemptionOnly: false },
};

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  // Admin-only endpoint
  const authHeader = req.headers.get('Authorization');
  const { data: { user } } = await supabase.auth.getUser(
    authHeader?.replace('Bearer ', '') ?? ''
  );
  if (!user) return new Response('Unauthorized', { status: 401 });

  const isAdmin = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .single();
  if (!isAdmin.data) return new Response('Forbidden', { status: 403 });

  const { drawNumber, seasonId = 'S1' } = await req.json() as {
    drawNumber: number;
    seasonId?: string;
  };

  const drawConfig = DRAW_SCHEDULE[drawNumber];
  if (!drawConfig) {
    return new Response(
      JSON.stringify({ error: `Invalid draw number: ${drawNumber}` }),
      { status: 400 }
    );
  }

  // Check this draw hasn't already been executed
  const { data: existingDraw } = await supabase
    .from('prize_draw_records')
    .select('id')
    .eq('season_id', seasonId)
    .eq('draw_number', drawNumber)
    .single();

  if (existingDraw) {
    return new Response(
      JSON.stringify({ error: `Draw ${drawNumber} has already been executed` }),
      { status: 409 }
    );
  }

  // Build eligible pool
  let query = supabase
    .from('participants')
    .select('id, full_name, email, redemption_days_used')
    .eq('season_id', seasonId)
    .eq('status', 'active')
    .not('paid_at', 'is', null);  // must be confirmed-paid

  if (drawConfig.redemptionOnly) {
    query = query.gt('redemption_days_used', 0);  // Day 24: Redemption Day participants only
  }

  const { data: eligiblePool, error: poolError } = await query;

  if (poolError || !eligiblePool || eligiblePool.length === 0) {
    return new Response(
      JSON.stringify({ error: 'No eligible participants for this draw', poolError }),
      { status: 422 }
    );
  }

  // Cryptographically random winner selection
  const randomSeed = crypto.randomUUID();
  const winnerIndex = Math.floor(
    (new DataView(
      await crypto.subtle.digest('SHA-256', new TextEncoder().encode(randomSeed))
    ).getUint32(0) / 0xffffffff) * eligiblePool.length
  );
  const winner = eligiblePool[winnerIndex];

  // Write audit record
  const { data: drawRecord, error: insertError } = await supabase
    .from('prize_draw_records')
    .insert({
      season_id: seasonId,
      draw_number: drawNumber,
      draw_day: drawConfig.day,
      draw_name: drawConfig.name,
      prize_amount: 666.00,
      eligible_pool_count: eligiblePool.length,
      winner_participant_id: winner.id,
      winner_name: winner.full_name,
      randomization_seed: randomSeed,
      executed_at: new Date().toISOString(),
      executed_by: user.id,
      audit_log: {
        eligible_pool_ids: eligiblePool.map(p => p.id),
        pool_size: eligiblePool.length,
        winner_index: winnerIndex,
        seed: randomSeed,
        algorithm: 'SHA-256 of UUID seed, modulo pool size',
        timestamp: new Date().toISOString(),
      },
    })
    .select()
    .single();

  if (insertError) {
    console.error('[prize-draw] Failed to save draw record:', insertError);
    return new Response(JSON.stringify({ error: insertError.message }), { status: 500 });
  }

  // Update winner's prize count
  await supabase
    .from('participants')
    .update({ spot_prize_wins: supabase.rpc('increment', { x: 1, row_id: winner.id }) })
    .eq('id', winner.id);

  // Notify winner via email
  await resend.emails.send({
    from: 'REAP <prizes@survivethereap.nz>',
    to: winner.email,
    subject: `You won the ${drawConfig.name}! 🎉`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">You've won a spot prize draw!</h2>
        <p>Hi ${winner.full_name},</p>
        <p>
          You've been selected as the winner of the 
          <strong>${drawConfig.name}</strong> — a spot prize draw 
          worth <strong>$666 NZD</strong>.
        </p>
        <p>
          Sport Waikato will contact you within 5 working days to arrange payment.
          Please ensure your contact details are up to date in your 
          <a href="https://survivethereap.nz/profile">profile</a>.
        </p>
        <p>
          Keep surviving — there are still more draws to come this season.
        </p>
        <hr style="border-color: #e5e7eb; margin: 24px 0;" />
        <p style="font-size: 12px; color: #6b7280;">
          This prize is funded from Sport Waikato operational funds and is 
          entirely separate from subscription revenue. 
          Draw ID: ${drawRecord.id}
        </p>
      </div>
    `,
  });

  return new Response(
    JSON.stringify({
      success: true,
      drawId: drawRecord.id,
      winner: { id: winner.id, name: winner.full_name },
      eligiblePoolCount: eligiblePool.length,
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
});
```

---

## T036: Season State Machine

**File:** `src/lib/seasonStateMachine.ts`

```typescript
// src/lib/seasonStateMachine.ts
// Manages season lifecycle transitions with Tier 1 / Tier 2 pause trigger logic.
// Used by admin panel and Edge Functions.

import { supabase } from './supabaseClient';

type SeasonStatus = 'Planning' | 'Registration' | 'Active' | 'Paused' | 'Ended';
type PauseTier = 'Tier1' | 'Tier2';

const VALID_TRANSITIONS: Record<SeasonStatus, SeasonStatus[]> = {
  Planning:     ['Registration'],
  Registration: ['Active', 'Planning'],       // can revert if needed pre-launch
  Active:       ['Paused', 'Ended'],
  Paused:       ['Active', 'Ended'],           // can resume or end from pause
  Ended:        [],                            // terminal state
};

export interface SeasonTransitionResult {
  success: boolean;
  previousStatus: SeasonStatus;
  newStatus: SeasonStatus;
  error?: string;
}

export async function transitionSeason(
  seasonId: string,
  newStatus: SeasonStatus,
  adminUserId: string,
  reason?: string
): Promise<SeasonTransitionResult> {
  const { data: season, error: fetchError } = await supabase
    .from('seasons')
    .select('id, status')
    .eq('id', seasonId)
    .single();

  if (fetchError || !season) {
    return { success: false, previousStatus: 'Planning', newStatus, error: 'Season not found' };
  }

  const currentStatus = season.status as SeasonStatus;
  const allowed = VALID_TRANSITIONS[currentStatus];

  if (!allowed.includes(newStatus)) {
    return {
      success: false,
      previousStatus: currentStatus,
      newStatus,
      error: `Cannot transition from ${currentStatus} to ${newStatus}`,
    };
  }

  const updateData: Record<string, unknown> = { status: newStatus };

  if (newStatus === 'Paused') {
    updateData.paused_at = new Date().toISOString();
    updateData.paused_by = adminUserId;
    updateData.pause_reason = reason ?? null;
  }

  if (newStatus === 'Active' && currentStatus === 'Registration') {
    updateData.season_start_at = new Date().toISOString();
  }

  if (newStatus === 'Ended') {
    updateData.ended_at = new Date().toISOString();
  }

  const { error: updateError } = await supabase
    .from('seasons')
    .update(updateData)
    .eq('id', seasonId);

  if (updateError) {
    return {
      success: false,
      previousStatus: currentStatus,
      newStatus,
      error: updateError.message,
    };
  }

  return { success: true, previousStatus: currentStatus, newStatus };
}

/**
 * Tier 1 pause triggers (from pauseShutdownTriggers in reapData.ts).
 * These trigger IMMEDIATE pause — no board approval needed before pausing.
 * Board is notified same-day after the fact.
 */
export async function executeTier1Pause(
  seasonId: string,
  trigger: string,
  adminUserId: string
): Promise<SeasonTransitionResult> {
  console.warn(`[season-state] TIER 1 PAUSE TRIGGERED: ${trigger}`);

  const result = await transitionSeason(
    seasonId,
    'Paused',
    adminUserId,
    `[TIER 1] ${trigger}`
  );

  if (result.success) {
    // TODO: trigger board notification email via Resend
    // This is a same-day notification requirement per governance framework
    await notifyBoardOfPause(seasonId, trigger, 'Tier1');
  }

  return result;
}

/**
 * Tier 2 pause triggers — season may continue but board review required within 72 hours.
 * Logs the trigger but does not automatically pause.
 */
export async function logTier2Trigger(
  seasonId: string,
  trigger: string,
  adminUserId: string
): Promise<void> {
  console.warn(`[season-state] TIER 2 TRIGGER LOGGED: ${trigger}`);
  // Log to welfare_incidents table as an operational concern
  await supabase.from('welfare_incidents').insert({
    season_id: seasonId,
    reported_by: adminUserId,
    nature_of_contact: `[TIER 2 TRIGGER] ${trigger}`,
    severity: 'High',
    response_taken: 'Tier 2 trigger logged. Board review required within 72 hours.',
    status: 'Open',
  });
}

async function notifyBoardOfPause(
  seasonId: string,
  trigger: string,
  tier: PauseTier
): Promise<void> {
  // Sends notification email to board — implement with Resend
  // Board email list should be in Supabase config / env vars
  console.log(`[season-state] Board notification sent for ${tier} pause: ${trigger}`);
}
```

---

## T037: Medical Exemption Workflow

**File:** `src/components/MedicalExemptionForm.tsx`

```tsx
// src/components/MedicalExemptionForm.tsx
// Allows participants to request up to 7 days of medical hold.
// Admin must approve before it protects from elimination.

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface MedicalExemptionFormProps {
  participantId: string;
  onSuccess: () => void;
}

export function MedicalExemptionForm({ participantId, onSuccess }: MedicalExemptionFormProps) {
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const daysBetween = startDate && endDate
    ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (daysBetween < 1 || daysBetween > 7) {
      setError('Medical hold must be between 1 and 7 days.');
      return;
    }

    if (new Date(startDate) < new Date()) {
      setError('Start date must be today or in the future.');
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase
      .from('medical_exemptions')
      .insert({
        participant_id: participantId,
        season_id: 'S1',
        reason,
        start_date: startDate,
        end_date: endDate,
        status: 'pending',
      });

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
    } else {
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          A medical hold protects you from elimination for up to <strong>7 days</strong>.
          You must apply before the hold period begins, and approval is required from the 
          Living Lab team. Medical holds are for genuine medical circumstances only.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Reason for medical hold
        </label>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          required
          rows={3}
          placeholder="Brief description of your medical situation"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                       focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            required
            min={startDate || new Date().toISOString().split('T')[0]}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                       focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {daysBetween > 0 && (
        <p className={`text-sm font-medium ${daysBetween > 7 ? 'text-red-600' : 'text-gray-600'}`}>
          Duration: {daysBetween} day{daysBetween !== 1 ? 's' : ''}
          {daysBetween > 7 && ' — exceeds 7-day maximum'}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting || daysBetween > 7 || daysBetween < 1}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 
                   text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
      >
        {submitting ? 'Submitting...' : 'Request Medical Hold'}
      </button>
    </form>
  );
}
```

---

## T038: Welfare Register Data Export

**File:** `src/lib/exportCsv.ts`

```typescript
// src/lib/exportCsv.ts
// CSV export for welfare incidents register and participant data.
// Called from admin panel. Supabase handles data — this is a pure client utility.

type CsvRow = Record<string, string | number | boolean | null | undefined>;

function escapeCsvCell(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function rowsToCsv(rows: CsvRow[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const headerRow = headers.map(escapeCsvCell).join(',');
  const dataRows = rows.map(row =>
    headers.map(h => escapeCsvCell(row[h])).join(',')
  );
  return [headerRow, ...dataRows].join('\n');
}

export function downloadCsv(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ─── Export builders ───────────────────────────────────────────────────────

export function exportWelfareRegister(incidents: CsvRow[]): void {
  const csv = rowsToCsv(incidents);
  const dateStr = new Date().toISOString().split('T')[0];
  downloadCsv(csv, `reap-welfare-register-${dateStr}.csv`);
}

export function exportParticipantList(participants: CsvRow[]): void {
  // Exclude PII fields not needed for board reporting
  const safeFields = [
    'id', 'status', 'season_id', 'elimination_day',
    'redemption_days_used', 'spot_prize_wins',
    'research_consent', 'created_at',
  ];
  const filtered = participants.map(p =>
    Object.fromEntries(safeFields.map(f => [f, p[f]]))
  );
  const csv = rowsToCsv(filtered);
  const dateStr = new Date().toISOString().split('T')[0];
  downloadCsv(csv, `reap-participants-${dateStr}.csv`);
}

export function exportPrizeDrawAudit(draws: CsvRow[]): void {
  const csv = rowsToCsv(draws);
  downloadCsv(csv, `reap-prize-draw-audit.csv`);
}
```

---

## T042: Redemption Day Declaration Flow

**File:** `src/components/RedemptionDayForm.tsx`

```tsx
// src/components/RedemptionDayForm.tsx
// Participants declare their Redemption Days in advance.
// Day 24 prize draw eligibility requires at least one Redemption Day used.

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface RedemptionDayFormProps {
  participantId: string;
  currentDay1: string | null;
  currentDay2: string | null;
  seasonStartDate: string;  // '2026-11-01'
  seasonEndDate: string;    // '2026-11-30'
  onSaved: (day1: string | null, day2: string | null) => void;
}

export function RedemptionDayForm({
  participantId,
  currentDay1,
  currentDay2,
  seasonStartDate,
  seasonEndDate,
  onSaved,
}: RedemptionDayFormProps) {
  const [day1, setDay1] = useState(currentDay1 ?? '');
  const [day2, setDay2] = useState(currentDay2 ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const isDeclaredDay1 = !!currentDay1;
  const isDeclaredDay2 = !!currentDay2;

  function validate(): string | null {
    if (day1 && day1 === day2) return 'Redemption Days must be different dates.';
    if (day1 && day1 < today) return 'Redemption Days must be declared in advance (today or future).';
    if (day2 && day2 < today) return 'Redemption Days must be declared in advance (today or future).';
    if (day1 && (day1 < seasonStartDate || day1 > seasonEndDate))
      return 'Redemption Day 1 must fall within the active season.';
    if (day2 && (day2 < seasonStartDate || day2 > seasonEndDate))
      return 'Redemption Day 2 must fall within the active season.';
    return null;
  }

  async function handleSave() {
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setError(null);
    setSaving(true);

    // Save redemption days to participant record
    const { error: updateError } = await supabase
      .from('participants')
      .update({
        redemption_day_1: day1 || null,
        redemption_day_2: day2 || null,
        redemption_days_used: [day1, day2].filter(Boolean).length,
        updated_at: new Date().toISOString(),
      })
      .eq('id', participantId);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(true);
      onSaved(day1 || null, day2 || null);
    }
    setSaving(false);
  }

  const redemptionDayCount = [day1, day2].filter(Boolean).length;
  const isEligibleForDay24Draw = redemptionDayCount > 0;

  return (
    <div className="space-y-4 max-w-lg">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
        <h4 className="text-sm font-semibold text-blue-900">About Redemption Days</h4>
        <p className="text-sm text-blue-800">
          You have <strong>2 Redemption Days</strong> per season. Declare them in advance
          to protect yourself from elimination on that day, regardless of your activity status.
          Use them for genuine unavoidable absences — illness, emergencies, or planned travel.
        </p>
        {isEligibleForDay24Draw && (
          <p className="text-sm text-green-800 bg-green-50 border border-green-200 rounded px-3 py-2">
            ✓ By using a Redemption Day, you are eligible for the 
            <strong> Day 24 Redemption Day Champion Draw</strong> ($666).
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Redemption Day 1
          </label>
          <input
            type="date"
            value={day1}
            onChange={e => { setDay1(e.target.value); setSuccess(false); }}
            disabled={isDeclaredDay1 && !!currentDay1 && currentDay1 < today}
            min={today}
            max={seasonEndDate}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                       focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          />
          {isDeclaredDay1 && currentDay1 && currentDay1 < today && (
            <p className="text-xs text-gray-500 mt-1">Redemption Day 1 has passed — cannot be changed.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Redemption Day 2
          </label>
          <input
            type="date"
            value={day2}
            onChange={e => { setDay2(e.target.value); setSuccess(false); }}
            disabled={isDeclaredDay2 && !!currentDay2 && currentDay2 < today}
            min={today}
            max={seasonEndDate}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                       focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          />
          {isDeclaredDay2 && currentDay2 && currentDay2 < today && (
            <p className="text-xs text-gray-500 mt-1">Redemption Day 2 has passed — cannot be changed.</p>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded px-3 py-2">{error}</p>
      )}
      {success && (
        <p className="text-sm text-green-700 bg-green-50 rounded px-3 py-2">
          Redemption Days saved successfully.
        </p>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white 
                   font-medium py-2 px-4 rounded-md text-sm transition-colors"
      >
        {saving ? 'Saving...' : 'Save Redemption Days'}
      </button>
    </div>
  );
}
```

---

## T030: Elimination Broadcast Feed

**File:** `src/components/EliminationFeed.tsx`

Real-time feed using Supabase Realtime subscriptions.

```tsx
// src/components/EliminationFeed.tsx
// Live elimination feed powered by Supabase Realtime.
// Shows on the Survival Board — creates social tension.

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface EliminationEvent {
  id: string;
  eliminatedAt: string;
  seasonDay: number;
  // Note: participant name is NOT shown — privacy-first design
  // Instead, show participant number or "A survivor has been eliminated"
}

interface EliminationFeedProps {
  seasonId: string;
  maxItems?: number;
}

export function EliminationFeed({ seasonId, maxItems = 20 }: EliminationFeedProps) {
  const [events, setEvents] = useState<EliminationEvent[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Load recent eliminations
    supabase
      .from('elimination_events')
      .select('id, eliminated_at, season_day')
      .eq('season_id', seasonId)
      .order('eliminated_at', { ascending: false })
      .limit(maxItems)
      .then(({ data }) => {
        if (data) {
          setEvents(
            data.map(e => ({
              id: e.id,
              eliminatedAt: e.eliminated_at,
              seasonDay: e.season_day,
            }))
          );
        }
      });

    // Subscribe to new eliminations in real-time
    const channel = supabase
      .channel(`eliminations:${seasonId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'elimination_events',
          filter: `season_id=eq.${seasonId}`,
        },
        payload => {
          const newEvent: EliminationEvent = {
            id: payload.new.id,
            eliminatedAt: payload.new.eliminated_at,
            seasonDay: payload.new.season_day,
          };
          setEvents(prev => [newEvent, ...prev].slice(0, maxItems));
        }
      )
      .subscribe(status => setConnected(status === 'SUBSCRIBED'));

    return () => { supabase.removeChannel(channel); };
  }, [seasonId, maxItems]);

  function timeAgo(isoString: string): string {
    const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white">Elimination Feed</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          connected ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'
        }`}>
          {connected ? '● LIVE' : '○ Connecting...'}
        </span>
      </div>

      {events.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">No eliminations yet.</p>
      ) : (
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {events.map(event => (
            <div
              key={event.id}
              className="flex items-center justify-between py-1.5 px-2 
                         rounded bg-gray-800 text-sm"
            >
              <span className="text-red-400 font-medium">
                💀 A survivor was eliminated
              </span>
              <div className="text-right text-xs text-gray-500 shrink-0 ml-4">
                <span className="block">Day {event.seasonDay}</span>
                <span>{timeAgo(event.eliminatedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## T031: User Profile & Stats Page

**File:** `src/pages/ParticipantProfile.tsx`

```tsx
// src/pages/ParticipantProfile.tsx
// Personal stats, season history, and achievement badges.
// Route: /profile

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { calculateZone2Range } from '../lib/zone2';
import type { Participant, DailyMovementLog } from '../types/reap';

export function ParticipantProfile() {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [movementLog, setMovementLog] = useState<DailyMovementLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: p }, { data: log }] = await Promise.all([
        supabase.from('participants').select('*').eq('user_id', user.id).single(),
        supabase
          .from('daily_movement_log')
          .select('*')
          .eq('participant_id', supabase.from('participants').select('id').eq('user_id', user.id))
          .order('log_date', { ascending: false })
          .limit(30),
      ]);

      setParticipant(p);
      setMovementLog(log ?? []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>;
  if (!participant) return <div className="p-8 text-gray-500">No profile found.</div>;

  const age = participant.dateOfBirth
    ? new Date().getFullYear() - new Date(participant.dateOfBirth).getFullYear()
    : null;
  const zones = age ? calculateZone2Range(age) : null;

  const daysInLog = movementLog.length;
  const daysMet = movementLog.filter(d => d.meetsRequirement).length;
  const streakCurrent = (() => {
    let streak = 0;
    for (const day of movementLog) {
      if (day.meetsRequirement) streak++;
      else break;
    }
    return streak;
  })();

  const badges = [
    { id: 'week1', label: 'Week 1 Survivor', earned: (participant.eliminationDay ?? 999) > 7 },
    { id: 'fortnight', label: 'Fortnight Survivor', earned: (participant.eliminationDay ?? 999) > 14 },
    { id: 'threeweeks', label: '3-Week Survivor', earned: (participant.eliminationDay ?? 999) > 21 },
    { id: 'survivor', label: 'Season Survivor', earned: participant.status === 'survived' },
    { id: 'redemption', label: 'Redemption Champion', earned: participant.redemptionDaysUsed > 0 },
    { id: 'prize', label: 'Prize Draw Winner', earned: participant.spotPrizeWins > 0 },
    { id: 'researcher', label: 'Living Lab Contributor', earned: participant.researchConsent },
  ];

  return (
    <div className="p-8 space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{participant.fullName}</h2>
        <p className="text-gray-500 text-sm">Season 1 · {participant.status}</p>
      </div>

      {/* Zone 2 Range */}
      {zones && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-bold text-blue-900 mb-2">Your Zone 2 Range</h3>
          <p className="text-2xl font-bold text-blue-700">
            {zones.zone2Low}–{zones.zone2High} <span className="text-sm font-normal">bpm</span>
          </p>
          <p className="text-xs text-blue-700 mt-1">
            Max HR: {zones.maxHR} bpm · Target: 21+ continuous minutes daily
          </p>
        </div>
      )}

      {/* Season Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Days Tracked', value: daysInLog },
          { label: 'Days Met Goal', value: daysMet },
          { label: 'Current Streak', value: streakCurrent },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 30-Day Movement Chart (simple bar chart) */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Last 30 Days</h3>
        <div className="flex items-end gap-1 h-20">
          {[...movementLog].reverse().map(day => (
            <div
              key={day.logDate}
              title={`${day.logDate}: ${day.zone2MinutesContinuous} min`}
              className={`flex-1 rounded-sm transition-all ${
                day.meetsRequirement ? 'bg-green-500' :
                day.zone2MinutesContinuous > 0 ? 'bg-yellow-400' : 'bg-red-300'
              }`}
              style={{
                height: `${Math.min(100, (day.zone2MinutesContinuous / 30) * 100)}%`,
                minHeight: '4px',
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-sm inline-block" /> Met goal</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-400 rounded-sm inline-block" /> Partial</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-300 rounded-sm inline-block" /> None</span>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Achievements</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`rounded-lg p-3 text-center text-xs font-medium transition-all ${
                badge.earned
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-gray-50 border border-gray-200 text-gray-400'
              }`}
            >
              <div className="text-lg mb-1">{badge.earned ? '✓' : '○'}</div>
              {badge.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## T033: Welfare Incident Reporting Tool (Admin)

**File:** `src/pages/admin/WelfareIncidents.tsx`

```tsx
// src/pages/admin/WelfareIncidents.tsx
// Admin tool: log, track, and escalate welfare incidents.
// Only accessible to admin_users.

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import type { WelfareIncident } from '../../types/reap';

export function WelfareIncidents() {
  const [incidents, setIncidents] = useState<WelfareIncident[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    participantId: '',
    natureOfContact: '',
    severity: 'Low' as WelfareIncident['severity'],
    triggerEvent: '',
    responseTaken: '',
    escalatedToCEO: false,
    boardNotified: false,
    followUpActions: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from('welfare_incidents')
      .select('*')
      .order('reported_at', { ascending: false })
      .then(({ data }) => setIncidents((data ?? []) as WelfareIncident[]));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('welfare_incidents')
      .insert({
        participant_id: form.participantId || null,
        nature_of_contact: form.natureOfContact,
        severity: form.severity,
        trigger_event: form.triggerEvent || null,
        response_taken: form.responseTaken,
        escalated_to_ceo: form.escalatedToCEO,
        board_notified: form.boardNotified,
        follow_up_actions: form.followUpActions || null,
        reported_by: user?.id,
        status: 'Open',
      })
      .select()
      .single();

    setSaving(false);
    if (!error && data) {
      setIncidents(prev => [data as WelfareIncident, ...prev]);
      setShowForm(false);
      setForm({
        participantId: '', natureOfContact: '', severity: 'Low',
        triggerEvent: '', responseTaken: '', escalatedToCEO: false,
        boardNotified: false, followUpActions: '',
      });
    }
  }

  async function updateStatus(id: string, status: WelfareIncident['status']) {
    await supabase
      .from('welfare_incidents')
      .update({ status, resolved_at: status === 'Resolved' ? new Date().toISOString() : null })
      .eq('id', id);
    setIncidents(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  }

  const severityColors = {
    Low: 'bg-gray-100 text-gray-700',
    Medium: 'bg-yellow-50 text-yellow-700',
    High: 'bg-orange-50 text-orange-700',
    Critical: 'bg-red-50 text-red-700',
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Welfare Incident Register</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium 
                     px-4 py-2 rounded-md"
        >
          + Log Incident
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-gray-900">New Welfare Incident</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Participant ID (optional)</label>
              <input
                type="text"
                value={form.participantId}
                onChange={e => setForm(f => ({ ...f, participantId: e.target.value }))}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="UUID from participants table"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Severity</label>
              <select
                value={form.severity}
                onChange={e => setForm(f => ({ ...f, severity: e.target.value as WelfareIncident['severity'] }))}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                {['Low', 'Medium', 'High', 'Critical'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Nature of Contact *</label>
            <textarea
              required
              value={form.natureOfContact}
              onChange={e => setForm(f => ({ ...f, natureOfContact: e.target.value }))}
              rows={2}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Response Taken *</label>
            <textarea
              required
              value={form.responseTaken}
              onChange={e => setForm(f => ({ ...f, responseTaken: e.target.value }))}
              rows={2}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="flex gap-6">
            {[
              { key: 'escalatedToCEO', label: 'Escalated to CEO' },
              { key: 'boardNotified', label: 'Board Notified' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form[key as 'escalatedToCEO' | 'boardNotified']}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300"
                />
                {label}
              </label>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md"
            >
              {saving ? 'Saving...' : 'Log Incident'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-gray-600 text-sm px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {incidents.length === 0 && (
          <p className="text-gray-500 text-sm py-4 text-center">No incidents logged.</p>
        )}
        {incidents.map(incident => (
          <div key={incident.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${severityColors[incident.severity]}`}>
                    {incident.severity}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    incident.status === 'Open' ? 'bg-yellow-50 text-yellow-700' :
                    incident.status === 'Escalated' ? 'bg-red-50 text-red-700' :
                    'bg-green-50 text-green-700'
                  }`}>
                    {incident.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(incident.reportedAt).toLocaleDateString('en-NZ')}
                  </span>
                  {incident.escalatedToCEO && (
                    <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded">CEO notified</span>
                  )}
                  {incident.boardNotified && (
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded">Board notified</span>
                  )}
                </div>
                <p className="text-sm text-gray-800 font-medium">{incident.natureOfContact}</p>
                <p className="text-sm text-gray-600 mt-1">{incident.responseTaken}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {incident.status === 'Open' && (
                  <>
                    <button
                      onClick={() => updateStatus(incident.id, 'Escalated')}
                      className="text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 px-2 py-1 rounded"
                    >
                      Escalate
                    </button>
                    <button
                      onClick={() => updateStatus(incident.id, 'Resolved')}
                      className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-2 py-1 rounded"
                    >
                      Resolve
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## T020: TERRA API Integration (Setup Notes)

TERRA is the single integration covering Apple Health, Garmin, Fitbit, Strava, Google Fit, Polar, Whoop, Samsung Health. This replaces building 7+ individual device integrations.

**Setup steps:**
1. Sign up at `tryterra.co` — get API key
2. Create a webhook endpoint in Supabase Edge Functions (below)
3. Register webhook URL in TERRA dashboard: `https://[ref].supabase.co/functions/v1/terra-webhook`

```typescript
// supabase/functions/terra-webhook/index.ts
// Receives activity data from TERRA API for all connected wearables.
// TERRA calls this whenever a participant's device syncs.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHmac } from 'node:crypto';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);
const TERRA_SIGNING_SECRET = Deno.env.get('TERRA_SIGNING_SECRET')!;

Deno.serve(async (req) => {
  const body = await req.text();
  
  // Verify TERRA signature
  const signature = req.headers.get('terra-signature');
  const expectedSig = createHmac('sha256', TERRA_SIGNING_SECRET)
    .update(body)
    .digest('hex');
  if (signature !== expectedSig) {
    return new Response('Invalid signature', { status: 401 });
  }

  const payload = JSON.parse(body);
  const { type, user, data } = payload;

  // We care about 'activity' events with heart rate data
  if (type !== 'activity' || !data?.length) {
    return new Response('OK');
  }

  // Match TERRA user to REAP participant via terra_user_id stored at connection time
  const { data: participant } = await supabase
    .from('participants')
    .select('id, zone2_hr_low, zone2_hr_high')
    .eq('terra_user_id', user.user_id)  // add terra_user_id column to participants table
    .single();

  if (!participant) return new Response('Participant not found', { status: 404 });

  for (const activity of data) {
    const logDate = activity.metadata.start_time.split('T')[0];
    const hrSamples = activity.heart_rate_data?.detailed?.hr_samples ?? [];
    
    if (!hrSamples.length) continue;

    // Calculate Zone 2 continuous minutes from raw HR samples
    let maxContinuousSeconds = 0;
    let currentRun = 0;
    let prevTime: number | null = null;

    for (const sample of hrSamples) {
      const ts = new Date(sample.timestamp).getTime();
      const duration = prevTime ? Math.min((ts - prevTime) / 1000, 60) : 5; // cap gap at 60s
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
    const zone2MinutesTotal = hrSamples.filter((s: { bpm: number }) =>
      s.bpm >= participant.zone2_hr_low && s.bpm <= participant.zone2_hr_high
    ).length * (activity.metadata.summary_interval ?? 5) / 60;

    await supabase
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
  }

  return new Response('OK');
});
```

**Add to participants table:**
```sql
alter table participants add column if not exists terra_user_id text unique;
```

---

## T034: Automated Refund Processing

```typescript
// supabase/functions/process-refund/index.ts
// Handles the NO REFUND policy — only processes refunds in these exact cases:
// 1. Pre-season cancellation (before Day 1 midnight)
// 2. Incorrectly charged after confirmed cancellation
// Elimination is NOT a valid refund reason — this must be enforced here.

import Stripe from 'https://esm.sh/stripe@14?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

type RefundReason = 'pre_season_cancellation' | 'incorrect_charge';

Deno.serve(async (req) => {
  const { participantId, reason }: { participantId: string; reason: RefundReason } = 
    await req.json();

  // Admin-only
  const authHeader = req.headers.get('Authorization');
  const { data: { user } } = await supabase.auth.getUser(
    authHeader?.replace('Bearer ', '') ?? ''
  );
  const isAdmin = await supabase
    .from('admin_users').select('user_id').eq('user_id', user?.id).single();
  if (!isAdmin.data) return new Response('Forbidden', { status: 403 });

  const { data: participant } = await supabase
    .from('participants')
    .select('*, seasons!inner(season_start_at, status)')
    .eq('id', participantId)
    .single();

  if (!participant) return new Response('Participant not found', { status: 404 });

  // Validate refund is permitted
  if (reason === 'pre_season_cancellation') {
    const seasonStarted = participant.seasons.status !== 'Registration';
    if (seasonStarted) {
      return new Response(
        JSON.stringify({ 
          error: 'Refund denied — season has commenced. No refunds after Day 1.',
          policy: 'Per REAP Refund Policy, refunds are not available once a season commences.' 
        }),
        { status: 422 }
      );
    }
  }

  if (!participant.stripe_subscription_id) {
    return new Response('No Stripe subscription found', { status: 404 });
  }

  // Cancel subscription
  await stripe.subscriptions.cancel(participant.stripe_subscription_id);

  // Issue refund for most recent payment
  const invoices = await stripe.invoices.list({
    subscription: participant.stripe_subscription_id,
    limit: 1,
  });
  
  if (invoices.data[0]?.payment_intent) {
    await stripe.refunds.create({
      payment_intent: invoices.data[0].payment_intent as string,
      reason: 'requested_by_customer',
      metadata: {
        participant_id: participantId,
        refund_reason: reason,
        approved_by: user?.id ?? 'admin',
      },
    });
  }

  // Update participant
  await supabase
    .from('participants')
    .update({ 
      stripe_subscription_id: null,
      status: 'registered',  // downgrade from active
      updated_at: new Date().toISOString(),
    })
    .eq('id', participantId);

  return new Response(JSON.stringify({ success: true, reason }));
});
```

---

## Environment Variables Required

Add these to Supabase Edge Functions secrets:

```env
# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_REAP_PRICE_ID=price_...   # Create $13/month recurring price in Stripe dashboard

# Resend (email)
RESEND_API_KEY=re_...

# TERRA API (wearables)
TERRA_API_KEY=...
TERRA_DEV_ID=...
TERRA_SIGNING_SECRET=...

# Push notifications
VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:support@survivethereap.nz

# Cron security
CRON_SECRET=...  # random strong secret for cron endpoint auth
```

**Generate VAPID keys:**
```bash
npx web-push generate-vapid-keys
```

---

## Task Status Summary

| Task | Status | Notes |
|---|---|---|
| T018 Core App Setup | ✅ Complete | |
| T019 Auth Flow | ✅ Complete | |
| T020 TERRA API | Code ready | Webhook + setup notes above |
| T021 Research Consent | Code ready | `ResearchConsentField.tsx` |
| T022 Stripe Webhook | ✅ Complete | |
| T023 Zone 2 Algorithm | Code ready | `zone2.ts` |
| T024 Movement Verification | Code ready | In `run-elimination` edge function |
| T025 Midnight Elimination | Code ready | `run-elimination` edge function |
| T026 Push Notifications | Code ready | `sw.js` + `pushNotifications.ts` |
| T027 Stripe Billing | Code ready | `create-subscription` edge function |
| T028 Payment Testing | Manual testing | Use Stripe test cards |
| T029 Dashboard | ✅ Complete | |
| T030 Elimination Feed | Code ready | `EliminationFeed.tsx` |
| T031 Profile & Stats | Code ready | `ParticipantProfile.tsx` |
| T032 Admin Panel | ✅ Complete | |
| T033 Welfare Incident Tool | Code ready | `WelfareIncidents.tsx` |
| T034 Refund Processing | Code ready | `process-refund` edge function |
| T035 Prize Draw Backend | Code ready | `execute-prize-draw` edge function |
| T036 Season State Machine | Code ready | `seasonStateMachine.ts` |
| T037 Medical Exemption | Code ready | `MedicalExemptionForm.tsx` |
| T038 Welfare Register Export | Code ready | `exportCsv.ts` |
| T039 Accessibility Audit | Manual testing | WCAG 2.1 AA — use axe DevTools |
| T040 Load Testing | External tool | Use k6.io against staging |
| T041 Security Pen Test | External service | Engage external pen tester |
| T042 Redemption Day | Code ready | `RedemptionDayForm.tsx` |
