# Customer Support Process Design for REAP

**Date:** April 9, 2026  
**Owner:** Ashleigh (Product Lead)  
**Version:** 1.0  
**Status:** Ready for Implementation

---

## Overview

This document outlines the three-tier customer support structure for Survive the Reap (REAP). Support is designed to be responsive, scalable, and escalation-aware.

---

## Support Tier Structure

### Tier 1: Self-Service (90% of inquiries)
**Channel:** In-app FAQ, help docs, email template responses  
**Response time:** Immediate (pre-written)  
**Owner:** Auto-response system + shared knowledge base  
**Skills needed:** None (system-driven)

**Common Tier 1 Issues & Self-Service Solutions:**
1. "How do I track my movement?" → In-app guide + wearable connection tutorials
2. "What does Zone 2 mean?" → Detailed FAQ on heart rate zones + example device configs
3. "Why was I eliminated?" → In-app elimination notice + 24-hour retro view of heart rate data
4. "How do I reset my watch sync?" → Step-by-step device re-pairing guide
5. "Can I get a refund?" → Automated refund policy page + direct link to Refund Request Form
6. "Where's the leaderboard?" → In-app navigation help + link to Survival Board
7. "How many days have I survived?" → Dashboard stat explanation + season timeline
8. "What is a Redemption Day?" → Game mechanics FAQ with visual examples

**Self-Service FAQ Topics (Minimum Required):**
- Account setup & login troubleshooting
- Wearable device connection (Apple Health, Garmin, Fitbit, Strava, etc.)
- Zone 2 definition & recalculation
- Refund request process & timeline
- Elimination rules & appeals
- Welfare hold request process
- Privacy & data handling
- Payment & subscription issues

---

### Tier 2: Email Support (8% of inquiries)
**Channel:** support@survivethereap.nz  
**Response time:** Within 24 hours (business hours)  
**Owner:** Ashleigh + volunteer support team (2–3 people)  
**Skills needed:** Product knowledge, empathy, minor account troubleshooting

**Tier 2 Responsibilities:**
- Answer questions not covered by FAQ
- Assist with account recovery (forgotten password, etc.)
- Investigate unusual heart rate data
- Process manual device entry requests
- Handle general feedback & feature requests
- Provide welfare incident pre-screening

**Tier 2 Escalation Criteria:**
Issue should be escalated if:
- Participant mentions medical concern or significant distress
- Data corruption suspected (participant eliminated but data suggests they met requirement)
- Participant requests special exemption (medical, religious, etc.)
- Payment/billing issue requires Stripe intervention
- Issue takes > 2 back-and-forth emails to resolve

**Tier 2 Response Template Examples:**
- Generic holding response: "Thanks for reaching out! We're looking into this and will respond within 24 hours."
- Wearable issue: "Let's try re-syncing your device. [Specific step-by-step guide for their device]"
- Refund request: "Your refund has been initiated. [Refund amount], expecting arrival in 5–7 business days."

---

### Tier 3: Escalation Support (2% of inquiries)
**Channel:** Direct escalation from Tier 2  
**Response time:** Within 48 hours  
**Owner:** Leanne (CEO) + Ashleigh + Shelley (Legal)  
**Skills needed:** Decision-making authority, legal/medical judgment, incident management

**Tier 3 Responsibilities:**
- Medical or welfare incident response
- Data integrity issues (potential fraud, algorithmic error)
- Special accommodations (disability access, religious exemptions)
- Participant appeal of elimination (requires data forensics)
- Payment/Stripe issues requiring account-level intervention
- Reputational risk management (negative social media, press inquiries)
- Formal complaint procedures

**Tier 3 Escalation Path:**
1. **Ashleigh** (Tier 2 owner) → documents issue with supporting screenshots/data
2. **Leanne** (CEO) → decision gate (Is this a business decision or legal decision?)
3. **If legal:** → Shelley for T&C interpretation
4. **If medical:** → Sports medicine advisor (consulting)
5. **If reputational:** → Leanne + comms lead (coordinated response)
6. **If critical:** → Board notification (CEO decides when necessary)

**Tier 3 Escalation Template:**
- Document: Incident date, participant ID, issue summary, impact, attempted resolution
- Decision: Outcome (refund, exemption, suspension, etc.) + reasoning
- Communication: Draft response email to participant

---

## Support Workflow

```
Participant Inquiry
        ↓
Matches FAQ/Self-Service? YES → Auto-respond with knowledge base link
        ↓ NO
Tier 2 Email Support (24-hour response)
        ↓
Can resolve within scope? (Wearable help, refund, minor issue)
        ↓ YES → Respond & close
        ↓ NO
Tier 3 Escalation (48-hour response)
        ↓
Legal/Medical/Special case decision
        ↓
Final decision communicated to participant (via email + in-app notification if major change)
        ↓
Case closed & documented for season retrospective
```

---

## Service Level Agreements (SLAs)

| Priority | Tier | Response Time | Resolution Time | Example Issue |
|----------|------|---------------|-----------------|---------------|
| **Critical** | 3 | 2 hours | 24 hours | Medical emergency, data loss, account hack |
| **High** | 2–3 | 4 hours | 48 hours | Elimination appeal, payment failure, welfare incident |
| **Medium** | 2 | 24 hours | 5 business days | Wearable not syncing, refund questions |
| **Low** | 1–2 | 24 hours | 10 business days | Feature request, general feedback |

---

## Communication Standards

### Email Tone Guidelines
- **Friendly but professional** — Match participants' energy without being overly casual
- **Clear and concise** — Get to resolution in 2–3 paragraphs max
- **Acknowledge the issue** — Show you understand the frustration
- **Provide actionable next steps** — Don't leave the participant wondering what to do

### Email Template Structure
```
Subject: Re: [Participant's subject line] – [Resolution status]

Hi [First Name],

Thanks for reaching out! [Acknowledge their issue in 1 sentence].

[Solution or next step in 2–3 sentences].

If this doesn't work or you have other questions, reply here and we'll follow up within [timeframe].

Best,
[Support team member name]
Survive the Reap Support
```

### In-App Notifications
- **Tier 2 resolution:** In-app notification when status changes (e.g., "Your refund has been approved")
- **Tier 3 escalation:** Participant notified of decision + reasoning within 24 hours

---

## Support Channels & Routing

### Current Channels (MVP)
- **Email:** support@survivethereap.nz → shared inbox, monitored by Tier 2 team
- **In-app:** Help button → links to FAQ + email contact form
- **FAQ page:** 404 errors → direct users to FAQ
- **No phone support:** Not required for MVP; reassess post-launch

### Future Channels (Post-MVP)
- **Live chat** (seasonal, especially during peak hours)
- **Community forum** (participant peer support)
- **WhatsApp group** (participant group support, managed by wellness coordinator)

---

## Support Team Structure

### Tier 2 Support Team
- **Primary owner:** Ashleigh (Product Lead)
- **Secondary:** 1–2 volunteer coordinators (15 hr/week each during season)
- **Backup:** Leanne (emergency coverage)

### Tier 3 Escalation
- **CEO:** Leanne (decision authority)
- **Legal:** Shelley (T&C interpretation, dispute resolution)
- **Medical:** Sports medicine advisor (consulting, 1 hr/week)

### Staffing Levels by Season Phase
- **Pre-launch:** Ashleigh (setup)
- **Soft launch (50 beta users):** Ashleigh + 1 coordinator
- **Public launch:** Ashleigh + 2 coordinators
- **Mid-season:** Ashleigh + 1 coordinator (steady state)
- **End-of-season:** Ashleigh (wind-down)

---

## Knowledge Base & Documentation

### Tier 1 FAQ Coverage (Minimum 40 articles)
**Categories:**
1. Account & Login (5)
2. Wearable Integration (10)
3. Movement Tracking & Zones (8)
4. Elimination & Game Rules (8)
5. Refunds & Payments (5)
6. Privacy & Data (3)

### Support Ticket Tracking
- **System:** Email inbox (via Gmail labels/folders) initially; upgrade to Zendesk if volume > 50 tickets/day
- **Labels:** Tier1/Tier2/Tier3, Priority (High/Medium/Low), Category (Technical/Billing/Welfare/General)
- **Archive:** All tickets archived by year-end for retrospective analysis

### Common Issues Log
**Maintained by:** Ashleigh  
**Frequency:** Weekly aggregation, shared in team standup  
**Use case:** Identify patterns (e.g., 30% of Tier 2 issues are wearable sync problems → prioritize TERRA API testing)

---

## Escalation Triggers & Decision Matrix

### When to Escalate to Tier 3

| Scenario | Decision | Escalation Path |
|----------|----------|-----------------|
| Participant unwell, requests hold | Grant 7-day hold; acknowledge in-app | Tier 2 → immediate Tier 2 approval |
| Participant claims data incorrect | Request specific date/time; review logs | Tier 2 → Ashleigh (technical) → Leanne (final call) |
| Participant asks for special exemption | Evaluate against T&Cs | Tier 2 → Shelley (legal review) → Leanne (decision) |
| Participant gets stuck on wearable setup | Try diagnostics; offer manual entry form | Tier 2 → escalate if > 3 attempts fail |
| Participant mentions mental health crisis | Acknowledge; refer to crisis support | Tier 2 → Leanne + welfare advisor → emergency response |
| Refund request outside normal process | Verify reason; check for fraud patterns | Tier 2 → Leanne (discretionary decision) |
| Payment failed, participant upset | Retry payment; investigate Stripe logs | Tier 2 → Dev Team (Stripe API issue) OR Leanne (discretionary) |

---

## Quality Assurance

### Monthly Metrics
- **Volume:** Total tickets, breakdown by tier & category
- **Response time:** Actual vs. SLA targets
- **Resolution rate:** % resolved first contact (vs. required escalation)
- **Satisfaction:** Follow-up survey (3-question NPS poll via email)
- **Backlog:** Tickets pending > SLA threshold

### Quarterly Review
- **Trend analysis:** Most common issues, SLA compliance, team sentiment
- **FAQ updates:** New articles based on support tickets
- **Process improvements:** Inefficiencies, automation opportunities
- **Team feedback:** Support team input on workload, difficult cases, missing tools

---

## Crisis Support (For Tier 1 Responders)

### If participant mentions:
- **Suicidal ideation** → Immediate escalation to Leanne; provide 1800 LIFELINE (0800 543 354) & emergency services (111)
- **Cardiac/respiratory distress** → Direct participant to emergency services (111); internal escalation to Leanne
- **Injury** → Recommend GP consult; flag in welfare register; escalate to Tier 3
- **Account hacked** → Reset password if possible; escalate to Dev Team; flag for fraud monitoring

---

## Documentation & Templates

**Key templates available in /support/templates/:**
- email-tier2-generic-response.md
- email-refund-approved.md
- email-medical-hold-approved.md
- email-escalation-notification.md
- escalation-form.md
- incident-report-template.md

---

**Document Owner:** Ashleigh  
**Last Updated:** April 9, 2026  
**Next Review:** Post-soft-launch (October 2026)  
**Status:** Ready for team training
