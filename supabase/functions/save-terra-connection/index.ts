// supabase/functions/save-terra-connection/index.ts
// Called by the /connect/callback page after Terra's OAuth redirect.
// Saves the Terra user_id to the participant record so the webhook can
// match future activity payloads to the correct participant.
//
// Terra redirects to: /connect/callback?user_id=<terra_user_id>&reference_id=<supabase_user_id>&...
// The frontend reads those params and POSTs them here.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

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

  const { terra_user_id, reference_id } = await req.json();

  if (!terra_user_id) {
    return new Response(JSON.stringify({ error: 'Missing terra_user_id' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Verify the reference_id matches the authenticated user as a safety check.
  // reference_id was set to user.id when generateWidgetSession was called.
  if (reference_id && reference_id !== user.id) {
    return new Response(JSON.stringify({ error: 'reference_id mismatch' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { error } = await supabase
    .from('participants')
    .update({
      terra_user_id,
      terra_connected_at: new Date().toISOString(),
      terra_provider: null, // will be set by user_auth webhook when it arrives
    })
    .eq('user_id', user.id);

  if (error) {
    console.error('Failed to save terra_user_id:', error);
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
});
