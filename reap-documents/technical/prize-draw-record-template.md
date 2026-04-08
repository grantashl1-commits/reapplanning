# REAP Prize Draw Record Template
**Sport Waikato Incorporated | Operations & Compliance**

## Purpose
This template captures all required information for each REAP prize draw to ensure compliance, auditability, and transparency with the Competition Rules and Gambling Act 2003.

**Legal requirement:** All draws must be recorded with eligible pool size, winner identifier, draw timestamp, and selection criterion (Competition Rules, Section 5.2).

---

## Draw Record #[NUMBER]

### Draw Identity
- **Draw Number:** [1–7]
- **Draw Name:** [e.g., "Week 1 Survivor", "Friday the 13th"]
- **Season:** [Season #]
- **Season Start Date:** [DATE]
- **Season End Date:** [DATE]

### Draw Trigger
- **Scheduled Trigger Date:** [DATE]
- **Trigger Time (NZST):** 23:59 (end of Day [#])
- **Actual Draw Timestamp:** [DATE] [TIME] NZST
- **Timezone confirmed:** ✅ NZST (New Zealand Standard Time)

---

## Eligible Pool

### Pool Summary
- **Total participants registered (entire season):** [#]
- **Eliminated participants (by draw trigger):** [#]
- **Eligible survivors at draw time:** [#]
- **Confirmed-paid survivors at draw time:** [#] ← **ACTUAL ELIGIBLE POOL FOR DRAW**

### Pool Composition Verification
- ✅ All eligible participants had active subscription with last payment received
- ✅ No eligible participant had been eliminated by Day [#]
- ✅ Redemption Day declarations do not affect draw eligibility
- ✅ No participants opted out of prize draw eligibility

### Eligible Participant List
[ATTACH: CSV or database export showing]
- Participant ID
- First Name (or Identifier)
- Payment Status
- Season Status (Active / Eliminated)
- Elimination Date (if applicable)
- Draw Eligibility (Yes / No)

**Total eligible:** [#]

---

## Draw Execution

### Selection Method
- **Selection Criterion:** Random selection from eligible pool
- **Randomisation Method:** [Specify: e.g., "Cryptographically secure random number generator (CSPRNG)", "Third-party randomisation service", etc.]
- **Tool/Service Used:** [e.g., "Supabase pgcrypto", "Random.org API", "Python secrets module"]
- **Seeding:** [Describe: e.g., "System entropy", "Timestamp + entropy hash"]

### Winner Selection Process
1. Eligible pool compiled: [TIMESTAMP]
2. Randomisation algorithm initiated: [TIMESTAMP]
3. Winner identifier generated: [WINNER_ID]
4. Winner name resolved: [WINNER_NAME]
5. Winner validation completed: [TIMESTAMP]
   - ✅ Participant 18+ years old
   - ✅ Participant resides in New Zealand
   - ✅ No duplicate wins in current season (if applicable)
   - ✅ Payment confirmed
   - ✅ Season status confirmed (Active)

### Winner Notification
- **Winner notified:** [DATE] [TIME]
- **Notification method:** [Email / App Notification / Phone]
- **Notification delivered:** ✅ Confirmed
- **Winner accepted prize:** ✅ Yes / No
- **Public announcement:** [DATE / Not announced]

---

## Draw Result

### Prize Award
- **Prize amount:** NZD $666.00
- **Payment method:** [Cheque / Bank transfer / etc.]
- **Payment issued:** [DATE]
- **Payment reference:** [CHEQUE#] or [TRANSACTION ID]
- **Winner confirmed receipt:** [DATE]

### Replacement Winner (if applicable)
- **Primary winner unable to contact:** Yes / No
- If yes:
  - **Reason:** [e.g., "Contact details invalid", "Declined prize", etc.]
  - **Date attempt made:** [DATE]
  - **Replacement process initiated:** [DATE]
  - **Replacement winner ID:** [ID]
  - **Replacement winner name:** [NAME]
  - **Replacement awarded:** [DATE]

---

## Audit Trail & Compliance

### Recorded By
- **Operations staff:** [NAME]
- **Date recorded:** [DATE]
- **Time recorded:** [TIME]

### Reviewed By
- **Review staff:** [NAME]
- **Department:** [OPERATIONS / GOVERNANCE]
- **Date reviewed:** [DATE]
- **Issues identified:** [None / Description]
- **Approved for release:** ✅ Yes / No

### Integrity Verification
- ✅ Eligible pool accurately reflects Season [#] status
- ✅ Randomisation method documented and reproducible
- ✅ Winner meets all eligibility criteria (age, residency, payment)
- ✅ No conflicts of interest (staff member relation to winner, etc.)
- ✅ Prize funding confirmed available in budget
- ✅ Participant consent for communications confirmed

### Legal Compliance Checklist
- ✅ Gambling Act 2003 — promotional competition (not unlicensed gambling)
- ✅ Fair Trading Act 1986 — draw process transparent and documented
- ✅ Privacy Act 2020 — winner notification and data handling compliant
- ✅ Consumer Guarantees Act 1993 — no consumer protection issues identified
- ✅ Competition Rules (Section 5) — draw process recorded as required

---

## Dispute Resolution

### Disputes Received
- **Draw challenged:** Yes / No
- If yes:
  - **Challenge date:** [DATE]
  - **Challenger:** [PARTICIPANT ID / NAME]
  - **Dispute reason:** [e.g., "Questioned randomisation", "Claimed not in eligible pool"]
  - **Investigation completed:** [DATE]
  - **Outcome:** [Upheld / Overturned / Partially upheld]
  - **Notes:** [Details of resolution]

---

## Documentation & Storage

### Files Associated with This Draw
1. **Eligible pool export:** [FILE NAME / LOCATION]
2. **Randomisation log:** [FILE NAME / LOCATION]
3. **Winner notification email:** [FILE NAME / LOCATION]
4. **Winner acceptance confirmation:** [FILE NAME / LOCATION]
5. **Payment receipt/cheque image:** [FILE NAME / LOCATION]
6. **Public announcement post:** [FILE NAME / LOCATION]

### Storage Location
- **Primary:** [e.g., Google Drive / Supabase / Physical filing system]
- **Backup:** [e.g., Encrypted USB / Cloud backup service]
- **Retention:** [Retain for 7 years per NZ legal requirements]
- **Access control:** [Who can view / edit]

---

## Notes & Commentary

[Space for additional context, observations, or explanations]

---

## Sign-Off

**This draw record is accurate and complete.**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Operations Lead | [NAME] | [SIG] | [DATE] |
| Legal Review | [NAME] | [SIG] | [DATE] |
| CFO/Finance | [NAME] | [SIG] | [DATE] |

---

## Template Usage Instructions

### When to Complete This Form
- **Before draw:** Populate sections 1–3 (Draw Identity, Trigger, Eligible Pool)
- **During draw:** Populate Section 4 (Draw Execution)
- **After draw:** Populate Section 5 (Result) and Section 6+ (Audit)
- **Timeline:** Complete within 24 hours of draw for record accuracy

### Key Fields to Verify
1. **Eligible pool size** — Must match database query at exact draw timestamp
2. **Winner identifier** — Capture both participant ID and name for clarity
3. **Draw timestamp** — Record exact time (NZST) to nearest second
4. **Selection criterion** — Document the random method used (reproducible for audit)
5. **Payment confirmed** — Verify subscription cleared before draw timestamp
6. **Residency & age** — Confirm winner details meet Competition Rules Section 5.4

### Red Flags
- ⚠️ Eligible pool size doesn't match system records
- ⚠️ Winner not in eligible pool database export
- ⚠️ Draw timestamp doesn't match scheduled trigger
- ⚠️ Randomisation method not documented
- ⚠️ Winner's payment status unclear or payment failed
- ⚠️ Conflicts of interest (staff relation to winner)
- ⚠️ Any disputes or complaints received

**If any red flag is triggered, escalate to Legal Counsel before announcing winner.**

### Digital Submission
- Save completed form as: `Draw-[SEASON]-[NUMBER]-[DATE].md`
- Attach all supporting documentation as separate files in same folder
- Store in central audit repository with version control
- Email completed record to Compliance Officer within 24 hours

---

## Example Completed Record

[See below for sample of a completed draw record]

---

## Sample Completed Draw Record: Season 1, Draw 1

### Draw Identity
- **Draw Number:** 1
- **Draw Name:** Week 1 Survivor
- **Season:** Season 1
- **Season Start Date:** 1 November 2026
- **Season End Date:** 30 November 2026

### Draw Trigger
- **Scheduled Trigger Date:** 7 November 2026
- **Trigger Time (NZST):** 23:59 (end of Day 7)
- **Actual Draw Timestamp:** 8 November 2026 00:15 NZST
- **Timezone confirmed:** ✅ NZST

### Eligible Pool

#### Pool Summary
- **Total participants registered:** 1,247
- **Eliminated participants:** 142 (by Day 7)
- **Active survivors:** 1,105
- **Confirmed-paid survivors:** 1,098 ← **ELIGIBLE POOL**

### Prize Award
- **Prize amount:** NZD $666.00
- **Winner:** Sarah M. (ID: P004521)
- **Payment issued:** 9 November 2026 (Cheque #SW-2026-001847)
- **Winner confirmed receipt:** 17 November 2026

### Sign-Off
| Role | Name | Signature | Date |
|------|------|-----------|------|
| Operations Lead | James K. | [Signed] | 8 Nov 2026 |
| Legal Review | Shelley L. | [Signed] | 8 Nov 2026 |
| CFO/Finance | Margaret T. | [Signed] | 8 Nov 2026 |

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 9 April 2026 | Initial template created | Sport Waikato Compliance |

