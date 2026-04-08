# REAP — Governance Framework
**Classification:** Board Confidential | Sport Waikato Living Lab | April 2026
**Status:** Draft for board adoption

---

## Purpose

This document establishes the governance framework for REAP — Survive the Reap — as a Living Lab product of Sport Waikato Incorporated. It defines roles, responsibilities, decision-making authority, accountability structures, operational guardrails, and the ethical framework within which REAP will be developed and operated.

---

## Foundational Position: Living Lab Pilot

**REAP is a Living Lab pilot. It is designed to generate data, test a model, and demonstrate whether a gamified daily-movement product can produce measurable behaviour change in New Zealand adults. It is not a permanent organisational commitment.**

This framing is important for three reasons:

1. **Board risk management.** A pilot that is discontinued after generating data is not a failure. It is a result. The board is not approving a permanent programme — it is approving an experiment with defined parameters and exit conditions.

2. **Funder and public positioning.** Sport Waikato's Living Lab mandate explicitly includes running pilots, generating evidence, and discontinuing what doesn't work. REAP fits this mandate exactly. The Living Lab context is the honest and defensible framing.

3. **Staff and partner management.** Staff working on REAP should understand they are building a research-backed commercial pilot — not a flagship that will be defended regardless of outcomes.

This pilot framing does not diminish ambition. Season 1 should be designed as though REAP will run for ten seasons. The pilot framing is the governance and risk management layer — not the operational mindset.

---

## Governance Structure

### Board of Sport Waikato Incorporated

**Authority:**
- Ultimate accountability for REAP as a Sport Waikato programme
- Approves the launch conditions (see Board Launch Conditions document)
- Approves the prize budget per season ($4,662 per season, 7 × $666)
- Approves significant financial commitments above [threshold: $10,000]
- Receives end-of-season reports from the CEO
- Retains authority to pause or shut down REAP (see Triggers below)
- Must be briefed before any public announcement or significant media engagement

**Composition:** Existing Sport Waikato Board of Trustees.

**Reporting frequency:** End-of-season report after each season; interim report if any Tier 1 trigger event occurs.

---

### CEO — Sport Waikato (Leanne [surname])

**Authority:**
- Executive accountability for REAP operations within board-approved parameters
- External communications, media, and funder relationships
- Escalation point for any participant welfare incident or significant dispute
- Funder briefing (Sport NZ and others) — must be completed before public launch
- Staff resourcing decisions for REAP operations
- Approves operational decisions up to [threshold: $5,000]
- Board reporting

**Responsibilities specific to launch:**
- Lead the funder briefing programme
- Lead media and public narrative — the "dark aesthetic / charitable trust" narrative must be confident and consistent
- Approve any celebrity endorsement engagement

---

### Living Lab Lead / Product Lead (Ash [surname] or designated)

**Authority:**
- Day-to-day product and operational decisions
- Technology vendor and developer management
- Season Rules and operational decisions within the approved framework
- Feature scoping and launch sequencing
- Prize draw documentation and administration
- Escalates to CEO for: welfare incidents, legal questions, financial decisions above [threshold: $2,000]

**Responsibilities:**
- Own the product roadmap
- Manage the developer relationship
- Oversee the test season and confirm the application is launch-ready
- Maintain the prize award audit log (each award timestamped, documented, with selection criterion)
- Produce end-of-season report

---

### Legal Counsel (Shelley [surname] — external)

**Authority:**
- Sign-off authority on all participant-facing documents (Terms, Rules, Privacy Policy, marketing copy, ambassador agreements)
- Written legal advice on gambling law position before launch
- Leads or co-leads DIA informal enquiry
- First point of call for any legal challenge or regulatory contact

**Note:** Legal sign-off is not a rubber stamp. It is a genuine requirement. No participant-facing document publishes without Shelley's written approval.

---

### Developer (external contractor or internal)

**Authority:**
- Technical implementation decisions within approved specifications
- Reports to Living Lab Lead on development progress
- Responsible for security implementation (environment variables, RLS, webhook verification)
- Signs off on technical readiness for launch

**Critical deliverable:** Automated midnight elimination system (cron job at 23:59 NZST). This is the single most important technical deliverable and must be completed and tested before the celebrity soft launch in October 2026.

---

### Finance (Sport Waikato Finance function)

**Responsibilities:**
- Confirm accounting treatment for prize fund (kept separate from subscription revenue — legally required)
- Financial reporting on REAP revenue and costs per season
- Prize fund management (fund maintained in a designated account, separate from subscription revenue)
- Annual budget reporting to board

---

## Decision Authority Matrix

| Decision | Developer | LL Lead | CEO | Board |
|----------|-----------|---------|-----|-------|
| Feature scope changes | Advises | Approves | Informed | — |
| Launch timing | Recommends | Recommends | Approves | Informed |
| Prize budget per season | — | Recommends | Recommends | Approves |
| Ambassador engagement | — | Recommends | Approves | Informed |
| Media statement (reactive) | — | Contributes | Approves | Informed |
| Season pause or shutdown | — | Recommends | Initiates | Approves |
| Legal document publication | — | Initiates | — | — (Shelley approves) |
| New revenue stream (>$10k) | — | Proposes | Recommends | Approves |
| DIA enquiry | — | Supports | Authorises | Informed |
| Welfare incident response | — | First response | Escalation | Informed if serious |
| Subscription price change | — | Proposes | Approves | Informed |

---

## Prize Draw Governance

Prize draw administration must meet the following governance requirements:

**Before each draw:**
- Selection criterion for the draw is published in-app and on the Season Rules page before the measurement period begins
- The eligible participant pool (active survivors, confirmed payment) is identified from the database
- The selection criterion is applied to the eligible pool — no discretion, no amendment

**At each draw:**
- The winner is identified by the system (or by a designated staff member applying the criterion)
- The result is recorded: timestamp, eligible pool size, criterion applied, winner's identifier (anonymised in public records), prize value
- This record is stored in the `prize_awards` table in the database

**After each draw:**
- Winner is notified privately
- Prize is not paid until winner provides proof of identity and age (18+)
- The draw is recorded in the end-of-season report to the board

**Independent verification:** Sport Waikato should determine whether an independent third party (a board member, an auditor, or a designated observer) should witness at least one draw per season. This is recommended.

---

## Triggers for Pause or Shutdown

### Tier 1 — Immediate Operational Pause + Same-Day Board Notification

Any of the following triggers an immediate operational pause (no new eliminations, no prize draws, marketing suspended) and same-day notification to the board chair:

- DIA formally indicates REAP constitutes unlicensed gambling or requires a licence
- A participant welfare incident (hospitalisation, mental health crisis) plausibly connected to REAP participation or an elimination notification
- A systematic technical failure producing incorrect eliminations affecting more than 5% of active participants on any given night
- Any court order, regulatory action, or formal legal notice received by Sport Waikato
- A privacy breach affecting personal or health data of any number of participants

### Tier 2 — Board Review Within 72 Hours (Season May Continue)

- Sustained public criticism campaign on safety, ethical, or charitable mandate grounds
- A funder formally expressing concern about REAP or threatening to withdraw support
- A celebrity participant publicly and materially misrepresenting the product in a way that cannot be promptly corrected
- Staff welfare incident related to REAP operations (e.g., staff receiving abuse from participants)

### Season Termination Criteria

Season termination (ending the current season early, before Day 30) requires board resolution and is appropriate when:
- Tier 1 trigger cannot be resolved within 72 hours
- Legal advice is that continuation creates unacceptable liability
- Technical failure cannot be remediated within 48 hours

**On season termination:** All active participants are notified, subscription billing is paused, a refund decision is made with legal advice (default: pro-rata refund for remaining days), and a communication plan is executed.

---

## Legal Sign-Off Requirements

**Nothing publishes without Shelley's written approval.** This is a standing rule, not a case-by-case decision.

| Document | Required before | Shelley sign-off |
|----------|----------------|------------------|
| Terms of Participation | Any participant registration opens | Written approval |
| Season Rules | Any participant registration opens | Written approval |
| Privacy Policy | Website goes live | Written approval |
| Website marketing copy | Website goes live | Written approval |
| Celebrity Ambassador Agreements | Ambassador engagement confirmed | Written approval |
| Refund Policy | Website goes live | Written approval |
| Prize structure disclosure | Season starts | Written approval |
| Corporate Group Agreement template | Corporate sales begin | Written approval |

---

## Reporting Schedule

| Report | Frequency | Author | Recipient |
|--------|-----------|--------|-----------|
| End-of-season report | Each season | LL Lead | Board |
| Financial summary (revenue, costs, prize fund) | Each season | Finance | CEO + Board |
| Welfare incident log | Quarterly or on event | CEO | Board |
| Legal compliance status | Before each new season | CEO + Legal | Board |
| Data/research summary | Annual | Living Lab | Board + Sport NZ |

---

## Living Lab Separation — Forward Note

The current governance structure positions REAP as a programme of Sport Waikato. As REAP grows and the Living Lab develops additional commercial products, there may be a strategic case for establishing the Living Lab as a separate legal entity (company, subsidiary, or charitable trust) to:
- Ring-fence commercial risk from Sport Waikato's core charitable operations
- Enable the Living Lab to pursue commercial opportunities that fall outside Sport Waikato's charitable mandate
- Provide clearer IP ownership and commercial freedom
- Enable Living Lab staff (including Leanne and Ash) to hold equity or ownership in the commercial entity

This structural question is identified for board consideration in Year 2. A separate action plan document (REAP-Living-Lab-Separation.md) covers the options and transition framework. No structural change should proceed without board resolution and dedicated legal and tax advice.

---

*Document prepared: April 2026 | Status: Draft for board adoption*
*Review: Before board approval meeting | Owner: CEO*
