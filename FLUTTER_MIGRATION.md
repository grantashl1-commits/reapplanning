# The Ledger Moves Platforms
## REAP — PWA to FlutterFlow Migration Plan

> *"I have been watching this codebase. It has accumulated. Now is a reasonable time to stop and build something permanent."*
> — The Reaper

---

## The One Rule That Governs Everything

**The app collects evidence. Supabase makes the verdict.**

FlutterFlow is the mobile client. Supabase is the brain.
The Reaper's ledger lives in Supabase. The app is only how participants
interact with it.

FlutterFlow must never decide:
- Whether a user survived
- Whether a user was eliminated
- Whether a payment succeeded
- Whether an activity is verified
- Whether a prize draw entry is valid

Only Supabase Edge Functions can write to survival status, payment entitlement,
elimination status, and admin overrides.

---

## What We Are Migrating — And What We Are Not

### Staying Exactly Where It Is (Supabase)

The 40+ deployed Edge Functions do not move. They are the rules engine.

| Already deployed and running | Status |
|---|---|
| `midnight-elimination` | ✅ Active |
| `check-achievements` | ✅ Active (482 invocations) |
| `verify-payment` | ✅ Active (54 invocations) |
| `ghost-reveal` | ✅ Active (80 invocations) |
| `send-sequence-email` | ✅ Active (27 invocations) |
| `judge-player-of-day` | ✅ Active |
| `submit-potd` | ✅ Active |
| `admin-review-manual` | ✅ Active |
| `device-sync` | ✅ Active |
| `potd-signed-url` | ✅ Active |
| `achievement-email` | ✅ Active |
| All remaining ~30 functions | Active |

**Do not rebuild any of these. Do not duplicate their logic in FlutterFlow.
Call them from Flutter via Supabase client.**

Also staying:
- All database tables and RLS policies (to be audited and hardened)
- All cron jobs and their schedules
- Stripe payment integration (Stripe webhook → Supabase)
- Resend email templates
- Admin panel (web — can remain on Vercel)
- The PWA at survivethereap.com (keep alive during transition)

### Moving to FlutterFlow

| Responsibility | New owner |
|---|---|
| Mobile onboarding flow | FlutterFlow |
| Login / signup / auth screens | FlutterFlow + Supabase Auth |
| Season join flow | FlutterFlow |
| Daily countdown UX | FlutterFlow |
| Session start / submit evidence | FlutterFlow |
| The Reaper experience layer | FlutterFlow + ElevenLabs |
| Survival board / graveyard screens | FlutterFlow |
| Leaderboard screens | FlutterFlow |
| Push notification interaction | FlutterFlow + FCM |
| Social / share moments | FlutterFlow |
| Bluetooth / health data user flow | FlutterFlow + custom action |
| Displaying backend status | FlutterFlow (read-only) |

---

## Why FlutterFlow Over Capacitor

The current Capacitor wrapper is the right instinct but the wrong
execution path for a production health app.

| Consideration | Capacitor (current) | FlutterFlow / Flutter |
|---|---|---|
| HealthKit (iOS) | Unreliable via plugin | Native via `health` package |
| Health Connect (Android) | Unreliable via plugin | Native via `health` package |
| BLE Heart Rate | Works but fragile | `flutter_blue_plus` or provider |
| Background session | Difficult to sustain | Flutter background service |
| App Store / Play Store | Possible | Cleaner, expected by reviewers |
| Performance | Web view overhead | Native rendering |
| Push notifications | Capacitor plugin | Flutter + FCM native |
| Offline resilience | Limited | Flutter local storage |
| Build time | npm run build + cap sync | Flutter build |

The core issue with Capacitor: Apple and Google reviewers are more
scrutinous of web-view wrappers for health data apps. A Flutter native
app reads correctly as a health app, not a website in a frame.

---

## Migration Phases

### Phase 0 — Proof Sprint (Start Here)
**Duration: 1–2 weeks**
**Before committing to full build**

The Reaper does not assume. He verifies.

Test these 11 things before building anything else:

1. FlutterFlow app authenticates against Supabase Auth (real account)
2. FlutterFlow reads `season_entries` for the authenticated player
3. FlutterFlow reads player survival status from backend (read-only)
4. Supabase RLS blocks a player from reading another player's health data
5. A test activity session can be submitted to Supabase via Edge Function
6. Supabase validates survival status server-side and returns result
7. Global timezone/deadline logic is correct for a non-NZ timezone
8. A real BLE heart rate monitor (Polar H10 or Wahoo TICKR) connects on iPhone
9. Same BLE monitor connects on Android
10. A 22-minute session records, writes to Supabase, and returns validated result
11. Payment/access status is controlled only by backend — client cannot spoof it

If all 11 pass, proceed. If any fail, fix before proceeding.

---

### Phase 1 — FlutterFlow Project Foundation
**Duration: 3–5 days**

- Create FlutterFlow project: "Survive the REAP"
- Connect to Supabase project (URL + anon key only — service role stays server-side)
- Import Supabase schema for read-only data binding
- Set up design system:
  - Background: `#000000`
  - Surface: `#0B0B0B`
  - Elevated: `#121212`
  - Primary green: `#7FFF00`
  - Secondary green: `#66FF33`
  - Accent: `#39FF14`
  - Warning: `#FF8C00`
  - Danger: `#FF3B30`
  - Text primary: `#F5F5F0`
  - Text secondary: `#A0A0A0`
- Import Reaper pixel art sprites (all variants from brand asset collection)
- Import REAP logo (primary horizontal + app icon square)
- Set up Press Start 2P / monospace font stack
- Configure Firebase project for push notifications (FCM)
- Set up FlutterFlow custom actions scaffold (Dart — for BLE, health, ElevenLabs)

---

### Phase 2 — Auth + Splash + Onboarding
**Duration: 4–6 days**

**Splash screen:**
- REAP logo on black
- Neon green pulse animation
- Loading copy (rotating — see Reaper Voice Spec)
- Minimum 2s display to let backend connection establish

**Auth flow (4 screens):**
- Sign Up: email, password, confirm password
- Email verification holding screen
- Log In: email, password, forgot password link
- Forgot Password / Reset flow

**Onboarding — "Set Your Record" (3 steps):**
- Step 1: Alias or real name, date of birth (18+ verify), region, IANA timezone
- Step 2: Display preference (alias vs real name on leaderboard)
- Step 3: Consent checkboxes (required: 18+, terms, privacy, health declaration;
  optional: research, updates)

Architecture notes:
- Auth entirely through Supabase Auth SDK — no custom logic
- Profile creation calls `profiles` table insert (RLS: user can only write own row)
- No survival status set here — that is set by backend when season entry confirmed

---

### Phase 3 — The Core Loop (Home + Session)
**Duration: 1–2 weeks**

This is the heart of the product.

**Home screen:**
- Season name + day counter (e.g. "Day 18 of 30")
- Player survival status badge (ALIVE / AT RISK / FALLEN)
- Circular progress ring: qualifying minutes today / target
- Large countdown timer to local midnight deadline
- A message from The Reaper (rotated daily from Supabase `reaper_messages` table)
- Start Session button
- Sync Device button
- Submit Evidence button (manual/photo)
- View Ledger link

**Session screen:**
- Active session state (BLE connected / phone motion / health app)
- Live heart rate display (if BLE connected)
- Zone 2 status indicator
- Elapsed qualifying minutes counter
- Stop / Submit session button

**Evidence submission:**
- Player submits session evidence to Edge Function `submit-manual-activity`
- Edge Function validates, stores, triggers `check-achievements`
- App receives back: `{ status: 'survived' | 'pending' | 'insufficient' | 'eliminated' }`
- Reaper voice line plays based on result

**Critical architecture check:**
The `season_entries.survival_status` column must only be writable by service-role functions.
FlutterFlow reads status. It never writes it.

---

### Phase 4 — The Reaper Voice Layer
**Duration: 3–5 days**
*(see also REAPER_INTERFACE_SPEC.md for full detail)*

- ElevenLabs TTS integrated as custom FlutterFlow action
- Voice ID: stored in Supabase `app_config` table (not hardcoded in app)
- Trigger points: session complete, elimination, streak milestone, error states,
  daily check-in, Bluetooth connect/disconnect
- Reaper sprite animation synced to voice playback
- Conversational agent: web widget embedded in landing/PR pages
- All error messages written in Reaper voice (see spec)

---

### Phase 5 — Health Data Integration
**Duration: 1–2 weeks — this is the hardest part**

#### Option A: Flutter `health` package (recommended starting point)
- Package: `pub.dev/packages/health` (supports HealthKit + Health Connect)
- Implemented as FlutterFlow custom action
- Reads: heart rate samples, workout sessions, active energy, step count
- Permission request: explicit, with Reaper-voiced explanation
- Data handling: extract qualifying minutes from session data, send to Supabase
- Do NOT store raw health history — session summary only

#### Option B: Third-party wearable API (for broader device support)
| Provider | Strengths | Weakness |
|---|---|---|
| Terra | Wide device support, live streaming | Cost (evaluate at scale) |
| Spike | Direct BLE, lightweight | Newer product |
| ROOK | Health Connect focused | Android-first |
| Thryve | European, broad coverage | Less NZ-focused |

Recommendation: Start with native `health` package. Add Terra or Spike
if device coverage proves insufficient after real-user testing.

#### BLE Heart Rate Monitor (custom Flutter action)
- Package: `flutter_blue_plus`
- Target devices: Polar H10, Wahoo TICKR, Garmin HRM straps, standard BLE HRM profile
- GATT profile: Heart Rate Service UUID `0x180D`, HR Measurement `0x2A37`
- The P11 device (MAC: CB:13:0C:39:B6:F6) uses custom UUIDs `f0080001-0451-4000-b000-...`
  — this will need specific handling
- Background: implement via `flutter_background_service` to sustain session during
  screen lock
- Disconnect handling: Reaper voice line, auto-reconnect attempt, grace window

#### iOS permissions required (Info.plist):
```
NSBluetoothAlwaysUsageDescription
NSHealthShareUsageDescription
NSHealthUpdateUsageDescription
NSMotionUsageDescription
UIBackgroundModes: bluetooth-central, fetch
```

#### Android permissions required (AndroidManifest.xml):
```
BLUETOOTH_SCAN, BLUETOOTH_CONNECT, ACTIVITY_RECOGNITION
FOREGROUND_SERVICE, RECEIVE_BOOT_COMPLETED
Health Connect permissions via health package
```

---

### Phase 6 — Ledger + Leaderboard + Teams
**Duration: 1 week**

All of these screens are read-only from the app.
No survival status, rankings, or team membership is set by FlutterFlow.

**The Ledger (3 tabs):**
- Survivors: players with `survival_status = 'alive'`, sorted by streak
- Graveyard: players with `survival_status = 'eliminated'`, with epitaphs
- Rankings: total minutes, seasons survived, regional rank

**Teams:**
- Current team stats (aggregate only — no individual health data exposed)
- Active team challenge progress
- Team leaderboard
- Join by code → calls `check-crew-code` Edge Function

**Player of the Day:**
- Today's POTD submission form → calls `submit-potd` Edge Function
- Archive of past winners
- Reaper judges creativity and resourcefulness (via `judge-player-of-day`)

---

### Phase 7 — Payments
**Duration: 3–4 days**

Payments require careful handling in a Flutter/FlutterFlow app.

**Important note on App Store rules:**
Apple takes 30% on in-app digital purchases on iOS.
For a fitness challenge with physical prizes, legal advice on whether
this counts as a "digital good" is recommended before App Store submission.

**Options:**
1. **Web checkout only** (safest): Open Stripe checkout in browser from app.
   `create-checkout` Edge Function already exists. User pays on web,
   app polls `verify-payment` Edge Function for confirmation.
2. **RevenueCat**: Flutter-native subscription management, handles
   Apple/Google billing automatically.

Recommendation: Use web checkout for Season 1 launch. Revisit
in-app purchase approach after first season is live.

---

### Phase 8 — App Store + Play Store Release
**Duration: 1–2 weeks**

**Pre-submission checklist:**
- [ ] Supabase RLS audit complete
- [ ] BLE proof test on real iPhone and Android
- [ ] Health data: only session summaries stored (no raw HR history)
- [ ] Account deletion flow complete (`delete-account` Edge Function exists)
- [ ] Privacy policy updated for health data collection
- [ ] Health declaration in onboarding
- [ ] App Store health data privacy labels completed
- [ ] Google Play data safety section completed
- [ ] Push notification permission flow tested
- [ ] Stripe webhook signature verification confirmed
- [ ] Admin can override survival status if BLE data disputed
- [ ] Independent RLS/security review (not just Claude)

**App Store metadata:**
- Category: Health & Fitness
- Age rating: 17+ (simulated violence: The Reaper theme)
- Privacy labels: health/fitness data, user ID, location (timezone only)
- Keywords: survival challenge, fitness, zone 2, heart rate, accountability

---

## Immediate Next Steps (In Order)

1. **Run Phase 0 proof sprint** — do not skip this
2. **Stand up FlutterFlow project**, connect to Supabase
3. **Harden RLS** on `season_entries`, `activity_sessions`, `profiles`,
   `verification_results`, `payments` before writing any new client code
4. **Build Phase 2 auth + onboarding** in FlutterFlow
5. **Prototype BLE custom action** — Polar H10 on iPhone, target: 22 min session
6. **Wire The Reaper voice** to session complete event
7. **Keep PWA live** at survivethereap.com during transition — do not take down

---

## The Global Midnight Problem

The current cron runs at `0 11 * * *` UTC (midnight NZDT).
This is correct for NZ-only. It breaks for a global product.

Required architecture for global:
- All timestamps stored in UTC
- All players have `iana_timezone` stored at registration
- Midnight deadline is calculated per-player based on their timezone
- Elimination engine runs continuously (every 15 min) checking players
  whose local midnight has passed
- Sync grace window: 15-minute buffer after local midnight for late data arrival
- Timezone abuse prevention: timezone cannot be changed after season starts
  (locked at `season_entries.timezone_locked_at`)

This is a Supabase Edge Function change, not a FlutterFlow change.
It should be addressed before any international launch.

---

## Budget Reality Check

Based on Leanne's assessment and the Satellite proposal review:

| Workstream | Estimate |
|---|---|
| Phase 0 proof sprint | 1–2 weeks self-funded |
| FlutterFlow foundation + auth | $5k–$10k |
| Core game loop + Reaper voice | $10k–$20k |
| Health/BLE integration | $10k–$20k (hardest part) |
| Ledger/teams/payments | $5k–$10k |
| App Store + security hardening | $5k–$10k |
| **Total range** | **$35k–$70k** |

This assumes Supabase backend is largely reused.
An independent RLS/security review is recommended before public launch
($3k–$8k from a specialist).

The $101k Satellite quote appears to price a rebuild. That is not what this is.
This is a frontend migration from React/Capacitor to Flutter, with the Supabase
backend staying intact.

---

*The ledger does not get rebuilt. It gets a better interface.*
