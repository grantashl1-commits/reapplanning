# Refund Processing SOP

**Version:** 1.0  
**Date:** April 9, 2026  
**Owner:** Ashleigh (Product Lead) + Admin Team  
**Approved by:** Leanne (CEO)

---

## Overview

This SOP governs the processing of all refund requests for Survive the Reap (REAP) subscriptions. Refunds are processed within 5 business days of approval.

---

## Refund Eligibility

### Automatic Refund (Pro-Rata)

**Participant is entitled to a refund if:**
1. Eliminated from the season (failed 21-minute Zone 2 requirement)
2. Voluntarily exit the game (within 48 hours of request)
3. Subscription cancellation (after payment confirmation)

**Refund calculation:**
- Participant paid: NZ$13/month = $0.433 per day  
- Days remaining after elimination/exit: calculated to nearest day
- Example: Eliminated on Day 15 of 30-day season → 15 days remaining = $6.50 refund

**Timeline:**
- Approval: Within 24 hours of request or elimination
- Processing: Stripe auto-refund initiated within 2 business days
- Settlement: 5–7 business days back to original payment method

### Discretionary Refund

**Refund may be granted at CEO discretion if:**
- Payment failed (duplicate charge, unauthorized transaction, fraud)
- Technical error (participant charged but never received access)
- Exceptional circumstances (bereavement, serious illness, etc.)
- Participant requests within 48 hours of purchase (buyer's remorse)

**Process:**
1. Receive request → Verify legitimacy (name, email, transaction ID)
2. Escalate to Leanne (CEO) → Decision required
3. If approved → Process refund immediately
4. Notify participant via email + in-app message

---

## Refund Request Workflow

### Step 1: Request Reception
**Channel:** In-app "Request Refund" form or email to support@survivethereap.nz

**Information captured:**
- Participant ID
- Reason (Eliminated / Voluntary Exit / Technical Error / Other)
- Additional notes (optional)
- Confirmation of refund policy acceptance

### Step 2: Verification
**Performed by:** Tier 2 support (Ashleigh or coordinator)

**Verification checklist:**
- [ ] Participant exists in database
- [ ] Refund reason matches participant status (e.g., can't refund non-eliminated "voluntary exit" > 48 hrs)
- [ ] Payment confirmed in Stripe (invoice ID, amount, date)
- [ ] No previous dispute/chargeback on this account
- [ ] No fraud red flags (VPN, repeated refunds, etc.)

**Decision gate:**
- **Automatic approval:** Elimination or in-window voluntary exit → proceed to process refund
- **Requires escalation:** Anything else → escalate to Leanne

### Step 3: Calculation (Automatic Refunds)
**Performed by:** Automated system (via Stripe API query) or manual calculation if system down

**For elimination:**
```
Days elapsed: [Elimination Date] - [Season Start Date] = X
Days remaining: 30 - X = Y
Pro-rata refund: Y × $0.433 = [Refund Amount]
```

**For voluntary exit (within 48 hours):**
```
Refund = Full refund - $2 processing fee (if requested > 24 hrs after subscription start)
OR
Refund = Full refund (if requested within 24 hours)
```

**For payment failure:**
```
Refund = Full original charge amount
```

### Step 4: Refund Initiation
**Performed by:** Ashleigh or admin team member

**Process:**
1. Log into Stripe dashboard → Find transaction
2. Click "Refund" → Enter refund amount
3. Reason: Select from dropdown (Refund → Participant Refund Request)
4. Note: Enter any special details (e.g., "Eliminated Day 18")
5. Submit refund
6. Screenshot confirmation + record in Refund Log

**Stripe refund timing:**
- Stripe immediately marks refund as "Processing"
- Refund typically appears in participant's bank account within 5–7 business days
- Some banks may take up to 10 business days

### Step 5: Participant Notification
**Performed by:** Support team (via email + in-app notification)

**Email template:**
```
Subject: Your REAP Refund Has Been Approved – [Refund Amount]

Hi [First Name],

Your refund request has been approved. Here are the details:

Refund Amount: NZ$[X.XX]
Reason: [Elimination on Day X / Voluntary Exit / Technical Error]
Processing Time: 5–7 business days to your original payment method

Your account has been marked as inactive for Season [X]. If you'd like to participate in the next season, you can sign up again when registration opens.

Questions? Reply to this email or contact support@survivethereap.nz.

Thanks for playing,
Survive the Reap Team
```

**In-app notification:**
- Status update: "Refund Approved" badge on participant dashboard
- Amount: Display refund amount ($X.XX)
- Timeline: "Expected to arrive within 5–7 business days"

### Step 6: Escalation & Appeals
**If participant disputes the refund amount or decision:**

**Participant initiated appeal:**
1. Escalate to Leanne (CEO) + Shelley (Legal)
2. Verify refund calculation against Terms & Conditions (Section 9)
3. Leanne makes final decision (binding)
4. Notify participant of outcome + reasoning (in writing)

**Justification examples:**
- "Your refund was calculated as pro-rata based on 15 days participated (15 × $0.433 = $6.50). This aligns with Section 9 of the Terms & Conditions."
- "You requested refund on Day 27 of the season, outside the 48-hour voluntary exit window. No refund issued per policy."

---

## Refund Tracking & Auditing

### Refund Log (Spreadsheet)
**Maintained by:** Ashleigh  
**Location:** /admin/refund-register.xlsx  
**Frequency:** Updated within 24 hours of refund approval

**Columns:**
| Date | Participant ID | Name | Reason | Amount (NZD) | Stripe Refund ID | Status | Notes |
|------|---|---|---|---|---|---|---|
| 2026-11-09 | P002341 | Alex T. | Eliminated Day 15 | $6.50 | re_123456ABC | Processed | Day 15 elimination verified |
| 2026-11-10 | P002899 | Jordan M. | Tech Error | $13.00 | re_234567DEF | Pending | Duplicate charge; awaiting bank |

**Fields:**
- **Date:** Date refund approved (not settlement date)
- **Status:** Processing / Processed / Rejected / Appealed
- **Notes:** Any relevant context (e.g., chargeback, fraud flag, appeal outcome)

### Monthly Reconciliation
**Performed by:** Ashleigh  
**Frequency:** End of each month

**Reconciliation checklist:**
- [ ] All Stripe refunds in log match Stripe dashboard
- [ ] Total refunds match Finance report
- [ ] No duplicate refunds issued
- [ ] All participant status changes logged (e.g., "Refunded" status in database)

**Discrepancy resolution:**
- If refund in Stripe but not in log → Add to log immediately
- If log entry but no Stripe refund → Follow up (track down why refund was planned but never executed)
- Monthly summary emailed to Leanne (CEO)

### Quarterly Audit
**Performed by:** Leanne + Shelley (Legal)  
**Frequency:** End of each quarter

**Audit scope:**
- Spot check 10% of refunds for accuracy & legitimacy
- Verify calculation accuracy (spot check 5 random refunds)
- Review appeal cases (if any) for consistency of decision-making
- Flag any patterns (e.g., 50% false-elimination claims → possible app bug)

---

## Refund Policy Edge Cases

### Case 1: Participant claims incorrect elimination
**Verification needed:**
- Pull participant's heart rate log for elimination date
- Cross-reference with wearable provider (if applicable)
- Calculate Zone 2 minutes for elimination date

**Possible outcomes:**
- **App error confirmed** → Refund + return to game (if within 48 hours)
- **Data error** → Refund + escalate to dev team to investigate
- **Participants mistaken** → Deny refund; explain elimination logic

### Case 2: Duplicate charge (Stripe billing error)
**Verification needed:**
- Check Stripe dashboard for duplicate transactions
- Verify participant only has 1 active subscription

**Process:**
- Refund duplicate charge immediately
- Flag account for Stripe compliance review
- Notify participant with explanation + refund confirmation

### Case 3: Chargeback dispute filed
**Verification needed:**
- Monitor Stripe chargeback dashboard
- Review participant's account (was account compromised?)
- Assess legitimacy of chargeback claim

**Process:**
- If chargeback is invalid (participant consented): Dispute the chargeback with evidence
- If chargeback is valid (unauthorized charge): Issue refund + flag account

### Case 4: Participant requests refund on Day 31 (after season ended)
**Policy application:**
- Season is 30 days; refunds only valid for active season participants
- Participant eliminated or chose not to re-subscribe for next season
- **Decision:** No refund (out of scope)

**Escalation:** Leanne (CEO) to make discretionary call if participant has good history

---

## Chargeback Prevention & Fraud

### Red Flags for Suspicious Refund Requests
- Multiple refunds from same account
- Refund request followed by new sign-up with similar email
- VPN/unusual location used
- Large refund amount relative to account history
- Participant claims "never subscribed" but has elimination record

**Response to suspicious requests:**
1. Deny refund
2. Flag account for investigation
3. Monitor for future suspicious activity
4. Escalate to Leanne if unsure

### Payment Verification
**Before issuing refund, verify:**
- [ ] Payment method matches current participant email
- [ ] Transaction is visible in Stripe dashboard
- [ ] Card hasn't been reported as stolen/compromised
- [ ] No existing chargeback or dispute on this Stripe customer record

---

## Timeline Summary

| Action | Owner | Timeframe |
|--------|-------|-----------|
| Receive refund request | Tier 2 Support | Same day |
| Verify eligibility | Support Team | 2 hours |
| Calculate refund (if needed) | System / Support | 2 hours |
| Escalation (if needed) | Leanne | 4 hours |
| Initiate Stripe refund | Ashleigh | 24 hours |
| Send notification email | Support | 1 hour after Stripe |
| Confirm in refund log | Ashleigh | 24 hours |
| Fund arrives in bank | Bank | 5–7 business days |

---

## Tools & Systems

- **Stripe Dashboard:** stripe.com (for refund processing, dispute management)
- **Refund Log:** /admin/refund-register.xlsx (shared spreadsheet)
- **Email:** support@survivethereap.nz (receiving refund requests)
- **Database:** Supabase (participant records, payment status)
- **Escalation:** Leanne + Shelley (via Slack or email)

---

## Training & Handoff

**Support team training required:**
- [ ] Understand refund calculation (pro-rata formula)
- [ ] Know eligibility criteria by heart
- [ ] Practice Stripe refund process (sandbox environment)
- [ ] Understand escalation triggers
- [ ] Review 5 sample refund cases

**New team member onboarding:**
- Read this SOP in full
- Observe 3–5 refund requests with experienced support member
- Process 5 refunds under supervision
- Sign-off from Ashleigh before independent authority

---

## Policy Changes & Amendments

This SOP may be amended by Leanne (CEO) with notice to the team. Changes must be approved by Shelley (Legal) if they affect the Terms & Conditions.

**Version history:**
- v1.0 (April 2026): Initial SOP created

---

**Document Owner:** Ashleigh  
**Last Updated:** April 9, 2026  
**Next Review:** Post-soft-launch (November 2026)  
**Status:** Ready for implementation
