> **COPY-PASTE SECTION — Insert into Board Report Section 10.1**
> *Replaces the existing 10.1 "Prize Draw Structure — Gambling Act Implications" entry.*
> *Written to match the style and classification of the existing board report.*

---

## 10.1 Prize Draw Structure — Gambling Act 2003: Risk Analysis and Mitigation

**Issue.** REAP's prize structure sits in a legally sensitive area. Under the Gambling Act 2003 (s 4), "gambling" requires three elements: (1) payment of consideration; (2) an element of chance; and (3) a prize. The concern is whether REAP's combination of a $13 monthly subscription and a prize draw, even with a skill-based eligibility gate, is captured by the Act. Earlier drafts of REAP's Terms and Rules compounded this risk by using the phrase "selected at random" — language that sits squarely within the Act's definition of chance-based gambling. That language has been removed.

**Current status.** The product is being actively restructured to establish a legally defensible position prior to launch. The following analysis and prize structure have been developed in consultation with internal legal review (Shelley [Surname]), drawing on the Gambling Act 2003, the DIA's published guidance on promotional competitions, and Sport Waikato's charitable trust status. External formal sign-off from Shelley is required before launch and is on schedule for September 2026.

---

### The Proposed Prize Structure: 7 Draws Per Season at $666 Each

REAP will hold **seven prize draws per 30-day season**, each awarding **$666 NZD**. Total prize pool per season: **$4,662**. Total annual prize commitment (4 seasons): **$18,648**.

The seven draws are milestone-structured as follows:

| Draw | Trigger Point | Selection Basis |
|------|--------------|----------------|
| Draw 1 | Day 7 — Week 1 Survivor | Highest verified activity minutes in Days 1–7 |
| Draw 2 | Day 13 — Friday the 13th Event | Longest consecutive survival streak at midnight Day 13 |
| Draw 3 | Day 14 — Fortnight Survivor | Most 21+ minute sessions completed in Days 8–14 |
| Draw 4 | Day 21 — Three Week Warrior | Highest total verified minutes over 3 weeks |
| Draw 5 | Day 24 — Redemption Day Draw | Active survivors only; most minutes on the Redemption Day itself |
| Draw 6 | Day 28 — Final Week | All active survivors at Day 28; highest minutes in final week |
| Draw 7 | Day 30 — Season Finale | All final survivors; draw from survivors who completed all 30 days |

**Prize eligibility is restricted to active, confirmed-paid survivors at each milestone.** A participant who has been eliminated cannot receive a prize draw entry, regardless of their subscription status. This is enforced at the database level in the app's Supabase backend.

---

### Two-Layer Legal Protection

The prize structure is designed to engage two independent layers of legal protection against classification as gambling.

**Layer 1 — Skill-Based Eligibility Gate (Primary Defence)**

Legal advice (internal review, April 2026) identifies the cleanest legal position as one where the prize selection is based on a measurable performance metric rather than a random draw from the eligible pool. Where the result is determined by skill, the Gambling Act's definition of gambling is not engaged (s 4(1)(b)).

REAP's draw structure achieves this: each of the seven draws is awarded to the participant who most demonstrably performed during the measurement period — highest verified minutes, most consecutive days survived, or longest total survival streak. This is not "chance." It is a performance reward dressed as a draw. The language in the Terms and Season Rules will reflect this: **draws are not random selection events; they are performance recognition milestones**.

Under this framing, participation in REAP is a prize competition where the prize is determined by the skill of daily physical activity — an act of deliberate, sustained effort that cannot be replicated by chance. Legal advice notes that this is the *strongest* available position and avoids any reliance on exemptions or charitable trust provisions.

**Layer 2 — Financial Separation of Prize and Subscription Revenue**

Even where prize mechanics carry any residual risk, the product's legal exposure is significantly reduced if it can be demonstrated that subscription payments were not made *in consideration for* the chance of winning a prize. The critical legal distinction is between: (a) paying for game access (lawful); and (b) paying for a chance at a prize (potentially gambling).

REAP's prize fund is funded entirely from **Sport Waikato's general operational funds**, maintained separately from participant subscription revenue at the accounting level. No portion of any participant's $13 subscription fee is allocated to, pooled for, or used to fund any prize. The following statement will be included in the REAP Terms and Season Rules, and is proposed for Shelley's review:

> *"Prizes offered in connection with REAP seasons are funded entirely from Sport Waikato Incorporated's general operational funds. These funds are maintained separately from participant subscription revenue. No portion of any participant's subscription fee is used to fund, pool, or contribute to any prize. Prize funding is committed by Sport Waikato at the commencement of each season and is documented in Sport Waikato's internal financial records. This separation is maintained at the accounting level and is independently auditable."*

This separation means that even if a regulator or court found that a draw element existed, the absence of a direct link between the subscription fee and the prize removes the "consideration for chance" element that is required for gambling under the Act.

---

### Why $666 and Why Seven Draws?

The prize values are deliberate on three grounds:

1. **Proportionality.** At $666 per draw ($4,662 per season), the prize pool is modest relative to commercial gaming products and consistent with promotional competition prize levels that have historically been treated as outside the Gambling Act's regulated categories. The DIA has indicated informally (in published guidance) that promotional competitions with low-value, infrequent prizes from legitimate operators are unlikely to attract enforcement attention.

2. **Brand alignment.** The "$666" figure is on-brand for REAP's survival-game aesthetic — a recognisable number that creates social media shareability without escalating the legal risk profile. It is not a figure that signals a gambling product.

3. **Seven draws across 30 days.** Weekly milestone draws maintain participant engagement across the full season, reducing elimination-driven subscriber churn. Players who have survived Week 1 have a concrete incentive to reach Week 2. This is both a behaviour change mechanism and a retention mechanism.

---

### DIA Informal Enquiry — Recommended Pre-Launch Step

Internal legal review (April 2026) recommends that Sport Waikato make an **informal approach to the Department of Internal Affairs (Gambling Compliance)** before launch. This is not a licensing application — it is a pre-emptive, low-risk step that a responsible operator takes when operating near the boundary of regulated activity.

The draft questions for DIA, prepared for Shelley's amendment and approval, are:

1. Sport Waikato operates REAP, a 30-day daily movement game in which participants pay $13/month for game access. Active survivors — participants who have not been eliminated by missing their daily 21-minute activity requirement — are eligible for periodic prize draws funded independently by Sport Waikato from sources entirely separate from subscription revenue. No additional fee or entry is required for prize eligibility. **Does DIA consider this product to engage the Gambling Act 2003?**

2. Each prize draw awards the prize to the participant who has most demonstrably performed during the measurement period (e.g., highest verified activity minutes), not by random selection from the eligible pool. Under this structure, is there an "element of chance" in DIA's view?

3. Does Sport Waikato's status as a charitable trust, and REAP's primary purpose as a health behaviour change intervention (not a prize competition), affect DIA's analysis?

4. Sport Waikato proposes to maintain documented financial separation between subscription revenue and prize funding, auditable at the accounting level. Is this separation a material factor in DIA's assessment?

**Recommendation:** Informal DIA enquiry to be lodged by **15 May 2026**, allowing 6–8 weeks for a response before final Terms are locked. DIA informal responses are not guaranteed on this timeline; Shelley will advise whether launch can proceed on the basis of her own legal assessment if DIA does not respond before the 30 June 2026 Terms deadline.

---

### Summary: Why We Are Confident This Structure Is Defensible

| Protection Layer | Mechanism | Status |
|-----------------|-----------|--------|
| No element of chance | Prize awarded on performance metric, not random draw | Built into draw structure — requires Terms language |
| No "consideration for chance" | Prizes funded entirely from SW operational funds, independent of subscriptions | Proposed — requires accounting separation |
| Charitable trust status | SW's registered charitable purpose as a health organisation is a mitigating factor in DIA's assessment | Confirmed |
| Proportionate prize values | $666 per draw — modest, on-brand, proportionate | Confirmed |
| "At random" language removed | Earlier drafts removed; new Terms will use performance-based language | Completed (April 2026) |
| Formal legal sign-off | Shelley review and approval of Terms, Rules, and prize language | Target: September 2026 |
| DIA informal enquiry | Pre-emptive guidance from regulator before launch | Target: May 2026 — response by July 2026 |

**Board resolution required:** The board is asked to approve the prize structure as described (seven draws per season, $666 per draw, $4,662 per season funded from Sport Waikato operational funds) and to authorise management to proceed with the DIA informal enquiry and engage Shelley for formal legal sign-off.

---

### 10.1a Prize Fund Budget Commitment

The prize fund is a Sport Waikato operational commitment, not an app operating cost. It is funded from Sport Waikato's budget independently of subscription revenue. This separation is legally necessary and must be maintained in the accounts.

| | Season 1 | Season 2 | Year 1 (2 seasons) | Per Year (4 seasons) |
|-|---------|---------|-------------------|---------------------|
| Prize draws | 7 | 7 | 14 | 28 |
| Prize value per draw | $666 | $666 | $666 | $666 |
| **Total prize commitment** | **$4,662** | **$4,662** | **$9,324** | **$18,648** |

Sport Waikato should consider whether prize sponsorship from a commercial partner (e.g., Garmin NZ, a health insurer, or a corporate group client) can offset some or all of this cost. Prize sponsorship is a separate commercial arrangement between Sport Waikato and the sponsor; it does not affect the legal analysis above provided the sponsor funding is handled as a donation or sponsorship payment to Sport Waikato's general operational funds, not a direct contribution to a prize pool funded by or linked to participant subscriptions.

---

*This section draws on the Sport Waikato Living Lab legal briefing document (April 2026, Classification: Privileged and Confidential — Legal Advice) and internal compliance review. It does not constitute legal advice. Formal legal sign-off by Shelley [Surname] is required before this material is published or used in any participant-facing capacity.*
