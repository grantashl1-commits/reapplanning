import { useState } from 'react';
import { AlertTriangle, Shield, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

// ─── Risk Register ─────────────────────────────────────────────────────────────
// Updated April 2026. Gambling Act risk downgraded from High → Low likelihood
// following adoption of the spot prize competition model (subscription pays for
// the game, not draw eligibility; prize fund entirely from SW operational budget).

interface RiskEntry {
  id: string;
  risk: string;
  category: string;
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  likelihood: 'High' | 'Medium' | 'Low';
  mitigation: string;
  status: 'Open' | 'Active Mitigation' | 'Active Monitoring' | 'Mitigated' | 'Accepted';
}

const risks: RiskEntry[] = [
  {
    id: 'R001',
    risk: 'DIA determines spot prize draws constitute unlicensed gambling',
    category: 'Legal',
    impact: 'Critical',
    likelihood: 'Low',
    mitigation: 'Spot prize competition model adopted: $13 subscription pays for the game — not for draw eligibility. Active confirmed-paid survivors are automatically eligible; no additional payment made. Prize fund ($4,662/season) entirely from SW operational budget, separate from subscription revenue at accounting level. DIA informal enquiry lodged May 2026. Formal legal sign-off by Shelley by 30 Sep 2026 — hard gate before launch.',
    status: 'Active Mitigation',
  },
  {
    id: 'R002',
    risk: 'Participant health incident (exercise-induced injury or cardiac event)',
    category: 'Operational',
    impact: 'Critical',
    likelihood: 'Low',
    mitigation: 'Require health declaration at onboarding. Engage medical advisor (GP / sports medicine physician) to review protocols. Welfare register and incident protocol operational before launch. Medical exemption provisions built into app. "Do not exercise through pain — use Redemption Day" messaging in onboarding.',
    status: 'Active Monitoring',
  },
  {
    id: 'R003',
    risk: 'Low participant numbers — below break-even (145 avg subscribers)',
    category: 'Financial',
    impact: 'High',
    likelihood: 'Medium',
    mitigation: 'Celebrity soft launch October 2026 to generate PR and credibility. Pre-registration campaign to validate demand before launch. Sport Waikato network promotion. Season 1 prize fund from SW operational budget regardless of subscriber count — no minimum participant threshold for prize draws.',
    status: 'Active Mitigation',
  },
  {
    id: 'R004',
    risk: 'Elimination notification during participant mental health vulnerability',
    category: 'Reputational / Welfare',
    impact: 'High',
    likelihood: 'Medium',
    mitigation: 'Documented welfare protocol before launch. Non-shaming, forward-looking elimination notification copy. Signposting to Lifeline / Mental Health Foundation in elimination notifications. Explicit pre-sign-up messaging that REAP is not recommended during acute mental health distress. Redemption Day provides one protected rest day. Consider formal MH organisation partnership.',
    status: 'Active Monitoring',
  },
  {
    id: 'R005',
    risk: 'Wearable data inaccuracy causes wrongful elimination',
    category: 'Technical',
    impact: 'High',
    likelihood: 'Medium',
    mitigation: 'TERRA API provides unified integration across Apple Health, Garmin, Fitbit, Strava, Google Fit, Polar, Whoop, Samsung — reduces per-platform risk. 15-minute sync grace window built into elimination logic. Documented dispute resolution process. Admin manual override for verified technical failures. 24-hour appeal window per season rules.',
    status: 'Active Mitigation',
  },
  {
    id: 'R006',
    risk: 'Core features not built by November 2026 launch',
    category: 'Technical',
    impact: 'Critical',
    likelihood: 'Medium',
    mitigation: 'Fixed development milestones tracked in project dashboard. Lovable platform (survivethereap.nz) accelerates build. Internal beta with 50 participants October 2026 before public launch. Contingency: soft launch delay by one month if critical features incomplete. No launch without working automated elimination processing.',
    status: 'Active Monitoring',
  },
  {
    id: 'R007',
    risk: 'Privacy breach of participant health data',
    category: 'Legal',
    impact: 'Critical',
    likelihood: 'Low',
    mitigation: 'External security penetration test before launch (T041). Data minimisation — only collect metrics required for elimination decisions. Encryption at rest and in transit. Privacy Policy reviewed by Shelley. TERRA API data processing agreement documented. Participant right to deletion built into app.',
    status: 'Active Mitigation',
  },
  {
    id: 'R008',
    risk: 'Negative media coverage of elimination mechanic',
    category: 'Reputational',
    impact: 'High',
    likelihood: 'Medium',
    mitigation: 'Prepare media handling guide before launch. Train CEO as primary spokesperson. Positive health-outcomes framing ready. Crisis response template approved by board. Pre-brief friendly journalists. Note: the brand\'s own "KILLER MOVEMENT APP" language gives media permission to use the framing — this is a deliberate aesthetic choice that must be owned, not apologised for.',
    status: 'Active Mitigation',
  },
  {
    id: 'R009',
    risk: 'Celebrity ambassador withdrawal or reputational damage',
    category: 'Reputational',
    impact: 'Medium',
    likelihood: 'Low',
    mitigation: 'Contractual termination provisions with clear separation clause. Identify backup ambassadors. Avoid exclusivity beyond Season 1. Brand separation between SW and ambassador personal reputation included in contract. Do not make celebrity the sole PR asset.',
    status: 'Open',
  },
  {
    id: 'R010',
    risk: 'App platform failure on elimination night',
    category: 'Technical',
    impact: 'High',
    likelihood: 'Low',
    mitigation: 'Load test to 500 concurrent users before launch (T040). Manual fallback procedure for elimination processing if automated system fails. Status page and incident communication plan in place. Elimination runs at midnight NZST — monitoring on-call roster for Season 1.',
    status: 'Active Mitigation',
  },
  {
    id: 'R011',
    risk: 'High subscriber churn between seasons',
    category: 'Financial',
    impact: 'Medium',
    likelihood: 'Medium',
    mitigation: 'In-app re-enrol prompts at season end. "I got Reaped" shareable card mechanic. Season 2 early bird access for Season 1 participants. Post-season retrospective to identify and fix friction points. Monthly seasons reduce re-enrolment commitment barrier.',
    status: 'Open',
  },
  {
    id: 'R012',
    risk: 'Well-resourced competitor replicates the model',
    category: 'Competitive',
    impact: 'Medium',
    likelihood: 'Low',
    mitigation: 'No IP protection on the game mechanic — this risk is accepted. First-mover advantage, brand, data, and community are the moat. Living Lab research context and charitable trust framing are genuinely hard to replicate. Focus on execution quality in Season 1 to build an incumbent position.',
    status: 'Accepted',
  },
];

// ─── Six Thinking Hats ────────────────────────────────────────────────────────
// Full content from REAP-six-thinking-hats.md — Internal Use Only, April 2026.
// This is the complete structured assessment, not a summary.

interface HatSection {
  heading: string;
  body: string;
}

interface Hat {
  id: string;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  label: string;
  subtitle: string;
  sections: HatSection[];
}

const hats: Hat[] = [
  {
    id: 'white',
    color: 'bg-gray-300',
    borderColor: 'border-gray-400',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-800',
    label: 'WHITE HAT',
    subtitle: 'Facts and Data Only',
    sections: [
      {
        heading: 'Market Size Facts',
        body: `New Zealand adult population (18–64): approximately 2.8 million (Stats NZ, 2023). WHO estimates 1 in 4 adults globally do not meet minimum physical activity guidelines; NZ rates are broadly consistent with this. NZ inactivity-related health costs are estimated in the hundreds of millions annually (Ministry of Health). The global health and wellness app market was valued at approximately USD $6.1 billion in 2023 (Grand View Research). The gamification in health market is a meaningful and growing sub-segment with no dominant NZ-specific player identified. The target demographic (18–45, inconsistent actives, gamification-receptive) is large and underserved by existing NZ digital health products.`,
      },
      {
        heading: 'Product Facts — What Exists',
        body: `A defined game concept and ruleset. Brand identity (name, tagline, visual direction). Website content (draft). Legal framework (under review). A defined technology stack intention (Stripe, TERRA API for unified wearable integration). Spot prize competition model adopted: $13/month for game access, 7 spot prize draws per season from SW operational funds.`,
      },
      {
        heading: 'Product Facts — What Does Not Yet Exist',
        body: `A functioning application on survivethereap.nz. Automated midnight elimination processing. Wearable and fitness app integrations (via TERRA API: Garmin, Apple Health, Fitbit, Google Fit, Strava, Polar, Whoop, Samsung). The Survival Board (live participant tracking). Redemption Day declaration flow. Disputes management workflow. Backend data infrastructure. Any verified participant data from a live season.`,
      },
      {
        heading: 'Launch Timeline',
        body: `October 2026: Celebrity soft launch (celebrity to be confirmed). November 1, 2026: Season 1 start. November 13, 2026: Friday 13th spot prize draw #2. Current date: April 2026 — approximately 7 months to launch. Board approval deadline: 31 July 2026. Legal sign-off deadline: 30 September 2026.`,
      },
      {
        heading: 'Legal Status Facts',
        body: `REAP has not received formal legal sign-off at time of this analysis. The spot prize competition model has been adopted: subscription pays for game access, not draw eligibility. Prize fund is from SW operational budget — separate from subscription revenue. The Gambling Act 2003 (NZ) definitions have not yet been formally tested against the REAP model via DIA enquiry. No formal enquiry to the Department of Internal Affairs (DIA) has been made as at April 2026 — target May 2026. The Privacy Act 2020 (NZ) applies — a compliant Privacy Policy is drafted but not yet legally reviewed. The Consumer Guarantees Act 1993 and Fair Trading Act 1986 apply to the subscription product.`,
      },
      {
        heading: 'Competitive Landscape Facts',
        body: `No direct NZ competitor offers a daily-movement survival elimination game. Closest international analogues: Pact (US, closed 2019), StepBet (US, active — step-count wagering model), Zombies Run! (UK, narrative running game), Beachbody (subscription fitness, no elimination mechanic). None are elimination-based daily movement games in a charitable trust context. The RST network in NZ has 17 members — none have a product of this type. Apple Fitness+, Strava, and Garmin Connect are indirect competitors as default fitness tracking destinations. None offer the specific combination: elimination mechanic + charitable purpose + NZ-specific community layer.`,
      },
      {
        heading: 'Financial Facts',
        body: `Subscription price: NZD $13/month (individual). Break-even: 145 average active subscribers (including prize fund, no sponsorship). Prize fund: $4,662/season (7 × $666) from SW operational budget. Year 1 = 2 seasons (Nov + Dec 2026). Year 2+ = 12 seasons per year (monthly). Stripe transaction fees will reduce per-subscription revenue (typically 1.5–2.9% + $0.30 per transaction for NZ). Sport Waikato is a charitable trust — all revenue must demonstrably serve charitable purposes.`,
      },
    ],
  },
  {
    id: 'red',
    color: 'bg-red-500',
    borderColor: 'border-red-500',
    bgColor: 'bg-red-50',
    textColor: 'text-red-900',
    label: 'RED HAT',
    subtitle: 'Emotions and Gut Reactions',
    sections: [
      {
        heading: 'What Trustees Will Feel When They First Hear About This',
        body: `Initial reaction — confusion, then amusement, then concern. Most trustees will find the concept surprising. "THE KILLER MOVEMENT APP" is not the language of a charitable trust board briefing. There will be genuine entertainment — several trustees will find the dark humour appealing personally — but this will be quickly followed by governance instinct: what are we exposed to here?\n\nThe word "eliminated" will land differently for different trustees. Some will see it as creative. Others will immediately think: what if someone is in crisis? What if we eliminate someone who's suicidal and the notification tips something? This concern is not paranoid — it is appropriate, and it needs a real answer before board sign-off.\n\nTrustees who are accountable to funders (Sport NZ, Waikato Regional Council) will feel the tension acutely. They will want to know: what does Sport NZ think of this? Have we consulted them?\n\nThe prize structure will make financially literate trustees nervous until the gambling law position is clearly explained. "Prize draw" and "charitable trust" in the same sentence will trigger a reflexive read of liability.\n\nLikely ask from trustees: Show us the legal sign-off. Show us the health and safety plan for vulnerable participants. Show us the financial model.`,
      },
      {
        heading: 'What Funders Will Feel',
        body: `Sport NZ: Curious but cautious. Sport NZ has been moving toward evidence-based innovation in physical activity. A Living Lab product with a defined measurement framework fits their agenda. The dark aesthetic will create discomfort — Sport NZ communicates in broadly inclusive, positive framing. They will want to understand whether this alienates populations they care about (young people, Māori and Pasifika, lower income groups). They will not actively block it but may want it clearly labelled as a pilot/experiment rather than a flagship programme.\n\nWaikato Regional Council / Local funders: Mixed. Elected officials are risk-averse. Some will find "THE KILLER MOVEMENT APP" politically untenable. Others will see it as exactly the kind of bold intervention the region needs. The charitable revenue-return story is genuinely compelling and will help.\n\nHealth funders (if approached): PHOs, health providers, and district health representatives will have clinical concerns about the elimination mechanic and vulnerable populations — but will be genuinely interested in the behaviour change data if Season 1 produces it.`,
      },
      {
        heading: 'What the Public Will Feel',
        body: `Target demographic (18–45, inconsistent actives): A meaningful subset will find this immediately compelling. The combination of dark humour, competitive stakes, and low daily barrier (21 minutes) is well-calibrated for this audience. Social sharing of "I survived day 12" or "I got eliminated at 11:52pm" will feel natural and will happen organically.\n\nNon-target audiences: Older adults and people who don't engage with gaming culture will find the aesthetic alienating — but these are not the target. The risk is that alienated non-participants become vocal critics, particularly if media frames REAP negatively.\n\nPeople with personal experience of chronic illness, disability, or mental health challenges: Some will feel excluded. Some will feel the elimination mechanic is tone-deaf. A minority may feel actively harmed by it if they encounter the brand during a vulnerable period. This group's concerns are real and warrant specific product consideration, even if REAP is not designed for them.`,
      },
      {
        heading: 'What Media Will Feel',
        body: `Journalism instinct: This story writes itself in multiple directions. "Charitable trust runs death game to get you moving" is a strong headline — the journalist decides whether it's investigative critique or feature celebration, and both are live possibilities. The brand's own language ("THE KILLER MOVEMENT APP") gives media permission to use the framing Sport Waikato has chosen.\n\nRisk: If Season 1 has any participant welfare incident, the brand's aesthetic will be turned against it. "Sport Waikato, which describes its movement app as 'the killer movement app,' faced criticism after..." — the dark brand becomes a liability in adversarial coverage.\n\nOpportunity: With the right pre-briefing and a strong celebrity soft launch, REAP could generate significant earned media. The concept is genuinely novel. Journalists covering health innovation, tech, or sport will find it interesting.`,
      },
      {
        heading: 'What Participants Will Feel',
        body: `Before joining: FOMO and scepticism in roughly equal measure. The pricing is low enough to remove serious financial hesitation. The commitment (21 minutes daily) is achievable enough to feel realistic. The elimination mechanic is compelling precisely because it's slightly scary.\n\nDuring the game: Active survivors will feel daily pride, momentum, and social connection. The habit formation dynamic is likely to feel good — many participants will report surprise at how achievable the daily requirement is, once the habit exists.\n\nUpon elimination: This is the emotional crux. Elimination at midnight is a designed experience. For most people, it will sting briefly and then pass — especially if the tone of the elimination notification is right. For a small number of participants who are going through difficult periods, it could amplify negative feelings. The product needs to handle elimination communication with precision: honest, non-shaming, forward-looking (next season).\n\nPost-season: Survivors will feel genuine pride. People who came close will feel motivated to try again. The re-enrolment opportunity is important here.`,
      },
      {
        heading: 'What Staff Will Feel',
        body: `Sport Waikato staff who work in community sport and wellness contexts may feel uncomfortable with the dark aesthetic — it runs against the culture of inclusivity and encouragement that most RST staff are steeped in. Some will find it exciting. Some will feel it contradicts their personal values around positive health promotion. This needs to be managed through internal communication and clear explanation of the behavioural science rationale — staff who understand why the design is the way it is will be more able to explain and advocate for it.\n\nThere will also be anxiety about workload — particularly for staff who will manage support queries, disputes, and any welfare concerns. This needs to be planned for before launch.`,
      },
    ],
  },
  {
    id: 'black',
    color: 'bg-gray-900',
    borderColor: 'border-gray-900',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-900',
    label: 'BLACK HAT',
    subtitle: 'Risks and Negatives — Brutal Honesty',
    sections: [
      {
        heading: 'Legal — Gambling Act 2003',
        body: `The Gambling Act 2003 defines gambling broadly. A product where participants pay a fee, there is a prize, and the outcome has any element of chance may constitute gambling regardless of intent. The key question is whether prize eligibility (based on surviving, which involves effort but also luck — illness, device failure, a family emergency) constitutes "chance" under the Act.\n\nThe spot prize competition model adopted for REAP addresses this directly: the $13 is paid for the game, not for draw entry. Active survivors are automatically eligible — there is no separate payment or action required. The prize fund comes entirely from SW operational funds with no connection to subscription revenue. This is the correct structure. However, it has not yet been tested against DIA interpretation.\n\nWorst case: DIA determines REAP constitutes an unlicensed gambling product. Sport Waikato would be required to cease the prize component immediately, potentially with reputational and financial consequences. Prosecution under the Act is unlikely given Sport Waikato's charitable status, but the risk of cease-and-desist is real if DIA takes a broad view.`,
      },
      {
        heading: 'Legal — Fair Trading Act',
        body: `If REAP marketing emphasises prizes in a way that is misleading about their actual nature or accessibility, the Fair Trading Act 1986 applies. The current brand emphasis is on movement/survival, which is the correct framing — but any shift toward prize-forward marketing in practice (social media, influencer posts) could create exposure. All marketing copy requires Shelley review before publication.`,
      },
      {
        heading: 'Legal — Consumer Law and Subscription Model',
        body: `The monthly subscription model requires careful consumer law compliance. If a participant pays $13, is eliminated on Day 3, and cannot get a refund, they may have a legitimate complaint under the Consumer Guarantees Act if the service has not been provided as described. The terms must be absolutely clear that: (a) the fee is for access, not survival; (b) elimination is a designed game outcome, not a service failure; (c) refunds are not available post-season-start, and why. This must be stated at Stripe checkout, not buried in Terms.`,
      },
      {
        heading: 'Legal — Privacy Act 2020',
        body: `Activity data (heart rate, movement patterns) is sensitive personal information. If REAP's data handling is inadequate — particularly around consent for research use, data retention, or sponsor data sharing — there is real exposure. A data breach involving health-related activity data would be a serious reputational and legal event. The Privacy Policy is drafted but not yet legally reviewed.`,
      },
      {
        heading: 'Reputational — The Dark Aesthetic in a Publicly-Funded Context',
        body: `Sport Waikato receives public funding. "THE KILLER MOVEMENT APP" from a publicly-funded charitable trust will attract scrutiny — particularly if the concept receives broad media coverage before there is a clear, confident public narrative about why it was designed this way.\n\nThe risk is not that people misunderstand the product. The risk is that the gap between "charitable trust" and "survival game" becomes a sustained talking point that undermines confidence in Sport Waikato's core programmes. Board members and funders will need to be briefed before launch, not after.`,
      },
      {
        heading: 'Reputational — Elimination and Vulnerable Participants',
        body: `This risk cannot be overstated. REAP eliminates participants at midnight if they don't move. This is the core mechanic. For most people, it is a game consequence. For someone experiencing depression, anxiety, chronic illness, bereavement, or a mental health crisis, it is a notification at midnight telling them they have failed.\n\nMitigations include health screening, thoughtful notification copy, signposting to support resources, and Redemption Day. None of these fully eliminate the risk. The risk is real and must be documented and owned.`,
      },
      {
        heading: 'Reputational — Celebrity Soft Launch Risk',
        body: `If the October celebrity soft launch involves a celebrity who subsequently becomes controversial, or if the celebrity publicly struggles with the game and speaks negatively about it, Sport Waikato will have limited control over the narrative. Celebrity partnerships require clear contractual expectations and should not be the primary brand risk exposure in the launch period.`,
      },
      {
        heading: 'Product — Core Features Not Built',
        body: `As of April 2026, approximately seven months before launch, the following critical features do not exist: the survivethereap.nz web application, automated midnight elimination processing, wearable device integrations (via TERRA API), Survival Board, Redemption Day declaration system, and disputes management system.\n\nBuilding a consumer-grade application with multi-platform wearable integration in seven months is achievable but tight — especially given that the app needs to handle elimination correctly at midnight for every participant. A single systematic failure in elimination processing on any given night could result in incorrect survival statuses, participant complaints, and loss of trust in the fairness of the game.`,
      },
      {
        heading: 'Product — Device Integration Complexity',
        body: `Each wearable API has different data structures, rate limits, latency, and reliability profiles. Building reliable Zone 2 classification across all of them — and handling edge cases (device syncing late, data missing, heart rate dropouts) — is a genuinely hard engineering problem. The TERRA API provides a unified integration layer that reduces this complexity materially, but edge cases remain. Getting this wrong produces incorrect eliminations, which creates disputes and loss of faith in the product.`,
      },
      {
        heading: 'Financial — Unvalidated Assumptions',
        body: `No Season 1 has been run. Participant numbers, churn rates, survival rates, and re-enrolment rates are all assumptions. The financial model supporting REAP's revenue projections is based on no real data. At $13/month after Stripe fees (~$12.60–$12.75 net), all development, infrastructure, API costs, marketing, and staff time come out of this. The break-even point is 145 average active subscribers — this has not been stress-tested against real acquisition costs.`,
      },
      {
        heading: 'Ethical — Gamification and Compulsive Engagement',
        body: `REAP is designed to create a daily movement habit through loss aversion and social accountability. These are powerful psychological mechanisms. There is a real (though relatively low probability) risk that a subset of participants engage with REAP compulsively — prioritising their streak above sleep, social commitments, recovery, or their own wellbeing. Redemption Day partially addresses this. The product should not penalise reasonable rest beyond the Redemption Day allowance.`,
      },
      {
        heading: 'Ethical — Low-Income Exclusion',
        body: `$13/month is not a large sum in aggregate, but it is a meaningful barrier for people on low or fixed incomes — who are also among the most affected by inactivity-related health problems. The sponsored group model partially addresses this. It does not fully resolve the tension between a subscription product and a charitable trust mandate to serve all communities.`,
      },
      {
        heading: 'Competitive — IP Vulnerability',
        body: `REAP has no meaningful intellectual property protection on its game mechanic. A well-resourced competitor (a global fitness app, a NZ startup, or another RST) could observe the model and replicate it with more resources. The charitable trust context and Living Lab attribution provide some differentiation, but they are not a durable competitive moat. If a major platform (Apple, Google, Garmin) introduces an elimination-based daily movement feature natively into their ecosystem before REAP achieves meaningful traction, REAP becomes redundant for some participants.`,
      },
    ],
  },
  {
    id: 'yellow',
    color: 'bg-yellow-400',
    borderColor: 'border-yellow-500',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-900',
    label: 'YELLOW HAT',
    subtitle: 'Benefits and Value',
    sections: [
      {
        heading: 'Health Outcomes for Participants',
        body: `The primary value of REAP is straightforward: participants who complete a season move daily for 30 days. Even participants eliminated on Day 10 have moved daily for 10 days they would not have otherwise. The WHO evidence on the health benefits of meeting 150 minutes of moderate weekly activity is robust and uncontested. If REAP reliably produces even partial-season compliance in a demographic that otherwise struggles to maintain movement habits, it is creating real health value.\n\nThe Zone 2 specification is particularly well-chosen. It is achievable enough that almost all participants can do it. It is specific enough that it excludes ambiguous non-activity. And it is the type of activity with the strongest long-term health evidence — sustainable, low-injury-risk, broadly accessible.`,
      },
      {
        heading: 'Revenue for Community Programmes',
        body: `If REAP achieves meaningful participant volume, the revenue model is genuinely attractive for Sport Waikato's community mandate. At $13/month, even 1,000 participants generates approximately $13,000/month in gross revenue — before costs, but also with significant margin contribution at scale. This is real money for community sport programmes that are chronically underfunded. The flywheel (consumer product funds community programmes) is the right model for a charitable trust operating in this space.`,
      },
      {
        heading: 'Proof of Concept for Gamified Health Intervention',
        body: `REAP's research value is independent of its commercial success. Running Season 1 generates the first real-world data on whether a daily-elimination survival game mechanic produces measurable behaviour change in NZ adults. This data is publishable, fundable, and usable as evidence for the next intervention. Even a season with 200 participants produces meaningful data. The Living Lab value does not require commercial scale.`,
      },
      {
        heading: 'First-Mover Advantage in NZ',
        body: `There is no comparable product in New Zealand. The first organisation to build a brand in the gamified movement space in NZ has a meaningful advantage — recognition, trust, data, and the emotional resonance that comes from being the original. REAP is not a feature. It is a product with a name, a personality, and a community. That is harder to replicate than the mechanic.`,
      },
      {
        heading: 'RST Network Amplification',
        body: `If REAP works, the 17 RSTs in the Sport NZ network are natural partners. Each RST has community reach, local relationships, and a shared mandate. A national REAP season — with regional survival boards, local events, and RST-sponsored groups — is achievable if Season 1 produces good data. That is a national physical activity intervention built on a product that started in the Waikato.`,
      },
      {
        heading: 'Data Asset Value',
        body: `Aggregated, de-identified activity data from REAP participants is genuinely valuable — for Living Lab research, for health system planning, and potentially for academic partnerships. A body of real-world Zone 2 compliance data across 30-day seasons, with demographic breakdowns and habit formation outcomes, is a useful dataset. This value grows with each season.`,
      },
      {
        heading: 'Media and PR Value',
        body: `REAP is a genuinely newsworthy concept. A charitable trust building a survival game to address physical inactivity, grounded in WHO data and behavioural science, with a dark aesthetic and an elimination mechanic — this is a story that writes itself in multiple outlets. Earned media from the November launch could reach audiences well beyond the marketing budget. Done well, the press launch alone is worth many times the cost of a paid advertising campaign.`,
      },
      {
        heading: 'Behaviour Change at Scale',
        body: `If REAP works — if the habit transfers beyond the season — it is creating lasting behaviour change. The holy grail of public health interventions is not compliance during the programme but behaviour after it ends. If even 30% of Season 1 survivors continue daily Zone 2 movement for 90 days after the season ends, REAP has done something that most fitness products cannot demonstrate.`,
      },
    ],
  },
  {
    id: 'green',
    color: 'bg-green-500',
    borderColor: 'border-green-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-900',
    label: 'GREEN HAT',
    subtitle: 'Creative Opportunities',
    sections: [
      {
        heading: 'Teams Season',
        body: `A version of REAP in which teams survive together — if one team member fails their 21 minutes, the whole team faces a consequence (extra challenge, not elimination). This changes the social accountability dynamic significantly: instead of watching each other's survival, you are responsible for each other's survival. The collective obligation mechanic is likely to be extremely effective and produces a different, deeper social bond.`,
      },
      {
        heading: 'Corporate League',
        body: `An annual corporate league in which registered business teams compete across multiple seasons, with a mid-year and end-of-year survivor championship. This creates a sustained, recurring corporate engagement model rather than a one-off season. Corporate teams pay annual sponsorship fees. The league board is public. Business culture around the league could become genuinely significant.`,
      },
      {
        heading: 'Annual Championship',
        body: `The survivors of all seasons in a year are eligible for an annual championship event — an in-person or hybrid event that celebrates the year's survivors, features a major spot prize draw, and is a genuine sport/community event. This event becomes the calendar centrepiece of REAP culture.`,
      },
      {
        heading: 'REAP Juniors / Family Mode',
        body: `A modified version for families — lower movement bar, different tone, family survival board. Delivered through schools or community sport in partnership with Sport NZ's children's physical activity programmes.`,
      },
      {
        heading: 'International Expansion',
        body: `The REAP model is not New Zealand-specific. The WHO guidelines, the Zone 2 mechanic, and the loss aversion framework are universal. Once Season 1 has produced data, REAP has a genuine case for expanding to Australia, the UK, or other English-speaking markets with strong RST/sport trust equivalents. A white-label or licensed version of the technology could be deployed by sport organisations globally.`,
      },
      {
        heading: 'Licensing to Other RSTs and Health Organisations',
        body: `Rather than scaling directly, Sport Waikato could license the REAP model — technology, brand standards, operational playbook — to other RSTs in New Zealand and internationally. A licensed REAP in Bay of Plenty, Canterbury, and Otago would create national reach without requiring Sport Waikato to manage a national product. Licensing revenue flows back to the Living Lab.`,
      },
      {
        heading: 'Research Partnerships',
        body: `New Zealand universities (University of Waikato, AUT, Victoria, Otago) have research groups focused on health behaviour, sport science, and digital health. REAP's real-world data is a genuinely attractive research dataset. A formal research partnership could provide: external validation of the Living Lab's findings, academic credibility for Sport Waikato's approach, and potentially grant funding for research infrastructure that benefits the product.`,
      },
      {
        heading: 'REAP as a Cultural Property',
        body: `Wordle became a daily ritual for millions of people not because it was technically sophisticated but because it hit a specific cultural moment with a shareable, consistent daily mechanic. REAP has similar structural properties: one action per day, a public result, a shared vocabulary (survived / eliminated / Redemption Day), a built-in community.\n\nIf REAP achieves cultural traction — if "I got Reaped" becomes New Zealand fitness slang, if the Survival Board becomes a genuine daily social ritual, if Friday 13th events become anticipated fixtures — the brand becomes something larger than the product. That is hard to build and impossible to buy. It is worth designing for.`,
      },
      {
        heading: 'Mental Health Partnership',
        body: `REAP's elimination mechanic and mental health intersection, identified as a Black Hat risk, is also an opportunity. A formal partnership with a NZ mental health organisation (like Lifeline, Mental Health Foundation, or a PHO) to: (a) co-develop the welfare protocols; (b) ensure warm referrals from elimination notifications; and (c) co-research the wellbeing impacts of the game across a season. This partnership turns a reputational risk into a genuine asset and makes the product significantly more defensible.`,
      },
    ],
  },
  {
    id: 'blue',
    color: 'bg-blue-600',
    borderColor: 'border-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-900',
    label: 'BLUE HAT',
    subtitle: 'Process and Governance',
    sections: [
      {
        heading: 'Decision Ownership',
        body: `Board of Sport Waikato: Approves REAP as an official Living Lab product and operational programme. Approves the risk framework, including the prize structure and legal position. Approves the financial commitment (development costs, prize funding, staff allocation). Is briefed before any public announcement and before any media engagement.\n\nLiving Lab Lead / Product Lead: Day-to-day product decisions, including feature scope and launch sequencing. Technology vendor selection and development oversight. Season rules and operational decisions within the approved framework.\n\nLegal counsel (Shelley / external): Sign-off on Terms of Participation, Rules, Privacy Policy, and prize structure before any participant-facing publication. Provides written advice on gambling law position before launch. Leads or co-leads the DIA informal enquiry.\n\nSport Waikato CEO: External communications, media, and funder relationships. Escalation point for any welfare incident or significant participant complaint. Board reporting.`,
      },
      {
        heading: 'Board Approval Conditions',
        body: `Before Sport Waikato proceeds to public launch, the following conditions should be met:\n\n1. External legal sign-off on gambling law position (written, documented)\n2. External legal sign-off on Terms, Rules, Privacy Policy\n3. A working, tested application with demonstrated midnight elimination processing\n4. A documented welfare protocol for elimination communications and vulnerable participant scenarios\n5. A defined prize budget approved by the board — maximum prize commitment per season ($4,662/season = 7 × $666)\n6. At least one test season (internal or with a small external group) completed before public Season 1\n7. Staff resourcing plan for support, disputes, and operations during a live season\n8. Funder briefing (Sport NZ) completed before public announcement`,
      },
      {
        heading: 'Legal Sign-Off Requirements',
        body: `Before any participant-facing publication, the following require explicit written legal approval from Shelley:\n\n• Terms of Participation (all clauses, especially prize structure, refund policy, health disclaimer)\n• Season Rules (especially spot prize draw eligibility sections)\n• Privacy Policy (especially TERRA API data processing, sponsor data sharing provisions)\n• Website marketing copy (Fair Trading Act compliance — no misleading representations about prizes or outcomes)\n• Any celebrity endorsement agreements (separate from the above)`,
      },
      {
        heading: 'Triggers for Immediate Pause or Shutdown',
        body: `The following events should trigger an immediate operational pause and board notification:\n\n• DIA indicates REAP constitutes unlicensed gambling or requires a licence\n• A participant welfare incident (hospitalisation, mental health crisis) plausibly connected to REAP participation or an elimination notification\n• A systematic technical failure that produces incorrect eliminations affecting more than [X] participants\n• Any court or regulatory action\n• Media coverage that materially and negatively misrepresents REAP and cannot be promptly corrected\n\nThe following should trigger a board-level review (within 72 hours) rather than immediate shutdown:\n\n• A sustained campaign of public criticism on safety or ethical grounds\n• A funder formally expressing concern or threatening to withdraw support\n• A staff welfare incident related to REAP operations`,
      },
      {
        heading: 'Governance of Spot Prize Draws',
        body: `The spot prize draw process must be:\n\n• Documented — before each draw, the pool of eligible participants, the selection mechanism, and the result are recorded in writing\n• Independently verifiable — either an independent third party conducts or witnesses the draw, or the mechanism is technically auditable\n• Consistent with the legal position adopted in the Terms — draws are promotional and subsidiary to the game; no participant pays to enter\n• Reported to the board at end of season as part of the season financial report\n\nLanguage: always "spot prize draw." Never "lottery", "lucky draw", or "random draw."`,
      },
      {
        heading: 'Protecting Sport Waikato if REAP Fails or Causes Harm',
        body: `Product failure: If REAP fails to attract participants, runs at a loss, or is abandoned after one season, the primary risk to Sport Waikato is reputational — "Sport Waikato built a survival game that flopped." This is manageable if REAP is clearly labelled as a Living Lab pilot from the outset. A pilot that is discontinued after generating data is not a failure in the Living Lab context. It is a result.\n\nProduct causes harm: If a participant is harmed (physically or psychologically) in a way that is plausibly connected to REAP, Sport Waikato needs:\n• A documented welfare protocol that was followed\n• Clear health disclaimers accepted by the participant at sign-up\n• Evidence that reasonable steps were taken to mitigate the specific risk\n• A responsive and non-defensive communication approach\n• Legal advice engaged immediately\n\nThe absence of a welfare protocol is itself a liability. Having one — even an imperfect one — demonstrates that the risk was considered and managed.\n\nReputation protection: The board should be prepared for the reality that some media coverage of REAP will be negative. The product's aesthetic is designed to be provocative. The plan for responding to negative media should be agreed before launch, not after.`,
      },
    ],
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const impactConfig: Record<string, { bg: string; text: string }> = {
  Critical: { bg: 'bg-red-50', text: 'text-red-700' },
  High: { bg: 'bg-orange-50', text: 'text-orange-700' },
  Medium: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
  Low: { bg: 'bg-gray-100', text: 'text-gray-600' },
};

const likelihoodConfig: Record<string, { bg: string; text: string; border: string }> = {
  High: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  Medium: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  Low: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
};

const statusConfig: Record<string, { bg: string; text: string }> = {
  'Active Mitigation': { bg: 'bg-green-50', text: 'text-green-700' },
  'Active Monitoring': { bg: 'bg-blue-50', text: 'text-blue-700' },
  'Open': { bg: 'bg-yellow-50', text: 'text-yellow-700' },
  'Accepted': { bg: 'bg-gray-100', text: 'text-gray-600' },
  'Mitigated': { bg: 'bg-green-100', text: 'text-green-800' },
};

function HatAccordion({ hat }: { hat: Hat }) {
  const [open, setOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  function toggleSection(i: number) {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <div className={`rounded-xl border-2 ${hat.borderColor} overflow-hidden`}>
      {/* Hat header */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-6 py-4 ${hat.bgColor} text-left`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full ${hat.color} shrink-0`} />
          <div>
            <div className={`font-bold text-sm ${hat.textColor}`}>{hat.label}</div>
            <div className="text-xs text-gray-500">{hat.subtitle} · {hat.sections.length} sections</div>
          </div>
        </div>
        {open ? <ChevronUp size={18} className="text-gray-500 shrink-0" /> : <ChevronDown size={18} className="text-gray-500 shrink-0" />}
      </button>

      {open && (
        <div className="divide-y divide-gray-100 bg-white">
          {hat.sections.map((section, i) => (
            <div key={i}>
              <button
                onClick={() => toggleSection(i)}
                className="w-full flex items-center justify-between px-6 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-800">{section.heading}</span>
                {openSections.has(i) ? <ChevronUp size={15} className="text-gray-400 shrink-0" /> : <ChevronDown size={15} className="text-gray-400 shrink-0" />}
              </button>
              {openSections.has(i) && (
                <div className="px-6 pb-4">
                  {section.body.split('\n\n').map((para, p) => (
                    <p key={p} className="text-sm text-gray-700 leading-relaxed mb-2 last:mb-0">{para}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main View ─────────────────────────────────────────────────────────────────

export function RisksView() {
  const highImpact = risks.filter(r => r.impact === 'Critical' || r.impact === 'High').length;
  const mediumImpact = risks.filter(r => r.impact === 'Medium').length;
  const mitigated = risks.filter(r => r.status === 'Active Mitigation' || r.status === 'Mitigated').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Risk Analysis</h2>
        <p className="text-gray-600 text-sm">Risk register and Six Thinking Hats structured assessment — internal use only, April 2026</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-red-600" />
            <span className="text-sm font-semibold text-red-700">High / Critical Impact</span>
          </div>
          <div className="text-3xl font-bold text-red-800">{highImpact}</div>
          <div className="text-xs text-red-600 mt-1">Risks requiring active management</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={18} className="text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-700">Medium Impact</span>
          </div>
          <div className="text-3xl font-bold text-yellow-800">{mediumImpact}</div>
          <div className="text-xs text-yellow-600 mt-1">Monitor and mitigate</div>
        </div>
        <div className="bg-green-50 border border-green-200 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={18} className="text-green-600" />
            <span className="text-sm font-semibold text-green-700">Active Mitigation</span>
          </div>
          <div className="text-3xl font-bold text-green-800">{mitigated}</div>
          <div className="text-xs text-green-600 mt-1">Risks with controls in place</div>
        </div>
      </div>

      {/* Risk Register */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Risk Register</h3>
          <p className="text-xs text-gray-500 mt-0.5">Updated April 2026. Gambling Act risk downgraded: Low likelihood following adoption of spot prize competition model.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-16">ID</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Risk</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-28">Impact</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-28">Likelihood</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-36">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {risks.map(r => {
                const ic = impactConfig[r.impact] ?? impactConfig.Low;
                const lc = likelihoodConfig[r.likelihood] ?? likelihoodConfig.Low;
                const sc = statusConfig[r.status] ?? statusConfig.Open;
                return (
                  <tr key={r.id} className="hover:bg-gray-50 align-top">
                    <td className="px-5 py-4 font-mono text-xs text-gray-400">{r.id}</td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-900 mb-1">{r.risk}</div>
                      <div className="text-xs text-gray-500">{r.category}</div>
                      <div className="text-xs text-gray-600 mt-2 leading-relaxed">{r.mitigation}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${ic.bg} ${ic.text}`}>{r.impact}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${lc.bg} ${lc.text} ${lc.border}`}>{r.likelihood}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${sc.bg} ${sc.text}`}>{r.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Six Thinking Hats */}
      <div>
        <div className="mb-4">
          <h3 className="text-base font-bold text-gray-900">Six Thinking Hats Analysis</h3>
          <p className="text-xs text-gray-500 mt-0.5">Edward de Bono structured assessment — internal use only. Click a hat to expand, click a section heading to read full content.</p>
        </div>
        <div className="space-y-3">
          {hats.map(hat => <HatAccordion key={hat.id} hat={hat} />)}
        </div>
      </div>

      {/* Welfare note */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="text-orange-600 mt-0.5 shrink-0" />
          <div className="text-sm text-orange-800">
            <strong className="font-bold">Critical welfare consideration:</strong> There will be participants eliminated during periods of mental health vulnerability. The probability is not zero. The question is not whether it will happen but whether Sport Waikato has a documented, prepared response when it does. The absence of a welfare protocol is itself a liability. Having one — even an imperfect one — demonstrates that the risk was considered and managed.
            <div className="mt-2 font-semibold">Required before launch: welfare register operational, incident response protocol finalised, non-shaming elimination notification copy approved, mental health signposting in-app.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
