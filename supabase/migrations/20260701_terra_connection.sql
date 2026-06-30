-- Add Terra connection columns to participants table.
-- terra_user_id: Terra's UUID for the connected user — used to match webhook payloads.
-- terra_connected_at: timestamp of last successful connection.
-- terra_provider: e.g. GOOGLE, GARMIN, FITBIT — set by user_auth webhook.

alter table participants
  add column if not exists terra_user_id text unique,
  add column if not exists terra_connected_at timestamptz,
  add column if not exists terra_provider text;
