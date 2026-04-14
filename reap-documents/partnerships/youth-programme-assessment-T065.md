# T065 — School / Youth Programme Feasibility Assessment
**Owner:** Leanne | **Due:** 2026-10-01 | **Priority:** Low
**Status:** Assessment Phase | **Decision Required For:** Year 2 (Season 2, 2027) Planning

---

## Executive Summary

**Recommendation: Defer to Year 2 with conditions. Do not launch a youth version of REAP in Season 1.**

A youth-adapted version of REAP (target age: 16+) is strategically plausible and educationally relevant, but carries material legal, welfare, and operational complexity that cannot responsibly be resolved within the Season 1 timeline. Key constraints:

1. **Parental consent architecture** is not built into the current REAP platform — adding it requires product development time estimated at 4–8 weeks
2. **Subscription contracts with under-18s** are legally unenforceable in NZ without parental consent, creating a billing model gap
3. **Gambling Act compliance** for a youth cohort requires a fresh legal opinion, not reliance on the adult programme's compliance architecture
4. **Welfare risk** is materially higher in a 16–17 age group — eating disorder triggers, exercise compulsion, social exclusion via elimination — and requires specific mitigation design
5. **School context** adds a layer of MoE/school board approval complexity that cannot be navigated before November 2026

**Recommended decision timeline:** Assessment complete and board decision made by 1 October 2026, ahead of Year 2 planning cycle beginning January 2027.

**Conditions for Year 2 youth launch:**
- Legal opinion obtained (specific to youth, under-18 contracts, Gambling Act)
- Parental consent and parental dashboard features built into the product
- Welfare protocol reviewed by a qualified youth mental health clinician
- Pilot tested with at least one Waikato secondary school in a supervised, non-commercial format before commercial launch

---

## 1. Age Threshold Analysis: 16+ vs. 18+

### 1.1 Option A: 16+ Age Threshold

| Factor | Assessment |
|--------|------------|
| Market size | Significantly larger (Year 11–13 students) — see Section 12 |
| Legal complexity | High — all 16–17-year-olds require parental consent for subscription contracts |
| Welfare risk | Higher — 16-year-olds are more developmentally vulnerable to elimination-mechanic social effects |
| NZQA PE curriculum alignment | Strong — Year 11–13 PE standards include aerobic fitness measurement and health behaviour change |
| Supervision requirement | Parental and school oversight required for participation |
| Gambling Act | Legal opinion required — Gambling Act does not explicitly distinguish by age for skill-based products, but the Commission may apply additional scrutiny to youth-targeted products |

### 1.2 Option B: 18+ Only (Status Quo Extended)

| Factor | Assessment |
|--------|------------|
| Market size | Smaller for school-based programme — 18-year-olds are Year 13 and early tertiary |
| Legal complexity | Low — adults can enter subscription contracts independently |
| Welfare risk | Standard adult welfare considerations apply |
| School relevance | Limited — most 18-year-olds are leaving school or in tertiary |
| PE curriculum | Partial alignment with Year 13 |

### 1.3 Recommendation on Age Threshold

If a youth programme proceeds, it should target **16+ with mandatory parental consent** — not 18+. The 18+ threshold eliminates most of the school market without meaningfully reducing complexity. The complexity is in the parental consent architecture, not the specific age.

Under-16 (14–15 year olds): **Not recommended** at any stage. The welfare risks associated with elimination mechanics, social comparison, and daily performance tracking are not manageable in this age group without clinical supervision.

---

## 2. Parental Consent Requirements — Privacy Act 2020

### 2.1 Health Information as Sensitive Information

Zone 2 heart rate data is **health information** under the Privacy Act 2020 (s 2 definition). Health information has enhanced protections:

- Collection must be for a lawful purpose directly connected to the organisation's functions
- Must be collected directly from the individual, or with their knowledge and consent
- For under-18s, the Privacy Act does not create a hard bright line on consent capacity — it uses a "reasonable individual" test

### 2.2 Age of Consent for Health Data

- NZ's Privacy Act 2020 does not specify a minimum age for data consent
- Case law and the Privacy Commissioner's guidance suggest 16 is generally an appropriate threshold for competent consent to health data collection
- For 16–17-year-olds: REAP should obtain **both** the young person's consent and parental/guardian consent, to minimise legal exposure
- A joint consent process is the prudent approach

### 2.3 Required Consent Architecture for Under-18

| Consent Layer | Who Consents | How |
|---------------|-------------|-----|
| REAP terms of service | Young person (16+) | Electronic checkbox with age confirmation |
| Parental consent to health data collection | Parent/guardian | Separate email to nominated guardian with digital or physical signature |
| Parental consent to subscription billing | Parent/guardian | Parent/guardian is the billing contact for under-18 subscriptions |
| School context consent | School and parent | Additional consent layer if programme is run through school |

**Product requirement:** The REAP platform must support a **dual-consent onboarding flow** for under-18 participants. This does not exist in the current product architecture and must be scoped and built before any youth launch.

---

## 3. Consumer Guarantees Act and Subscription Contracts

### 3.1 Contractual Capacity of Minors

Under NZ contract law:

- Minors (under 18) can enter contracts, but most contracts are **voidable at the minor's election**
- A subscription agreement with a 16-year-old is legally enforceable **only if** a parent or guardian co-signs or is the named billing party
- If a 16-year-old signs up independently via Stripe and the parent later disputes the charge, REAP is exposed

### 3.2 Required Billing Architecture

- For under-18 participants: **parent or guardian must be the Stripe billing account holder**
- This requires a modified onboarding flow: young person registers, parent receives billing confirmation and must actively approve
- Stripe supports this through standard customer account flows — no custom development required for billing itself, but the REAP onboarding UI must support the parental billing approval step

### 3.3 Consumer Guarantees Act Implications

- The Consumer Guarantees Act 1993 applies to all REAP subscriptions, including youth
- Refund rights for under-18 participants are at least equal to adult rights — and arguably stronger given voidability provisions
- REAP's refund policy must be clearly communicated to parents, not just the young person
- If REAP eliminates a 16-year-old participant from the season, the parent may have grounds to seek refund of the monthly subscription regardless of REAP's standard terms — this is a live risk that needs specific legal advice

---

## 4. Gambling Act Assessment — Youth Version

### 4.1 Current Adult Programme Compliance Architecture

The adult REAP programme has been structured to fall outside the definition of "gambling" under the Gambling Act 2003 on the basis that:
- The subscription fee is a fixed service fee, not an entry to a prize draw
- No prize pool is funded by participant entry fees
- Skill (daily consistent exercise) determines outcome, not chance
- Sport Waikato is a charitable entity

### 4.2 Does a Youth Version Require Different Architecture?

| Issue | Assessment |
|-------|------------|
| Gambling Act definition | The Gambling Act 2003 does not create different thresholds for youth vs. adults in the skill/chance analysis. The legal architecture that protects the adult product would apply equally to a youth product — provided the structure is identical. |
| Gambling Commission scrutiny | A youth-targeted product is more likely to attract Gambling Commission scrutiny and media criticism, even if technically compliant. Reputational risk is higher. |
| Prize structure | If any prize or reward is offered in the youth programme, the same "no prize pool from entry fees" principle must be maintained. Educational rewards (certificates, trophies) are likely fine. Cash or valuable prizes increase risk. |
| Legal opinion | REAP's adult programme legal opinion should **not** be assumed to cover a youth programme. A fresh opinion specific to the youth product structure is required. Estimated cost: $1,500–$3,000 from existing legal advisers. |

### 4.3 Recommendation

Do not launch a youth product without a fresh Gambling Act opinion. The risk of being seen as exposing minors to gambling-adjacent mechanics — even if technically compliant — is a reputational risk Sport Waikato cannot absorb in Season 1.

---

## 5. Welfare Considerations — Youth Specific

### 5.1 Eating Disorder Risk

Daily exercise monitoring in a competitive/survival context can reinforce compulsive exercise behaviours in adolescents who are pre-disposed to or experiencing eating disorders.

**Mitigation requirements:**
- REAP youth onboarding must include a brief health screening question set (not diagnostic — just a flag)
- Clear messaging: "If exercise feels distressing or compulsive, talk to a trusted adult or contact [NZ youth health resource]"
- School-based implementation requires the school to have a counsellor briefed on the programme
- Wellbeing check-in feature: weekly optional prompt in-app for youth participants (not required, but recommended)

### 5.2 Exercise Compulsion

Zone 2 at minimum is a brisk 21-minute walk — low intensity. However, competitive adolescents may significantly over-exercise to "prove" Zone 2 status or extend their survival probability. The elimination mechanic creates a daily high-stakes pressure context.

**Mitigation requirements:**
- Maximum daily Zone 2 credit: Youth version should cap the app's visible Zone 2 counter at a reasonable limit (e.g., 60 minutes displayed maximum) — discourages "over-proving" behaviour
- App messaging: "You only need 21 minutes. The rest is up to you."
- Coach or teacher contact: if school-based, teacher nominates a point-of-contact for welfare concerns

### 5.3 Social Exclusion Effects of Elimination

Being eliminated from a social programme — particularly if the elimination is visible to peers in a school context — can be experienced as public failure, rejection, or humiliation.

**Mitigation requirements:**
- Elimination notifications must be private to the individual — not broadcast to the group or class
- Youth Survival Board: if a group survival board exists in the school context, it should show aggregate class survival, not individual names or individual elimination
- Teachers must not use REAP elimination status as a measure of student achievement or effort
- REAP youth terms explicitly prohibit teachers from using REAP data in academic assessment

### 5.4 Summary of Youth Welfare Protocol Requirements

| Requirement | Current Adult Product | Youth Product Requirement |
|-------------|----------------------|--------------------------|
| Health screening at onboarding | Basic health declaration | Extended screening with eating disorder / compulsive exercise flags |
| Elimination notification | Individual push notification | Private — no peer or class visibility |
| Survival board visibility | Full public board | Class aggregate only; no individual names on youth board |
| Wellbeing prompts | None | Weekly optional wellbeing check-in |
| Referral to support | None | Clear in-app links to youth mental health resources (e.g., 1737, Youthline) |
| Welfare review | Adult programme only | Youth welfare protocol reviewed by qualified youth clinician |

---

## 6. School Context

### 6.1 NZQA PE Curriculum Alignment

REAP youth aligns with NCEA Level 1–3 Physical Education standards:

| NCEA Standard | Alignment |
|---------------|-----------|
| AS91329 (Level 3) — Demonstrate understanding of the physiology of training | Zone 2 heart rate training principles directly applicable |
| AS91331 (Level 3) — Analyse health behaviour change | 30-day habit formation is a textbook behaviour change case study |
| AS90972 (Level 1) — Demonstrate understanding of the relationship between physical activity and health | Zone 2 and aerobic health — direct curriculum hook |
| AS91332 (Level 3) — Implement a training programme for self or others | REAP as a documented, measured training programme |

**Opportunity:** REAP youth could be positioned as an applied learning context for NCEA PE — students gather real Zone 2 data, analyse their survival performance, and link it to curriculum standards. This requires PE teacher buy-in and a curriculum integration guide from Sport Waikato.

### 6.2 School Approval Process

To run any REAP programme in a school context:

1. **Principal approval** — required for any external wellness/health programme
2. **Board of Trustees notification** — at minimum, BOT should be informed; some schools require BOT approval
3. **Parent community notification** — all parents of participating students must be informed regardless of consent requirement
4. **Teacher coordinator nominated** — one PE teacher or form teacher is the in-school REAP contact
5. **Data agreement** — school signs a data sharing agreement with Sport Waikato confirming what data REAP collects and how it is used
6. **MoE compliance check** — if REAP intends to approach multiple schools, review whether any MoE registration or approval is required for health/wellness programmes operating in schools

**Estimated timeline to navigate school approval for a pilot:** 8–12 weeks from first contact to go-live.

### 6.3 Teacher Supervision Requirements

| Requirement | Detail |
|-------------|--------|
| Nominated teacher contact | 1 PE teacher per school is the REAP coordinator |
| Daily monitoring | Teacher has read-only access to class aggregate survival board |
| Welfare response | Teacher is the first point of contact for any student welfare concerns |
| Assessment prohibition | Teacher must not use REAP data in academic grading |
| Training | Sport Waikato provides 60-minute teacher briefing before programme launch |

---

## 7. Modified Product Requirements for Youth Version

| Feature | Adult Version | Youth Version Required |
|---------|--------------|------------------------|
| Zone 2 calculation | Standard Karvonen formula using wearable data | Modified for under-18: Tanaka formula or device-native youth heart rate zones (lower max HR assumption) |
| Subscription billing | Adult Stripe billing | Parental billing contact; dual-consent onboarding |
| Subscription price | $13/month | Proposed: $6/month (school-subsidised) or $8/month (direct to family) |
| Onboarding consent | Individual terms acceptance | Dual consent (young person + parent) |
| Survival board | Full public board | Class aggregate only; no individual youth names |
| Elimination notification | Individual push notification | Private notification only; no peer visibility |
| Wellbeing features | None | Weekly opt-in wellbeing prompt; mental health resource links |
| Parental dashboard | None | Read-only parent view: is my child still in the season? (binary yes/no only) |
| Data retention | Standard REAP retention policy | Youth data: parental consent required for any data retention beyond season close |
| Referral resources | None | 1737, Youthline, school counsellor contact displayed in app |

---

## 8. Market Size Estimate

### 8.1 Waikato Secondary Schools

| Metric | Estimate | Source Basis |
|--------|----------|-------------|
| Secondary schools in Waikato region | ~80–90 schools | MoE data approximation |
| Schools in Hamilton City specifically | ~25 secondary schools | Hamilton City Council / MoE |
| Year 11–13 students aged 16+ in Waikato | Approx. 12,000–15,000 | MoE roll data approximation |
| Realistic pilot cohort (1–3 Hamilton schools) | 200–500 students | Based on school size averages |
| Realistic paid uptake in Year 2 (5 schools, 50% uptake) | 500–1,000 students | Conservative estimate |

### 8.2 Revenue Projection (Youth Segment, Year 2)

| Scenario | Participants | Price/Month | Monthly Revenue |
|---------|-------------|-------------|----------------|
| Conservative | 300 | $6 | $1,800 |
| Base | 700 | $7 | $4,900 |
| Optimistic | 1,500 | $8 | $12,000 |

Youth segment revenue is modest in Year 2. The strategic value is brand building, curriculum integration, and future adult participant pipeline — not short-term revenue.

---

## 9. Competitive Risk

If REAP does not address the youth market, a competitor or adjacent product may:

| Risk | Description |
|------|-------------|
| Secondary school PE programmes | A NZ-based fitness app or edu-tech company launches a NZQA-aligned fitness game for schools |
| Fitbit/Google for Education | Google's education products may develop a Zone 2 or Active Zone Minutes challenge for schools |
| Australian competitor entry | An Australian app (e.g., Strava-adjacent or fitness gamification product) expands to NZ schools |
| Internal competitor | Sport NZ itself may run a youth physical activity programme that overlaps with REAP's format |

**Mitigation:** If REAP defers youth to Year 2, it should conduct basic IP and market monitoring to confirm no competitor is moving faster. Ashleigh to do a quarterly competitive scan.

---

## 10. Development Cost Estimate

| Feature | Estimated Development Effort | Estimated Cost (NZD) |
|---------|------------------------------|----------------------|
| Dual-consent onboarding flow (parental consent UI) | 2–3 weeks dev | $4,000–$8,000 |
| Parental billing integration (Stripe parent account flow) | 1–2 weeks dev | $2,000–$4,000 |
| Youth-adapted Zone 2 calculation (Tanaka formula) | 0.5–1 week dev | $1,000–$2,000 |
| Private elimination notifications (no peer broadcast) | 0.5 weeks dev | $500–$1,000 |
| Youth survival board (class aggregate only) | 1 week dev | $1,500–$3,000 |
| Parental dashboard (binary yes/no view) | 1–2 weeks dev | $2,000–$4,000 |
| Wellbeing prompts and mental health links | 0.5 weeks dev | $500–$1,000 |
| Legal opinion (Gambling Act, contracts, privacy) | Legal adviser time | $2,000–$4,000 |
| Youth welfare protocol review (clinician) | Clinician review | $1,000–$2,000 |
| Teacher briefing materials and curriculum guide | Content/design | $1,000–$2,000 |
| **Total estimate** | | **$15,500–$31,000** |

This investment is recoverable within 1–2 youth seasons at modest uptake. The decision is not financial — it is legal and welfare readiness.

---

## 11. Legal Sign-Off Requirements

Before any youth version can be marketed or piloted:

| Requirement | Owner | Status |
|-------------|-------|--------|
| Legal opinion: Gambling Act compliance for under-18 product | Leanne + legal adviser | Not started |
| Legal opinion: Consumer Guarantees Act / minor contract enforceability | Leanne + legal adviser | Not started |
| Privacy Act compliance review for health data of under-18s | Leanne + legal adviser | Not started |
| Youth welfare protocol review by qualified clinician | Leanne | Not started |
| Board approval to proceed with youth product development | Leanne | Pending decision |
| School data sharing agreement template | Leanne + legal adviser | Not started |

---

## 12. Recommendation Matrix

| Scenario | Recommendation | Conditions |
|---------|---------------|-----------|
| Launch youth version in Season 1 (Nov 2026) | **Reject** | Timeline is impossible; legal work not done; platform not built |
| Launch school pilot in Season 1 (1–2 schools, non-commercial) | **Reject** | Still requires parental consent architecture and welfare review — not achievable in time |
| Assess and plan for Season 2 (Year 2) youth launch | **Proceed** | Subject to: legal opinions obtained, welfare protocol reviewed, product features scoped and built |
| Defer indefinitely | **Reject** | Competitive risk materialises; curriculum opportunity lost; brand positioned as adult-only |

**Board Decision Required:** Approve Year 2 youth programme development investment ($15,500–$31,000) by 1 October 2026 to enable a viable Season 2 launch.

---

## 13. Decision Timeline

| Date | Milestone |
|------|-----------|
| **2026-10-01** | Leanne presents youth feasibility assessment to board — decision to proceed/defer/reject Year 2 youth programme |
| **2026-11-01** | If approved: legal advisers engaged for youth-specific opinions |
| **2026-12-01** | Legal opinions received |
| **2027-01-15** | Year 2 product scope confirmed; youth features included in development roadmap |
| **2027-02-01** | Youth welfare protocol reviewed and signed off |
| **2027-03-01** | School outreach begins (target: 2–3 Hamilton schools for Season 2 pilot) |
| **2027-05-01** | Parental consent architecture built and tested |
| **2027-07-01** | Youth product ready for pilot |
| **2027-10-01** | Season 2 target launch (school pilot + adult programme combined) |

---

## Document Control

| Field | Detail |
|-------|--------|
| Version | 1.0 |
| Created | 2026-04-09 |
| Owner | Leanne |
| Next review | 2026-09-01 (pre-board decision) |
| Related documents | REAP-Appendix-A-Legal-Compliance-Audit.md, REAP-gambling-compliance-section.md, REAP-Governance.md |
