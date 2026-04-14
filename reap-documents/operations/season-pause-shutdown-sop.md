# Season Pause & Shutdown Trigger SOP

**Version:** 1.0  
**Date:** April 9, 2026  
**Owner:** Ashleigh (Product Lead)  
**Approved by:** Leanne (CEO)

---

## Overview

This SOP defines the triggers and protocols for pausing or shutting down a REAP season due to operational or medical concerns. It ensures rapid decision-making while protecting participant safety and business continuity.

---

## Season State Machine

```
Registration Open
    ↓
Season Active (Day 1–30)
    ↓
Tier 1 Pause-able State (immediate operational action)
    ↓ (or)
Tier 2 Pause-able State (board decision required)
    ↓
Season Paused
    ↓ (resolution)
Resume or End Season
    ↓
Season Ended
```

---

## Tier 1 Triggers (Operational Pause Authority)

**Tier 1 pauses are initiated by:** Ashleigh (Product Lead) OR Leanne (CEO)  
**Notification:** Immediate to team + participants  
**Duration:** 24–48 hours typical; up to 7 days max  
**Board notification:** Same day, informational

### Tier 1 Trigger Definitions

#### 1.1 Technical Infrastructure Failure
**Condition:** Critical app or backend system unavailable > 30 minutes  
**Examples:**
- Web app down (HTTP 500 errors)
- Stripe payment processing down (unable to authenticate payments)
- Wearable API (TERRA) down (heartrate data unavailable for > 1 hour)
- Database (Supabase) offline
- Push notification system failing (elimination notices not sending)

**Response:**
1. Ashleigh confirms issue with Dev Team
2. If resolution < 1 hour: No pause (inform participants of temporary disruption)
3. If resolution > 1 hour: Pause season
4. Notify participants: "Season paused due to technical maintenance. Resuming in [X hours]."
5. Extend season by duration of pause (adjust Day 31 end date)

**Resumption:**
- Send resume notification to all participants
- Log pause incident (duration, cause, resolution)
- No financial adjustments unless downtime > 4 hours (then offer pro-rata extension)

#### 1.2 Data Integrity Issue
**Condition:** Systemic data corruption affects > 5% of participants  
**Examples:**
- Bulk elimination due to wearable sync failure (e.g., Apple Health timestamp bug eliminating non-eligible participants)
- Duplicate entries creating false claims
- Stripe webhook failure causing payment status loss
- Heart rate data loss for > 100 participants

**Response:**
1. Ashleigh + Dev Team: Assess scope (% affected, financial impact, reversibility)
2. If fixable: Pause season, fix data, resume
3. If not fixable: Issue compensatory refunds + pro-rata extension
4. Notify affected participants within 2 hours
5. Escalate to Leanne for decision on fairness measures (e.g., refund, replay period, etc.)

**Example communication:**
"We've identified a data sync issue affecting [X] participants' heart rate data. Season is paused while we investigate. We'll notify you of the outcome within 24 hours."

#### 1.3 Payment Processing Breakdown
**Condition:** Stripe cannot process any new subscriptions OR refunds > 2 hours  
**Response:** Pause registration only (not active season) until Stripe recovers; escalate to Stripe support

#### 1.4 High-Volume Welfare Incidents (Tier 1)
**Condition:** 3+ welfare incidents reported within 4 hours requiring immediate investigation  
**Examples:**
- Multiple participants report chest pain / acute injury
- Unusual spike in medical hold requests
- Multiple participants unable to meet movement goal due to shared event (e.g., regional power outage)

**Response:**
1. Ashleigh + welfare advisor: Assess if incidents are systemic or coincidental
2. If systemic: Pause season; investigate root cause
3. Notify participants: "Season paused due to [cause]. Your safety is our priority."
4. Escalate to Leanne + medical advisor immediately
5. Decision: Resume with modifications or end season (see Tier 2)

---

## Tier 2 Triggers (Board-Level Decision Required)

**Tier 2 pauses or shutdowns require:** Leanne (CEO) + Board resolution  
**Notification:** Immediate to Leanne + 24-hour board meeting called  
**Duration:** Pause undefined; may lead to permanent season end  
**Public communication:** Coordinated by CEO

### Tier 2 Trigger Definitions

#### 2.1 Serious Participant Injury or Death
**Condition:** Hospitalization, cardiac event, or death potentially linked to REAP participation  
**Response:**
1. Ashleigh: Collect incident details (date, participant ID, description)
2. Immediate notification to Leanne (CEO) + medical advisor
3. Emergency board meeting called (within 4 hours)
4. Decision options:
   - **Pause for investigation** (1–7 days)
   - **Modify rules** (lower intensity requirement, extend medical holds, etc.)
   - **End season** (immediate termination, pro-rata refunds + goodwill gestures)
5. Public communication prepared by CEO + comms lead (same day)
6. Legal review with Shelley (assess liability, PR, regulatory notification)

**Standard language (do not use without CEO approval):**
"REAP has announced a season pause following a participant health incident. The wellbeing of our community is paramount. We are working with medical advisors and will update the community within [X hours]."

#### 2.2 Regulatory/DIA Concern
**Condition:** Department of Internal Affairs (DIA) raises concern about gambling classification OR Privacy Commissioner flags data handling  
**Response:**
1. Immediate notification to Leanne + Shelley (Legal)
2. Shelley: Assess regulatory threat + required response
3. Leanne: Decides if season pause needed while responding to regulator
4. Options:
   - **Continue with modifications** (e.g., add disclosure, change prize draw language)
   - **Pause for investigation** (legal response preparation)
   - **End season** (if regulatory threat is serious)
5. Board informed same day

**Timeline:** DIA response usually required within 5–10 working days; pause likely pending response

#### 2.3 Reputational Crisis
**Condition:** Major negative media coverage or social controversy affecting REAP brand/Sport Waikato  
**Examples:**
- Participant goes viral with injury claim (unverified but significant media pickup)
- REAP competition rules misrepresented in press
- Celebrity ambassador scandal affecting REAP launch
- Significant participant backlash online

**Response:**
1. Leanne (CEO): Assess reputational risk
2. Call ad hoc board meeting
3. Options:
   - **Communicate transparently** (no pause needed)
   - **Pause for messaging** (reassess participant communication strategy)
   - **Temporary rebranding pause** (shift focus, alter prize structure, etc.)
4. Comms lead drafts response; board approves messaging

#### 2.4 Unsustainable Welfare Burden
**Condition:** Welfare incidents exceed capacity to investigate and respond to safely  
**Threshold:** 10+ incidents per day OR 1+ incident per 50 active participants  
**Response:**
1. Ashleigh + welfare advisor: Assess if pause needed
2. If yes: Escalate to Leanne immediately
3. Leanne + Board: Decide between:
   - **Pause for operational restructuring** (add welfare staff, modify rules, etc.)
   - **Modify game rules** (extend difficulty or pause triggers, lower movement requirement)
   - **End season** (immediate termination)

**Example trigger: 400 active survivors; 8 welfare incidents on a single day → unsustainable burden**

#### 2.5 Tier 1 Pause Extension
**Condition:** Tier 1 pause extends beyond 7 days OR requires permanent modification  
**Response:** Escalate to Tier 2; board decides on resolution (resolve & resume, modify & resume, or end season)

---

## Pause & Resume Workflow

### Pause Initiation (Tier 1 or 2)

**Step 1: Assessment**
- [ ] Trigger identified (which Tier? which category?)
- [ ] Scope assessed (% participants affected, duration?)
- [ ] Root cause documented
- [ ] Decision maker notified (Ashleigh for Tier 1; Leanne for Tier 2)

**Step 2: Decision**
- [ ] Pause or monitor-only?
- [ ] Duration estimate
- [ ] Modifications needed (rules, refunds, extensions)?
- [ ] Public communication needed?

**Step 3: Implementation**
- [ ] Update season status in app to "Paused"
- [ ] Push notification to all participants: "[Reason]. Season will resume [date/time] or we will update you within [timeframe]."
- [ ] Update FAQ / in-app banner
- [ ] Log pause in incident register

**Step 4: Escalation (Tier 1 to Board)**
- [ ] Email board with pause reason, trigger category, resolution plan
- [ ] If Tier 2: Schedule emergency board meeting

**Step 5: Communication**
- [ ] Email to all participants (within 1 hour of pause)
- [ ] Social media update
- [ ] Press statement (if significant / Tier 2)
- [ ] Staff all-hands update

---

### Resume or End-Season Determination

**Resolution decision matrix (Tier 1 triggers):**

| Trigger | Root Cause | Resolution | Season Extension |
|---------|-----------|-----------|------------------|
| Tech infrastructure | Stripe down 2 hrs | Resume when fixed | +2 hours to end date |
| Tech infrastructure | App down 4 hrs | Resume + extend | +4 hours to end date |
| Data integrity | < 1% affected | Resume after fix | Normal |
| Data integrity | 5%+ affected | Resume + refund claims | +1 day extension + refunds |
| Payment processing | Temporary | Resume (registration only) | None |
| Welfare incidents (Tier 1) | Environmental | Resume with comms | None |

**Resolution decision matrix (Tier 2 triggers):**

| Trigger | Decision Path | Outcome |
|---------|---------------|---------|
| Injury / Hospitalization | Board + medical advisor | Modify rules OR pause 7 days OR end season |
| DIA concern | Board + legal | Pause to respond to regulator OR end season |
| Reputational crisis | Board + comms | Transparent comms (resume) OR pause for rebrand (1–7 days) |
| Welfare burden | Board + operations | Pause for restructuring (3–7 days) OR modify rules |

---

### Resume Notification

**When pause is lifted:**
1. Update app status: "Season Active"
2. Push notification: "Season resumed. Full elimination/movement tracking active again as of [timestamp]."
3. Extend end date in database if pause lasted > 2 hours
4. Log resolution in incident register

**Example:**
"Season paused at [timestamp] due to [cause]. Pause duration: 4 hours. Season end date extended from Day 30 (Nov 30) to Day 30 (Dec 4). Resuming now."

---

## Season Termination Procedure

**Triggered if:** Tier 1 pause irresoluble OR Tier 2 board decision to end

**Steps:**

1. **Decision authority:** Board approves termination (or CEO emergency authority if time-critical)
2. **Notification:** All participants notified within 1 hour
3. **Refund calculation:** 
   - Formula: (Days remaining) × $0.433 per day
   - Pro-rata refunds initiated immediately
4. **Communications:**
   - Email to all participants
   - Press statement (if public announcement needed)
   - Board notification
   - Post-mortem analysis scheduled
5. **Financial reconciliation:**
   - Total refunds calculated
   - Stripe refund batch processed
   - Finance notified for quarterly reporting
6. **Database cleanup:**
   - Season status → "Ended (Terminated)"
   - Participant status → "Refunded" (if eligible)
   - Historical data archived

**Termination communication template:**
```
Subject: Survive the Reap Season [X] Terminated – Refund Information

Hi [First Name],

Unfortunately, REAP Season [X] has been terminated effective [date] due to [reason]. Your safety and experience are our top priorities, and this decision was necessary to protect our community.

**Your refund:**
- Amount: NZ$[X.XX] (pro-rata for [Y] days participated)
- Status: Processing (5–7 business days to your account)
- Reason: Season termination per Terms & Conditions Section 9

We're evaluating what led to this outcome and will share lessons learned with the community. REAP will return for Season [X+1] with improvements based on this experience.

Questions? Contact support@survivethereap.nz

Thank you for being part of REAP,
Survive the Reap Team
```

---

## Incident Logging & Review

### Pause Incident Register

**Maintained by:** Ashleigh  
**Location:** /admin/pause-register.md  
**Update frequency:** Real-time during pause/resume

**Log fields:**
- Date paused
- Trigger category (Tier 1 or 2)
- Root cause
- Duration
- Participants affected (count)
- Decision maker(s)
- Resolution
- Financial impact (refunds, extensions, etc.)
- Board notification date (Tier 2)
- Post-incident notes

### Quarterly Review

**Performed by:** Leanne (CEO) + Operations team  
**Frequency:** End of season

**Review questions:**
- How many pauses occurred? (Target: ≤ 2 per season)
- Were triggers identified correctly?
- Were response times acceptable (decision < 1 hour)?
- Did communication reach all participants?
- Financial impact total? (refunds, extensions)
- What improvements prevent future pauses?

---

## Authority & Escalation Chain

```
Tier 1 Trigger Identified
    ↓
Ashleigh (Product Lead) or Dev Team confirms
    ↓
Ashleigh decides: Pause or Monitor?
    ↓
If Pause: Immediate notification to Leanne (CEO) + implement
         Leanne informs board (informational, same day)
    ↓
If Tier 2 Trigger: Immediate escalation to Leanne
    ↓
Leanne schedules emergency board meeting
    ↓
Board votes on resolution
    ↓
Implement board decision + communicate
```

---

## Tools & Systems

- **Season status:** Supabase (season state field)
- **Participant notification:** Push notification service + email
- **Incident log:** /admin/pause-register.md (shared doc)
- **Board communication:** Email + Slack
- **Financial reconciliation:** Stripe dashboard + /admin/refund-register.xlsx

---

## Training & Handoff

All team members should understand:
- What constitutes a Tier 1 vs. Tier 2 trigger
- Who has pause authority (Ashleigh = Tier 1; Leanne = Tier 2)
- Communication template for participants
- How to notify board and CEO

---

**Document Owner:** Ashleigh  
**Last Updated:** April 9, 2026  
**Next Review:** Post-soft-launch (November 2026)  
**Status:** Ready for implementation
