# REAP — Legal Briefing Summary
## Prepared for: Shelley [Surname]
## Prepared by: Sport Waikato Living Lab
## Date: April 2026
## Classification: Privileged and Confidential — Legal Advice

---

## 1. PRODUCT DESCRIPTION

**REAP** (also "Survive the Reap") is a 30-day daily movement survival game operated by Sport Waikato Incorporated, a charitable trust incorporated under the Charitable Trusts Act 1957 (NZCN: [insert]).

**How it works:**
Participants pay a subscription fee of NZD $14.99/month for access to a season. Each day of the season, participants must complete a minimum of 21 minutes of Zone 2 moderate-intensity cardiovascular activity, verified via connected wearable device or fitness application, and synced before midnight (local time). Failure to meet the daily requirement results in automatic elimination from the season. Participants have two Redemption Days per season (pre-declared rest days). Active survivors — participants who have not been eliminated — are eligible for periodic spot prize draws funded independently by Sport Waikato. Eliminated participants retain account access and may re-enrol in subsequent seasons.

**Fee structure:**
- Individual: NZD $14.99/month recurring subscription via Stripe
- Group/corporate pricing at reduced per-participant rates
- No additional fee for prize eligibility; participation in prize draw is automatic for active survivors

**Launch dates:**
- Celebrity soft launch: October 2026
- Season 1 start: November 1, 2026
- First Friday 13th event: November 13, 2026

**Platform:** Mobile app (iOS and Android), in development.

---

## 2. CURRENT LEGAL ANALYSIS SUMMARY

The following issues have been identified through internal review. None have yet received formal external legal sign-off. This briefing is the starting point for that process.

**Status: AT RISK — requires resolution before any participant-facing publication or launch.**

**Key risk areas:**

| Issue | Risk Level | Status |
|---|---|---|
| Gambling Act 2003 — prize classification | HIGH | Unresolved |
| "At random" vs participation-based contradiction in terms | HIGH | Unresolved |
| Prize funding separation — documented and enforceable | MEDIUM | Draft proposed |
| Subscription model — CGA/FTA compliance | MEDIUM | Drafted, not reviewed |
| Privacy Act 2020 — sponsor data sharing, consent model | MEDIUM | Draft Privacy Policy prepared |
| Age verification adequacy | LOW-MEDIUM | Basic declaration only |
| Fair Trading Act — marketing claims, placeholder stats | MEDIUM | Flagged — not yet addressed |

---

## 3. CRITICAL ITEMS FOR SHELLEY'S REVIEW

---

### 3a. "At Random" vs Skill/Participation-Based Contradiction — Gambling Act 2003

**The problem:**

Earlier drafts of the REAP Terms included the phrase "spot prize draw... conducted at random." Current drafts attempt to reframe prizes as "participation-based" — awarded to active survivors, with the selection basis described as equal standing among eligible participants.

These two positions are not compatible and one of them potentially engages the Gambling Act 2003.

**The Act's relevance:**

Under the Gambling Act 2003 (s 4), "gambling" requires: (1) payment of consideration; (2) an element of chance; and (3) a prize. "Prize competition" under the Act is narrowly defined and carries its own requirements.

The question is whether REAP's prize structure fits the "prize competition" exemption (s 4(1)(b) — where the result is determined by skill) or falls within or outside the definition of "gambling" on the basis that active survival is not "chance" in the relevant sense.

**The two routes Shelley needs to assess:**

**Option A — Spot prize exemption (skill/participation basis):**
Prize eligibility is earned through verified daily physical activity — an act of consistent effort over time. The selection from the eligible survivor pool could be framed as non-random (e.g., longest survivor, most active day, specific challenge completion). Under this framing, there is no "element of chance" in the relevant sense — survival is determined entirely by participant behaviour. The prize goes to the participant who has most demonstrably participated. This is the cleanest position legally but requires the selection mechanism to genuinely be non-random and clearly described.

**Option B — Prize competition framing:**
If the draw from the survivor pool is random (all eligible survivors have equal probability), this is more likely to engage the Act's prize competition provisions. Depending on prize value and frequency, this may require compliance with prize competition rules under s 4 or exemptions available to charitable organisations under the Act.

**What we need from Shelley:**

1. Her view on which route is legally defensible and preferable for a charitable trust operator
2. Redrafted Terms and Rules language (specifically Sections 5 and 8) reflecting the chosen route
3. Whether she believes an informal DIA enquiry is advisable before launch (we believe yes — see Section 4)

---

### 3b. Prize Funding Separation — Proposed Wording for Approval

**The issue:**

To support the position that REAP is not a gambling product (subscription fee paid for game access, not for chance at a prize), the prize must be demonstrably funded from sources independent of participant subscription revenue.

**Proposed statement (for Shelley's approval and redraft as needed):**

*"Spot prizes offered in connection with REAP seasons are funded entirely from Sport Waikato's general operational funds, which are maintained separately from participant subscription revenue. No portion of any participant's subscription fee is allocated to, pooled for, or used to fund any prize. Prize funding is committed by Sport Waikato at the commencement of each season and documented in Sport Waikato's internal financial records. This separation is maintained at the accounting level and is auditable."*

**What we need:**
- Shelley's approval of this wording or her preferred redraft
- Confirmation of whether this separation needs to be reflected in any specific statutory form or disclosure to participants
- Whether a cap on prize value per season should be documented (to limit Sport Waikato's exposure and demonstrate proportionality)

---

### 3c. Stripe Subscription vs One-Time Fee — Consumer Law Implications

**The issue:**

REAP is currently structured as a monthly recurring subscription via Stripe. A participant who joins and is eliminated on Day 3 is still subscribed and will be charged again at the next billing cycle unless they actively cancel.

**Consumer law concerns:**

Under the Consumer Guarantees Act 1993 and Fair Trading Act 1986, participants must be clearly informed that:
- The subscription is recurring and will renew unless cancelled
- Cancellation does not reverse elimination or entitle them to a refund for the current period
- Elimination is a designed game outcome, not a failure of the service

The current Terms address this (Clause 4.4), but the subscription mechanics must also be reflected in the pre-purchase information and in Stripe's checkout configuration.

**Specific questions for Shelley:**

1. Does the non-refundability of the season fee post-commencement (including in the event of elimination on Day 3) survive scrutiny under the CGA, given that the "service" (game access) continues even after elimination?
2. Is there any obligation to offer a partial refund for any portion of the month's fee following elimination?
3. Is the current cancellation process (self-service via account settings) sufficient, or is explicit written confirmation of cancellation terms required at point of sale?
4. Are there any specific Stripe or payment provider disclosure requirements under NZ consumer law that we need to embed in the checkout flow?

---

### 3d. Data Sharing / Privacy Act 2020 — Sponsor Group Opt-In Consent Model

**The issue:**

The Privacy Policy provides that personal data is not shared with sponsors without explicit opt-in consent. Separately, corporate group participants' aggregated data may be shared with the sponsoring organisation (their employer or a health funder) as described in the corporate group agreement.

**The specific scenarios requiring Shelley's review:**

**Scenario 1 — Individual participant, sponsor opt-in:**
A participant voluntarily opts into sponsor data sharing (e.g., to receive a discount or benefit from a partner organisation). What does a compliant opt-in consent form look like under the Privacy Act 2020? It must be: specific as to what is shared, specific as to with whom, revocable, and not bundled with other consents.

**Scenario 2 — Corporate group participant, employer as sponsor:**
An employer pays for 20 employees to participate in REAP. The employer receives aggregated activity data from the group (e.g., "85% of your group survived to Week 3; average daily active minutes: 34"). Is aggregated, de-identified group data subject to Privacy Act constraints if the group is small enough that individuals could be identified? What is the disclosure obligation to the individual employee at time of enrolment?

**Scenario 3 — Research data use:**
The Living Lab will use participant activity data for health research (de-identified). Is a blanket research consent in the Terms sufficient, or is a separate, specific research consent required under the Privacy Act 2020 and/or Health Research Council ethical standards?

**What we need from Shelley:**
- Review and redraft of the Privacy Policy's consent sections for each scenario
- A compliant opt-in consent form template for sponsor data sharing
- View on whether corporate group aggregated data sharing requires individual participant consent in addition to employer acknowledgement

---

### 3e. Age Verification — Adequacy of Current Approach

**The issue:**

REAP requires participants to be 18 or older. The current approach is a declaration at account creation — participants confirm they are 18+ by ticking a box or entering a date of birth. There is no identity verification.

**Concerns:**

1. Declaration-only age verification is weak, but it is the standard approach for most consumer subscription products in NZ. Is this adequate for REAP's context, given the combination of subscription payment + prize eligibility?
2. Prize winners will be required to provide proof of identity and age before receiving prizes. Is this post-hoc verification adequate, or should verification occur at sign-up?
3. Is there any heightened obligation given that REAP collects health-related activity data (heart rate, movement patterns) from participants who may be minors if the age check fails?

**What we need from Shelley:**
- Her view on whether declaration-only is sufficient for this product
- Whether prize winner verification (post-hoc identity check) closes the gap
- If enhanced verification is recommended, what form it should take and whether the cost/friction is proportionate

---

## 4. QUESTIONS FOR DIA — DRAFT FOR INFORMAL ENQUIRY

We recommend an informal approach to the Department of Internal Affairs (Gambling Compliance) before launch. Below are draft questions for Shelley's review and amendment before we make contact.

---

**Draft questions for DIA informal enquiry:**

1. Sport Waikato operates REAP, a 30-day daily movement game in which participants pay a monthly subscription fee of $14.99 for access to the game. Active survivors — participants who have not been eliminated by missing their daily activity requirement — are eligible for periodic spot prize draws funded independently by Sport Waikato from sources separate from subscription revenue. No additional fee or entry is required for prize eligibility. **Does DIA consider this product to engage the Gambling Act 2003?**

2. If the spot prize draw selects from among all active survivors with equal probability (i.e., at random within the eligible pool), does this constitute a "prize competition" under the Act? If so, what compliance obligations apply to a charitable trust operator in these circumstances?

3. If the spot prize is instead awarded on a non-random, participation-based basis (e.g., to the participant with the most verified days survived), does DIA consider this to fall outside the Act's definition of gambling?

4. Sport Waikato proposes to maintain demonstrable financial separation between subscription revenue and prize funding. Is this separation, documented at the accounting level, a material factor in DIA's assessment?

5. Does Sport Waikato's status as a charitable trust, and REAP's explicit primary purpose as a health behaviour intervention (not a prize competition), affect DIA's analysis?

---

## 5. DOCUMENTS REQUIRING LEGAL SIGN-OFF

The following documents require Shelley's written approval before publication or participant-facing use:

| Document | Status | Priority |
|---|---|---|
| Terms of Participation | Drafted — requires redraft of prize clause post decision on 3a | CRITICAL |
| Season Rules (all sections, esp. 5 and 8) | Drafted — requires redraft of prize clause | CRITICAL |
| Privacy Policy | Drafted — requires review of consent model (3d) | CRITICAL |
| Website marketing copy (all pages) | Drafted — Fair Trading Act compliance check required | HIGH |
| Corporate Group Agreement template | Not drafted | HIGH |
| Opt-in sponsor data sharing consent form | Not drafted | MEDIUM |
| Celebrity endorsement agreement | Not drafted | MEDIUM (before October soft launch) |
| Prize draw documentation protocol | Not drafted | MEDIUM |

---

## 6. TIMELINE

**Season 1 launch: November 1, 2026**
**Celebrity soft launch: October 2026 (exact date TBC)**
**Current date: April 8, 2026**

To meet these dates, the following milestones apply:

| Milestone | Required by | Notes |
|---|---|---|
| Shelley's initial review of this briefing and Issues 3a–3e | 30 April 2026 | To unblock terms drafting |
| DIA informal enquiry made | 15 May 2026 | Allows 6–8 weeks for DIA response before final terms lock |
| DIA response (estimated) | 30 June 2026 | DIA informal responses not guaranteed on this timeline |
| Terms, Rules, and Privacy Policy — final drafts to Shelley | 30 June 2026 | Incorporating DIA position and Shelley's 3a decision |
| Legal sign-off — all participant-facing documents | 31 July 2026 | Hard deadline — website must be live for pre-launch |
| Celebrity endorsement agreement — executed | 31 August 2026 | Required before October soft launch |
| Corporate Group Agreement — finalised | 31 August 2026 | Required before corporate enrolment opens |
| Website published — all pages with approved copy | September 2026 | Pre-launch visibility |
| Waitlist and pre-registration open | September 2026 | |
| Season 1 opens — participant sign-up | Late October 2026 | |
| Season 1 start | November 1, 2026 | |

**Note:** The July 31 legal sign-off deadline is non-negotiable for the November 1 launch. If DIA does not respond before the end of June, Shelley will need to advise whether we proceed on the basis of her own assessment of the legal position or delay launch.

---

**Prepared by:** [Name], Sport Waikato Living Lab
**Contact:** [email] / [phone]
**Attachments:** REAP Terms of Participation (draft), REAP Season Rules (draft), REAP Privacy Policy (draft), REAP Website Copy (draft)
