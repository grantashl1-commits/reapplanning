# REAP — Appendix C: Product Architecture Summary
**Board Report Appendix | Sport Waikato / The Living Lab**
**Prepared:** April 2026 | **Classification:** Confidential — Board Use Only

---

## Product Overview

"Survive the Reap" is a 30-day daily-movement survival game delivered as a web application. Participants register, connect a fitness tracking device, and must complete 21 minutes of Zone 2 cardiovascular movement every day. Miss a day without using a Redemption Day, and they are permanently eliminated from that season. An automated system processes eliminations at midnight each night. Spot prize draws of $666 are run at seven milestone points during the season for active surviving participants.

The product is designed and operated by Sport Waikato's Living Lab. It is participant-facing — accessible from any device via browser — with no native app installation required.

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18, TypeScript, Vite | Participant web app — all UI, game state, onboarding |
| **UI Components** | shadcn/ui, Tailwind CSS | Design system and styling |
| **Routing** | React Router v6 | Client-side navigation |
| **Backend / Database** | Supabase (PostgreSQL) | All participant data, season data, activity logs, game state |
| **Authentication** | Supabase Auth | Email/password login, session management |
| **Row Level Security** | Supabase RLS | Participants can only access their own data |
| **Scheduled Jobs** | Supabase pg_cron | Midnight elimination processing |
| **Serverless Functions** | Supabase Edge Functions (Deno) | Stripe checkout, Stripe webhook, prize processing |
| **Payments** | Stripe | Monthly subscription billing, webhook confirmation |
| **Email** | Resend | Transactional emails — elimination notifications, registration, prizes |
| **Hosting / Builder** | Lovable (Lovable Pro) | Application hosting, AI-assisted development environment |
| **Domain** | survivethereap.nz (planned) | Primary domain |
| **Device Integration** | TERRA API (planned) | Unified wearable device API — Apple Health, Garmin, Fitbit, Strava, Google Fit, Polar, Whoop, Samsung Health |

**Key architectural decisions:**

- **Web app, not native app.** No App Store/Google Play submission required. Reduces development time and ongoing maintenance. Participants access from any browser on phone or desktop.
- **Supabase as backend.** Provides managed PostgreSQL, authentication, real-time subscriptions, and Edge Functions in a single platform. Removes the need for a separate Node.js/Express backend.
- **Lovable for AI-assisted development.** The majority of the app has been built using Lovable's AI-assisted development environment, reducing development cost significantly versus traditional custom development (estimated saving: $30,000–$65,000 versus a traditional agency build).
- **TERRA API for devices.** Rather than building individual integrations with Apple, Garmin, Fitbit, and others, TERRA provides a single unified API that covers all major platforms. Decision required by June 2026.

---

## Current Build Status (April 2026)

### Completed and Functional

| Component | Status | Notes |
|-----------|--------|-------|
| User registration and authentication | Complete | Email/password, Supabase Auth |
| Season entry and waitlist flow | Complete | CTA routes to `/register` correctly |
| Participant dashboard | Complete | Shows alive/fallen status, days survived, season info |
| Survival Board (leaderboard) | Complete | Displays surviving participants; `spotPrizeWins` column removed |
| Admin dashboard | Complete | Real Supabase queries on `season_entries`; not mock data |
| Manual activity submission | Complete | Backup submission for participants when device sync fails |
| Season day calculation | Complete | Fixed to calculate from `season_month`, not calendar date |
| `lastSyncMinutes` display | Complete | Fixed to use `updated_at` from `daily_activity` |
| Admin security | Complete | Admin button hidden from non-admin users; `ADMIN_EMAILS` array check |
| Credential security | Complete | Passwords removed from codebase; env vars in Supabase secrets |
| Mobile responsiveness (logo) | Complete | Fixed to `max-w-[480px]` |
| Password strength minimum | Complete | 8 characters minimum (up from 6) |
| Terms of Participation | Drafted | Requires legal update: spot prize subsidiary language |
| Season Rules / FAQ | Drafted | "At random" language removed; requires spot prize Terms language |
| Privacy Policy | Drafted | Requires Shelley's consent model review |
| Refund Policy | Drafted | Requires Shelley's review |

### Not Yet Built — Required Before Launch

| Component | Priority | Complexity | Notes |
|-----------|----------|-----------|-------|
| Midnight elimination cron job | **CRITICAL** | High | The core game mechanic — does not exist yet |
| Stripe webhook handler (`paid_at`) | **CRITICAL** | Medium | Subscription confirmation never sets `paid_at` |
| Device integrations (TERRA API) | **CRITICAL** | High | No wearable device integrations exist |
| In-app cancellation flow | **CRITICAL** | Medium | Consumer Guarantees Act requirement |
| Research consent checkbox (registration) | **CRITICAL** | Low | Privacy Act 2020 requirement |
| Server-side age gate (checkout) | HIGH | Low | Client-side check only; bypassable |
| In-app account deletion flow | HIGH | Medium | Privacy Act right to erasure |
| Spot prize draw mechanism (admin) | HIGH | Medium | Random selection, timestamped, logged |
| Elimination notification emails (Resend) | HIGH | Medium | Templates needed for elimination, prize win |
| Redemption Day declaration flow | HIGH | Medium | Participants need to pre-declare rest days |
| Separate sponsor opt-in flow | HIGH | Low | Privacy Act; must not be bundled |
| Corporate group disclosure screen | HIGH | Low | Required before any group sales |
| Consent records stored in database | HIGH | Low | Timestamp + version + consent type |
| Stripe webhook signature verification | HIGH | Low | Security — prevent spoofed payment confirmations |
| Fix hardcoded stats in `SeasonStatus.tsx` | HIGH | Low | Fair Trading Act — fictional numbers in UI |
| Fix hardcoded stats in `PublicBoard.tsx` | HIGH | Low | Same |

---

## Key Database Tables (Supabase PostgreSQL)

| Table | Purpose |
|-------|---------|
| `profiles` | Participant identity — name, email, DOB, created_at |
| `season_entries` | Season participation — status (ALIVE/FALLEN/WAITLIST), eliminated_at, paid_at |
| `daily_activity` | Activity records — zone2_minutes, activity_date, device_source, updated_at |
| `redemption_days` | Participant's declared rest days for the season |
| `elimination_log` | Audit log for each midnight elimination run |
| `audit_log` | General audit log — data exports, admin actions |
| `consent_records` | Participant consent timestamps — research, sponsor, corporate group |

**Tables to be created before launch:**

| Table | Purpose |
|-------|---------|
| `prize_draws` | Draw trigger points, eligible pool count, winner ID, timestamp |
| `sponsor_consents` | Named sponsor, participant opt-in, timestamp |
| `dispute_log` | Submitted disputes, status, resolution |

---

## Critical Feature Detail: Midnight Elimination System

This is the single most important unbuilt feature. The entire game mechanic depends on it.

**Required logic (pg_cron job at 23:59 NZST nightly):**

1. Query all `season_entries` where `status = 'ALIVE'` for the current active season
2. For each alive participant, check `daily_activity` — does a record exist for today with `zone2_minutes >= 21`?
3. Check `redemption_days` — is today a declared Redemption Day for this participant?
4. If neither condition is met: update `season_entries.status = 'FALLEN'`, set `eliminated_at = now()`
5. Trigger elimination notification via Resend (email) and/or push notification
6. Insert a row into `elimination_log`: run timestamp, participants checked, eliminations triggered, any errors

**Failure handling requirements:**
- If the cron job fails to run on any night, an alert must reach the Living Lab Lead within 15 minutes
- A manual admin override must exist to run the elimination check outside the scheduled time
- The elimination log must record both successful and failed runs for audit purposes

**NZST / UTC note:** New Zealand Standard Time (NZST) is UTC+12. New Zealand Daylight Time (NZDT) is UTC+13. The scheduled job must be configured to run at the correct UTC time for the current NZ timezone. Season 1 launches in November — NZDT will be in effect (UTC+13), so the cron must run at UTC 10:59 during summer seasons.

---

## Critical Feature Detail: Device Integration

**Current state:** No device integrations exist. Participants cannot sync fitness data to REAP.

**Recommended approach:** TERRA API — a unified third-party API that connects to Apple Health, Garmin Connect, Fitbit, Google Fit, Strava, Polar, Whoop, and Samsung Health through a single integration.

**Alternative:** Build individual integrations with each platform. This is significantly more complex and expensive.

**Decision required by:** 30 June 2026. Development must begin immediately after decision to allow time for testing before launch.

**Minimum viable integrations for Season 1:**
- Apple Health (covers all iPhone users — the largest segment)
- Garmin Connect (covers the most active/dedicated fitness tracker users — early adopter target)

**Manual submission remains available** as a backup for all device integration failures, available until 23:45 NZST each day.

**Zone 2 classification:** The specific data fields and threshold used to classify an activity as Zone 2 must be agreed and documented in the Season Rules before integrations are built, so the data model is consistent across all platforms.

---

## Infrastructure and Hosting Costs (Annual)

| Item | Annual cost (NZD) |
|------|-------------------|
| Lovable Pro (hosting + builder) | $780 |
| Supabase Pro (database, edge functions, auth) | $360 |
| Resend (email — up to 100k/month) | $240 |
| Domain (survivethereap.nz) | $30 |
| **Total infrastructure** | **$1,410 NZD/year** |

*Note: Financial model uses $1,560 to allow for USD/NZD fluctuation at 1 USD = 1.70 NZD.*

**At higher subscriber volumes:**
- Supabase Pro supports up to ~500 active connections. For 1,000+ participants, a Supabase Team plan ($600 USD/year) may be required.
- Resend pricing scales with email volume. At 4 seasons × 500 participants × ~10 emails each, annual email volume is ~20,000 — well within the base tier.

---

## Development Cost Summary

| Item | Cost (NZD) |
|------|-----------|
| App development (Lovable AI-assisted) | $6,800–$11,500 (incurred) |
| Remaining development (~10 hours @ $130/hr) | $1,300 |
| **Total development** | **~$8,100–$12,800** |
| Equivalent traditional custom development | $39,000–$78,000 |
| **Estimated saving from Lovable approach** | **$30,000–$65,000** |

**Remaining 10 development hours are allocated to:**
- Midnight elimination cron job (~4 hours)
- Stripe webhook completion (~1 hour)
- Consent architecture (checkboxes, database records) (~2 hours)
- In-app cancellation flow (~1 hour)
- Hardcoded statistics fixes (~0.5 hours)
- Terms/Rules text updates (~0.5 hours)
- Server-side age gate (~1 hour)

*Device integration (TERRA API) is not included in this estimate and will require a separate development budget. Estimated additional development: 15–25 hours depending on scope.*

---

## Development Timeline

| Milestone | Target Date | Dependencies |
|-----------|------------|-------------|
| Stripe webhook and `paid_at` fix | 30 May 2026 | None |
| Hardcoded statistics removed | 30 May 2026 | None — must happen before any public access |
| Server-side age gate | 30 June 2026 | None |
| Consent architecture (research checkbox, records) | 30 June 2026 | Shelley consent model input |
| TERRA API integration decision | 30 June 2026 | CEO/LL Lead decision |
| In-app cancellation flow | 31 July 2026 | None |
| Terms/Rules updated (spot prize language) | 31 July 2026 | Shelley sign-off on language |
| Apple Health integration (if TERRA selected) | 31 July 2026 | TERRA decision |
| Midnight elimination cron job (dev complete) | 31 July 2026 | Database schema finalised |
| Redemption Day declaration flow | 31 July 2026 | None |
| TERRA full integration (Garmin + others) | 31 August 2026 | TERRA API selection confirmed |
| Prize draw mechanism (admin backend) | 31 August 2026 | None |
| Elimination notification templates (Resend) | 31 August 2026 | Terms/Rules language approved |
| End-to-end staging test (full season simulation) | 15 September 2026 | All above complete |
| Celebrity soft launch (limited cohort) | October 2026 | Staging test passed |
| **Season 1 public launch** | **1 November 2026** | All launch conditions met (see REAP-Board-Launch-Conditions.md) |

---

## Security Status (April 2026)

| Item | Status |
|------|--------|
| Admin passwords in source code | Fixed — env vars |
| Stripe secret key in source code | Fixed — env vars |
| Supabase service role key | Confirm in env vars — not in code |
| Resend API key | Confirm in env vars — not in code |
| Supabase Row Level Security | Enabled — verify on all tables |
| HTTPS | Enforced by Lovable — confirm before go-live |
| Stripe webhook signature verification | Not yet implemented — required before launch |
| GitHub secret scanning | Not yet configured — immediate action required |
| Password minimum 8 characters (server-side) | Client-side fixed; server-side policy to confirm |

---

*This appendix is filed with the CEO. Technical details are correct as of April 2026. The development timeline is indicative — actual completion depends on developer availability and the TERRA API integration decision.*
