# REAP Season 1 — Prize Draw Execution Procedure
**Task:** T084 — First Prize Draw Execution (all 7 Season 1 draws)
**Owner:** Leanne [CEO] — ultimate responsibility | Ashleigh [Living Lab Lead] — operational execution
**Due:** Ongoing through Season 1 (first draw: Day 7 = 7 November 2026; last draw: Day 30 = 30 November 2026)
**Priority:** High
**Classification:** Internal Operations — Confidential | Legal sign-off: Shelley [surname]

---

## Document Purpose

This document is the definitive procedure for executing all seven promotional spot prize draws during REAP Season 1. Total prize fund per season: **$4,662 (7 × $666 NZD)**.

This document must be read in conjunction with:
- REAP-Appendix-A-Legal-Compliance-Audit.md (gambling compliance analysis)
- REAP-gambling-compliance-section.md (spot prize subsidiary model)
- REAP-gambling-framing-strategy.md (language guidance)
- REAP-Appendix-B-Financial-Model.md (prize fund structure)

---

## Part 1: Legal Framing

### What These Draws Are

The REAP prize draws are **promotional spot prize draws** structured as subsidiary benefits of the REAP subscription product. They are not lotteries, raffles, or gambling within the meaning of the Gambling Act 2003.

The legal basis for this classification:
1. **Entry is not by payment into a prize pool.** Participants pay a $13/month subscription for access to the REAP game product. The prize draws are an incidental benefit of maintaining active paid participation — they are not the reason participants pay.
2. **Prize funds are sourced from Sport Waikato's operational budget**, entirely separate from subscription revenue. There is no prize pool funded by participant payments.
3. **Eligible pool is defined by active game participation**, not by payment alone. A paid participant who has been eliminated is not eligible. Eligibility is earned by surviving the game mechanic.
4. **The prize draw outcome has no effect on the primary game product.** A participant who does not win a draw continues in the game under exactly the same conditions as a participant who wins.

This structure mirrors established New Zealand precedent for loyalty and activity-based promotional draws conducted by commercial and non-profit organisations.

**DIA engagement status:** Sport Waikato has lodged an informal enquiry with the Department of Internal Affairs (target: May 2026) seeking confirmation that this model does not require a licence under the Gambling Act 2003. This procedure must not be executed before the DIA response has been received and reviewed by Shelley. [Update this status before launch.]

**DIA response status:** [TO BE COMPLETED — insert response date and summary once received]

### Language Requirements

**ALWAYS use:**
- "Promotional spot prize draw"
- "Prize draw"
- "Eligible surviving participants are entered automatically"
- "One participant is selected at random"
- "A prize subsidiary to participation"

**NEVER use:**
- Lottery
- Raffle
- Gambling
- Odds (as in "your odds of winning")
- Bet, wager, stake, jackpot
- "Enter the draw" (participants do not enter — they are entered automatically by virtue of participation)

These restrictions apply to all staff communications, social media posts, in-app copy, press releases, and any public statements about the draws. Ambassador agreements include a specific prohibition on this language (see REAP-Celebrity-Ambassador-Agreement.md, Clause 3.1).

---

## Part 2: Full Draw Schedule

| Draw # | Season Day | Calendar Date | Draw Name | Eligible Pool | Prize |
|--------|-----------|--------------|-----------|--------------|-------|
| 1 | Day 7 | 7 Nov 2026 | Week 1 Survivor Draw | All active paid survivors on Day 7 | $666 NZD |
| 2 | Day 13 | 13 Nov 2026 | Friday the 13th Draw | All active paid survivors on Day 13 | $666 NZD |
| 3 | Day 14 | 14 Nov 2026 | Fortnight Survivor Draw | All active paid survivors on Day 14 | $666 NZD |
| 4 | Day 21 | 21 Nov 2026 | Three-Week Survivor Draw | All active paid survivors on Day 21 | $666 NZD |
| 5 | Day 24 | 24 Nov 2026 | Redemption Champion Draw | Active paid survivors who have used at least one Redemption Day | $666 NZD |
| 6 | Day 28 | 28 Nov 2026 | Four-Week Survivor Draw | All active paid survivors on Day 28 | $666 NZD |
| 7 | Day 30 | 30 Nov 2026 | Final Day Survivor Draw | All active paid survivors on Day 30 (post-elimination run) | $666 NZD |

**Prize fund total per season:** $4,662 NZD
**Prize fund source:** Sport Waikato operational budget (separate from subscription revenue — see Financial Model)
**Payment method:** Bank transfer from SW operational funds to winner's nominated NZ bank account, within 5 working days of winner verification.

### Eligibility Rules (Consistent Across All Draws)

A participant is eligible for a draw if, at the time the draw runs, ALL of the following are true:
1. `season_entries.status = 'ALIVE'` — they have not been eliminated
2. `season_entries.paid_at IS NOT NULL` — their subscription payment has been confirmed
3. No active payment dispute or chargeback on their Stripe account
4. Their account has not been flagged for Terms violation
5. For Draw 5 (Redemption Champion) only: `redemption_days.count >= 1` — they have used at least one Redemption Day

---

## Part 3: Pre-Draw Checklist (10 Items)

Complete this checklist before executing every draw. Record completion in the Prize Draw Register.

| # | Check | Owner | How to verify |
|---|-------|-------|--------------|
| 1 | Confirm the eligible pool count matches expectations | Ashleigh | Run SQL: `SELECT count(*) FROM season_entries WHERE status = 'ALIVE' AND paid_at IS NOT NULL` |
| 2 | Verify `paid_at IS NOT NULL` for every participant in eligible pool | Ashleigh | Run SQL: `SELECT count(*) FROM season_entries WHERE status = 'ALIVE' AND paid_at IS NULL` — result must be 0 |
| 3 | Check for any active Stripe disputes in the eligible pool | Ashleigh | Check Stripe dashboard → Disputes tab. Cross-reference with participant list. Exclude any participants with open disputes. |
| 4 | Confirm draw date — it is the correct season day | Ashleigh | Check: `SELECT current_date - season_start_date FROM seasons WHERE id = [season_id]` — must match draw schedule |
| 5 | Confirm two witnesses are available for the draw | Ashleigh | At minimum: Ashleigh + Leanne, or Ashleigh + another SW staff member |
| 6 | Confirm the prize draw system is functional — test admin panel access | Ashleigh | Log into admin panel. Navigate to Prize Draws. Confirm draw is listed and selectable. |
| 7 | Confirm winner notification email template is loaded and correct | Ashleigh | Preview winner email in admin panel before executing draw |
| 8 | Confirm prize fund balance is sufficient for this draw | Leanne | Check SW operational accounts — $666 available |
| 9 | Confirm no system maintenance is scheduled during draw window | Dev | Confirm with Dev no planned maintenance between draw execution and winner email delivery |
| 10 | Record pre-draw eligible count in Prize Draw Register | Ashleigh | Log in Airtable: Draw #, Date, Eligible count before draw |

---

## Part 4: Execution Procedure — Step by Step

### Environment

- **System:** REAP Admin Panel (survivethereap.nz/admin)
- **Function called:** `execute-prize-draw` Supabase Edge Function
- **Who executes:** Ashleigh [Living Lab Lead]
- **Who witnesses:** Leanne [CEO] + one additional SW staff member (in person or via screen share)
- **When:** Draws run at 14:00 NZST on the designated draw day

### Step-by-Step Execution

**Step 1 — Preparation (13:45 NZST)**
- Complete all 10 items from the Pre-Draw Checklist (Part 3).
- Ashleigh and Leanne confirm they are both available (phone or in-person).
- Screenshot the eligible participant list from the admin panel. Save with filename format: `draw-[number]-eligible-pool-[date].png`.

**Step 2 — Open Admin Panel (14:00 NZST)**
- Navigate to: survivethereap.nz/admin
- Log in with admin credentials.
- Navigate to: **Prize Draws** section.
- Select the correct draw number (e.g., Draw #1 — Week 1 Survivor Draw).

**Step 3 — Confirm Eligible Pool**
- The admin panel displays the eligible participant count automatically (query filters by `status = 'ALIVE'`, `paid_at IS NOT NULL`, and draw-specific rules).
- Confirm: eligible count matches the count recorded in Step 1 of the pre-draw checklist.
- If there is a discrepancy of more than 2 participants: stop. Investigate. Do not proceed until discrepancy is resolved.

**Step 4 — Execute Draw**
- Click: **"Execute Draw"** button.
- The `execute-prize-draw` Edge Function:
  1. Queries all eligible participants for this draw
  2. Generates a cryptographically random selection
  3. Records the selected participant ID in the `prize_draws` table with timestamp
  4. Triggers the winner notification email via Resend
  5. Returns the winner's name and participant ID to the admin panel

**Step 5 — Record the Output**
- Screenshot the randomisation result screen showing: draw name, eligible count, winner participant ID, winner name, timestamp.
- Save with filename: `draw-[number]-result-[date]-[time].png`.
- Both witnesses confirm they have observed the output.

**Step 6 — Verify Winner Email Sent**
- Check Resend dashboard — confirm one winner notification email was dispatched within 2 minutes of draw execution.
- Confirm the email went to the correct participant's email address.
- Confirm subject line: "You've won the REAP [Draw Name] — $666"

**Step 7 — Record in Prize Draw Register**
- Open Airtable Prize Draw Register.
- Create new record: Draw #, Date, Draw Name, Eligible count, Winner (participant ID + name), Timestamp, Witnesses (Ashleigh + Leanne names), Screenshot filenames, Winner email confirmed (Y/N).

**Step 8 — Announce to All Participants (14:30 NZST)**
- Send group announcement email and in-app notification to all ALIVE participants.
- Template: see Week 1 Check-In Protocol (T083) Section 3.7 for Day 7 template; adapt subject and draw name for subsequent draws.
- Do not name winner unless winner has given explicit consent to be named.

---

## Part 5: Audit Trail Requirements

Every prize draw requires a complete audit trail. This is a legal and governance requirement.

### Mandatory Audit Records

| Record | Format | Storage location | Retention |
|--------|--------|-----------------|----------|
| Pre-draw eligible pool screenshot | PNG | Google Drive: REAP/Prize Draws/Season 1/Draw [N]/ | 7 years |
| Eligible participant count (pre-draw) | Text record in Prize Draw Register | Airtable | 7 years |
| Randomisation output screenshot | PNG | Google Drive: REAP/Prize Draws/Season 1/Draw [N]/ | 7 years |
| `prize_draws` table row (Supabase) | Database record | Supabase production | 7 years |
| Winner notification email | Email record | Resend dashboard | 7 years |
| Witness confirmation | Text in Prize Draw Register | Airtable | 7 years |
| Winner verification documents (ID) | PDF scan | Google Drive: REAP/Prize Draws/Season 1/Winners/ — restricted access | 7 years |
| Payment confirmation (bank transfer) | Bank statement / receipt | SW finance records | 7 years (Inland Revenue requirements) |

### Audit Trail Completeness Standard

The audit trail for each draw must be sufficient to answer the following questions, with documentary evidence:
1. How many participants were eligible at the time of the draw?
2. By what method was the winner selected?
3. Who witnessed the selection?
4. When exactly did the selection occur?
5. Was the winner notified?
6. Was the winner's identity verified before payment?
7. Was payment made, and when?

If any question cannot be answered from the documentary record, the audit trail is incomplete. Incomplete audit trails must be remediated before the next draw runs.

---

## Part 6: Winner Notification Procedure

### Automated Email (via execute-prize-draw function)

The automated winner notification email sends immediately after draw execution. Content requirements (confirm in email template before launch):
- Congratulations statement
- Prize amount ($666 NZD)
- Payment method (bank transfer)
- Payment timeframe (within 5 working days of identity verification)
- What the winner needs to provide: full name, bank account number, photo ID
- Contact details for response (Ashleigh's email + phone)
- Naming preference question (publicly named vs. anonymous)

### Manual Follow-Up Call

If no response is received to the winner email within 24 hours:
- Ashleigh calls the winner using the phone number in their `profiles` record.
- If no phone number: send follow-up email.
- If no response within 48 hours: escalate to Leanne. Leanne decides whether to wait or escalate further.

**Winner contact deadline:** Winners must respond within 7 calendar days. If a winner does not respond within 7 days, prize is forfeited for that draw. A new draw is NOT run — the prize is returned to SW operational funds. This is documented in the Season Rules.

---

## Part 7: Winner Verification

Before any prize payment is made, the winner's identity must be verified.

### Verification Requirements

| Requirement | Acceptable evidence | Who verifies |
|-------------|--------------------|-----------  |
| Full name matches registration | Photo ID (passport or driver's licence) matches name in `profiles` | Ashleigh |
| Age 18+ confirmed | Date of birth on photo ID | Ashleigh |
| Active paid subscription confirmed | `paid_at IS NOT NULL` and no active Stripe dispute on draw date | Ashleigh (Supabase check) |
| Bank account belongs to winner | Name on bank account matches verified identity | Ashleigh (ask winner to confirm) |
| No active welfare flags | Check welfare register — no unresolved Level 2+ incidents | Ashleigh |

### Verification Process

1. Winner emails: full name, bank account number, scan/photo of photo ID.
2. Ashleigh checks: name on ID matches `profiles.full_name`, DOB on ID confirms 18+.
3. Ashleigh checks Stripe: no active disputes for this participant.
4. Ashleigh confirms: bank account name matches verified identity.
5. Ashleigh sends payment request to SW finance team with: winner name, bank account, amount ($666), draw reference.
6. Ashleigh records verification complete in Prize Draw Register.

### Privacy — Winner Identity Documents

Winner's photo ID is:
- Received via encrypted email or secure file transfer only (not plain email if avoidable)
- Stored in Google Drive restricted folder (access: Ashleigh + Leanne only)
- Retained for 7 years for audit purposes
- Not shared with any third party
- Not used for any purpose beyond prize verification

---

## Part 8: Prize Payment Process

### Payment Method

Bank transfer from Sport Waikato operational funds to winner's nominated NZ bank account.

**Not:** Stripe transfer, PayPal, cheque, or any other method.

### Payment Timeline

| Step | Timeframe |
|------|-----------|
| Winner notified (automated email) | Immediately after draw |
| Winner verification complete | Winner responds within 7 days; Ashleigh verifies within 24 hours of receipt |
| Payment request submitted to SW finance | Same day as verification complete |
| Payment processed by SW finance | Within 5 working days of payment request |
| Payment confirmation sent to winner | Same day as payment processed |

### Payment Reference

Bank transfer reference format: `REAP-S1-DRAW[N]-[WinnerInitials]`
Example: `REAP-S1-DRAW1-JD` for Draw 1, winner John Doe.

### Finance Team Instruction Template

> **Subject: REAP Season 1 Prize Payment — Draw [N]**
>
> Please process the following prize payment:
> - Amount: $666.00 NZD
> - Recipient: [Winner full name]
> - Bank account: [Account number]
> - Reference: REAP-S1-DRAW[N]-[Initials]
> - Authorised by: Leanne [CEO]
> - Supporting documentation: [attach Prize Draw Register entry]
>
> Payment required within 5 working days.
>
> Ashleigh [Living Lab Lead]

### GST Treatment

Prize payments from Sport Waikato to individual recipients are not subject to GST. Confirm with SW accountant if any prize amount creates a PAYE or withholding tax obligation (unlikely for one-off prize of $666 but verify before payment).

---

## Part 9: Public Announcement

### Standard Announcement Format (In-App + Social Media)

**In-app notification (to all ALIVE participants):**
> The [Draw Name] has been completed. [X] eligible survivors. One winner has been selected. [Winner first name OR "The winner has chosen to remain anonymous."] wins $666. Congratulations.

**Social media post (Instagram/Facebook):**
> The REAP Season 1 [Draw Name] has run. [X] surviving participants were eligible. One was chosen at random. [Winner's first name, if consented / "A survivor who prefers to remain anonymous"] wins $666 NZD.
>
> Next draw: Day [X] — [Draw Name].
>
> Keep moving. #SurviveTheReap #REAP

### Naming Protocol

**Before any public announcement of winner name:**
1. Winner explicitly provides written consent to be named (email reply is sufficient).
2. Winner specifies exactly how they want to be named (first name only, full name, username).
3. No name, photo, or identifying detail is shared publicly without this consent.
4. Anonymous announcement is the default if no consent is obtained.

**What is always public regardless of consent:**
- Draw name
- Number of eligible participants
- Prize amount ($666)
- Date of draw

**What is never public regardless of consent:**
- Winner's email address
- Winner's bank account details
- Winner's photo ID details
- Winner's specific activity data or game statistics (unless separately consented)

---

## Part 10: Dispute Resolution

### If a Winner Claims Non-Receipt of Prize

1. Ashleigh checks SW bank records — was payment processed?
2. If payment was processed: ask winner to check their account and allow 3 business days for clearance. Provide SW's bank reference number.
3. If payment was not processed: escalate to SW finance immediately. Apologise to winner. Process payment within 2 business days.
4. If after 10 business days no payment received by winner: Leanne reviews. Consider re-issuing payment. Check for bank error.
5. Document all dispute communications in Prize Draw Register.

### If a Participant Claims They Should Have Been Eligible

1. Check `season_entries` — was their status `ALIVE` at the time of the draw?
2. Check `paid_at` — was payment confirmed?
3. Check for any technical errors in the elimination log around that date.
4. If the participant was incorrectly excluded due to a system error: Leanne determines remedy (may run a supplementary draw or award a goodwill prize — this is at SW's discretion, not a legal right).
5. Document in Prize Draw Register.
6. Escalate to Shelley if the participant threatens legal action.

### If the randomisation result is challenged

1. Refer to the audit trail — screenshot of eligible pool, screenshot of randomisation output, witnesses.
2. Explain the process: cryptographically random selection by the `execute-prize-draw` Supabase Edge Function, witnessed by two staff members, with full audit record.
3. Do not re-run the draw.
4. If the challenge is material and unresolvable: escalate to Shelley for legal advice.

---

## Part 11: Board Reporting

### Prize Draw Register — End of Season Report

Leanne includes a Prize Draw Register in the end-of-season board report. Format:

| Draw # | Draw Name | Date | Eligible Pool | Winner (name/anonymous) | Prize Paid | Date Paid | Witnesses |
|--------|----------|------|--------------|------------------------|-----------|----------|----------|
| 1 | Week 1 Survivor Draw | 7 Nov 2026 | [X] | [Name or Anonymous] | $666 | [Date] | Ashleigh, Leanne |
| 2 | Friday the 13th Draw | 13 Nov 2026 | [X] | [Name or Anonymous] | $666 | [Date] | Ashleigh, Leanne |
| 3 | Fortnight Survivor Draw | 14 Nov 2026 | [X] | [Name or Anonymous] | $666 | [Date] | Ashleigh, Leanne |
| 4 | Three-Week Survivor Draw | 21 Nov 2026 | [X] | [Name or Anonymous] | $666 | [Date] | Ashleigh, Leanne |
| 5 | Redemption Champion Draw | 24 Nov 2026 | [X] | [Name or Anonymous] | $666 | [Date] | Ashleigh, Leanne |
| 6 | Four-Week Survivor Draw | 28 Nov 2026 | [X] | [Name or Anonymous] | $666 | [Date] | Ashleigh, Leanne |
| 7 | Final Day Survivor Draw | 30 Nov 2026 | [X] | [Name or Anonymous] | $666 | [Date] | Ashleigh, Leanne |
| **TOTAL** | | | | | **$4,662** | | |

**Board report narrative must include:**
- Confirmation that all draws were executed per the procedure
- DIA engagement status update
- Any disputes or concerns arising from prize draws
- Legal counsel confirmation (Shelley) that the draw programme operated within the approved framework

---

## Part 12: What NOT to Say — Language Reference

*For all staff, including the celebrity ambassador, third-party social media, and any public communications.*

| Instead of this | Say this |
|----------------|----------|
| "Enter our lottery" | "You're automatically entered as an active survivor" |
| "Raffle prize" | "Promotional spot prize draw" |
| "Gambling" | "Prize draw subsidiary to participation" |
| "Your odds are 1 in X" | "One participant selected at random from [X] eligible survivors" |
| "Win the jackpot" | "Win the $666 prize" |
| "Bet your subscription on it" | [Do not use] |
| "Prize draw funded by subscriptions" | "Prize funded by Sport Waikato" |
| "The more you pay, the better your chances" | [Do not use — this is factually wrong and dangerous] |
| "Lucky dip" | "Random selection from eligible participants" |

*Any ambassador post that uses prohibited language must be corrected before publication. If a post is published with prohibited language, Ashleigh contacts the ambassador immediately to edit or delete. Leanne is notified. Shelley is placed on standby.*

---

*Prepared by: Ashleigh [Living Lab Lead] | Reviewed by: Leanne [CEO] | Legal sign-off: Shelley [surname] (required before execution)*
*Version: 1.0 | Prepared: April 2026 | Review before: 1 October 2026*
*Classification: Internal Operations — Confidential*
