// supabase/functions/connect-terra/index.ts
// Generates a Terra Widget session URL so the user can connect their wearable.
// Called by the frontend when the user clicks "Connect Terra".
// Returns the widget URL to redirect to.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const TERRA_API_KEY = Deno.env.get('TERRA_API_KEY')!;
const TERRA_DEV_ID = Deno.env.get('TERRA_DEV_ID')!;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, content-type',
      },
    });
  }

  // Authenticate the user
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser(
    authHeader.replace('Bearer ', '')
  );

  if (authError || !user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Use the Supabase user ID as the reference_id so we can match
  // the Terra user back to this participant in the callback and in user_auth webhooks.
  const referenceId = user.id;

  const terraRes = await fetch('https://api.tryterra.co/v2/auth/generateWidgetSession', {
    method: 'POST',
    headers: {
      'dev-id': TERRA_DEV_ID,
      'x-api-key': TERRA_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reference_id: referenceId,
      // Providers supported by REAP
      providers: 'GARMIN,FITBIT,POLAR,WHOOP,APPLE,GOOGLE,SAMSUNG,WITHINGS,OURA',
      language: 'en',
    }),
  });

  if (!terraRes.ok) {
    const err = await terraRes.text();
    console.error('Terra widget session error:', err);
    return new Response(JSON.stringify({ error: 'Failed to generate Terra widget session' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { url } = await terraRes.json();

  return new Response(JSON.stringify({ url }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
});
