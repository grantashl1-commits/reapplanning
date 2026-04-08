# REAP — TO DO List
**Living document** | Sport Waikato / The Living Lab | Started: April 2026
**Classification:** Internal — not for participant-facing use

---

## SECTION A: PRIVACY STATEMENT — COPY-PASTE SECTION

> *Ready to insert into the REAP Privacy Policy. Requires legal sign-off by Shelley [Surname] before publication.*

---

### Privacy Policy: Your Activity Data and How We Use It

#### What Data We Collect

When you use REAP, Sport Waikato Incorporated collects the following categories of personal information:

**Account data:** Name, email address, date of birth, and password (stored as a secure hash — never in plain text).

**Activity data:** Daily movement records synced from your connected device or application, including total active minutes, activity type, and where provided by your device, heart rate and movement pattern data. This is health information under the Privacy Act 2020 and is treated with the highest level of care.

**Game data:** Your season entry status (alive, fallen, waitlisted), daily activity logs, elimination dates, season history, Redemption Day usage, and leaderboard position.

**Payment data:** Subscription status and payment confirmation timestamps. Full payment card details are never stored by Sport Waikato — these are held by Stripe, our payment processor, under their own privacy and security standards.

**Device and connectivity data:** The name and type of connected fitness application or device you use to sync activity data. We do not collect GPS location data beyond what your connected application provides as part of an activity record.

---

#### Why We Collect It

| Data type | Primary purpose |
|-----------|----------------|
| Account data | Identity, authentication, age verification, communication |
| Activity data | Verifying daily 21-minute movement threshold; operating the survival game |
| Game data | Operating the season, leaderboard, and elimination mechanics |
| Payment data | Confirming subscription status and prize eligibility |

We collect this data because the product cannot function without it. Activity verification is the entire mechanic of REAP — we cannot operate a daily elimination system without daily activity records.

---

#### Health Information — Heightened Protections

Activity data — particularly heart rate data, movement patterns, and daily physical activity records — is **health information** under the Privacy Act 2020. Health information is a category of sensitive personal information that attracts heightened legal protections.

Sport Waikato will:
- Collect health information only to the extent necessary to operate the game (the 21-minute daily threshold check)
- Not sell, licence, or transfer health information to any third party for commercial purposes
- Not share individual-level health information with sponsors or partners without your explicit, specific, and separately obtained consent
- Store health information in encrypted form and restrict access to authorised Sport Waikato personnel only
- Delete your health information on account closure, subject to the retention periods below

---

#### Research Use — The Living Lab

Sport Waikato operates REAP through its Living Lab initiative, which conducts population health research into physical activity behaviour change. We may use your de-identified activity data as part of this research.

**What "de-identified" means:** Your name, email address, and any other directly identifying information is removed before data is used for research. Activity records are analysed as part of aggregated datasets. Individual participants are not identifiable in any research output.

**This is a separate consent.** Research use of your data is not a condition of your subscription and is not bundled into the main Terms of Participation. You will be asked to give or withhold consent to research use separately, during the registration process. You may withdraw research consent at any time by contacting us at [email address] — this will not affect your subscription or participation.

**Ethical oversight:** Any research publication or external data use involving REAP participant data will be conducted in accordance with Health Research Council ethical standards and will not proceed without appropriate ethical review where required.

---

#### Sponsor Data Sharing

REAP may have commercial relationships with sponsors (e.g., health organisations, fitness brands, or wellness companies). **We will never share your individual personal or activity data with any sponsor without your explicit, specific, and separately given consent.**

If a sponsor offers a benefit to REAP participants (for example, a discount, product, or service) in exchange for data access, you will be asked whether you wish to participate in that specific arrangement. This consent:
- Is specific to the named sponsor
- Specifies exactly what data will be shared
- Is entirely voluntary — declining will not affect your REAP participation
- Can be revoked at any time by contacting us at [email address]

Your consent to sponsor data sharing is never bundled with your subscription agreement, your Terms acceptance, or any other consent. You will be asked separately, clearly, and with the choice to decline.

---

#### Corporate Group Participants

If you are participating in REAP as part of a corporate group (where your employer or a health organisation has sponsored a group entry), the following applies:

Your individual activity data is **not** shared with your employer or the sponsoring organisation. The group sponsor receives only **aggregated, group-level statistics** — for example, the percentage of the group still active at Week 2, or the group's average daily active minutes. These figures do not identify individuals.

**Small group caveat:** In groups of fewer than [10] participants, aggregated statistics may be suppressed or presented in ranges rather than precise figures, where there is a risk that individual participants could be identified from group-level data. Sport Waikato will take reasonable steps to prevent inadvertent identification in small groups.

You will be informed at the time of enrolment that you are participating as part of a corporate group and that aggregated group data will be provided to the sponsoring organisation. This disclosure will be made separately from the main Terms acceptance.

---

#### Data Retention

| Data type | Retention period |
|-----------|-----------------|
| Account data | Held while account is active + 12 months after account closure |
| Activity data | Held for the duration of your account + 24 months for research aggregation |
| Game data (season history) | Held for the duration of your account + 12 months |
| Payment data | Transaction records held for 7 years (Inland Revenue Act requirements) |

On account closure, you may request deletion of all personal data. We will delete all data except records required by law (e.g., financial transaction records) and any de-identified research data already incorporated into aggregated datasets (which cannot be identified or retrieved as individual records).

---

#### Your Rights Under the Privacy Act 2020

You have the right to:
- **Access** the personal information we hold about you — request a copy at any time
- **Correct** personal information that is inaccurate or outdated
- **Delete** your account and associated personal data (subject to legal retention requirements above)
- **Withdraw consent** for research use or sponsor data sharing at any time
- **Complain** to the Privacy Commissioner if you believe your privacy rights have been breached — see [privacy.org.nz](https://www.privacy.org.nz)

To exercise any of these rights, contact: [Email address]

We will respond to all privacy requests within 20 working days.

---

#### Data Breach Notification

In the event of a privacy breach that is likely to cause serious harm to any participant, Sport Waikato will notify the Privacy Commissioner and affected individuals as required under the Privacy Act 2020. We maintain an internal incident response procedure for this purpose.

---

#### Contact

Sport Waikato Incorporated
[Physical address]
[Email address]
Privacy Officer: [Name / role]

---
---

## SECTION B: APP IMPLEMENTATION — THINGS TO BUILD AND ENFORCE

*These are specific technical and process measures that protect Sport Waikato legally and in practice. Each item maps to a legal risk identified in the lawyer summary or compliance audit.*

---

### B1 — Consent Architecture (Build Before Launch — CRITICAL)

**The problem:** Under the Privacy Act 2020, consent must be specific, informed, voluntary, and not bundled. A single "I agree to the Terms" checkbox does not constitute valid consent for research use, sponsor data sharing, or corporate group data disclosure.

**What to build:**

- [ ] **Separate research consent checkbox** on the registration screen — standalone, opt-in, with a plain-English explanation: *"Sport Waikato's Living Lab may use your de-identified activity data for health research. Tick to consent. This is optional and will not affect your participation."*
- [ ] **Separate sponsor opt-in flow** — triggered only when a sponsor arrangement exists. Must name the sponsor, specify what data is shared, and be presented as a separate decision after registration is complete. Never bundled with subscription checkout.
- [ ] **Corporate group disclosure screen** — shown to any participant joining via a group invite code. Must state: who the sponsoring organisation is, what aggregated data they receive, and that individual data is not shared. Requires a separate acknowledgement tick before the group join completes.
- [ ] **All three consent records stored in the database** — with timestamp, consent version, and IP address for audit purposes. If a participant later disputes consent, Sport Waikato needs to prove it was given.

---

### B2 — Data Minimisation (Architecture — Before Launch)

**The problem:** Collecting more health data than necessary increases legal exposure. Every data point that isn't needed for the 21-minute threshold check is a liability without a benefit.

**What to enforce:**

- [ ] **Only collect what you need:** The elimination mechanic requires total Zone 2 minutes per day. It does not require GPS route data, exact heart rate readings at every moment, or sleep data. Configure connected app integrations to request only the minimum necessary permissions.
- [ ] **Review Supabase schema:** Audit every column in `daily_activity`, `season_entries`, and `profiles` tables. Delete or stop collecting any fields that are not actively used in the product.
- [ ] **Connected app permission scopes:** When users connect Garmin, Apple Health, Strava etc., request only the permission scope needed (activity minutes) — not full health data access if the API allows a narrower scope.

---

### B3 — Data Deletion and Account Closure (Build Before Launch)

**The problem:** If a participant asks for their data to be deleted and Sport Waikato has no mechanism to do it, that is a Privacy Act breach.

**What to build:**

- [ ] **In-app "Delete my account" button** in Account Settings. When activated:
  - Cancels the Stripe subscription
  - Flags the account for deletion in the database
  - Deletes all personal identifiers (name, email, DOB) within 30 days
  - Retains anonymised game statistics (days survived, season number) for research aggregation with no link back to the individual
  - Sends a confirmation email to the user
- [ ] **Supabase Row Level Security (RLS)** already limits data access per user — ensure the deletion process cascades correctly across all tables.
- [ ] **Document the deletion process** so any Sport Waikato staff member can execute it if the automated process fails.

---

### B4 — Sponsor Data Sharing Controls (Before Any Sponsor Agreement Is Signed)

**The problem:** Even with the right consent language, if the technical data pipeline allows sponsor access beyond what was consented to, Sport Waikato is exposed.

**What to build:**

- [ ] **No direct database access for sponsors.** Sponsors receive data via a controlled export or dashboard — never a direct Supabase connection or SQL access.
- [ ] **Corporate group dashboard shows only aggregate stats** — the database query producing this output must enforce minimum group size suppression (e.g., `WHERE group_size > 9`) before returning percentages.
- [ ] **Sponsor export logs** — every data export to a sponsor is timestamped and logged in an `audit_log` table. Columns: sponsor ID, data type exported, date, authorising staff member.
- [ ] **Consent check before export** — any individual-level data export (even for an opted-in participant) must check the participant's `research_consent` or `sponsor_consent` flag in the database before including their record.

---

### B5 — Security Measures for Health Data (Before Launch — CRITICAL)

**The problem:** A data breach involving health-related activity data is a mandatory-notification event under the Privacy Act 2020. Prevention is far cheaper than notification and remediation.

**What to enforce:**

- [ ] **Supabase Row Level Security enabled on all tables** — users can only read/write their own records. Admin access requires the `ADMIN_EMAILS` array check already built into `Admin.tsx`.
- [ ] **Environment variables for all secrets** — already done for admin passwords (April 2026 fix). Verify Stripe secret key, Supabase service role key, and Resend API key are all in Supabase secrets, not in source code.
- [ ] **GitHub secret scanning enabled** — configure GitHub to alert on any accidental credential commit. Already flagged as a post-breach requirement; should be set up before next push.
- [ ] **HTTPS enforced everywhere** — Lovable hosting enforces this by default; confirm before go-live.
- [ ] **Stripe webhook signature verification** — the `stripe-webhook` edge function must verify the `stripe-signature` header on every incoming webhook. A spoofed payment confirmation could set a non-paying participant's status to `ALIVE` — a fraud and data integrity issue.
- [ ] **No sensitive data in logs** — ensure Supabase edge function logs do not contain personal data, activity details, or payment information. Logs are accessible to developers and are not subject to the same controls as the database.
- [ ] **Password minimum 8 characters enforced server-side** — already fixed in `Register.tsx` client-side; confirm the Supabase `auth.users` password policy matches.

---

### B6 — Breach Response Procedure (Document Before Launch)

**The problem:** Under the Privacy Act 2020, Sport Waikato must notify the Privacy Commissioner (and affected individuals) if a breach is likely to cause serious harm. Without a documented procedure, the response will be slow and inconsistent — making the legal exposure worse.

**What to document:**

- [ ] **Incident classification guide** — what constitutes a "notifiable breach"? (Answer: any breach of health/activity data for more than a handful of users, any breach involving financial data, any breach involving an unauthorised third party accessing personal data.)
- [ ] **Response steps:**
  1. Contain — revoke compromised credentials, block affected access
  2. Assess — scope of exposure, data types involved, number of individuals
  3. Notify — Privacy Commissioner within 72 hours if serious harm likely; affected individuals as soon as practicable
  4. Document — maintain a breach register regardless of whether notification is required
- [ ] **Designated Privacy Officer** — name a specific Sport Waikato staff member responsible for privacy incidents. Include their name in the Privacy Policy.
- [ ] **Supabase alert configuration** — set up email alerts for unusual query volumes or failed authentication attempts.

---

### B7 — Research Consent and Ethics (Before Any Research Publication)

**The problem:** The Living Lab wants to use REAP data for health research. "De-identified" is not a binary — it is a spectrum. Small datasets can re-identify individuals even without names.

**What to do:**

- [ ] **Obtain Health Research Council ethical review** before any research involving REAP participant data is submitted for publication or shared externally. This is standard practice for health data research regardless of whether data is de-identified.
- [ ] **Minimum dataset size for research outputs** — establish an internal policy that no research output reports on a group of fewer than [20] participants where individual records could be inferred.
- [ ] **Separate research database** — de-identified research exports should be held in a separate database or storage bucket from the live operational data. Research analysts should not have access to the operational (identified) database.
- [ ] **Research consent withdrawal mechanism** — if a participant withdraws research consent, their records must be removable from any research dataset that has not yet been published. Define the practical cutoff point (e.g., consent can be withdrawn until data is incorporated into an aggregated dataset, after which individual withdrawal is not possible but new data collection stops).

---

### B8 — Age Verification for Health Data Collection (Before Launch)

**The problem:** Collecting health data from a minor is a heightened risk. The current client-side age check is bypassable.

**What to build:**

- [ ] **Server-side age gate in `create-checkout` edge function** — already listed in compliance audit (Issue C8). Block checkout if `profiles.dob` does not confirm 18+ at time of payment.
- [ ] **Prize winner identity verification** — before any prize is paid, require the winner to provide proof of identity and age (passport, driver's licence). Document this requirement in the Season Rules.
- [ ] **Under-18 data deletion protocol** — if a minor is identified post-registration, delete their account and all associated data immediately.

---

### B9 — Retention Audit (Before Year 2)

**The problem:** Data sitting in the database indefinitely with no deletion policy is a Privacy Act breach waiting to happen and increases breach exposure.

**What to do:**

- [ ] **Implement automated retention policies in Supabase** — use a scheduled edge function or pg_cron job to flag accounts inactive for 12+ months post-cancellation for deletion review.
- [ ] **Annual data audit** — once per year, review what data is held, whether it is still necessary, and delete anything that isn't.
- [ ] **Research data archive** — after the retention period, move de-identified research data to cold storage (separate from the live database) and delete all operational records associated with closed accounts.

---

## SECTION C: OUTSTANDING LEGAL TASKS (Privacy-Specific)

*From the lawyer summary (April 2026) — for Shelley's action list.*

| Task | Priority | Owner | Target Date |
|------|----------|-------|------------|
| Review and redraft Privacy Policy consent sections (Scenarios 1, 2, 3) | CRITICAL | Shelley | 30 June 2026 |
| Draft compliant opt-in consent form template for sponsor data sharing | HIGH | Shelley | 30 June 2026 |
| Advise on corporate group aggregated data sharing — individual consent required? | HIGH | Shelley | 30 June 2026 |
| Advise on research consent — blanket Terms consent sufficient, or separate HRC-standard consent? | HIGH | Shelley | 30 June 2026 |
| Designate Privacy Officer — name in Privacy Policy | MEDIUM | SW Management | 31 July 2026 |
| Implement server-side age gate (developer task) | HIGH | Developer | 31 July 2026 |
| Build in-app account deletion flow (developer task) | HIGH | Developer | 31 July 2026 |
| Build research consent checkbox at registration (developer task) | CRITICAL | Developer | 31 July 2026 |
| Document breach response procedure | HIGH | SW Management | 31 July 2026 |
| Obtain HRC ethical review for Living Lab research use | MEDIUM | Living Lab | Before any research publication |

---

*All privacy statement content requires legal sign-off by Shelley [Surname] before publication. App implementation items should be reviewed against the final approved Privacy Policy before build to ensure technical measures match legal commitments.*

---

## SECTION D: DARK AESTHETIC — BOARD AND FUNDER BRIEFING STRATEGY

### The Risk

Sport Waikato receives public funding. "THE KILLER MOVEMENT APP" from a publicly-funded charitable trust will attract scrutiny — particularly if the concept receives broad media coverage before there is a clear, confident public narrative about why it was designed this way. The risk is not that people misunderstand the product. The risk is that the gap between "charitable trust" and "survival game" becomes a sustained talking point that undermines confidence in Sport Waikato's core programmes.

**Board members and funders must be briefed before launch, not after.**

---

### How to Brief the Board

**Frame it as behavioural science, not entertainment.** The dark aesthetic is not a creative choice made for shock value. It is the product of a deliberate decision: reach the people who won't respond to gentle wellness messaging. The 1.8 million New Zealand adults who are insufficiently active have already been exposed to positive, encouraging fitness campaigns. They haven't moved. REAP takes a different approach because the same approach hasn't worked.

**Use this framing with trustees:**
> *"The dark aesthetic is the mechanism, not the message. It signals to our target audience — people who find ordinary wellness campaigns condescending or ineffective — that this is something different. It is designed to attract people who have failed at fitness before and need a new kind of accountability. That's a legitimate design choice backed by behavioural science. We are not glamourising harm. We are naming consequence."*

**Address the tension directly, don't soften it:**
> *"We know 'THE KILLER MOVEMENT APP' sounds unusual from a charitable trust. We're naming it that way on purpose. The word 'killer' is earned — the game has a real elimination mechanic with real daily consequences. The people we most need to reach are the ones who will see that name and think: this is actually serious. That's the audience we're building for."*

**The charitable mandate argument:**
> *"A charitable trust that plays it safe and reaches no-one is not fulfilling its mandate. We have the research infrastructure, the funding, and the network to try something genuinely new. If we don't do this, someone else will — probably with less care, less research rigour, and no charitable purpose. We're doing this right, or we're ceding the space."*

---

### Briefing Sequence (before any public announcement)

| Audience | Who briefs | When | Format |
|---------|-----------|------|--------|
| Sport Waikato Board | CEO (Leanne) | Before board approval meeting | Full board paper + verbal |
| Sport NZ | CEO | Before public launch announcement (Sep 2026) | 1:1 briefing meeting |
| Waikato Regional Council reps (if funders) | CEO | September 2026 | Written brief or meeting |
| Sport Waikato staff | Living Lab Lead + CEO | August 2026 | All-staff session |
| Key RST partners | CEO | September–October 2026 | Phone/email brief |

**Key message for all briefings:** REAP is a Living Lab pilot. It is an evidence-based experiment with defined parameters and a documented exit plan. Bold, yes. Irresponsible, no.

---

### Staff Internal Brief: Why We're Going Bold

*For use by Living Lab Lead and CEO when briefing Sport Waikato staff who may be uncomfortable with the aesthetic.*

Some of you will find the REAP brand uncomfortable. That's a reasonable reaction from people who work in community sport and wellness — environments built on encouragement, inclusion, and positive framing. REAP looks different to that.

Here's why it is that way, and why we believe it's right:

The people we most need to reach — the 1.8 million New Zealanders who aren't meeting WHO activity guidelines — have largely already been exposed to positive fitness messaging and it hasn't changed their behaviour. They don't need another encouraging app. They need something that makes daily movement feel genuinely consequential.

Loss aversion is one of the most robust findings in behavioural science. People work twice as hard to avoid a loss as to achieve an equivalent gain. That is what REAP is built on. The dark aesthetic, the elimination mechanic, the $13 stake — these are not arbitrary. They are the delivery mechanism for an evidence-based intervention.

Sport Waikato has the resources, the mandate, and the Living Lab infrastructure to try this. If we go timid, we produce another wellness product that nobody remembers. If we go bold, we might produce something that genuinely changes behaviour at scale — and funds community programmes while doing it.

This is what the Living Lab exists for. We went big. We went bold. We went different. And we need every member of this team to be able to explain why.

---

## SECTION E: ELIMINATION MECHANIC — VULNERABLE PARTICIPANT GUIDANCE

### The Risk (stated plainly)

REAP eliminates participants at midnight if they don't move. For most people, it is a game consequence. For someone experiencing depression, anxiety, chronic illness, bereavement, or a mental health crisis, it is a notification at midnight telling them they have failed.

None of the mitigations below fully eliminate this risk. The risk is real and must be documented and owned. See REAP-Product-Harm-Protocol.md for the full welfare response framework.

---

### Specific Text: Elimination Notification Copy

**Approved notification copy (non-punishing, honest, forward-looking):**

*Primary notification (push/email at 23:59 or just after midnight):*

> **You've been eliminated from REAP Season [X].**
>
> You survived [X] days. That's [X] days of 21 minutes you actually did.
>
> Today it didn't happen. That's okay — life is like that sometimes.
>
> Season [X+1] opens [date]. You can be back.
>
> *If things are tough right now, Lifeline is 0800 543 354. Available 24/7, free.*
>
> — The REAP Team

**What this copy does:**
- Acknowledges survival count (positive: reframes what they DID achieve)
- Doesn't shame or punish ("that's okay — life is like that sometimes")
- Points forward to re-enrolment immediately
- Includes crisis resource without making it the focal point
- Signed by "The REAP Team" (human, not automated-feeling)

**What this copy does NOT do:**
- No "ELIMINATED" in large dramatic font
- No grim reaper imagery in the elimination notification itself
- No leaderboard position or comparison to others
- No encouragement to share the elimination card until 24 hours later (allow the immediate sting to pass)

---

### Specific Text: Pre-Participation Health Screening

**To appear on a dedicated screen during registration, before payment:**

> **Before You Join — A Few Things to Know**
>
> REAP is a game with real daily consequences. That's what makes it work. Before you commit, we want to be honest about what it involves.
>
> **Every day, you need 21 minutes.** Miss one day without using a Redemption Day, and you are eliminated. The game doesn't know it's your worst week of the year.
>
> **Eliminations happen at midnight.** You will receive a notification. If you're going through a difficult time, that notification may land harder than expected.
>
> **We recommend you don't join right now if:**
> - You're in the middle of a mental health crisis or acute episode of depression or anxiety
> - You're recovering from an eating disorder, particularly with a history of compulsive exercise
> - You're in a period of acute grief or trauma (recent bereavement etc.)
> - Your GP has advised you to avoid daily moderate exercise
>
> **If you're unsure, speak to your GP first.** There will be another season.
>
> If you're in a good place and ready for the challenge — we'd love to have you.
>
> ☐ **I confirm I have read the above and I'm ready to participate.**

**Notes on this screen:**
- This screen must appear as a separate step — not buried in Terms text
- The checkbox is required before payment proceeds
- The checkbox is stored in the database with timestamp (legal evidence that the screening was presented)

---

### Specific Text: Website — Responsible Play Page

*Suggested page: survivethereap.nz/wellbeing or linked from the registration flow*

> **REAP is a game. Games have consequences. We designed it that way — on purpose.**
>
> The elimination mechanic is not decoration. It is the mechanism through which REAP creates the daily accountability that most fitness products can't. If you don't move for 21 minutes, something real happens. That reality is what makes it work.
>
> We also know that real life is complicated. The game doesn't pause for illness, bereavement, or a bad week. That's why we built Redemption Days. And it's why we built this page.
>
> **If you're going through something difficult right now, it's okay to sit this season out.** The next one will be there. Your health is more important than your survival streak.
>
> **If you're in REAP and struggling:**
> Contact us at [email]. A real person will respond.
>
> **If you need support right now:**
> - Lifeline: 0800 543 354
> - Need to Talk: 1737 (text or call)
> - Mental Health Foundation: mentalhealth.org.nz

---

## SECTION F: DEVICE INTEGRATION AND AUTOMATIC ELIMINATION — TASK LIST

### Celebrity / Device Note

- [ ] **Celebrity Ambassador Agreement** — draft complete (see REAP-Celebrity-Ambassador-Agreement.md). Requires legal sign-off before execution. CEO to select ambassador shortlist from Tier 1 recommendations by June 2026.
- [ ] **Contractual note:** All ambassador agreements must include the specific restriction against describing prizes as gambling/lottery (Clause 3.1). This is non-negotiable.

---

### Device Integration — Action Items

**Current state:** No wearable device integrations exist. This is a critical build item for launch.

- [ ] **Evaluate TERRA API** for unified device integration (TERRA provides a single API connecting Apple Health, Garmin Connect, Fitbit, Strava, Google Fit, Polar, Whoop, Samsung Health). This approach significantly reduces the engineering complexity of supporting multiple device APIs. **Decision required by: June 2026.**
- [ ] **Minimum integration for launch:** At minimum, Apple Health and Garmin Connect must work reliably end-to-end before Season 1 opens. These two platforms cover the majority of the NZ wearable market.
- [ ] **Manual submission fallback:** Must be working before launch as a backstop for all device integration failures. Available until 23:45 NZST daily.
- [ ] **Zone 2 classification:** Agree on the specific data fields and threshold used to classify an activity as Zone 2 for each integrated platform. Document this in the Season Rules so participants understand exactly what counts.
- [ ] **Late sync handling:** Define the policy for activity data that arrives in the REAP database after midnight but was recorded before midnight (e.g., device syncs at 00:05 but activity completed at 23:30). This edge case must be handled consistently and documented.

---

### Automatic Elimination — CRITICAL BUILD TASK

**Current state:** No automated elimination system exists. This is the single most important technical item before launch. Without it, Season 1 cannot run.

- [ ] **Build midnight elimination cron job** — Supabase pg_cron scheduled job at 23:59 NZST (12:59 UTC if NZ is NZST, or 11:59 UTC during NZDT). The job must:
  1. Query all `ALIVE` participants in the current season
  2. Check `daily_activity` for each participant — has `zone2_minutes >= 21` been recorded for today?
  3. Check `redemption_days` — is today a declared Redemption Day for this participant?
  4. For any participant where neither condition is met: set `season_entries.status = 'FALLEN'`, record `eliminated_at` timestamp
  5. Trigger the elimination notification (push notification or email via Resend)
  6. Log the elimination run in an `elimination_log` table with: run timestamp, participant count checked, eliminations triggered, any errors
- [ ] **Test the elimination system** in a staging environment before celebrity soft launch. Test with a small internal cohort first.
- [ ] **Failure handling:** If the elimination job fails to run on any given night, alert must be sent immediately to the Living Lab Lead. Manual override must be possible. A missed elimination run must be recoverable within 30 minutes.
- [ ] **TERRA API integration feeds into elimination logic** — the Zone 2 minutes data from TERRA must land in `daily_activity` before 23:59 for the elimination job to read it correctly. Confirm TERRA's typical data latency before building the integration.

---

## SECTION G: DOCUMENT INDEX — ALL REAP DOCUMENTS

| Document | Location | Status | Legal sign-off needed |
|----------|----------|--------|----------------------|
| REAP-TO-DO-List.md | Downloads | Living document | No |
| REAP-Board-Launch-Conditions.md | Downloads | Draft | Board adoption |
| REAP-Celebrity-Ambassador-Agreement.md | Downloads | Draft | Shelley |
| REAP-Competitive-Strategy.md | Downloads | Draft | No |
| REAP-Governance.md | Downloads | Draft | Board adoption |
| REAP-Media-Handling.md | Downloads | Draft | CEO review |
| REAP-Future-Products.md | Downloads | Draft | No |
| REAP-Living-Lab-Separation.md | Downloads | Draft | Legal + Board |
| REAP-Product-Harm-Protocol.md | Downloads | Draft | Board adoption |
| REAP-Reputation-Protection.md | Downloads | Draft | CEO review |
| REAP-Sponsorship-Contract.md | Downloads | Draft | Shelley |
| REAP-Terms-Additions.md | Downloads | Draft | Shelley |
| REAP-refund-policy-section.md | Downloads | Draft | Shelley |
| REAP-gambling-framing-strategy.md | Downloads | Draft | Internal only |
| REAP-gambling-compliance-section.md | Downloads | Draft | Shelley |
| REAP-lawyer-summary.md | Downloads | Working document | Shelley |
| REAP-Appendix-A-Legal-Compliance-Audit.md | Downloads | Draft (updated Apr 2026 — spot prize model) | Shelley |
| REAP-Appendix-B-Financial-Model.md | Downloads | Draft | Board adoption |
| REAP-Appendix-C-Product-Architecture.md | Downloads | Draft | CEO review |
| REAP-Appendix-D-Action-Plan.md | Downloads | Draft (86 tasks) | Board adoption |
| BOARD-BUDGET-REPORT.md | survive-the-reap folder | Draft | Board adoption |
