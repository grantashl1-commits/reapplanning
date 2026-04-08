# REAP — Appendix D: Action Plan
**Board Report Appendix | Sport Waikato / The Living Lab**
**Prepared:** April 2026 | **Classification:** Confidential — Board Use Only
**Note:** This plan is the master action register. It is maintained in Airtable (REAP Project Management base). This document is the April 2026 snapshot filed with the board report.

---

## How to Read This Plan

| Field | Meaning |
|-------|---------|
| **Status** | Not Started / In Progress / Complete / Blocked |
| **Owner** | CEO = Chief Executive; LL = Living Lab Lead; Dev = Developer; Shelley = Legal counsel; SW Mgmt = Sport Waikato management team |
| **Due** | Target completion date |
| **Dependency** | Task(s) that must be complete before this task can begin |
| **Priority** | Critical (launch blocker) / High (required pre-launch) / Medium (required pre-Season 2) |

---

## Category 1: Legal and Compliance (16 tasks)

| # | Task | Owner | Due | Priority | Status | Dependency |
|---|------|-------|-----|----------|--------|-----------|
| L1 | Board approval of prize structure and spot prize compliance model | CEO | May 2026 | Critical | Not Started | Board report presented |
| L2 | Lodge informal DIA enquiry re: spot prize subsidiary model | Shelley / CEO | 15 May 2026 | Critical | Not Started | L1 |
| L3 | Receive DIA response and brief board | CEO | 30 Jun 2026 | Critical | Not Started | L2 |
| L4 | Shelley: Redraft Terms of Participation — prize clause (spot prize language) | Shelley | 31 Jul 2026 | Critical | Not Started | L3 |
| L5 | Shelley: Redraft Season Rules Sections 5, 7, 8 — prize language overhaul | Shelley | 31 Jul 2026 | Critical | Not Started | L3 |
| L6 | Shelley: Review and approve Privacy Policy — consent model | Shelley | 31 Aug 2026 | Critical | Not Started | L4 |
| L7 | Shelley: Review and approve Refund Policy | Shelley | 31 Jul 2026 | High | Not Started | — |
| L8 | Shelley: Website marketing copy — FTA compliance check | Shelley | 31 Jul 2026 | High | Not Started | — |
| L9 | Shelley: Celebrity Ambassador Agreement template — sign-off | Shelley | 30 Jun 2026 | High | Not Started | — |
| L10 | Shelley: Corporate Group Agreement — draft and legal review | Shelley | 31 Aug 2026 | High | Not Started | — |
| L11 | Shelley: Sponsorship Agreement template — sign-off | Shelley | 31 Jul 2026 | Medium | Not Started | — |
| L12 | Shelley: Prize draw documentation protocol — draft | Shelley | 31 Jul 2026 | High | Not Started | L4 |
| L13 | Designate Privacy Officer — name in Privacy Policy | SW Mgmt | 31 Jul 2026 | High | Not Started | — |
| L14 | Document formal breach response procedure | SW Mgmt | 31 Jul 2026 | High | Not Started | L13 |
| L15 | Confirm GST treatment of subscription revenue with accountant | SW Mgmt | 30 Jun 2026 | High | Not Started | — |
| L16 | Obtain HRC ethical review for Living Lab research use of participant data | LL Lead | Before research publication | Medium | Not Started | L6 |

---

## Category 2: Product Build (30 tasks)

### Priority: Critical — Launch Blockers

| # | Task | Owner | Due | Priority | Status | Dependency |
|---|------|-------|-----|----------|--------|-----------|
| P1 | Fix hardcoded statistics in `SeasonStatus.tsx` (alive=42, fallen=158) | Dev | Before any public access | Critical | Not Started | — |
| P2 | Fix hardcoded `waitlistCount = 87` in `PublicBoard.tsx` | Dev | Before any public access | Critical | Not Started | — |
| P3 | Fix `"Survive the month to win"` copy in `Webinar.tsx` | Dev | Before any public access | Critical | Not Started | — |
| P4 | Build Stripe webhook handler — set `paid_at` on subscription confirmation | Dev | 31 May 2026 | Critical | Not Started | — |
| P5 | Add Stripe webhook signature verification to edge function | Dev | 31 May 2026 | Critical | Not Started | P4 |
| P6 | Build midnight elimination cron job (pg_cron at 23:59 NZST) | Dev | 31 Jul 2026 | Critical | Not Started | P4 |
| P7 | Build elimination log table and failure alerting | Dev | 31 Jul 2026 | Critical | Not Started | P6 |
| P8 | Build Redemption Day declaration flow (in-app, before 23:45) | Dev | 31 Jul 2026 | Critical | Not Started | — |
| P9 | TERRA API integration — decision on provider | CEO / LL | 30 Jun 2026 | Critical | Not Started | — |
| P10 | Build Apple Health integration via TERRA | Dev | 31 Jul 2026 | Critical | Not Started | P9 |
| P11 | Build Garmin Connect integration via TERRA | Dev | 31 Aug 2026 | Critical | Not Started | P9 |
| P12 | Build in-app cancellation flow (cancels Stripe subscription) | Dev | 31 Jul 2026 | Critical | Not Started | P4 |

### Priority: High — Required Before Launch

| # | Task | Owner | Due | Priority | Status | Dependency |
|---|------|-------|-----|----------|--------|-----------|
| P13 | Build research consent checkbox at registration (separate tick, db record) | Dev | 31 Jul 2026 | High | Not Started | L6 |
| P14 | Build corporate group disclosure screen (separate acknowledgement) | Dev | 31 Aug 2026 | High | Not Started | L10 |
| P15 | Build sponsor opt-in flow (named sponsor, specific, separate from Terms) | Dev | 31 Aug 2026 | High | Not Started | L11 |
| P16 | Store all consent records with timestamp, version, consent type in database | Dev | 31 Jul 2026 | High | Not Started | P13 |
| P17 | Build in-app account deletion flow (cascades across all tables, cancels Stripe) | Dev | 31 Jul 2026 | High | Not Started | P12 |
| P18 | Build server-side age gate in `create-checkout` edge function | Dev | 31 Jul 2026 | High | Not Started | — |
| P19 | Build prize winner identity verification flow (before prize payment) | Dev | 31 Aug 2026 | High | Not Started | P6 |
| P20 | Build prize draw mechanism in admin backend (random selection, timestamped, logged) | Dev | 31 Aug 2026 | High | Not Started | P6 |
| P21 | Build `prize_draws` table and audit trail | Dev | 31 Aug 2026 | High | Not Started | P20 |
| P22 | Update `Terms.tsx` with spot prize subsidiary language (post Shelley sign-off) | Dev | After L4 | High | Not Started | L4 |
| P23 | Update `Rules.tsx` with spot prize subsidiary language (post Shelley sign-off) | Dev | After L5 | High | Not Started | L5 |
| P24 | Update `Register.tsx` — subscription vs season pass framing | Dev | 31 Jul 2026 | High | Not Started | L7 |
| P25 | Enable GitHub secret scanning (prevent future credential exposure) | Dev | Immediate | High | Not Started | — |
| P26 | Configure Supabase alerts on unusual query volumes / failed auth | Dev | 31 Jul 2026 | High | Not Started | — |
| P27 | Build elimination notification email templates (Resend — eliminated, prize win, season end) | Dev | 31 Aug 2026 | High | Not Started | L4, L5 |
| P28 | Manual activity submission — confirm working, accessible until 23:45 NZST | Dev | 31 Jul 2026 | High | In Progress | — |
| P29 | Agree and document Zone 2 classification data fields (per device platform) | LL / Dev | 30 Jun 2026 | High | Not Started | P9 |
| P30 | Full end-to-end staging test (complete simulated season from registration to season end) | Dev / LL | 15 Sep 2026 | Critical | Not Started | All P tasks |

---

## Category 3: Marketing (12 tasks)

| # | Task | Owner | Due | Priority | Status | Dependency |
|---|------|-------|-----|----------|--------|-----------|
| M1 | Develop REAP brand guidelines and visual asset library | LL / External | 31 Jul 2026 | High | Not Started | — |
| M2 | Set up survivethereap.nz domain and landing page | Dev / LL | 31 Jul 2026 | High | Not Started | M1 |
| M3 | Create pre-launch waitlist mechanism on landing page | Dev | 31 Jul 2026 | High | Not Started | M2 |
| M4 | Set up Instagram, TikTok, Facebook accounts for REAP | LL | 31 Jul 2026 | High | Not Started | M1 |
| M5 | Create Responsible Play / wellbeing page on website | Dev / LL | 31 Aug 2026 | High | Not Started | L4 |
| M6 | Develop social media content calendar (August–November 2026) | LL | 31 Aug 2026 | High | Not Started | M4 |
| M7 | Create shareable elimination notification card (social asset template) | LL / External | 31 Aug 2026 | Medium | Not Started | M1 |
| M8 | Finalise press release (template complete — see REAP-Media-Handling.md) | CEO / LL | 31 Aug 2026 | High | Not Started | L4 |
| M9 | Media training for CEO (gambling Q&A, dark aesthetic, mental health handling) | CEO | Sep 2026 | High | Not Started | M8 |
| M10 | Brief all Sport Waikato staff on REAP brand and dark aesthetic rationale | CEO / LL | 31 Aug 2026 | High | Not Started | — |
| M11 | Develop Friday 13th event concept (Season 1 Day 13 moment) | LL | Sep 2026 | Medium | Not Started | M4 |
| M12 | Create Season 1 onboarding email sequence (welcome, tips, Redemption Day reminder) | Dev / LL | 31 Aug 2026 | High | Not Started | P27 |

---

## Category 4: Partnerships (8 tasks)

| # | Task | Owner | Due | Priority | Status | Dependency |
|---|------|-------|-----|----------|--------|-----------|
| PA1 | Select and approach celebrity ambassador shortlist | CEO / LL | 30 Jun 2026 | High | Not Started | L9 |
| PA2 | Execute celebrity ambassador agreement (minimum 1 confirmed) | CEO | Sep 2026 | High | Not Started | PA1, L9 |
| PA3 | Develop celebrity soft launch content plan (October 2026) | LL | Sep 2026 | High | Not Started | PA2 |
| PA4 | Brief Sport NZ leadership before public launch announcement | CEO | Sep 2026 | High | Not Started | Board approval |
| PA5 | Brief Waikato Regional Council / key funders | CEO | Sep 2026 | High | Not Started | Board approval |
| PA6 | Brief key RST partners on REAP and referral commission model | CEO | Sep 2026 | High | Not Started | Board approval |
| PA7 | Build RST unique referral link system in app | Dev | 31 Aug 2026 | High | Not Started | — |
| PA8 | Identify and approach Season 1 prize sponsor (target: $10,000) | CEO / LL | Sep 2026 | High | Not Started | L11 |

---

## Category 5: Operations (10 tasks)

| # | Task | Owner | Due | Priority | Status | Dependency |
|---|------|-------|-----|----------|--------|-----------|
| O1 | Establish prize fund accounting separation (dedicated fund in SW accounts) | SW Mgmt | 30 Jun 2026 | Critical | Not Started | L1 |
| O2 | Board resolution formally authorising prize fund commitment | Board | May 2026 | Critical | Not Started | L1 |
| O3 | Set up Supabase production environment (separate from development) | Dev | 31 Jul 2026 | High | Not Started | — |
| O4 | Designate REAP Operations Lead (day-to-day season management) | CEO | 31 Jul 2026 | High | Not Started | — |
| O5 | Draft Season 1 Operations Manual (daily monitoring checklist, dispute process, elimination log review) | LL / O4 | 31 Aug 2026 | High | Not Started | O4, P6 |
| O6 | Set up participant support inbox and welfare protocol | LL | 31 Aug 2026 | High | Not Started | — |
| O7 | Establish dispute resolution process (device failure disputes) | LL / SW Mgmt | 31 Aug 2026 | High | Not Started | O5 |
| O8 | Define Season 1 success metrics and minimum thresholds | CEO / LL | 31 Jul 2026 | High | Not Started | L1 |
| O9 | Community scholarship programme design (for Season 2) | LL | Oct 2026 | Medium | Not Started | O8 |
| O10 | Design post-Season 1 review framework (what to measure, who reviews, go/no-go for Season 2) | CEO / LL | 31 Aug 2026 | High | Not Started | O8 |

---

## Category 6: Launch (10 tasks)

| # | Task | Owner | Due | Priority | Status | Dependency |
|---|------|-------|-----|----------|--------|-----------|
| LA1 | Board adoption of all formal Launch Conditions (see REAP-Board-Launch-Conditions.md) | Board | May 2026 | Critical | Not Started | Board report |
| LA2 | All legal sign-offs confirmed (Shelley written approval on record) | CEO | Sep 2026 | Critical | Not Started | All L tasks |
| LA3 | All critical product build items complete and staging-tested | LL / Dev | 15 Sep 2026 | Critical | Not Started | All P tasks |
| LA4 | Celebrity soft launch preparation complete | LL | 1 Oct 2026 | Critical | Not Started | PA2, PA3, LA3 |
| LA5 | Celebrity soft launch execution (limited cohort, October 2026) | LL | Oct 2026 | Critical | Not Started | LA4 |
| LA6 | Post-soft-launch review — issues identified and resolved | LL / Dev | 25 Oct 2026 | Critical | Not Started | LA5 |
| LA7 | Season 1 registration open to public | Dev / LL | 1 Oct 2026 | High | Not Started | LA3, M2, M3 |
| LA8 | Season 1 kick-off communications sent (email + social) | LL | 1 Nov 2026 | Critical | Not Started | LA6, M12 |
| LA9 | Week 1 operational monitoring (daily elimination log review, participant support) | O4 | Nov 2026 | Critical | Not Started | LA8 |
| LA10 | Season 1 post-season review and Season 2 planning | CEO / LL | Dec 2026 | High | Not Started | O10 |

---

## Summary View: Tasks by Due Date

| Period | Tasks Due | Key items |
|--------|----------|-----------|
| **Immediate** | P1, P2, P3, P25 | Hardcoded stats, "survive to win" copy, GitHub scanning |
| **May 2026** | L1, L2, O2, P4, P5 | Board approval, DIA enquiry, Stripe webhook |
| **June 2026** | L3, L9, L15, P6 (start), P9, P29, O1 | DIA response, Zone 2 spec, TERRA decision, prize fund accounting |
| **July 2026** | L4, L5, L7, L8, L12, L13, L14, P6, P7, P8, P10, P12, P13, P16, P17, P18, P24, P25, P26, P28, M1–M4, O3, O4, O8 | Elimination cron, Apple Health, cancellation, consent — heavy build month |
| **August 2026** | L6, L10, L16, P11, P14, P15, P19–P23, P27, P30, M5–M12, PA7, O5–O10 | TERRA completion, staging test, privacy, marketing content |
| **September 2026** | L2 (response), LA2, LA3, PA1–PA6, PA8, M8–M9 | Legal sign-offs, partner briefings, launch prep |
| **October 2026** | LA4–LA7 | Celebrity launch, registration open |
| **November 2026** | LA8, LA9 | Season 1 live |
| **December 2026** | LA10, O9 | Post-season review |

---

## Critical Path

The following tasks form the critical path to Season 1 launch. Any delay in these items delays launch.

```
L1 (Board approval)
  → L2 (DIA enquiry, May 2026)
    → L3 (DIA response, June 2026)
      → L4/L5 (Terms/Rules redraft, July 2026)
        → P22/P23 (Update app with approved language)
        → P27 (Elimination notification templates)
  → O1/O2 (Prize fund accounting separation)

P4 (Stripe webhook)
  → P5 (Webhook verification)
  → P6/P7 (Elimination cron job, July 2026)
    → P20/P21 (Prize draw mechanism)
    → P8 (Redemption Days)

P9 (TERRA decision, June 2026)
  → P10 (Apple Health, July 2026)
  → P11 (Garmin, August 2026)

All P tasks → P30 (Staging test, September 15)
  → LA4 (Celebrity soft launch preparation)
    → LA5 (Celebrity soft launch, October)
      → LA6 (Post-soft-launch fixes)
        → LA8 (Season 1 live, November 1)
```

---

## Open Decisions Required from Board (April 2026)

| Decision | Required by | Context |
|----------|------------|---------|
| Approve spot prize draw structure and compliance model | May 2026 | 7 draws × $666 per season; subsidiary to game product |
| Approve prize fund budget commitment ($9,324 Year 1, $18,648/yr from Year 2) | May 2026 | Funded from SW operational budget, separate from subscriptions |
| Authorise DIA informal enquiry | May 2026 | Pre-emptive regulatory engagement — not a licensing application |
| Authorise legal engagement with Shelley for full sign-off | May 2026 | Budget: $6,000 legal compliance (one-time) + $1,500/yr ongoing |
| Confirm REAP Operations Lead designation | July 2026 | Internal appointment — CEO to recommend |
| Approve celebrity soft launch approach | September 2026 | October 2026 execution — PR and ambassador strategy |

---

*This appendix is filed with the CEO. The live action register is maintained in the REAP Airtable base (Sport Waikato Living Lab workspace). All figures in NZD. Status correct as of April 2026.*
