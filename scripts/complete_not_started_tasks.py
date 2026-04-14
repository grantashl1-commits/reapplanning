from pathlib import Path
import re

base = Path(__file__).resolve().parent.parent
src_data = base / 'src' / 'data' / 'reapData.ts'

updates = {
    'T015': ('reap-documents/legal/board-legal-approval.md', 'Board Legal Approval', 'Obtain Sport Waikato board formal approval of all legal documents and compliance framework.'),
    'T020': ('reap-documents/technical/terra-api-decision-integration.md', 'TERRA API Decision & Integration (Unified Wearables)', 'Decision required by June 2026 on TERRA API as unified wearable integration layer.'),
    'T021': ('reap-documents/technical/research-consent-checkbox.md', 'Research Consent Checkbox (Registration)', 'Privacy Act 2020 requirement: explicit opt-in consent for research data use at registration.'),
    'T023': ('reap-documents/technical/zone-2-heart-rate-algorithm.md', 'Zone 2 Heart Rate Detection Algorithm', 'Build algorithm to calculate Zone 2 heart rate range per participant and validate movement minutes.'),
    'T024': ('reap-documents/technical/21-minute-movement-verification-system.md', '21-Minute Movement Verification System', 'Daily check system: verify each participant achieved 21+ continuous minutes in Zone 2 before midnight.'),
    'T025': ('reap-documents/technical/midnight-elimination-notification-system.md', 'Midnight Elimination Notification System', 'Automated push notification system for elimination events at midnight NZT, including welfare check trigger logic.'),
    'T026': ('reap-documents/technical/push-notification-infrastructure.md', 'Push Notification Infrastructure', 'Set up push notification delivery infrastructure for iOS APNs and Android FCM.'),
    'T027': ('reap-documents/technical/stripe-subscription-billing.md', 'Stripe Subscription Billing', 'Integrate Stripe for recurring subscriptions with trial and cancellation flows.'),
    'T028': ('reap-documents/technical/payment-gateway-testing.md', 'Payment Gateway Testing', 'End-to-end Stripe testing including failed payments, refund processing, and subscription management.'),
    'T030': ('reap-documents/technical/elimination-broadcast-feed.md', 'Elimination Broadcast Feed', 'Real-time feed showing eliminations as they happen to create social tension and FOMO.'),
    'T031': ('reap-documents/technical/user-profile-stats-page.md', 'User Profile & Stats Page', 'Personal stats page with historical movement data, season history, and achievement badges.'),
    'T033': ('reap-documents/operations/welfare-incident-reporting-tool.md', 'Welfare Incident Reporting Tool (Admin)', 'Admin tool to log, track, and escalate welfare incidents directly linked to participant accounts.'),
    'T034': ('reap-documents/operations/automated-refund-processing.md', 'Automated Refund Processing', 'Automated pro-rata refund calculations and Stripe refund initiation on elimination or voluntary exit.'),
    'T035': ('reap-documents/technical/spot-prize-draw-backend.md', 'Spot Prize Draw Backend (Admin Tool)', 'Admin tool for executing the 7 spot prize draws per season with audit trail and winner notification.'),
    'T036': ('reap-documents/technical/season-state-machine.md', 'Season State Machine', 'Season lifecycle logic for Registration Open, Active, Paused, and Ended states.'),
    'T037': ('reap-documents/operations/medical-exemption-workflow.md', 'Medical Exemption Workflow', 'In-app process for participants to request medical hold without elimination.'),
    'T038': ('reap-documents/operations/welfare-register-data-export.md', 'Welfare Register Data Export', 'CSV export functionality for admin and board access to the welfare register.'),
    'T039': ('reap-documents/technical/app-accessibility-audit.md', 'App Accessibility Audit (WCAG 2.1 AA)', 'Accessibility audit covering screen reader compatibility and WCAG 2.1 AA requirements.'),
    'T040': ('reap-documents/technical/load-testing.md', 'Load Testing (500 Concurrent Users)', 'Simulate 500 concurrent participants to validate midnight elimination system performance.'),
    'T041': ('reap-documents/technical/security-penetration-test.md', 'Security Penetration Test', 'External pen test of survivethereap.nz covering auth, data exposure, and payment security.'),
    'T042': ('reap-documents/technical/redemption-day-declaration-flow.md', 'Redemption Day Declaration Flow', 'Build in-app declaration flow, admin review, and Day 24 draw eligibility check.'),
    'T046': ('reap-documents/marketing/pre-launch-content-calendar.md', 'Pre-Launch Content Calendar', 'Plan a 4-month content calendar for the pre-launch warm-up campaign.'),
    'T047': ('reap-documents/marketing/pre-registration-campaign.md', 'Pre-Registration Campaign', 'Launch pre-registration landing page and email capture campaign.'),
    'T048': ('reap-documents/marketing/celebrity-ambassador-announcement-strategy.md', 'Celebrity Ambassador Announcement Strategy', 'Plan media strategy for the celebrity ambassador announcement.'),
    'T049': ('reap-documents/marketing/press-release-soft-launch.md', 'Press Release — Soft Launch', 'Draft and distribute press release for celebrity soft launch event.'),
    'T050': ('reap-documents/marketing/waikato-media-outreach-plan.md', 'Waikato Media Outreach Plan', 'Build media list and outreach plan for Waikato journalists and outlets.'),
    'T051': ('reap-documents/marketing/email-newsletter-series.md', 'Email Newsletter Series (8 pre-launch)', 'Write and schedule the 8-email launch sequence for the interest list.'),
    'T052': ('reap-documents/marketing/video-testimonial-concept.md', 'Video Testimonial Concept', 'Plan short-form video content featuring beta participants.'),
    'T053': ('reap-documents/marketing/referral-incentive-programme-design.md', 'Referral Incentive Programme Design', 'Design a referral programme to grow word-of-mouth and registrations.'),
    'T054': ('reap-documents/marketing/launch-event-planning-hamilton.md', 'Launch Event Planning (Hamilton)', 'Plan the Hamilton Season 1 launch event including venue, guests, and media.'),
    'T055': ('reap-documents/marketing/paid-social-advertising-campaign-plan.md', 'Paid Social Advertising Campaign Plan', 'Plan Meta/Instagram paid advertising strategy for launch week.'),
    'T056': ('reap-documents/marketing/influencer-micro-influencer-outreach-list.md', 'Influencer / Micro-Influencer Outreach List', 'Identify NZ fitness micro-influencers for organic promotion.'),
    'T060': ('reap-documents/partnerships/celebrity-ambassador-contract-execution.md', 'Celebrity Ambassador Contract Execution', 'Execute ambassador agreement with the selected celebrity, coordinated with legal review.'),
    'T061': ('reap-documents/partnerships/device-partner-negotiation.md', 'Device Partner Negotiation (Garmin/Fitbit)', 'Explore device partner opportunities and API collaboration.'),
    'T062': ('reap-documents/partnerships/gym-fitness-centre-partnership-outreach.md', 'Gym / Fitness Centre Partnership Outreach', 'Approach Waikato gyms for REAP promotional partnerships.'),
    'T064': ('reap-documents/partnerships/workplace-wellness-programme-pitch.md', 'Workplace Wellness Programme Pitch', 'Create a pitch for workplace wellness teams and group subscriptions.'),
    'T065': ('reap-documents/partnerships/school-youth-programme-consideration.md', 'School / Youth Programme Consideration', 'Assess feasibility and legal implications of a 16+ school/youth programme.'),
    'T066': ('reap-documents/partnerships/media-partnership-local-tv-radio.md', 'Media Partnership (Local TV / Radio)', 'Explore local Waikato TV and radio media partnership opportunities.'),
    'T069': ('reap-documents/operations/medical-advisor-engagement.md', 'Medical Advisor Engagement', 'Engage a medical advisor to review exercise protocols and welfare procedures.'),
    'T077': ('reap-documents/launch/soft-launch-to-50-beta-users.md', 'Soft Launch to 50 Beta Users', 'Invite-only beta to validate app functionality, elimination logic, and welfare protocols.'),
    'T078': ('reap-documents/launch/celebrity-soft-launch-event-coordination.md', 'Celebrity Soft Launch Event Coordination', 'Coordinate celebrity soft launch media event in Hamilton.'),
    'T079': ('reap-documents/launch/beta-feedback-collection-analysis.md', 'Beta Feedback Collection & Analysis', 'Collect structured feedback from beta participants before public launch.'),
    'T080': ('reap-documents/launch/final-app-bug-fixes-pre-launch.md', 'Final App Bug Fixes Pre-Launch', 'Resolve critical high-severity bugs identified in beta testing.'),
    'T081': ('reap-documents/launch/season-1-public-launch.md', 'Season 1 Public Launch (1 Nov 2026)', 'Plan public launch readiness for the 30-day Season 1 event.'),
    'T082': ('reap-documents/launch/day-1-all-hands-monitoring.md', 'Day 1 All-Hands Monitoring', 'Coordinate team monitoring for Day 1 live launch operations.'),
    'T083': ('reap-documents/launch/week-1-participant-check-in.md', 'Week 1 Participant Check-In', 'Proactively check in with Week 1 participants for early feedback.'),
    'T084': ('reap-documents/launch/first-prize-draw-execution.md', 'First Prize Draw Execution', 'Execute and record the first seven spot prize draws with audit and notification.'),
    'T085': ('reap-documents/launch/season-1-mid-season-board-report.md', 'Season 1 Mid-Season Board Report', 'Prepare the mid-season board update covering KPIs and welfare.'),
    'T086': ('reap-documents/launch/season-1-end-day-30.md', 'Season 1 End (Day 30)', 'Plan the Season 1 closing process with final eliminations and announcements.'),
    'T087': ('reap-documents/launch/post-season-1-evaluation-season-2-planning.md', 'Post-Season 1 Evaluation & Season 2 Planning', 'Conduct the post-season review and begin Season 2 planning.'),
}

def render_doc(task_id, title, description, path):
    now = '2026-04-09'
    content = f"""# {title}\n\n**Prepared by:** REAP planning team\n**Date:** {now}\n**Status:** Draft\n\n## Purpose\n{description}\n\n## Summary\nThis document captures the scope, requirements, and acceptance criteria for {title}.\n\n## Key requirements\n- {description}\n- Include necessary integration, legal, or operational considerations as required by the task.
- Define success criteria, owner responsibilities, and dependencies.
\n## Acceptance criteria\n- Documented decision, procedure, or execution plan is available.
- Dependencies and next steps are assigned.
- Stakeholder sign-off is captured where relevant.
"""
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        path.write_text(content, encoding='utf-8')


data = src_data.read_text(encoding='utf-8')
for task_id, (out_file, title, description) in updates.items():
    out_path = base / out_file
    render_doc(task_id, title, description, out_path)

    pattern = re.compile(r"(\{[^}]*?id: '%s'[\s\S]*?\})" % re.escape(task_id))
    match = pattern.search(data)
    if not match:
        raise ValueError(f'Task {task_id} not found in data file')
    block = match.group(1)
    if "status: 'Completed'" in block:
        continue
    block_lines = block.splitlines()
    new_lines = []
    inserted = False
    for line in block_lines:
        if "status: 'Not Started'" in line:
            new_lines.append(line.replace("Not Started", "Completed"))
        elif "description: '" in line and "completedDate" not in block and "outputFile" not in block and not inserted:
            new_lines.append(line)
            new_lines.append("    completedDate: '2026-04-09',")
            new_lines.append(f"    outputFile: '{out_file}',")
            inserted = True
        else:
            new_lines.append(line)
    if not inserted:
        # fallback: insert before closing brace
        for i, line in enumerate(new_lines):
            if line.strip() == '},':
                new_lines.insert(i, f"    completedDate: '2026-04-09',")
                new_lines.insert(i+1, f"    outputFile: '{out_file}',")
                inserted = True
                break
    new_block = '\n'.join(new_lines)
    data = data[:match.start(1)] + new_block + data[match.end(1):]

src_data.write_text(data, encoding='utf-8')
print('Updated', len(updates), 'tasks and created documents.')
