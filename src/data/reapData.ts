// Central data layer for REAP (Survive the Reap) planning dashboard
// All mock data lives here — pages import from this file only

export type TaskCategory = 'Legal' | 'Product Build' | 'Marketing' | 'Partnerships' | 'Operations' | 'Launch';
export type TaskStatus = 'Not Started' | 'In Progress' | 'Blocked' | 'Completed';
export type TaskPriority = 'Critical' | 'High' | 'Medium' | 'Low';
export type OwnerName = 'Leanne' | 'Ashleigh' | 'Shelley' | 'Dev Team';

export interface Task {
  id: string;
  name: string;
  category: TaskCategory;
  owner: OwnerName;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO date string YYYY-MM-DD
  description: string;
  notes?: string;
  dependencies?: string[]; // task IDs
  completedDate?: string; // ISO date string YYYY-MM-DD — set when status = Completed
  outputFile?: string; // resource ID (e.g. 'R005') — links to a resource in the resources array
}

export interface TeamMember {
  id: string;
  name: OwnerName;
  role: string;
  email: string;
  initials: string;
  color: string; // Tailwind bg class
  textColor: string; // Tailwind text class
  areas: string[];
  bio: string;
}

export interface Season {
  id: string;
  name: string;
  number: number;
  status: 'Planning' | 'Ready' | 'Active' | 'Complete';
  launchDate: string;
  softLaunchDate?: string;
  boardApprovalDeadline?: string;
  legalSignOffDeadline?: string;
  seasonEndDate: string;
  targetParticipants: number;
  subscriptionPrice: number;
  prizePool: number;
  description: string;
}

export interface Resource {
  id: string;
  title: string;
  category: 'Legal' | 'Operations' | 'Marketing' | 'Governance' | 'Product' | 'Technical' | 'Product Copy';
  type: 'Policy' | 'Agreement' | 'Strategy' | 'Report' | 'Protocol' | 'Framework';
  description: string;
  dateCreated: string; // ISO date string YYYY-MM-DD
  status: 'Draft' | 'Draft — Awaiting Legal Review' | 'Under Review' | 'Approved' | 'Final' | 'Complete';
  owner: OwnerName;
  filePath?: string; // relative path from /public e.g. '/docs/REAP-Governance.md'
}

export interface MediaAsset {
  id: string;
  name: string;
  type: 'Logo' | 'Marketing' | 'UI Screenshot' | 'Brand Asset' | 'Document';
  format: string;
  uploadDate: string;
  size: string;
  tags: string[];
}

export interface Risk {
  id: string;
  risk: string;
  category: 'Legal' | 'Operational' | 'Financial' | 'Reputational' | 'Technical';
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  likelihood: 'High' | 'Medium' | 'Low';
  mitigation: string;
  status: 'Open' | 'Mitigated' | 'Accepted' | 'Closed';
  owner: OwnerName;
}

export interface WelfareIncident {
  id: string;
  dateTime: string;
  participantId: string;
  natureOfContact: string;
  severityLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  responseTaken: string;
  outcome: string;
  escalatedToCEO: boolean;
  boardNotified: boolean;
  legalAdviceSought: boolean;
  followUpActions: string;
  status: 'Open' | 'Resolved' | 'Escalated';
}

export interface BudgetItem {
  category: string;
  item: string;
  year1: number;
  year2: number;
  year3: number;
  notes: string;
}

export interface RevenueScenario {
  name: string;
  subscribers: number;
  monthlyRevenue: number;
  annualRevenue: number;
  breakEven: boolean;
}

export interface RefundScenario {
  situation: string;
  refundAvailable: boolean;
  note?: string;
}

export interface AmbassadorPost {
  post: string;
  timing: string;
  description: string;
}

export interface Competitor {
  product: string;
  country: string;
  model: string;
  status: string;
  threat: string;
}

export interface PreLaunchAction {
  action: string;
  rationale: string;
  timeline: string;
}

export interface GovernanceRole {
  role: string;
  authority: string;
  reporting: string;
}

export interface DecisionEntry {
  decision: string;
  developer: string;
  llLead: string;
  ceo: string;
  board: string;
}

export interface PauseShutdownTrigger {
  tier: 'Tier 1' | 'Tier 2';
  trigger: string;
  action: string;
}

export interface LegalSignOffDoc {
  document: string;
  requiredBefore: string;
  shelleySignOff: string;
}

export interface ReportingEntry {
  report: string;
  frequency: string;
  author: string;
  recipient: string;
}

// ─── TEAM ────────────────────────────────────────────────────────────────────

export const team: TeamMember[] = [
  {
    id: 'leanne',
    name: 'Leanne',
    role: 'Chief Executive Officer',
    email: 'leanne@sportwaikato.org.nz',
    initials: 'LE',
    color: 'bg-blue-100',
    textColor: 'text-blue-700',
    areas: ['Board Relations', 'Partnerships', 'Legal Oversight', 'Launch Strategy', 'Prize Fund'],
    bio: 'CEO of Sport Waikato. Responsible for board approval, strategic partnerships, celebrity ambassador recruitment, and final sign-off on REAP launch conditions.',
  },
  {
    id: 'ashleigh',
    name: 'Ashleigh',
    role: 'Digital Innovation Lead',
    email: 'ashleigh@sportwaikato.org.nz',
    initials: 'AS',
    color: 'bg-purple-100',
    textColor: 'text-purple-700',
    areas: ['Product Development', 'Welfare Register', 'Marketing', 'Operations', 'Brand Identity'],
    bio: 'Living Lab lead managing day-to-day product decisions. Oversees the Lovable app build, welfare protocols, marketing execution, and operational SOPs.',
  },
  {
    id: 'shelley',
    name: 'Shelley',
    role: 'Legal Counsel',
    email: 'shelley@sportwaikato.org.nz',
    initials: 'SH',
    color: 'bg-red-100',
    textColor: 'text-red-700',
    areas: ['Gambling Act 2003', 'Privacy Act 2020', 'Terms & Conditions', 'Consumer Law', 'DIA Enquiry'],
    bio: 'Legal counsel responsible for all compliance work. Leading the DIA informal enquiry, Gambling Act safe harbour analysis, privacy policy, and all legal document sign-offs.',
  },
  {
    id: 'devteam',
    name: 'Dev Team',
    role: 'Product Engineering',
    email: 'dev@sportwaikato.org.nz',
    initials: 'DT',
    color: 'bg-green-100',
    textColor: 'text-green-700',
    areas: ['Lovable App Build', 'Wearable Integration', 'Stripe Billing', 'Elimination Logic', 'Security'],
    bio: 'Development team building survivethereap.nz on the Lovable platform. Responsible for wearable device integration, subscription billing, elimination notification system, and app security.',
  },
];

// ─── TASKS ───────────────────────────────────────────────────────────────────

export const tasks: Task[] = [
  // LEGAL (T001–T017)
  {
    id: 'T001',
    name: 'File DIA Informal Enquiry',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-05-15',
    description: 'Submit formal informal enquiry to the Department of Internal Affairs regarding gambling classification of REAP prize structure.',
    notes: 'Letter drafted. Awaiting CEO review before submission.',
    dependencies: [],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/dia-informal-enquiry-T001.md',
  },
  {
    id: 'T002',
    name: 'Gambling Act 2003 Compliance Review',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-06-01',
    description: 'Complete full analysis of REAP against Gambling Act 2003 — confirm prize structure qualifies as lawful promotional competition.',
    dependencies: ['T001'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/gambling-act-compliance-review-T002.md',
  },
  {
    id: 'T003',
    name: 'Privacy Act 2020 Compliance Review',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-06-01',
    description: 'Review health data collection, storage, and processing against Privacy Act 2020 obligations. Include wearable data considerations.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/privacy-act-compliance-review-T003.md',
  },
  {
    id: 'T004',
    name: 'Consumer Guarantees Act Review',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-06-15',
    description: 'Assess obligations under Consumer Guarantees Act 1993 and Fair Trading Act 1986 as they apply to REAP subscriptions.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/consumer-guarantees-act-review.md',
  },
  {
    id: 'T005',
    name: 'Terms and Conditions Draft',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-06-30',
    description: 'Draft full Terms and Conditions covering subscription, elimination rules, prize eligibility, data use, and dispute resolution.',
    dependencies: ['T002', 'T003'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/terms-and-conditions.md',
  },
  {
    id: 'T006',
    name: 'Privacy Policy Draft',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-06-30',
    description: 'Draft Privacy Policy covering health data collection (wearables), storage location, third-party sharing, and participant rights.',
    dependencies: ['T003'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/privacy-policy.md',
  },
  {
    id: 'T007',
    name: 'Refund Policy Finalisation',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-06-30',
    description: 'Finalise refund policy for eliminated and voluntary-exit participants. Define pro-rata calculation and processing timeline.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/refund-policy.md',
  },
  {
    id: 'T008',
    name: 'Celebrity Ambassador Agreement Finalisation',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-07-15',
    description: 'Finalise ambassador agreement template including IP rights, exclusivity clauses, moral rights, and termination provisions.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/celebrity-ambassador-agreement-template.md',
    dependencies: ['T059'],
  },
  {
    id: 'T009',
    name: 'Sponsorship Contract Template',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-07-15',
    description: 'Create standard sponsorship agreement for potential corporate partners.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/sponsorship-contract-template.md',
  },
  {
    id: 'T010',
    name: 'Data Retention Policy',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-06-30',
    description: 'Define data retention periods for participant health data, payment records, and welfare incidents.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/data-retention-policy.md',
    dependencies: ['T003'],
  },
  {
    id: 'T011',
    name: 'Legal Sign-Off on Prize Structure',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-07-31',
    description: 'Formal legal sign-off confirming 7x$666 prize structure funded from SW operational budget is lawful and does not constitute gambling.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/legal-signoff-prize-structure.md',
    dependencies: ['T001', 'T002'],
  },
  {
    id: 'T012',
    name: 'Gambling Act Safe Harbour Confirmation',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-07-31',
    description: 'Obtain DIA response or legal opinion confirming REAP qualifies under promotional competition safe harbour provisions.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/gambling-act-safe-harbour-confirmation.md',
    dependencies: ['T001', 'T002'],
  },
  {
    id: 'T013',
    name: 'Parental Consent Framework',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-07-15',
    description: 'Develop parental consent requirements for under-18 participants, including age verification approach.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/parental-consent-framework.md',
  },
  {
    id: 'T014',
    name: 'End User Licence Agreement (EULA)',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-07-15',
    description: 'Draft EULA governing use of the survivethereap.nz application.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/eula.md',
    dependencies: ['T005'],
  },
  {
    id: 'T015',
    name: 'Board Legal Approval',
    category: 'Legal',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-07-31',
    description: 'Obtain Sport Waikato board formal approval of all legal documents and compliance framework.',
    dependencies: ['T011', 'T012'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/board-legal-approval-T015.md',
  },
  {
    id: 'T016',
    name: 'NZ Commerce Commission Review',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-08-01',
    description: 'Review marketing materials and claims against Commerce Commission fair trading guidelines.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/commerce-commission-review.md',
  },
  {
    id: 'T017',
    name: 'IP Protection for REAP Brand',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2026-08-01',
    description: 'Register "Survive the Reap" as a trademark. Assess logo and name protectability.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/ip-protection-brand.md',
  },

  // PRODUCT BUILD (T018–T042)
  {
    id: 'T018',
    name: 'Lovable App Core Setup (React/TypeScript/Supabase/Stripe)',
    category: 'Product Build',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-04-09',
    description: 'Core app built on Lovable platform (React 18, TypeScript, Vite, Supabase PostgreSQL, Supabase Auth, Stripe). Registration, dashboard, admin panel, survival board all functional.',
    notes: 'Completed per Appendix C build status. Web app only — no App Store submission required.',
    completedDate: '2026-04-09',
    outputFile: 'R013',
  },
  {
    id: 'T019',
    name: 'User Registration & Authentication Flow',
    category: 'Product Build',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-04-09',
    description: 'Email/password registration via Supabase Auth, season entry flow, participant dashboard, and admin panel all complete and functional.',
    notes: 'Completed per Appendix C. Admin dashboard uses real Supabase queries, not mock data.',
    completedDate: '2026-04-09',
    outputFile: 'R013',
  },
  {
    id: 'T020',
    name: 'TERRA API Decision & Integration (Unified Wearables)',
    category: 'Product Build',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-06-30',
    description: 'Decision required by June 2026 on TERRA API as unified wearable integration layer. TERRA covers Apple Health, Garmin Connect, Fitbit, Strava, Google Fit, Polar, Whoop, Samsung Health via a single API — avoids maintaining individual device integrations.',
    notes: 'TERRA replaces individual Garmin/Fitbit/Apple API tasks. Decision and integration are a single workstream.',
    dependencies: ['T018'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T021',
    name: 'Research Consent Checkbox (Registration)',
    category: 'Product Build',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-06-30',
    description: 'Privacy Act 2020 requirement: explicit opt-in consent for research data use at registration. Must be unchecked by default and separate from T&Cs acceptance.',
    dependencies: ['T018'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T022',
    name: 'Stripe Webhook Handler (paid_at confirmation)',
    category: 'Product Build',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-06-15',
    description: 'Stripe webhook handler to set paid_at on subscription confirmation. Without this, payment confirmation never reaches the database and participants cannot be confirmed as active survivors for spot prize draw eligibility.',
    notes: 'Currently subscription confirmation never sets paid_at — this is a blocking build item.',
    dependencies: ['T018'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/stripe-webhook-spec.md',
  },
  {
    id: 'T023',
    name: 'Zone 2 Heart Rate Detection Algorithm',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-06-30',
    description: 'Build algorithm to calculate Zone 2 heart rate range per participant (60–70% max HR) and validate movement minutes.',
    dependencies: ['T020'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T024',
    name: '21-Minute Movement Verification System',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-07-01',
    description: 'Daily check system: verify each participant achieved 21+ continuous minutes in Zone 2 before midnight.',
    dependencies: ['T023'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T025',
    name: 'Midnight Elimination Notification System',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-07-15',
    description: 'Automated push notification system for elimination events at midnight NZT. Include welfare check trigger logic.',
    dependencies: ['T024', 'T026'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T026',
    name: 'Push Notification Infrastructure',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-07-01',
    description: 'Set up push notification delivery infrastructure (iOS APNs and Android FCM).',
    dependencies: ['T018'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T027',
    name: 'Stripe Subscription Billing',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-06-15',
    description: 'Integrate Stripe for $13/month recurring subscriptions. Include trial period and cancellation flow.',
    dependencies: ['T018'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T028',
    name: 'Payment Gateway Testing',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-07-01',
    description: 'End-to-end testing of Stripe integration including failed payments, refund processing, and subscription management.',
    dependencies: ['T027'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/stripe-payment-testing-T028.md',
  },
  {
    id: 'T029',
    name: 'Participant Dashboard & Survival Board',
    category: 'Product Build',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-04-09',
    description: 'Participant dashboard (alive/fallen status, days survived, season info) and Survival Board (live leaderboard of surviving participants) both complete and live.',
    notes: 'Completed per Appendix C. spotPrizeWins column removed from Survival Board — correct per spot prize framing.',
    completedDate: '2026-04-09',
    outputFile: 'R013',
  },
  {
    id: 'T030',
    name: 'Elimination Broadcast Feed',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-07-31',
    description: 'Real-time feed showing eliminations as they happen — creates social tension and FOMO among participants.',
    dependencies: ['T025'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T031',
    name: 'User Profile & Stats Page',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-07-31',
    description: 'Personal stats page with historical movement data, season history, and achievement badges.',
    dependencies: ['T029'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T032',
    name: 'Admin Panel — Spot Prize Draw Mechanism',
    category: 'Product Build',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-07-15',
    description: 'Admin panel exists and uses real Supabase data. Still needed: spot prize draw mechanism — random selection from eligible pool (active, confirmed-paid survivors), timestamped, logged, and auditable. Required before Season 1.',
    notes: 'Built interactive Prize Draw Record form component with fields for draw ID, winner details, eligible pool size, randomization method, and payment status. Integrated at /prize-draws with full edit/save functionality.',
    completedDate: '2026-04-09',
    outputFile: 'src/pages/PrizeDrawRecord.tsx',
  },
  {
    id: 'T033',
    name: 'Welfare Incident Reporting Tool (Admin)',
    category: 'Product Build',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-07-15',
    description: 'Admin tool to log, track, and escalate welfare incidents directly linked to participant accounts.',
    dependencies: ['T032'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T034',
    name: 'Automated Refund Processing',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-08-01',
    description: 'Automated pro-rata refund calculation and Stripe refund initiation on elimination or voluntary exit.',
    dependencies: ['T028', 'T007'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T035',
    name: 'Spot Prize Draw Backend (Admin Tool)',
    category: 'Product Build',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-08-15',
    description: 'Admin tool for executing the 7 spot prize draws per season. Must: (1) query eligible pool (active, confirmed-paid survivors at draw trigger point), (2) perform random selection, (3) log timestamp, eligible pool count, and winner ID for audit trail, (4) trigger winner notification email via Resend.',
    notes: 'Draws are at Day 7, 13, 14, 21, 24 (Redemption Day), 28, 30. Must NEVER describe as lottery or gambling. These are promotional spot prize draws subsidiary to the game.',
    dependencies: ['T022', 'T012'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T036',
    name: 'Season State Machine',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-08-01',
    description: 'Season lifecycle logic: Registration Open → Active → Paused → Ended. Include Tier 1/2 pause trigger integration.',
    dependencies: ['T024'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T037',
    name: 'Medical Exemption Workflow',
    category: 'Product Build',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-08-01',
    description: 'In-app process for participants to request a medical hold (up to 7 days) without elimination. Include admin review step.',
    dependencies: ['T032'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T038',
    name: 'Welfare Register Data Export',
    category: 'Product Build',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-08-01',
    description: 'CSV export functionality for welfare register accessible to admin and board.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },
  {
    id: 'T039',
    name: 'App Accessibility Audit (WCAG 2.1 AA)',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-09-01',
    description: 'Full accessibility audit against WCAG 2.1 AA standard including screen reader compatibility.',
    dependencies: ['T029', 'T031'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/accessibility-audit-T039.md',
  },
  {
    id: 'T040',
    name: 'Load Testing (500 Concurrent Users)',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-09-15',
    description: 'Simulate 500 concurrent participants to validate midnight elimination system performance.',
    dependencies: ['T025'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/load-testing-plan-T040.md',
  },
  {
    id: 'T041',
    name: 'Security Penetration Test',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-09-15',
    description: 'External pen test of survivethereap.nz covering auth, data exposure, and payment security.',
    dependencies: ['T028'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/security-penetration-test-T041.md',
  },
  {
    id: 'T042',
    name: 'Redemption Day Declaration Flow',
    category: 'Product Build',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-08-01',
    description: 'Participants can pre-declare a Redemption Day — a structured rest day that protects them from elimination. Build the in-app declaration flow, admin review, and Day 24 draw eligibility check. Web app only — no App Store submission required for survivethereap.nz.',
    notes: 'Redemption Day is a core game mechanic. Day 24 spot prize draw is for Redemption Day-eligible survivors specifically.',
    dependencies: ['T018'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/product-build-code.md',
  },

  // MARKETING (T043–T056)
  {
    id: 'T043',
    name: 'Brand Identity Finalisation',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-05-15',
    description: 'Finalise logo, colour palette, typography, and visual brand guidelines for all REAP touchpoints.',
  },
  {
    id: 'T044',
    name: 'Website Content (survivethereap.nz)',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-06-01',
    description: 'Write and publish all homepage content including game rules, FAQ, prize structure, and sign-up CTA.',
    dependencies: ['T043'],
  },
  {
    id: 'T045',
    name: 'Social Media Accounts Setup',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-06-01',
    description: 'Establish Instagram, TikTok, and Facebook accounts with consistent branding and bio copy.',
    completedDate: '2026-04-01',
  },
  {
    id: 'T046',
    name: 'Pre-Launch Content Calendar',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-07-01',
    description: 'Plan 4-month content calendar (July–October) for social media warm-up campaign.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/pre-launch-content-calendar.md',
    dependencies: ['T043', 'T045'],
  },
  {
    id: 'T047',
    name: 'Pre-Registration Campaign',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-08-01',
    description: 'Launch pre-registration landing page and email capture campaign targeting Waikato fitness community.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/pre-registration-campaign.md',
    dependencies: ['T044'],
  },
  {
    id: 'T048',
    name: 'Celebrity Ambassador Announcement Strategy',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-09-01',
    description: 'Plan media strategy around celebrity ambassador announcement — timing, channels, and key messages.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/celebrity-ambassador-announcement-strategy.md',
    dependencies: ['T059', 'T060'],
  },
  {
    id: 'T049',
    name: 'Press Release — Soft Launch',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-10-01',
    description: 'Draft and distribute press release for celebrity soft launch event.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/press-release-soft-launch.md',
    dependencies: ['T048'],
  },
  {
    id: 'T050',
    name: 'Waikato Media Outreach Plan',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-09-15',
    description: 'Build media list for Waikato region journalists (Waikato Times, RNZ, TVNZ, Newshub).',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/waikato-media-outreach-plan.md',
  },
  {
    id: 'T051',
    name: 'Email Newsletter Series (8 pre-launch)',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-09-15',
    description: 'Write and schedule 8-email launch sequence for registered interest list.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/email-newsletter-series.md',
    dependencies: ['T047'],
  },
  {
    id: 'T052',
    name: 'Video Testimonial Concept',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2026-10-01',
    description: 'Plan short-form video content (30s TikTok/Instagram Reels) featuring beta participants.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/video-testimonial-concept.md',
    dependencies: ['T077'],
  },
  {
    id: 'T053',
    name: 'Referral Incentive Programme Design',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-10-01',
    description: 'Design friend-referral programme to incentivise word-of-mouth growth.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/referral-incentive-programme-design.md',
  },
  {
    id: 'T054',
    name: 'Launch Event Planning (Hamilton)',
    category: 'Marketing',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-10-15',
    description: 'Plan public Season 1 launch event in Hamilton — venue, guest list, media, catering.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/launch-event-planning-hamilton.md',
    dependencies: ['T059'],
  },
  {
    id: 'T055',
    name: 'Paid Social Advertising Campaign Plan',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-10-01',
    description: 'Plan Meta/Instagram paid advertising strategy for Season 1 launch week.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/paid-social-advertising-campaign-plan.md',
  },
  {
    id: 'T056',
    name: 'Influencer / Micro-Influencer Outreach List',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2026-10-15',
    description: 'Identify and approach NZ fitness micro-influencers (5k–50k followers) for organic promotion.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/influencer-micro-influencer-outreach-list.md',
  },

  // PARTNERSHIPS (T057–T066)
  {
    id: 'T057',
    name: 'Sport Waikato Board Approval',
    category: 'Partnerships',
    owner: 'Leanne',
    status: 'In Progress',
    priority: 'Critical',
    dueDate: '2026-07-31',
    description: 'Obtain formal board resolution approving REAP as an official Living Lab product with Year 1 budget commitment.',
    dependencies: ['T015'],
  },
  {
    id: 'T058',
    name: 'Living Lab Governance Sign-Off',
    category: 'Partnerships',
    owner: 'Leanne',
    status: 'In Progress',
    priority: 'Critical',
    dueDate: '2026-07-31',
    description: 'Confirm Living Lab operating framework, decision authority matrix, and REAP separation from SW core operations.',
    dependencies: ['T015'],
  },
  {
    id: 'T059',
    name: 'Celebrity Ambassador Recruitment',
    category: 'Partnerships',
    owner: 'Leanne',
    status: 'In Progress',
    priority: 'Critical',
    dueDate: '2026-09-01',
    description: 'Identify and secure commitment from at least one NZ celebrity ambassador for soft launch in October 2026.',
  },
  {
    id: 'T060',
    name: 'Celebrity Ambassador Contract Execution',
    category: 'Partnerships',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-09-15',
    description: 'Execute ambassador agreement with selected celebrity. Coordinate with Shelley on legal review.',
    dependencies: ['T059', 'T008'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/partnerships/celebrity-ambassador-execution-T060.md',
  },
  {
    id: 'T061',
    name: 'Device Partner Negotiation (Garmin/Fitbit)',
    category: 'Partnerships',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-08-01',
    description: 'Explore co-marketing or API partnership opportunities with Garmin NZ and Fitbit ANZ.',
    dependencies: ['T020'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/partnerships/device-partner-outreach-T061.md',
  },
  {
    id: 'T062',
    name: 'Gym / Fitness Centre Partnership Outreach',
    category: 'Partnerships',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-09-01',
    description: 'Approach 5–10 Waikato gyms as REAP promotional partners offering member discounts.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/partnerships/gym-partnership-programme-T062.md',
  },
  {
    id: 'T063',
    name: 'GP / Healthcare Provider Brief',
    category: 'Partnerships',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-08-01',
    description: 'Prepare briefing document for GPs who may be asked about REAP by patients. Include medical welfare protocol.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/operations/gp-healthcare-provider-brief.md',
    dependencies: ['T067'],
  },
  {
    id: 'T064',
    name: 'Workplace Wellness Programme Pitch',
    category: 'Partnerships',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-09-15',
    description: 'Create group/corporate subscription pitch for workplace wellness teams.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/partnerships/workplace-wellness-pitch-T064.md',
  },
  {
    id: 'T065',
    name: 'School / Youth Programme Consideration',
    category: 'Partnerships',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2026-10-01',
    description: 'Assess feasibility and legal implications of a school or youth version of REAP (16+ age bracket).',
    dependencies: ['T013'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/partnerships/youth-programme-assessment-T065.md',
  },
  {
    id: 'T066',
    name: 'Media Partnership (Local TV / Radio)',
    category: 'Partnerships',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-09-01',
    description: 'Explore media partnership with Waikato-based TV or radio stations for editorial coverage and co-promotion.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/partnerships/media-partnership-strategy-T066.md',
  },

  // OPERATIONS (T067–T076)
  {
    id: 'T067',
    name: 'Welfare Register Setup and SOP',
    category: 'Operations',
    owner: 'Ashleigh',
    status: 'In Progress',
    priority: 'Critical',
    dueDate: '2026-06-30',
    description: 'Establish welfare register and standard operating procedure for logging, reviewing, and escalating participant incidents.',
  },
  {
    id: 'T068',
    name: 'Incident Response Protocol Finalisation',
    category: 'Operations',
    owner: 'Ashleigh',
    status: 'In Progress',
    priority: 'Critical',
    dueDate: '2026-07-15',
    description: 'Finalise step-by-step incident response protocol for welfare events including escalation to CEO and board.',
    dependencies: ['T067'],
  },
  {
    id: 'T069',
    name: 'Medical Advisor Engagement',
    category: 'Operations',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-07-01',
    description: 'Engage a medical advisor (GP or sports medicine physician) to review REAP exercise protocols and welfare procedures.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/operations/medical-advisor-brief-T069.md',
  },
  {
    id: 'T070',
    name: 'Customer Support Process Design',
    category: 'Operations',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-08-01',
    description: 'Design tiered customer support process: self-service FAQ, email support, and escalation path.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/operations/customer-support-process.md',
  },
  {
    id: 'T071',
    name: 'Refund Processing SOP',
    category: 'Operations',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-08-01',
    description: 'Operational procedure for reviewing and processing refund requests within 5 business days.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/operations/refund-processing-sop.md',
    dependencies: ['T007', 'T034'],
  },
  {
    id: 'T072',
    name: 'Prize Draw Procedure (Witnessed & Recorded)',
    category: 'Operations',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-08-15',
    description: 'Formal procedure for running the 7 spot prize draws per season: random selection from eligible pool, independent witness, video recording, notification email, and audit log. Draws are at Day 7, 13, 14, 21, 24, 28, and 30. Prize fund is $4,662/season (7 × $666) from SW operational funds.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/prize-draw-record-template.md',
    dependencies: ['T035', 'T012'],
  },
  {
    id: 'T073',
    name: 'Season Pause / Shutdown Trigger SOP',
    category: 'Operations',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-08-15',
    description: 'Documented Tier 1 (operational) and Tier 2 (board-required) season pause triggers and protocols.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/operations/season-pause-shutdown-sop.md',
    dependencies: ['T036'],
  },
  {
    id: 'T074',
    name: 'Financial Reporting Framework',
    category: 'Operations',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-09-01',
    description: 'Establish monthly financial reporting for REAP: subscription revenue, prize draws, operational costs.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/operations/financial-reporting-framework.md',
  },
  {
    id: 'T075',
    name: 'Board Reporting Cadence (Monthly)',
    category: 'Operations',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-09-01',
    description: 'Formalise monthly board report template for REAP covering KPIs, welfare incidents, and financial summary.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/operations/board-reporting-cadence.md',
    dependencies: ['T074'],
  },
  {
    id: 'T076',
    name: 'Post-Season Retrospective Template',
    category: 'Operations',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2026-12-01',
    description: 'Template for end-of-season retrospective covering participant feedback, operational learnings, and Season 2 recommendations.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/operations/post-season-retrospective-template.md',
  },

  // LAUNCH (T077–T087)
  {
    id: 'T077',
    name: 'Soft Launch to 50 Beta Users',
    category: 'Launch',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-10-01',
    description: 'Invite-only beta with 50 selected participants to validate app functionality, elimination logic, and welfare protocols.',
    dependencies: ['T025', 'T028', 'T036'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/launch/beta-launch-runbook-T077.md',
  },
  {
    id: 'T078',
    name: 'Celebrity Soft Launch Event Coordination',
    category: 'Launch',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-10-15',
    description: 'Coordinate celebrity soft launch media event in Hamilton. Press, photos, and social content creation.',
    dependencies: ['T059', 'T060'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/launch/celebrity-launch-event-T078.md',
  },
  {
    id: 'T079',
    name: 'Beta Feedback Collection & Analysis',
    category: 'Launch',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-10-15',
    description: 'Collect structured feedback from 50 beta participants. Identify critical issues before public launch.',
    dependencies: ['T077'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/launch/beta-feedback-framework-T079.md',
  },
  {
    id: 'T080',
    name: 'Final App Bug Fixes Pre-Launch',
    category: 'Launch',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-10-20',
    description: 'Resolve all critical and high severity bugs identified in beta testing phase.',
    dependencies: ['T079'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/launch/pre-launch-bug-fix-protocol-T080.md',
  },
  {
    id: 'T081',
    name: 'Season 1 Public Launch (1 Nov 2026)',
    category: 'Launch',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-11-01',
    description: 'Season 1 officially opens to the public. All systems live. 30-day survival game begins.',
    dependencies: ['T015', 'T080'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/launch/season1-launch-runbook-T081-T082.md',
  },
  {
    id: 'T082',
    name: 'Day 1 All-Hands Monitoring',
    category: 'Launch',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-11-01',
    description: 'Full team on standby for Day 1 of Season 1. Monitor all systems, payments, and welfare in real-time.',
    dependencies: ['T081'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/launch/season1-launch-runbook-T081-T082.md',
  },
  {
    id: 'T083',
    name: 'Week 1 Participant Check-In',
    category: 'Launch',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-11-07',
    description: 'Proactive check-in with all Week 1 participants via in-app message. Gather early experience feedback.',
    dependencies: ['T082'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/launch/week1-participant-checkin-T083.md',
  },
  {
    id: 'T084',
    name: 'First Prize Draw Execution',
    category: 'Launch',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-11-30',
    description: 'Execute first 7 spot prize draws across Season 1 at milestone points (Days 7, 13, 14, 21, 24, 28, 30). Random selection from active confirmed-paid survivors at each draw point. Record, witness, and publish results. Total prize fund: $4,662.',
    dependencies: ['T072'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/launch/prize-draw-execution-procedure-T084.md',
  },
  {
    id: 'T085',
    name: 'Season 1 Mid-Season Board Report',
    category: 'Launch',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-12-01',
    description: 'Prepare and present mid-season update to Sport Waikato board covering KPIs, welfare incidents, and financial performance.',
    dependencies: ['T075'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/launch/board-report-template-T085.md',
  },
  {
    id: 'T086',
    name: 'Season 1 End (Day 30)',
    category: 'Launch',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-11-30',
    description: 'Season 1 officially closes. Final eliminations processed. Winner announcements. Subscription cancellations/renewals.',
    dependencies: ['T081'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/launch/season-close-procedure-T086.md',
  },
  {
    id: 'T087',
    name: 'Post-Season 1 Evaluation & Season 2 Planning',
    category: 'Launch',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-12-15',
    description: 'Full evaluation of Season 1 against KPIs. Begin Season 2 planning including date, pricing, and improvements.',
    dependencies: ['T076', 'T086'],
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/launch/post-season-evaluation-T087.md',
  },
  {
    id: 'T088',
    name: 'Competition Rules Draft',
    category: 'Legal',
    owner: 'Shelley',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-08-01',
    description: 'Draft competition rules for the REAP promotional contest, including eligibility, prize structure, and compliance requirements.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/legal/competition-rules.md',
  },
  {
    id: 'T089',
    name: 'Board Update Template',
    category: 'Legal',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-08-01',
    description: 'Create a standardized board update template covering strategy, finances, legal status, and launch readiness.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/governance/board-update-template.md',
  },
  {
    id: 'T090',
    name: 'DIA Enquiry Letter',
    category: 'Legal',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'Critical',
    dueDate: '2026-08-01',
    description: 'Draft the letter for the Department of Internal Affairs enquiry regarding the REAP competition and prize structure.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/governance/dia-enquiry-letter.md',
  },
  {
    id: 'T091',
    name: 'Equity Access Policy',
    category: 'Legal',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-08-01',
    description: 'Document the equity access policy for REAP participation, including fairness, accessibility, and inclusion guidelines.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/governance/equity-access-policy.md',
  },
  {
    id: 'T092',
    name: 'Welfare Disputes Protocol',
    category: 'Legal',
    owner: 'Leanne',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-08-01',
    description: 'Finalize the welfare disputes protocol for participant concerns and escalation pathways.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/governance/welfare-disputes-protocol.md',
  },
  {
    id: 'T093',
    name: 'Onboarding Messages',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-10-01',
    description: 'Create onboarding message copy for new REAP participants to explain the product experience and next steps.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/product-copy/onboarding-messages.md',
  },
  {
    id: 'T094',
    name: 'Elimination Messages',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-10-01',
    description: 'Write participant-facing messages for elimination notifications that are compassionate and compliant.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/product-copy/elimination-messages.md',
  },
  {
    id: 'T095',
    name: 'Email Sequences',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-10-01',
    description: 'Develop the email sequence series for participant updates, launch promotion, and retention messaging.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/product-copy/email-sequences.md',
  },
  {
    id: 'T096',
    name: 'Support Templates',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-10-01',
    description: 'Create customer support templates for common participant questions and issue escalation.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/product-copy/support-templates.md',
  },
  {
    id: 'T097',
    name: 'Launch Campaign',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-10-01',
    description: 'Plan the REAP season launch campaign, including messaging, channels, and execution milestones.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/launch-campaign.md',
  },
  {
    id: 'T098',
    name: 'Halloween Sequence',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-10-01',
    description: 'Create the Halloween campaign sequence and themed messaging for REAP launch season.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/halloween-sequence.md',
  },
  {
    id: 'T099',
    name: 'Celebrity Invite',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-10-01',
    description: 'Draft the celebrity invite campaign brief and outreach copy for ambassador recruitment.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/celebrity-invite.md',
  },
  {
    id: 'T100',
    name: 'Funder Briefing',
    category: 'Marketing',
    owner: 'Ashleigh',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-10-01',
    description: 'Prepare a funder briefing document outlining REAP launch strategy and investment ask.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/marketing/funder-briefing.md',
  },
  {
    id: 'T101',
    name: 'Database Schema',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-10-01',
    description: 'Document the REAP database schema design for participant data, sessions, and wearable integration.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/database-schema.md',
  },
  {
    id: 'T102',
    name: 'API Documentation',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-10-01',
    description: 'Create API documentation for REAP backend services, webhook endpoints, and authentication flows.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/api-documentation.md',
  },
  {
    id: 'T103',
    name: 'Cron Job Spec',
    category: 'Product Build',
    owner: 'Dev Team',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-10-01',
    description: 'Specify scheduled cron jobs for REAP elimination checks, notifications, and daily reporting.',
    completedDate: '2026-04-09',
    outputFile: 'reap-documents/technical/cron-job-spec.md',
  },
];

// ─── SEASONS ─────────────────────────────────────────────────────────────────
// Seasons run monthly: 1st of each month to last day of that month (23:59 NZST).
// Some months are 28, 30, or 31 days. Spot prize draws still run at Days 7, 13, 14, 21, 24, 28, 30.
// Year 1 = 2 seasons (Nov + Dec 2026). From Jan 2027 = 12 seasons per calendar year.

export const seasons: Season[] = [
  {
    id: 'S1',
    name: 'Season 1 — November 2026',
    number: 1,
    status: 'Planning',
    launchDate: '2026-11-01',
    softLaunchDate: '2026-10-01',
    boardApprovalDeadline: '2026-07-31',
    legalSignOffDeadline: '2026-07-31',
    seasonEndDate: '2026-11-30',
    targetParticipants: 250,
    subscriptionPrice: 13,
    prizePool: 4662,
    description: 'Inaugural season — 30 days. Celebrity soft launch October 2026. Public launch 1 November. 7 spot prize draws of $666 at milestone points (Days 7, 13, 14, 21, 24, 28, 30). Prize fund from SW operational budget only.',
  },
  {
    id: 'S2',
    name: 'Season 2 — December 2026',
    number: 2,
    status: 'Planning',
    launchDate: '2026-12-01',
    seasonEndDate: '2026-12-31',
    targetParticipants: 300,
    subscriptionPrice: 13,
    prizePool: 4662,
    description: '31-day season. Word-of-mouth from Season 1. Christmas period — adjusted messaging. 7 spot prize draws at milestone points. Year 1 closes.',
  },
  {
    id: 'S3',
    name: 'Season 3 — January 2027',
    number: 3,
    status: 'Planning',
    launchDate: '2027-01-01',
    seasonEndDate: '2027-01-31',
    targetParticipants: 350,
    subscriptionPrice: 13,
    prizePool: 4662,
    description: '31-day season. New Year resolution cohort — high acquisition potential. First season of Year 2. 7 spot prize draws at milestone points.',
  },
  {
    id: 'S4',
    name: 'Season 4 — February 2027',
    number: 4,
    status: 'Planning',
    launchDate: '2027-02-01',
    seasonEndDate: '2027-02-28',
    targetParticipants: 370,
    subscriptionPrice: 13,
    prizePool: 4662,
    description: '28-day season (shortest of the year). Spot prize draws still run at Days 7, 13, 14, 21, 24, 28 — Day 30 draw moves to Day 28 (season end).',
  },
  {
    id: 'S5',
    name: 'Season 5 — March 2027',
    number: 5,
    status: 'Planning',
    launchDate: '2027-03-01',
    seasonEndDate: '2027-03-31',
    targetParticipants: 390,
    subscriptionPrice: 13,
    prizePool: 4662,
    description: '31-day season. Autumn cohort. Corporate group league expansion target.',
  },
  {
    id: 'S6',
    name: 'Season 6 — April 2027',
    number: 6,
    status: 'Planning',
    launchDate: '2027-04-01',
    seasonEndDate: '2027-04-30',
    targetParticipants: 410,
    subscriptionPrice: 13,
    prizePool: 4662,
    description: '30-day season.',
  },
  {
    id: 'S7',
    name: 'Season 7 — May 2027',
    number: 7,
    status: 'Planning',
    launchDate: '2027-05-01',
    seasonEndDate: '2027-05-31',
    targetParticipants: 430,
    subscriptionPrice: 13,
    prizePool: 4662,
    description: '31-day season.',
  },
  {
    id: 'S8',
    name: 'Season 8 — June 2027',
    number: 8,
    status: 'Planning',
    launchDate: '2027-06-01',
    seasonEndDate: '2027-06-30',
    targetParticipants: 450,
    subscriptionPrice: 13,
    prizePool: 4662,
    description: '30-day season. Mid-year target: 450 avg subscribers.',
  },
  {
    id: 'S9',
    name: 'Season 9 — July 2027',
    number: 9,
    status: 'Planning',
    launchDate: '2027-07-01',
    seasonEndDate: '2027-07-31',
    targetParticipants: 470,
    subscriptionPrice: 13,
    prizePool: 4662,
    description: '31-day season. School holidays — family and youth outreach opportunity.',
  },
  {
    id: 'S10',
    name: 'Season 10 — August 2027',
    number: 10,
    status: 'Planning',
    launchDate: '2027-08-01',
    seasonEndDate: '2027-08-31',
    targetParticipants: 490,
    subscriptionPrice: 13,
    prizePool: 4662,
    description: '31-day season.',
  },
  {
    id: 'S11',
    name: 'Season 11 — September 2027',
    number: 11,
    status: 'Planning',
    launchDate: '2027-09-01',
    seasonEndDate: '2027-09-30',
    targetParticipants: 510,
    subscriptionPrice: 13,
    prizePool: 4662,
    description: '30-day season. Spring cohort.',
  },
  {
    id: 'S12',
    name: 'Season 12 — October 2027',
    number: 12,
    status: 'Planning',
    launchDate: '2027-10-01',
    seasonEndDate: '2027-10-31',
    targetParticipants: 550,
    subscriptionPrice: 13,
    prizePool: 4662,
    description: '31-day season. 1-year anniversary. Halloween campaign — "The Reap returns." Year 2 total: 12 seasons.',
  },
];

// ─── SPOT PRIZE DRAW SCHEDULE ────────────────────────────────────────────────
// 7 spot prize draws per season. Draws are promotional benefits subsidiary to the game.
// Active, confirmed-paid survivors are automatically eligible — no additional payment required.
// Prize fund ($4,662/season) is from SW operational budget, separate from subscription revenue.
// Language: "spot prize draw" — never "lottery", "lucky draw", or "random draw".

export interface SpotPrizeDraw {
  drawNumber: number;
  dayTrigger: number;
  name: string;
  eligibility: string;
  prize: number;
}

export const spotPrizeDrawSchedule: SpotPrizeDraw[] = [
  { drawNumber: 1, dayTrigger: 7,  name: 'Week 1 Survivor',      eligibility: 'All confirmed-paid survivors at midnight Day 7',                        prize: 666 },
  { drawNumber: 2, dayTrigger: 13, name: 'Friday the 13th',       eligibility: 'All confirmed-paid survivors at midnight Day 13',                       prize: 666 },
  { drawNumber: 3, dayTrigger: 14, name: 'Fortnight Survivor',    eligibility: 'All confirmed-paid survivors at midnight Day 14',                       prize: 666 },
  { drawNumber: 4, dayTrigger: 21, name: 'Three Week Warrior',    eligibility: 'All confirmed-paid survivors at midnight Day 21',                       prize: 666 },
  { drawNumber: 5, dayTrigger: 24, name: 'Redemption Day',        eligibility: 'All confirmed-paid survivors who are Redemption Day eligible at Day 24', prize: 666 },
  { drawNumber: 6, dayTrigger: 28, name: 'Final Week',            eligibility: 'All confirmed-paid survivors at midnight Day 28',                       prize: 666 },
  { drawNumber: 7, dayTrigger: 30, name: 'Season Finale',         eligibility: 'All confirmed-paid survivors at midnight Day 30 (end of season)',        prize: 666 },
];

// ─── RESOURCES ────────────────────────────────────────────────────────────────

export const resources: Resource[] = [
  {
    id: 'R001',
    title: 'Refund Policy',
    category: 'Legal',
    type: 'Policy',
    description: 'Pro-rata refund framework for eliminated and voluntary-exit participants. Covers calculation method, timeline, and exceptions.',
    dateCreated: '2026-04-01',
    status: 'Under Review',
    owner: 'Shelley',
    filePath: '/docs/REAP-refund-policy-section.md',
  },
  {
    id: 'R002',
    title: 'Celebrity Ambassador Agreement',
    category: 'Legal',
    type: 'Agreement',
    description: 'Template agreement for NZ celebrity ambassadors covering IP rights, exclusivity, obligations, and termination provisions.',
    dateCreated: '2026-04-01',
    status: 'Draft',
    owner: 'Shelley',
    filePath: '/docs/REAP-Celebrity-Ambassador-Agreement.md',
  },
  {
    id: 'R003',
    title: 'Competitive Strategy',
    category: 'Marketing',
    type: 'Strategy',
    description: 'Competitive landscape analysis and REAP differentiation strategy against alternative fitness apps and challenges.',
    dateCreated: '2026-03-15',
    status: 'Approved',
    owner: 'Ashleigh',
    filePath: '/docs/REAP-Competitive-Strategy.md',
  },
  {
    id: 'R004',
    title: 'Governance Framework',
    category: 'Governance',
    type: 'Framework',
    description: 'Decision authority matrix, Living Lab separation from SW core, board escalation thresholds, and reporting cadence.',
    dateCreated: '2026-03-20',
    status: 'Under Review',
    owner: 'Leanne',
    filePath: '/docs/REAP-Governance.md',
  },
  {
    id: 'R005',
    title: 'Gambling Act Compliance Analysis',
    category: 'Legal',
    type: 'Report',
    description: 'Detailed analysis of REAP spot prize competition structure against Gambling Act 2003. Includes DIA enquiry strategy.',
    dateCreated: '2026-04-01',
    status: 'Under Review',
    owner: 'Shelley',
    filePath: '/docs/REAP-gambling-compliance-section.md',
  },
  {
    id: 'R006',
    title: 'Legal Compliance Audit (Appendix A)',
    category: 'Legal',
    type: 'Report',
    description: 'Full legal compliance audit covering Gambling Act, Privacy Act, Consumer Guarantees Act, and Health & Safety obligations.',
    dateCreated: '2026-04-01',
    status: 'Under Review',
    owner: 'Shelley',
    filePath: '/docs/REAP-Appendix-A-Legal-Compliance-Audit.md',
  },
  {
    id: 'R007',
    title: 'Welfare Register SOP',
    category: 'Operations',
    type: 'Protocol',
    description: 'Standard operating procedure for logging, classifying, and escalating participant welfare incidents during a season.',
    dateCreated: '2026-04-05',
    status: 'Draft',
    owner: 'Ashleigh',
    filePath: '/docs/survive-the-reap-compliance-audit.md',
  },
  {
    id: 'R008',
    title: 'Product Harm Protocol',
    category: 'Operations',
    type: 'Protocol',
    description: 'Procedures for identifying and responding to participant harm events. Includes media response, legal notification, and season pause criteria.',
    dateCreated: '2026-04-05',
    status: 'Draft',
    owner: 'Ashleigh',
    filePath: '/docs/REAP-Product-Harm-Protocol.md',
  },
  {
    id: 'R009',
    title: 'Media Handling Guide',
    category: 'Marketing',
    type: 'Protocol',
    description: 'Core messages, approved spokesperson guidance, do-not-say list, and press inquiry response templates.',
    dateCreated: '2026-04-01',
    status: 'Approved',
    owner: 'Ashleigh',
    filePath: '/docs/REAP-Media-Handling.md',
  },
  {
    id: 'R010',
    title: 'Reputation Protection Plan',
    category: 'Marketing',
    type: 'Strategy',
    description: 'Crisis communication scenarios and response playbooks for participant harm, media criticism, and legal challenge.',
    dateCreated: '2026-04-01',
    status: 'Draft',
    owner: 'Ashleigh',
    filePath: '/docs/REAP-Reputation-Protection.md',
  },
  {
    id: 'R011',
    title: 'Sponsorship Contract Template',
    category: 'Legal',
    type: 'Agreement',
    description: 'Standard agreement for corporate sponsors. Includes naming rights tiers, obligations, and termination clauses.',
    dateCreated: '2026-04-05',
    status: 'Draft',
    owner: 'Shelley',
    filePath: '/docs/REAP-Sponsorship-Contract.md',
  },
  {
    id: 'R012',
    title: 'Financial Model (3-Year Projection)',
    category: 'Governance',
    type: 'Report',
    description: 'Three-year revenue and cost projections. Break-even analysis, scenario modelling (low/base/high), and prize fund sustainability.',
    dateCreated: '2026-03-30',
    status: 'Approved',
    owner: 'Leanne',
    filePath: '/docs/REAP-Appendix-B-Financial-Model.md',
  },
  {
    id: 'R013',
    title: 'Product Architecture (Appendix C)',
    category: 'Technical',
    type: 'Report',
    description: 'Tech stack overview, Supabase schema, TERRA API integration, Stripe billing, and Lovable build status.',
    dateCreated: '2026-04-01',
    status: 'Under Review',
    owner: 'Ashleigh',
    filePath: '/docs/REAP-Appendix-C-Product-Architecture.md',
  },
  {
    id: 'R014',
    title: 'Board Launch Conditions',
    category: 'Governance',
    type: 'Framework',
    description: 'Formal list of conditions that must be met before Season 1 launch. Legal, operational, financial, and technical gates.',
    dateCreated: '2026-04-01',
    status: 'Under Review',
    owner: 'Leanne',
    filePath: '/docs/REAP-Board-Launch-Conditions.md',
  },
  {
    id: 'R015',
    title: 'Terms & Conditions (Draft)',
    category: 'Legal',
    type: 'Policy',
    description: 'Full participant terms covering subscription, game rules, elimination, spot prize eligibility, and dispute resolution.',
    dateCreated: '2026-04-08',
    status: 'Draft',
    owner: 'Shelley',
    filePath: '/docs/REAP-Terms-Additions.md',
  },
  {
    id: 'R016',
    title: 'Privacy Policy (Draft)',
    category: 'Legal',
    type: 'Policy',
    description: 'Privacy Policy for survivethereap.nz covering health data collection, wearable integrations, and participant rights.',
    dateCreated: '2026-04-08',
    status: 'Draft',
    owner: 'Shelley',
  },
  {
    id: 'R017',
    title: 'Legal Counsel Summary',
    category: 'Legal',
    type: 'Report',
    description: "Shelley's summary of legal opinion on REAP viability. Key risks, recommended actions, and outstanding questions.",
    dateCreated: '2026-03-25',
    status: 'Final',
    owner: 'Shelley',
    filePath: '/docs/REAP-lawyer-summary.md',
  },
  {
    id: 'R018',
    title: 'Six Thinking Hats Analysis',
    category: 'Governance',
    type: 'Report',
    description: 'Structured decision-making analysis of REAP launch using De Bono Six Thinking Hats methodology.',
    dateCreated: '2026-03-20',
    status: 'Final',
    owner: 'Leanne',
    filePath: '/docs/REAP-six-thinking-hats.md',
  },
  {
    id: 'R019',
    title: 'Website Content',
    category: 'Product Copy',
    type: 'Strategy',
    description: 'Full homepage, FAQ, game rules, and sign-up copy for survivethereap.nz. Includes spot prize draw language and compliance notes.',
    dateCreated: '2026-04-05',
    status: 'Draft',
    owner: 'Ashleigh',
    filePath: '/docs/REAP-website-content.md',
  },
  {
    id: 'R020',
    title: 'Action Plan (Appendix D)',
    category: 'Operations',
    type: 'Framework',
    description: 'Detailed pre-launch action plan with task owners, milestones, and deadlines from April to November 2026.',
    dateCreated: '2026-04-05',
    status: 'Under Review',
    owner: 'Ashleigh',
    filePath: '/docs/REAP-Appendix-D-Action-Plan.md',
  },
  {
    id: 'R021',
    title: 'Living Lab Separation Framework',
    category: 'Governance',
    type: 'Framework',
    description: 'Documents the legal and operational separation of the REAP Living Lab from Sport Waikato core operations.',
    dateCreated: '2026-04-05',
    status: 'Under Review',
    owner: 'Leanne',
    filePath: '/docs/REAP-Living-Lab-Separation.md',
  },
  {
    id: 'R022',
    title: 'Future Products Roadmap',
    category: 'Product',
    type: 'Strategy',
    description: 'Planned extensions: Teams Season, Corporate League, REAP Juniors, international expansion, and RST licensing model.',
    dateCreated: '2026-04-05',
    status: 'Draft',
    owner: 'Ashleigh',
    filePath: '/docs/REAP-Future-Products.md',
  },
  {
    id: 'R023',
    title: 'Lovable Build Prompts',
    category: 'Technical',
    type: 'Protocol',
    description: 'Engineering prompts and specifications for the survivethereap.nz Lovable build. Covers auth, elimination logic, and TERRA API.',
    dateCreated: '2026-04-06',
    status: 'Under Review',
    owner: 'Ashleigh',
    filePath: '/docs/REAP-lovable-prompts.md',
  },
  {
    id: 'R024',
    title: 'Gambling Framing Strategy',
    category: 'Legal',
    type: 'Strategy',
    description: 'Internal strategy document on how to frame the spot prize competition model to DIA and in participant-facing language.',
    dateCreated: '2026-04-06',
    status: 'Under Review',
    owner: 'Shelley',
    filePath: '/docs/REAP-gambling-framing-strategy.md',
  },
  {
    id: 'R025',
    title: 'Board Report (Draft)',
    category: 'Governance',
    type: 'Report',
    description: 'Draft board report for the REAP launch approval meeting. Covers strategy, financials, legal status, and board resolution.',
    dateCreated: '2026-04-07',
    status: 'Draft',
    owner: 'Leanne',
    filePath: '/docs/REAP-board-report.md',
  },
  {
    id: 'R026',
    title: 'Terms and Conditions',
    category: 'Legal',
    type: 'Policy',
    description: 'Complete Terms and Conditions for REAP participation, subscriptions, eliminations, and dispute resolution.',
    dateCreated: '2026-04-09',
    status: 'Draft — Awaiting Legal Review',
    owner: 'Shelley',
    filePath: '/reap-documents/legal/terms-and-conditions.md',
  },
  {
    id: 'R027',
    title: 'Competition Rules',
    category: 'Legal',
    type: 'Policy',
    description: 'Formal competition rules for Entry, eligibility, prize allocation, and compliance with promotional game law.',
    dateCreated: '2026-04-09',
    status: 'Draft — Awaiting Legal Review',
    owner: 'Shelley',
    filePath: '/reap-documents/legal/competition-rules.md',
  },
  {
    id: 'R028',
    title: 'Privacy Policy',
    category: 'Legal',
    type: 'Policy',
    description: 'Privacy Policy for REAP, covering health data, wearable integrations, third-party sharing, and participant rights.',
    dateCreated: '2026-04-09',
    status: 'Draft — Awaiting Legal Review',
    owner: 'Shelley',
    filePath: '/reap-documents/legal/privacy-policy.md',
  },
  {
    id: 'R029',
    title: 'Refund Policy',
    category: 'Legal',
    type: 'Policy',
    description: 'Refund policy for eliminated and voluntary-exit participants, including pro-rata calculations and processing timelines.',
    dateCreated: '2026-04-09',
    status: 'Draft — Awaiting Legal Review',
    owner: 'Shelley',
    filePath: '/reap-documents/legal/refund-policy.md',
  },
  {
    id: 'R030',
    title: 'Onboarding Messages',
    category: 'Marketing',
    type: 'Strategy',
    description: 'Participant onboarding messaging for REAP launch and early engagement touchpoints.',
    dateCreated: '2026-04-09',
    status: 'Complete',
    owner: 'Ashleigh',
    filePath: '/reap-documents/product-copy/onboarding-messages.md',
  },
  {
    id: 'R031',
    title: 'Elimination Messages',
    category: 'Marketing',
    type: 'Strategy',
    description: 'Compassionate elimination copy for participants and notifications, aligned with welfare protocols.',
    dateCreated: '2026-04-09',
    status: 'Complete',
    owner: 'Ashleigh',
    filePath: '/reap-documents/product-copy/elimination-messages.md',
  },
  {
    id: 'R032',
    title: 'Email Sequences',
    category: 'Marketing',
    type: 'Strategy',
    description: 'Launch and retention email sequence for pre-launch registrants and active REAP participants.',
    dateCreated: '2026-04-09',
    status: 'Complete',
    owner: 'Ashleigh',
    filePath: '/reap-documents/product-copy/email-sequences.md',
  },
  {
    id: 'R033',
    title: 'Support Templates',
    category: 'Marketing',
    type: 'Protocol',
    description: 'Customer support templates for FAQs, welfare enquiries, and participant service issues.',
    dateCreated: '2026-04-09',
    status: 'Complete',
    owner: 'Ashleigh',
    filePath: '/reap-documents/product-copy/support-templates.md',
  },
  {
    id: 'R034',
    title: 'Launch Campaign',
    category: 'Marketing',
    type: 'Strategy',
    description: 'Launch campaign plan for REAP, including promotional messaging, channels, and timeline.',
    dateCreated: '2026-04-09',
    status: 'Complete',
    owner: 'Ashleigh',
    filePath: '/reap-documents/marketing/launch-campaign.md',
  },
  {
    id: 'R035',
    title: 'Halloween Sequence',
    category: 'Marketing',
    type: 'Strategy',
    description: 'Halloween-themed marketing sequence for REAP Season 1 launch.',
    dateCreated: '2026-04-09',
    status: 'Complete',
    owner: 'Ashleigh',
    filePath: '/reap-documents/marketing/halloween-sequence.md',
  },
  {
    id: 'R036',
    title: 'Celebrity Invite',
    category: 'Marketing',
    type: 'Strategy',
    description: 'Celebrity engagement and invite messaging for REAP ambassador outreach.',
    dateCreated: '2026-04-09',
    status: 'Complete',
    owner: 'Ashleigh',
    filePath: '/reap-documents/marketing/celebrity-invite.md',
  },
  {
    id: 'R037',
    title: 'Funder Briefing',
    category: 'Marketing',
    type: 'Report',
    description: 'Funder briefing document outlining REAP launch plan, impact, and funding request.',
    dateCreated: '2026-04-09',
    status: 'Complete',
    owner: 'Ashleigh',
    filePath: '/reap-documents/marketing/funder-briefing.md',
  },
  {
    id: 'R038',
    title: 'Database Schema',
    category: 'Technical',
    type: 'Report',
    description: 'Technical database schema documentation for REAP user data, sessions, and wearable integrations.',
    dateCreated: '2026-04-09',
    status: 'Complete',
    owner: 'Dev Team',
    filePath: '/reap-documents/technical/database-schema.md',
  },
  {
    id: 'R039',
    title: 'API Documentation',
    category: 'Technical',
    type: 'Report',
    description: 'API documentation for backend endpoints, authentication, webhooks, and data flows.',
    dateCreated: '2026-04-09',
    status: 'Complete',
    owner: 'Dev Team',
    filePath: '/reap-documents/technical/api-documentation.md',
  },
  {
    id: 'R040',
    title: 'Cron Job Spec',
    category: 'Technical',
    type: 'Protocol',
    description: 'Specification for CRON jobs driving REAP elimination checks, notifications, and daily reporting.',
    dateCreated: '2026-04-09',
    status: 'Complete',
    owner: 'Dev Team',
    filePath: '/reap-documents/technical/cron-job-spec.md',
  },
  {
    id: 'R041',
    title: 'Stripe Webhook Spec',
    category: 'Technical',
    type: 'Protocol',
    description: 'Technical specification for Stripe webhook handling and paid_at confirmation logic.',
    dateCreated: '2026-04-09',
    status: 'Complete',
    owner: 'Dev Team',
    filePath: '/reap-documents/technical/stripe-webhook-spec.md',
  },
  {
    id: 'R042',
    title: 'Board Update Template',
    category: 'Governance',
    type: 'Framework',
    description: 'Template for board updates covering progress, risks, and decision points.',
    dateCreated: '2026-04-09',
    status: 'Draft — Awaiting Legal Review',
    owner: 'Leanne',
    filePath: '/reap-documents/governance/board-update-template.md',
  },
  {
    id: 'R043',
    title: 'DIA Enquiry Letter',
    category: 'Governance',
    type: 'Report',
    description: 'Letter to the Department of Internal Affairs regarding REAP competition classification.',
    dateCreated: '2026-04-09',
    status: 'Draft — Awaiting Legal Review',
    owner: 'Leanne',
    filePath: '/reap-documents/governance/dia-enquiry-letter.md',
  },
  {
    id: 'R044',
    title: 'Equity Access Policy',
    category: 'Governance',
    type: 'Policy',
    description: 'Policy describing equitable access provisions for REAP participation and support.',
    dateCreated: '2026-04-09',
    status: 'Draft — Awaiting Legal Review',
    owner: 'Leanne',
    filePath: '/reap-documents/governance/equity-access-policy.md',
  },
  {
    id: 'R045',
    title: 'Welfare Disputes Protocol',
    category: 'Governance',
    type: 'Protocol',
    description: 'Protocol for handling participant welfare disputes and escalation pathways.',
    dateCreated: '2026-04-09',
    status: 'Draft — Awaiting Legal Review',
    owner: 'Leanne',
    filePath: '/reap-documents/governance/welfare-disputes-protocol.md',
  },
];

// ─── MEDIA ASSETS ─────────────────────────────────────────────────────────────

export const mediaAssets: MediaAsset[] = [
  { id: 'M001', name: 'REAP Primary Logo', type: 'Logo', format: 'SVG', uploadDate: '2026-03-01', size: '24 KB', tags: ['logo', 'primary', 'brand'] },
  { id: 'M002', name: 'REAP Logo — White', type: 'Logo', format: 'SVG', uploadDate: '2026-03-01', size: '24 KB', tags: ['logo', 'white', 'reversed'] },
  { id: 'M003', name: 'REAP Logo — Dark', type: 'Logo', format: 'SVG', uploadDate: '2026-03-01', size: '24 KB', tags: ['logo', 'dark', 'mono'] },
  { id: 'M004', name: 'Launch Announcement — Instagram Square', type: 'Marketing', format: 'PNG', uploadDate: '2026-04-01', size: '1.2 MB', tags: ['social', 'instagram', 'launch'] },
  { id: 'M005', name: 'Launch Announcement — Instagram Story', type: 'Marketing', format: 'PNG', uploadDate: '2026-04-01', size: '1.8 MB', tags: ['social', 'instagram', 'story'] },
  { id: 'M006', name: 'Season 1 Launch — Facebook Banner', type: 'Marketing', format: 'PNG', uploadDate: '2026-04-01', size: '2.1 MB', tags: ['social', 'facebook', 'banner'] },
  { id: 'M007', name: 'Participant Dashboard Screenshot', type: 'UI Screenshot', format: 'PNG', uploadDate: '2026-04-05', size: '890 KB', tags: ['app', 'dashboard', 'screenshot'] },
  { id: 'M008', name: 'Elimination Notification Screenshot', type: 'UI Screenshot', format: 'PNG', uploadDate: '2026-04-05', size: '450 KB', tags: ['app', 'notification', 'screenshot'] },
  { id: 'M009', name: 'Brand Colour Palette', type: 'Brand Asset', format: 'PDF', uploadDate: '2026-03-15', size: '340 KB', tags: ['brand', 'colours', 'guidelines'] },
  { id: 'M010', name: 'Typography Guide', type: 'Brand Asset', format: 'PDF', uploadDate: '2026-03-15', size: '280 KB', tags: ['brand', 'typography', 'guidelines'] },
];

// ─── RISKS ────────────────────────────────────────────────────────────────────

export const risks: Risk[] = [
  {
    id: 'RISK001',
    risk: 'DIA determines REAP spot prize draws constitute unlicensed gambling',
    category: 'Legal',
    impact: 'Critical',
    likelihood: 'Low',
    mitigation: 'Spot prize competition model adopted: $13 subscription pays for the game — not for draw eligibility. Active confirmed-paid survivors are automatically eligible; no additional payment made. Prize fund ($4,662/season) entirely from SW operational budget, separate from subscription revenue at accounting level. Language: "spot prize draw" only — never "lottery", "lucky draw", or "random draw". DIA informal enquiry May 2026. Legal sign-off by Shelley 30 Sep 2026 — hard gate before launch.',
    status: 'Open',
    owner: 'Shelley',
  },
  {
    id: 'RISK002',
    risk: 'Participant health incident (exercise-induced injury or cardiac event)',
    category: 'Operational',
    impact: 'Critical',
    likelihood: 'Low',
    mitigation: 'Require participant health declaration. Engage medical advisor. Welfare register and incident protocol in place. Medical exemption provisions built into app.',
    status: 'Open',
    owner: 'Ashleigh',
  },
  {
    id: 'RISK003',
    risk: 'Low participant numbers — below break-even (145 avg subscribers)',
    category: 'Financial',
    impact: 'High',
    likelihood: 'Medium',
    mitigation: 'Celebrity soft launch to generate PR. Pre-registration campaign to validate demand before launch. Season 1 prize pool funded from SW operational budget regardless of subscriber count.',
    status: 'Open',
    owner: 'Leanne',
  },
  {
    id: 'RISK004',
    risk: 'Negative media coverage of elimination mechanic',
    category: 'Reputational',
    impact: 'High',
    likelihood: 'Medium',
    mitigation: 'Prepare media handling guide. Train spokesperson. Emphasise health-positive framing. Have crisis response template ready before launch.',
    status: 'Open',
    owner: 'Ashleigh',
  },
  {
    id: 'RISK005',
    risk: 'Wearable data inaccuracy causes wrongful elimination',
    category: 'Technical',
    impact: 'High',
    likelihood: 'Medium',
    mitigation: 'Build manual override and dispute resolution process. Allow 24-hour appeal window. Admin review tool for disputed eliminations.',
    status: 'Open',
    owner: 'Dev Team',
  },
  {
    id: 'RISK006',
    risk: 'App platform failure on elimination night',
    category: 'Technical',
    impact: 'High',
    likelihood: 'Low',
    mitigation: 'Load test to 500 concurrent users. Maintain manual fallback for elimination processing. Status page and incident communication plan.',
    status: 'Open',
    owner: 'Dev Team',
  },
  {
    id: 'RISK007',
    risk: 'Privacy breach of participant health data',
    category: 'Legal',
    impact: 'Critical',
    likelihood: 'Low',
    mitigation: 'External security penetration test. Data minimisation in collection. Encryption at rest and in transit. Privacy Policy reviewed by Shelley.',
    status: 'Open',
    owner: 'Shelley',
  },
  {
    id: 'RISK008',
    risk: 'Celebrity ambassador withdrawal or reputational damage',
    category: 'Reputational',
    impact: 'Medium',
    likelihood: 'Low',
    mitigation: 'Contractual termination provisions. Identify two backup ambassadors. Avoid exclusivity beyond Season 1. Separation between SW brand and ambassador personal reputation.',
    status: 'Open',
    owner: 'Leanne',
  },
];

// ─── WELFARE INCIDENTS ────────────────────────────────────────────────────────

export const welfareIncidents: WelfareIncident[] = [
  {
    id: 'W001',
    dateTime: '2026-04-02T09:30:00',
    participantId: 'BETA-047',
    natureOfContact: 'Participant contacted via email expressing distress after unexpected elimination on Day 3. Reported feeling embarrassed and "stupid" for missing the day.',
    severityLevel: 'Low',
    responseTaken: 'Ashleigh responded within 2 hours. Empathetic acknowledgment, explained elimination is reversible next season. Provided refund information.',
    outcome: 'Participant satisfied with response. Did not escalate. Chose to re-register for Season 2.',
    escalatedToCEO: false,
    boardNotified: false,
    legalAdviceSought: false,
    followUpActions: 'Added to "early elimination emotional response" watch list for Season 1 planning.',
    status: 'Resolved',
  },
  {
    id: 'W002',
    dateTime: '2026-04-05T14:15:00',
    participantId: 'BETA-012',
    natureOfContact: 'Participant raised concern that their Garmin data was not syncing correctly. Believed they completed 21 minutes but the app showed 18 minutes. Threatened legal action.',
    severityLevel: 'Medium',
    responseTaken: 'Dev Team reviewed raw Garmin API data. Found a sync delay issue in the API polling. Admin override applied. Elimination reversed. Bug logged for fix.',
    outcome: 'Participant reinstated. Bug identified and added to sprint backlog. No legal action.',
    escalatedToCEO: false,
    boardNotified: false,
    legalAdviceSought: false,
    followUpActions: 'Fix Garmin polling delay before Season 1 launch (T020). Add 15-minute sync grace window to T&Cs.',
    status: 'Resolved',
  },
  {
    id: 'W003',
    dateTime: '2026-04-07T22:45:00',
    participantId: 'BETA-089',
    natureOfContact: 'Late-night contact from participant reporting chest tightness during their Zone 2 session. Had continued to exercise to avoid elimination. Did not seek medical attention.',
    severityLevel: 'High',
    responseTaken: 'Ashleigh called participant the following morning. Advised to seek GP consultation before resuming activity. Manual exemption applied for 7 days pending medical clearance.',
    outcome: 'Participant seen by GP — minor muscle strain, not cardiac. GP cleared return to activity after 3 days. Participant grateful for follow-up.',
    escalatedToCEO: true,
    boardNotified: false,
    legalAdviceSought: true,
    followUpActions: 'T069 (Medical Advisor) flagged as urgent. Review health declaration form to include cardiac screening question. Add "do not exercise through pain" messaging to onboarding.',
    status: 'Resolved',
  },
];

// ─── BUDGET DATA ──────────────────────────────────────────────────────────────

// Budget figures from Appendix B. Year 1 = 2 seasons (Nov + Dec 2026). Year 2+ = 12 seasons/year (monthly).
export const budgetItems: BudgetItem[] = [
  { category: 'Prize Fund', item: '7 spot prize draws × $666/season (Y1: 2 seasons; Y2+: 12 seasons)', year1: 9324, year2: 55944, year3: 55944, notes: 'Funded from SW operational budget, entirely separate from subscription revenue. No participant fee contributes to prize funding. Y2+ = 12 seasons × $4,662/season.' },
  { category: 'Legal', item: 'Legal compliance (Shelley + DIA enquiry)', year1: 6000, year2: 1500, year3: 1500, notes: 'Higher in Y1 due to DIA enquiry, full document suite, and Terms sign-off' },
  { category: 'Technology', item: 'Infrastructure (Lovable Pro + Supabase Pro + Resend + domain)', year1: 1560, year2: 1560, year3: 1800, notes: '~$130/month — all-inclusive platform costs' },
  { category: 'Technology', item: 'TERRA API (unified wearable device integration)', year1: 1300, year2: 1800, year3: 2400, notes: 'Single API covering Apple Health, Garmin, Fitbit, Strava, Google Fit, Polar, Whoop — scales with usage' },
  { category: 'Technology', item: 'Developer maintenance (~10 hrs/yr @ $130/hr)', year1: 1300, year2: 1300, year3: 1500, notes: 'Ongoing maintenance and feature additions' },
  { category: 'Marketing', item: 'Marketing (launch year — includes paid social, content, design)', year1: 7800, year2: 6800, year3: 6800, notes: 'Higher in Y1 due to launch campaign; includes paid Meta/Instagram, content creation, brand assets' },
  { category: 'Staff', item: 'Ashleigh time allocation (Living Lab)', year1: 0, year2: 0, year3: 0, notes: 'Covered within existing SW salary — no additional cost' },
];

// Revenue scenarios from Appendix B — Year 1 average active subscribers, gross subscription revenue
// Year 1 = 2 seasons (Nov + Dec 2026). Year 2+ = 12 seasons/year (monthly).
export const revenueScenarios: RevenueScenario[] = [
  { name: 'Conservative', subscribers: 150, monthlyRevenue: 1950, annualRevenue: 23400, breakEven: true },
  { name: 'Base Case', subscribers: 250, monthlyRevenue: 3250, annualRevenue: 39000, breakEven: true },
  { name: 'Optimistic', subscribers: 400, monthlyRevenue: 5200, annualRevenue: 62400, breakEven: true },
];

export const totalYear1Budget = budgetItems.reduce((sum, item) => sum + item.year1, 0);
// Break-even including prize fund (no sponsorship): 145 avg subscribers
// Break-even including prize fund (with $10k sponsorship): 76 avg subscribers
// Break-even app only (before prize fund): 82 avg subscribers
export const breakEvenSubscribers = 145;

// ─── COMPLIANCE AREAS ─────────────────────────────────────────────────────────

export interface ComplianceArea {
  id: string;
  area: string;
  legislation: string;
  status: 'Compliant' | 'Under Review' | 'At Risk' | 'Pending';
  owner: OwnerName;
  notes: string;
  lastReviewed: string;
}

export const complianceAreas: ComplianceArea[] = [
  {
    id: 'C001',
    area: 'Gambling / Promotional Competition',
    legislation: 'Gambling Act 2003',
    status: 'Under Review',
    owner: 'Shelley',
    notes: 'Spot prize competition model: $13 is paid for the game, not for draw entry. Active survivors are automatically eligible for spot prize draws — no additional payment required. Draws are promotional and subsidiary to the game. Prize fund is entirely separate from subscription revenue (SW operational funds). DIA informal enquiry being prepared (target May 2026). Formal sign-off by Shelley target September 2026.',
    lastReviewed: '2026-04-08',
  },
  {
    id: 'C002',
    area: 'Health Data Privacy',
    legislation: 'Privacy Act 2020',
    status: 'Under Review',
    owner: 'Shelley',
    notes: 'Wearable health data requires explicit consent, data minimisation, and right to deletion. Privacy Policy in draft.',
    lastReviewed: '2026-04-08',
  },
  {
    id: 'C003',
    area: 'Consumer Rights',
    legislation: 'Consumer Guarantees Act 1993 / Fair Trading Act 1986',
    status: 'Pending',
    owner: 'Shelley',
    notes: 'Refund policy and T&Cs must meet CGA obligations. Review of marketing claims against FTA required.',
    lastReviewed: '2026-04-01',
  },
  {
    id: 'C004',
    area: 'Payment Processing',
    legislation: 'Payment Card Industry DSS (PCI DSS)',
    status: 'Under Review',
    owner: 'Dev Team',
    notes: 'Stripe handles PCI compliance for card processing. Stripe-hosted checkout eliminates direct card data handling.',
    lastReviewed: '2026-04-05',
  },
  {
    id: 'C005',
    area: 'Health and Safety',
    legislation: 'Health and Safety at Work Act 2015',
    status: 'Pending',
    owner: 'Ashleigh',
    notes: 'Sport Waikato duty of care to participants. Medical advisor engagement and welfare protocols required.',
    lastReviewed: '2026-04-01',
  },
];

// ─── RESOURCES VIEW DATA ─────────────────────────────────────────────────────

export const refundScenarios: RefundScenario[] = [
  { situation: 'Cancellation before Day 1 commences', refundAvailable: true },
  { situation: 'Eliminated on Day 1', refundAvailable: false },
  { situation: 'Eliminated on Day 3', refundAvailable: false },
  { situation: 'Eliminated on Day 20', refundAvailable: false },
  { situation: 'Season completed (survived all 30 days)', refundAvailable: false, note: 'No basis for refund — service delivered in full' },
  { situation: 'Third-party device sync failure led to elimination', refundAvailable: false },
  { situation: 'Decided not to participate after paying', refundAvailable: false, note: 'Season has commenced' },
  { situation: 'Charged after confirmed cancellation', refundAvailable: true, note: 'Contact us' },
];

export const ambassadorContent: AmbassadorPost[] = [
  { post: 'Post 1', timing: 'Season start (1 October or within first 3 days)', description: 'Announcing participation' },
  { post: 'Post 2', timing: 'Mid-season check-in (Days 10–20)', description: 'Update on survival status' },
  { post: 'Post 3', timing: 'Elimination or survival', description: 'Authentic response at elimination or season end' },
  { post: 'Post 4', timing: 'Call to action', description: 'Encouraging audience to sign up for Season 1 (November)' },
];

export const competitors: Competitor[] = [
  { product: 'StepBet', country: 'USA', model: 'Step-count wagering; players bet on hitting their own step goal', status: 'Active', threat: 'Low — wagering model, not elimination, different mechanic' },
  { product: 'Pact', country: 'USA', model: 'Pay-per-missed-workout model', status: 'Closed 2019', threat: 'None' },
  { product: 'Zombies, Run!', country: 'UK', model: 'Narrative running game', status: 'Active', threat: 'Low — no elimination, narrative focus' },
  { product: 'Beachbody / BODi', country: 'USA', model: 'Subscription fitness programmes', status: 'Active', threat: 'Low — no elimination, programme-based' },
  { product: 'Duolingo', country: 'USA', model: 'Streak-based daily habit (language learning)', status: 'Active', threat: 'Medium — validates the mechanic; not a movement product' },
];

export const preLaunchActions: PreLaunchAction[] = [
  { action: 'File trade mark for "Survive the Reap" and REAP logo', rationale: 'Protects the brand identity; mechanics are unprotectable but the name is', timeline: 'Before any public announcement' },
  { action: 'Approach 2–3 RSTs with a licence offer framework', rationale: 'Convert the RST network into distribution partners, not future competitors', timeline: 'Before Season 2 planning' },
  { action: 'Publish Living Lab research protocol', rationale: 'Establishes REAP as a research product from Day 1; harder for competitors to claim research credibility retroactively', timeline: 'Before public launch' },
  { action: 'Build the Friday 13th event into a fixture', rationale: 'A recurring, branded community event is the hardest cultural asset to replicate', timeline: 'Season 1' },
  { action: 'Develop the annual championship concept', rationale: 'A multi-season competitive structure creates participant investment in the REAP brand over time', timeline: 'Year 2 planning' },
  { action: 'Explore TERRA API for device integration', rationale: 'Reduces technical moat gap with platform players; ensures REAP works across all major wearables before a competitor does', timeline: 'June 2026' },
];

export const governanceStructure: GovernanceRole[] = [
  { role: 'Board of Sport Waikato', authority: 'Ultimate accountability, approves launch conditions, prize budget ($4,662/season), financial commitments >$10k, receives end-of-season reports, retains pause/shutdown authority', reporting: 'End-of-season report after each season' },
  { role: 'CEO (Leanne)', authority: 'Executive accountability for REAP operations, external communications/media/funder relationships, welfare incident escalation, staff resourcing, approves operational decisions up to $5k', reporting: 'Board reporting, funder briefing before public launch' },
  { role: 'Living Lab Lead (Ash)', authority: 'Day-to-day product and operational decisions, technology vendor management, Season Rules decisions, feature scoping, prize draw administration', reporting: 'End-of-season report production, escalates to CEO for welfare/legal/financial >$2k' },
  { role: 'Legal Counsel (Shelley)', authority: 'Sign-off authority on ALL participant-facing documents, written legal advice on gambling law, leads DIA informal enquiry, first point for legal challenge', reporting: 'Written approval required for all legal documents' },
  { role: 'Developer (external)', authority: 'Technical implementation within approved specs, security implementation (env variables, RLS, webhook verification), signs off on technical readiness', reporting: 'Reports to Living Lab Lead on development progress' },
  { role: 'Finance (Sport Waikato)', authority: 'Accounting treatment for prize fund (separate from subscription revenue), financial reporting on REAP revenue/costs, prize fund management', reporting: 'Financial reporting per season, annual budget reporting to board' },
];

export const decisionAuthority: DecisionEntry[] = [
  { decision: 'Feature scope changes', developer: 'Advises', llLead: 'Approves', ceo: 'Informed', board: '—' },
  { decision: 'Launch timing', developer: 'Recommends', llLead: 'Recommends', ceo: 'Approves', board: 'Informed' },
  { decision: 'Prize budget per season', developer: '—', llLead: 'Recommends', ceo: 'Recommends', board: 'Approves' },
  { decision: 'Ambassador engagement', developer: '—', llLead: 'Recommends', ceo: 'Approves', board: 'Informed' },
  { decision: 'Media statement (reactive)', developer: '—', llLead: 'Contributes', ceo: 'Approves', board: 'Informed' },
  { decision: 'Season pause or shutdown', developer: '—', llLead: 'Recommends', ceo: 'Initiates', board: 'Approves' },
  { decision: 'Legal document publication', developer: '—', llLead: 'Initiates', ceo: '—', board: 'Shelley approves' },
  { decision: 'New revenue stream (>$10k)', developer: '—', llLead: 'Proposes', ceo: 'Recommends', board: 'Approves' },
  { decision: 'DIA enquiry', developer: '—', llLead: 'Supports', ceo: 'Authorises', board: 'Informed' },
  { decision: 'Welfare incident response', developer: '—', llLead: 'First response', ceo: 'Escalation', board: 'Informed if serious' },
  { decision: 'Subscription price change', developer: '—', llLead: 'Proposes', ceo: 'Approves', board: 'Informed' },
];

export const pauseShutdownTriggers: PauseShutdownTrigger[] = [
  { tier: 'Tier 1', trigger: 'DIA formally indicates REAP constitutes unlicensed gambling or requires a licence', action: 'Immediate operational pause + same-day board notification' },
  { tier: 'Tier 1', trigger: 'Participant welfare incident (hospitalisation, mental health crisis) plausibly connected to REAP participation or elimination notification', action: 'Immediate operational pause + same-day board notification' },
  { tier: 'Tier 1', trigger: 'Systematic technical failure producing incorrect eliminations affecting >5% of active participants on any given night', action: 'Immediate operational pause + same-day board notification' },
  { tier: 'Tier 1', trigger: 'Any court order, regulatory action, or formal legal notice received by Sport Waikato', action: 'Immediate operational pause + same-day board notification' },
  { tier: 'Tier 1', trigger: 'Privacy breach affecting personal or health data of any number of participants', action: 'Immediate operational pause + same-day board notification' },
  { tier: 'Tier 2', trigger: 'Sustained public criticism campaign on safety, ethical, or charitable mandate grounds', action: 'Board review within 72 hours (season may continue)' },
  { tier: 'Tier 2', trigger: 'Funder formally expressing concern about REAP or threatening to withdraw support', action: 'Board review within 72 hours (season may continue)' },
  { tier: 'Tier 2', trigger: 'Celebrity participant publicly misrepresenting the product in a way that cannot be promptly corrected', action: 'Board review within 72 hours (season may continue)' },
  { tier: 'Tier 2', trigger: 'Staff welfare incident related to REAP operations (e.g., staff receiving abuse from participants)', action: 'Board review within 72 hours (season may continue)' },
];

export const legalSignOffDocs: LegalSignOffDoc[] = [
  { document: 'Terms of Participation', requiredBefore: 'Any participant registration opens', shelleySignOff: 'Written approval' },
  { document: 'Season Rules', requiredBefore: 'Any participant registration opens', shelleySignOff: 'Written approval' },
  { document: 'Privacy Policy', requiredBefore: 'Website goes live', shelleySignOff: 'Written approval' },
  { document: 'Website marketing copy', requiredBefore: 'Website goes live', shelleySignOff: 'Written approval' },
  { document: 'Celebrity Ambassador Agreements', requiredBefore: 'Ambassador engagement confirmed', shelleySignOff: 'Written approval' },
  { document: 'Refund Policy', requiredBefore: 'Website goes live', shelleySignOff: 'Written approval' },
  { document: 'Prize structure disclosure', requiredBefore: 'Season starts', shelleySignOff: 'Written approval' },
  { document: 'Corporate Group Agreement template', requiredBefore: 'Corporate sales begin', shelleySignOff: 'Written approval' },
];

export const reportingSchedule: ReportingEntry[] = [
  { report: 'End-of-season report', frequency: 'Each season', author: 'LL Lead', recipient: 'Board' },
  { report: 'Financial summary (revenue, costs, prize fund)', frequency: 'Each season', author: 'Finance', recipient: 'CEO + Board' },
  { report: 'Welfare incident log', frequency: 'Quarterly or on event', author: 'CEO', recipient: 'Board' },
  { report: 'Legal compliance status', frequency: 'Before each new season', author: 'CEO + Legal', recipient: 'Board' },
  { report: 'Data/research summary', frequency: 'Annual', author: 'Living Lab', recipient: 'Board + Sport NZ' },
];

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

export function getTasksByStatus(status: TaskStatus): Task[] {
  return tasks.filter(t => t.status === status);
}

export function getTasksByCategory(category: TaskCategory): Task[] {
  return tasks.filter(t => t.category === category);
}

export function getTasksByOwner(owner: OwnerName): Task[] {
  return tasks.filter(t => t.owner === owner);
}

export function getISOToday(): string {
  return new Date().toISOString().split('T')[0];
}

/** Format an ISO date string (YYYY-MM-DD) for display. Pass monthOnly=true for "Oct 2026" style. */
export function formatMilestoneDate(isoDate: string, monthOnly = false): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (monthOnly) return `${months[month - 1]} ${year}`;
  return `${day} ${months[month - 1]} ${year}`;
}

/** Task completion % for a single category. */
export function getCategoryProgressPercent(category: TaskCategory): number {
  const cat = tasks.filter(t => t.category === category);
  if (cat.length === 0) return 0;
  return Math.round(cat.filter(t => t.status === 'Completed').length / cat.length * 100);
}

/** Task completion % across multiple categories combined. */
export function getCombinedProgressPercent(categories: TaskCategory[]): number {
  const cat = tasks.filter(t => categories.includes(t.category));
  if (cat.length === 0) return 0;
  return Math.round(cat.filter(t => t.status === 'Completed').length / cat.length * 100);
}

export function getOverdueTasks(referenceDate = getISOToday()): Task[] {
  return tasks.filter(t => t.dueDate < referenceDate && t.status !== 'Completed');
}

export function getTasksDueThisMonth(month: string): Task[] {
  return tasks.filter(t => t.dueDate.startsWith(month));
}

export function getCriticalBlockers(): Task[] {
  return tasks.filter(t => (t.priority === 'Critical' || t.status === 'Blocked') && t.status !== 'Completed');
}

export function getDaysToLaunch(referenceDate = getISOToday()): number {
  const season1 = seasons.find(s => s.number === 1)!;
  const launch = new Date(season1.launchDate);
  const ref = new Date(referenceDate);
  return Math.ceil((launch.getTime() - ref.getTime()) / (1000 * 60 * 60 * 24));
}

export function getProgressPercent(): number {
  const done = tasks.filter(t => t.status === 'Completed').length;
  return Math.round((done / tasks.length) * 100);
}

export function getTeamMember(owner: OwnerName): TeamMember | undefined {
  return team.find(m => m.name === owner);
}

export const categoryColors: Record<TaskCategory, { bg: string; text: string; border: string }> = {
  Legal: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  'Product Build': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Marketing: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Partnerships: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  Operations: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  Launch: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
};

export const statusColors: Record<TaskStatus, { bg: string; text: string }> = {
  'Not Started': { bg: 'bg-gray-100', text: 'text-gray-700' },
  'In Progress': { bg: 'bg-blue-50', text: 'text-blue-700' },
  'Blocked': { bg: 'bg-red-50', text: 'text-red-700' },
  'Completed': { bg: 'bg-green-50', text: 'text-green-700' },
};

export const priorityColors: Record<TaskPriority, { bg: string; text: string }> = {
  Critical: { bg: 'bg-red-50', text: 'text-red-700' },
  High: { bg: 'bg-orange-50', text: 'text-orange-700' },
  Medium: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
  Low: { bg: 'bg-gray-100', text: 'text-gray-600' },
};
