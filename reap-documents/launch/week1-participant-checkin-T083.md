# REAP Season 1 — Week 1 Participant Check-In Protocol
**Task:** T083 — Week 1 Participant Check-In
**Owner:** Ashleigh [Living Lab Lead]
**Due:** 2026-11-07 (end of Week 1)
**Priority:** High
**Classification:** Internal Operations

---

## Document Purpose

This document defines the complete Week 1 participant engagement protocol for REAP Season 1. It covers every proactive communication touchpoint from Day 1 through Day 7, the welfare monitoring framework, early warning indicators, support SLAs, the first prize draw, and the Week 1 board summary.

Week 1 is the highest-risk operational period of the season. Participants are new, device integrations are being tested at scale for the first time, and the first wave of eliminations occurs on Night 1. The protocol is designed to maximise retention, catch welfare risks early, and generate the qualitative feedback needed for ongoing improvement.

---

## Part 1: Week 1 Objectives

### Primary Objectives

1. **Welfare:** No participant reaches a crisis point without Sport Waikato being aware and having responded.
2. **Retention:** At least 70% of Day 1 survivors remain active at end of Day 7 (accounting for legitimate night-by-night eliminations).
3. **Engagement:** At least 65% of active participants open at least one in-app notification during Week 1.
4. **Feedback:** Actionable qualitative feedback collected from a minimum of 30% of participants by Day 7.
5. **Technical confidence:** Any device sync issues identified and resolved within 24 hours of first report.

### Secondary Objectives

6. **Re-engagement:** All Night 1 eliminated participants receive a warm, forward-looking message that maintains their connection with REAP and increases Season 2 re-subscription likelihood.
7. **Prize draw:** Day 7 Week 1 Survivor Draw executed correctly and announced.
8. **Board reporting:** Leanne has a complete Week 1 summary ready for board.

---

## Part 2: Check-In Message Schedule

### Overview

| Day | Touchpoint | Type | Audience | Time |
|-----|-----------|------|----------|------|
| Day 1 | Welcome to Night 1 | In-app push + email | All active (ALIVE) | 18:00 NZST |
| Night 1 | Elimination notifications | Email | Eliminated participants | 00:10 NZST |
| Night 1 | Re-engagement message | Email | Eliminated participants | 00:10 NZST (bundled with notification) |
| Day 2 | "Night 1 survivor" push | In-app push | All ALIVE | 07:00 NZST |
| Day 3 | Encouragement message | In-app push + email | All ALIVE | 12:00 NZST |
| Day 5 | Habit-building check-in | In-app push | All ALIVE | 18:00 NZST |
| Day 7 | Week 1 milestone message | In-app push + email | All ALIVE | 09:00 NZST |
| Day 7 | Week 1 prize draw notification | In-app push + email | All ALIVE | 14:00 NZST (post-draw) |
| Day 7 | Winner notification | Email (personal) + phone | Winner | 14:30 NZST |
| Day 7 | Welfare check calls | Phone | Flagged participants | Business hours |

---

## Part 3: Full Message Templates

### 3.1 Day 1 Evening — Welcome to the First Night

**Type:** In-app push notification + email
**Send time:** 18:00 NZST, 1 November 2026
**Audience:** All participants with `season_entries.status = 'ALIVE'`
**Subject (email):** Your first REAP night starts in 6 hours

---

**In-App Push:**
> 6 hours to midnight. Have you done your 21 minutes? The Reap is watching.

---

**Email Body:**

> **It's your first REAP night.**
>
> Six hours from now, the first midnight check runs. Everyone who hasn't logged 21 minutes of Zone 2 cardio before 23:45 will be eliminated.
>
> If you've already moved today — well done. Your activity should be syncing. You can check your dashboard to confirm.
>
> If you haven't moved yet — there's still time. 21 minutes is a walk, a bike ride, a swim. You don't need to be a superhero. You just need to move.
>
> **Quick checks:**
> - Is your device connected? [Check your device connection →]
> - Can't get to a device? Manual submission is open until 23:45 at [link].
> - Using a Redemption Day? Declare it before 23:45 at [link].
>
> First nights are always the hardest. Thousands of people didn't start. You did.
>
> See you on the other side of midnight.
>
> — The REAP Team
>
> ---
> *If you're going through something difficult right now, support is available. Lifeline: 0800 543 354. Need to Talk: 1737.*

---

### 3.2 Night 1 Elimination — "You've Been Eliminated"

**Type:** Email (sent by Resend after elimination run completes)
**Send time:** 00:10 NZST, 2 November 2026 (automatically triggered by elimination cron job)
**Audience:** Participants set to `status = 'FALLEN'` on Night 1

---

**Email Subject:** You've been eliminated from REAP Season 1.

**Email Body:**

> **You've been eliminated from REAP Season 1.**
>
> You survived Day 0 — you registered, you paid, you chose to try. That's already more than most people do.
>
> Tonight, the Reap got you. That's okay — life is like that sometimes.
>
> You survived **[days_survived] day(s)** in Season 1. That's **[days_survived × 21] minutes** of Zone 2 movement you actually completed. That's real.
>
> **What happens now:**
> - Your subscription remains active — you will continue to be billed monthly until you cancel.
> - You can [cancel your subscription at any time] from your account settings — no penalties.
> - Season 2 opens **1 December 2026**. You can re-enter then.
>
> If you want to stay subscribed and jump straight into Season 2, you don't need to do anything. Your account will automatically be eligible for Season 2 registration.
>
> **Thank you for being part of Season 1.** Even if tonight was your last night, you were part of something that has never been done before in New Zealand.
>
> Come back for Season 2.
>
> — The REAP Team
>
> ---
> *Need to cancel your subscription? [Cancel here] — it takes 30 seconds.*
> *If things are tough right now, Lifeline is 0800 543 354. Available 24/7, free.*

---

### 3.3 Day 2 — Night 1 Survivor Push

**Type:** In-app push notification only (brief)
**Send time:** 07:00 NZST, 2 November 2026
**Audience:** All participants with `status = 'ALIVE'` after Night 1 elimination

---

**In-App Push:**
> You survived Night 1. [X] people didn't. 29 nights to go. Stay moving.

---

### 3.4 Day 3 — "You've Survived 3 Days"

**Type:** In-app push notification + email
**Send time:** 12:00 NZST, 3 November 2026
**Audience:** All participants with `status = 'ALIVE'`
**Subject (email):** 3 days in. You're still standing.

---

**In-App Push:**
> 3 days. 63 minutes of Zone 2 you actually did. The Survival Board is thinning. Keep going.

---

**Email Body:**

> **You've survived 3 days of REAP.**
>
> Three daily movement sessions. 63 minutes minimum. For three days in a row, you chose to move when you didn't have to.
>
> Here's where Season 1 stands right now:
>
> - **[ALIVE count] survivors** still standing
> - **[FALLEN count] participants** have been eliminated
> - **Season survival rate: [X]%**
>
> You're one of them.
>
> **Your Week 1 prize draw is on Day 7.** Stay alive until Sunday and you're automatically entered. The draw is $666 — to one surviving participant, chosen at random from everyone still standing.
>
> **How are you finding it?**
>
> We'd love your early feedback. It takes 2 minutes and helps us make REAP better. [Share your Week 1 feedback →]
>
> Three days down. Twenty-seven to go.
>
> — The REAP Team
>
> ---
> *Struggling with device sync? Contact us at [support email] — we'll fix it.*
> *Mental health support: 1737 (text or call), anytime.*

---

### 3.5 Day 5 — Habit Check-In

**Type:** In-app push notification only
**Send time:** 18:00 NZST, 5 November 2026
**Audience:** All participants with `status = 'ALIVE'`

---

**In-App Push:**
> Day 5. Have you built the habit yet? By now your body knows what 21 minutes feels like. Don't stop.

---

### 3.6 Day 7 — Week 1 Complete / Prize Draw Announcement

**Type:** In-app push notification + email
**Send time:** 09:00 NZST, 7 November 2026
**Audience:** All participants with `status = 'ALIVE'`
**Subject (email):** Week 1 complete. Prize draw today.

---

**In-App Push:**
> Week 1 done. You've survived 7 days. The first prize draw runs today — $666, one survivor, chosen at random. It could be you.

---

**Email Body:**

> **You've completed Week 1 of REAP Season 1.**
>
> Seven days. 147 minutes minimum. Seven days in a row, you made the choice to move.
>
> Not everyone made it this far.
>
> **Week 1 Survival Board:**
> - **[ALIVE count] survivors** remain after 7 days
> - **[FALLEN count] participants** have been eliminated
> - **Week 1 survival rate: [X]%**
>
> ---
>
> **The Week 1 Survivor Draw runs today.**
>
> Every participant who is still active and paid as of today is automatically entered. One winner. $666. Announced at 2pm.
>
> No action required — if you're reading this, you're in the draw.
>
> ---
>
> **Two weeks of REAP still ahead.**
>
> The second and third weeks are where it gets harder. Life gets in the way. The habit has to be strong enough to beat the excuses. But you've made it through Week 1 — that's the hardest part.
>
> Watch your inbox at 2pm for the draw result.
>
> — The REAP Team
>
> ---
> *View the Survival Board: [link]*
> *Support: [email] | Responsible Play: survivethereap.nz/wellbeing*

---

### 3.7 Day 7 — Week 1 Prize Draw Result Announcement (Post-Draw)

**Type:** In-app push notification + email to all ALIVE participants
**Send time:** 14:00 NZST, 7 November 2026 (after draw execution)
**Subject:** Week 1 Draw Result: A survivor wins $666

---

**Email Body (to all active survivors):**

> **The Week 1 Survivor Draw has been completed.**
>
> Today, at 14:00 NZST, we ran the first REAP Season 1 spot prize draw. Every one of the **[eligible count]** active, paid participants was eligible.
>
> The winner has been contacted privately.
>
> **[Winner's first name or username, if they gave consent to be named] has won $666.**
> [OR: "The winner has chosen to remain anonymous — and that's completely fine."]
>
> The draw was conducted using our admin prize draw system. [X] eligible participants. One random selection. Audited and witnessed.
>
> **If you didn't win this time:** there are six more prize draws in Season 1. The next one is Day 13 — the Friday the 13th Draw.
>
> Keep moving.
>
> — The REAP Team

---

### 3.8 Winner Personal Notification — Day 7

**Type:** Email (personal, separate from group announcement) + follow-up call
**Send time:** Immediately after draw execution (~14:00 NZST)
**Subject:** You've won the REAP Week 1 Survivor Draw — $666

---

**Email Body:**

> **Congratulations — you've won the REAP Season 1 Week 1 Survivor Draw.**
>
> You were selected from [X] eligible surviving participants. Your prize is **$666 NZD**, paid by bank transfer from Sport Waikato within 5 working days.
>
> **To claim your prize, we need:**
> 1. Your full name (for verification)
> 2. Your bank account number for payment
> 3. A copy of a photo ID (passport or driver's licence) to verify your identity
>
> Please reply to this email with the above, or call us at [number]. We'll confirm receipt and process payment within 5 working days.
>
> **Your privacy:** We'll ask whether you'd like your first name mentioned in the public prize announcement. Participation is entirely optional — anonymous announcement is perfectly fine.
>
> Congratulations again. You've earned it.
>
> — The REAP Team / Sport Waikato

*Note: A follow-up phone call will be made to the winner within 24 hours if no reply is received.*

---

## Part 4: Proactive Welfare Outreach

### Trigger Criteria for Proactive Contact

The following patterns trigger a proactive welfare check. Ashleigh reviews the participant list each day against these criteria and escalates any matches.

| Trigger | Data Source | Response |
|---------|------------|----------|
| Participant eliminated on Night 1 AND support ticket submitted expressing distress | Support inbox + `season_entries` | Personal reply within 1 hour; escalate to Leanne if Level 2+ |
| Participant sends in-app message containing any of: "can't cope", "struggling", "too much", "not okay", "giving up" | Support inbox / in-app messages | Ashleigh responds personally within 30 minutes. Assess severity level. |
| Participant submits refund request with reason indicating personal distress | Support inbox | Do not process immediately. Respond personally. Assess welfare before financial response. |
| Third party (family member, friend) contacts Sport Waikato about a participant | Support inbox | Respond to third party; attempt to contact participant directly. |
| Participant activity drops to 0 for 2+ consecutive days while still ALIVE (Redemption Days used) | Supabase — daily check of `daily_activity` | Proactive check-in message (optional, not mandatory — at Ashleigh's discretion) |

### Personal Call vs. Automated Message

| Situation | Response Type |
|-----------|--------------|
| Any message with crisis language (Level 3) | **Phone call within 15 minutes** (Ashleigh or Leanne). Do not respond by automated message. |
| Expressed significant distress after elimination (Level 2) | **Personal email response** within 1 hour. Consider phone call. |
| Minor upset/frustration about elimination | Automated elimination email is appropriate. No additional contact required unless requested. |
| Device sync issue preventing activity from recording | **Personal email** within 2 hours. Technical assistance. |
| Welfare flag from third party | **Phone call** to third party within 1 hour. Attempt participant contact same day. |

---

## Part 5: First Prize Draw (Day 7) — Communication Protocol

### Draw Execution

The Day 7 prize draw is executed by Ashleigh using the admin panel. Full procedure is documented in the Prize Draw Execution Procedure (T084). Summary:

1. Confirm eligible pool: all participants with `status = 'ALIVE'` AND `paid_at IS NOT NULL` AND no active payment disputes.
2. Open admin panel → Prize Draws → Draw #1 (Week 1 Survivor Draw).
3. Confirm eligible count.
4. Execute draw. Record output.
5. Screenshot eligible pool list + randomisation output. Two witnesses (Ashleigh + Leanne or another SW staff member).
6. Notify winner by email immediately. Phone call within 24 hours.
7. Announce to all survivors at 14:00 NZST.

### Public Announcement — Key Requirements

- Ask winner's preference on naming before any public announcement.
- Never describe the draw as a "lottery", "raffle", or "gambling".
- Describe it as a "promotional spot prize draw — one of seven draws run during Season 1 as subsidiary benefits of participation."
- Announce the number of eligible participants to demonstrate transparency.

---

## Part 6: Week 1 KPIs

Ashleigh tracks these metrics daily. Report delivered to Leanne at end of Day 7.

| KPI | Definition | Target | Source |
|-----|-----------|--------|--------|
| **Retention Rate — Day 7** | % of Day 1 ALIVE participants still ALIVE at end of Day 7 | >70% | `season_entries` |
| **Daily Active Users (DAU)** | % of ALIVE participants who synced activity or manually submitted on that day | >80% | `daily_activity` |
| **Device Sync Success Rate** | % of ALIVE participants whose connected device successfully synced at least once | >85% | TERRA API + `daily_activity` |
| **Manual Submission Rate** | % of daily activity records that are manual submissions (vs. device-synced) | <20% (too high indicates sync issues) | `daily_activity.device_source` |
| **Support Ticket Volume** | Total tickets received per day | Monitor — no hard target in Week 1 | Support inbox |
| **Support Ticket Resolution Time** | Time from ticket received to resolution | <4 hours (business hours) | Support inbox |
| **Welfare Incidents** | Count of welfare incidents logged | <2% of participant count (target: 0 Level 3) | Welfare register |
| **Email Open Rate** | Open rate for each communication | >60% for emails | Resend dashboard |
| **In-App Notification Open Rate** | Open rate for push notifications | >40% | App analytics |
| **Net Promoter Score (early)** | NPS from Day 3 feedback survey | >40 | Survey responses |
| **Elimination Accuracy** | % of eliminations that are confirmed correct (no reinstatements required) | 100% | Elimination log |

### Daily Tracking Format

Ashleigh maintains a daily row in Airtable (REAP Season 1 Operations):

| Field | Day 1 | Day 2 | Day 3 | Day 4 | Day 5 | Day 6 | Day 7 |
|-------|-------|-------|-------|-------|-------|-------|-------|
| ALIVE count (end of night) | | | | | | | |
| FALLEN count (cumulative) | | | | | | | |
| DAU % | | | | | | | |
| Device sync success % | | | | | | | |
| Support tickets (daily) | | | | | | | |
| Welfare incidents (daily) | | | | | | | |
| P0/P1 incidents | | | | | | | |

---

## Part 7: Early Warning Indicators

The following patterns, if observed, indicate a participant is at potential welfare risk and require proactive response. These are checked daily by Ashleigh.

### Welfare Risk Indicators

| Pattern | Risk Level | Action |
|---------|-----------|--------|
| Participant eliminated on Night 1, then contacts support expressing shame or self-blame | **High** | Personal response within 1 hour. Assess for Level 2+. |
| Participant posts on public social media indicating they feel like a failure after elimination | **Medium** | Monitor. Consider reaching out privately. Do not respond publicly in a way that highlights their elimination. |
| Participant has contacted support multiple times in Week 1 about unrelated topics | **Low-Medium** | Note pattern. Ashleigh to review messages for underlying distress signals. |
| Participant's activity data shows erratic patterns (e.g., submitting activity at 02:00 or 03:00 AM) | **Low** | No action required unless other signals present. |
| Participant has used both Redemption Days already by Day 5 | **Low** | System should remind them: no more Redemption Days remaining. |
| Participant has contacted support claiming technical failure prevented valid activity from being recorded | **Medium** | Technical investigation first. If genuine error: reinstate. If not: explain and provide manual submission guidance. |
| Participant explicitly states they are a compulsive exerciser or have an eating disorder history | **High** | Escalate to Leanne immediately. Consider whether continued participation is appropriate. Personal outreach. |
| A third party contacts Sport Waikato expressing concern about a participant | **High** | Phone call to third party. Attempt participant contact same day. |

---

## Part 8: Support Response SLA — Week 1

Week 1 has elevated support standards given it is the first operational period and participant trust is being established.

| Category | SLA | Owner |
|----------|-----|-------|
| Welfare inquiry (any level) | Acknowledge within 15 minutes. Personal response within 1 hour. | Ashleigh |
| Device sync failure | Acknowledge within 1 hour. Technical resolution or workaround within 2 hours. | Dev + Ashleigh |
| Elimination dispute | Acknowledge within 1 hour. Investigation and decision within 4 hours. | Ashleigh + Dev |
| Refund request | Acknowledge within 2 hours. Decision within 24 hours (business day). | Ashleigh + Leanne |
| General question | Respond within 4 hours (business hours). | Ashleigh |
| After-hours urgent welfare | Available via phone 24/7 for Level 3 incidents (Leanne on standby). | Leanne |

**Support inbox check schedule during Week 1:**
- 08:00 — clear overnight messages
- 12:00 — midday check
- 17:00 — end of business day
- 20:00 — evening check (especially important during elimination windows)
- 00:30 — post-elimination check (on nights 1–7)

---

## Part 9: First Elimination Wave — Night 1 at Scale

Night 1 is likely to produce the largest single elimination event of the season. Some participants will not complete their 21 minutes on Day 1 (novelty effect, technical issues, life interruptions). The elimination wave must be handled systematically and humanely.

### Night 1 Elimination Protocol

1. **00:05 NZST** — Dev confirms elimination run complete. FALLEN count recorded.
2. **00:10 NZST** — Elimination emails send automatically (Resend trigger from cron job).
3. **00:30 NZST** — Ashleigh confirms email delivery volume in Resend dashboard.
4. **08:00 NZST (2 Nov)** — Ashleigh reviews support inbox for any distress-related responses to elimination emails.
5. **08:30 NZST** — Any welfare flags from overnight are escalated to Leanne.
6. **09:00 NZST** — Social media post: "Night 1 survival rate: [X]% still standing." (only post if elimination run confirmed error-free)

### Elimination Email Quality Check

Before Night 1 elimination emails send, Ashleigh must confirm (pre-scheduled during Day 1 monitoring):
- The elimination email template includes: days survived count, total minutes achieved, Season 2 date, subscription cancellation link, crisis resource (Lifeline 0800 543 354).
- The elimination email does NOT include: dramatic imagery, shaming language, comparison to other participants, encouragement to share elimination card.

---

## Part 10: Re-Engagement Message for Eliminated Participants

The elimination email (Section 3.2) serves dual purpose: notification and re-engagement. Key elements:

1. **Acknowledge the achievement** — "You survived X days. That's X minutes of Zone 2 you actually completed."
2. **Normalise the elimination** — "Life is like that sometimes." Not shame-based.
3. **Subscription transparency** — Clearly explain that their subscription continues until they cancel.
4. **Direct path to cancel** — Provide the cancellation link in the first elimination email. This is legally required under NZ Consumer Law and builds trust.
5. **Season 2 hook** — "Season 2 opens 1 December. You can be back." Not a hard sell — a warm invitation.
6. **Crisis resource** — Always included, never omitted.

### Season 2 Early Bird Offer (for eliminated Season 1 participants)

At Day 14 of Season 1, send a targeted email to all eliminated participants who have not yet cancelled their subscription:

**Subject:** Still subscribed. Season 2 is 2 weeks away.

> You were eliminated in Season 1. That's okay — you gave it a go.
>
> Your subscription is still active. That means you're automatically ready for **Season 2, which opens 1 December**.
>
> If you want to try again, you don't need to do anything. Season 2 registration opens next month and your active subscription qualifies you.
>
> If you'd rather not continue — **[cancel your subscription here]**. No penalties, no hard feelings.
>
> Either way, thank you for being part of Season 1.
>
> — The REAP Team

---

## Part 11: Week 1 Board Summary

Leanne delivers this summary to the board at the next scheduled board meeting (or by email within 48 hours of Day 7 if a board meeting is not imminent).

### Week 1 Board Summary Template

**To:** Sport Waikato Board of Trustees
**From:** Leanne [CEO]
**Date:** 9 November 2026 (or first business day after Day 7)
**Subject:** REAP Season 1 — Week 1 Summary

---

**Executive Summary**

Season 1 of REAP completed its first week on [date]. [Overall positive/neutral/concerning] result. [X] participants entered Season 1. [Y] are still active after 7 days (Week 1 retention: [Z]%).

---

**Key Metrics — Week 1**

| Metric | Target | Actual | Assessment |
|--------|--------|--------|-----------|
| Registered participants (paid) | 100+ | [X] | ✓/✗/△ |
| Week 1 retention (Day 7 ALIVE) | >70% | [X]% | ✓/✗/△ |
| Payment success rate | >95% | [X]% | ✓/✗/△ |
| Device sync success rate | >85% | [X]% | ✓/✗/△ |
| Support tickets (Week 1 total) | < [X] | [X] | ✓/✗/△ |
| Welfare incidents (Level 2+) | 0 target | [X] | ✓/✗/△ |
| P0/P1 technical incidents | 0 | [X] | ✓/✗/△ |
| Elimination accuracy | 100% | [X]% | ✓/✗/△ |

---

**Financial Update**

- Week 1 subscription revenue: $[X] gross ($[Y] net after Stripe fees)
- Prize fund: $666 (Day 7 draw) paid to [winner name / anonymous per winner preference]
- No refunds issued to date [or: X refunds issued, totalling $Y]

---

**Welfare Summary**

- Total welfare incidents logged: [X]
- Level 3 incidents: [X] (brief description if any occurred)
- Level 2 incidents: [X] (brief description)
- All incidents resolved / [outstanding items noted]

---

**Early Participant Feedback (Day 3 Survey)**

- Survey responses received: [X] of [Y] participants ([Z]%)
- Key themes: [3–5 bullet points of key feedback]
- Early NPS estimate: [X]

---

**Outstanding Items for Board**

- [Any items requiring board decision or awareness]

---

**Outlook: Week 2**

[Brief narrative on expected Week 2 trajectory — retention trends, any operational changes planned]

---

*Prepared by: Leanne [CEO] | Source data: Ashleigh [Living Lab Lead]*
*Next board update: Mid-season report (target: 1 December 2026)*

---

*Document version: 1.0 | Prepared: April 2026 | Owner: Ashleigh [Living Lab Lead]*
*Review before: 25 October 2026 | Classification: Internal Operations*
