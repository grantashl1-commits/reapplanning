# REAP — Board Launch Conditions and Legal Sign-Off Requirements
**Classification:** Board Confidential | Sport Waikato | April 2026
**Status:** Draft for board adoption

---

## Purpose

This document formalises the conditions that must be met before Sport Waikato proceeds to public launch of REAP on 1 November 2026. It is intended for adoption by the Board as a resolution, with status tracked against each condition in the lead-up to launch.

These conditions were developed from the Six Thinking Hats analysis (April 2026) and the Legal Briefing Summary (April 2026). They represent the minimum threshold for responsible launch — not the ideal state, but the floor below which launch should not proceed.

---

## The Eight Board Launch Conditions

### Condition 1 — External Legal Sign-Off: Gambling Law Position

**Requirement:** Written legal advice from external counsel (Shelley [Surname]) confirming Sport Waikato's position on the Gambling Act 2003. The advice must address:
- Whether the prize structure as designed (7 × $666 performance awards per season) constitutes gambling under the Act
- Whether any DIA licence or exemption is required
- The specific Terms and Rules language that is legally defensible
- Whether the DIA informal enquiry is required before launch or can proceed concurrently

**Evidence required:** Written advice letter on file, signed by legal counsel, dated before September 2026.

**Owner:** Leanne [CEO] + Shelley [Legal]
**Target date:** September 2026
**Status:** ☐ Not started ☐ In progress ☐ Complete

---

### Condition 2 — External Legal Sign-Off: Terms, Rules, and Privacy Policy

**Requirement:** Written legal approval of all participant-facing documents, including:
- Terms of Participation (all clauses — prize structure, refund policy, health disclaimer, data consent)
- Season Rules (Sections 5, 7, and 8 on prizes and eliminations in particular)
- Privacy Policy (sponsor data sharing consent model; research consent; corporate group data)
- Website marketing copy (Fair Trading Act compliance review)
- Any celebrity endorsement agreements

**Evidence required:** Each document marked "Approved" with counsel's signature and date. No participant-facing publication before approval.

**Owner:** Shelley [Legal] + Leanne [CEO]
**Target date:** 31 July 2026 (hard deadline — website must be live for pre-launch)
**Status:** ☐ Not started ☐ In progress ☐ Complete

---

### Condition 3 — Working, Tested Application with Midnight Elimination

**Requirement:** The REAP application must be fully functional and tested, including:
- iOS and Android app (or web app confirmed as sufficient)
- Automated midnight elimination processing (cron job at 23:59 NZST) tested and verified
- At least one complete wearable/fitness app integration working end-to-end (Apple Health or Garmin as minimum)
- Stripe payment processing confirmed working (subscription recurring charge, not one-off)
- Stripe webhook handler for payment confirmation and `paid_at` recording
- Manual activity submission fallback operational
- Elimination notification delivery confirmed (push notification or email at elimination time)

**Note:** The elimination system being manual is not acceptable for launch. If the system is not automated, Season 1 should not open to the public. Manual processing is operationally unsustainable and introduces human error that creates participant disputes and legal liability.

**Note on TERRA API:** Technical team to evaluate TERRA API for unified wearable data integration. TERRA provides a single API layer across Apple Health, Garmin Connect, Fitbit, Strava, Google Fit, Polar, and Whoop. This approach significantly reduces per-device integration complexity and may be the most reliable path to multi-platform Zone 2 data collection. This must be assessed and a decision made by June 2026 to allow adequate development time.

**Evidence required:** Demonstrated working elimination in a test environment; developer sign-off; internal test season results.

**Owner:** Developer (Ash [surname]) + Living Lab Lead
**Target date:** 1 October 2026 (must be ready for celebrity soft launch)
**Status:** ☐ Not started ☐ In progress ☐ Complete

---

### Condition 4 — Documented Welfare Protocol

**Requirement:** A written, board-approved welfare protocol covering:
- Pre-participation screening language and health disclaimers
- Elimination notification copy (approved, thoughtful, non-punishing)
- Crisis resource signposting in elimination notifications (Lifeline, 1737, Mental Health Foundation)
- Process for a participant who contacts Sport Waikato in distress following elimination
- Escalation path for any welfare incident
- Documentation requirements (what is recorded when a welfare concern arises)
- Staff training requirements

**The ethical position this reflects:** There will be participants who are eliminated during periods of vulnerability. The probability is not zero. Sport Waikato cannot prevent this. What it can do is demonstrate that the risk was documented, considered, and managed with appropriate care. The absence of a protocol is itself an ethical and legal liability.

**Evidence required:** Protocol document approved by board; staff briefed; elimination notification copy approved by legal counsel.

**Owner:** CEO + Living Lab Lead
**Target date:** 31 August 2026
**Status:** ☐ Not started ☐ In progress ☐ Complete

---

### Condition 5 — Prize Budget Approved by Board

**Requirement:** The board formally approves a maximum prize commitment per season before any prizes are offered to participants. The approved structure:
- 7 performance awards per season
- $666 per award
- Total per season: $4,662
- Annual commitment (4 seasons): $18,648
- Funded from Sport Waikato operational funds, independent of subscription revenue (legally required — see gambling compliance documentation)

**The board must also confirm:**
- The accounting treatment for prize funding (separate from subscription revenue at the accounting level)
- Whether prize sponsorship from a commercial partner is being pursued to offset this cost
- The process for documenting prize awards (audit trail requirement)

**Evidence required:** Board resolution approving prize structure and budget; Finance team confirmation of accounting treatment.

**Owner:** Board + CEO + Finance
**Target date:** Before public launch announcement (June 2026 at latest)
**Status:** ☐ Not started ☐ In progress ☐ Complete

---

### Condition 6 — Test Season Completed

**Requirement:** At least one complete test season must be run before public Season 1. The test season may be:
- Internal (Sport Waikato staff only)
- Small external group (e.g., invited community members, RST partners, trusted contacts)
- The October 2026 celebrity soft launch may serve as the test season if it involves genuine participation with real elimination processing

**The test season must validate:**
- Midnight elimination processing at scale
- Device integration reliability across at least 2–3 platforms
- Elimination notification delivery
- Disputes handling process
- Staff workload during a live season

**Evidence required:** Test season report documenting participant numbers, elimination accuracy, issues encountered, and resolutions.

**Owner:** Living Lab Lead + Developer
**Target date:** October 2026 (celebrity soft launch serves this purpose)
**Status:** ☐ Not started ☐ In progress ☐ Complete

---

### Condition 7 — Staff Resourcing Plan

**Requirement:** A documented plan for staff resourcing during a live season, covering:
- Who is responsible for monitoring and managing elimination processing each night
- Who handles participant support queries (and how)
- Who manages disputes (and what the decision-making authority is)
- Who is the welfare escalation point for any participant in distress
- What out-of-hours coverage exists (particularly for midnight elimination processing failures)
- What the workload impact on existing Sport Waikato staff is, and whether additional resourcing is required

**Note:** Running a live 30-day season with automated midnight elimination is an operational commitment that requires someone to be available to respond to system failures, participant queries, and welfare concerns at any time. This needs to be explicitly planned and resourced, not assumed.

**Evidence required:** Written resourcing plan approved by CEO; any additional role descriptions or contracts in place.

**Owner:** CEO
**Target date:** 31 August 2026
**Status:** ☐ Not started ☐ In progress ☐ Complete

---

### Condition 8 — Funder Briefing (Sport NZ) Completed

**Requirement:** Sport NZ and any other significant funders or stakeholders are briefed on REAP before any public announcement. The briefing must:
- Be delivered by the CEO (Leanne)
- Cover the product concept, the charitable trust rationale, the Living Lab pilot framing, and the legal compliance status
- Address the dark aesthetic directly — not apologetically, but with a confident explanation of the behavioural science rationale
- Position REAP as a Living Lab pilot: a data-generating experiment consistent with Sport Waikato's research mandate
- Invite Sport NZ input without being dependent on Sport NZ approval

**Framing for funders:** REAP is Sport Waikato taking its Living Lab mandate seriously. It is a bold, evidence-based product designed to change behaviour at scale. It is not a departure from our charitable mission — it is an expression of it. The revenue it generates goes back to community programmes. The data it generates advances our understanding of behaviour change in New Zealand adults.

**Evidence required:** Briefing delivered and documented; no public announcement before briefing is complete.

**Owner:** CEO (Leanne)
**Target date:** September 2026 (before public media announcement)
**Status:** ☐ Not started ☐ In progress ☐ Complete

---

## Condition Status Summary

| # | Condition | Owner | Target | Status |
|---|-----------|-------|--------|--------|
| 1 | Legal sign-off: Gambling Act | Leanne + Shelley | Sep 2026 | ☐ |
| 2 | Legal sign-off: Terms, Rules, Privacy | Shelley + Leanne | Jul 2026 | ☐ |
| 3 | Working app + midnight elimination | Developer + LL Lead | Oct 2026 | ☐ |
| 4 | Welfare protocol documented | CEO + LL Lead | Aug 2026 | ☐ |
| 5 | Prize budget board-approved | Board + CEO | Jun 2026 | ☐ |
| 6 | Test season completed | LL Lead + Developer | Oct 2026 | ☐ |
| 7 | Staff resourcing plan | CEO | Aug 2026 | ☐ |
| 8 | Funder briefing (Sport NZ) | CEO | Sep 2026 | ☐ |

**All eight conditions must be met before public Season 1 opens. The board is empowered to override this requirement by explicit resolution, on the record, with documented reasoning.**

---

## Triggers for Pause or Shutdown

The following events trigger an **immediate operational pause and same-day board notification:**

- DIA indicates REAP constitutes unlicensed gambling or requires a licence
- A participant welfare incident (hospitalisation, mental health crisis) that is plausibly connected to REAP or an elimination notification
- A systematic technical failure producing incorrect eliminations affecting more than 5% of participants on a given night
- Any court order, regulatory action, or formal legal challenge
- A privacy breach affecting personal or health data of more than 10 participants

The following trigger a **board-level review within 72 hours:**

- Sustained public criticism campaign on safety, ethical, or charitable mandate grounds
- A funder formally expressing concern or threatening to withdraw support
- A celebrity participant publicly and materially misrepresenting the product
- Staff welfare incident related to REAP operations

**Shutdown criteria** (season termination, not just pause):
- DIA determination that gambling licence is required and Sport Waikato will not obtain one
- Participant welfare incident that cannot be confidently attributed to causes independent of REAP
- Board resolution that continuation is not in Sport Waikato's best interests

Shutdown criteria and process must be documented in the operational plan before launch. A season that is shut down early requires a clear participant communication, refund policy application, and legal advice.

---

## Board Resolution (Draft)

*The following resolution is proposed for adoption at the [date] board meeting:*

**RESOLVED** that the Board of Sport Waikato Incorporated approves REAP proceeding to public launch on 1 November 2026, subject to the following conditions being satisfied and evidenced to the board's satisfaction before launch:

1. External legal sign-off on gambling law position
2. External legal sign-off on Terms, Rules, and Privacy Policy
3. Working, tested application with demonstrated midnight elimination
4. Documented and board-approved welfare protocol
5. Prize budget formally approved by the board
6. At least one test season completed
7. Staff resourcing plan documented and approved by CEO
8. Sport NZ and key funders briefed before public announcement

**FURTHER RESOLVED** that the Board approves a prize commitment of $4,662 per season (7 × $666) funded from Sport Waikato operational funds, maintained separately from subscription revenue, subject to accounting treatment confirmed by [Finance].

**FURTHER RESOLVED** that the Triggers for Pause or Shutdown as documented in this paper are adopted as standing operational policy.

---

*For board adoption. Prepared by: [Name], [Role], Sport Waikato.*
*Date prepared: April 2026 | Next review: Before board meeting [date TBC]*
