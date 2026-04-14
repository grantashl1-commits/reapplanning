# T039 — App Accessibility Audit (WCAG 2.1 AA)
**Sport Waikato — Survive the Reap: Season 1**
**Owner:** Dev Team | **Due:** 2026-09-01 | **Priority:** High
**Standard:** Web Content Accessibility Guidelines (WCAG) 2.1 Level AA

---

## Table of Contents

1. [Overview and Objectives](#1-overview-and-objectives)
2. [Scope](#2-scope)
3. [WCAG 2.1 AA Criteria Checklist](#3-wcag-21-aa-criteria-checklist)
4. [Testing Methodology](#4-testing-methodology)
5. [Screen Reader Test Matrix](#5-screen-reader-test-matrix)
6. [REAP-Specific UI Element Audit Requirements](#6-reap-specific-ui-element-audit-requirements)
7. [Issue Severity Classification](#7-issue-severity-classification)
8. [Issue Log Template](#8-issue-log-template)
9. [Test Case Matrix — 20 Critical Flow Tests](#9-test-case-matrix--20-critical-flow-tests)
10. [Remediation Priority Matrix](#10-remediation-priority-matrix)
11. [Sign-Off Criteria](#11-sign-off-criteria)

---

## 1. Overview and Objectives

### Purpose

This document defines the complete accessibility audit framework for survivethereap.nz. The audit ensures the application meets Web Content Accessibility Guidelines (WCAG) 2.1 Level AA across all pages, with particular attention to the unique interaction patterns of the REAP fitness survival game (elimination notifications, heart rate data displays, the Survival Board leaderboard, and time-critical Redemption Day date pickers).

### Why Accessibility Matters for REAP

REAP targets a broad New Zealand fitness community including adults 18+. Participants with visual impairments, motor disabilities, or cognitive disabilities have a legal right to access services under the New Zealand Human Rights Act 1993 and the Web Accessibility Guidelines published by the NZ Government. Beyond legal compliance, an accessible product reflects Sport Waikato's values and maximises Season 1 participation.

### Objectives

1. Achieve WCAG 2.1 Level AA compliance across all in-scope pages before Season 1 launch.
2. Identify and remediate all Critical and Major issues before 2026-09-01.
3. Establish a reusable accessibility testing process for future REAP seasons.
4. Produce a documented, auditable record of compliance for Sport Waikato's governance files.

---

## 2. Scope

### In-Scope Pages and Components

| Page / Component | URL Pattern | Priority |
|---|---|---|
| Registration / Onboarding | `/register` | Critical |
| Payment (Stripe Checkout integration) | `/subscribe` or Stripe-hosted | Critical |
| Participant Dashboard | `/dashboard` | Critical |
| Survival Board | `/board` | High |
| Participant Profile | `/profile` | High |
| Admin Panel | `/admin` | High |
| Prize Draws Page | `/prizes` | Medium |
| Prize Draw Records | `/prizes/records` | Medium |
| Homepage / Marketing | `/` | High |
| Elimination Notification (modal/toast) | Overlay component | Critical |
| Redemption Day Picker | Date picker component | Critical |
| Heart Rate / Activity Log Display | Dashboard widget | Critical |

### Out of Scope

- Stripe Customer Portal (Stripe-hosted; Stripe is responsible for its own accessibility)
- TERRA device apps (third-party; out of REAP's control)
- Email notifications via Resend (HTML email accessibility is desirable but out of scope for this audit cycle)
- Admin Panel features used only by Sport Waikato internal staff (lower risk; included at High priority above but non-blocking for launch)

---

## 3. WCAG 2.1 AA Criteria Checklist

### Principle 1 — Perceivable

Information and user interface components must be presentable to users in ways they can perceive.

#### 1.1 Text Alternatives

| Criterion | Level | REAP Application | Pass/Fail |
|---|---|---|---|
| **1.1.1 Non-text Content** (A) | A | All images have descriptive alt text; heart rate icons have `alt` describing the metric; trophy/prize icons have meaningful alt text; decorative images use `alt=""` | [ ] Pass [ ] Fail |

#### 1.2 Time-Based Media

| Criterion | Level | REAP Application | Pass/Fail |
|---|---|---|---|
| **1.2.1 Audio-only and Video-only** (A) | A | Any onboarding or how-to videos must have a text transcript | [ ] Pass [ ] Fail |
| **1.2.2 Captions (Pre-recorded)** (A) | A | Pre-recorded instructional videos must have synchronised captions | [ ] Pass [ ] Fail |
| **1.2.4 Captions (Live)** (AA) | AA | Not applicable — no live video streams in Season 1 | N/A |
| **1.2.5 Audio Description (Pre-recorded)** (AA) | AA | Any video with visual-only information requires audio description | [ ] Pass [ ] Fail |

#### 1.3 Adaptable

| Criterion | Level | REAP Application | Pass/Fail |
|---|---|---|---|
| **1.3.1 Info and Relationships** (A) | A | Survival Board table uses proper `<table>`, `<thead>`, `<th scope>` markup; form labels programmatically associated with inputs via `<label for>` or `aria-labelledby`; registration form fieldsets grouped correctly | [ ] Pass [ ] Fail |
| **1.3.2 Meaningful Sequence** (A) | A | Reading order of Dashboard widgets matches visual order; elimination status appears before contextual detail in DOM | [ ] Pass [ ] Fail |
| **1.3.3 Sensory Characteristics** (A) | A | Instructions do not rely solely on colour, shape, or position — "Red badge means eliminated" is not acceptable alone | [ ] Pass [ ] Fail |
| **1.3.4 Orientation** (AA) | AA | Dashboard and Survival Board usable in both portrait and landscape orientation | [ ] Pass [ ] Fail |
| **1.3.5 Identify Input Purpose** (AA) | AA | Registration form: `autocomplete="given-name"`, `autocomplete="email"`, `autocomplete="bday"` on relevant fields | [ ] Pass [ ] Fail |

#### 1.4 Distinguishable

| Criterion | Level | REAP Application | Pass/Fail |
|---|---|---|---|
| **1.4.1 Use of Color** (A) | A | Elimination status is not communicated by colour alone — must include text label ("Eliminated") or icon with alt text | [ ] Pass [ ] Fail |
| **1.4.2 Audio Control** (A) | A | Any audio (e.g., elimination sound effect, celebration audio) must have a stop/pause control visible within 3 focus steps | [ ] Pass [ ] Fail |
| **1.4.3 Contrast (Minimum)** (AA) | AA | All normal text (18px and below, non-bold): contrast ratio ≥ 4.5:1. Large text (18px+ or 14px bold): ≥ 3:1. REAP brand colours must be verified — orange/dark contrast pairs especially | [ ] Pass [ ] Fail |
| **1.4.4 Resize Text** (AA) | AA | At 200% browser zoom, all text is readable; no horizontal scrolling required on Dashboard or Survival Board | [ ] Pass [ ] Fail |
| **1.4.5 Images of Text** (AA) | AA | No images of text used for meaningful content; logos are acceptable | [ ] Pass [ ] Fail |
| **1.4.10 Reflow** (AA) | AA | Content reflows at 320px width (equivalent to 400% zoom on 1280px screen) without loss of content or functionality | [ ] Pass [ ] Fail |
| **1.4.11 Non-text Contrast** (AA) | AA | UI components (input borders, focus indicators, chart elements in HR display) have contrast ≥ 3:1 against adjacent colours | [ ] Pass [ ] Fail |
| **1.4.12 Text Spacing** (AA) | AA | Apply the text spacing bookmarklet: line height 1.5×, letter spacing 0.12em, word spacing 0.16em — no content loss or overlap | [ ] Pass [ ] Fail |
| **1.4.13 Content on Hover or Focus** (AA) | AA | Tooltips on HR chart data points: dismissible with Escape, hoverable without disappearing, persistent until dismissed | [ ] Pass [ ] Fail |

---

### Principle 2 — Operable

User interface components and navigation must be operable.

#### 2.1 Keyboard Accessible

| Criterion | Level | REAP Application | Pass/Fail |
|---|---|---|---|
| **2.1.1 Keyboard** (A) | A | All functionality accessible via keyboard: registration, subscription, dashboard navigation, Survival Board browsing, Redemption Day picker, prize draw entry | [ ] Pass [ ] Fail |
| **2.1.2 No Keyboard Trap** (A) | A | Focus does not become trapped in modals (elimination notification, date picker) — Escape key must close; focus must return to trigger element | [ ] Pass [ ] Fail |
| **2.1.4 Character Key Shortcuts** (AA) | AA | If single-character keyboard shortcuts are implemented, they must be remappable or activatable only on focus | [ ] Pass [ ] Fail |

#### 2.2 Enough Time

| Criterion | Level | REAP Application | Pass/Fail |
|---|---|---|---|
| **2.2.1 Timing Adjustable** (A) | A | If any session timeout exists in the app, user must be warned with at least 20 seconds to extend the session | [ ] Pass [ ] Fail |
| **2.2.2 Pause, Stop, Hide** (A) | A | Any moving, blinking, or scrolling content (e.g., animated survival count, auto-scrolling Survival Board) must have pause/stop control | [ ] Pass [ ] Fail |

#### 2.3 Seizures and Physical Reactions

| Criterion | Level | REAP Application | Pass/Fail |
|---|---|---|---|
| **2.3.1 Three Flashes or Below Threshold** (A) | A | No content flashes more than 3 times per second; elimination animations must comply | [ ] Pass [ ] Fail |

#### 2.4 Navigable

| Criterion | Level | REAP Application | Pass/Fail |
|---|---|---|---|
| **2.4.1 Bypass Blocks** (A) | A | "Skip to main content" link present on every page, focusable as first tab stop | [ ] Pass [ ] Fail |
| **2.4.2 Page Titled** (A) | A | Every page has a descriptive `<title>`: "Dashboard — Survive the Reap", "Survival Board — Survive the Reap", etc. | [ ] Pass [ ] Fail |
| **2.4.3 Focus Order** (A) | A | Tab order on Dashboard: skip link → nav → status banner → activity log → HR display → CTA buttons. Logical and matches visual order | [ ] Pass [ ] Fail |
| **2.4.4 Link Purpose (In Context)** (A) | A | No "click here" or "read more" links without context; prize draw links include prize name: "Enter draw — [Prize Name]" | [ ] Pass [ ] Fail |
| **2.4.5 Multiple Ways** (AA) | AA | Navigation: primary nav menu AND sitemap/footer links; search functionality if site grows beyond 5 pages | [ ] Pass [ ] Fail |
| **2.4.6 Headings and Labels** (AA) | AA | Meaningful headings on all pages; Dashboard headings: h1 = "Your Dashboard", h2 = "Today's Activity", h2 = "Survival Status" | [ ] Pass [ ] Fail |
| **2.4.7 Focus Visible** (AA) | AA | All interactive elements have a visible focus indicator: minimum 2px outline; REAP brand style must not override default focus with invisible state | [ ] Pass [ ] Fail |

#### 2.5 Input Modalities

| Criterion | Level | REAP Application | Pass/Fail |
|---|---|---|---|
| **2.5.1 Pointer Gestures** (A) | A | No functionality requires multi-point or path-based gestures that cannot be performed with a single pointer | [ ] Pass [ ] Fail |
| **2.5.2 Pointer Cancellation** (A) | A | Click actions complete on `mouseup`/`pointerup`, not `mousedown` — user can cancel by moving pointer away | [ ] Pass [ ] Fail |
| **2.5.3 Label in Name** (A) | A | Visible button text matches or contains the accessible name: "Submit Activity" button must have `aria-label` starting with "Submit" if custom | [ ] Pass [ ] Fail |
| **2.5.4 Motion Actuation** (A) | A | No functionality exclusively activated by device motion/shake | [ ] Pass [ ] Fail |

---

### Principle 3 — Understandable

Information and the operation of user interface must be understandable.

#### 3.1 Readable

| Criterion | Level | REAP Application | Pass/Fail |
|---|---|---|---|
| **3.1.1 Language of Page** (A) | A | `<html lang="en-nz">` on all pages | [ ] Pass [ ] Fail |
| **3.1.2 Language of Parts** (AA) | AA | Any non-English content (e.g., te reo Māori phrases) marked with appropriate `lang` attribute | [ ] Pass [ ] Fail |

#### 3.2 Predictable

| Criterion | Level | REAP Application | Pass/Fail |
|---|---|---|---|
| **3.2.1 On Focus** (A) | A | Focusing on an element does not trigger unexpected context changes (e.g., navigation does not automatically redirect on focus) | [ ] Pass [ ] Fail |
| **3.2.2 On Input** (A) | A | Selecting a date in Redemption Day picker does not auto-submit without a confirm action | [ ] Pass [ ] Fail |
| **3.2.3 Consistent Navigation** (AA) | AA | Navigation menu appears in the same order on every page | [ ] Pass [ ] Fail |
| **3.2.4 Consistent Identification** (AA) | AA | "Submit" button, "My Dashboard" link, status icons use consistent naming across pages | [ ] Pass [ ] Fail |

#### 3.3 Input Assistance

| Criterion | Level | REAP Application | Pass/Fail |
|---|---|---|---|
| **3.3.1 Error Identification** (A) | A | Form errors identify the field in error and describe what is wrong: "Date of birth field: You must be 18 or over to participate." | [ ] Pass [ ] Fail |
| **3.3.2 Labels or Instructions** (A) | A | Registration form: all fields labelled; date format specified (DD/MM/YYYY); password requirements stated before submission | [ ] Pass [ ] Fail |
| **3.3.3 Error Suggestion** (AA) | AA | When registration form has an error, system suggests correction: "Email address must include an @ symbol." | [ ] Pass [ ] Fail |
| **3.3.4 Error Prevention (Legal)** (AA) | AA | Registration consent checkboxes: user can review, correct, and confirm before final submission; no one-click "submit and bind" without review step | [ ] Pass [ ] Fail |

---

### Principle 4 — Robust

Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.

#### 4.1 Compatible

| Criterion | Level | REAP Application | Pass/Fail |
|---|---|---|---|
| **4.1.1 Parsing** (A) | A | No duplicate IDs; all elements properly nested; no unclosed tags (validate with W3C validator) | [ ] Pass [ ] Fail |
| **4.1.2 Name, Role, Value** (A) | A | All custom UI components (shadcn/Radix UI) have correct ARIA roles, states, and properties: dropdowns have `role="combobox"`, modals have `role="dialog"`, status badges have appropriate `aria-label` | [ ] Pass [ ] Fail |
| **4.1.3 Status Messages** (AA) | AA | Success and error messages after form submission are announced by screen readers without requiring focus: use `role="status"` or `role="alert"` on toast notifications | [ ] Pass [ ] Fail |

---

## 4. Testing Methodology

### Phase 1 — Automated Testing

Run automated tools first to identify low-hanging issues quickly. Automated tools catch approximately 30–40% of WCAG failures.

#### 4.1.1 axe DevTools (Primary Tool)

| Step | Action |
|---|---|
| Install | Install axe DevTools browser extension (Chrome/Firefox) |
| Scan each page | Open each in-scope page, click axe DevTools, click "Scan All of My Page" |
| Export results | Export JSON/CSV report for each page |
| Resolve violations | Fix all "violations" (confirmed failures); document "incomplete" items for manual review |
| Re-scan | Re-run after fixes to confirm resolution |

**Target:** Zero axe violations on all pages before manual testing begins.

#### 4.1.2 Lighthouse Accessibility Audit

| Step | Action |
|---|---|
| Run | Open Chrome DevTools → Lighthouse → select "Accessibility" → "Analyze page load" |
| Target score | Minimum score: 95/100 on all pages |
| Key checks | Contrast ratios, ARIA attributes, form labels, image alt text |

#### 4.1.3 W3C HTML Validator

| Step | Action |
|---|---|
| Validate | Submit each page URL to https://validator.w3.org |
| Target | Zero errors; zero warnings related to ARIA misuse |

#### 4.1.4 Colour Contrast Analyser

| Step | Action |
|---|---|
| Tool | Colour Contrast Analyser (desktop app, TPGi — free) |
| Test | All text/background colour combinations in REAP brand palette |
| Document | Record each pair: foreground colour, background colour, contrast ratio, pass/fail |

---

### Phase 2 — Manual Testing

Manual testing is required for WCAG criteria that automated tools cannot reliably detect (keyboard navigation, screen reader experience, cognitive usability).

#### 4.2.1 Keyboard Navigation Testing

Procedure for each page:
1. Disconnect mouse (or tab-only test)
2. Tab through all interactive elements; verify focus order is logical
3. Activate each interactive element using Enter/Space
4. Test Escape to close modals and dropdowns
5. Test arrow keys in date pickers and dropdown menus
6. Verify "skip to main content" link is first tab stop and works

#### 4.2.2 Zoom Testing

1. Set browser zoom to 200% — verify no content is cut off or overlapping
2. Set browser zoom to 400% — verify content reflows to single column without horizontal scrolling (1.4.10 Reflow)
3. Apply text spacing bookmarklet (line height 1.5×, letter spacing 0.12em) — verify no content loss

#### 4.2.3 Forced Colours / High Contrast Mode

1. Enable Windows High Contrast Mode (Settings → Accessibility → Contrast themes)
2. Navigate all in-scope pages
3. Verify all text is readable; focus indicators are visible; icons have visible meaning

---

## 5. Screen Reader Test Matrix

Screen reader testing must be performed by a tester familiar with each tool, or with a participant who uses a screen reader as their primary access technology.

### Screen Reader / Browser Combinations

| Screen Reader | OS | Browser | Priority |
|---|---|---|---|
| NVDA (latest) | Windows 11 | Chrome (latest) | Critical |
| NVDA (latest) | Windows 11 | Firefox (latest) | High |
| JAWS (latest) | Windows 11 | Chrome (latest) | High |
| VoiceOver | macOS (latest) | Safari (latest) | Critical |
| VoiceOver | iOS (latest) | Safari (latest) | High |
| TalkBack | Android (latest) | Chrome (latest) | High |

### Screen Reader Test Script — Per Page

For each in-scope page and each screen reader/browser combination:

| Step | Action | Expected |
|---|---|---|
| 1 | Navigate to page using screen reader | Page title announced correctly |
| 2 | Tab to first interactive element | "Skip to main content" link announced |
| 3 | Activate skip link | Focus jumps to main content area |
| 4 | Browse by headings (H key in NVDA/JAWS) | Logical heading structure announced |
| 5 | Browse by form controls (F key in NVDA) | All form labels announced correctly |
| 6 | Browse by tables (T key in NVDA) | Survival Board table: column headers announced per cell |
| 7 | Trigger elimination notification | Alert role announced immediately without focus movement |
| 8 | Activate date picker for Redemption Day | Date picker role announced; navigate with arrow keys |
| 9 | Complete registration form | All validation errors announced; instructions read correctly |
| 10 | Submit form | Success/error status message announced |

### Screen Reader Test Results Matrix

| Page | NVDA/Chrome | NVDA/Firefox | VoiceOver/Safari | TalkBack/Chrome | Issues Found |
|---|---|---|---|---|---|
| Registration | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | |
| Dashboard | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | |
| Survival Board | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | |
| Profile | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | |
| Admin Panel | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | |
| Prize Draws | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | |
| Prize Draw Records | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | |
| Homepage | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | [ ] Pass [ ] Fail | |

---

## 6. REAP-Specific UI Element Audit Requirements

The following UI elements are unique to REAP and require specific accessibility scrutiny beyond standard WCAG automated checks.

### 6.1 Elimination Notification

**Risk:** A midnight elimination event is a high-stakes, time-sensitive notification. If a screen reader user cannot receive and understand this notification, they may miss critical information about their participation status.

**Requirements:**
- Elimination toast/modal must use `role="alert"` or `aria-live="assertive"` so it is announced immediately by screen readers without requiring focus change
- Must not auto-dismiss within less than 5 seconds (allow time for screen reader to finish reading)
- Must include text stating: "You have been eliminated from Season 1 of Survive the Reap." (not just an icon or colour change)
- Must have a clearly labelled close/dismiss button: `aria-label="Dismiss elimination notification"`
- Focus must be managed: when modal appears, focus moves to modal; when dismissed, focus returns to the element that was previously focused
- Must be operable by keyboard alone (Enter/Space to dismiss)

**Test:** Trigger a test elimination (set participant status to eliminated in staging database) and verify screen reader announces the full notification text immediately.

---

### 6.2 Heart Rate Data Display

**Risk:** Zone 2 heart rate data may be displayed as a chart or graph. Charts are frequently inaccessible to screen reader users if only rendered visually.

**Requirements:**
- Chart component must have a text alternative providing equivalent information: e.g., a data table beneath the chart summarising daily HR values
- The text summary must be visually present or available via an accessible "expand data table" control (do not hide it `display:none` from screen readers)
- Axis labels must be programmatically associated or described via `aria-label` on the chart container
- Colour-only encoding (e.g., Zone 2 = blue, Zone 3 = red) must have a pattern or shape alternative
- If the chart is decorative and the data table is the primary, mark the chart `aria-hidden="true"` and ensure the data table is labelled

**Suggested markup:**
```html
<section aria-labelledby="hr-chart-heading">
  <h2 id="hr-chart-heading">Today's Activity</h2>
  <div aria-hidden="true">
    <!-- chart canvas rendered here -->
  </div>
  <details>
    <summary>View activity data as table</summary>
    <table>
      <caption>Zone 2 heart rate activity — [date]</caption>
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Heart Rate (bpm)</th>
          <th scope="col">Zone</th>
        </tr>
      </thead>
      <!-- data rows -->
    </table>
  </details>
</section>
```

---

### 6.3 Survival Board Table

**Risk:** The Survival Board lists all participants with their survival status. As a potentially large table (up to 500 rows), it may be difficult to navigate.

**Requirements:**
- Proper `<table>` element with `<thead>`, `<tbody>`, `<th scope="col">` for headers
- Row headers: participant name column should use `<th scope="row">` if it is the identifier
- Sort controls: sortable columns must use `aria-sort="ascending"` / `aria-sort="descending"` / `aria-sort="none"`
- Pagination controls must be keyboard accessible and clearly labelled: "Next page of Survival Board", "Previous page"
- Each page of results should announce the range: "Showing participants 1–50 of 312"
- Status column: "Active" / "Eliminated" in text — not just a coloured dot
- Search/filter input: properly labelled with `<label>` or `aria-label`

---

### 6.4 Registration Form — Consent Checkboxes

**Risk:** The registration form includes multiple consent checkboxes (Terms of Participation, Privacy Policy, age confirmation). These are legally significant — if a screen reader user cannot fully understand and operate these checkboxes, there is both an accessibility failure and a legal consent validity risk.

**Requirements:**
- Each checkbox must have a `<label>` element, not just proximity text
- The label must include the full description: `<label for="terms-consent">I have read and agree to the <a href="/terms">Terms of Participation</a> and <a href="/season-rules">Season Rules</a></label>`
- Links within labels must be keyboard accessible and open in a way that does not cause the user to lose their form progress
- Error messages for unchecked mandatory checkboxes must be announced: use `aria-describedby` on the checkbox pointing to the error message element
- Group related checkboxes in a `<fieldset>` with a `<legend>`: "Legal Agreements" as the legend
- The "Submit" button must be disabled or show a validation error if mandatory checkboxes are not checked — do not silently fail

---

### 6.5 Redemption Day Date Picker

**Risk:** The Redemption Day is a feature where eliminated participants can select a date to attempt re-entry. Date pickers are one of the most commonly inaccessible components.

**Requirements:**
- Date picker built on accessible foundation: Radix UI Popover + Calendar, or shadcn/ui `<Calendar>` component (which uses Radix internally)
- Calendar grid must use `role="grid"`, `role="row"`, `role="gridcell"`
- Each day button must announce: "[day name], [date] [month] [year]" (e.g., "Tuesday, 10 November 2026")
- Disabled dates (e.g., dates already passed, or dates not eligible for Redemption) must have `aria-disabled="true"` and announce "unavailable"
- Arrow key navigation within the calendar grid must work: Left/Right for days, Up/Down for weeks
- The trigger button must announce the currently selected date: `aria-label="Select Redemption Day, currently 5 November 2026"`
- After selecting a date, focus must return to a logical location and a success message must be announced

---

### 6.6 Admin Panel

**Risk:** While the Admin Panel is used by Sport Waikato internal staff, if a staff member has a disability, they must be able to operate it.

**Requirements:**
- All admin tables (participant list, refund queue, dispute log) follow same table accessibility standards as Survival Board
- Admin action buttons (Approve Refund, Issue Elimination Override) must have unambiguous labels including the participant name: "Approve refund for Alex Test" (not just "Approve")
- Confirmation dialogs for destructive actions (refund, elimination override) must trap focus and be keyboard dismissible
- Bulk action checkboxes must be labelled individually

---

## 7. Issue Severity Classification

| Severity | Definition | Examples | Action Required |
|---|---|---|---|
| **Critical** | Barrier that prevents a user with a disability from completing a core task; WCAG Level A failure | Cannot register using keyboard only; elimination notification not announced by screen reader; consent checkbox has no label | Must be fixed before launch. Blocks go/no-go. |
| **Major** | Significant difficulty that severely degrades the experience for users with disabilities; some WCAG AA failures | HR chart has no text alternative; date picker arrow key navigation broken; colour contrast < 3:1 on large text | Must be fixed before launch. |
| **Minor** | Inconvenience or partial barrier; does not prevent task completion | Tooltip disappears too quickly; heading hierarchy has a gap (h1 → h3); focus ring slightly below minimum size | Fix before launch if possible; acceptable with documented workaround. |
| **Advisory** | Best practice recommendation; not a WCAG 2.1 failure | Add `aria-describedby` for additional context; improve error message wording; add landmark regions | Fix in next development sprint; does not block launch. |

---

## 8. Issue Log Template

Record each identified issue in the log below. One row per issue.

| Issue ID | WCAG Criterion | Principle | Level | Page | Component / Element | Description | Severity | Remediation Action | Assignee | Target Fix Date | Re-Test Date | Re-Test Pass? |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A039-001 | 1.4.3 | Perceivable | AA | Dashboard | Survival Status badge | Text "ACTIVE" on brand orange background: contrast ratio 2.8:1 (fails 4.5:1 minimum) | Critical | Change badge text colour to white (#FFFFFF) — contrast ratio 5.2:1 | Dev | | | [ ] |
| A039-002 | 4.1.3 | Robust | AA | Dashboard | Elimination notification toast | Toast uses `role="status"` (polite) — must use `role="alert"` (assertive) for time-critical elimination events | Critical | Change `role="status"` to `role="alert"` on elimination toast component | Dev | | | [ ] |
| *(add rows as issues are found)* | | | | | | | | | | | | |

---

## 9. Test Case Matrix — 20 Critical Flow Tests

### TC-A001: Keyboard-Only Registration

| Field | Detail |
|---|---|
| **ID** | TC-A001 |
| **WCAG Criterion** | 2.1.1 Keyboard, 2.4.3 Focus Order, 3.3.1 Error Identification |
| **Page** | `/register` |
| **Test Type** | Manual — keyboard only |
| **Steps** | 1. Navigate to `/register` using keyboard only (no mouse). 2. Tab through all form fields. 3. Complete all required fields. 4. Tab to and activate all consent checkboxes using Space. 5. Tab to "Submit" and press Enter. |
| **Expected Result** | All fields reachable via Tab; all checkboxes activatable via Space; form submits successfully; success message announced by screen reader. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A002: Screen Reader Registration Form

| Field | Detail |
|---|---|
| **ID** | TC-A002 |
| **WCAG Criterion** | 1.3.1 Info and Relationships, 1.3.5 Identify Input Purpose, 4.1.2 Name/Role/Value |
| **Page** | `/register` |
| **Test Type** | Screen reader (NVDA + Chrome) |
| **Steps** | 1. Enable NVDA. 2. Navigate to `/register`. 3. Enter Forms Mode. 4. Tab through each field and read the announced label. |
| **Expected Result** | Each field announces its label correctly. DOB field announces "Date of birth, edit". Consent checkboxes announce full label text including linked document names. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A003: Registration Form — Error Handling

| Field | Detail |
|---|---|
| **ID** | TC-A003 |
| **WCAG Criterion** | 3.3.1 Error Identification, 3.3.3 Error Suggestion, 4.1.3 Status Messages |
| **Page** | `/register` |
| **Test Type** | Screen reader + keyboard |
| **Steps** | 1. Submit registration form with empty required fields. 2. Observe error messages. |
| **Expected Result** | Errors are announced by screen reader (role="alert" or focus moves to error summary). Each error names the field and describes the issue. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A004: Age Gate — Under-18 Error

| Field | Detail |
|---|---|
| **ID** | TC-A004 |
| **WCAG Criterion** | 3.3.1 Error Identification, 3.3.3 Error Suggestion |
| **Page** | `/register` |
| **Test Type** | Keyboard + screen reader |
| **Steps** | 1. Enter a date of birth that makes the user under 18. 2. Tab out of the field or submit form. |
| **Expected Result** | Error announced: "Date of birth: You must be 18 years of age or over to participate." Focus or alert mechanism ensures the message is heard. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A005: Dashboard — Skip Link

| Field | Detail |
|---|---|
| **ID** | TC-A005 |
| **WCAG Criterion** | 2.4.1 Bypass Blocks |
| **Page** | `/dashboard` |
| **Test Type** | Keyboard |
| **Steps** | 1. Navigate to Dashboard. 2. Press Tab once. 3. Verify "Skip to main content" link is first tab stop and is visible. 4. Press Enter on skip link. |
| **Expected Result** | Skip link is first focusable element; pressing Enter moves focus to `<main>` or first content element. Navigation menu is bypassed. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A006: Dashboard — HR Chart Accessibility

| Field | Detail |
|---|---|
| **ID** | TC-A006 |
| **WCAG Criterion** | 1.1.1 Non-text Content, 1.3.1 Info and Relationships |
| **Page** | `/dashboard` |
| **Test Type** | Screen reader (NVDA + Chrome) |
| **Steps** | 1. Navigate to Dashboard with NVDA. 2. Tab to HR activity section. 3. Attempt to read chart data. |
| **Expected Result** | Chart is marked `aria-hidden="true"`. Data table alternative is readable by screen reader and announces column headers with each cell. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A007: Elimination Notification — Screen Reader Announcement

| Field | Detail |
|---|---|
| **ID** | TC-A007 |
| **WCAG Criterion** | 4.1.3 Status Messages, 2.1.1 Keyboard |
| **Page** | `/dashboard` (any page) |
| **Test Type** | Screen reader (NVDA + Chrome) + keyboard |
| **Steps** | 1. Enable NVDA. 2. Trigger test elimination notification (set in staging DB). 3. Wait without interacting. |
| **Expected Result** | NVDA announces elimination text immediately without requiring focus change. Full text: "You have been eliminated from Survive the Reap Season 1." Dismiss button reachable by Tab. Escape closes notification. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A008: Survival Board — Table Navigation

| Field | Detail |
|---|---|
| **ID** | TC-A008 |
| **WCAG Criterion** | 1.3.1 Info and Relationships, 2.1.1 Keyboard |
| **Page** | `/board` |
| **Test Type** | Screen reader (NVDA + Chrome) |
| **Steps** | 1. Navigate to Survival Board with NVDA. 2. Press T to jump to table. 3. Navigate cells with arrow keys. |
| **Expected Result** | NVDA announces column header with each data cell. Status column announces "Active" or "Eliminated" as text. Sort buttons announce current sort direction. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A009: Survival Board — Colour Independence

| Field | Detail |
|---|---|
| **ID** | TC-A009 |
| **WCAG Criterion** | 1.4.1 Use of Color |
| **Page** | `/board` |
| **Test Type** | Manual visual inspection + colour blindness simulation |
| **Steps** | 1. Use browser extension to simulate colour blindness (Deuteranopia, Protanopia). 2. Verify survival status is distinguishable. |
| **Expected Result** | Status communicated by text ("Active"/"Eliminated") and/or icon with text alternative — not colour alone. Status is distinguishable under all colour blindness simulations. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A010: Redemption Day Picker — Keyboard Navigation

| Field | Detail |
|---|---|
| **ID** | TC-A010 |
| **WCAG Criterion** | 2.1.1 Keyboard, 2.1.2 No Keyboard Trap |
| **Page** | `/dashboard` or `/profile` |
| **Test Type** | Keyboard only |
| **Steps** | 1. Tab to Redemption Day picker trigger button. 2. Press Enter to open. 3. Navigate calendar using arrow keys. 4. Select an eligible date with Enter. 5. Press Escape to close without selecting. |
| **Expected Result** | Calendar opens. Arrow keys navigate days. Escape closes without selecting. Focus returns to trigger button on close. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A011: Redemption Day Picker — Screen Reader

| Field | Detail |
|---|---|
| **ID** | TC-A011 |
| **WCAG Criterion** | 4.1.2 Name/Role/Value |
| **Page** | `/dashboard` |
| **Test Type** | Screen reader (VoiceOver + Safari) |
| **Steps** | 1. Enable VoiceOver. 2. Navigate to Redemption Day picker. 3. Open and navigate calendar. |
| **Expected Result** | Each day announced as "[day name], [date] [month] [year]". Disabled dates announced as "unavailable". Selected date announced on close. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A012: Consent Checkboxes — Full Label Read

| Field | Detail |
|---|---|
| **ID** | TC-A012 |
| **WCAG Criterion** | 1.3.1 Info and Relationships, 4.1.2 Name/Role/Value |
| **Page** | `/register` |
| **Test Type** | Screen reader (NVDA) |
| **Steps** | 1. Enable NVDA. 2. Tab to Terms of Participation consent checkbox. 3. Listen to announcement. |
| **Expected Result** | NVDA announces: "I have read and agree to the Terms of Participation and Season Rules, checkbox, unchecked". Links within label are navigable separately. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A013: Colour Contrast — Brand Orange on White

| Field | Detail |
|---|---|
| **ID** | TC-A013 |
| **WCAG Criterion** | 1.4.3 Contrast (Minimum) |
| **Page** | Homepage, Dashboard (any page using brand orange) |
| **Test Type** | Colour Contrast Analyser tool |
| **Steps** | 1. Identify all text elements using REAP brand orange as either text colour or background. 2. Measure contrast ratio using Colour Contrast Analyser. |
| **Expected Result** | Normal text on orange background: ≥ 4.5:1. Large text on orange: ≥ 3:1. Record all measurements. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A014: 200% Zoom — Dashboard Usability

| Field | Detail |
|---|---|
| **ID** | TC-A014 |
| **WCAG Criterion** | 1.4.4 Resize Text |
| **Page** | `/dashboard` |
| **Test Type** | Manual — browser zoom |
| **Steps** | 1. Navigate to Dashboard. 2. Set browser zoom to 200% (Ctrl+Plus). 3. Scroll through all sections. |
| **Expected Result** | All text readable; no text truncated with ellipsis (except intentional single-line truncation); no horizontal scrollbar on main content area; no overlapping elements. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A015: Focus Visible — All Interactive Elements

| Field | Detail |
|---|---|
| **ID** | TC-A015 |
| **WCAG Criterion** | 2.4.7 Focus Visible |
| **Page** | All pages |
| **Test Type** | Keyboard + visual inspection |
| **Steps** | 1. Tab through every interactive element on each in-scope page. 2. Visually confirm a focus indicator is visible on each element. |
| **Expected Result** | Every button, link, input, checkbox, and select has a visible focus indicator. No element has `outline: none` or `outline: 0` without a replacement focus style. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A016: Prize Draw — Entry Flow Keyboard

| Field | Detail |
|---|---|
| **ID** | TC-A016 |
| **WCAG Criterion** | 2.1.1 Keyboard, 3.3.4 Error Prevention |
| **Page** | `/prizes` |
| **Test Type** | Keyboard only |
| **Steps** | 1. Navigate to Prize Draws page by keyboard. 2. Tab to an eligible prize draw entry button. 3. Activate with Enter/Space. 4. Complete confirmation step if present. |
| **Expected Result** | Full prize draw entry flow completable by keyboard. Confirmation step present (3.3.4). Success message announced. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A017: Mobile — TalkBack Registration

| Field | Detail |
|---|---|
| **ID** | TC-A017 |
| **WCAG Criterion** | 2.1.1 Keyboard, 1.3.4 Orientation |
| **Page** | `/register` |
| **Test Type** | TalkBack + Android Chrome (portrait) |
| **Steps** | 1. Enable TalkBack on Android device. 2. Navigate to `/register`. 3. Complete registration form using TalkBack swipe navigation. |
| **Expected Result** | All form fields reachable by swipe gesture. Labels announced. Submit reachable and activatable. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A018: Error Prevention — Legal

| Field | Detail |
|---|---|
| **ID** | TC-A018 |
| **WCAG Criterion** | 3.3.4 Error Prevention (Legal) |
| **Page** | `/register` |
| **Test Type** | Manual |
| **Steps** | 1. Complete registration form. 2. On final confirmation screen, verify user can review all entered data. 3. Verify a "Go back" or "Edit" option is present before final submit. |
| **Expected Result** | Review step present showing all entered data. User can correct errors. Final submit is clearly labelled as binding (e.g., "Confirm and Subscribe — $13/month"). |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A019: Page Titles

| Field | Detail |
|---|---|
| **ID** | TC-A019 |
| **WCAG Criterion** | 2.4.2 Page Titled |
| **Page** | All in-scope pages |
| **Test Type** | Automated (axe) + manual verification |
| **Steps** | 1. Navigate to each in-scope page. 2. Check `document.title` in console. |
| **Expected Result** | Each page has a unique, descriptive title: "Register — Survive the Reap", "Dashboard — Survive the Reap", "Survival Board — Survive the Reap", etc. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### TC-A020: Status Messages — Toast Notifications

| Field | Detail |
|---|---|
| **ID** | TC-A020 |
| **WCAG Criterion** | 4.1.3 Status Messages |
| **Page** | Dashboard, Registration, Admin Panel |
| **Test Type** | Screen reader (NVDA + Chrome) |
| **Steps** | 1. Enable NVDA. 2. Perform an action that triggers a toast notification (e.g., save profile, submit activity log). 3. Wait for toast without moving focus. |
| **Expected Result** | NVDA announces the toast text without requiring focus movement. Success toasts use `role="status"` (polite). Error toasts use `role="alert"` (assertive). |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

## 10. Remediation Priority Matrix

Use this matrix to prioritise remediation after the audit. Issues are sorted by severity (Critical first) and then by user impact.

| Priority | Severity | WCAG Level | Example Issue | Fix Before Launch? |
|---|---|---|---|---|
| P1 | Critical | A | Keyboard trap in modal | Yes — absolute blocker |
| P2 | Critical | AA | Contrast < 3:1 on brand colour text | Yes — absolute blocker |
| P3 | Critical | A | Missing alt text on functional icons | Yes — absolute blocker |
| P4 | Major | AA | HR chart has no text alternative | Yes — significant barrier |
| P5 | Major | A | No skip link | Yes — significant barrier |
| P6 | Major | AA | Date picker not keyboard navigable | Yes — core flow blocker |
| P7 | Minor | AA | Tooltip disappears in < 2 seconds | Fix if time allows before launch |
| P8 | Minor | AA | Heading hierarchy gap (h1 → h3) | Fix if time allows before launch |
| P9 | Advisory | — | Additional ARIA descriptions | Next sprint |

---

## 11. Sign-Off Criteria

### Criteria for Audit Completion

All of the following must be true before the accessibility audit is marked complete:

| # | Criterion | Status |
|---|---|---|
| 1 | axe DevTools scan: zero violations on all in-scope pages | [ ] Met [ ] Not Met |
| 2 | Lighthouse score: ≥ 95/100 on all in-scope pages | [ ] Met [ ] Not Met |
| 3 | All Critical severity issues resolved and re-tested as passing | [ ] Met [ ] Not Met |
| 4 | All Major severity issues resolved and re-tested as passing | [ ] Met [ ] Not Met |
| 5 | All 20 test cases (TC-A001 to TC-A020) pass | [ ] Met [ ] Not Met |
| 6 | Screen reader test matrix: all Critical pages pass in NVDA/Chrome and VoiceOver/Safari | [ ] Met [ ] Not Met |
| 7 | Colour contrast verified for all REAP brand colour combinations in use | [ ] Met [ ] Not Met |
| 8 | Elimination notification confirmed to be announced immediately by NVDA and VoiceOver | [ ] Met [ ] Not Met |
| 9 | Issue log complete with remediation details for all findings | [ ] Met [ ] Not Met |
| 10 | Minor and Advisory issues documented with scheduled fix dates | [ ] Met [ ] Not Met |

### Sign-Off

| Role | Name | Signature | Date |
|---|---|---|---|
| Dev Team Lead (audit complete, all critical/major issues resolved) | | | |
| LL Lead / Leanne (operational sign-off) | | | |
| CEO (authorises launch readiness — accessibility confirmed) | | | |

---

*Document prepared by: Dev Team*
*Version: 1.0 — For execution August–September 2026*
*Classification: Internal — Technical*
*Standard: WCAG 2.1 Level AA (W3C Recommendation, 5 June 2018)*
*Related tasks: T039, T015 (Board Approval CP-06)*
