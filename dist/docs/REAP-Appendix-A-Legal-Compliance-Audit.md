# REAP — Appendix A: Legal Compliance Audit
**Board Report Appendix | Sport Waikato / The Living Lab**
**Prepared:** April 2026 | **Classification:** Confidential — Board Use Only
**Status:** Internal audit only — does not constitute formal legal advice. Formal legal sign-off required from Shelley [surname] before launch.

---

## Overall Verdict: AT RISK — Fixable Before Launch

REAP's current build contains several legal compliance gaps that must be resolved before any participant-facing publication or public launch. None of these gaps are obstacles to proceeding with development. All are resolvable within the available timeframe (April–October 2026) with appropriate legal resource. They are disclosed here in full so that the board can make an informed decision and track remediation.

**The single most critical issue** is a direct textual contradiction between REAP's Terms of Participation and its Season Rules/FAQ regarding how prizes are awarded. One document says "skill-based or participation-based." The other says "at random." This contradiction, if unresolved at launch, creates the exact structure that the DIA uses to identify an unlicensed lottery: consideration (subscription fee) + element of chance ("at random") + prize.

Every other compliance issue is secondary to resolving this contradiction.

---

## Summary Status Table

| Issue | Legislation | Risk Level | Status (April 2026) | Target Resolution |
|-------|-------------|-----------|---------------------|------------------|
| Prize draws must be clearly subsidiary to the game — Terms language not yet drafted | Gambling Act 2003 | **CRITICAL** | Not drafted | June 2026 |
| Spot prize draw mechanism not built in code | Gambling Act 2003 | **CRITICAL** | Not built | July 2026 |
| No DIA informal guidance obtained | Gambling Act 2003 | **CRITICAL** | Not initiated | July 2026 |
| No formal legal sign-off on Terms, Rules, Privacy Policy | All legislation | **CRITICAL** | Not obtained | July–Sep 2026 |
| Recurring subscription vs one-off "season pass" UI | Consumer Guarantees Act / FTA | **HIGH** | Unresolved (build) | July 2026 |
| No Stripe webhook — paid_at never set | Consumer / Fair Trading | **HIGH** | Not built | July 2026 |
| Prize funding separation not documented in Terms or code | Gambling Act 2003 | **HIGH** | Not documented | June 2026 |
| Age verification client-side only | Privacy Act / general | **HIGH** | Client-side only | July 2026 |
| No cancellation flow in app | Consumer Guarantees Act | **HIGH** | Not built | July 2026 |
| Hardcoded fabricated statistics in public UI | Fair Trading Act 1986 | **HIGH** | Present in build | Before any public launch |
| Privacy Policy — research consent model | Privacy Act 2020 | **HIGH** | Drafted, not reviewed | August 2026 |
| Privacy Policy — sponsor data sharing consent | Privacy Act 2020 | **HIGH** | Drafted, not reviewed | August 2026 |
| Plaintext credentials in public GitHub repo | Security / Privacy Act | **CRITICAL (Immediate)** | Fixed April 2026 | ✅ Complete |
| "Survive the month to win" copy — prize as primary motivation | Fair Trading Act | **MEDIUM** | Present in code | Before launch |
| "WON" leaderboard column elevates prize status | Gambling Act (subsidiarity) | **MEDIUM** | Present in build | Before launch |
| No corporate group agreement template | Privacy Act / Contract | **MEDIUM** | Not drafted | August 2026 |

---

## 1. Gambling Act 2003

### 1.1 The Legal Test

The Gambling Act 2003 (s 4) defines gambling as requiring all three of:
1. Payment of consideration
2. An element of chance
3. A prize

REAP cannot eliminate (1) — participants pay $13/month. It cannot eliminate (3) — prizes are a product feature. The compliance strategy must eliminate (2): the element of chance in how prizes are determined.

**The critical legal distinction:** If prizes are awarded by random selection from the eligible pool → element of chance → potentially gambling. If prizes are awarded on the basis of a measurable performance metric → no element of chance → not gambling. One word ("draw" vs "award") reflects a structurally different legal outcome.

### 1.2 Current State of REAP's Documents

**Compliance audit finding (C1 — CRITICAL):**

REAP's Terms of Participation and Season Rules contain language that must be reconciled to reflect the adopted compliance strategy. The current `Terms.tsx` contains performance-based prize language that does not match REAP's actual game mechanic (binary survival eligibility, no accumulated minutes tracking). This must be replaced with correct spot prize / subsidiary framing before launch.

| Document | Location | Current Language | Required Fix |
|----------|----------|-----------------|-------------|
| Terms of Participation, Section 6 | `Terms.tsx` | "Prizes are awarded based on criteria announced at the start of each competition (such as most minutes logged, longest streak...)" | Replace with spot prize subsidiary language — see Section 1.3 |
| Season Rules / FAQ | `Rules.tsx` | "At random" language was removed April 2026 | Correct — insert spot prize Terms language consistent with 1.3 |

**Why the performance-award framing was abandoned:**

REAP's eligibility is binary — you either logged 21+ minutes or you were eliminated. The game creates no performance gradient among survivors: there is no accumulated minutes tracking, no streak differentiation among active survivors, and no measurable performance metric that distinguishes one survivor from another. Any performance-based prize criterion would require tracking data REAP does not collect and would create a sub-game that is not REAP. The honest structure is: surviving participants are randomly selected at draw trigger points. The compliance position rests on those draws being subsidiary and promotional, not on eliminating the element of chance.

### 1.3 Adopted Compliance Strategy

Following legal review (April 2026), Sport Waikato has adopted the **spot prize competition subsidiary to a genuine game product** model:

- **"Survive the Reap" is the product.** The $13/month is consideration for a 30-day daily-movement survival game — game access, activity tracking, the Survival Board, community features, and the daily elimination mechanic. This is the primary commercial transaction.
- **Prize draws are subsidiary promotional benefits.** At seven milestone points per season, Sport Waikato runs spot prize draws among all active, confirmed-paid survivors. Winners are selected at random from the eligible pool.
- **No additional consideration for draw entry.** Surviving participants are automatically entered. No separate payment, no separate entry form, no additional action required. Draw eligibility is an automatic consequence of still being alive at the draw trigger point.
- **Prize funding is fully separated from subscription revenue** at the accounting level and documented in the Terms.
- **Marketing leads with the game, not the prize.** The subsidiary nature of draws must be visible in all public-facing material.

**Why this strategy is sound:**
The Gambling Act 2003 (s 4) requires that consideration be paid *for* the element of chance. Where participants pay for a genuine game product and draws are an automatic, free, promotional benefit attached to survival — structurally identical to any promotional competition attached to a commercial product — the consideration test is not met. This is the same model as supermarket promotional draws, loyalty programme spot prizes, and retail competition mechanics across New Zealand. The prize is subsidiary to the product.

### 1.4 The Seven Spot Prize Draws

| Draw | Trigger Point | Eligibility |
|------|--------------|------------|
| Draw 1 | Day 7 — Week 1 Survivor | All confirmed-paid survivors at midnight Day 7 |
| Draw 2 | Day 13 — Friday the 13th | All confirmed-paid survivors at midnight Day 13 |
| Draw 3 | Day 14 — Fortnight Survivor | All confirmed-paid survivors at midnight Day 14 |
| Draw 4 | Day 21 — Three Week Warrior | All confirmed-paid survivors at midnight Day 21 |
| Draw 5 | Day 24 — Redemption Day | All confirmed-paid survivors who are Redemption Day eligible |
| Draw 6 | Day 28 — Final Week | All confirmed-paid survivors at midnight Day 28 |
| Draw 7 | Day 30 — Season Finale | All confirmed-paid survivors at midnight Day 30 |

Prize per draw: $666 NZD | Total per season: $4,662 | Total annual (4 seasons): $18,648

**Draw mechanism:** Random selection from the eligible pool, executed by the Supabase backend, timestamped and logged at the draw trigger point. Winner is notified immediately. Draw records (eligible pool count, timestamp, winner ID) are retained as an audit trail.

### 1.5 Prize Funding Separation

Prizes are funded entirely from Sport Waikato's general operational funds, maintained separately from participant subscription revenue at the accounting level. The following statement will appear in the Terms of Participation:

> *"Prizes offered in connection with REAP seasons are funded entirely from Sport Waikato Incorporated's general operational funds. These funds are maintained separately from participant subscription revenue. No portion of any participant's $13 subscription fee is used to fund, pool, or contribute to any prize. Prize funding is committed by Sport Waikato at the commencement of each season and is documented in Sport Waikato's internal financial records. This separation is maintained at the accounting level and is independently auditable."*

### 1.6 DIA Informal Enquiry — Recommended Pre-Launch

Internal legal review recommends a pre-launch informal approach to the Department of Internal Affairs (Gambling Compliance). This is not a licensing application — it is a proactive step that demonstrates Sport Waikato is acting as a responsible operator in a novel space.

The draft questions are structured around the spot prize / subsidiary model:

1. Does DIA consider a product where participants pay for a game and active survivors are automatically entered in periodic promotional draws — at no additional cost and with prizes funded independently from operational funds — to engage the Gambling Act's consideration test?
2. Does the subsidiarity of the draws to a genuine game product satisfy DIA's promotional competition guidance?
3. Does Sport Waikato's charitable trust status and primary health mandate affect the analysis?

**Timeline:** DIA enquiry lodged by 15 May 2026; response expected by 30 June 2026.

### 1.7 Subsidiarity — Primary Protection Layer

Under the adopted spot prize / subsidiary model, subsidiarity is the primary compliance defence. The DIA's key question is whether the draw is genuinely subsidiary to a real commercial product, or whether the product is a thin wrapper around what is functionally a lottery.

REAP passes the subsidiarity test on current design. Status of key features:

| Feature | Status |
|---------|--------|
| Game mechanic operates independently of draws | CLEAN — daily elimination runs whether or not a draw is nearby |
| Hero/primary UX and marketing leads with game mechanic, not prize | CLEAN |
| No prize dollar value in primary marketing UI | CLEAN |
| Prize draws framed as automatic bonus for survivors, not the reason to subscribe | CLEAN — requires Terms language confirming this |
| WHO health framework prominently cited | CLEAN |
| Physical activity is the primary game mechanic and primary participant motivation | CLEAN |

**One phrase that must be corrected before launch:** `"Survive the month to win"` (in `Webinar.tsx`) — this directly frames the prize as the explicit reward for completing the paid activity. Under the spot prize / subsidiary model, this is the most dangerous possible phrase because it creates the precise link between the fee and the prize that the subsidiarity defence must avoid. Must be changed to `"Survive the month to complete the challenge."` or equivalent.

**Terms language required to confirm subsidiarity:**

> *"REAP prize draws are a promotional feature of the Survive the Reap game. Participation in draws is automatic for all active, confirmed-paid survivors at each draw trigger point — no additional payment or entry is required. The draws are subsidiary to the game product and are not the primary reason participants subscribe. Participants subscribe to play a daily-movement survival game; draw eligibility is an incidental benefit of surviving."*

---

## 2. Fair Trading Act 1986

### 2.1 Key Requirements

The Fair Trading Act 1986 prohibits misleading or deceptive conduct in trade. For REAP, the relevant risks are:

1. **Misleading prize representations** — any representation that overstates the prize value, accessibility, or certainty
2. **Fabricated statistics** — publishing participation statistics before any season has run
3. **Subscription framing** — representing a recurring subscription as a one-off "season pass"
4. **Marketing claims about health outcomes** — any claim about weight loss, disease prevention, or specific health benefits

### 2.2 Fabricated Statistics — Critical Issue

**Compliance audit finding (B8 — HIGH):**

The current build contains hardcoded fabricated statistics in public-facing components:

| File | Hardcoded value | Risk |
|------|----------------|------|
| `SeasonStatus.tsx` | `alive = 42`, `fallen = 158` | Fair Trading Act breach — presenting fictional participant numbers as real |
| `Dashboard.tsx` | `alive = 42`, `fallen = 158` | Same |
| `PublicBoard.tsx` | `waitlistCount = 87` | Same |

**Status:** Fixed in Dashboard.tsx (April 2026). Must be fixed in all remaining files before any public access is enabled. Zero statistics should be displayed until real Season 1 data exists.

### 2.3 Subscription vs Season Pass Framing

**Compliance audit finding (C3 — CRITICAL):**

REAP's Stripe checkout is configured as `mode: "subscription"` (monthly recurring) while the UI describes it as a `"$13 NZD / SEASON"` (fixed period). This is a material inconsistency that creates Fair Trading Act exposure.

**Required fix:** Either:
- Change Stripe to `mode: "payment"` (one-off per season), and update the subscription management accordingly; OR
- Retain monthly recurring subscription but prominently disclose this in the pre-purchase flow, add an in-app cancellation button, and update all UI text to say "monthly subscription" not "season pass"

The Terms of Participation and refund policy must accurately reflect whichever model is chosen.

### 2.4 Health Claims

REAP's marketing and in-app copy must not make specific health outcome claims (e.g., "lose weight," "reduce your risk of diabetes," "improve your mental health") unless these are substantiated by evidence. The current framing — "21 minutes of Zone 2 movement, aligned with WHO guidelines" — is accurate and defensible. Claims about specific health outcomes for individuals must not be added without evidence.

---

## 3. Consumer Guarantees Act 1993

### 3.1 Service Guarantee

Under the Consumer Guarantees Act, REAP must deliver the service as described. Key risk: a participant eliminated on Day 3 arguing that the service has not been delivered. The Terms must be unambiguous that:
- The subscription fee is for platform access, not for survival
- Elimination is a designed game outcome, not a service failure
- The service (platform access, activity tracking, the game) was delivered regardless of elimination timing

The Refund Policy (REAP-refund-policy-section.md) covers this in detail and is drafted for Shelley's review.

### 3.2 Cancellation

**Compliance audit finding (B11 — HIGH):**

REAP has no cancellation flow. Participants on a monthly recurring subscription cannot cancel within the app. This is a Consumer Guarantees Act compliance requirement and a basic consumer fairness obligation.

**Required build:** In-app cancellation button in Account Settings, cancelling the Stripe subscription with immediate effect.

---

## 4. Privacy Act 2020

### 4.1 Health Information Classification

REAP collects daily activity data including heart rate data, Zone 2 movement patterns, and daily physical activity records. This constitutes **health information** under the Privacy Act 2020, attracting heightened protection obligations.

### 4.2 Current Privacy Policy Status

The Privacy Policy is drafted but has not received legal review. Three specific consent scenarios require Shelley's assessment:

| Scenario | Issue | Status |
|----------|-------|--------|
| Individual sponsor data sharing | Consent must be specific, named, revocable, not bundled | Drafted, not reviewed |
| Corporate group — aggregated data | De-identified group data may identify individuals in small groups (<10) | Not addressed in current draft |
| Research data use (Living Lab) | Blanket research consent in Terms may not meet HRC standards | Drafted, not reviewed |

### 4.3 Consent Architecture Required

The Privacy Policy consent model must be rebuilt to separate three distinct consents:
1. Terms of Participation acceptance (required)
2. Research data use consent (optional, separate tick)
3. Sponsor data sharing consent (optional, separate, sponsor-specific, triggered only when relevant)

None of these can be bundled. Under the Privacy Act 2020, bundled consent is not valid consent for health information.

### 4.4 Data Breach Obligation

Under the Privacy Act 2020, Sport Waikato must notify the Privacy Commissioner (and affected individuals) if a breach is likely to cause serious harm. A breach involving activity/health data of multiple participants would trigger this obligation. A documented breach response procedure must be in place before launch.

**The April 2026 credential exposure** (plaintext passwords in public GitHub repository) was contained and fixed before any known unauthorised access. This incident should be documented internally as a near-miss and treated as the trigger to implement full security hardening before launch.

---

## 5. Documents Requiring Legal Sign-Off

The following documents require Shelley's written approval before any participant-facing use:

| Document | Status | Priority | Target |
|----------|--------|---------|--------|
| Terms of Participation | Requires prize clause redraft | CRITICAL | July 2026 |
| Season Rules (Sections 5, 7, 8) | Requires prize language overhaul | CRITICAL | July 2026 |
| Privacy Policy | Requires consent model review | CRITICAL | August 2026 |
| Refund Policy | Drafted — requires review | HIGH | July 2026 |
| Website marketing copy | Requires FTA compliance check | HIGH | July 2026 |
| Celebrity Ambassador Agreements | Template drafted | MEDIUM | Before October 2026 |
| Corporate Group Agreement | Not yet drafted | HIGH | August 2026 |
| Sponsorship Agreement | Template drafted | MEDIUM | Before any sponsor |
| Prize draw documentation protocol | Not yet drafted | HIGH | July 2026 |

---

## 6. Items Completed (April 2026)

The following compliance items were identified and fixed during the April 2026 audit:

| Item | Fix applied |
|------|------------|
| Plaintext admin password `ReapAdmin2026!` in public repo | Removed; now reads from `ADMIN_PASSWORD` env var |
| Plaintext demo password `SurvideOrFall2026!` in public repo | Removed; now reads from `DEMO_PASSWORD` env var |
| Admin dashboard using mock data for player counts | Replaced with real Supabase queries on `season_entries` |
| `seasonDay` using calendar date instead of days-since-season-start | Fixed to calculate correctly from `season_month` |
| `lastSyncMinutes` hardcoded to 5 | Now uses `updated_at` from `daily_activity` |
| "JOIN THE SEASON" CTA going to wrong URL | Now routes to `/register` |
| Logo not responsive on mobile | Fixed to `max-w-[480px]` |
| "At random" language in Rules.tsx | Removed — fixed during audit. Note: draws remain random but the compliance framing is now subsidiary/promotional, not "no random element." New Terms language required. |
| `spotPrizeWins` column removed from Leaderboard | Removed from `Leaderboard.tsx` — correct, prize win count should not be elevated as a leaderboard metric |
| Admin midnight reap button shown to all users | Now wrapped in `{isAdmin && ...}` |
| Register.tsx price said "/ MONTH" | Updated to "/ SEASON" |
| Password minimum 6 characters | Increased to 8 characters |

---

*This appendix is an internal compliance audit. It does not constitute legal advice. All items marked as requiring legal sign-off must receive Shelley [surname]'s written approval before participant-facing publication. This document is filed with the CEO and is available to the board on request.*
