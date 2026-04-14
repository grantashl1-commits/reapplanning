# Pre-Launch Bug Fix Protocol: Survive the Reap
**Task:** T080 — Final App Bug Fixes Pre-Launch  
**Owner:** Dev Team  
**Due:** 2026-10-20  
**Priority:** Critical  
**Document Version:** 1.0  
**Date Prepared:** April 9, 2026  
**Prepared by:** Sport Waikato — REAP Project Team

---

## 1. Overview

This protocol governs the identification, triage, resolution, and verification of all bugs surfaced during the October 2026 beta, within the 10-day fix window (10–20 October 2026), ahead of the 1 November 2026 Season 1 public launch.

The protocol operates on one non-negotiable principle: **zero P0 bugs at launch**. No feature addition, no business pressure, and no deadline conflict overrides this requirement. If P0s are open at 20 October, the Go/No-Go meeting (25 October) will recommend delay.

This document is the authoritative reference for every member of the Dev Team during the fix window. It defines what a bug is, how it is classified, who is responsible for it, and how it gets to "closed."

---

## 2. Bug Classification System

### 2.1 P-Level Definitions

| P-Level | Name | Definition | Launch Requirement |
|---|---|---|---|
| **P0** | Launch Blocker | Any bug that could cause incorrect eliminations, expose participant health data, allow payment bypass, prevent Zone 2 recording, or break welfare notifications | **Zero P0s at launch. Non-negotiable.** |
| **P1** | High Priority | Significant functional bug that materially degrades the participant experience but does not create safety, data, or financial integrity risk | Fix before launch. Leanne must explicitly risk-accept any P1 that cannot be resolved by 20 Oct. |
| **P2** | Medium Priority | Bug or friction point that affects a non-core flow, causes confusion but has a workaround, or degrades UX without breaking functionality | Fix during Season 1 (target: first two weeks). Must be logged with resolution plan. |
| **P3** | Low Priority | Cosmetic issue, minor copy error, polish improvement, or low-frequency edge case with negligible impact | Backlog. No Season 1 launch gate. |

### 2.2 P0 Criteria (Complete List)

A bug qualifies as P0 if it meets any one of the following conditions:

| P0 Trigger | Example |
|---|---|
| **Incorrect elimination (false positive)** | A participant who completed 21+ continuous minutes of Zone 2 activity is eliminated at midnight |
| **Missed elimination (false negative)** | A participant who did NOT complete 21+ minutes is not eliminated, gaining an unfair advantage over eliminated participants |
| **Participant health data exposure** | Any participant's heart rate data, activity logs, or Zone 2 sessions are visible to another participant or the public |
| **Payment bypass** | A participant accesses Season 1 without a valid, charged Stripe subscription |
| **Zone 2 recording failure (silent)** | A valid Zone 2 session is completed (confirmed by TERRA raw data) but is not recorded in the database — participant has no record of it |
| **Welfare notification failure** | An elimination notification or welfare check email fails to send for any participant at midnight |
| **Midnight cron job failure** | The elimination job does not execute within 5 minutes of midnight NZT on any calendar day |
| **Data loss or corruption** | Any activity log, elimination record, subscription record, or health data is deleted, overwritten, or corrupted by app code |
| **Authentication bypass** | Any participant can access another participant's account, dashboard, or data |
| **Medical hold failure** | A participant with an active approved medical hold is eliminated when they should be paused |
| **Redemption Day failure** | A participant who activates their Redemption Day is incorrectly eliminated |

### 2.3 P1 Criteria (Examples)

| P1 Example |
|---|
| Device sync fails for an entire device category (e.g., all Garmin users affected) and no workaround is available |
| Survival board (leaderboard) shows incorrect active participant count |
| In-app Zone 2 HR range displays wrong values for a subset of participants (e.g., off-by-one in Tanaka calculation) |
| Resend email delivery rate drops below 95% for any mandatory notification type |
| App crashes on a specific screen for > 5% of sessions |
| Manual activity submission queue not visible to admin |
| Stripe webhook failure causes subscription status to not update in Supabase |

---

## 3. Bug Triage Process

### 3.1 Triage Flow

```
Reporter (participant, Ashleigh, or Dev team member)
    ↓
Bug logged in Bug Tracker (see Section 4)
    ↓
Ashleigh reviews within 4 hours (P0: 30 minutes)
    ↓
P-level assigned by Ashleigh (for P0: Ashleigh + Dev Lead jointly)
    ↓
Bug assigned to responsible developer
    ↓
Developer investigates root cause; updates Bug Tracker
    ↓
Fix developed in feature branch (never directly on main/production)
    ↓
Fix deployed to staging environment
    ↓
Regression test suite run on staging (see Section 8)
    ↓
Ashleigh verifies fix in staging environment
    ↓
Dev Lead reviews and approves production deploy
    ↓
Fix deployed to production (per deployment process — Section 7)
    ↓
Ashleigh re-tests in production
    ↓
Bug marked CLOSED in tracker
    ↓
P0 closures notified to Leanne immediately
```

### 3.2 Responsibility Matrix

| Role | Responsibility |
|---|---|
| **Any reporter** (participant, Ashleigh, Dev Team) | Submits bug report with full reproduction steps |
| **Ashleigh (Product Lead)** | First triage; P-level assignment; verification of fixes; escalation of P0s to Leanne |
| **Dev Lead** | Technical triage of P0 and P1; root cause investigation lead; production deploy approval |
| **Developer (assigned)** | Root cause investigation; fix implementation; unit test update; staging deployment |
| **Leanne (CEO)** | Notified of all P0s; final authority on risk-accepting any unresolved P1 |

---

## 4. Bug Tracking Structure

All bugs are tracked in a shared bug tracker (Notion database, Linear, or equivalent — Dev Team to confirm tooling by 1 September 2026). Each record contains the following fields:

| Field | Description | Example |
|---|---|---|
| **Bug ID** | Unique identifier | BUG-042 |
| **Title** | Short description | "Participant eliminated despite 23-minute Zone 2 session on Oct 3" |
| **P-Level** | P0 / P1 / P2 / P3 | P0 |
| **Reporter** | Who identified the issue | Ashleigh / BetaUser_017 |
| **Date Reported** | NZT timestamp | 2026-10-04 08:23 NZT |
| **Assignee** | Developer responsible | Dev Lead |
| **Status** | Open / In Progress / In Review / Staged / Closed | In Progress |
| **Steps to Reproduce** | Exact steps to trigger the bug | 1. Log in as participant X. 2. Navigate to Dashboard. 3. Observe... |
| **Environment** | Where it reproduces (beta / staging / production) | Beta + Staging |
| **Root Cause** | Technical explanation of why it happens | Tanaka formula used integer truncation; participant age 29 produces max HR 187.7 → 187; Zone 2 upper bound miscalculated |
| **Fix Description** | What was changed | Changed floor() to round() in hr_zones.ts calculateZone2 function |
| **Fix Branch** | Git branch name | fix/zone2-calculation-rounding |
| **Test Case** | How to verify the fix works | Create participant aged 29; confirm Zone 2 upper bound = 131 bpm (rounded); simulate 21-minute session at 128 bpm; confirm credited |
| **Regression Test Result** | Pass / Fail on full smoke test | Pass |
| **Re-Test Pass/Fail** | Ashleigh's production verification | Pass |
| **Date Closed** | NZT timestamp | 2026-10-12 14:45 NZT |
| **Notes** | Any additional context | Affects all participants aged X where Tanaka formula produces .5 decimal |

---

## 5. 10-Day Fix Window (10–20 October 2026)

### 5.1 Fix Window Structure

| Day | Date | Objective |
|---|---|---|
| Day 1 | 10 Oct (Sat) | Bug tracker populated from beta Issues Log; all beta bugs triaged and P-levelled; P0s assigned immediately |
| Day 2 | 11 Oct (Sun) | P0 fixes underway; P1 triage complete |
| Day 3 | 12 Oct (Mon) | All P0 fixes complete; staging regression tests run; P1 fixes underway |
| Day 4 | 13 Oct (Tue) | P0 fixes verified in staging; production deploy of P0 fixes; P1 fixes continuing |
| Day 5 | 14 Oct (Wed) | All P0s closed in production; P1 fixes continuing; beta survey closes |
| Day 6 | 15 Oct (Thu) | Beta Report delivered; P1 and P2 fixes continuing |
| Day 7 | 16 Oct (Fri) | P1 fix complete target; staging regression test for all P1 fixes |
| Day 8 | 17 Oct (Sat) | P1 fixes verified in staging; production deploy of P1 fixes |
| Day 9 | 18 Oct (Sun) | **Code freeze** — no new code to production after this date without Dev Lead + Leanne approval |
| Day 10 | 20 Oct (Tue) | Final regression test pass; all P0s and P1s confirmed closed; **Bug Fix Window closes** |

### 5.2 Feature Freeze and Code Freeze Dates

| Milestone | Date | Meaning |
|---|---|---|
| **Feature Freeze** | 15 October 2026 | No new features are developed or merged. Only bug fixes are permitted. |
| **Code Freeze** | 18 October 2026 | No new code is deployed to production. Only emergency P0 fixes with Dev Lead + Leanne approval can bypass this. |
| **Production Deploy Window** | 20 October 2026 | Final verified build deployed to production environment. All configurations confirmed. |
| **Launch Day** | 1 November 2026 | Season 1 begins. No code changes during Season 1 without change management process. |

---

## 6. Daily Stand-Up Cadence During Bug Fix Window

**Time:** 9:00am NZT, every day during the fix window (10–20 October 2026)  
**Format:** 15-minute maximum  
**Attendees:** Dev Lead, all assigned developers, Ashleigh  
**Optional:** Leanne (for P0 status updates)

### Stand-Up Agenda

| Item | Time | Owner |
|---|---|---|
| P0 status (open count, expected close date) | 3 min | Dev Lead |
| P1 status (open count, expected close date) | 3 min | Dev Lead |
| Blockers — any bugs not progressing and why | 3 min | Assigned developers |
| Staging regression test results (if run overnight) | 2 min | Dev Lead |
| Production deploy plan for today | 2 min | Dev Lead |
| Any new bugs reported since yesterday | 2 min | Ashleigh |

**Output:** Dev Lead updates the shared bug tracker after each standup with current status.  
**Escalation:** Any P0 that has not moved to "In Progress" within 24 hours of being opened is escalated to Leanne immediately.

---

## 7. Fix Deployment Process

Every fix follows this deployment pipeline without exception. There are no cowboy deploys.

### 7.1 Deployment Steps

| Step | Action | Owner | Gate |
|---|---|---|---|
| 1 | Fix developed in feature branch (from main) | Developer | PR review by second developer required |
| 2 | Unit tests updated / added for the fix | Developer | Tests must pass in CI before PR merge |
| 3 | PR reviewed and approved | Second developer | Minimum 1 reviewer; P0 fixes require Dev Lead review |
| 4 | Merged to staging branch; deployed to staging environment | Dev Lead | Automated CI deploy to staging |
| 5 | **Regression test suite run on staging** (see Section 8) | Ashleigh + Dev Lead | All 15 regression tests must pass before proceeding |
| 6 | Ashleigh verifies the specific bug fix in staging | Ashleigh | Explicit written sign-off in bug tracker |
| 7 | Dev Lead approves production deploy | Dev Lead | Written approval in Slack thread or bug tracker |
| 8 | Deploy to production (merge staging → main → production deploy) | Dev Lead | Automated CI deploy to production |
| 9 | Ashleigh re-tests the fix in production | Ashleigh | Explicit written sign-off |
| 10 | Bug marked CLOSED; P0 closure notified to Leanne | Ashleigh | Done |

### 7.2 Emergency P0 Bypass (Post-Code-Freeze)

If a P0 is discovered after code freeze (18 October) or during Season 1:

1. Dev Lead and Leanne jointly approve the emergency deploy in writing (Slack DM or email is sufficient).
2. Fix is developed, reviewed, and deployed through the full pipeline above — no steps are skipped.
3. The time between "P0 identified" and "production deploy approved" must not exceed 4 hours for Season 1 P0s.
4. All emergency deploys are documented in the production deployment log.

---

## 8. Regression Test Checklist (15 Items)

This smoke test is run after every deployment to staging and production. All 15 must pass before deployment is considered complete.

| # | Test | Steps | Pass Criteria |
|---|---|---|---|
| 1 | **Account registration** | Create a new account with a test email | Account created; email verification received; login successful |
| 2 | **Stripe subscription** | Complete the $13/month subscription flow with a Stripe test card | Subscription active in Stripe; participant record updated in Supabase |
| 3 | **Zone 2 range display** | Log in as a 35-year-old participant | Zone 2 range displays as 106–124 bpm (Tanaka: 208 − (0.7 × 35) = 183.5; 60–70% = 110–129 bpm — verify with implementation) |
| 4 | **TERRA device sync** | Simulate a valid TERRA webhook event for a 25-minute Zone 2 session | Session appears in participant's activity log within 5 minutes; session credited |
| 5 | **Zone 2 credit (qualifying session)** | Post a 21-minute session at valid Zone 2 HR via TERRA test event | Participant's daily status shows "SAFE" |
| 6 | **Zone 2 no-credit (non-qualifying session)** | Post a 20-minute session at valid Zone 2 HR (1 minute short) | Participant's daily status shows "AT RISK" — session not credited |
| 7 | **Midnight elimination cron (simulated)** | Trigger elimination job against test participant with no qualifying session | Test participant status set to ELIMINATED; elimination record created |
| 8 | **Midnight non-elimination (simulated)** | Trigger elimination job against test participant with qualifying session | Test participant status remains ACTIVE; no elimination record created |
| 9 | **Elimination notification email** | Trigger elimination for test account | Elimination email received within 5 minutes; content correct |
| 10 | **Medical hold activation** | Request a medical hold for a test participant; approve via admin | Participant's elimination paused; "ON HOLD" status displayed; midnight cron does not eliminate during hold |
| 11 | **Redemption Day activation** | Activate Redemption Day for a test participant with no qualifying session | Participant not eliminated at midnight; Redemption Day counter decremented |
| 12 | **Supabase RLS (data isolation)** | Log in as Participant A; attempt to query Participant B's `activity_logs` via API | Query returns 0 rows; 403 error or empty result — not Participant B's data |
| 13 | **Survival board** | View survival board as an active participant | Board displays correct active participant count; eliminated participants not shown as active |
| 14 | **Manual submission** | Submit a manual activity log via the in-app form | Submission appears in admin queue with PENDING status; admin can approve |
| 15 | **Voluntary exit + refund trigger** | Initiate voluntary exit for a test participant | Subscription cancelled in Stripe; pro-rata refund amount calculated and displayed; refund initiated within system |

**All 15 must pass.** Any single failure halts the production deploy until resolved.

---

## 9. Go/No-Go Decision Criteria for 1 November Launch

The Go/No-Go meeting is held on **25 October 2026** with Leanne, Ashleigh, and Dev Lead.

### 9.1 Non-Negotiable Go Criteria (All Must Be Met)

| Criterion | Standard |
|---|---|
| **Zero P0 bugs open** | Confirmed in bug tracker; verified by Ashleigh and Dev Lead |
| **Elimination accuracy** | 100% confirmed by full audit of all beta eliminations |
| **Regression test suite** | All 15 tests passing on production build |
| **Medical advisor sign-off** | Advisory letter received and filed (T069, due 1 July 2026) |
| **Stripe production mode active** | Confirmed — not test mode |
| **TERRA production credentials active** | Confirmed |
| **Resend production email domain authenticated** | Confirmed; no spam flags |
| **Supabase production DB (not beta)** | Confirmed; beta data not in production |

### 9.2 Conditional Go Criteria (Leanne Must Explicitly Accept Risk)

| Criterion | Leanne Acceptance Required |
|---|---|
| Any open P1 bug | Leanne reviews each P1; provides written risk acceptance or orders fix |
| Device sync rate between 85–90% | Leanne accepts with plan to fix in first 2 weeks of Season 1 |
| NPS between 20–30 | Leanne reviews root cause; provides written decision to proceed |

### 9.3 No-Go Criteria (Any Single Item = Delay Recommended)

| No-Go Trigger |
|---|
| Any open P0 bug |
| Elimination accuracy below 100% |
| Medical advisor sign-off not received |
| Stripe in test mode |
| Any Tier 2 welfare incident from beta that has not been resolved with a protocol change |
| Any open security vulnerability identified in beta (data exposure, authentication bypass) |
| Code freeze violated within 48 hours of launch without Dev Lead + Leanne sign-off |

---

## 10. Rollback Plan

If a fix deployed during the bug fix window (or after code freeze) introduces a new P0:

### 10.1 Rollback Trigger

Dev Lead or Ashleigh identifies a new P0 in production.

### 10.2 Rollback Steps

| Step | Action | Time Target |
|---|---|---|
| 1 | Dev Lead declares rollback decision (Slack + bug tracker) | Within 5 minutes of P0 identification |
| 2 | Production is rolled back to the last known-good build (git revert or previous deployment) | Within 15 minutes of decision |
| 3 | Staging environment updated to match rolled-back production | Within 30 minutes |
| 4 | If beta is ongoing: affected participants notified via email that a brief technical issue occurred; no elimination decisions made during the outage are final until Ashleigh reviews | Within 30 minutes |
| 5 | Root cause of newly-introduced P0 investigated | Within 4 hours |
| 6 | Fix developed and tested through full pipeline before re-deploying | Standard pipeline |
| 7 | Leanne notified of rollback event and outcome | Within 1 hour of rollback |

### 10.3 Rollback During Season 1

If a production issue requires rollback during Season 1:
- **Elimination decisions that occurred during the affected window are placed on hold** until the rollback is complete and Ashleigh can audit them.
- Affected participants are notified that their elimination status is under review.
- No participant is eliminated based on data that was captured during a confirmed system failure.
- The Welfare Incident Register is updated with the event.

---

## 11. Communication to Beta Participants During Downtime

If a critical fix requires brief planned downtime during the beta (or the pre-launch period), the following protocol applies.

### 11.1 Planned Downtime Notification

**Trigger:** Dev Lead identifies that a production deploy will cause >15 minutes of app unavailability.

**Lead time required:** At least 2 hours notice to participants (ideally 24 hours).

**Communication channels:**
1. In-app banner (if app is accessible before downtime)
2. Email to all beta participants via Resend

**Email template:**

> **Subject: REAP — Brief maintenance window scheduled**
>
> Hi [NAME],
>
> We're scheduling a brief maintenance window on [DATE] from [START TIME] to approximately [END TIME] NZT to deploy a technical fix.
>
> During this time, the REAP app may be temporarily unavailable.
>
> **Important:** If you complete your Zone 2 session during the maintenance window, your activity will still be recorded by your wearable device and will sync to REAP once we're back online. You will NOT be eliminated due to app unavailability.
>
> We'll email you as soon as we're back up.
>
> Ngā mihi,  
> The REAP Team

**Post-maintenance confirmation email sent within 15 minutes of app coming back online.**

### 11.2 Elimination Freeze During Unplanned Outage

If the app is unexpectedly unavailable at midnight NZT:
- The elimination cron job is paused if Dev Lead confirms the DB is unreliable.
- All participants who would have been subject to that night's elimination are placed on a 24-hour grace hold.
- The cron job re-runs when confirmed stable.
- Ashleigh manually audits all eliminations from the grace-hold night before they are finalised.

---

## 12. Production Deployment Log

Every production deployment during the fix window is recorded in the Production Deployment Log:

| Field | Detail |
|---|---|
| Deploy ID | DEPLOY-[number] |
| Date/Time (NZT) | Timestamp |
| Deployed by | Developer name |
| Approved by | Dev Lead name + Leanne (if post-code-freeze) |
| Bugs Resolved | BUG-[list] |
| Regression Test Result | All 15 pass / [exceptions noted] |
| Rollback Required | Yes / No |
| Notes | Any context |

This log is the authoritative record for the Go/No-Go meeting and for post-launch retrospective (T081 — Post-Season Retrospective).

---

## 13. Contact and Escalation

| Role | Person | Contact |
|---|---|---|
| Product Lead / Bug Triage | Ashleigh | ashleigh@sportwaikato.nz |
| CEO / P0 Escalation | Leanne | leanne@sportwaikato.nz |
| Dev Lead | TBC | [dev lead email] |
| Legal (if data breach) | Shelley | shelley@sportwaikato.nz |

**Emergency P0 escalation protocol:** Dev Lead texts Ashleigh AND Leanne immediately. No email-only escalation for P0s during the fix window or Season 1.

---

*Document Version: 1.0 (April 2026) | Owner: Dev Team | Review: Start of fix window (10 October 2026)*
