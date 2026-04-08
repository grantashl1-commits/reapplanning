# SURVIVE THE REAP — LEGAL COMPLIANCE & PRODUCT AUDIT

**Date:** 8 April 2026 | **Audited by:** Claude Code (claude-sonnet-4-6)
**Repo:** `ashleighc-byte/survive-the-reap` | **Live:** survive-the-reap.lovable.app
**Stack:** React/TypeScript + Vite, Supabase, Stripe, Resend | **Operator:** The Living Lab, Sport Waikato

---

## 1. OVERALL COMPLIANCE VERDICT

### **AT RISK**

The build does not currently constitute gambling under the Gambling Act 2003, but it contains a single critical contradiction that could cause it to fail DIA scrutiny: the Rules/FAQ page says spot prizes are awarded **"at random"** while the Terms of Participation say prizes are **"skill-based or participation-based."** These directly contradict each other, and the "at random" phrasing — combined with a mandatory $14.99 fee — creates the exact structure (consideration + chance + prize) that the DIA uses to identify an unlicensed lottery. Additionally, the prize draw mechanism does not exist in code at all, which means the app cannot yet satisfy the spot prize exemption requirements even if the legal framing were corrected.

---

## 2. CRITICAL FLAGS (fix before any public launch)

| # | Issue | Location in code/UI | Legal risk | Recommended fix |
|---|---|---|---|---|
| **C1** | **"At random" contradicts "skill-based" Terms** | `Rules.tsx` SPOT PRIZES FAQ vs `Terms.tsx` Section 6 | **CRITICAL.** A random draw among fee-paying participants = lottery under s8 Gambling Act 2003. The Terms assert a lawful prize competition but the FAQ undermines it. | Decide on ONE mechanism. If random spot prize draw, remove "skill-based" from Terms and ensure the spot prize exemption requirements are explicitly met. If skill-based, remove "at random" from Rules entirely. |
| **C2** | **No prize draw backend exists** | `Admin.tsx` SPOT PRIZE MANAGER — `onClick={() => toast.success("Prize awarded!")}` — no DB write, no email, no record | No draw can satisfy the "lottery" exemption requirements if it doesn't exist. The 7-day post-season window requirement cannot be met. | Build a real draw mechanism: timestamped, logged to DB, restricted to eligible players, triggerable within 7 days of season end. |
| **C3** | **Subscription is recurring, UI says "season pass"** | `create-checkout/index.ts` → `mode: "subscription"` vs `Register.tsx` → "$14.99 NZD / MONTH" and "season pass" | Fair Trading Act 1986 breach. Participants believe they're paying once per season. Ongoing billing without a clear cancellation path is a consumer protection issue that also entangles the gambling analysis (ongoing payment + ongoing prize eligibility). | Change Stripe mode to `payment` (one-off) per season OR prominently disclose recurring billing and add a clear in-app cancellation flow. |
| **C4** | **No automated elimination — core mechanic is undelivered** | No edge function or `pg_cron` job exists to eliminate `AT_RISK` players at 23:59 NZST | Not a gambling law issue but a Consumer Guarantees Act issue: participants pay for a service that doesn't work as described. Also undermines the "skill/adherence-based" argument — if elimination is actually manual/arbitrary, the DIA could argue the outcome has a chance element. | Build a scheduled edge function (or Supabase pg_cron job) to run at 23:59 NZST, check `daily_activity.zone2_minutes >= 21` for each `ALIVE` player, and flip status to `FALLEN` in the database. |
| **C5** | **No documented separation of prize funding from entry fees** | No `prize_fund` table, no admin field, no disclosure anywhere in the app | Lawyer specifically flagged that the DIA will scrutinise whether entry fees fund the prize. Without documented separation, the DIA could assert the prize comes from pooled fees — regardless of actual intent. | Add a prize funding disclosure to the Terms: "Spot prizes are funded independently by Sport Waikato from operational budgets. No portion of season entry fees is used to fund prizes." Log this fact in an admin record. |
| **C6** | **Plaintext admin passwords committed to public GitHub repo** | `reset-admin/index.ts`: `"ReapAdmin2026!"` \| `seed-demo/index.ts`: `"SurviveOrFall2026!"` | Security. Admin account is potentially compromised. Bad actor could manipulate player records or prize outcomes, creating fraud exposure for Sport Waikato. | Rotate both passwords immediately. Move all secrets to Supabase environment variables. Remove from source code. |
| **C7** | **`paid_at` is never populated; no Stripe webhook** | `season_entries.paid_at` — never set by any code. No `stripe/webhook` edge function exists. | Cannot prove who paid and when. Creates audit trail gap for the prize draw eligibility check. | Build a Stripe webhook handler to set `paid_at` and confirm `season_entries.status` on successful checkout. |
| **C8** | **Age verification is client-side only** | `Register.tsx` → `isAtLeast18()` — browser only, bypassable via API call | If a minor enters a paid competition with a prize draw, Sport Waikato has regulatory exposure. | Enforce age gate server-side in the `create-checkout` edge function: reject checkout if `profiles.dob` does not meet the 18+ threshold at time of purchase. |

---

## 3. SUBSIDIARITY RISK ASSESSMENT

**Direct assessment: The current build would likely survive DIA subsidiarity scrutiny — but only if the "at random" language is removed.**

### Evidence the prize IS subsidiary (currently in the build)

- The hero, meta description, app title, and all primary CTAs contain **zero prize language**. The product is presented as `"THE KILLER MOVEMENT APP"` with the value proposition `"21 minutes of daily movement. Miss a day and you fall."` — entirely movement-framed.
- No prize dollar amount is disclosed anywhere in the public UI. The lawyer's $5,000 figure does not appear in the code at all. Absence of a specific prize value significantly reduces the prize-as-inducement argument.
- The one prize-adjacent phrase in the How It Works flow is buried at **Step 5, the last step**, and reads: `"may be eligible for spot prizes"` — conditional, not guaranteed.
- The SPOT PRIZES FAQ entry leads with: `"Prizes are incidental rewards for participation and are not guaranteed."` This is the correct legal framing.
- The About page explicitly frames the product as a Sport Waikato health intervention citing WHO guidelines, not as a prize competition.
- The leaderboard measures `MIN/W` (minutes per week) and `WHO` target status as primary columns — health metrics first, `WON` (prize wins) last.

### Evidence the prize is NOT adequately subsidiary (risks)

- The **Rules/FAQ "at random"** phrasing is the single biggest liability. If prizes are randomly awarded, the subsidiary argument weakens sharply — the random element is the hallmark of lottery mechanics, not health competitions.
- The `$14.99/month` fee is mandatory to participate. Even if the Terms say entry to the prize is "free and automatic," a participant cannot access the draw without paying the subscription. The DIA may not accept "free entry" where paid participation is the gateway.
- The **Terms self-declaration** (Section 6 asserting the app is "lawful... [and] does not constitute gambling") carries no legal weight and may actually draw attention — regulators are experienced at identifying operators who use legal boilerplate to paper over a gambling product.
- If the $5,000 prize value is ever disclosed in the app (it isn't currently), that changes the analysis materially. At $5,000, the prize is likely to be viewed as a significant financial inducement against a $14.99 entry cost — a 333x return. That ratio is difficult to frame as incidental.

**Bottom line on subsidiarity:** Fix the "at random" contradiction, keep the prize value off the primary UI, and strengthen the Terms' prize funding disclosure. As written with those fixes, the subsidiarity argument is credible. As currently deployed with the "at random" FAQ text, it is exposed.

---

## 4. UX LANGUAGE AUDIT

Every prize-forward phrase in the live app, scored, with recommended rewrites:

| Location | Current text | Risk score | Recommended rewrite |
|---|---|---|---|
| `Rules.tsx` FAQ — SPOT PRIZES | `"Spot prizes may be awarded at random during the season to active players."` | **HIGH** — "at random" + "active players" (i.e. paying participants) = lottery structure | `"Spot prizes may be awarded during the season to active survivors. Prize recipients are selected based on participation criteria announced at the time of each prize."` |
| `Rules.tsx` FAQ — Step 5 | `"Survivors are recognised on the leaderboard and may be eligible for spot prizes throughout the season."` | **LOW** — conditional, buried, correctly hedged | Keep as-is. Consider: `"Survivors are recognised on the leaderboard. Sport Waikato may award spot prizes to active participants at its discretion."` |
| `Leaderboard.tsx` — column header | `WON` (for spot prize wins) | **MEDIUM** — tracking prize wins as a leaderboard metric elevates prizes in the competitive hierarchy | Rename to `PRIZES` or remove entirely. If the draw is truly incidental, it shouldn't be a tracked competitive metric alongside health data. |
| `Terms.tsx` Section 6 | `"These are skill-based or participation-based prize competitions conducted in accordance with the Gambling Act 2003"` | **MEDIUM** — self-declaration of compliance is not legally protective and will be read by DIA as an attempt to pre-empt enforcement | Remove the Gambling Act self-citation. Reframe: `"Any prizes awarded are incidental to the main event and are not funded from season entry fees. Entry to any prize draw is free and automatic for eligible participants."` |
| `Terms.tsx` Section 6 | `"Prizes are awarded based on criteria announced at the start of each competition (such as most minutes logged, longest streak, or first to complete a milestone)."` | **LOW** — correctly frames prizes as skill/adherence based | Retain this language. This is your strongest compliance framing. |
| `Webinar.tsx` | `"Miss a day and you fall. Survive the month to win."` | **HIGH** — "to win" directly frames survival as the path to a financial prize. This is the one instance where the prize is the stated reward for completing the activity. | `"Miss a day and you fall. Survive the month to complete the challenge."` |
| `Admin.tsx` | `SPOT PRIZE MANAGER` / `AWARD PRIZE` | **LOW** — admin-only, not public-facing | No change needed for compliance; needs functional backend for legal operation. |

### One phrase NOT currently in the build that must NEVER be added

Any headline, CTA, or onboarding screen that includes `"Win $5,000"`, `"Prize pool"`, `"Cash prize"`, or that links the fee to the prize in any way (e.g. `"Your $14.99 entry includes a chance to win"`).

---

## 5. CODE ISSUES (non-compliance bugs and structural problems)

These are build-breaking or functionally incomplete issues independent of gambling law:

| # | Issue | Location | Impact |
|---|---|---|---|
| **B1** | No midnight elimination job | No edge function or `pg_cron` job exists to eliminate `AT_RISK` players at 23:59 NZST | **Core mechanic is broken.** The app's entire premise — automatic elimination at midnight — is not implemented. |
| **B2** | 7PM warning doesn't eliminate | `seven-pm-warning/index.ts` sets status to `AT_RISK` but has no companion job to complete the elimination | See B1. These two functions need to be paired. |
| **B3** | Admin FALL/REVIVE buttons don't write to DB | `Admin.tsx` — mutations only update `mockPlayers` local React state | Admins cannot actually manage player status through the UI. |
| **B4** | Stripe webhook handler missing | No `stripe/webhook` edge function exists | `paid_at` never set; `profiles.subscribed` never updated; season entries not confirmed on payment. |
| **B5** | Recurring Stripe subscription vs one-time UI | `create-checkout/index.ts` → `mode: "subscription"` | Players will be billed monthly indefinitely with no in-app cancellation. |
| **B6** | `profiles.subscribed` never written | Everywhere — `check-subscription` reads from Stripe but doesn't persist | Session-level auth state may desync from DB; subscription status is unreliable across devices. |
| **B7** | Redemption Day not enforced | `redemption_days` table exists with correct constraints, but no elimination logic exists to check against | Feature is cosmetic — it affects only `ActivityHistory.tsx` display, not actual survival. |
| **B8** | Hardcoded stats not from DB | `SeasonStatus.tsx`, `Dashboard.tsx`, `PublicBoard.tsx` — `alive = 42`, `fallen = 158`, `waitlistCount = 87` are literals | Public-facing stats are fabricated. The public leaderboard falls back to these hardcoded values if the DB returns nothing. |
| **B9** | Age check is client-side only | `Register.tsx` → `isAtLeast18()` | Bypassable; no server enforcement. |
| **B10** | Plaintext passwords in public repo | `reset-admin/index.ts`, `seed-demo/index.ts` | Both passwords should be treated as compromised. |
| **B11** | No cancellation flow | Entire app | Players on a recurring subscription have no way to cancel within the product. |
| **B12** | No Stripe webhook signature verification | N/A — no webhook exists | When webhook is built, it must verify `stripe-signature` header to prevent spoofed payment confirmations. |

---

## 6. RECOMMENDED SAFER STRUCTURE

**Recommendation: Modify the random draw model, do not replace it entirely — but make the eligibility criteria the primary value proposition.**

### Option A — Keep random spot prize draw (requires fixes)

The spot prize exemption under the Gambling (Non-gambling Activities) Regulations 2013 is viable IF:

1. The "at random" / "skill-based" contradiction is resolved in favour of clear random draw language in the Terms (not FAQ)
2. The prize funding is explicitly separated from entry fees in both code and legal documentation
3. A real draw mechanism is built with a timestamp-locked trigger within 7 days of season end
4. The prize is framed throughout as an **incidental benefit of completing the season**, never as a reason to join
5. The Terms explicitly state: "Entry to the prize draw is free and automatic for all surviving participants. No additional payment is required."

The lawyer is right that the DIA subsidiarity test is the high-risk element. The current UI actually handles this reasonably well. The code does not.

### Option B — Replace random draw with fixed activity-based awards (lawyer's preferred)

This eliminates the lottery/gambling classification risk entirely:

- **"Top 3 survivors by total Zone 2 minutes" wins a fixed prize** — this is a skill competition, not a lottery
- No chance element; no DIA scrutiny on gambling law
- Still has a prize and still motivates completion
- Easier to defend publicly: "the fittest survivors win" vs "a random survivor wins"
- Can still be structured as a post-season event within 7 days

### Option C — Donation model (lawyer's suggestion)

Winners donate the prize value to a Sport Waikato programme of their choosing. This removes personal financial gain, which is the DIA's primary concern. Viable but reduces participant motivation. Only recommended if Options A and B are legally blocked by DIA guidance.

### Recommended hybrid

Award the fixed-prize categories (most minutes, longest streak, most improved) as the primary recognised outcomes. Keep a random spot prize draw as a **secondary, smaller, explicitly incidental** award for a survivor drawn from the eligible pool. This gives Sport Waikato both a defensible skills-based top prize AND the excitement of a random lucky draw — with the gambling risk concentrated in the clearly subsidiary, smaller prize.

---

## 7. PRE-LAUNCH CHECKLIST (prioritised)

### STOP — must fix before any public sign-up opens

- [ ] **1. Resolve the "at random" contradiction.** Pick one: random draw (spot prize exemption route) or skill-based criteria (prize competition route). Edit `Rules.tsx` and `Terms.tsx` to be consistent. Get this wording approved by Shelley before committing.
- [ ] **2. Add explicit prize funding separation disclosure to Terms.** Add verbatim: "Spot prizes are funded by Sport Waikato independently of season entry fees. No entry fee revenue is used to fund prizes." Get this signed off by the operator.
- [ ] **3. Rotate compromised credentials immediately.** `ReapAdmin2026!` and `SurviveOrFall2026!` are in a public GitHub repo. Rotate now via Supabase dashboard. Move all secrets to environment variables.
- [ ] **4. Fix Stripe to match UI framing.** Either change `mode: "subscription"` to `mode: "payment"` for per-season billing, OR add prominent recurring billing disclosure and an in-app cancellation button.
- [ ] **5. Build and deploy the midnight elimination cron job.** Until players are actually eliminated automatically at midnight, the game does not function. This is the core product. Use Supabase `pg_cron` or a scheduled edge function triggered at `23:59:59+13:00` daily.

### HIGH PRIORITY — fix before any paying participant is billed

- [ ] **6. Build Stripe webhook handler.** Must set `paid_at`, confirm `season_entries.status`, and update `profiles.subscribed` on successful checkout. Without this, there's no payment audit trail.
- [ ] **7. Build the prize draw mechanism with a proper backend.** Replace `toast.success("Prize awarded!")` with: a logged record in a `prize_awards` table, a timestamp check confirming the draw falls within 7 days of season end, eligibility gate (only `SURVIVED` players), and an email confirmation to the winner.
- [ ] **8. Enforce age gate server-side.** Add `dob` check in `create-checkout` edge function. Reject checkout if player is under 18.
- [ ] **9. Wire Redemption Day to the elimination logic.** The `redemption_days` table is correctly designed but the midnight job needs to check it before eliminating a player.

### MEDIUM PRIORITY — fix before national scale

- [ ] **10. Remove or justify hardcoded stats.** `alive = 42`, `fallen = 158`, `waitlistCount = 87` in `SeasonStatus.tsx` and `PublicBoard.tsx` are fabricated. Replace with live DB queries before going public. Displaying fake participation numbers may breach the Fair Trading Act 1986.
- [ ] **11. Rename or remove the `WON` leaderboard column.** Tracking prize wins as a competitive metric elevates prizes to primary status. If the prize is incidental, it should not be a ranked leaderboard category.
- [ ] **12. Fix the `"Survive the month to win"` copy in `Webinar.tsx`.** This is the one instance where the prize is explicitly framed as the reward for completing the activity. Change to `"Survive the month to complete the challenge."`
- [ ] **13. Remove demo coupon `REAPDEMO100` from source code.** Move to environment variable or admin-only generation.
- [ ] **14. Document the prize draw procedure in an admin SOP.** Even when code is built, Sport Waikato needs a written procedure for when and how the draw is run, how the winner is notified, and how the prize is funded and disbursed. This is a regulatory audit paper trail requirement.

### LOWER PRIORITY — before national launch

- [ ] **15. Get DIA informal guidance.** Given the $5,000 prize value and national scale ambitions, Sport Waikato should seek informal DIA guidance before launch. The spot prize exemption has not been tested at this scale or in a digital/app context. A brief letter to DIA costs very little and provides significant protection.
- [ ] **16. Consider whether the activity-based fixed prize should be the PRIMARY prize.** If prizes for "most minutes logged" or "longest streak" replace or dominate the random draw, the gambling classification risk drops to near zero.
- [ ] **17. Add explicit in-app disclosure of prize funding source.** Consider a one-line footer or Terms clause: "All prizes are funded by Sport Waikato from operating budgets and are provided as a reward for participant achievement. No prize is funded from season entry fees."
- [ ] **18. Add subscription cancellation flow.** Required under Consumer Guarantees Act 1993 and basic consumer fairness. A user should be able to cancel from within the app.

---

## SUMMARY TABLE

| Category | Status |
|---|---|
| Hero/primary UX leads with health, not prize | CLEAN |
| No prize dollar value in public UI | CLEAN |
| Prize correctly framed as incidental in FAQ | CLEAN |
| No entry fee pooling in code | CLEAN |
| WHO health framework prominently cited | CLEAN |
| Physical activity is the primary game mechanic | CLEAN |
| "At random" vs "skill-based" contradiction | **CRITICAL FLAG** |
| Prize draw mechanism not built | **CRITICAL FLAG** |
| Recurring billing vs one-time "season pass" framing | **CRITICAL FLAG** |
| No prize funding separation documented | **HIGH RISK** |
| Core elimination logic not implemented | **BUILD BLOCKER** |
| Plaintext credentials in public repo | **SECURITY** |
| Age gate client-side only | **HIGH RISK** |
| No Stripe webhook | **BUILD BLOCKER** |
| Hardcoded fabricated stats | **FAIR TRADING RISK** |

---

---

## 8. CEO / BOARD CONCERNS (Rob Wadmore, 1 April 2026)

The following four concerns were raised by CEO Rob Wadmore from a Trustee perspective. Each is addressed below with specific recommendations for how the product, business paper, and launch approach should respond.

---

### 8.1 What does success look like?

**Rob's concern:** The paper opens with a two-fold purpose (drive daily movement + generate revenue for Sport Waikato) but never closes the loop on what success actually looks like. A Trustee reading it has no benchmark to evaluate whether the venture has worked.

**Recommended addition to the business paper:**

Add a short "Definition of Success" section immediately before the Recommendation, framing it as:

> **1. Movement outcomes:** Success is demonstrated when REAP participants show measurably higher average daily active minutes than a comparable non-participant cohort, and where a statistically meaningful proportion of participants report sustained movement habits beyond the season. The benchmark is the WHO 150-minute/week target — a season is successful if the majority of completers are meeting that threshold by end of season.
>
> **2. Revenue outcomes:** Success is generating net positive revenue that flows back to Sport Waikato's community health programmes — not profit for its own sake. The paper should define the minimum viable revenue figure that justifies the operational overhead at each scale threshold (e.g. 100 players, 500 players, national).
>
> **3. Strategic proof of concept:** Success is also demonstrating that gamification can move people who are not already exercising. If REAP attracts a different demographic to Sport Waikato's usual reach, that is a qualitative success worth documenting.

**Product implication:** The app currently tracks `MIN/W` and `WHO` target progress. These metrics should be explicitly connected to post-season reporting. Build a simple season-close summary that Sport Waikato can export: average Zone 2 minutes per participant, % hitting WHO targets, retention across seasons. This gives Trustees measurable evidence.

---

### 8.2 Primary value proposition is unclear

**Rob's concern:** If the prize is deliberately downplayed for legal reasons, what is the actual reason someone pays $14.99 when free alternatives (Strava, Apple Fitness, a free habit tracker) exist? The behavioural science rationale is implied but never named.

**Assessment of what the code actually delivers:**

The current build contains several distinct behavioural mechanisms that justify the fee — they are just never articulated as such:

| Mechanism | How it works in the product | Evidence it works |
|---|---|---|
| **Loss aversion** | You pay first, then risk losing your season pass status through inaction. The sunk cost is real. | Kahneman & Tversky: losses hurt ~2x more than equivalent gains feel good. |
| **Public commitment** | Your survival/elimination is visible on the public leaderboard and to followed players. Social accountability amplifies stakes. | Gollwitzer (1999) on implementation intentions; Ariely on social proof. |
| **Artificial scarcity / game tension** | The Reaper countdown clock, 7PM warning emails, and elimination aesthetic manufacture urgency that free apps don't. | Game design literature on time pressure as motivation. |
| **Identity / belonging** | Alias selection, survival board, follower system, and the "survivor" identity create community attachment. | Self-determination theory (Ryan & Deci): relatedness as intrinsic motivator. |
| **Structured difficulty** | 21 minutes is achievable but non-trivial. The specificity (Zone 2, not just "any movement") creates clarity that vague wellness apps don't offer. | Implementation intention research: specific plans outperform general intentions. |

**The primary value proposition should be explicitly named as:** *"The only movement accountability tool that puts real stakes on daily activity — not a score, not a badge, but your participation itself."* The $14.99 is not paying for a chance to win. It is paying for the psychological mechanism of loss aversion to work on your behalf.

**Recommended addition to the business paper:** Add a "Value Proposition" subsection under the User section that names the behavioural science mechanisms explicitly and cites 2–3 sources. This also strengthens the legal argument that the fee is for the service, not for entry into a prize draw.

**Product implication:** The onboarding flow (`Onboarding.tsx`) should be updated to name this explicitly. Currently it explains the rules but doesn't sell the mechanism. Add one screen: *"Why does paying matter? Because skin in the game changes behaviour. The $14.99 isn't a fee — it's your commitment device."*

---

### 8.3 Reputational risk

**Rob's concern:** Two distinct reputation risks were identified:

1. **Alignment risk:** Externals (funders, media, members of the public) may question how a commercially-oriented, provocatively-branded product aligns with Sport Waikato's identity as a charitable trust and publicly-funded organisation.
2. **Tone/aesthetic risk:** The "Reaping," elimination, and dark survival aesthetic may draw criticism from funders or the public — particularly if a participant has a negative experience and goes public.

**Assessment:**

Both risks are real and are currently unaddressed in the build and (apparently) in the business paper. The product leans fully into the provocative aesthetic with no visible acknowledgement that it sits within a public health mission. The About page is the only section that contextualises REAP within Sport Waikato's health mandate — but it is buried in the navigation and not linked from the primary user journey.

**Recommended mitigations:**

| Risk | Recommended mitigation |
|---|---|
| **Alignment with charitable purpose** | Add a persistent footer or onboarding screen that explicitly connects REAP to Sport Waikato's mission: *"REAP is a Sport Waikato Living Lab programme. All revenue funds community health initiatives in Waikato."* This should also appear on the marketing landing page, not just in the About section. |
| **Aesthetic tone** | Develop a one-page "brand rationale" document for internal use (board papers, funder conversations) that explains the design choice: the dark aesthetic is deliberate because it creates the psychological stakes that drive behaviour change. It is not gratuitous — it is functional. Have this ready before any media or funder inquiry. |
| **Participant negative experience** | The current support flow (`Support.tsx`, `send-support-email`) is functional but has no public-facing process. Add a published complaints/disputes process. The Terms already reference admin review for sync disputes — surface this in the UI so participants feel there is a fair process. |
| **Funder communication** | Brief key funders before public launch. Frame REAP as an innovation experiment with measurable health outcomes, not as a commercial product. The revenue is a means to sustain the programme, not the purpose. |
| **Media readiness** | Prepare a short Q&A document for the CEO/comms team: "What is REAP? Why does Sport Waikato run a survival game? Why is there a prize?" These questions will come. Having prepared answers is far better than reacting. |

**Product implication:** The `Landing.tsx` hero currently has zero Sport Waikato branding visible. The Sport Waikato / Living Lab identity should appear above the fold — not replacing the REAP brand, but as an explicit endorser. *"A Sport Waikato Living Lab programme"* in the header or footer costs nothing and provides significant reputational protection.

---

### 8.4 Revenue assumptions

**Rob's concern:** The financials are compelling but may not survive Board-level scrutiny without transparency on: player growth assumptions, expected acquisition costs, and retention assumptions. A range of scenarios (conservative / base / optimistic) is needed.

**Assessment of what is currently in the build:**

The codebase contains no financial modelling. The hardcoded stats (`alive = 42`, `fallen = 158`, `waitlistCount = 87`) are fabricated placeholder figures, not projections. The Stripe price is hardcoded at `$14.99 NZD/month`. There is no admin dashboard showing revenue, churn, or cohort data.

**Recommended scenario model for the business paper:**

The following is a framework based on the $14.99/month fee and the product's current structure. The paper should include something like this:

| Assumption | Conservative | Base | Optimistic |
|---|---|---|---|
| Season 1 participants | 50 | 150 | 300 |
| Monthly fee (NZD) | $14.99 | $14.99 | $14.99 |
| Gross revenue / season | $749 | $2,249 | $4,497 |
| Completion / retention rate | 30% | 45% | 60% |
| Season-over-season participant growth | 20% | 50% | 100% |
| Customer acquisition cost | $25 | $15 | $8 |
| Seasons per year | 10 | 10 | 10 |
| Break-even participants/season | ~30 (operational costs TBD) | ~30 | ~30 |

**Key assumptions that must be documented explicitly:**

1. **Acquisition cost basis:** Is Sport Waikato relying on existing network reach (low cost) or paid digital advertising (high cost)? The difference between $8 CAC and $25 CAC is the difference between a sustainable model and a loss-making one at early scale.
2. **Retention assumption basis:** What is the evidence that participants re-enrol for subsequent seasons? Has any retention data been collected from pilots? If not, this should be flagged as an assumption, not a projection.
3. **Prize cost amortisation:** The $5,000 spot prize must appear as a cost line. At 150 participants, the prize represents $33/participant — 2.2x one month's fee. The paper must show how this is funded from operational budget, not revenue, and what the net contribution to Sport Waikato programmes actually is after prize costs.
4. **Operational overhead:** Platform costs (Supabase, Stripe fees ~2.9% + $0.30/transaction, Resend, Lovable hosting) should be itemised. At current scale these are minimal but must appear in the model.
5. **Regulatory/legal cost:** The compliance work (lawyer fees, potential DIA filing, ongoing legal review) is a real cost. It should appear in the model as a one-time setup cost and an annual ongoing cost.

**Product implication:** Build a simple admin revenue dashboard that shows: active subscribers, monthly recurring revenue, season-to-date revenue, Stripe churn rate. This gives Sport Waikato real data to replace the fabricated stats and to report accurately to the Board.

---

---

## 9. TEAM DISCUSSION RESPONSES (8 April 2026 — Leanne Bats, Ashleigh Carlson, Martin Street)

The following concerns and directions emerged from the team's live working session. Each is addressed below with updated recommendations for the business paper and product.

---

### 9.1 Revised success metrics

**What the team resolved:** Leanne's position — retention is the primary success metric. Ashleigh's pre/post comparison idea is directionally right but practically hard to prove (no baseline data on participants' prior activity). The team converged on three measures, in priority order:

**Recommended success definition for the business paper:**

> **1. Retention** — Do participants come back season after season? A participant returning for a third consecutive season is the strongest available signal that behaviour change has occurred and that the product delivers sustained value. This is measurable from day one and does not require external validation. Target: 40%+ of Season 1 completers re-enrol for Season 2.
>
> **2. WHO guideline compliance during active seasons** — Are participants meeting 150–300 minutes of moderate activity per week while enrolled? The `WHOProgressMeter` data already captured in the app makes this reportable without any additional data collection. This is the health outcome metric. Target: 70%+ of active participants at or above WHO minimum in any given week.
>
> **3. Commercial viability** — Sign-ups, revenue per season, and churn rate. Success is a product people pay for, return to, and tell others about. Target: break-even by Season 3, positive contribution to Sport Waikato programmes by Season 6.

**Why Ashleigh's baseline comparison idea still has value:** It cannot be proven retrospectively, but it can be built prospectively. Add one question to onboarding: *"Before joining REAP, how many days per week were you completing 21+ minutes of moderate activity?"* This self-reported baseline, compared to actual tracked data in-season, gives a directionally useful before/after story for funders and media even if it is not scientifically rigorous.

**Why this reframes Rob's success framing:** Rob's original framing ("success = proving gamification grows participation") is a proof-of-concept framing suited to a grant application, not a commercial product. The team is right to push back. REAP is past the "does this work in theory?" question. The success metrics should be commercial and behavioural — not academic.

---

### 9.2 Revised primary value proposition

**What the team resolved:** Leanne does not fully accept Rob's framing of the value proposition problem. Her counter-position: the social mechanics (leagues, groups, WhatsApp sharing) ARE the value proposition — alongside loss aversion. The prize is not the reason people play. Community competition is.

**Revised value proposition statement for the business paper:**

> REAP's primary value proposition is the combination of three things no free alternative offers simultaneously:
> 1. **Real stakes** — money already paid, status publicly visible, elimination permanent within the season
> 2. **Social accountability at scale** — league groups, WhatsApp-native sharing, elimination visible to friends
> 3. **Structured simplicity** — one rule, one number (21 minutes), one consequence (fall or survive)
>
> The prize is not the reason people join. It is a reward for people who were already going to complete the season. This distinction is both legally necessary and commercially accurate — the repeat customer is motivated by community and habit, not by prize odds.

**The "prove it" hook Martin identified** — *"21 minutes a day? Easy. Prove it."* — should be in marketing copy. This converts skepticism into sign-ups. It also honestly reflects the product: the physical task is accessible, the mental consistency is not. That tension is the core product experience.

---

### 9.3 League/group feature — now a LAUNCH BLOCKER

**What the team resolved:** This is not a nice-to-have. Every person in the meeting independently identified group leagues with WhatsApp-shareable invite links as the primary growth and retention mechanic. Without it, the product's social loop doesn't close.

**What needs to be built:**

| Feature | Description | Priority |
|---|---|---|
| **Create a group** | Any user can create a named group (e.g. "Hamilton Parkrun", "F45 Mt Eden", "High School Mates") | Launch blocker |
| **Invite link** | One-tap shareable link that generates a WhatsApp/message-ready invite: *"I've started a REAP group — join it and try to survive longer than me: [link]"* | Launch blocker |
| **Group leaderboard** | Private survival board scoped to group members only — showing who is alive/fallen within the group | Launch blocker |
| **Multi-group membership** | A user can belong to multiple groups simultaneously (work group + friend group + regional group) | Launch blocker |
| **Group elimination feed** | When someone in your group falls, you get a notification. This is the social drama engine. | High priority |
| **Group creation from season waitlist** | When joining the waitlist, prompt: "Start a group or join one" before confirming entry | High priority |

**The Wordle analogy is exact:** Wordle's entire distribution was WhatsApp-native daily sharing of results. The shareable elimination/survival card (recommended in Section 7 of this audit) combined with group invite links replicates that loop. The product already has `follows`, `messages`, and `season_entries` tables — groups are a schema extension, not a rebuild.

**Geographic/interest-based groups** (e.g. "Taupo Season 1", "Hamilton Corporate League") also solve the national scale question from the audit. The product doesn't need to be marketed nationally from a central channel — groups self-organise and spread regionally.

---

### 9.4 Dark aesthetic — resolved as "playfully dark"

**What the team resolved:** The aesthetic does not need front-facing justification. Martin's framing is correct: it is "cute death" — Halloween, not death metal. The Hell Pizza comparison and the TAC "Meet Sam" campaign (Melbourne) are the right cultural references. A government public health organisation ran a campaign with animated men being eaten by piranhas and it is remembered twenty years later. REAP is in that tradition.

**What this means for the reputational risk response:**

- The brand rationale document (recommended in Section 8.3) is a **back-pocket document** — ready to hand to a funder or journalist who asks, not proactively published
- The aesthetic does not need to be softened or explained on the website
- The Sport Waikato / Living Lab attribution in the header/footer is sufficient to anchor the public health credibility without compromising the brand voice
- If challenged, the response is: *"The dark aesthetic is deliberate. Public health messaging that takes mortality risk seriously and uses creative tension to drive behaviour change has a strong evidence base. The TAC's 'Meet Sam' campaign is one example. The aesthetic matches the stakes."*

**One addition:** The comparison to **Hell Pizza** (NZ) is worth documenting internally. Hell Pizza is a NZ company that built a national brand on deliberately provocative, dark-humour marketing within a category (fast food) not naturally associated with it. They are a direct local precedent for "edgy brand, mainstream product, NZ audience." This context strengthens the board paper.

---

### 9.5 Owning the vernacular — and name alternatives for REAP

**What the team identified:** Leanne wants to own a word the way Wordle owns "did your Wordle" and fantasy sports owns "your picks." The word should work as a past-tense verb in natural speech: *"I got [X]"* / *"nearly [X]ed me this morning."*

**Assessment of "REAP" as that word:**
- "I got reaped" — works, clear, sharp
- "Survived the Reap" — works as a season completion statement
- "The Reaper got me" — works for elimination
- The weakness: REAP has agricultural and financial associations ("reap what you sow") that dilute the brand's edge, and "Survive the Reap" as a full product name is slightly clunky

**Alternative names — shortlist:**

| Name | Vernacular | Tone | Rationale |
|---|---|---|---|
| **THE CULL** | "I got culled" / "survived the Cull" | Playfully dark, biological | Strong NZ resonance — culling is part of farming culture. Clean, short, ownable. Works as verb and noun. |
| **FALLEN** | "I fell today" / "don't fall" | Emotionally sharp | Already used as the elimination status in the app — could become the product name. Simple, universal, no cultural baggage. |
| **SICKLE** | "dodged the Sickle" / "the Sickle got me" | Dark, visual | Directly references the reaper's tool. Leanne raised it. Memorable, distinctive, unfamiliar as a brand name (ownable). Risk: niche cultural reference outside NZ. |
| **VITAL** | "logged my Vital" / "kept my streak" | Playfully clinical | Double meaning: vital signs (you're alive) and vital (essential). Less dark, more health-forward. Lower reputational risk. May be too soft for the brand voice. |
| **OUTLAST** | "outlasted 80% this season" | Competitive, gaming | Familiar from survival game culture. Works as a challenge frame. Risk: gaming associations may confuse the health message. |
| **PERSIST** | "I persisted today" / "persistence score" | Behavioural, clean | Less dark. Focuses on the mental consistency angle. Works for corporate and broader audiences. May be too bland. |
| **DUSK** | "before Dusk" / "beat the Dusk" | Atmospheric | The midnight cutoff reframed as dusk. Evocative but abstract — may not travel well. |

**Recommendation:** If the team is keeping the dark/survival aesthetic, **THE CULL** is the strongest alternative. It is short, NZ-resonant, works naturally as a past-tense verb, and carries biological/natural connotations that fit the health positioning without being gory. "I got culled" is instantly understandable. "Survive the Cull" is a complete brand statement.

If the team wants to reduce reputational risk without losing edge, **FALLEN** is the safest option — it is already embedded in the product's language, requires no explanation, and the verb ("I fell today") is universally understood.

**If REAP stays:** The vernacular to own is *"got reaped"* / *"the Reaper"* — lean into the Reaper character more explicitly in marketing as the embodiment of inactivity. The Reaper is not death — it is the consequence of not moving. That reframe makes the aesthetic not just playfully dark but scientifically grounded: the Reaper represents the 20–30% premature mortality risk the WHO cites. That is a story worth telling.

---

### 9.6 The "REAP → RAPE" misread risk

**This is a real problem and needs a direct decision.**

The concern is legitimate, not overcautious. Here is the specific exposure:

**Where the misread happens:**

| Context | Risk level | Example |
|---|---|---|
| Fast-scrolling social media posts | **HIGH** | "I got reaped this morning 😭" in a Facebook feed |
| WhatsApp notifications (truncated preview) | **HIGH** | Message preview: "You got reap—" |
| Small font / certain typefaces | **HIGH** | In-app notifications, email subject lines, leaderboard entries |
| Push notifications | **HIGH** | "The Reaper got you. You've been reaped." |
| Spoken/audio contexts | **MEDIUM** | Podcast mentions, word-of-mouth, voice assistants reading notifications |
| Non-native English readers | **MEDIUM** | A significant portion of NZ's target demographic |
| News/media coverage at scale | **HIGH** | A journalist writing "participants who get reaped" in a headline |

**The vernacular goal works against the product here.** The team specifically wants people saying "I got reaped" in WhatsApp groups — but that is the exact phrase most likely to be misread at speed. The more successfully the vernacular spreads, the more frequently the misread occurs. These two goals are in direct tension.

**Why this is elevated risk for Sport Waikato specifically:**
- Sport Waikato is a publicly-funded charitable trust. A misread that goes viral — even once — generates headlines the organisation cannot afford
- The app's dark aesthetic means there is no softening context. If it were a cheerful wellness app the misread would be more easily dismissed
- The 7PM warning email currently reads *"You've been reaped"* in contexts where email preview text truncates at 6–8 characters. On a phone lock screen: *"You've been reap..."*

**Mitigation options if keeping the name REAP:**

1. **Typography lock** — Use a typeface where E and A are visually distinct and the word "REAP" cannot be scanned as "RAPE" at any size. Avoid condensed sans-serif fonts where letters compress. Test at 10px and in bold. This reduces but does not eliminate the risk.
2. **Avoid past-tense verb forms in all official copy** — Never write "you've been reaped" or "I got reaped" in app notifications, emails, or marketing. Always use noun forms: "The Reaper has claimed you" / "Eliminated by the Reaper." This controls what Sport Waikato publishes but cannot control user-generated sharing.
3. **Rebrand the elimination language** — Change the in-app status from `FALLEN` / `REAPED` terminology to something that removes the verb entirely. Users are eliminated; they don't get reaped.

**Honest assessment:** These mitigations reduce the risk but do not remove it. The misread is most dangerous at scale — in the exact scenario (national rollout, viral WhatsApp spread) that the team is building toward. A name that does not carry this risk at all is structurally safer.

**Recommendation: This is the strongest single argument for a name change.**

Of the alternatives listed in Section 9.5, all avoid this problem entirely. The top two recommendations in light of this specific risk:

| Name | "Got [X]ed" vernacular | Misread risk | Verdict |
|---|---|---|---|
| **THE CULL** | "I got culled" | None | **Strongest alternative** |
| **FALLEN** | "I fell today" / "I fell this morning" | None | **Safest, already in the product** |
| **SICKLE** | "the Sickle got me" | None | Strong, but more niche |
| **REAP** (current) | "I got reaped" | **Real and unresolvable at scale** | Elevated risk |

The team should make a deliberate decision on this before any public launch — not because it is inevitable that someone will be offended, but because it is preventable, and the cost of prevention is low (a name change now) versus the cost of a reactive rebrand after the product has scaled.

---

---

## 10. MARKET SIZING — ADDRESSABLE & OBTAINABLE MARKET (Board Report)

The following provides the TAM / SAM / SOM framework and projected revenue scenarios suitable for inclusion in a board or trustee report.

---

### 10.1 The three numbers a board report needs

A board report requires three distinct market figures. Each answers a different question:

| Term | Question it answers | What it is for REAP |
|---|---|---|
| **TAM** — Total Addressable Market | How big is the total problem we're addressing? | All insufficiently active NZ adults 18–45 |
| **SAM** — Serviceable Addressable Market | Who could realistically use this product? | Active-but-inconsistent, competitive, gamification-receptive NZ adults 18–45 |
| **SOM** — Serviceable Obtainable Market | How many can we realistically acquire in Years 1–3? | The credible capture range given Sport Waikato's current reach and a word-of-mouth distribution model |

---

### 10.2 TAM — Total Addressable Market

**Source:** Sport NZ Active New Zealand Survey + Ministry of Health physical activity data

Approximately **50% of New Zealand adults do not meet WHO physical activity guidelines** (150+ minutes moderate activity per week). Applied to the 18–45 age bracket (approximately 1.1 million New Zealanders based on Stats NZ population data), this gives a TAM of roughly:

> **TAM: ~1,100,000 insufficiently active New Zealanders aged 18–45**

This is the ceiling — the total population whose inactivity problem REAP is designed to address. It is appropriate for the board paper's opening context but should not be used as a participation projection.

---

### 10.3 SAM — Serviceable Addressable Market

REAP is not for all inactive people. The product requires:
- An existing fitness tracker or heart rate monitor (device ownership)
- Willingness to pay for a structured challenge
- A competitive and/or gamification-receptive personality
- Comfort with a digital/app-based product

Sport NZ data shows approximately **35–40% of NZ adults participate in structured physical activity** (gym, sport, fitness class) at least weekly. Of the 18–45 cohort, this is roughly 400,000–450,000 people. Filtering for those who have completed a structured fitness challenge or competitive fitness activity in the last 12 months (F45 challenges, Hyrox, Parkrun events, corporate step challenges, online fitness programs) brings the realistic SAM to:

> **SAM: ~150,000–200,000 New Zealanders aged 18–45**

This is the population Sport Waikato can credibly claim REAP is built for, and the number from which acquisition rate projections should be drawn.

**Citation for board paper:** Sport NZ Active New Zealand Survey (most recent edition) and Ministry of Health Physical Activity Data — both are publicly available and recognisable to a Trustee audience.

---

### 10.4 SOM — Serviceable Obtainable Market (Years 1–3)

A realistic organic capture rate for a new digital fitness product with **no paid acquisition budget** and **word-of-mouth / community distribution** (the current model) is **0.1–0.5% of SAM** in Year 1.

This gives a credible Year 1 participant range of **150–1,000 paying participants.**

At $14.99/month across a 10-month active season calendar (2 months off for setup/transition between seasons):

| Scenario | Year 1 participants | Year 1 gross revenue | Year 2 participants (+50%) | Year 2 gross revenue | Year 3 participants (+50%) | Year 3 gross revenue |
|---|---|---|---|---|---|---|
| **Conservative** | 150 | $22,485 | 225 | $33,728 | 338 | $50,682 |
| **Base** | 400 | $59,960 | 600 | $89,940 | 900 | $134,910 |
| **Optimistic** | 1,000 | $149,900 | 1,500 | $224,850 | 2,250 | $337,275 |

**Key assumptions underlying these projections (must be disclosed in the board paper):**

1. **Growth rate basis:** 50% year-on-year participant growth is based on a word-of-mouth/community distribution model (league groups, WhatsApp sharing, fitness community infiltration). This assumption should be flagged as untested — it is drawn from comparable fitness challenge products, not REAP's own data.
2. **Retention assumption:** These figures assume approximately 40% of each season's completers re-enrol for the following season. This is the primary success metric (see Section 9.1). If retention is lower, the growth curve flattens significantly.
3. **Fee assumption:** $14.99 NZD/month is the current hardcoded Stripe price. The model assumes this does not change. A price sensitivity note should acknowledge that a lower price (e.g. $9.99) would increase acquisition but reduce per-participant revenue — at 400 participants the difference is ~$20,000/year in gross revenue.
4. **Prize cost:** The $5,000 spot prize (if funded per season) must appear as a cost line. At the base scenario (400 participants), one $5,000 prize = $12.50 per participant — approximately one month's fee. At conservative scale (150 participants), the prize represents $33/participant. The board paper must show net contribution after prize costs.
5. **Platform operating costs:** Supabase, Stripe (2.9% + $0.30/transaction), Resend email, Lovable hosting. At 400 participants these are estimated at $300–$600/month combined — approximately $3,600–$7,200/year. Minimal at early scale, should be itemised.
6. **Legal/compliance costs:** One-time setup cost (Shelley's legal review, potential DIA correspondence, Terms drafting) and an annual ongoing review. Estimated $3,000–$8,000 setup, $1,500–$3,000/year ongoing. These are real costs that must appear in Year 1 projections.

---

### 10.5 Net contribution model (base scenario, Year 1)

For a board paper, the gross revenue headline should be accompanied by a net contribution estimate:

| Line item | Amount (NZD) |
|---|---|
| Gross revenue (400 participants × $14.99 × 10 months) | $59,960 |
| Less: Stripe fees (~3.2% blended) | −$1,919 |
| Less: Platform operating costs | −$5,400 |
| Less: Spot prize (1 per season × 10 seasons, or 1 annual prize) | −$5,000 |
| Less: Legal/compliance (Year 1 setup) | −$6,000 |
| **Net contribution to Sport Waikato programmes** | **~$41,641** |

At conservative scale (150 participants), net contribution is approximately **$8,000–$12,000** — modest but positive.
At optimistic scale (1,000 participants), net contribution exceeds **$120,000**.

The board paper should present the base scenario as the primary projection and note that break-even on operational costs (excluding legal setup) occurs at approximately **30–40 participants per season** — a low risk threshold that is achievable in a regional pilot.

---

### 10.6 What to say in the board paper

Suggested language for the market section:

> *"REAP is designed for the 150,000–200,000 New Zealanders aged 18–45 who are already somewhat active but inconsistent — people who have the intent to move daily but lack external accountability. This segment is motivated by competition, community, and structured challenges. They are already paying for products like F45, Hyrox entries, and Strava premium. REAP offers something those products do not: a daily stake.*
>
> *In Year 1, Sport Waikato is targeting 150–400 paying participants through organic community distribution via fitness networks, Parkrun communities, and workplace groups. This conservative projection represents a 0.1–0.3% capture rate of the serviceable addressable market and generates an estimated net contribution of $12,000–$42,000 to Sport Waikato's community health programmes after platform, prize, and compliance costs.*
>
> *Success at this stage is not measured by national scale — it is measured by whether participants return for a second season. Retention is the leading indicator of behaviour change, and the product's social mechanics (group leagues, public elimination boards, WhatsApp-native sharing) are designed to drive it."*

---

## 11. SPONSORSHIP, PARTNERSHIPS & DISTRIBUTION

The following section captures the commercial model discussed in the team session (8 April 2026) and structures it into actionable tiers, a stakeholder map, and the product features required to support it.

---

### 11.1 The core sponsorship insight

Leanne's framing from the session is the right starting point:

> *"What's interesting to a sponsor is access to people. If you can say I've got 18,000 monthly active users of this age group — they'll go, cool, I want to be in front of those people."*

REAP's commercial opportunity is not just subscription revenue. At scale, the product becomes a **channel to market** for brands that want access to a verified, fitness-engaged, 18–45 demographic. This is the same model that powers sports sponsorship, event naming rights, and loyalty programme partnerships — but delivered through a daily-active mobile product with richer behavioural data than a billboard or a newsletter.

The sponsorship model works at two distinct stages:

| Stage | Participant scale | Sponsorship type | Revenue model |
|---|---|---|---|
| **Early (Year 1–2)** | 150–500 | Prize sponsorship, newsletter mentions, corporate team sign-ups | Sponsor funds the spot prize in exchange for brand attribution. Low cost to REAP, eliminates prize funding compliance risk. |
| **Growth (Year 2–3)** | 500–5,000 | Sponsored group leagues, first-party data access, co-branded seasons | Brands pay for a named group, get email list from opt-in members, fund a branded prize. |
| **Scale (Year 3+)** | 5,000–18,000+ | Platform sponsorship, exclusive category partnerships, data licensing | Category exclusivity (e.g. one telco, one health insurer, one sports brand). |

---

### 11.2 Sponsor tier structure

**Tier 1 — Prize Sponsor (available now, Year 1)**

A brand funds the spot prize in exchange for:
- Named attribution: *"Season 3 spot prize proudly sponsored by Garmin NZ"*
- Logo in the prize announcement email sent to all participants
- One social post from REAP/Sport Waikato channels

**Cost to sponsor:** The $5,000 prize value they provide
**Value to sponsor:** Brand association with a verified fitness-engaged audience, email reach to all participants
**Value to REAP:** Prize funding is explicitly external — resolves legal compliance gap C5 from this audit entirely. The DIA's concern about entry fees funding the prize disappears when a named third party funds it.

**Tier 2 — Sponsored Group League (Year 2)**

A brand creates a named group within the REAP platform:
- *"NZ Breakers Survivors League"* / *"Spark Team Challenge"* / *"Gallagher Corporate Cup"*
- Participants opt in to join the branded group
- Opt-in includes consent to receive communications from the sponsor
- Sponsor funds a group-specific prize (e.g. signed jersey, tickets, product) for that group's last survivor
- Sponsor gets the opt-in email list from their group members

**Cost to sponsor:** Group prize value + a platform access fee (suggested $500–$2,000/season depending on group size)
**Value to sponsor:** First-party opted-in data from fitness-engaged consumers, brand association with daily active users, a fun earned-media story (*"Spark's last survivor wins..."*)
**Value to REAP:** Additional revenue stream, no incremental platform cost, organic participant acquisition through sponsor's own channels

**Tier 3 — Season Naming / Category Exclusivity (Year 3+)**

At 5,000+ participants:
- A brand names a season: *"The Garmin REAP Season"*
- Category exclusivity: only one fitness tracker brand, one telco, one health insurer, etc.
- Sponsor gets in-app banner placement, email headers, and first-party data access from all participants who opt in to sponsor communications at registration

**Cost to sponsor:** $10,000–$50,000/season depending on scale and category
**Value to sponsor:** Equivalent to a mid-tier sports sponsorship but with daily-active engagement data

---

### 11.3 RST distribution network — the national scale model

**What the team identified:** The Regional Sports Trust (RST) network is a ready-made distribution channel that is both mission-aligned and potentially financially incentivised. The PVO model (rolled out through RSTs with no revenue share) demonstrated that the network can drive national reach — but without financial incentive, uptake depends on goodwill.

**Proposed model: Commission-based RST distribution**

- Each RST that actively promotes REAP gets a **per-registration attribution fee** (e.g. $2–$3 per confirmed paid participant they refer)
- Attribution is tracked via unique RST invite links (same mechanic as the group league feature — a named link that tags the source)
- At 400 participants across 10 RSTs, this costs Sport Waikato $800–$1,200 in commission but could replace paid acquisition costs entirely
- RSTs are financially incentivised to promote REAP vs. competing programmes they are not remunerated for

**Why this works differently from PVO:**
PVO was given to RSTs as a resource. REAP has a revenue model. An RST that drives 50 sign-ups at $14.99/month generates $749/season for REAP — a $100–$150 commission on that is a rational incentive. At national scale, this becomes a self-funding distribution network.

**What to prepare for RST rollout:**
- A ready-to-use "partner pack": pre-written emails, social posts, poster templates, FAQ document
- A unique invite link per RST (trackable for commission)
- A simple RST admin view showing how many participants they've referred and their commission balance
- Clear messaging: *"REAP is a Sport Waikato Living Lab programme. Revenue supports community health. When you refer participants, you share in that."*

---

### 11.4 Distribution channels — prioritised

| Channel | Description | Cost | Priority |
|---|---|---|---|
| **RST network** | Commission-based referral via 17 NZ RSTs | ~$2–3/signup | **High — Year 1** |
| **Internal champions** | Sport Waikato staff and stakeholders (Veronica, Rob C, Heidi etc.) sharing on LinkedIn/Facebook | Zero | **High — pre-launch** |
| **Corporate teams** | Direct outreach to HR/wellness leads at mid-size NZ companies. Gallagher specifically named. | Low (staff time) | **High — Year 1** |
| **Local newsletters** | Hello Hamilton and equivalent free/paid community newsletters. Low cost, high local trust. | $0–$500/issue | **Medium — Year 1** |
| **Fitness community seeding** | F45 gyms, Parkrun NZ, Hyrox events, CrossFit affiliates. Give free season passes to coaches to play first. | Cost of ~10 free passes | **High — pre-launch** |
| **Radio network partnership** | A radio network runs their own REAP group for a month (e.g. October). Hosts share daily survival updates on air. | Negotiated (likely contra) | **Medium — Year 2** |
| **Influencer / ambassador** | Fitness-aligned NZ micro-influencers (10K–100K followers). Gifted season pass + commission on referrals. | Cost of passes + commission | **Medium — Year 2** |
| **Mayor's league** | Mayors of NZ cities compete in a public group. PR story, local media coverage. | Zero | **Low — Year 2 (novelty play)** |

---

### 11.5 The "concert pre-sale" model — sponsor-gated group access

Martin's concert pre-sale analogy is commercially astute. The model:

> *"As a Spark customer, you get exclusive early access to join the Spark REAP group — and your group has its own prize."*

This is a **B2B2C acquisition model**: REAP doesn't need to find the participant — the sponsor's existing customer base finds them. Spark (or Breakers, or any brand with an existing loyalty base) promotes the group to their customers, drives sign-ups, and pays REAP a platform fee.

This model:
- Reduces Sport Waikato's direct acquisition cost to near zero for those participants
- Gives sponsors a genuinely engaging loyalty activation (not a points scheme — an actual challenge)
- Creates natural media stories: *"Spark's last survivor wins..."*
- Generates opted-in first-party data for sponsors, which has significant commercial value as third-party cookies are deprecated

**What this requires in the product:** The group league feature (Section 9.3) is the technical foundation. A sponsor-gated group is simply a group with a sponsor logo, a branded prize, and an opt-in data consent checkbox at join. No additional infrastructure beyond what is already planned.

---

### 11.6 First-party data — the long-term asset

Leanne identified that sponsors primarily want **access to people and first-party data**. This is correct and increasingly valuable as digital advertising moves away from third-party tracking.

REAP will accumulate:
- Verified age, location, and activity level of every participant
- Daily engagement data (who is active, who churns, who completes)
- Device/wearable preferences (Apple Health, Garmin, Strava users)
- Social graph data (who is in groups with whom)

This is a richer behavioural dataset than most NZ sports or wellness organisations hold on their audiences.

**What must be in place before this is monetised:**

| Requirement | Status | Action needed |
|---|---|---|
| Privacy Act 2020 (NZ) compliance | Not verified in current build | Confirm data collection disclosures in Privacy Policy cover sponsor data sharing. Add explicit opt-in at group join for sponsor communications. |
| Explicit consent for sponsor data sharing | Not in current build | Add consent checkbox at group join: *"I consent to [Sponsor Name] contacting me about their products and services."* This must be opt-in, not pre-ticked. |
| Data processing agreement with sponsors | Not in current build | Sport Waikato legal must prepare a standard data sharing agreement for sponsors before any data is shared |
| Participant data deletion rights | `Privacy.tsx` references data rights but implementation unclear | Confirm Supabase RLS policies allow participant-initiated data deletion |

**Important:** Data sharing without explicit informed consent is a breach of the Privacy Act 2020. The sponsored group model is commercially sound but must be built with consent architecture from day one — not retrofitted.

---

### 11.7 Sponsorship revenue model — addition to board projections

The following extends the Section 10 financial projections to include sponsorship revenue:

| Revenue stream | Year 1 (base) | Year 2 (base) | Year 3 (base) |
|---|---|---|---|
| Subscription revenue (400/600/900 participants) | $59,960 | $89,940 | $134,910 |
| Prize sponsorship (1 sponsor × $5,000 prize funded externally) | $0 net (prize cost eliminated) | $0 net | $0 net |
| Sponsored group leagues (2 groups × $1,000 platform fee) | $0 | $2,000 | $6,000 |
| Corporate team packages (3 teams × $500 setup) | $1,500 | $3,000 | $6,000 |
| **Total gross revenue** | **$61,460** | **$94,940** | **$146,910** |

The prize sponsorship line is shown as $0 net because the sponsor funds the prize directly — the financial benefit is cost elimination (previously a $5,000 expense becomes $0 to Sport Waikato) rather than direct income.

At Year 3 optimistic scale (2,250 participants + 10+ sponsored groups), total revenue including sponsorship could exceed **$400,000 gross** — at which point category exclusivity partnerships and data licensing become material revenue lines worth modelling separately.

---

### 11.8 What must be built to support this model

| Feature | Required for | Build priority |
|---|---|---|
| Unique invite links per group / RST | RST commission tracking, sponsor group acquisition | **Launch blocker** |
| Sponsor attribution on group leaderboard | Tier 2 sponsor groups | Before Year 2 |
| Opt-in consent checkbox at group join | Privacy Act compliance for data sharing | Before any sponsor group goes live |
| RST admin view (referrals + commission balance) | RST distribution model | Before RST rollout |
| Sponsored prize display in app | Tier 1 prize sponsorship | Before first sponsored season |
| Admin dashboard: revenue by channel | Board reporting, RST commission calculation | High priority |

---

## 12. SIX THINKING HATS — SUMMARY

Full analysis is in `REAP-six-thinking-hats.md`. Key findings from each hat summarised below for the audit record.

**WHITE (Facts):** No direct NZ competitor. 7 months to launch. Core product features not yet built. Legal position unresolved. All financial projections unvalidated — no Season 1 data exists.

**RED (Emotions):** Trustees will feel genuine concern about charitable trust identity vs. dark aesthetic, and will ask immediately for legal sign-off and a vulnerable participant welfare plan. Target audience (18–45, inconsistent actives) will feel immediate FOMO and scepticism in roughly equal measure. Elimination at midnight will sting; how that notification is written will determine whether participants churn or re-enrol.

**BLACK (Risks):** The critical risk is gambling classification — the "at random" language in earlier drafts, if retained, creates a live regulatory exposure. The single-developer dependency is a launch-timeline risk. The misread of REAP as a similar word is a brand risk that scales with virality. Placeholder stats published pre-launch = Fair Trading Act exposure. No automated elimination = unsustainable manual operations at any meaningful scale.

**YELLOW (Benefits):** REAP generates real health outcomes even for eliminated participants (10 days of daily movement is 10 days they would not have otherwise had). The revenue model is genuinely attractive for a charitable trust. No NZ competitor owns this space. The RST network is a distribution asset no commercial competitor can replicate. The data generated is a unique research asset.

**GREEN (Opportunities):** Licensing the model to other RSTs nationally and internationally is the highest long-term value opportunity — larger than the subscription revenue itself. A formal mental health partnership (Lifeline, MHF) turns the elimination distress risk into a genuine asset. A teams/collective survival mechanic (Season 2+) deepens the social accountability dynamic significantly.

**BLUE (Governance):** Before public launch, the board must receive written legal sign-off (not just assurance), confirm the prize budget, and agree the welfare protocol and equity access commitment. A further board update when DIA guidance is received is non-negotiable. The board's role after launch is holding the line on mission alignment when commercial pressure arises.

---

## 13. FUTURE IMPLICATIONS AND ETHICAL SAFEGUARDS

*Addressing the "Facebook started with good intent" concern — proactively.*

Five structural risks emerge when REAP scales, none of which are present today but all of which should be documented now so the board can hold the line when they arrive.

**1. Gamification addiction**
REAP uses the same psychological mechanisms as addictive products (streaks, loss aversion, social comparison). The current design is appropriate. The risk is that future product decisions — pushed by engagement metrics — gradually amplify these mechanisms beyond what the health outcome requires. Safeguard: cap push notifications at one per day; do not add streak bonus mechanics that punish absence beyond the elimination rule; conduct an annual product ethics review.

**2. Elimination distress**
For a small proportion of participants — particularly those using REAP to build confidence in their own capacity to change — midnight elimination is a high-stakes psychological event. Safeguard: all elimination notifications must include a Season 2 pathway and a mental health signpost (1737). A formal partnership with a NZ mental health organisation should be pursued before Year 2. Document that this risk was considered.

**3. Equity and access drift**
$14.99/month excludes participants on low incomes — who have the worst health outcomes and are the most mission-relevant audience. As REAP scales and revenue targets grow, this exclusion will become more entrenched. Safeguard: the board should commit, before launch, to developing an equitable access pathway (scholarship, GP referral, subsidised tier) by Season 3. This commitment should be in writing.

**4. Data exploitation**
REAP's participant activity data grows more valuable as the user base scales. Sponsor pressure to access data beyond what participants consented to will increase proportionally. Safeguard: no sponsor data access should be permitted beyond explicit per-participant opt-in consent. A privacy-by-design audit before Year 2 launch. The board should set a policy that participant data will not be sold or licensed in de-identified form without a specific board resolution.

**5. Mission drift under revenue pressure**
If REAP becomes a material portion of Sport Waikato's revenue, the organisation will face pressure — internal and external — to optimise it commercially. This is how well-intentioned products become something their founders would not recognise. Safeguard: the board should establish an annual review of REAP's contribution to the overall revenue mix, and a principle that REAP will never be the majority revenue source for Sport Waikato. The Living Lab framing (pilot, experiment, innovation) is the correct organisational identity for the product — preserving that identity is a governance function, not a marketing one.

---

## 14. LAWYER SUMMARY (see full document: `REAP-lawyer-summary.md`)

The following is the action list for Shelley. Full briefing document with all supporting context is in `REAP-lawyer-summary.md`.

**Critical decisions needed from Shelley (in order):**

1. **Route decision:** Choose Option A (non-random, skill/participation-based prize selection — cleanest legal position) or Option B (random draw from survivor pool — engages spot prize competition provisions under the Gambling (Non-gambling Activities) Regulations 2013). Everything else flows from this.
2. **Redraft Rules and Terms:** Once route is decided, Rules.tsx "at random" language and Terms.tsx Section 6 must be rewritten consistently. Prize funding separation clause to be approved.
3. **Consumer law review of Stripe subscription:** The current recurring billing structure vs. "season pass" framing in the UI may breach Fair Trading Act 1986. Shelley to advise.
4. **Privacy Act 2020 — sponsor data sharing consent model:** The sponsored group opt-in model (participants consent to sponsor contact at group join) requires her approval before any sponsor group is activated.
5. **DIA informal enquiry:** Draft five questions have been prepared (in `REAP-lawyer-summary.md`). Shelley to review, adjust, and lead or co-lead the DIA enquiry.

**Hard deadline:** Legal sign-off required by **31 July 2026** for a November 1 launch. DIA response window is 4–6 weeks — enquiry must be submitted no later than **15 June 2026**.

---

## 15. MASTER DOCUMENT INDEX

All documents in the REAP project file suite as of 8 April 2026:

| File | Contents | Use |
|---|---|---|
| `survive-the-reap-compliance-audit.md` | Full legal, product, marketing, and strategic audit — Sections 1–15 | Master reference document |
| `REAP-board-report.md` | Formal 15-section board report for trustees | Board meeting presentation |
| `REAP-airtable-action-plan.json` | 52-task action plan with owners, due dates, dependencies, and priorities | Import into Airtable for project management |
| `REAP-website-content.md` | Complete copy for all 10 website pages | Handoff to developer/designer |
| `REAP-six-thinking-hats.md` | Full internal Six Thinking Hats analysis | Internal strategy/board preparation |
| `REAP-lawyer-summary.md` | Legal briefing for Shelley — product description, issues, questions for DIA, sign-off checklist, timeline | Send to lawyer |

**Recommended reading order for a new stakeholder:**
1. `REAP-board-report.md` — highest level, full picture
2. `survive-the-reap-compliance-audit.md` — detail behind the board report
3. `REAP-six-thinking-hats.md` — honest internal risk/opportunity assessment
4. `REAP-lawyer-summary.md` — if you are involved in legal sign-off
5. `REAP-airtable-action-plan.json` — if you are managing the project timeline
6. `REAP-website-content.md` — if you are building or reviewing the website

## SOURCES

- [Gambling (Non-gambling Activities) Regulations 2013 — explanatory note](https://legislation.govt.nz/regulation/public/2013/0392/10.0/DLM5618520.html)
- [DIA Gambling Legislation & Regulations](https://www.dia.govt.nz/Gambling-legislation-regulations)
- [DIA Prize Competition Game Rules](https://www.dia.govt.nz/diawebsite.nsf/wpg_URL/Services-Casino-and-Non-Casino-Gaming-Prize-Competition-Game-Rules)
- [Gambling Act 2003 (NZLII consolidated)](https://www.nzlii.org/nz/legis/consol_act/ga200378/)
