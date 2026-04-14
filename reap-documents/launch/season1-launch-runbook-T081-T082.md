# REAP Season 1 — Launch Day Runbook
**Tasks:** T081 (Season 1 Public Launch) + T082 (Day 1 All-Hands Monitoring)
**Owners:** Leanne [CEO] + Ashleigh [Living Lab Lead]
**Due:** 2026-11-01 (Season 1 Day 1)
**Priority:** CRITICAL — Launch Blocker
**Classification:** Internal Operations — Confidential

---

## Document Purpose

This runbook is the single source of truth for the REAP Season 1 launch. It covers every action, in sequence, from T-7 days through to the end of Day 1 (midnight NZT to midnight NZT). It defines who is responsible for each action, what constitutes success, and what triggers escalation. No action on launch day should require anyone to improvise.

This document is owned by the CEO (Leanne). The Living Lab Lead (Ashleigh) owns Day 1 operational execution. Every team member named in this document should have read it in full before 25 October 2026.

---

## Part 1: Pre-Launch Readiness Checklist

**Checkpoint protocol:** All 48 items below must be signed off as COMPLETE before the go-live command is issued on 1 November 2026. Each item carries an owner. Items with [BLOCKER] status will halt launch if incomplete.

The checklist is reviewed in three formal gate reviews: T-7 days (25 Oct), T-48 hours (30 Oct), and T-2 hours (01 Nov, 10:00 NZST). Any BLOCKER items not resolved by T-2 hours trigger the Launch Hold protocol (see Part 6).

### Category A: Technical (14 items)

| # | Item | Owner | Status | Blocker? |
|---|------|-------|--------|----------|
| A01 | Midnight elimination cron job (pg_cron at 23:59 NZST) confirmed running in production environment | Dev | ☐ | [BLOCKER] |
| A02 | Elimination cron job tested end-to-end in staging — at least one full simulated season completed | Dev | ☐ | [BLOCKER] |
| A03 | Stripe webhook handler confirmed live — `paid_at` set on subscription confirmation | Dev | ☐ | [BLOCKER] |
| A04 | Stripe webhook signature verification confirmed active | Dev | ☐ | [BLOCKER] |
| A05 | TERRA API integration confirmed — Apple Health sync end-to-end tested with real device | Dev | ☐ | [BLOCKER] |
| A06 | TERRA API integration confirmed — Garmin Connect sync end-to-end tested with real device | Dev | ☐ | [BLOCKER] |
| A07 | Manual activity submission confirmed functional — deadline set to 23:45 NZST enforced server-side | Dev | ☐ | [BLOCKER] |
| A08 | Supabase production environment (separate from staging) confirmed live with all tables | Dev | ☐ | [BLOCKER] |
| A09 | Row Level Security (RLS) confirmed enabled on all production tables | Dev | ☐ | [BLOCKER] |
| A10 | All environment variables/secrets (Stripe, Supabase service role, Resend, TERRA) confirmed in Supabase Secrets — not in source code | Dev | ☐ | [BLOCKER] |
| A11 | Elimination notification emails (Resend) tested — correct content, correct delivery, no spam folder placement | Dev | ☐ | [BLOCKER] |
| A12 | Redemption Day declaration flow confirmed functional — declaration deadline 23:45 NZST enforced | Dev | ☐ | [BLOCKER] |
| A13 | Admin dashboard confirmed functional in production — prize draw mechanism, participant list, elimination log | Ashleigh | ☐ | [BLOCKER] |
| A14 | `execute-prize-draw` Supabase Edge Function deployed and tested in production | Dev | ☐ | [BLOCKER] |

### Category B: Legal & Compliance (10 items)

| # | Item | Owner | Status | Blocker? |
|---|------|-------|--------|----------|
| B01 | Shelley's written approval of Terms of Participation (spot prize subsidiary language) on file | Leanne | ☐ | [BLOCKER] |
| B02 | Shelley's written approval of Season Rules (Sections 5, 7, 8 — prize language) on file | Leanne | ☐ | [BLOCKER] |
| B03 | Shelley's written approval of Privacy Policy (consent model — research, sponsor, corporate) on file | Leanne | ☐ | [BLOCKER] |
| B04 | Shelley's written approval of Refund Policy on file | Leanne | ☐ | [BLOCKER] |
| B05 | DIA informal enquiry response received and reviewed — no material objection to spot prize model | Leanne | ☐ | [BLOCKER] |
| B06 | Privacy Officer formally designated — name appears in Privacy Policy | Leanne | ☐ | [BLOCKER] |
| B07 | Breach response procedure documented and filed | Leanne | ☐ | [BLOCKER] |
| B08 | Server-side age gate (18+) confirmed active in `create-checkout` edge function | Dev | ☐ | [BLOCKER] |
| B09 | Research consent checkbox (separate tick, stored with timestamp in `consent_records`) confirmed at registration | Dev | ☐ | [BLOCKER] |
| B10 | Health screening disclosure screen confirmed at registration — before payment, separate step, stored with timestamp | Dev | ☐ | [BLOCKER] |

### Category C: Operations (12 items)

| # | Item | Owner | Status | Blocker? |
|---|------|-------|--------|----------|
| C01 | Prize fund accounting separation confirmed — dedicated fund in SW accounts, board resolution on file | Leanne | ☐ | [BLOCKER] |
| C02 | Prize draw schedule confirmed and published internally — all 7 dates, eligible pools, prize amounts | Ashleigh | ☐ | [BLOCKER] |
| C03 | Participant support inbox confirmed active — reap@sportwaikato.co.nz or equivalent, checked during business hours | Ashleigh | ☐ | [BLOCKER] |
| C04 | Welfare incident register created in Airtable — ready to log incidents from Day 1 | Ashleigh | ☐ | [BLOCKER] |
| C05 | Dispute resolution process documented and team briefed | Ashleigh | ☐ | [BLOCKER] |
| C06 | Elimination log table confirmed in production — will capture each midnight run | Dev | ☐ | [BLOCKER] |
| C07 | Refund process documented — who approves, how issued, SLA | Leanne | ☐ | [BLOCKER] |
| C08 | Celebrity ambassador confirmed and briefed on Season 1 launch | Leanne | ☐ | [BLOCKER] |
| C09 | GST treatment of subscription revenue confirmed with accountant | Leanne | ☐ | [BLOCKER] |
| C10 | Season 1 success criteria defined and board-approved (see Part 14) | Leanne | ☐ | [BLOCKER] |
| C11 | War room logistics confirmed — who is where, on what channel, what hours | Leanne | ☐ | Not a blocker |
| C12 | All team members have read this runbook in full | Leanne | ☐ | [BLOCKER] |

### Category D: Marketing & Communications (12 items)

| # | Item | Owner | Status | Blocker? |
|---|------|-------|--------|----------|
| D01 | survivethereap.nz live and accessible with SSL | Dev | ☐ | [BLOCKER] |
| D02 | Registration flow end-to-end functional on survivethereap.nz (register → Stripe checkout → confirmation email) | Dev | ☐ | [BLOCKER] |
| D03 | All social media accounts (Instagram, TikTok, Facebook) live and branded | Ashleigh | ☐ | [BLOCKER] |
| D04 | Season 1 launch content pre-scheduled in social media scheduler — ready to post at 09:00 NZST 1 Nov | Ashleigh | ☐ | [BLOCKER] |
| D05 | Celebrity ambassador launch post scheduled for 09:00 NZST 1 Nov — content approved by Leanne | Ashleigh | ☐ | [BLOCKER] |
| D06 | Day 0 (31 Oct) reminder email to registered participants confirmed scheduled via Resend — send time 07:00 NZST | Ashleigh | ☐ | [BLOCKER] |
| D07 | Day 1 welcome email confirmed scheduled — send time 06:00 NZST 1 Nov | Ashleigh | ☐ | [BLOCKER] |
| D08 | Press release prepared, approved by Leanne, and distributed to media list — embargoed to 09:00 NZST 1 Nov | Leanne | ☐ | Not a blocker |
| D09 | Sport NZ briefed (before public launch announcement) | Leanne | ☐ | [BLOCKER] |
| D10 | Waikato Regional Council / key funders briefed | Leanne | ☐ | [BLOCKER] |
| D11 | All Sport Waikato staff briefed on REAP and the dark aesthetic rationale | Leanne | ☐ | [BLOCKER] |
| D12 | Responsible Play page live at survivethereap.nz/wellbeing — links from registration flow | Dev | ☐ | [BLOCKER] |

---

## Part 2: Launch Day Timeline (T-7 Days to T+24 Hours)

### T-7 Days: 25 October 2026 (Sunday)

| Time | Action | Owner |
|------|--------|-------|
| All day | Gate Review 1: work through full pre-launch checklist. All [BLOCKER] items must be COMPLETE or have a clear resolution path by 30 Oct. | Leanne + Ashleigh |
| 14:00 | Team call: checklist review. Identify all items not yet at COMPLETE. Assign resolution actions with deadlines. | Leanne |
| 16:00 | Written summary of Gate 1 outcome circulated to all team members | Leanne |

### T-5 Days: 27 October 2026 (Tuesday)

| Time | Action | Owner |
|------|--------|-------|
| 10:00 | Final staging environment test: simulate full registration → activity sync → midnight elimination run. Record outcomes. | Dev + Ashleigh |
| 14:00 | Review staging test results. Identify any remaining issues. | Ashleigh |
| EOD | All outstanding BLOCKER items have assigned owner and confirmed resolution date of 30 Oct or earlier. | Leanne |

### T-2 Days: 30 October 2026 (Friday)

| Time | Action | Owner |
|------|--------|-------|
| 09:00 | Gate Review 2: full checklist reviewed. Any BLOCKER item not COMPLETE triggers escalation call with Leanne immediately. | Ashleigh |
| 10:00 | Confirm celebrity ambassador post content and timing — final approval. | Leanne |
| 11:00 | Confirm press release final draft. Distribute to media contacts under embargo (09:00 NZST 1 Nov). | Leanne |
| 12:00 | Confirm all social content pre-scheduled and correct. | Ashleigh |
| 14:00 | Production environment final check: all tables, RLS, Edge Functions, environment variables, cron job schedule. | Dev |
| 16:00 | Confirm Day 0 reminder email is scheduled for 07:00 NZST 31 Oct. | Ashleigh |
| 17:00 | All team members receive: "Launch is proceeding" OR "Launch hold — reason X" communication from Leanne. | Leanne |

### T-1 Day: 31 October 2026 (Saturday — Day 0)

| Time | Action | Owner |
|------|--------|-------|
| 07:00 | Day 0 reminder email sends to all registered participants (automated via Resend). | Automated |
| 08:00 | Ashleigh confirms email delivery in Resend dashboard — check open rate, no bounce spikes. | Ashleigh |
| 09:00 | Social media: "Season 1 starts tomorrow" post. Build anticipation. | Ashleigh |
| 10:00 | Confirm production cron job is scheduled — next run: 23:59 NZST 1 Nov. | Dev |
| 12:00 | War room briefing: confirm all roles, channels, escalation contacts. Circulate updated contact matrix. | Leanne |
| 14:00 | Participant support inbox cleared — all outstanding queries resolved. | Ashleigh |
| 17:00 | Final team check-in: any last-minute issues? Go or no-go? | Leanne |
| 20:00 | No further changes to production system from this point — code freeze in effect. | Dev |
| 23:00 | Confirm Stripe is active, registration flow working. Manual test: visit survivethereap.nz and complete registration flow to checkout step (do not complete purchase). | Dev |

### Launch Day: 1 November 2026 (Sunday — Day 1)

| Time (NZST) | Action | Owner |
|-------------|--------|-------|
| 00:00 | Season 1 Day 1 begins. System is live. No action required — Season 1 started with participant registrations already confirmed. | — |
| 06:00 | Day 1 welcome email sends to all paid registered participants (automated via Resend). | Automated |
| 06:15 | Ashleigh confirms welcome email delivery — open rate checking, bounce monitoring. | Ashleigh |
| 07:00 | Ashleigh opens monitoring dashboard. Begins hourly check cycle. | Ashleigh |
| 08:00 | Check: new registrations count, payment success rate, Stripe dashboard. | Ashleigh |
| 09:00 | Go-live social posts: Sport Waikato accounts + celebrity ambassador posts launch simultaneously. | Ashleigh + Ambassador |
| 09:00 | Press release embargo lifts. Media contacts may publish. | Leanne |
| 09:05 | Leanne available on phone for media calls — media handling protocol active (see REAP-Media-Handling.md). | Leanne |
| 09:30 | First registration wave monitoring: count new registrations in last 30 min. | Ashleigh |
| 10:00 | Hourly monitoring check #1 — complete monitoring checklist (see Part 5). | Ashleigh |
| 11:00 | Hourly monitoring check #2. | Ashleigh |
| 12:00 | Hourly monitoring check #3. Board update SMS from Leanne: "Day 1 live, [X] registrations, all systems nominal." | Leanne |
| 13:00 | Hourly monitoring check #4. | Ashleigh |
| 14:00 | Hourly monitoring check #5. Participant support inbox cleared. | Ashleigh |
| 15:00 | Hourly monitoring check #6. | Ashleigh |
| 16:00 | Afternoon check-in call: Leanne + Ashleigh. Review registration numbers, support tickets, any incidents. | Leanne + Ashleigh |
| 17:00 | Hourly monitoring check #7. | Ashleigh |
| 18:00 | Evening encouragement in-app notification and email sends to all active participants (see participant communication schedule, Part 9). | Automated |
| 18:15 | Confirm evening notification delivery. | Ashleigh |
| 19:00 | Hourly monitoring check #8. | Ashleigh |
| 20:00 | Participant support inbox final clearance. | Ashleigh |
| 21:00 | Hourly monitoring check #9. | Ashleigh |
| 22:00 | Hourly monitoring check #10. Begin elevated monitoring phase — approaching midnight. | Ashleigh |
| 22:30 | Confirm: manual activity submission deadline is 23:45 NZST — confirm system is enforcing this. | Dev |
| 23:00 | Dev on standby — monitoring production logs for cron job. | Dev |
| 23:30 | Ashleigh + Dev actively monitoring. Check: how many participants have activity recorded for Day 1 so far? | Ashleigh + Dev |
| 23:45 | Manual submission window closes. No further activity records accepted for Day 1. | Automated |
| 23:50 | Dev confirms cron job is queued and will run at 23:59. | Dev |
| 23:59 | MIDNIGHT ELIMINATION RUN: pg_cron job executes. Processes all ALIVE participants. Eliminates any with zone2_minutes < 21 and no Redemption Day declared. | Automated |
| 00:00–00:05 | Dev monitors elimination run in Supabase logs. Confirms: run completed, row count processed, eliminations triggered, no errors. | Dev |
| 00:05 | Ashleigh confirms elimination log entry in admin dashboard — records run timestamp, participant count, eliminations count. | Ashleigh |
| 00:10 | Elimination notification emails send to eliminated participants (automated via Resend). | Automated |
| 00:20 | Dev and Ashleigh confirm: no error alerts, elimination count is within expected range. File end-of-day report. | Ashleigh + Dev |
| 00:30 | Leanne receives Day 1 summary from Ashleigh (see Part 14 — Day 1 end-of-day metrics). | Ashleigh |

### T+24 Hours: 2 November 2026

| Time | Action | Owner |
|------|--------|-------|
| 09:00 | Day 1 retrospective call: team reviews all metrics, incidents, support tickets. | Leanne + Ashleigh |
| 10:00 | Social: "Day 1 survival rate: X% still standing" post (use actual numbers). | Ashleigh |
| 11:00 | Identify any technical issues from Day 1 — prioritise fixes for Day 2 onwards. | Dev |
| 12:00 | Board update: Leanne sends Day 1 summary email to board. | Leanne |
| 14:00 | Participant support backlog reviewed — any outstanding tickets more than 4 hours old? | Ashleigh |

---

## Part 3: Launch Day Team Roles and Responsibilities

### Leanne [CEO] — Overall Launch Commander

**Primary responsibilities:**
- Final go/no-go authority at T-2 hour Gate Review 3
- Media handling — all journalist inquiries route to Leanne
- Board communications — board receives updates from Leanne only
- Funder communications — Sport NZ, WRC contacts managed by Leanne
- Escalation decision-maker for any P0 or P1 incident (see Part 6)
- Welfare incident escalation — any Level 3 welfare incident goes to Leanne immediately
- Available by phone from 08:00–01:00 NZST on 1 November

**Not responsible for:**
- Technical monitoring (that is Ashleigh + Dev)
- Participant support tickets (that is Ashleigh)
- Social media posting (that is Ashleigh, unless Leanne has approved specific posts)

### Ashleigh [Living Lab Lead] — Day 1 Operations Commander

**Primary responsibilities:**
- Hourly monitoring checks (every hour from 07:00)
- Participant support inbox — all tickets acknowledged within 1 hour, resolved within 4 hours
- Social media posting per the content calendar
- Midnight elimination run monitoring alongside Dev
- End-of-day metrics compilation and report to Leanne
- Welfare incident log — all incidents logged in real-time in Airtable
- Prize draw administration — coordinates with Leanne for all draws
- Available from 07:00–01:00 NZST on 1 November

**Escalation to Leanne when:**
- Any P0/P1 incident (immediate phone call)
- Any Level 2 or Level 3 welfare incident
- Any media inquiry received
- Registration count falls below 50 by 17:00 NZST (concerning trend)
- Any elimination error discovered

### Dev Team — Technical Operations

**Primary responsibilities:**
- Code freeze from 20:00 NZST 31 October — no production changes without Leanne approval
- Monitor Supabase edge function logs throughout Day 1
- Midnight cron job monitoring — actively watching from 23:00
- Immediate response to any technical alert (see Part 5 — alert thresholds)
- Provide technical status updates to Ashleigh on demand
- Available on-call from 08:00–01:00 NZST on 1 November

**Authority:**
- May make emergency hotfixes with Leanne's verbal approval
- Must notify Ashleigh of any production log anomalies immediately

### Shelley [Legal Counsel] — Standby

**Role:** On standby from 09:00–17:00 NZST on 1 November.

**Escalation to Shelley when:**
- Any DIA or regulatory contact (email or phone from a regulatory body)
- Any threat of legal action from a participant
- Any media inquiry that includes legal framing (gambling, unlicensed, etc.)
- Any unusual payment dispute with potential legal dimensions

**Contact method:** Phone. Do not use email for time-sensitive legal questions on launch day.

---

## Part 4: Technical Go-Live Sequence

The following is the exact sequence in which systems are confirmed live on launch day. This sequence is validated by Dev and confirmed to Ashleigh. Each item must be confirmed before moving to the next.

**Go-live confirmation: 10:00 NZST Gate Review 3 (T-2 hours before first social post)**

| Step | System | Action | Confirmed by | Time |
|------|--------|--------|-------------|------|
| 1 | Supabase Production | Confirm all tables exist, RLS enabled, no failed migrations | Dev | 10:00 |
| 2 | Supabase Secrets | Confirm all env vars present: STRIPE_SECRET_KEY, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, TERRA_API_KEY | Dev | 10:05 |
| 3 | Edge Functions | Confirm deployed: create-checkout, stripe-webhook, execute-prize-draw | Dev | 10:10 |
| 4 | pg_cron | Confirm scheduled job active: `SELECT * FROM cron.job;` — job name, schedule (23:59 NZST), enabled=true | Dev | 10:15 |
| 5 | Stripe | Confirm subscription product and price active. Confirm webhook endpoint registered at correct URL. | Dev | 10:20 |
| 6 | Resend | Send test email from admin — confirm delivery | Dev | 10:25 |
| 7 | TERRA API | Confirm API key valid — test endpoint call | Dev | 10:30 |
| 8 | survivethereap.nz | Load page — confirm SSL, no 404s, registration flow accessible | Dev | 10:35 |
| 9 | Registration flow | Complete test registration (test account) — confirm email received, `paid_at` set in database after Stripe checkout | Dev | 10:40 |
| 10 | Admin dashboard | Log in as admin — confirm participant list, elimination log, prize draw panel all loading with real data | Ashleigh | 10:50 |
| 11 | Go/No-Go | Leanne receives written confirmation from Dev and Ashleigh: "All systems confirmed. Go." | Leanne | 11:00 |

**If any step fails:** Stop sequence. Dev investigates. Leanne notified. If not resolved within 60 minutes, Launch Hold protocol activates.

---

## Part 5: Monitoring Dashboard — Day 1 Metrics

### Hourly Monitoring Checklist (Ashleigh, every hour 07:00–23:00)

For each check, Ashleigh records the value in the Day 1 monitoring log (Airtable). Any value outside the threshold triggers an alert to the appropriate owner.

| Metric | Source | Target | Alert Threshold | Action |
|--------|--------|--------|----------------|--------|
| New paid registrations (cumulative) | Supabase `season_entries` where `paid_at NOT NULL` | 100 by EOD | < 50 by 17:00 | Escalate to Leanne — assess marketing response |
| Payment success rate | Stripe dashboard | > 95% | < 90% | Escalate to Dev — check Stripe webhook health |
| Device sync success rate | TERRA API dashboard + `daily_activity` records | > 85% of active participants have synced | < 70% | Escalate to Dev — check TERRA API status |
| Average page load time | Lovable hosting / Supabase logs | < 2 seconds | > 4 seconds | Escalate to Dev — check Supabase connection pool |
| Application error rate | Supabase Edge Function logs | < 1% of requests | > 3% of requests | Escalate to Dev immediately |
| Supabase Edge Function invocations | Supabase dashboard | Baseline established | 10x spike from previous hour | Investigate — potential abuse or attack |
| Participant support tickets received | Support inbox | — | > 10 new tickets in 1 hour | Escalate to Leanne — assess staffing |
| Active Stripe subscriptions | Stripe dashboard | Matches `paid_at` count in Supabase | Discrepancy > 5 | Escalate to Dev — webhook sync issue |
| Welfare incidents logged | Airtable welfare register | 0 | Any Level 2 or Level 3 | Escalate to Leanne immediately |
| TERRA API latency | TERRA dashboard | < 500ms | > 2 seconds | Flag to Dev — risk of midnight sync latency |

### Midnight Elimination Run — Specific Monitoring (23:00–00:30)

| Time | Check | Owner | Pass Criteria |
|------|-------|-------|--------------|
| 23:00 | Confirm cron job is scheduled: `SELECT * FROM cron.job WHERE jobname = 'midnight-elimination'` | Dev | Job listed, enabled = true, next run = 23:59 |
| 23:30 | Count participants with zone2_minutes >= 21 recorded for Day 1 | Ashleigh | Provides baseline for expected survivor count |
| 23:55 | Dev watching Supabase edge function logs in real-time | Dev | No errors in preceding 30 minutes |
| 00:00 | Elimination job executes | Automated | — |
| 00:02 | Check `elimination_log` table — was a row inserted for tonight's run? | Dev | Row exists with: run_date = today, status = 'COMPLETE' |
| 00:05 | Check `season_entries` — count of ALIVE vs. FALLEN participants. Compare to expected outcome. | Ashleigh | FALLEN count matches (participants with no activity and no Redemption Day) |
| 00:10 | Confirm elimination emails sent — check Resend dashboard for outbound volume | Ashleigh | Email count matches FALLEN count from elimination run |
| 00:15 | Check `elimination_log` for any error flags | Dev | `errors = NULL` or `error_count = 0` |
| 00:20 | Final confirmation: cron job complete, no alerts, participant counts correct | Dev | Sign-off and file in Day 1 log |

---

## Part 6: Alert Thresholds and Incident Response

### Incident Severity Classification

| Severity | Definition | Response Time | Escalation |
|----------|-----------|---------------|-----------|
| **P0** | Complete system failure preventing Season 1 from operating | Immediate | Leanne + Dev + Shelley standby |
| **P1** | Core feature failure affecting >10% of participants | Within 15 minutes | Leanne + Dev |
| **P2** | Degraded performance or feature failure affecting <10% of participants | Within 1 hour | Dev, notify Ashleigh |
| **P3** | Minor issue, no participant impact | Next business day | Dev |

### Incident Decision Tree

**Scenario 1: Payment System Down (Stripe outage or webhook failure)**

```
DETECT: Payment success rate drops below 90%
  ↓
INVESTIGATE: Is this a Stripe global outage or a webhook configuration issue?
  ↓ Stripe outage (check status.stripe.com)
    → Post status update: "Registrations temporarily unavailable — we're aware and working on it"
    → Monitor Stripe status page — no action until Stripe resolves
    → If outage > 2 hours: escalate to Leanne for board communication decision
    → When Stripe recovers: confirm webhook backlog is processed, `paid_at` set correctly
  ↓ Webhook failure (Stripe fine, our endpoint broken)
    → Dev deploys hotfix (Leanne verbal approval required)
    → Test with manual webhook replay in Stripe dashboard
    → Confirm fix: send test transaction, confirm `paid_at` set
    → Review: were any participants affected (paid but not confirmed)? Manual remediation if needed.
```

**Scenario 2: TERRA API Device Sync Not Working**

```
DETECT: Device sync success rate below 70%, OR participant tickets reporting "activity not syncing"
  ↓
INVESTIGATE: Is this TERRA API global issue or specific device type?
  ↓ TERRA global outage
    → Push in-app notification + email: "We're aware of a device sync issue. Manual submission is available until 23:45. [Link]"
    → Monitor TERRA status page
    → If TERRA unresolved by 22:00: Dev attempts manual late sync for affected participants (requires admin query)
    → Log all affected participants in welfare register for Day 1
  ↓ Specific device type (e.g., Garmin only)
    → Push notification to Garmin users specifically: "Garmin sync issue today — please use manual submission"
    → Dev investigates TERRA Garmin endpoint
    → Resolution documented
```

**Scenario 3: Elimination Bug (Wrong participants eliminated / survivors missed)**

```
DETECT: Elimination log shows unexpected counts, OR participant ticket "I was eliminated but I exercised"
  ↓
STOP: Do not dismiss any reinstatement request without investigation.
  ↓
INVESTIGATE: Pull `daily_activity` record for the participant — was activity logged before 23:59?
  ↓ Activity IS in database — elimination was incorrect (technical bug)
    → Escalate to Leanne immediately (phone call)
    → Dev: reinstate participant in `season_entries` (status = 'ALIVE', `eliminated_at` = NULL)
    → Send personal apology email to participant
    → File welfare incident report
    → Investigate root cause — does this affect other participants?
    → If systematic bug affecting > 5 participants: P0 incident, halt future elimination runs until fixed
  ↓ Activity NOT in database — elimination was correct
    → Respond to participant: "Your activity didn't reach us in time for last night's check. We've checked our records and no activity was recorded for your account before midnight."
    → Offer: explain manual submission process for future days
    → Do not reinstate (correct elimination)
```

**Scenario 4: Welfare Incident**

```
DETECT: Participant contacts support with Level 2 or Level 3 distress indicators
  ↓
RESPOND (within 15 minutes for Level 3, within 1 hour for Level 2):
  ↓ Level 3 (self-harm language, crisis indicators)
    → Acknowledge warmly: "I can hear that you're going through a really hard time right now. I'm so glad you reached out."
    → Provide crisis resources: Lifeline 0800 543 354, 1737 (text or call)
    → Stay in conversation if participant is still communicating
    → Phone Leanne immediately
    → If immediate risk to life: call 111 with participant's contact details
    → Do not discuss refund or reinstatement during crisis response
  ↓ Level 2 (significant distress, not crisis)
    → Acknowledge: "Being eliminated is genuinely hard. We hear you."
    → Signpost support: 1737, mentalhealth.org.nz
    → Consider goodwill gesture (priority Season 2 registration) — discuss with Leanne
    → Log incident in welfare register
    → Escalate to Leanne for awareness
```

**Scenario 5: DIA Contact (Regulatory Inquiry)**

```
DETECT: Email or phone call from Department of Internal Affairs re: REAP prize structure
  ↓
IMMEDIATE: Do not respond substantively. Do not say "yes" or "no" to any regulatory question.
  ↓
RESPONSE: "Thank you for contacting us. The CEO is the appropriate person to respond to this inquiry. I'll ensure she contacts you directly within [2 hours / next business day]."
  ↓
ESCALATE: Phone Leanne immediately. Phone Shelley within 15 minutes.
  ↓
Leanne + Shelley coordinate response. No communication to DIA without Shelley's input.
  ↓
Document: Log contact details, time of contact, nature of inquiry in incident register.
```

---

## Part 7: Communication Plan

### Social Media Schedule — Day 1

| Time | Platform | Post Content | Who Approves |
|------|----------|-------------|-------------|
| 09:00 | Instagram + Facebook | "Season 1 is LIVE. 30 days. One rule. 21 minutes or you're gone. Are you still standing?" + link | Ashleigh |
| 09:00 | TikTok | Launch video (pre-produced) | Ashleigh |
| 09:00 | Celebrity ambassador personal account | Ambassador's own post (agreed content) | Leanne |
| 12:00 | Instagram Story | "Registration counter: [X] participants have joined the Reap" | Ashleigh |
| 18:00 | Instagram + Facebook | "Day 1 survival check: Did you get your 21 minutes?" | Ashleigh |
| 21:00 | Instagram Story | "3 hours to midnight. Clock's ticking." | Ashleigh |
| 00:30 (2 Nov) | Instagram Story | "Night 1: [X] survivors remain. [Y] have fallen." — only if elimination run confirmed successful | Ashleigh |

**What Leanne says to board on Day 1:**

- SMS at 12:00 NZST: "Season 1 Day 1 live. [X] paid registrations so far. All systems operational. No incidents."
- Email at end of Day 1 (by 08:00 2 Nov): Full Day 1 metrics summary (see Part 14).

**Press release timing:**
- Press release distributed to media contacts under embargo from 30 Oct with embargo lift at 09:00 NZST 1 Nov.
- Leanne available for media calls 09:00–12:00 NZST on 1 Nov. No media calls after 12:00 unless a breaking story requires response.
- All media inquiries route through Leanne. Ashleigh and Dev do not speak to media.

---

## Part 8: Participant Communication Sequence

### Day 0 (31 October 2026) — Reminder Email

**Send time:** 07:00 NZST
**Subject:** Season 1 starts tomorrow. Are you ready?
**Audience:** All registered participants with `paid_at NOT NULL`

> **Season 1 starts tomorrow, 1 November.**
>
> Here's what you need to know before midnight:
>
> **Your one rule:** 21 continuous minutes of Zone 2 cardio, every day. Miss a day without a Redemption Day, and you're out.
>
> **Connect your device now** if you haven't already. [Link to device connection page] If you'd prefer to submit manually, you can do that at survivethereap.nz/dashboard until 23:45 each night.
>
> **Redemption Days:** You have [X] Redemption Days for the season. Use them wisely. Declare before 23:45 on any day you know you'll miss.
>
> **The first midnight check is tomorrow night — 23:59 1 November.**
>
> Sleep well. Move tomorrow.
>
> — The REAP Team
>
> *Need help? Contact us at [support email]. If things are tough right now, Lifeline is 0800 543 354.*

---

### Day 1 (1 November 2026) — Welcome Email

**Send time:** 06:00 NZST
**Subject:** Welcome to Day 1. Let's go.
**Audience:** All registered participants with `paid_at NOT NULL`

> **It's Day 1 of REAP Season 1.**
>
> You're one of [X] participants who have taken the challenge. Tonight at midnight, the Reap begins.
>
> **Your task today:** 21 continuous minutes of Zone 2 cardio, anytime before 23:45.
>
> Zone 2 is a moderate effort — you can talk, but you're working. Brisk walking, cycling, swimming, rowing. Your connected device will track it automatically. If you prefer to submit manually, you can do that at survivethereap.nz/dashboard until 23:45.
>
> **Check the Survival Board** at survivethereap.nz to see who else is in the game.
>
> You've paid your $13. You've made your choice. Now move.
>
> — The REAP Team
>
> *survivethereap.nz | Responsible Play: survivethereap.nz/wellbeing | Support: [email]*

---

### Day 1 Evening (1 November 2026) — Encouragement Notification

**Send time:** 18:00 NZST
**Type:** In-app push notification + email backup
**Subject:** 6 hours to midnight. Have you moved today?
**Audience:** All participants with `season_entries.status = 'ALIVE'`

> **6 hours left on Day 1.**
>
> If you've already done your 21 minutes — nicely done. Your stats are updating.
>
> If you haven't yet — you still have time. 21 minutes is what stands between you and tonight's Reap.
>
> *Manual submission closes at 23:45 — don't leave it too late.*
>
> — REAP

---

## Part 9: War Room Setup

### Team Locations and Channels — 1 November 2026

| Person | Role | Location | Primary Contact | Backup Contact |
|--------|------|----------|----------------|---------------|
| Leanne | Overall Commander | Available by phone | Mobile phone | WhatsApp |
| Ashleigh | Ops Commander | Home office or SW office | Mobile phone | Slack DM |
| Dev | Technical | Home office | Slack #reap-incident | Mobile phone |
| Shelley | Legal Standby | Available by phone 09:00–17:00 | Mobile phone | Email |

### Communication Channels

| Channel | Purpose | Members |
|---------|---------|---------|
| WhatsApp group: "REAP Launch Day" | Real-time operational updates throughout Day 1 | Leanne, Ashleigh, Dev |
| Slack #reap-incident | Technical issues and logs sharing | Dev + Ashleigh |
| Phone (individual) | P0 escalations, media inquiries, welfare incidents | All |
| Airtable: REAP Day 1 Log | Hourly monitoring records, incident log | Ashleigh maintains, all can view |

### Check-In Schedule

| Time | Format | Participants |
|------|--------|-------------|
| 09:00 | WhatsApp check-in: "All systems go / any issues?" | All |
| 12:00 | Phone call (10 min): midday debrief | Leanne + Ashleigh |
| 16:00 | Phone call (15 min): afternoon debrief | Leanne + Ashleigh |
| 00:05 | WhatsApp: Dev confirms elimination run complete | All |
| 00:30 | WhatsApp: Ashleigh confirms elimination log and email delivery | All |

---

## Part 10: Midnight NZT Monitoring Protocol

The midnight elimination run is the most critical technical event of the season. It runs automatically via pg_cron at 23:59 NZST. Failure to run, or running with errors, is a P0 incident.

### Pre-Run Protocol (23:00–23:59)

1. **23:00** — Dev opens Supabase logs tab in a browser window. Will monitor continuously until run completes.
2. **23:15** — Ashleigh opens admin dashboard. Notes current ALIVE count.
3. **23:30** — Dev confirms: `SELECT count(*) FROM season_entries WHERE status = 'ALIVE'` — records expected pre-elimination ALIVE count in Day 1 log.
4. **23:45** — Manual submission window closes (system-enforced).
5. **23:50** — Dev confirms: `SELECT * FROM cron.job WHERE jobname = 'midnight-elimination'` — confirms next scheduled run is imminent.
6. **23:55** — Dev on active watch. Ashleigh on WhatsApp standby.
7. **23:59** — Job executes.

### Run Monitoring (00:00–00:30)

1. **00:00–00:02** — Dev watches Supabase function logs for elimination job output. Expects: "Elimination run started", participant processing entries, "Elimination run complete: X processed, Y eliminated".
2. **00:02** — Dev confirms `elimination_log` table has a new entry with today's date, `status = 'COMPLETE'`.
3. **00:05** — Ashleigh runs: `SELECT status, count(*) FROM season_entries GROUP BY status` — confirms ALIVE and FALLEN counts.
4. **00:10** — Ashleigh confirms elimination emails sent (Resend dashboard — outbound count matches FALLEN delta).
5. **00:15** — Dev checks `elimination_log.error_count` — should be 0 or NULL.
6. **00:20** — WhatsApp update from Dev: "Elimination run complete. [X] ALIVE, [Y] eliminated. No errors."
7. **00:30** — Ashleigh compiles final Day 1 metrics. Sends to Leanne.

### Failure Scenarios

**Scenario: Cron job did not run (00:05, no elimination_log entry for tonight)**
- Dev immediately escalates to Leanne by phone.
- Dev manually triggers elimination function from Supabase admin (SQL or Edge Function invocation).
- Document: why did the job not run? Schedule confirmed? pg_cron extension enabled?
- Manual run must complete by 01:00 NZST. If not, P0 incident declared.
- Participants are not notified of the delay until manual run is confirmed complete.

**Scenario: Elimination run completes with error_count > 0**
- Dev pulls error details from `elimination_log`.
- For each errored participant: manually check their `daily_activity` — were they correctly processed?
- Any participant incorrectly eliminated: immediate reinstatement (see Scenario 3, Part 6).
- Leanne notified of error count and resolution.

---

## Part 11: Day 1 End-of-Day Review

Ashleigh compiles this report and delivers to Leanne by 01:00 NZST on 2 November.

### Day 1 Metrics Report — Template

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| New paid registrations (Day 1 total) | 100 | [X] | ✓/✗ |
| Total registered participants (cumulative) | — | [X] | — |
| Payment success rate | >95% | [X]% | ✓/✗ |
| Device sync success rate | >85% | [X]% | ✓/✗ |
| ALIVE at end of Day 1 (post-elimination) | — | [X] | — |
| Eliminated on Night 1 | — | [X] | — |
| Night 1 survival rate | >80% expected | [X]% | ✓/✗ |
| Welcome email open rate | >60% | [X]% | ✓/✗ |
| App error rate (Day 1 average) | <1% | [X]% | ✓/✗ |
| Support tickets received | — | [X] | — |
| Support tickets resolved | 100% within 4h | [X] | ✓/✗ |
| Welfare incidents logged | 0 target | [X] | ✓/✗ |
| P0/P1 incidents | 0 | [X] | ✓/✗ |
| Elimination log: run completed | Yes | Yes/No | ✓/✗ |
| Elimination log: error count | 0 | [X] | ✓/✗ |

### Launch Success Criteria (Day 1)

A Day 1 is considered **SUCCESSFUL** if ALL of the following are met:

1. Minimum 100 paid registrations recorded by 23:59 NZST 1 November
2. Payment success rate above 95%
3. Zero P0 incidents (complete system failures)
4. Midnight elimination run completed without errors
5. All elimination notifications sent within 30 minutes of run completion
6. Zero welfare incidents reaching Level 3 severity
7. All participant support tickets acknowledged within 1 hour, resolved within 4 hours
8. Application uptime > 99% for the day

A Day 1 is considered **CONDITIONAL** if registrations are between 50–99 (below target but viable), no P0 incidents, and all technical systems functional.

A Day 1 is considered **FAILED** if: P0 incident not resolved within 2 hours, or elimination run fails and cannot be manually completed, or registration count below 30.

---

## Part 12: Escalation Contact Matrix

| Person | Role | Mobile | WhatsApp | When to call |
|--------|------|--------|---------|-------------|
| Leanne [surname] | CEO | [mobile] | ✓ | P0/P1 incidents; welfare Level 2+; media; board communication |
| Ashleigh [surname] | Living Lab Lead | [mobile] | ✓ | Operational questions; participant welfare; social media escalation |
| [Dev name] | Developer | [mobile] | ✓ | Technical issues; cron job monitoring; hotfix decisions |
| Shelley [surname] | Legal Counsel | [mobile] | ✗ | Regulatory contact; legal threats; DIA inquiry; gambling framing media |
| [Board Chair name] | Board Chair | [mobile] | ✗ | P0 incident not resolved within 2 hours; significant welfare incident |
| Lifeline NZ | Crisis support | 0800 543 354 | ✗ | If participant needs immediate crisis support — provide to participant |
| NZ Police | Emergency | 111 | ✗ | If participant indicates immediate risk to life |

---

## Part 13: Launch Hold Protocol

**Trigger:** Any BLOCKER item from Part 1 is unresolved at the T-2 hour Gate Review (10:00 NZST 1 Nov), OR a P0 incident occurs before the go-live social posts at 09:00.

**Decision authority:** Leanne alone may call a Launch Hold.

**Launch Hold options:**

1. **Delay launch by 24 hours** — appropriate if technical blocker can be resolved within 24 hours. Social posts don't go, press release embargo extended. Participant communications updated.
2. **Delay launch by 1 week** — appropriate if a significant legal or technical issue requires more time. Participants notified. Launch rescheduled to 8 November 2026.
3. **Season cancelled** — last resort only. Board notification required. Full refunds issued.

**Communication if Launch Hold declared:**
- Leanne personally calls board chair within 30 minutes of hold decision.
- Participant email within 2 hours: "We're making a last-minute check to ensure everything is ready for you. Season 1 will now begin on [date]. Your registration and payment are fully secure."
- Social media: brief, honest — "We're taking one more day to get everything right. Season 1 launches [date]."

---

*Prepared by: Ashleigh [Living Lab Lead] | Approved by: Leanne [CEO]*
*Version: 1.0 | Last updated: April 2026 | Review before: 25 October 2026*
*Classification: Internal Operations — Confidential*
