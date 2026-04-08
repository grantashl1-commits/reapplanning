> **COPY-PASTE SECTION — Insert into Board Report Section 10.1**
> *Replaces the existing 10.1 "Prize Draw Structure — Gambling Act Implications" entry.*
> *Written to match the style and classification of the existing board report.*

---

## 10.1 Prize Draw Structure — Gambling Act 2003: Risk Analysis and Compliance Strategy

**Issue.** REAP's prize structure sits in a legally sensitive area. Under the Gambling Act 2003 (s 4), "gambling" requires three elements simultaneously: (1) payment of consideration; (2) an element of chance; and (3) a prize. REAP cannot eliminate (1) — participants pay $13/month. It cannot eliminate (3) — prizes are a deliberate product feature. The compliance question is therefore: **on what basis does the combination of a $13 subscription and a random prize draw fall outside the Act?**

**Current status.** The product has been structured to establish a legally defensible position prior to launch using the **spot prize competition model** — the same legal architecture used across New Zealand for promotional competitions attached to commercial products. External formal sign-off from Shelley [Surname] is required before launch and is on schedule for September 2026. An informal approach to the DIA is recommended before May 2026.

---

### The Product is "Survive the Reap" — The Prize Draws are Promotional

The critical legal question under s 4 of the Gambling Act is not "is there a random draw?" — it is **"is the payment made in order to enter the draw?"**

If participants pay $13 for a chance to win a prize, that is gambling. If participants pay $13 for a game, and surviving that game makes them automatically eligible for a promotional draw at no additional cost, that is a promotional competition subsidiary to a genuine commercial product. The law treats these as structurally different.

**The product is the game.** "Survive the Reap" is a 30-day daily-movement survival game. Participants pay $13/month for:
- 30 days of access to a structured daily-movement game
- Activity tracking and verification
- A position on the Survival Board
- Community features — group leagues, social accountability
- The experience of a game with real daily stakes and genuine elimination consequences

**The draws are promotional benefits.** At seven milestone points during the season, Sport Waikato runs spot prize draws among all active, confirmed-paid survivors. Winners are selected at random from the eligible pool. Entry is automatic — no separate payment, no separate form, no additional action required from participants. A participant does not pay $13 in order to be entered in a draw. They pay $13 to play a game, and surviving the game makes them eligible for a draw that they did not pay separately to enter.

This is structurally identical to recognised promotional competitions across New Zealand:
- A customer buys a coffee; being a Gold loyalty member enters them in a monthly draw
- A petrol station customer pays for fuel; their receipt contains an instant-win competition
- A retailer runs "spend $50 and enter to win" — customers pay for goods, the draw is promotional
- McDonald's Monopoly — customers buy a meal; the prize game is attached as a promotional benefit

In every case, the payment is for a genuine product or service. The prize draw is incidental, promotional, and subsidiary. The law — and the DIA — distinguishes these from gambling precisely because the payment is not made *in consideration for* the chance to win.

---

### The Seven Spot Prize Draws

REAP will hold **seven spot prize draws per 30-day season**, each awarding **$666 NZD**. Total prize pool per season: **$4,662**. Total annual prize commitment (4 seasons): **$18,648**.

| Draw | Trigger Point | Eligibility |
|------|--------------|------------|
| Draw 1 | Day 7 — Week 1 Survivor | All confirmed-paid survivors at midnight Day 7 |
| Draw 2 | Day 13 — Friday the 13th | All confirmed-paid survivors at midnight Day 13 |
| Draw 3 | Day 14 — Fortnight Survivor | All confirmed-paid survivors at midnight Day 14 |
| Draw 4 | Day 21 — Three Week Warrior | All confirmed-paid survivors at midnight Day 21 |
| Draw 5 | Day 24 — Redemption Day | All confirmed-paid survivors who are Redemption Day eligible |
| Draw 6 | Day 28 — Final Week | All confirmed-paid survivors at midnight Day 28 |
| Draw 7 | Day 30 — Season Finale | All confirmed-paid survivors at midnight Day 30 |

**Eligibility is restricted to active, confirmed-paid survivors at the draw trigger point.** A participant who has been eliminated cannot be selected, regardless of their subscription status. This is enforced at the database level in the app's Supabase backend.

**The draw mechanism is random selection from the eligible pool.** This is not dressed up as something else. It is a random draw, and it is lawful because it is promotional and subsidiary — not the reason participants pay.

---

### The Compliance Architecture: Three Layers

**Layer 1 — The Consideration Test (Primary Defence)**

The Gambling Act requires that the element of chance be connected to the consideration paid. The consideration test asks: *why did the participant pay?* 

For REAP, the answer is unambiguous: participants pay to play a survival game. The game mechanic — daily movement, daily elimination risk, a community of survivors — is the product. Prize draw eligibility is an automatic consequence of surviving, not something participants pay for. Nobody signs up to REAP primarily to win $666. The sales proposition, the marketing, the onboarding, and the product experience all lead with the game.

Terms language confirming this will be included as follows:

> *"Participation in REAP prize draws is automatic for all active, confirmed-paid survivors at each draw trigger point. No additional payment or entry is required for prize draw eligibility. REAP prize draws are a promotional feature of the Survive the Reap game. They are not the primary purpose of the product and are not the primary reason participants subscribe."*

**Layer 2 — The Subsidiarity Test (Supporting Defence)**

The DIA's published guidance on promotional competitions identifies the key question as whether the prize draw is *subsidiary* to a genuine primary activity. REAP is designed and presented to satisfy this test:

- **Primary marketing leads with the game mechanic**, not the prize. The headline proposition is "Miss 21 minutes. Get eliminated." — not "Win $666."
- **Prize values do not appear in primary/hero marketing positions.** Prize amounts are disclosed in Season Rules and Terms — where participants are reading the detail — not in headlines, CTAs, or social ads.
- **The primary motivation is loss aversion, not prize acquisition.** The $13 subscription is a commitment device. Participants care about surviving — about not being eliminated — far more than they care about potentially winning a draw. This is the behavioural mechanic that makes the product work.
- **REAP is a charitable trust health initiative.** Sport Waikato's primary purpose — documented in its charitable mandate — is improving physical activity in the Waikato community. The game serves that purpose. Draws are promotional.

**Layer 3 — Prize Funding Independence (Supporting Defence)**

Even where any residual risk existed, the product's exposure is significantly reduced by demonstrating that subscription payments are not pooled to fund prizes. Prizes are funded entirely from **Sport Waikato's general operational funds**, separate from participant subscription revenue at the accounting level. No portion of any participant's $13 fee is allocated to, pooled for, or used to fund any prize.

The following statement will appear in the REAP Terms of Participation:

> *"Prizes offered in connection with REAP seasons are funded entirely from Sport Waikato Incorporated's general operational funds. These funds are maintained separately from participant subscription revenue. No portion of any participant's subscription fee is used to fund, pool, or contribute to any prize. Prize funding is committed by Sport Waikato at the commencement of each season and is documented in Sport Waikato's internal financial records. This separation is maintained at the accounting level and is independently auditable."*

This eliminates the "pooled consideration for chance" structure that characterises a lottery. The $13 goes to Sport Waikato's operating account. The $666 comes from a separate prize fund commitment. These never meet in a pool.

---

### Why $666 and Why Seven Draws?

The prize values are deliberate on three grounds:

1. **Proportionality.** At $666 per draw ($4,662 per season), the prize pool is consistent with promotional competition prize levels that have historically been treated as outside the Gambling Act's regulated categories. The DIA's published guidance indicates that low-value, infrequent promotional draws from legitimate operators are treated differently from commercial gambling operations.

2. **Brand alignment.** The $666 figure is on-brand for REAP's survival-game aesthetic — immediately recognisable and socially shareable without escalating the legal risk profile. It signals a game, not a casino.

3. **Engagement retention.** Seven milestone draws maintain participant engagement across the full season, reducing elimination-driven subscriber churn. A survivor who has made it to Day 14 has reason to push to Day 21. This is both a behaviour change mechanism and a commercial retention mechanism.

---

### DIA Informal Enquiry — Recommended Pre-Launch Step

Internal legal review (April 2026) recommends that Sport Waikato make an **informal approach to the Department of Internal Affairs (Gambling Compliance)** before launch. This is a proactive, low-risk step that demonstrates Sport Waikato is acting as a responsible operator in a novel space.

The draft questions for DIA, prepared for Shelley's amendment and approval, are:

1. Sport Waikato operates REAP, a 30-day daily movement game in which participants pay $13/month for game access. Active survivors — participants who have not been eliminated by missing their daily 21-minute activity requirement — are automatically eligible for periodic spot prize draws funded independently by Sport Waikato from operational funds entirely separate from subscription revenue. No additional payment or entry is required for draw eligibility. **Does DIA consider this product to engage the Gambling Act 2003, specifically whether the $13 payment constitutes consideration for the chance to win?**

2. Sport Waikato's marketing and product experience lead with the game mechanic, not the prize. Prize dollar values do not appear in primary marketing. The primary participant motivation is survival (loss aversion from the subscription), not prize acquisition. Does DIA's assessment of the subsidiarity test support the position that draws are promotional and incidental?

3. Does Sport Waikato's status as a charitable trust, and REAP's primary purpose as a health behaviour change intervention, affect DIA's analysis?

4. Sport Waikato proposes to maintain documented financial separation between subscription revenue and prize funding, auditable at the accounting level. Is this separation a material factor in DIA's assessment?

**Recommendation:** Informal DIA enquiry to be lodged by **15 May 2026**, allowing 6–8 weeks for a response before final Terms are locked. Shelley will advise whether launch can proceed on the basis of her own legal assessment if DIA does not respond before the 30 June 2026 Terms deadline.

---

### Summary: Compliance Position

| Protection Layer | Mechanism | Status |
|-----------------|-----------|--------|
| Consideration test | $13 is paid for the game, not for prize draw entry — draws are automatic, free, and subsidiary | Confirmed by product design — requires Terms language |
| Subsidiarity test | Game is primary product; marketing leads with game mechanic; prize is promotional and incidental | Confirmed by current UI — maintain on all future copy |
| Prize funding independence | Prizes funded entirely from SW operational funds, separately from subscriptions — no prize pool | Proposed — requires accounting separation |
| No additional consideration for draws | Draw entry is automatic; no separate payment required at any draw point | Confirmed by product design |
| Charitable trust status | SW's registered charitable purpose as a health organisation is a mitigating factor in DIA's assessment | Confirmed |
| Proportionate prize values | $666 per draw — consistent with promotional competition levels | Confirmed |
| "At random" language removed | Earlier drafts removed; Terms will use correct subsidiary framing | Completed (April 2026) |
| Formal legal sign-off | Shelley review and approval of Terms, Rules, and prize language | Target: September 2026 |
| DIA informal enquiry | Pre-emptive guidance from regulator before launch | Target: May 2026 — response by July 2026 |

**Board resolution required:** The board is asked to approve the prize structure as described (seven spot prize draws per season, $666 per draw, $4,662 per season funded from Sport Waikato operational funds) and to authorise management to proceed with the DIA informal enquiry and engage Shelley for formal legal sign-off.

---

### 10.1a Prize Fund Budget Commitment

The prize fund is a Sport Waikato operational commitment, not an app operating cost. It is funded from Sport Waikato's general operational budget independently of subscription revenue. This separation is legally necessary and must be maintained in the accounts.

| | Season 1 | Season 2 | Year 1 (2 seasons) | Per Year (4 seasons) |
|-|---------|---------|-------------------|---------------------|
| Prize draws | 7 | 7 | 14 | 28 |
| Prize value per draw | $666 | $666 | $666 | $666 |
| **Total prize commitment** | **$4,662** | **$4,662** | **$9,324** | **$18,648** |

Sport Waikato should pursue prize sponsorship from a commercial partner to offset this cost. Any sponsor payment must be structured as a donation or sponsorship to Sport Waikato's general operational funds — not as a direct contribution to a prize pool — to preserve the funding separation that this compliance structure depends on.

---

*This section draws on the Sport Waikato Living Lab legal briefing document (April 2026, Classification: Privileged and Confidential — Legal Advice) and internal compliance review. It does not constitute legal advice. Formal legal sign-off by Shelley [Surname] is required before this material is published or used in any participant-facing capacity.*
