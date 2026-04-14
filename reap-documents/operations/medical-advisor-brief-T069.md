# Medical Advisor Engagement Brief: Survive the Reap
**Task:** T069 — Medical Advisor Engagement  
**Owner:** Leanne  
**Due:** 2026-07-01  
**Priority:** High  
**Document Version:** 1.0  
**Date Prepared:** April 9, 2026  
**Prepared by:** Sport Waikato — REAP Project Team

---

## 1. Executive Summary

Sport Waikato is engaging an independent medical advisor to review the clinical appropriateness of the Survive the Reap (REAP) exercise protocols and participant welfare procedures before the public launch on 1 November 2026. This engagement is advisory in nature. The medical advisor is not a clinical supervisor, is not involved in individual participant care, and bears no ongoing liability for participant health outcomes. The engagement produces a written advisory opinion and annotated protocol documents that Sport Waikato uses to strengthen its welfare framework and demonstrate due diligence to its board, funders, and insurers.

---

## 2. About Survive the Reap

| Attribute | Detail |
|---|---|
| Product | 30-day fitness survival game |
| Operator | Sport Waikato (registered charitable trust, Hamilton, NZ) |
| Cost | NZ$13/month subscription |
| Activity requirement | 21+ continuous minutes of Zone 2 heart rate activity per calendar day (midnight–midnight NZT) |
| Zone 2 definition | 60–70% of estimated maximum heart rate (Tanaka formula) |
| Elimination rule | Fail to meet daily requirement → eliminated at midnight NZT |
| Season 1 launch | 1 November 2026 |
| Beta (soft launch) | October 2026, 50 participants |
| Target audience | Active adults 18+, Waikato/NZ |
| Stack | React/TypeScript/Supabase/Stripe/Resend/TERRA API |

**Prize:** $666 in spot prizes across 7 draws during the season.

---

## 3. Role Scope and Nature of Engagement

### 3.1 What the Medical Advisor Is Asked to Do

The medical advisor is engaged to:

1. **Review** Sport Waikato's exercise protocol specification, health screening questionnaire, welfare incident response procedures, and elimination welfare check criteria for clinical appropriateness.
2. **Identify** any conditions or population groups for whom the daily Zone 2 protocol poses an elevated or unacceptable risk.
3. **Annotate** provided protocol documents with comments, recommendations, and suggested changes.
4. **Provide** a written sign-off letter (or qualified advisory letter) confirming that the protocols are reasonable for a general adult active population with appropriate screening.
5. **Be available** on an on-call consulting basis during Season 1 (1 November – 30 November 2026) for escalation of Tier 2 welfare incidents.

### 3.2 What the Medical Advisor Is NOT Asked to Do

- Provide individual clinical care or medical advice to any participant.
- Assess individual fitness or suitability for any participant.
- Act as a named supervisor, clinical governance lead, or responsible clinician.
- Provide medico-legal indemnification for Sport Waikato.
- Respond to emergency welfare incidents (emergency services remain the first response for all acute events).

### 3.3 Liability Boundary

The medical advisor provides a consulting opinion on the reasonableness of Sport Waikato's protocols. They are not responsible for participant health outcomes. Their engagement letter will clearly delineate this boundary. Sport Waikato maintains its own liability insurance and does not expect the medical advisor to indemnify the programme.

---

## 4. Specific Review Areas

### 4.1 Zone 2 Exercise Protocol

**Scope:** The advisor reviews whether a daily requirement of 21+ continuous minutes at 60–70% maximum heart rate (Zone 2) is clinically appropriate for a general adult recreational population aged 18+.

**Key questions for the advisor:**
- Is 21 minutes at 60–70% max HR a medically reasonable minimum daily movement target for healthy adults?
- Are there documented risks of cumulative daily Zone 2 exercise over a 30-day period that Sport Waikato should communicate to participants?
- Is the "continuous" requirement (i.e., no session-splitting) clinically defensible or does it create unnecessary risk for certain populations?
- What is the appropriate maximum duration per session before risk of overtraining or injury increases for sedentary participants entering the programme?

**Supporting context provided to advisor:** Current REAP exercise protocol specification, existing welfare SOP, GP & Healthcare Provider Brief.

---

### 4.2 Tanaka Formula Accuracy and Population Limitations

**Formula used:** Estimated Max HR = 208 − (0.7 × age)

**Key questions for the advisor:**
- Is the Tanaka formula (2001) an appropriate estimator of maximum heart rate for a general adult recreational population?
- What are the known standard deviation errors (±10–12 bpm) and how should REAP communicate this limitation to participants?
- For which populations is Tanaka most unreliable (e.g., highly trained athletes, participants on beta-blockers, post-cardiac event participants)?
- Should REAP provide guidance for participants to use wearable-derived VO2max estimates or field-test derived max HR in lieu of Tanaka?
- Should a cap or minimum floor be placed on the estimated max HR used in zone calculations?

---

### 4.3 Contraindications List

**Key questions for the advisor:**
- Which medical conditions should disqualify a participant from REAP without prior medical clearance?
- Which conditions should require written medical clearance before participation but not automatically disqualify?
- Should absolute vs. relative contraindications be distinguished in participant-facing screening?

**Draft contraindications for advisor review:**

| Category | Proposed Absolute Contraindication |
|---|---|
| Cardiac | Unstable angina; acute MI within 3 months; severe aortic stenosis; uncontrolled heart failure (NYHA III–IV); uncontrolled arrhythmia |
| Respiratory | Severe COPD (FEV1 <50% predicted); uncontrolled asthma |
| Metabolic | Uncontrolled diabetes (blood glucose >15 mmol/L); active thyroid crisis |
| Musculoskeletal | Acute fracture; post-surgical recovery (within 6 weeks) |
| Other | Pregnancy beyond 12 weeks (without written medical clearance); active eating disorder; psychiatric crisis |

**Key questions:**
- Are there additional contraindications the advisor recommends adding to this list?
- Should Sport Waikato require that participants self-certify they do not have any absolute contraindication at point of sign-up?
- Should medical clearance (GP letter) be required for any relative contraindications?

---

### 4.4 Participant Health Screening Questionnaire (PAR-Q+ Adaptation)

**Background:** REAP currently uses a simplified two-question health screening prompt at sign-up rather than a full PAR-Q+. The advisor is asked to review whether this is adequate for the REAP context.

**Current screening prompt (for review):**
> 1. Do you have any known heart condition or have you been advised by a doctor to only do physical activity recommended by a doctor?
> 2. Do you feel pain in your chest when you do physical activity?

**Key questions for the advisor:**
- Is a two-question screen adequate for the risk profile of REAP?
- Should REAP adopt the full 7-question PAR-Q or the extended PAR-Q+?
- Are there specific PAR-Q+ questions most relevant to the Zone 2/daily movement context that should be prioritised?
- What is the recommended action when a participant answers "Yes" to any screening question? (Auto-hold, require GP clearance, or allow participation with acknowledgement?)
- Does the screening questionnaire require medical sign-off or is it sufficient for Sport Waikato staff to administer it?

---

### 4.5 Welfare Incident Response Protocol

**Background:** Sport Waikato has a documented Welfare Incident Response SOP covering Tier 1 (operational) and Tier 2 (medical) incidents. The advisor is asked to review the clinical adequacy of this protocol.

**Key questions for the advisor:**
- Is the Tier 1 / Tier 2 incident classification framework clinically appropriate?
- Is the escalation pathway for Tier 2 incidents (CEO review → Board notification) appropriate, or should there be a direct clinician escalation pathway?
- What additional welfare check triggers should be built into the daily elimination flow (e.g., a participant eliminated multiple nights in a row with no in-app activity)?
- Should Sport Waikato maintain a relationship with a local crisis support service (e.g., Hamilton mental health crisis line) for referral?
- Are the incident documentation requirements adequate for post-incident review?

---

### 4.6 Elimination Notification Welfare Check Criteria

**Background:** When a participant is eliminated at midnight NZT, they receive an automated app notification and email. For participants who have not logged any activity at all in the 48 hours prior to elimination, Sport Waikato proposes an optional welfare check-in message.

**Key questions for the advisor:**
- Is a 48-hour inactivity window an appropriate trigger for a welfare check message?
- What language is appropriate for a welfare check message (non-alarmist but genuinely caring)?
- Should Sport Waikato have a documented escalation pathway if a welfare check message goes unreplied for 24+ hours?
- Are there any clinical guidelines (NZ context) for digital wellbeing check protocols?

---

### 4.7 Medical Exemption (7-Day Hold) Clinical Appropriateness

**Background:** REAP allows participants to declare a "medical hold" of up to 7 consecutive days without elimination. Holds are self-declared in-app and reviewed by Sport Waikato admin within 24 hours.

**Key questions for the advisor:**
- Is a 7-day maximum hold duration clinically appropriate for most acute illnesses and minor injuries?
- Should any conditions warrant a longer hold (e.g., post-surgery, acute cardiac event)?
- Should Sport Waikato require medical documentation for holds exceeding 3 days?
- Is admin review (rather than medical review) of hold requests appropriate, or should any hold requests be flagged to a medical contact?
- What documentation should be retained from a hold request for liability purposes?

---

### 4.8 Age-Related Exercise Risk Considerations

**Background:** REAP is open to adults 18+. The Tanaka formula and Zone 2 intensity thresholds have different implications at different ages.

**Key questions for the advisor:**
- Are there specific age bands (e.g., 60+, 65+) where the daily Zone 2 requirement warrants enhanced screening or a recommended GP clearance note?
- For younger participants (18–21), are there exercise-related risks specific to this age group (e.g., hypertrophic cardiomyopathy screening)?
- Should there be an upper age limit on participation or an enhanced screening pathway for older adults?
- Are there specific wearable accuracy concerns for older populations that Sport Waikato should communicate?

---

## 5. Pre-Engagement Materials

The following documents will be sent to the medical advisor candidate before the first meeting:

| # | Document | Purpose |
|---|---|---|
| 1 | REAP Exercise Protocol Specification | Zone 2 definition, Tanaka formula, measurement methods |
| 2 | Welfare Incident Response SOP | Tier 1/2 classification, escalation, documentation |
| 3 | GP & Healthcare Provider Brief | Current participant-facing medical communication |
| 4 | Terms of Participation (draft) | Legal framework, voluntary exit, medical hold provisions |
| 5 | Current Health Screening Questionnaire | Two-question screen for advisor review |
| 6 | REAP Appendix C — Product Architecture | Technical overview of how Zone 2 data is captured and processed |
| 7 | This Engagement Brief | Scope, deliverables, timeline |

---

## 6. Deliverables Expected from the Medical Advisor

| Deliverable | Description | Due Date |
|---|---|---|
| **D1: Annotated Protocol Documents** | Written comments and suggested changes on all pre-engagement materials, returned as annotated PDFs or tracked-changes Word documents | 2026-06-15 |
| **D2: Contraindications and Screening Recommendations** | Written list of recommended absolute/relative contraindications and recommended screening questionnaire (PAR-Q+ adaptation or alternative) | 2026-06-15 |
| **D3: Advisory Sign-Off Letter** | Formal written letter confirming the advisor has reviewed REAP's protocols and providing their professional opinion on clinical reasonableness, including any qualifications or caveats | 2026-07-01 |
| **D4: Recommended Changes Summary** | Concise table of all recommended protocol changes, ranked by urgency (critical / recommended / optional) | 2026-07-01 |
| **D5: Season 1 On-Call Availability Confirmation** | Written confirmation of availability for welfare incident escalation during 1–30 November 2026 on agreed response time basis | 2026-07-01 |

---

## 7. Ideal Advisor Profile

### Essential Criteria
- Registered medical practitioner in New Zealand (current MCNZ registration)
- Minimum 5 years post-graduate clinical experience
- Working knowledge of exercise physiology, cardiac risk assessment, or sports medicine
- Familiarity with PAR-Q+/ACSM pre-participation screening frameworks
- Comfortable advising on digital health or wearable technology contexts

### Preferred Criteria
- Fellowship or certificate in sports medicine (e.g., FFSEM, Diploma in Sports Medicine, ACSP membership)
- Experience with population health or public health exercise initiatives
- Interest in preventive health and community wellbeing programmes
- Familiarity with NZ Gambling Act 2003 or promotional competition welfare requirements (not required but useful)

### Disqualifying Criteria
- Current or recent clinical involvement with any REAP participant
- Commercial conflict of interest with Sport Waikato competitors
- Unwillingness to sign a confidentiality agreement

---

## 8. Candidate Identification

### 8.1 Primary Candidate Sources

| Source | Approach |
|---|---|
| **Waikato Hospital Sports Medicine / Exercise Medicine** | Direct outreach to the Exercise Medicine/Orthopaedics department at Te Whatu Ora Waikato (Waikato Hospital, Pembroke Street, Hamilton) |
| **University of Waikato — Faculty of Health, Sport and Human Performance** | Contact the Faculty office for referral to academic staff with clinical sports medicine background |
| **Hamilton Sports Medicine Clinics** | Direct approach to Hamilton-based private sports medicine practices (e.g., sports medicine physicians at Hamilton Sports Medicine & Orthopaedics, or similar) |
| **Sport NZ Medical Network** | Contact Sport NZ (Wellington) for recommendation of NZ-based sports medicine physicians with community health interest |
| **GP Networks — Waikato PHO** | Request referral from Pinnacle Health (Waikato PHO) to GPs with a sports medicine interest and community health focus |

### 8.2 Outreach Process

1. Leanne (CEO) sends an initial expression of interest email to each candidate source (template below).
2. Interested candidates receive the full pre-engagement materials pack (Section 5).
3. Leanne conducts a 30-minute introductory call with shortlisted candidates.
4. Selected candidate receives the engagement letter for signing.

**Target: Engagement confirmed by 30 April 2026. Review complete by 1 July 2026.**

---

## 9. Engagement Letter Template

---

**[DATE]**

**[ADVISOR NAME]**  
**[TITLE]**  
**[ORGANISATION]**  
**[ADDRESS]**

Dear [Dr/Prof/Mr/Ms SURNAME],

**Re: Medical Advisor Engagement — Survive the Reap (REAP), Sport Waikato**

Sport Waikato is pleased to invite you to engage as an independent Medical Advisor for the Survive the Reap (REAP) programme, a 30-day fitness subscription competition launching in Hamilton on 1 November 2026.

**Nature of Engagement**

This is an advisory consulting engagement. You will be asked to review Sport Waikato's exercise protocols, participant health screening procedures, and welfare incident response framework, and to provide a written professional opinion on their clinical reasonableness. This engagement does not constitute clinical supervision of participants, and you will not be responsible for individual participant health outcomes.

**Scope of Work**

The specific review areas, questions to address, and deliverables are set out in the enclosed Medical Advisor Engagement Brief (T069). In summary, you will:

1. Review and annotate the REAP exercise protocol, PAR-Q+ screening adaptation, contraindications list, welfare SOP, and medical hold procedures.
2. Provide written recommendations and a final advisory sign-off letter by 1 July 2026.
3. Be available for escalated welfare incident consultation during Season 1 (1–30 November 2026) on a best-efforts on-call basis, with a target response time of 4 business hours per escalation.

**Estimated Hours and Fees**

| Component | Estimated Hours | Rate | Total |
|---|---|---|---|
| Document review and annotation | 4–6 hours | NZ$250/hour | NZ$1,000–$1,500 |
| Advisory sign-off letter and recommendations | 2 hours | NZ$250/hour | NZ$500 |
| Season 1 on-call consulting (per incident escalation, max 3) | Up to 1 hour per incident | NZ$250/hour | Up to NZ$750 |
| **Total (estimated)** | | | **NZ$1,500–$2,750** |

Fees are inclusive of GST and will be invoiced upon delivery of each deliverable. Payment is due within 14 days of invoice. Reasonable out-of-pocket expenses (e.g., travel to Hamilton for a face-to-face meeting) will be reimbursed at cost with prior approval.

**Confidentiality and Intellectual Property**

All Sport Waikato protocol documents provided to you are confidential. You agree not to disclose, reproduce, or share any materials with third parties without Sport Waikato's written consent. All work product you produce under this engagement (annotations, recommendations, sign-off letter) becomes the property of Sport Waikato upon payment, though we acknowledge and retain a record of your authorship.

**Commencement and Completion**

Engagement commences upon countersignature of this letter. Review deliverables are due 1 July 2026. On-call availability during Season 1 is confirmed for 1–30 November 2026.

To accept this engagement, please sign and return this letter by [DATE + 7 DAYS].

We look forward to working with you.

Yours sincerely,

**Leanne [SURNAME]**  
Chief Executive Officer  
Sport Waikato  
leanne@sportwaikato.nz

---

**ACCEPTED BY:**

Signature: ____________________________

Name: ____________________________

Date: ____________________________

MCNZ Registration Number: ____________________________

---

## 10. Confidentiality and IP Provisions

### 10.1 Confidentiality

- All protocol documents provided to the medical advisor are classified as confidential Sport Waikato materials.
- The advisor may not share, reproduce, or reference specific protocol details in any publication, presentation, or media without Sport Waikato's prior written consent.
- The existence of the advisory engagement may be disclosed by Sport Waikato in its board reports, funder reports, and public communications (e.g., "REAP protocols have been reviewed by an independent medical advisor").
- The advisor's name and credentials may be disclosed to Sport Waikato's board, insurance brokers, and legal advisors as required.

### 10.2 Intellectual Property

- All written deliverables (annotated documents, recommendations, advisory letter) produced under this engagement become the property of Sport Waikato upon full payment.
- Sport Waikato grants the advisor the right to retain a personal copy of all deliverables for their professional records.
- The advisor retains ownership of any pre-existing frameworks, tools, or intellectual property they use in performing the review.

### 10.3 Indemnity and Liability

- The advisor provides a professional opinion based on information provided by Sport Waikato. They are not liable for participant health outcomes arising from Sport Waikato's decisions to adopt, modify, or reject their recommendations.
- Sport Waikato maintains its own professional indemnity and public liability insurance and does not require the advisor's indemnity policy to extend to REAP participants.

---

## 11. Timeline

| Milestone | Target Date | Owner |
|---|---|---|
| Identify shortlist of 3 candidate advisors | 2026-04-30 | Leanne |
| Send outreach emails with EOI | 2026-05-07 | Leanne |
| Introductory calls with shortlisted candidates | 2026-05-14 | Leanne |
| Issue engagement letter to selected advisor | 2026-05-21 | Leanne |
| Engagement signed and confirmed | 2026-05-31 | Leanne |
| Pre-engagement materials pack delivered to advisor | 2026-06-01 | Leanne/Ashleigh |
| Advisor review meeting (1-hour Zoom or face-to-face Hamilton) | 2026-06-08 | Leanne + Advisor |
| Annotated documents and interim recommendations received | 2026-06-15 | Advisor → Leanne |
| Sport Waikato responds to recommendations, flags questions | 2026-06-22 | Leanne |
| Final advisory sign-off letter received | 2026-07-01 | Advisor → Leanne |
| Protocol updates actioned based on recommendations | 2026-07-15 | Ashleigh |
| Season 1 on-call period begins | 2026-11-01 | Advisor |
| Season 1 on-call period ends | 2026-11-30 | Advisor |

---

## 12. Ongoing Season 1 On-Call Role

### 12.1 Scope

During Season 1 (1–30 November 2026), the medical advisor is available for escalated welfare incident consultation on a best-efforts basis. This is not a clinical on-call role. The advisor provides professional guidance to Sport Waikato staff on how to respond to a welfare incident or whether it warrants referral to emergency services or a participant's own GP.

### 12.2 Escalation Trigger

A welfare escalation is raised to the medical advisor when:
- A participant reports a cardiac event, acute injury, or medical emergency via the in-app welfare form or directly to Sport Waikato.
- A Tier 2 welfare incident is logged by Sport Waikato staff.
- Leanne (CEO) determines that a welfare situation requires clinical guidance before Sport Waikato responds.

### 12.3 Response Expectation

- Target response time: 4 business hours (during 8am–6pm NZDT).
- Contact method: Phone call (preferred) or email.
- Maximum estimated escalations: 3 during Season 1 (based on 50-user beta learnings).

### 12.4 Documentation

- Each escalation is logged by Sport Waikato staff in the Welfare Incident Register.
- The advisor's guidance is documented and retained for board review.

---

## 13. Proposed Budget

| Item | Budget (NZD) |
|---|---|
| Document review and annotation (4–6 hrs) | $1,000–$1,500 |
| Advisory sign-off letter and recommendations (2 hrs) | $500 |
| Season 1 on-call (estimated 3 escalations × 1 hr) | $750 |
| Introductory meeting travel (Hamilton, if applicable) | $100–$200 |
| **Total Estimated Budget** | **$2,350–$2,950** |
| **Approved Budget (with contingency)** | **$3,500** |

Budget is allocated from the REAP pre-launch operational budget. Approval authority: Leanne (CEO), within delegated authority per Sport Waikato financial policies.

---

## 14. Contact and Approval

**Document Owner:** Leanne (CEO)  
**Technical Support:** Ashleigh (Product Lead)  
**Legal Review:** Shelley (Compliance)

| Name | Role | Approval Required |
|---|---|---|
| Leanne | CEO / Document Owner | Yes — engagement letter sign-off |
| Shelley | Legal/Compliance | Yes — confidentiality and IP provisions review |
| Board Chair | Governance | Inform only — include in monthly board report |

---

*Document Version: 1.0 (April 2026) | Next Review: Post-engagement confirmed (May 2026)*
