# Board Reporting Cadence & Template

**Version:** 1.0  
**Date:** April 9, 2026  
**Owner:** Leanne (CEO)  
**Approved by:** Sport Waikato Board

---

## Overview

This document establishes the monthly reporting schedule and template for REAP board updates. Reports are designed to provide Sport Waikato board with actionable insights into REAP performance, financial health, and operational risks.

---

## Reporting Cadence

### Monthly Board Report
**When:** Last Friday of each month  
**Audience:** Sport Waikato Board  
**Owner:** Leanne (CEO)  
**Attendees:** Leanne, Ashleigh (optional), Shelley (optional for legal items)  
**Duration:** 15–20 minutes presentation + Q&A  
**Distribution:** Email to board 24 hours before meeting

### Pre-Season (August–October)
**Focus:** Launch readiness, compliance sign-off, marketing progress  
**Reports:**
- August: Legal compliance status, beta test readiness
- September: Marketing campaign progress, soft launch event planning
- October: Launch week all-hands planning, system readiness check

### Active Season (November–December)
**Focus:** Participant engagement, financial performance, operational incidents  
**Reports:**
- (Each month): KPI performance, welfare incidents, financial summary

### Post-Season (January)
**Focus:** Season retrospective, season 2 planning, financial reconciliation  
**Report:** Comprehensive end-of-season evaluation

---

## Monthly Board Report Template

### 1. Executive Summary (1 page max)

**Format:** Bullet points + 1–2 key metrics

**Content:**
- Season status (Active / Paused / Ended)
- Key achievement this month
- Key risk this month
- CEO recommendation (if action needed)

**Example:**
```
EXECUTIVE SUMMARY – November 2026

Status: Active (Day 1–30, on track for Nov 30 completion)

Key Achievement: 
- Season launched Nov 1 with 2,847 participants (target: 2,500)
- Day 1 technical performance: 99.8% uptime, 0 critical incidents

Key Risk:
- Wearable sync failures affecting 3% of participants (TERRA API latency)
  Action: Dev team investigating; monitoring closely

Recommendation: Continue; no board action needed at this time
```

---

### 2. KPI Dashboard (1 page)

**Refresh:** Weekly by Ashleigh; reported monthly  
**Format:** Table with color-coded target status (Green / Amber / Red)

**Key Metrics:**

| KPI | Current | Target | Status | Notes |
|-----|---------|--------|--------|-------|
| **Participant Acquisition** | | | | |
| Active participants | 2,847 | 2,500 | 🟢 | +14% above target |
| Daily active users | 2,642 | 2,375 | 🟢 | Engagement strong |
| Registration-to-payment conversion | 94% | 90% | 🟢 | Payments smooth |
| **Engagement & Retention** | | | | |
| Completion rate (Day 1) | 98% | 95% | 🟢 | Strong start |
| Avg days survived | 12.4 | 15 | 🟡 | Ambient | Zone 2 require harder than expected |
| Voluntary exit rate | 2.1% | <5% | 🟢 | Good retention |
| Medical hold usage | 1.8% | 2–3% | 🟢 | On track |
| **Revenue & Finance** | | | | |
| Gross revenue | $37,011 | $32,500 | 🟢 | +13.8% |
| Prize payout % | 12.5% | 15% | 🟢 | Within tolerance |
| Refund rate | 3.2% | <5% | 🟢 | Reasonable |
| **Operational Health** | | | | |
| Uptime (%) | 99.8% | 99.5% | 🟢 | Excellent |
| Avg support response (hrs) | 3.2 | 24 | 🟢 | Fast |
| Welfare incidents | 8 | <2% of users | 🟢 | 2% of 2,847 = 57; 8 is 0.3% |
| | | | | Risk: Still low but monitor |

**Status legend:**
- 🟢 Green: On or above target
- 🟡 Amber: Within 10–20% of target; needs monitoring
- 🔴 Red: > 20% off target; action required

---

### 3. Participant Health & Welfare (1 page)

**Owner:** Ashleigh (Welfare Register)  
**Refresh:** Real-time; reported monthly  
**Format:** Incident summary + case studies

**Monthly Summary:**
- Total incidents reported: [X]
- Tier 1 incidents (operational): [X]
- Tier 2 incidents (medical): [X]
- Average response time: [X hours]
- Escalations to CEO: [X]
- Escalations to board: [X]

**Incident Categories (YTD):**
| Category | Count | Examples |
|----------|-------|----------|
| Wearable device issues | 3 | Apple Watch sync failed |
| Injury/pain report | 2 | Knee pain, lower back strain |
| Mental health concern | 1 | Anxiety during elimination |
| Technical bug | 2 | Duplicate elimination notice |
| General support | [X] | Questions about rules |

**Case Studies (2–3 detailed):**

*Example Case 1:*
```
Participant: P002847 (Emma, 34, fitness beginner)
Date: Nov 8, Day 8
Incident: Reported ankle injury; requested medical hold
Action: Medical hold approved for 7 days (Nov 8–15)
Outcome: Returned on Day 16; currently Day 23, still active
Learning: Early support + medical hold framework working well
```

*Example Case 2:*
```
Participant: P003102 (Marcus, 28, athlete)
Date: Nov 15, Day 15
Incident: Reported chest tightness during movement session
Action: Immediate welfare escalation; recommended GP consultation
Outcome: Participant saw GP; GP cleared participation; returned to game Day 17
Learning: Rapid escalation + medical professional consultation = safe resolution
```

---

### 4. Financial Summary (1 page)

**Owner:** Leanne (CEO) w/ Finance Lead  
**Refresh:** Weekly; reported monthly  
**Format:** Income statement + cash flow commentary

**P&L Summary (Month):**
```
REAP Monthly Financial Summary – November 2026

REVENUE:
  Subscription revenue (2,847 × $13)           $37,011
  Spot prize draws (net)                        -$4,662
  __________________________________________________
  NET REVENUE                                  $32,349

EXPENSES:
  Team salaries (allocated: Ashleigh 50%, Shelley 25%)    $8,500
  Stripe processing fees (2.9% + $0.30)                   $1,084
  TERRA API (wearable integration @ $0.50/user/mo)        $1,424
  Supabase (database, auth, functions)                      $450
  Email/notifications (Resend, push services)               $187
  Legal & compliance (retainer)                             $500
  Marketing (pre-launch budget)                           $2,000
  Miscellaneous (insurance, comms, etc.)                    $300
  __________________________________________________
  TOTAL EXPENSES                               $14,445

GROSS PROFIT                                   $17,904
GROSS MARGIN                                    55.3%
```

**Cash Flow Notes:**
- Stripe processing: 1–2 day settlement
- Q1 prize payout: $4,662 committed; split across 7 draws (see draw schedule)
- Fund balance: Healthy; no liquidity concerns

**Budget vs. Actuals (YTD October pre-launch):**
```
Category          | Budget | Actual | Variance | Notes
Salaries          | $12K   | $11.8K | -$200   | On track
Operations        | $3K    | $2.1K  | -$900   | Contingency not used
Marketing         | $15K   | $14.2K | -$800   | Launch costs slightly lower
Legal/Compliance  | $2.5K  | $2.6K  | +$100   | Minor overrun
TOTAL             | $32.5K | $30.7K | -$1.8K  | 5.5% under budget
```

---

### 5. Marketing & Growth (1 page)

**Owner:** Ashleigh (Marketing Lead)  
**Refresh:** Real-time; reported monthly  
**Format:** Campaign status + acquisition channels

**Current Campaign Status:**
- **Launch event (soft):** Oct 15 celebrity event → 45 media mentions, 1.2M social impressions
- **Pre-registration campaign:** 4,200 email subscribers; 2,847 converters (67% conversion)
- **Paid social (Meta):** $5K spend → 847 clicks → 12.1% conversion to download
- **Influencer outreach:** 12 micro-influencers activated; avg 45K followers each; feedback positive

**Acquisition Channels (by volume):**
| Channel | Participants | % | CAC (est) |
|---------|---|---|---|
| Organic / Word-of-mouth | 1,247 | 43.8% | $0 |
| Meta ads (paid social) | 847 | 29.8% | $5.90 |
| Influencer | 456 | 16.0% | $10.97 |
| Press / Editorial | 234 | 8.2% | $0 |
| Email (pre-reg list) | 63 | 2.2% | $0 |

**Next month focus:** Maintain organic momentum; wind down paid ads; prepare Season 2 planning

---

### 6. Operational & Technical (1 page)

**Owner:** Ashleigh (Operations) + Dev Team  
**Refresh:** Weekly; reported monthly  
**Format:** System health + dev roadmap

**System Uptime & Performance:**
- Web app: 99.8% uptime (1 incident: 45 min; resolved)
- Stripe integration: 100% uptime
- TERRA (wearables): 98.5% uptime (intermittent latency)
- Supabase: 99.95% uptime
- Push notifications: 99.2%

**Known Issues (in priority order):**

1. **TERRA API latency (3% of participants)** 
   - Issue: Wearable data syncs delayed 1–4 hours
   - Impact: Participants unsure if movement counted
   - Status: Under investigation with TERRA; monitoring close
   - Resolution ETA: 2 weeks (TERRA ticket #TER-8847)

2. **Medical hold extension logic** 
   - Issue: Medical holds extending past 7 days in some cases
   - Impact: 2 participants affected; refunds issued
   - Status: Bug fixed in Feb update; regression testing in progress

3. **Timezone edge case (midnight elimination)**
   - Issue: 1–2 minute clock skew causing premature eliminations for NZ South Island
   - Impact: Low-frequency but high-impact
   - Status: Scheduled for Nov 30 fix; hotline monitored during Day 30

**Dev Roadmap (Post-Season 1):**
- Season pause/resume functionality
- Bulk data export for board reporting
- Mobile app (iOS/Android) exploration
- Advanced analytics dashboard (heat maps of Zone 2 adoption)

---

### 7. Risks & Mitigations (1 page)

**Format:** Risk matrix + response plan

**Active Risks:**

| Risk | Severity | Likelihood | Status | Mitigation |
|------|----------|-----------|--------|-----------|
| DIA review of prize structure | High | Medium | **Monitoring** | Legal review pre-planned; Shelley on standby |
| Participant injury event | High | Low | **Monitoring** | Welfare protocols ready; medical advisor engaged |
| Media criticism | Medium | Medium | **Monitoring** | Comms strategy prepared; CEO quote ready |
| Wearable API failure | Medium | Low | **Mitigating** | TERRA escalation; fallback to manual entry |

**Closed Risks (resolved this month):**
- Celebrity ambassador availability → **Resolved** (committed through Dec)
- Payment processing delays → **Resolved** (Stripe config optimized)

---

### 8. Recommendations & Action Items

**For board consideration:**

1. **Approval item:** Continue Season 1 as planned (no intervention needed)
2. **Information item:** Marketing performing 15% ahead of target  
3. **Discussion item:** Should Sport Waikato promote REAP internally via staff benefits?
4. **Future planning:** Season 2 planning to commence January 2027

**Owner action items:**
- [ ] Leanne: Prepare Season 2 business case (Jan meeting)
- [ ] Ashleigh: Finalize post-season retrospective report (Dec 30)
- [ ] Shelley: DIA review contingency planning (ongoing)

---

## Report Delivery

**Timing:**
- Draft: 5 days before board meeting
- Review: Leanne + relevant stakeholders (3 days before)
- Final: Sent to board 24 hours before meeting

**Format:**
- PDF (1-page summary) + detailed appendix (shared drive)
- Presented verbally at board meeting (10–15 minutes)
- Q&A recorded in board minutes

**Archival:**
- All reports stored: /board-reports/2026/
- Indexed by month + season phase

---

## Emergency Reporting

**If critical incident occurs between board meetings:**
- CEO (Leanne) notifies board immediately
- Written incident report within 24 hours
- Emergency board meeting called if needed
- Standard board meeting agenda adjusted to include incident debrief

---

## Board Template Usage

This template should be customized for each month's specific focus:

**August (Pre-soft-launch):** Heavy legal/compliance focus  
**September (Pre-soft-launch):** Heavy marketing focus  
**October (Pre-launch):** Technology readiness focus  
**November (Season start):** KPI dashboard + early learnings focus  
**December (Holiday):** Holiday/wind-down focus; lighter reporting  
**January (Post-season):** Comprehensive retrospective + planning focus

---

**Document Owner:** Leanne (CEO)  
**Last Updated:** April 9, 2026  
**Next Review:** August 1, 2026 (pre-soft-launch first report)  
**Status:** Ready for implementation
