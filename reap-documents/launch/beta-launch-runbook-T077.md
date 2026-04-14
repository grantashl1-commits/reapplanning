# Beta Launch Runbook: Survive the Reap — Soft Launch (50 Beta Users)
**Task:** T077 — Soft Launch to 50 Beta Users  
**Owner:** Ashleigh  
**Due:** 2026-10-01  
**Priority:** Critical  
**Document Version:** 1.0  
**Date Prepared:** April 9, 2026  
**Prepared by:** Sport Waikato — REAP Project Team

---

## 1. Beta Purpose and Success Criteria

### 1.1 Purpose

The October 2026 beta is a controlled 14-day invite-only trial designed to validate that every critical system operates correctly at low scale before the 1 November 2026 public launch. The beta is not a marketing exercise — it is an engineering and operational stress test with real humans in a real survival game environment.

**The beta answers three questions:**
1. Does the app function correctly for 50 real users on real devices in real conditions?
2. Does the midnight elimination logic trigger accurately, consistently, and safely?
3. Do the welfare protocols function as designed when real participants are eliminated or distressed?

### 1.2 Success Criteria

| Criterion | Minimum Threshold to Proceed to Public Launch |
|---|---|
| Device sync success rate | ≥ 90% of sessions sync within 5 minutes of workout completion |
| Elimination accuracy | 100% — zero incorrect eliminations |
| Welfare notification delivery | 100% of elimination notifications sent within 5 minutes of midnight NZT |
| App crash rate | < 1% of sessions result in an unrecoverable crash |
| Zone 2 recording accuracy | ≥ 95% of sessions that should trigger Zone 2 credit are correctly recorded |
| Support ticket resolution | 100% of P0-equivalent beta issues triaged within 4 hours |
| Participant NPS (beta survey) | ≥ 30 |
| Zero P0 bugs open at beta close | Required — no exceptions |
| Welfare protocol activation | Welfare check protocol executes correctly in all test scenarios |

---

## 2. Beta Participant Selection Criteria

The 50 beta participants are hand-selected by Ashleigh and Leanne. The goal is a cohort that reflects the real-world Season 1 audience while including participants who will stress-test the system's edge cases.

### 2.1 Demographic Mix Target

| Segment | Target Count | Rationale |
|---|---|---|
| Sport Waikato staff / volunteers | 5–8 | Highest reliability; can report bugs professionally |
| Hamilton/Waikato community members (general fitness) | 15–20 | Core Season 1 audience |
| Athletes / high-frequency exercisers | 5–8 | Will expose Zone 2 edge cases; may challenge ceiling of recording |
| Sedentary/low-activity adults (re-activating) | 5–8 | Welfare risk population; real-world onboarding friction |
| 50+ age group | 4–6 | Tanaka formula edge cases; device variety |
| 18–25 age group | 4–6 | App usability feedback; social sharing behaviour |

### 2.2 Device Type Mix Target

| Device Category | Target Count |
|---|---|
| Apple Watch (watchOS 9+) | 15 |
| Garmin (Fenix / Forerunner / Venu) | 8 |
| Fitbit (Sense / Versa) | 6 |
| Samsung Galaxy Watch | 5 |
| Polar (H9 / H10 chest strap) | 4 |
| Whoop Band | 4 |
| No wearable (smartphone-only HR) | 4 |
| Manual submission only | 4 |

### 2.3 Special Monitor Participants

Include 2 participants specifically selected as welfare-risk monitors:
- **1 participant with a known tendency toward over-exercising** — to test whether the welfare protocol is triggered correctly for high-activity patterns.
- **1 participant with lower digital literacy** — to test whether onboarding and notification clarity are sufficient for less tech-confident users.

These participants are briefed separately and are aware of their additional monitoring role (with consent).

### 2.4 Exclusion Criteria

Do not invite:
- Anyone with an active medical condition that would make them a contraindicated participant under the medical advisor's reviewed list.
- Journalists or media contacts (beta is not a media event).
- Participants with a known propensity to share confidential pre-launch details publicly without consent.

---

## 3. Invitation Process and Messaging

### 3.1 Invitation Timeline

| Action | Date |
|---|---|
| Finalise beta participant list (50 confirmed) | 2026-09-18 |
| Send Invitation Email (see template below) | 2026-09-21 |
| Participants accept / decline (deadline) | 2026-09-25 |
| Waitlist activation (if <50 confirmed) | 2026-09-26 |
| Onboarding materials sent to confirmed participants | 2026-09-28 |
| Beta app access enabled for confirmed participants | 2026-09-30 |
| Beta Day 1 | 2026-10-01 |

### 3.2 Invitation Email Template

**Subject:** You're invited to beta test Survive the Reap — Hamilton's new fitness survival game

---

Hi [FIRST NAME],

You've been personally selected to be one of 50 beta testers for **Survive the Reap (REAP)** — a brand new 30-day fitness survival game from Sport Waikato, launching publicly on 1 November 2026.

**What is REAP?**
Every day, you must complete 21+ continuous minutes of Zone 2 heart rate activity. Fail to log it before midnight NZT — and you're eliminated. Last person standing wins bragging rights and a share of a $666 prize pool.

**What we need from you as a beta tester:**
- Participate genuinely for the full 14-day beta period (1–14 October 2026).
- Complete a short daily activity log through the app.
- Fill in a feedback survey at the end of the beta (14 October).
- Report any bugs, issues, or confusing experiences to the REAP team immediately (there's a feedback button in the app).

**What you get:**
- Free access to the beta (no charge during beta period).
- A guaranteed spot in Season 1 at half-price ($6.50/month) if you choose to join.
- The satisfaction of helping build something genuinely good for Waikato.

**To accept:** Reply to this email by 25 September with "I'm in" and the device/wearable you plan to use.

**Beta NDA:** By participating, you agree not to share screenshots, app details, or publicly discuss REAP until the public launch on 1 November 2026. We'll send you a brief confidentiality note to sign.

Questions? Email ashleigh@sportwaikato.nz

Ngā mihi,  
Ashleigh  
Product Lead, Survive the Reap | Sport Waikato

---

### 3.3 Acceptance Confirmation Email

Sent to each confirmed participant upon acceptance. Includes:
- Beta period dates (1–14 October 2026)
- App download link (TestFlight / direct APK)
- Onboarding checklist (see Section 4)
- Emergency contact for critical issues (Ashleigh's mobile number)
- Short confidentiality acknowledgement to sign and return

---

## 4. Beta Onboarding Checklist

Each participant must complete all steps before beta Day 1 (1 October 2026).

| Step | Action | Owner | Verification |
|---|---|---|---|
| 1 | Download and install the REAP app | Participant | Ashleigh confirms account created |
| 2 | Create account (email + password) | Participant | Confirmed in Supabase user table |
| 3 | Complete health screening questionnaire | Participant | Recorded in DB |
| 4 | Accept Terms of Participation and Privacy Policy | Participant | Timestamp recorded in DB |
| 5 | Connect wearable device via TERRA API (or confirm manual/smartphone mode) | Participant | Device sync status = CONNECTED in dashboard |
| 6 | Confirm Zone 2 heart rate range is displayed correctly in app | Participant + Ashleigh | Ashleigh reviews per participant during setup call |
| 7 | Complete a test Zone 2 session (≥ 5 minutes) and confirm it syncs | Participant | TERRA sync log shows successful test session |
| 8 | Subscribe via Stripe (beta = $0.00 test transaction) | Participant | Stripe dashboard shows active subscription |
| 9 | Attend optional 15-minute onboarding Zoom call (group session) | Participant | Scheduled 29 September 2026 |
| 10 | Confirm receipt of and consent to beta NDA | Participant | Signed NDA returned via email |

---

## 5. Beta Monitoring Dashboard

Ashleigh reviews the following dashboard metrics every day of the beta, no later than 9:00am NZT.

### 5.1 Daily Monitoring Checklist

| # | Metric | Where to Check | Alert Threshold |
|---|---|---|---|
| 1 | Participants eliminated last night (midnight run) | REAP Admin Dashboard → Elimination Log | Any incorrect elimination = P0 |
| 2 | Device sync success rate (last 24 hours) | TERRA API dashboard + Supabase sync_logs table | < 90% = P1 |
| 3 | Zone 2 sessions recorded (count vs. expected) | Supabase activity_logs table | Significant drop from prior day = investigate |
| 4 | Support tickets / bug reports submitted | In-app feedback log + email inbox | Any P0 flag = immediate action |
| 5 | Welfare flags (welfare form submissions, distress signals in feedback) | Welfare Incident Register | Any submission = review before noon |
| 6 | App crash reports | Sentry / error monitoring dashboard | > 1% crash rate = P1 |
| 7 | Stripe subscription status | Stripe dashboard | Any unexpected churn or failed charge = investigate |
| 8 | Resend notification delivery rates | Resend dashboard | < 98% delivery rate = investigate |
| 9 | Participants with 0 recorded activity in last 48 hours | Supabase query | Flag for welfare check message |
| 10 | Active participant count | REAP Admin Dashboard | Track elimination curve daily |

### 5.2 Escalation Protocol (During Beta)

| Issue Type | First Response | Escalation |
|---|---|---|
| Incorrect elimination | Immediately reverse elimination; notify participant; log P0 | Leanne + Dev Team within 30 minutes |
| Device sync failure (> 3 participants affected) | Notify affected participants; investigate TERRA API | Dev Team within 2 hours |
| Welfare concern flagged | Welfare SOP initiated; Ashleigh contacts participant | Leanne within 4 hours if Tier 2 |
| App crash (widespread) | Notify all participants via email; initiate rollback if needed | Dev Team within 1 hour |
| Data breach or security event | Suspend app; notify Leanne immediately | Board + legal within 24 hours |

---

## 6. Technical Pre-Go-Live Checklist (10 Items)

All 10 items must be confirmed green by 30 September 2026 (midnight NZT) before beta goes live.

| # | Check | Responsible | Pass Criteria |
|---|---|---|---|
| 1 | **Midnight elimination cron job** — runs at exactly 00:00:00 NZT on each calendar day | Dev Team | Confirmed by simulating a test midnight run against beta DB on 28 Sept |
| 2 | **TERRA API webhook** — receives heart rate data from all 8 supported device types without timeout | Dev Team | Confirmed via TERRA sandbox test with all 8 device categories |
| 3 | **Zone 2 detection algorithm** — correctly identifies 21+ continuous minutes at 60–70% max HR using participant's Tanaka-derived range | Dev Team | Passes test suite of 20 edge-case sessions (sessions that cross the 21-minute threshold at varying HR drift) |
| 4 | **Resend email delivery** — elimination notifications, welcome emails, and welfare check emails send and arrive within 5 minutes | Dev Team | Confirmed via test send to 10 internal email addresses (different providers: Gmail, Outlook, iCloud, Spark) |
| 5 | **Stripe subscription flow** — beta $0.00 test subscription created, charged, and active status confirmed | Dev Team | Confirmed via Stripe test mode with 5 test accounts |
| 6 | **Supabase RLS policies** — each participant can only see their own data | Dev Team | Penetration test: confirm participant A cannot query participant B's activity_logs or elimination status |
| 7 | **Medical hold flow** — participant can declare a hold, admin can approve/deny, elimination is correctly paused during hold | Dev Team + Ashleigh | End-to-end test with 2 internal test accounts |
| 8 | **Redemption Day flow** — participant can claim Redemption Day, it is deducted from their allowance, and they are not eliminated on that day | Dev Team | End-to-end test with 2 internal test accounts |
| 9 | **Manual activity submission** — manual submission form visible, submittable, and creates a pending record in admin queue | Dev Team + Ashleigh | Confirmed via test submission with admin review |
| 10 | **Error monitoring (Sentry)** — active and alerting on unhandled exceptions in production environment | Dev Team | Confirm Sentry receives a test error alert; confirm alert routes to correct Slack channel / email |

---

## 7. Beta Duration and Schedule

| Period | Dates | Description |
|---|---|---|
| Beta Period | 1–14 October 2026 (14 days) | Full survival game operating with 50 real participants |
| Feedback window | 14 October 2026 | In-app and email survey sent to all participants |
| Analysis period | 15 October 2026 | Ashleigh analyses feedback and metrics |
| Beta report to Leanne | 15 October 2026 | Beta findings report delivered (see T079) |
| Bug fix window | 10–20 October 2026 (overlapping) | Dev Team resolves beta-identified issues (see T080) |
| Public launch | 1 November 2026 | Season 1 begins |

---

## 8. Daily Operations During Beta: What Happens at Midnight NZT

The following automated sequence executes every night at midnight NZT during the beta.

| Time (NZT) | System Action | Manual Check Required? |
|---|---|---|
| 23:45 | REAP sends "30 minutes to midnight" push notification to participants who have not yet reached 21 minutes | No — automated |
| 00:00:00 | Elimination cron job runs: checks each active participant's activity log for the calendar day; any participant below 21 continuous Zone 2 minutes is marked ELIMINATED | **Yes** — Ashleigh checks elimination log by 00:15 |
| 00:00–00:05 | Resend dispatches elimination notification emails and push notifications to eliminated participants | No — automated |
| 00:05 | Supabase triggers welfare flag check: any participant eliminated with zero recorded activity in the last 48 hours is added to welfare check queue | **Yes** — Ashleigh reviews welfare flag queue by 09:00 next morning |
| 00:05 | Survival board (public leaderboard) updates to reflect new active participant count | No — automated |
| 00:10 | Ashleigh receives automated daily summary report (Supabase Edge Function → Resend → ashleigh@sportwaikato.nz): active count, eliminated count tonight, sync success rate, any error flags | No — automated |

**Beta-specific rule:** During the beta, Ashleigh has the ability to manually reverse an elimination within 30 minutes of midnight if a technical error caused it. All manual reversals must be logged with reason in the Beta Issues Log (see Section 10).

---

## 9. Issues Log Protocol

### 9.1 Beta Issues Log Structure

All bugs, welfare incidents, and operational issues identified during the beta are logged in the Beta Issues Log (shared Notion doc or Airtable — to be confirmed by Dev Team).

| Field | Description |
|---|---|
| Issue ID | BUG-[number] or WEL-[number] |
| Date/Time Identified | NZT timestamp |
| Reporter | Who identified the issue |
| Description | What happened, including exact steps |
| P-Level | P0, P1, P2, P3 (see T080 classification) |
| Assigned To | Developer or team responsible |
| Status | Open / In Progress / Fixed / Closed |
| Resolution | What was done to fix it |
| Verified By | Who confirmed the fix worked |
| Date Closed | NZT timestamp |

### 9.2 P-Level Definitions (Beta Context)

| P-Level | Definition | Required Response Time |
|---|---|---|
| P0 | Launch blocker — incorrect elimination, data exposure, payment bypass, broken Zone 2 recording, welfare notification failure | Immediate (< 30 minutes) |
| P1 | Significant functional bug — degrades experience but no safety/data risk | < 4 hours |
| P2 | Minor functional bug or UX issue | Fix before public launch if possible |
| P3 | Cosmetic issue or low-priority improvement | Backlog |

### 9.3 Welfare Incident Logging

All welfare flags are logged separately in the Welfare Incident Register using the standard Sport Waikato welfare SOP format (Tier 1 / Tier 2 classification).

---

## 10. Beta-Specific Welfare Protocol

During the beta, welfare check triggers are set at **lower thresholds** than the planned Season 1 defaults. This is intentional: with only 50 participants, the team can afford heightened individual attention, and it is better to over-trigger during beta and calibrate from there.

| Beta Welfare Trigger | Action |
|---|---|
| Participant eliminated on their first day (Day 1 of beta) | Ashleigh sends a personal check-in message by 9am that day |
| Participant eliminated with 0 recorded activity in 48 hours | Ashleigh sends welfare check message within 8 hours of midnight |
| Participant submits a welfare form | Ashleigh or Leanne calls the participant within 4 hours |
| Participant eliminated 3+ consecutive nights and sends no in-app activity | Flag for welfare review; consider whether a direct call is warranted |
| Any participant sends a message expressing distress via in-app feedback | Welfare SOP Tier 2 — Leanne notified immediately |

**Welfare check message template (sent for 48-hour inactivity trigger):**

> Hi [NAME], we noticed you haven't logged any activity over the last couple of days in the REAP beta. We just wanted to check in — are you doing okay? There's no pressure here; you can withdraw any time or request a medical hold if you need a break. If you're running into any technical issues, reply to this email and Ashleigh will get back to you within a few hours. Look after yourself. — Team REAP

---

## 11. Communication Cadence with Beta Participants

| Day | Communication | Channel | Owner |
|---|---|---|---|
| Day 0 (30 Sept) | Final onboarding reminder; "Beta starts tomorrow at midnight — get ready!" | Email | Ashleigh |
| Day 1 (1 Oct) | **Welcome to REAP** — overview of what to expect, reminder of how Zone 2 is tracked, who to contact if issues arise | Email + in-app notification | Automated + Ashleigh review |
| Day 3 (3 Oct) | Quick pulse-check: "How's it going? Any issues connecting your device?" | Email | Ashleigh |
| Day 7 (7 Oct) | **Midpoint check-in** — what's working well, what's confusing, teaser that feedback survey is coming | Email | Ashleigh |
| Day 12 (12 Oct) | "Two days to go — make sure you finish strong. Feedback survey arriving in 48 hours" | In-app push + Email | Automated |
| Day 14 (14 Oct) | **Beta close** — thank you message; survey link; Season 1 offer (half-price entry) | Email | Ashleigh |
| Day 15 (15 Oct) | Survey reminder (to non-respondents) | Email | Automated |

---

## 12. Data Collected from Beta

The following metrics are extracted from the REAP database and monitoring tools at the close of the beta for analysis.

| Metric | Data Source | Query/Report |
|---|---|---|
| Daily active participant count | Supabase `activity_logs` | Count distinct participant_id with activity per day |
| Device sync success rate | TERRA webhook logs + Supabase `sync_events` | Successful syncs / total expected syncs |
| Zone 2 session accuracy | Supabase `activity_logs` vs. raw TERRA HR data | Spot-check 20% of sessions against raw data |
| Elimination accuracy | Supabase `eliminations` table vs. manual audit | 100% audit — every elimination verified |
| Midnight run execution time | Supabase cron logs | Should complete within 60 seconds for 50 users |
| Notification delivery rate | Resend dashboard | Delivered / sent |
| App crash rate | Sentry | Crashes / sessions |
| Pages per session | App analytics | Average page depth |
| Support tickets / bug reports | Beta Issues Log | Total by P-level |
| Medical hold requests | Supabase `holds` table | Count and resolution time |
| Redemption Day usage | Supabase `redemption_days` table | Count used |
| Participant survey NPS | Survey tool | Net Promoter Score |
| Participant survey responses | Survey tool | Qualitative and quantitative analysis |

---

## 13. Beta Exit Criteria

The following are minimum requirements before the team proceeds to public launch. All must be confirmed green by Ashleigh in the Beta Report (due 15 October 2026).

| # | Exit Criterion | Minimum Standard |
|---|---|---|
| 1 | Zero P0 bugs open | 0 open P0s at beta close |
| 2 | Elimination accuracy | 100% — all eliminations manually audited and confirmed correct |
| 3 | Device sync success rate | ≥ 90% |
| 4 | Zone 2 recording accuracy | ≥ 95% of qualifying sessions correctly credited |
| 5 | Notification delivery | ≥ 98% of elimination notifications delivered within 5 min of midnight |
| 6 | No participant health harm | Zero Tier 2 welfare incidents attributable to app behaviour |
| 7 | Stripe payment flow | 100% test subscriptions processed correctly |
| 8 | Welfare protocol execution | All welfare triggers correctly activated during beta; at least 1 real welfare check scenario completed |
| 9 | Participant NPS ≥ 30 | Confirmed via feedback survey |
| 10 | Medical hold flow | At least 1 hold tested and confirmed correct in beta environment |

---

## 14. Beta Abort Criteria

If any of the following conditions occur during the beta, Ashleigh will immediately pause the beta and convene an emergency meeting with Leanne and the Dev Team before proceeding.

| Condition | Response |
|---|---|
| Any incorrect elimination that cannot be manually reversed within 30 minutes | Pause beta; notify all affected participants; convene emergency triage |
| Participant health data (HR, activity logs) exposed to other participants or public | Pause beta; legal notification protocol; Supabase audit |
| More than 5 participants unable to sync their device within 48 hours of onboarding (systemic TERRA failure) | Pause beta; TERRA API support escalation |
| Any Tier 2 welfare incident (cardiac event, acute injury, mental health crisis) | Welfare SOP activated; beta paused for welfare review; Leanne notified immediately |
| Stripe charging participants incorrectly (beta should be $0.00) | Pause beta; contact Stripe; refund any incorrectly charged amounts |
| App unavailable for > 2 hours during the active day | Notify all participants; dev team on immediate recovery |
| Discovery of a P0 bug affecting the integrity of the elimination engine | Pause beta; fix deployed to staging; regression tested before resuming |

---

## 15. Beta-to-Launch Transition Checklist

To be completed by Ashleigh and Dev Team between 15–31 October 2026.

| # | Action | Owner | Due |
|---|---|---|---|
| 1 | Beta Issues Log: all P0s and P1s resolved and verified | Dev Team | 2026-10-20 |
| 2 | Beta feedback analysis complete (T079) | Ashleigh | 2026-10-15 |
| 3 | Medical advisor sign-off letter received and filed | Leanne | 2026-07-01 (earlier) |
| 4 | Season 1 participant onboarding flow updated based on beta learnings | Dev Team + Ashleigh | 2026-10-20 |
| 5 | Production environment confirmed: Supabase production DB (not beta DB) active | Dev Team | 2026-10-20 |
| 6 | Stripe production keys confirmed (not test mode) | Dev Team | 2026-10-20 |
| 7 | Resend production email domain authenticated and warmed | Dev Team | 2026-10-20 |
| 8 | TERRA API production credentials confirmed | Dev Team | 2026-10-20 |
| 9 | Sentry production environment monitoring active | Dev Team | 2026-10-20 |
| 10 | Public launch comms approved by Leanne (email, social, press) | Ashleigh + Leanne | 2026-10-25 |
| 11 | Celebrity launch event coordination complete (T078) | Leanne | 2026-10-15 |
| 12 | Final Go/No-Go meeting: Leanne, Ashleigh, Dev Lead | All | 2026-10-25 |
| 13 | Season 1 opens for public subscription | Dev Team | 2026-10-26 (6 days before go-live) |
| 14 | Season 1 Day 1 confirmed: midnight NZT 1 November 2026 | All | 2026-11-01 |

---

*Document Version: 1.0 (April 2026) | Owner: Ashleigh | Review: Pre-beta (September 2026)*
