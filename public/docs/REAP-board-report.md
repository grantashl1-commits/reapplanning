# SURVIVE THE REAP (REAP)
## Board Report — Sport Waikato Trustees
### Prepared by: Leanne [CEO], Sport Waikato
### Date: April 2026
### Classification: Confidential — Board Use Only

---

## CONTENTS

1. Executive Summary
2. What is REAP?
3. The Opportunity
4. Why Now?
5. The Product
6. Primary Value Proposition
7. Target Audience
8. Go-to-Market Strategy
9. Revenue Model
10. Legal Compliance Status
11. Success Metrics
12. Risk Assessment — Six Thinking Hats
13. Future Implications and Ethical Safeguards
14. Recommendation
15. Appendices

---

## 1. EXECUTIVE SUMMARY

Sport Waikato proposes to publicly launch REAP — Survive the Reap — on 1 November 2026 as its first direct-to-consumer digital product. REAP is a 30-day daily movement survival game. Participants pay $14.99 per month to join. Miss 21 minutes of Zone 2 movement in a single day and you are eliminated. Survivors enter a spot prize draw.

The product is built on proven behavioural science: loss aversion, social accountability, and structured simplicity. The $14.99 subscription functions as a commitment device — participants are financially and socially invested in staying active. This is not a wellbeing app. It is a survival game that produces a wellbeing outcome.

REAP is currently in late development, built on React, TypeScript, Supabase, and Stripe. An October 2026 soft launch with invited New Zealand celebrities and media personalities will precede the public launch. Year 1 revenue projections range from $26,880 (conservative: 150 participants) to $71,952 (optimistic: 400 participants) in subscription revenue alone, with additional sponsorship and corporate league revenue available from Year 1.

Several legal compliance items require resolution before launch, primarily around the prize draw structure and Gambling Act implications. These are being actively addressed with Sport Waikato's legal counsel. None are obstacles to proceeding with development; all can be resolved within the timeframe.

The board is asked to approve REAP proceeding to public launch on 1 November 2026, subject to conditions set out in Section 14 of this report.

---

## 2. WHAT IS REAP?

REAP — Survive the Reap — is a 30-day daily movement survival game. It is not a fitness tracker. It is not a wellbeing app. It is a game where the stakes are real: miss your daily movement and you are eliminated.

The mechanism is simple. Every day, participants must complete 21 minutes of Zone 2 cardiovascular movement — the intensity band associated with aerobic base development and sustainable long-term health. Activity is logged via connected devices (Apple Health, Garmin Connect, Strava, Google Fit, Fitbit) or manual entry. At 23:59 NZST each night, an automated system checks every active participant's log. Anyone who has not reached 21 minutes is eliminated from that season. Eliminated participants cannot re-enter until the next season begins, with the exception of structured Redemption Day events.

Survivors are displayed on a live seasonal board. As the month progresses and the participant pool shrinks, the social stakes increase. Survivors can join group leagues — corporate teams, RST communities, friend groups — with private leaderboards. Spot prize draws are held throughout the season for active, paid survivors.

At its core, REAP is a commitment device dressed as a game. The $14.99 subscription is not primarily a prize entry fee. It is a financial stake that makes daily movement matter. When people have something to lose, they show up.

Sport Waikato describes REAP as a "killer movement app" — a product that uses the mechanics of survival gaming to drive daily physical activity at population scale. The tone is deliberately playful and dark, not gory or negative. The creative direction can be summarised as: *the grim reaper comes for your streak, not your soul.*

---

## 3. THE OPPORTUNITY

### Market Context

New Zealand's physical inactivity problem is well-documented. Approximately 1.8 million New Zealand adults are insufficiently active (less than 150 minutes per week of moderate activity). Sport NZ and the Ministry of Health have invested significantly in behaviour change programmes, with limited sustained impact on population-level metrics.

Digital behaviour change products — subscription fitness apps, challenge platforms, habit trackers — have demonstrated strong commercial demand but poor long-term adherence. The gap in the market is not another motivational app. It is a product that uses structured consequence to change behaviour.

### Market Sizing

| Segment | Definition | Estimated Size |
|---------|-----------|---------------|
| Total Addressable Market (TAM) | NZ adults aged 18–65 who are insufficiently active and digitally engaged | ~1.1 million |
| Serviceable Addressable Market (SAM) | NZ adults who have previously engaged with a fitness challenge, app, or subscription; smartphone-enabled; disposable income for $14.99/month | ~150,000–200,000 |
| Serviceable Obtainable Market (SOM) | Realistic Year 1 participant range across all acquisition channels | 150–400 |

The SOM figure of 150–400 for Year 1 is deliberately conservative. REAP's go-to-market relies on organic and partner-driven acquisition, not paid advertising at scale. The target is to demonstrate product-market fit, build the RST distribution model, and generate meaningful revenue within the first two seasons before scaling into Year 2.

### Three-Scenario Revenue Projection (Year 1 — Subscriptions Only)

| Scenario | Participants | Monthly Revenue | Annual Revenue (2 seasons) |
|----------|-------------|----------------|--------------------------|
| Conservative | 150 | $2,249 | $26,880 |
| Base Case | 250 | $3,748 | $44,970 |
| Optimistic | 400 | $5,996 | $71,952 |

Notes: Annual figures assume two 30-day seasons (November and December 2026) plus carryover subscriptions. Does not include sponsorship revenue, corporate league fees, or RST commission offsets. Season 2 (December) acquisition costs are expected to be significantly lower than Season 1 due to word-of-mouth and elimination-card sharing from Season 1 participants.

---

## 4. WHY NOW?

Four factors converge in late 2026 to make this the right moment for REAP's launch.

**The Halloween launch hook.** REAP's survival-game aesthetic is a natural fit for a Halloween launch moment. The campaign builds through October, peaks on October 31 ("The Reaping begins tomorrow"), and opens public registration on November 1. This is not a manufactured marketing hook — it is a genuine brand fit that reduces the cost of generating media attention and organic social sharing. No competitor is positioned to use this moment the way REAP can.

**Fitness challenge culture is mainstream.** Since 2020, participation in structured fitness challenges — Dry July, 75 Hard, Couch to 5K, January running challenges — has grown substantially among mainstream New Zealand adults, not just fitness enthusiasts. The audience for REAP already exists and is accustomed to the format. REAP adds the element that all other challenges lack: elimination. Something actually happens if you fail.

**No competitor owns daily mental consistency.** The fitness app market is saturated with activity trackers, workout programmes, and social fitness platforms. None of them have successfully built a product around daily non-negotiable movement with real consequences for failure. The closest analogue, Duolingo's streak system, demonstrates the power of the mechanic — but Duolingo is not a movement product. REAP occupies uncontested territory.

**Sport Waikato's Living Lab mandate.** The Living Lab initiative positions Sport Waikato to develop and test scalable behaviour change innovations. REAP is a direct expression of that mandate — a market-validated, data-generating product that could produce publishable population health research while sustaining itself commercially. The board has an opportunity to be first movers in a space that is likely to attract significant attention from Sport NZ and other regional trusts within 24 months.

---

## 5. THE PRODUCT

### How It Works

**Registration.** Participants register via the REAP web application, complete a short onboarding survey (baseline activity levels, demographic data for research purposes), connect their activity tracking device, and pay $14.99 via Stripe to confirm their season entry. Registration is open until midnight on Day 1 of the season.

**Daily Movement.** Each day, participants must record 21 minutes of Zone 2 cardiovascular movement. Zone 2 is defined as moderate aerobic intensity — roughly 60–70% of maximum heart rate, corresponding to an effort level where conversation is possible but laboured. Walking briskly, cycling, swimming, and light jogging all qualify. The threshold is deliberately accessible: 21 minutes is achievable by almost any adult, on any day, in almost any circumstance.

**The Midnight Elimination.** At 23:59 NZST each night, an automated cron job evaluates every active participant's activity log. Participants who have not reached 21 minutes of qualifying movement are eliminated. Elimination is immediate, logged, and permanent for that season. Eliminated participants receive a notification and a shareable elimination card ("I survived X days of REAP") with a Season 2 call to action.

**The Survival Board.** Active participants are displayed on a live seasonal leaderboard showing days survived. As the season progresses and the pool shrinks, the social stakes intensify. Participants can see who is still alive and for how long.

**Group Leagues.** Participants can join or create group leagues — private leaderboards for corporate teams, RST communities, sports clubs, or friend groups. Groups are created with a unique invite link. Sponsors can create branded group leagues with their own naming and basic branding.

**Spot Prize Draw.** Throughout the season, spot prize draws are held for active, paid survivors. The draw is restricted to participants who are currently active (not eliminated) and whose payment has been confirmed. Prize values and frequency are determined by sponsor agreements and Sport Waikato's prize fund.

**Season Close.** At the end of the 30-day season, the final survivors are acknowledged on the board. Season 2 registration opens immediately. Participant data is exported for Sport Waikato's research and funder reporting.

---

## 6. PRIMARY VALUE PROPOSITION

REAP's primary value proposition rests on three interlocking psychological mechanisms that are well-established in behavioural science literature.

**Loss Aversion.** Prospect theory (Kahneman and Tversky, 1979) demonstrates that losses are felt approximately twice as powerfully as equivalent gains. The $14.99 subscription is not a purchase of a prize ticket — it is a financial stake that participants stand to "lose" if they fail to show up. The daily question is not "do I want to exercise today?" but "do I want to lose my $14.99 and my streak?" This reframe is the core of what makes REAP behaviourally different from every other fitness app on the market.

**Social Accountability.** The survival board, group leagues, and shareable daily cards create visible, public stakes. Participants are not just accountable to themselves — they are accountable to everyone who can see the board. Being eliminated in front of colleagues in a corporate league, or friends in a shared group, is a materially stronger consequence than simply missing a workout. Social accountability is one of the most robust predictors of sustained behaviour change in the literature.

**Structured Simplicity.** One rule. Every day. 21 minutes. REAP eliminates decision fatigue entirely. There is no programme to follow, no workout to choose, no weekly targets to negotiate. The daily binary — did you move for 21 minutes or not? — is cognitively simple in a way that sustained behaviour change programmes rarely achieve. Simplicity reduces drop-off at the point of decision.

The $14.99 subscription is therefore best understood as a commitment device: a financial stake that activates loss aversion and funds the prize draw that creates the social reward. It is not primarily a revenue mechanism (though it is also that). It is a behaviour change tool.

Participants who understand this framing find it compelling. The pitch is not "pay us $14.99 for the chance to win a prize." The pitch is: "put $14.99 on the line, move every day, and stay alive. The prize is that you changed."

---

## 7. TARGET AUDIENCE

REAP's target audience divides into three distinct segments, each with different motivations and acquisition pathways.

### Tier 1: Inconsistent Actives (Primary)

**Who they are.** Adults aged 25–50 who exercise sporadically — perhaps 1–3 times per week — and genuinely want to do more, but have not been able to sustain a daily habit. They may have gym memberships they underuse, running shoes they do not wear, and a genuine desire to be more active. They are not sedentary by choice; they are sedentary by default.

**Why REAP works for them.** Loss aversion is most powerful for this group. They already value activity — they just do not prioritise it consistently. The $14.99 stake and the daily elimination create the external accountability structure they lack internally. REAP does not need to motivate them; it needs to make not showing up cost more than showing up.

**Acquisition pathway.** RST partner networks, corporate group leagues, social sharing from friends and colleagues, organic digital search.

### Tier 2: Already Active Socials (Acquisition Engine)

**Who they are.** Adults who are already regularly active — gym-goers, runners, cyclists, swimmers — and are socially embedded in fitness communities. REAP is easy for them mechanically, but they join for the social layer: competing in a group league, sharing their survival card, inviting friends.

**Why REAP works for them.** The social accountability and competitive mechanics are the primary draw. They will survive easily but bring others with them. This segment is REAP's acquisition engine — their sharing and league invitations reach Tier 1 and Tier 3 audiences that REAP cannot reach directly.

**Acquisition pathway.** Fitness influencer partnerships, Strava/Garmin community integration, corporate groups, organic social.

### Tier 3: Aspiring Inactives (Long-Term Mission Audience)

**Who they are.** Adults who are largely inactive and know they need to change but have not found a programme that works. They may have tried fitness apps, gym memberships, and challenge programmes without sustained success. They are the audience that Sport Waikato's mission most directly targets.

**Why REAP works for them.** The 21-minute minimum is genuinely achievable. The cost is low enough to try. The social visibility is motivating. This group will have higher elimination rates — but even 10 days of daily movement represents a meaningful behaviour change for someone who was doing none. The data from this segment is the most valuable for Sport Waikato's research outcomes.

**Acquisition pathway.** GP referral networks (Year 2), community sport organisations, RST grassroots programmes, free season scholarships (Year 2).

---

## 8. GO-TO-MARKET STRATEGY

REAP's go-to-market is structured in four sequential phases, each building on the last.

### Phase 1: October Soft Launch — Celebrity and Media Cohort (1–31 October 2026)

Ten to twenty invited New Zealand celebrities, media personalities, and fitness influencers participate in an invite-only October season. Targets include presenters from 7 Sharp, talent from MediaWorks/The Breeze, Radio Hauraki personalities, and NZ fitness micro-influencers with engaged followings in the 5,000–50,000 range.

The objective of Phase 1 is threefold: (1) generate authentic content from recognisable NZ voices before the public launch; (2) stress-test the product with real participants ahead of the public launch; and (3) build waitlist demand by creating visible curiosity. Celebrity participants are gifted their season pass. They are briefed on content they can share and given latitude to be authentic — including about being eliminated.

The waitlist landing page opens publicly on 1 October 2026, capturing email sign-ups throughout October.

### Phase 2: Halloween Campaign Peak (28–31 October 2026)

The Halloween campaign represents REAP's primary pre-launch media moment. Creative assets — social content, email campaign, landing page treatment, and a short video teaser — peak across October 28–31. The central message: "The Reaping begins November 1. Don't get cut."

Celebrity participants are encouraged to post Halloween-themed survival content. The waitlist receives a final "last chance" email sequence on October 30–31. The landing page transitions from waitlist capture to a countdown timer.

### Phase 3: Public Launch — 1 November 2026

Public registration opens at midnight NZST on 1 November 2026. The waitlist email sequence converts to a launch notification with direct registration link. Social media launch posts go live simultaneously. The live participant counter on the landing page begins incrementing as sign-ups convert.

The first midnight elimination run occurs at 23:59 on November 1, making Day 1 a live event — participants who did not move on Day 1 are eliminated immediately, generating shareable elimination cards and social noise.

### Phase 4: League and Group Viral Loop + RST National Distribution

The group league feature activates the primary viral loop. Corporate groups, RST communities, and friend groups generate invitations. Each invitation is a warm referral — significantly cheaper to convert than a cold digital lead. RST partners across New Zealand receive their partner packs in October, enabling them to run regional campaigns through their own channels at no cost to Sport Waikato.

The Friday 13 November event — timed to the 13-day survival mark — provides a second media moment within Season 1: a live leaderboard reveal, group run event, or social campaign marking the first major elimination cull.

Season 2 (December 2026) waitlist opens in mid-November, capturing eliminated Season 1 participants at their highest point of motivation to re-enter.

---

## 9. REVENUE MODEL

REAP's revenue model has three streams. Year 1 is primarily subscription-driven. Sponsorship and corporate revenue are available from Season 1 but are not included in the conservative base case.

### Stream 1: Monthly Subscriptions

$14.99 per participant per month. All participants pay regardless of survival status. Subscription continues month-to-month until cancelled. Participants who are eliminated retain their subscription until they cancel, giving them access to Season 2 registration.

### Stream 2: Sponsorship

Two sponsorship mechanisms are available:

**Prize Sponsorship.** A single major sponsor (target: Garmin NZ or equivalent) funds or supplies the season's prize pool in exchange for brand placement within the platform, mention in prize draw notifications, and access to opted-in participant data. Estimated value: $5,000–$20,000 per season.

**Sponsored Group Leagues.** Organisations (corporates, iwi, councils) pay a flat fee to create a named, branded group league. Pricing: $5,000–$25,000 per season depending on group size and data access. In return: group branding, end-of-season activity participation report, and co-branded marketing.

### Stream 3: RST Commission Model

Regional Sport Trusts who generate confirmed paid sign-ups via their unique referral links receive a commission per conversion. Proposed rate: $3 per confirmed paid participant. RSTs are incentivised to promote REAP to their communities; Sport Waikato benefits from national distribution without a marketing spend.

### Three-Scenario Revenue Summary

| Scenario | Participants (per season) | Subscription Revenue (2 seasons) | + Prize Sponsorship | + 1 Sponsored Group | Total Year 1 |
|----------|--------------------------|----------------------------------|--------------------|--------------------|--------------|
| Conservative | 150 | $26,880 | $5,000 | $0 | $31,880 |
| Base Case | 250 | $44,970 | $10,000 | $7,500 | $62,470 |
| Optimistic | 400 | $71,952 | $15,000 | $15,000 | $101,952 |

Note: RST commission payments reduce the effective revenue per RST-referred participant to approximately $11.99 ($14.99 minus $3 commission). The above figures do not deduct RST commissions. Development costs are sunk; marginal operating costs per additional participant are low (primarily Stripe transaction fees at approximately 2.5–3% of revenue).

---

## 10. LEGAL COMPLIANCE STATUS

**Overall Assessment: AT RISK — but manageable and fixable within the development timeline.**

The board should be aware that REAP's current state has several legal compliance gaps that require resolution before public launch. None of these are obstacles to proceeding with development. All are being actively addressed and are resolvable within the available timeframe (April–October 2026). They are disclosed here in full so that the board can make an informed decision.

### 10.1 Prize Draw Structure — Gambling Act Implications

**Issue.** The current Terms and Rules contain conflicting language. Some sections describe the prize draw as being "at random" (a game of chance, regulated under the Gambling Act 2003). Other sections imply that survival — a skill-based outcome — determines eligibility. This inconsistency creates legal uncertainty about whether REAP requires a gambling licence.

**Proposed resolution.** The intended structure — survival gate (skill-based) plus random draw among eligible survivors — is likely to fall within the exempt "promotional competition" category under the Gambling Act, provided the skill element is genuine and the prize structure is properly documented. Legal counsel (Shelley) is engaged and will provide a formal opinion. DIA informal guidance will be sought. Terms and Rules will be revised to eliminate the inconsistency before launch.

**Timeline.** Terms revision: June 2026. DIA guidance: July 2026. Shelley sign-off: September 2026.

### 10.2 Compromised Credentials in Public Repository

**Issue.** Administrative passwords and/or API keys have been identified in the public GitHub repository. This is an active security risk.

**Proposed resolution.** Immediate rotation of all affected credentials (Supabase service role key, Stripe secret key, admin account passwords). Audit of git history for additional secrets. Implementation of GitHub secret scanning and .gitignore rules to prevent recurrence.

**Timeline.** Credential rotation: within 7 days of board approval.

### 10.3 Stripe Billing Configuration

**Issue.** The Stripe integration may be configured as a one-time payment rather than a recurring monthly subscription. Charging participants incorrectly is a Fair Trading Act 1986 issue.

**Proposed resolution.** Correct the Stripe product/price configuration to accurately reflect the recurring billing model. Ensure the subscription description shown at checkout matches the Terms.

**Timeline.** Resolved as part of Stripe webhook build: July 2026.

### 10.4 Age Verification

**Issue.** Age verification (18+) is currently enforced client-side only, which is trivially bypassed.

**Proposed resolution.** Implement server-side age gate in the Supabase create-checkout edge function. Validate date of birth against participant profile before creating a Stripe session.

**Timeline.** July 2026.

### 10.5 Privacy Act 2020 — Sponsor Data Sharing

**Issue.** The data flows between Sport Waikato, participants, and sponsors require review under the Privacy Act 2020. Specifically: what participant data sponsors can access, on what legal basis, and whether general Terms consent is sufficient.

**Proposed resolution.** Privacy Act compliance review by Shelley. Sponsor data processing agreement template prepared. Explicit opt-in consent checkbox added to the group join flow.

**Timeline.** August 2026.

### 10.6 Prize Funding Separation

**Issue.** The Terms do not disclose how prize funds are held or managed. Sport Waikato's charitable trust status may require prize funding to be quarantined separately from operating revenue.

**Proposed resolution.** Shelley to advise on prize fund treatment. Terms to be updated with a clear disclosure. Finance team to confirm appropriate accounting treatment.

**Timeline.** July 2026, in line with Terms revision.

### Summary Table

| Item | Risk Level | Owner | Target Resolution |
|------|-----------|-------|------------------|
| At-random vs skill-based contradiction | Critical | Shelley/Legal | June 2026 |
| Compromised credentials | Critical (immediate) | Ashleigh (Dev) | April 2026 |
| Stripe billing configuration | High | Ashleigh (Dev) | July 2026 |
| Server-side age verification | High | Ashleigh (Dev) | July 2026 |
| Privacy Act / sponsor data | High | Shelley/Legal | August 2026 |
| Prize funding separation | High | Shelley/Finance | July 2026 |
| DIA informal guidance | Critical | Shelley/Legal | July 2026 |
| Final legal sign-off (Shelley) | Critical | Shelley/Legal | September 2026 |

---

## 11. SUCCESS METRICS

REAP's success will be measured against three priority levels, in order:

### Primary: Participant Retention and Behaviour Change

The primary measure of REAP's success is not revenue — it is whether participants move more because of REAP. This is Sport Waikato's mission expressed in a commercial product.

Key metrics:
- **Survival rate at Day 7, Day 14, Day 21, Day 28.** What percentage of participants are still active at each milestone? A high survival rate indicates the product is motivating sustained daily movement. A very low survival rate (>80% eliminated by Day 7) may indicate the elimination threshold is too punishing for the target audience.
- **Daily activity minutes (mean and median) for active participants.** Are participants doing the minimum 21 minutes, or are they doing more?
- **Baseline vs. in-season activity comparison.** Using onboarding survey data, are participants who were previously inactive showing a measurable increase in activity frequency?
- **Season-to-season retention.** What percentage of Season 1 participants sign up for Season 2? This is the strongest indicator of the product's sustained behaviour change value.

### Secondary: WHO Physical Activity Compliance

The World Health Organisation recommends 150 minutes of moderate-intensity activity per week for adults. REAP's 21-minute daily minimum equates to 147 minutes per week — just under the WHO threshold on a 7-day basis, and above it if participants move on rest days as well.

Key metric: **Percentage of REAP participants meeting WHO weekly activity guidelines during their active season**, compared to their baseline.

### Tertiary: Revenue

Revenue metrics are important for organisational sustainability but are explicitly tertiary to mission outcomes. REAP should not be optimised for revenue at the expense of the behaviour change outcomes that justify its existence as a Sport Waikato product.

Key metrics:
- Monthly Recurring Revenue (MRR)
- Season-on-season subscriber growth
- Net Revenue Retention (MRR at end of Season 2 / MRR at end of Season 1)
- Sponsorship revenue secured

---

## 12. RISK ASSESSMENT — SIX THINKING HATS

The following risk and opportunity assessment uses the Six Thinking Hats framework (de Bono) to structure the board's consideration of REAP from multiple perspectives.

---

### White Hat — The Facts

What we know:

- REAP is approximately 7 months from its planned public launch date (November 1, 2026).
- The product is in active development. Core architecture (React/TypeScript/Supabase/Stripe) is functional. Critical features not yet built: midnight elimination cron job, Stripe webhook, prize draw backend, group/league system, shareable survival cards.
- Development resource is currently one developer (Ashleigh). No redundancy in the development team.
- Legal compliance gaps have been identified and are being addressed but are not yet resolved.
- Sport NZ and Ministry of Health report approximately 1.8 million NZ adults are insufficiently active.
- The NZ subscription fitness app market is growing. Comparable products (Zombies Run, Strava Premium, Nike Run Club) demonstrate willingness to pay for digital fitness products.
- No direct competitor currently operates a survival-game elimination mechanic in the NZ market.
- Sport Waikato does not currently generate direct-to-consumer subscription revenue at scale.

What we do not yet know:

- Whether DIA will confirm REAP's prize structure as exempt from Gambling Act licensing.
- Whether the $14.99 price point represents optimal conversion/value balance.
- Whether the celebrity/media cohort approach will generate sufficient organic reach in October.
- Whether corporate sponsors (Gallagher, NZ Breakers, telcos) will commit before launch.

---

### Red Hat — Intuitions and Emotional Responses

**Concerns the board is likely to feel, even if not easily articulated:**

*"Is this appropriate for a charitable trust?"* The combination of a commercial subscription product, a survival-game aesthetic, and a prize draw may feel inconsistent with Sport Waikato's image as a community-focused public health organisation. This concern is understandable and worth voicing directly. The counter-position is that Sport Waikato's mission requires sustainable revenue; a commercially viable product that also generates population health outcomes is precisely what the Living Lab exists to produce.

*"What if someone gets hurt?"* REAP's 21-minute daily movement requirement is designed to be achievable and safe. However, some participants — particularly sedentary adults in the Tier 3 audience — may push themselves too hard to avoid elimination, potentially causing injury. The product does not currently include safety disclaimers or injury risk framing. This should be addressed in the Terms and onboarding.

*"The name feels risky."* REAP reads clearly in most contexts, but in certain fonts and at small sizes, the proximity to a similar word creates reputational risk. This concern is legitimate and should be resolved by a deliberate name decision (keep with appropriate design guardrails, or rename) before the product goes public.

*"What if it fails?"* Financial risk is real but bounded. Development costs are largely sunk. The primary risk of failure is reputational — a public launch that does not gain traction reflects on Sport Waikato. This risk is manageable through a phased approach: the October soft launch tests the product before the public launch, and early Season 1 numbers are visible before Season 2 investment is committed.

---

### Black Hat — Risks and Cautions

**1. Gambling Act Legal Risk**
If DIA determines that REAP's prize draw constitutes a game of chance requiring a licence, and Sport Waikato proceeds without one, the organisation faces potential prosecution and significant reputational damage. Mitigation: resolve the Terms inconsistency, seek DIA guidance, and do not launch until written legal sign-off is obtained from Shelley.

**2. Single Developer Dependency**
REAP's entire technical build depends on one developer. Illness, resignation, or burnout between now and November 1 would materially threaten the launch timeline. Mitigation: document the codebase and build process thoroughly; identify a potential backup developer resource; prioritise the most critical build items first.

**3. Data Security**
The compromised credentials incident demonstrates that security practices need improvement. A data breach involving participant payment or activity data post-launch would be catastrophic for trust and potentially subject Sport Waikato to Privacy Act enforcement action. Mitigation: immediate credential rotation, ongoing security review, consider a pre-launch penetration test.

**4. Low Participation / Reputational Risk**
If Season 1 attracts fewer than 50 participants, the survival board looks empty, the social mechanic fails to activate, and the narrative becomes "Sport Waikato tried and failed." Mitigation: the October celebrity cohort must be secured; RST partner packs distributed early; launch with a committed base of 50+ before opening the public board.

**5. Elimination Distress**
A small percentage of participants may experience disproportionate distress at elimination — particularly those for whom the daily movement was serving a mental health function, or those with competitive personalities who are eliminated early. Mitigation: frame elimination positively in all communications; provide a clear Season 2 pathway; include mental health signposting in the onboarding and elimination communications.

**6. Charitable Trust Mission Drift**
If REAP scales significantly, it could come to represent a material portion of Sport Waikato's revenue. At that point, decisions about REAP's product direction could conflict with the organisation's charitable mission (e.g., pressure to maximise revenue may conflict with making the product accessible to lower-income participants). Mitigation: the board should review REAP's contribution to the overall revenue mix at the 12-month mark, and establish a principle that REAP will not be optimised for revenue at the expense of accessibility.

**7. Fair Trading Act — Cancellation**
If the cancellation flow is not straightforward and self-service, Sport Waikato is exposed to Fair Trading Act complaints. This is a build priority, not an optional feature.

---

### Yellow Hat — Benefits and Opportunities

**1. Revenue Sustainability**
REAP creates a recurring, scalable revenue stream that does not depend on grant cycles or funder relationships. Even at the conservative 150-participant projection, REAP generates meaningful incremental revenue. At 1,000+ participants (Year 3), it could be a material contributor to Sport Waikato's operating budget.

**2. Population Health Data**
REAP's onboarding survey and season activity data will generate a unique dataset: daily movement compliance rates for a population-level sample of NZ adults, with before/after baselines. This data has research value for Sport NZ, the Ministry of Health, and academic partners. It also strengthens Sport Waikato's case for continued funding.

**3. National Distribution Model**
The RST referral model means REAP can be distributed nationally through existing trusted community networks at minimal incremental cost to Sport Waikato. If REAP works in Waikato, the distribution infrastructure to expand nationally already exists through the RST network.

**4. Corporate Wellness Market**
New Zealand organisations spend significant amounts on employee wellness programmes with limited measurable outcomes. REAP offers a novel, low-cost, measurable alternative. A single corporate sponsor of a 50-person group league at $10,000 is equivalent to ~670 individual subscriptions. This market has not been tapped by any comparable product.

**5. Brand Differentiation for Sport Waikato**
REAP positions Sport Waikato as an innovation leader in the sport and recreation sector — not just a delivery vehicle for national programmes, but a builder of original products. This differentiation has value in funder relationships, talent attraction, and sector leadership.

**6. Viral Mechanics**
The elimination card sharing mechanic means that every eliminated participant is a potential acquisition channel. If a participant shares their "I survived 14 days" card to their 300 Instagram followers, and 5% of followers convert to waitlist sign-ups, each elimination generates 15 warm leads at zero cost. At scale, this is a powerful acquisition engine.

---

### Green Hat — Creative Possibilities

**1. Living Lab Research Publication**
Season 1 data could form the basis of a peer-reviewed article in a sport or public health journal, authored by Sport Waikato researchers in partnership with a university. This would be the first published research on elimination-mechanic behaviour change at population scale.

**2. Community Sport Integration**
REAP seasons could be timed to align with community sport seasons (winter sport, summer sport), with RST-created group leagues providing a digital community for sport club members during off-season periods.

**3. Accessible Entry Points**
A "free tier" or "scholarship season" for lower-income or high-need participants (e.g., GP referral pathway, community sport participant pathway) could address the equity concern while generating a differentiated dataset (high-need vs general population outcomes).

**4. International Expansion**
The REAP product architecture is not NZ-specific. Australia, UK, and Canada have comparable regulatory environments and sport/recreation infrastructure. The RST distribution model could be replicated through Sport Australia, StreetGames UK, or equivalent organisations within 2–3 years.

**5. Seasonal Theming**
Each season could carry a distinct theme — Halloween for November, Summer Challenge for January, Matariki Challenge for June — creating recurring cultural moments that keep the product fresh and give media consistent hooks.

---

### Blue Hat — Process and Governance

**What the board needs to decide today:**

1. Approve or decline proceeding to public launch November 2026, subject to the conditions in Section 14.
2. Confirm the board's risk appetite for the legal compliance items — specifically, whether the board is comfortable proceeding on the basis that Shelley will provide written sign-off before launch.
3. Note the compromised credentials issue and confirm that credential rotation is treated as immediate priority.
4. Confirm whether a further board update is required at the point of DIA guidance receipt (recommended: yes).

**What governance structures are needed:**

- Legal sign-off process: Shelley's written approval must be obtained and filed before launch. This is a board-level condition, not an operational decision.
- Board reporting cadence: monthly update during the October–November launch period; quarterly thereafter.
- Revenue allocation policy: the board should establish, in principle, how REAP revenue will be treated — whether it is unrestricted revenue, ring-fenced for Living Lab innovation, or otherwise designated.

---

## 13. FUTURE IMPLICATIONS AND ETHICAL SAFEGUARDS

The board should consider not only the immediate risks of REAP, but the longer-term ethical implications of what it is building. The following section addresses these considerations directly, because a board that does not ask these questions before launch will be asked them by journalists, funders, and the public after it.

### The Gamification Risk

REAP uses game mechanics — streaks, leaderboards, elimination, prizes — to drive behaviour. These mechanics are effective precisely because they activate the same psychological systems that make other forms of gamification addictive. The behaviourist B.F. Skinner's variable ratio reinforcement (the mechanic behind slot machines) is structurally similar to the spot prize draw.

Sport Waikato should be clear-eyed about this. The goal is to use these mechanics in service of a genuine health outcome (daily movement), not to create a product whose stickiness is an end in itself. Guardrails: REAP should not penalise rest days beyond elimination (no additional streak bonuses that punish absence more than the elimination rule already does); should not use push notifications more than once daily; and should include clear language about taking rest days within the 21-minute minimum framework.

### Elimination Distress

For a small proportion of participants, daily elimination is a high-stakes event. People who are using REAP to build confidence in their own capacity to change may experience elimination as a significant psychological setback. This is a particularly salient concern for the Tier 3 (aspiring inactive) audience that Sport Waikato's mission most directly addresses.

Safeguards: the elimination notification must be framed positively and include a Season 2 pathway. Consider including a brief mental health signpost (Lifeline, 1737) in all elimination communications — not because elimination causes mental health crises, but because Sport Waikato's duty of care to participants extends to acknowledging that distress can be a real response to perceived failure.

### Equity and Access

$14.99 per month is affordable for most employed New Zealand adults. It is not affordable for all. If REAP's participant base is predominantly higher-income, it will drive health outcomes for a population that already has better health outcomes — the inverse of Sport Waikato's mission. This risk grows as REAP scales.

Safeguards (Year 1 onwards): the board should establish a policy on access and equity — whether that is a scholarship programme, a GP referral pathway, or a partnership with Work and Income to provide subsidised access. This should be documented as an organisational commitment before public launch, even if the programme mechanics are not fully built.

### Data and Privacy at Scale

REAP collects daily activity data for all participants. At 150 participants, this is manageable. At 10,000 participants (Year 3–4 potential), it is a significant data asset — and a significant data liability. Activity data is sensitive: it reveals daily routines, physical capacity, and health status. The Privacy Act 2020 obligations that are currently manageable will require a more sophisticated governance structure at scale.

Safeguards: a privacy-by-design audit should be conducted before Year 2 launch, not after. Sport Waikato should not allow sponsor data access to expand beyond what participants have explicitly consented to, regardless of commercial pressure.

### Mission Drift

Facebook launched with the genuinely good intention of connecting people. The product optimised for engagement, and engagement optimised for outrage. The lesson is not that good intentions are irrelevant; it is that commercial incentives can gradually displace mission without any single actor making a deliberately wrong decision.

REAP's commercial incentives and mission incentives are currently well-aligned: both point towards maximising participation and daily movement. The risk of drift arises if: (a) the product is under revenue pressure and begins optimising for payment conversion rather than behaviour change; (b) sponsor data access is gradually expanded beyond what was promised to participants; or (c) the elimination mechanic is made progressively harsher to increase social tension (and thus media interest) at the expense of participant wellbeing.

The board's role is to hold the line on these questions when commercial pressure arises — which it will. A clear statement of organisational values for REAP, approved by the board now and reviewed annually, is the appropriate safeguard.

---

## 14. RECOMMENDATION

The board is asked to resolve:

**That Sport Waikato approves REAP (Survive the Reap) to proceed to public launch on 1 November 2026, subject to the following conditions being met and reported to the board before the launch date:**

1. **Legal sign-off.** Written approval from Sport Waikato's legal counsel (Shelley) confirming that the Terms, Competition Rules, and Privacy Policy are compliant with the Gambling Act 2003, Fair Trading Act 1986, and Privacy Act 2020, and that the prize draw structure has either received informal DIA guidance or has been assessed by Shelley as not requiring a DIA gambling licence.

2. **Credential security.** Written confirmation from the development team that all compromised credentials have been rotated and that a security review of the codebase has been completed.

3. **Critical build completion.** Confirmation that the following product features are built, tested, and deployed to production: midnight elimination cron job; Stripe webhook handler; prize draw backend; subscription cancellation flow; server-side age verification.

4. **Funder briefings.** Confirmation that key Sport Waikato funders (Sport NZ, WEL Energy Trust, and others as appropriate) have been personally briefed by the CEO before the public launch.

5. **Board update at DIA guidance.** A further board update to be provided when DIA informal guidance is received, or by 31 August 2026 at the latest, regardless of DIA response timing.

6. **Equity commitment.** The board to confirm, in principle, Sport Waikato's commitment to developing an equitable access pathway for REAP (scholarship, subsidised tier, or GP referral) to be operationalised by Season 3 (2027).

The CEO is authorised to make operational decisions within the scope of this approval. Any material change to the prize structure, subscription pricing, or data sharing arrangements with sponsors requires board notification.

---

## 15. APPENDICES

The following documents are referenced in this report and are available on request:

**Appendix A — Legal Compliance Audit**
Detailed analysis of REAP's current Terms, Competition Rules, and Privacy Policy against Gambling Act 2003, Fair Trading Act 1986, and Privacy Act 2020. Prepared April 2026. [On file with CEO.]

**Appendix B — Financial Model**
Full three-scenario financial model including subscription revenue, sponsorship scenarios, RST commission model, operating cost assumptions, and Season 1–3 projections. [On file with CEO.]

**Appendix C — Product Architecture Summary**
Technical overview of the REAP product: stack (React/TypeScript/Supabase/Stripe), current build status, critical features remaining, and development timeline. [On file with CEO.]

**Appendix D — REAP Action Plan**
Full project management plan (75+ tasks across Legal, Product Build, Marketing, Partnerships, Operations, and Launch categories) with owners, due dates, and dependencies. Updated April 2026. [On file with CEO and available in Airtable project management base.]

---

*This report was prepared for the Sport Waikato board of trustees. It is a confidential document and is not for external circulation without the express approval of the CEO. Questions or requests for additional information should be directed to Leanne [CEO], Sport Waikato.*

*Sport Waikato is a charitable trust registered under the Charities Act 2005. Registration number: [CC XXXXX]. Registered office: [Hamilton, New Zealand].*

---

**END OF REPORT**
