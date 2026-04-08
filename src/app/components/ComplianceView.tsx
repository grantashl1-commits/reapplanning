import { FileText, AlertCircle, CheckCircle2, Clock, Shield, Scale, Lock, Heart } from 'lucide-react';

// Compliance model: REAP uses a "spot prize competition" structure.
// $13/month is paid for the GAME — not for draw eligibility.
// Active confirmed-paid survivors are automatically eligible for 7 spot prize draws per season.
// Draws are promotional and subsidiary to the game product.
// Prize fund ($4,662/season) is entirely from SW operational budget — no participant fee pools toward prizes.
// Language: "spot prize draw" — never "lottery", "lucky draw", or "random draw".

interface ComplianceAreaDetail {
  id: string;
  area: string;
  legislation: string;
  status: 'Under Review' | 'In Progress' | 'Adequate' | 'Pending';
  priority: 'Critical' | 'High' | 'Medium';
  owner: string;
  deadline: string;
  summary: string;
  actions: string[];
  icon: React.ReactNode;
}

const statusConfig: Record<ComplianceAreaDetail['status'], { bg: string; text: string; border: string; label: string }> = {
  'Under Review': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'Under Review' },
  'In Progress':  { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', label: 'In Progress' },
  'Adequate':     { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'Adequate' },
  'Pending':      { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', label: 'Pending' },
};

const priorityConfig: Record<ComplianceAreaDetail['priority'], { bg: string; text: string }> = {
  Critical: { bg: 'bg-red-50', text: 'text-red-700' },
  High: { bg: 'bg-orange-50', text: 'text-orange-700' },
  Medium: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
};

const complianceAreas: ComplianceAreaDetail[] = [
  {
    id: 'C001',
    area: 'Gambling Act 2003 — Spot Prize Competition',
    legislation: 'Gambling Act 2003 (s 4)',
    status: 'Under Review',
    priority: 'Critical',
    owner: 'Shelley',
    deadline: '30 Sep 2026',
    icon: <Scale size={18} />,
    summary: 'REAP operates a spot prize competition subsidiary to the game product. The $13/month subscription is consideration paid for access to the game — not for draw eligibility. Active confirmed-paid survivors are automatically eligible for 7 spot prize draws per season with no additional payment. Prize fund ($4,662/season = 7 × $666) is funded entirely from Sport Waikato operational budget. No participant fee pools toward prizes. DIA informal enquiry in preparation (target May 2026). Legal sign-off by Shelley required before launch.',
    actions: [
      'Lodge DIA informal enquiry by 15 May 2026 — confirm spot prize subsidiary model falls outside Gambling Act licensing',
      'Shelley to complete Gambling Act 2003 compliance analysis by 30 Jun 2026',
      'Ensure all participant-facing copy uses "spot prize draw" — never "lottery", "lucky draw", or "random draw"',
      'Confirm prize fund accounting separation at Sport Waikato finance level',
      'Insert prize funding source clause into Terms: "Prize fund is funded entirely from Sport Waikato operational funds. No participant subscription fee contributes to any prize."',
      'Obtain written legal sign-off from Shelley by 30 Sep 2026 — hard gate for launch',
    ],
  },
  {
    id: 'C002',
    area: 'Health Data Privacy',
    legislation: 'Privacy Act 2020',
    status: 'In Progress',
    priority: 'Critical',
    owner: 'Shelley',
    deadline: '31 Jul 2026',
    icon: <Lock size={18} />,
    summary: 'REAP collects wearable health data (step count, heart rate, movement minutes) via the TERRA API. This is sensitive personal information under the Privacy Act 2020. Explicit consent, data minimisation, right to deletion, and clear disclosure of third-party data sharing are required. Privacy Policy in draft.',
    actions: [
      'Privacy Policy legal review by Shelley — target 31 Jul 2026',
      'Implement explicit consent form for wearable health data at onboarding',
      'Document data minimisation: only collect the specific metrics required for elimination decisions',
      'Build participant data deletion request flow (right to erasure)',
      'Document TERRA API data processing agreement and sub-processor disclosure',
      'Separate research consent clause if health data used for Sport Waikato Living Lab research purposes',
    ],
  },
  {
    id: 'C003',
    area: 'Consumer Rights',
    legislation: 'Consumer Guarantees Act 1993 / Fair Trading Act 1986',
    status: 'In Progress',
    priority: 'High',
    owner: 'Shelley',
    deadline: '31 Jul 2026',
    icon: <Shield size={18} />,
    summary: 'Recurring $13/month subscription requires clear pre-purchase disclosure. Refund position for eliminated participants must comply with Consumer Guarantees Act. Marketing claims (website, social) must be accurate under the Fair Trading Act. Terms and Conditions need Shelley review.',
    actions: [
      'Legal review of Terms and Conditions — Shelley by 31 Jul 2026',
      'Stripe checkout: configure recurring billing disclosure with clear renewal terms',
      'Refund policy: document pro-rata refund position for involuntary elimination',
      'Website review: all marketing claims reviewed against Fair Trading Act before launch',
      'Cancellation process clearly documented in-app and in Terms',
    ],
  },
  {
    id: 'C004',
    area: 'Payment Processing',
    legislation: 'PCI DSS (via Stripe)',
    status: 'Adequate',
    priority: 'Medium',
    owner: 'Dev Team',
    deadline: '31 Oct 2026',
    icon: <Shield size={18} />,
    summary: 'Stripe handles PCI compliance for all card processing via Stripe-hosted checkout. REAP does not directly handle or store card numbers. Stripe is a certified PCI DSS Level 1 service provider. No additional PCI certification required for REAP.',
    actions: [
      'Confirm Stripe-hosted checkout used at all payment touchpoints — no direct card capture',
      'Document Stripe as sub-processor in Privacy Policy',
      'Stripe billing configuration: subscription, failed payment retry logic, and cancellation flow tested before launch',
    ],
  },
  {
    id: 'C005',
    area: 'Participant Health & Safety',
    legislation: 'Health and Safety at Work Act 2015',
    status: 'In Progress',
    priority: 'High',
    owner: 'Ashleigh',
    deadline: '31 Aug 2026',
    icon: <Heart size={18} />,
    summary: 'Sport Waikato has a duty of care to participants. The game mechanic incentivises daily exercise — physical strain and cardiac risk must be acknowledged and managed. Health declaration at sign-up, medical advisor engagement, welfare register, and incident protocol are all required.',
    actions: [
      'Health declaration at onboarding: cardiac conditions, injuries, and exercise contraindications',
      'Engage medical advisor (T069) — GP or sports medicine physician to review exercise protocols',
      'Welfare register operational before beta launch',
      'Incident response protocol finalised (T068) — including CEO escalation path',
      'In-app messaging: "do not exercise through pain — use Redemption Day to protect yourself"',
      'Medical exemption provision: admin can grant short-term exemption pending GP clearance',
    ],
  },
  {
    id: 'C006',
    area: 'Age Verification',
    legislation: 'Gambling Act 2003 / General',
    status: 'Adequate',
    priority: 'Medium',
    owner: 'Shelley',
    deadline: '31 Aug 2026',
    icon: <Shield size={18} />,
    summary: 'Participants must be 18+ to participate. Current approach: date of birth declaration at sign-up. Prize winner identity verified post-hoc before payment. Shelley to confirm declaration-only is sufficient for a promotional competition of this type.',
    actions: [
      'Shelley to confirm 18+ declaration approach is legally sufficient (no biometric ID verification required)',
      'Prize winner identity verification protocol before any prize payment is disbursed',
      'Terms: clearly state 18+ requirement and right to verify before prize distribution',
    ],
  },
];

const legalDocuments = [
  { doc: 'Terms of Participation', status: 'Draft', priority: 'Critical', owner: 'Shelley', deadline: '31 Jul 2026' },
  { doc: 'Privacy Policy', status: 'Draft', priority: 'Critical', owner: 'Shelley', deadline: '31 Jul 2026' },
  { doc: 'Refund Policy', status: 'In Progress', priority: 'High', owner: 'Shelley', deadline: '30 Jun 2026' },
  { doc: 'Celebrity Ambassador Agreement', status: 'Not Started', priority: 'High', owner: 'Shelley', deadline: '15 Jul 2026' },
  { doc: 'Spot Prize Draw Procedure', status: 'Not Started', priority: 'Critical', owner: 'Leanne / Dev Team', deadline: '15 Aug 2026' },
  { doc: 'Corporate Group Agreement', status: 'Not Started', priority: 'High', owner: 'Shelley', deadline: '31 Aug 2026' },
  { doc: 'Sponsorship Contract Template', status: 'Draft', priority: 'Medium', owner: 'Shelley', deadline: '31 Aug 2026' },
  { doc: 'Website Marketing Copy Review', status: 'Not Started', priority: 'High', owner: 'Shelley', deadline: '31 Aug 2026' },
];

const prelaunchChecklist = [
  { item: 'DIA informal enquiry lodged', owner: 'Shelley', deadline: '15 May 2026', critical: true },
  { item: 'Gambling Act 2003 analysis complete', owner: 'Shelley', deadline: '30 Jun 2026', critical: true },
  { item: 'DIA response received (or no response — proceed on legal advice)', owner: 'Shelley', deadline: '15 Aug 2026', critical: true },
  { item: 'Terms & Conditions signed off', owner: 'Shelley', deadline: '31 Jul 2026', critical: true },
  { item: 'Privacy Policy signed off', owner: 'Shelley', deadline: '31 Jul 2026', critical: true },
  { item: 'Refund Policy finalised', owner: 'Shelley', deadline: '30 Jun 2026', critical: false },
  { item: 'Celebrity Ambassador Agreement executed', owner: 'Shelley', deadline: '15 Jul 2026', critical: false },
  { item: 'Spot prize draw procedure documented & tested', owner: 'Leanne', deadline: '15 Aug 2026', critical: true },
  { item: 'Prize fund accounting separation confirmed', owner: 'Leanne', deadline: '31 Jul 2026', critical: true },
  { item: 'Medical advisor engaged', owner: 'Leanne', deadline: '1 Jul 2026', critical: false },
  { item: 'Welfare register operational', owner: 'Ashleigh', deadline: '1 Sep 2026', critical: true },
  { item: 'Health declaration built into onboarding', owner: 'Dev Team', deadline: '1 Sep 2026', critical: true },
  { item: 'External security pen test complete', owner: 'Dev Team', deadline: '15 Sep 2026', critical: false },
  { item: 'Board approval resolution passed', owner: 'Leanne', deadline: '31 Jul 2026', critical: true },
  { item: 'Formal written legal sign-off from Shelley', owner: 'Shelley', deadline: '30 Sep 2026', critical: true },
];

const boardResolution = `That Sport Waikato approves REAP (Survive the Reap) as an official Living Lab product and operational programme, approves the Year 1 budget commitment of $27,084 NZD (comprising $17,760 app development and operations budget and $9,324 spot prize draw fund from operational funds), authorises management to proceed with the Department of Internal Affairs informal enquiry and legal sign-off process, delegates day-to-day product decisions to the Living Lab Lead within the approved framework, and directs that all pre-launch compliance conditions be met before public launch on 1 November 2026.`;

function StatusBadge({ status }: { status: ComplianceAreaDetail['status'] }) {
  const cfg = statusConfig[status];
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      {cfg.label}
    </span>
  );
}

function DocStatusBadge({ status }: { status: string }) {
  if (status === 'Draft') return <span className="text-xs font-semibold px-2 py-0.5 rounded bg-yellow-50 text-yellow-700 border border-yellow-200">Draft</span>;
  if (status === 'In Progress') return <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">In Progress</span>;
  if (status === 'Approved' || status === 'Final') return <span className="text-xs font-semibold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">{status}</span>;
  return <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">Not Started</span>;
}

export function ComplianceView() {
  const underReview = complianceAreas.filter(a => a.status === 'Under Review').length;
  const inProgress = complianceAreas.filter(a => a.status === 'In Progress').length;
  const adequate = complianceAreas.filter(a => a.status === 'Adequate').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Legal & Compliance</h2>
        <p className="text-gray-600 text-sm">Gambling Act, Privacy Act, Consumer Law, and pre-launch sign-off tracking</p>
      </div>

      {/* Spot Prize Model Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <Scale size={20} className="text-blue-600 mt-0.5 shrink-0" />
          <div>
            <div className="font-bold text-blue-900 mb-2">Adopted Compliance Model: Spot Prize Competition</div>
            <div className="text-sm text-blue-800 space-y-1">
              <p>The $13/month subscription is paid for access to the <strong>game</strong> — not for draw eligibility. Active confirmed-paid survivors are automatically eligible for spot prize draws; no additional payment is made.</p>
              <p>7 spot prize draws per season at milestone points (Days 7, 13, 14, 21, 24, 28, 30). Prize fund: $4,662/season (7 × $666) from Sport Waikato operational budget — entirely separate from subscription revenue.</p>
              <p className="font-semibold">Language: always use "spot prize draw." Never use "lottery", "lucky draw", or "random draw."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={18} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Under Review</span>
          </div>
          <div className="text-3xl font-bold text-blue-800">{underReview}</div>
          <div className="text-xs text-blue-600 mt-1">Awaiting DIA response or legal analysis</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={18} className="text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-700">In Progress</span>
          </div>
          <div className="text-3xl font-bold text-yellow-800">{inProgress}</div>
          <div className="text-xs text-yellow-600 mt-1">Active compliance work underway</div>
        </div>
        <div className="bg-green-50 border border-green-200 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={18} className="text-green-600" />
            <span className="text-sm font-semibold text-green-700">Adequate</span>
          </div>
          <div className="text-3xl font-bold text-green-800">{adequate}</div>
          <div className="text-xs text-green-600 mt-1">Controls in place, monitoring only</div>
        </div>
      </div>

      {/* Board Resolution */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <FileText size={18} className="text-gray-600" />
          <h3 className="text-base font-bold text-gray-900">Board Resolution — Required Before Launch</h3>
        </div>
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
            <p className="text-sm text-gray-700 italic leading-relaxed">{boardResolution}</p>
          </div>
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Conditions Precedent to Public Launch</div>
          <div className="space-y-1.5">
            {[
              'Written legal sign-off on Gambling Act / spot prize competition position',
              'External legal sign-off on Terms, Privacy Policy, and all participant-facing documents',
              'Working, tested application with demonstrated midnight elimination processing',
              'Welfare register and incident response protocol operational',
              'Spot prize draw procedure documented, tested, and independently witnessed',
              'Prize fund ($4,662/season) explicitly approved and ring-fenced in SW operational accounts',
              'Beta test season completed (≥ 50 participants) with feedback reviewed',
              'Staff resourcing plan for live season support confirmed',
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-600 font-bold shrink-0">{i + 1}.</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Areas */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Compliance Areas — Detailed Status</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {complianceAreas.map(area => {
            const pc = priorityConfig[area.priority];
            return (
              <div key={area.id} className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{area.icon}</span>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{area.area}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{area.legislation} · Owner: {area.owner} · Deadline: {area.deadline}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={area.status} />
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${pc.bg} ${pc.text}`}>{area.priority}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{area.summary}</p>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Required Actions</div>
                  <ul className="space-y-1">
                    {area.actions.map((action, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-gray-400 shrink-0 mt-0.5">›</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legal Documents */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Legal Documents — Sign-Off Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Document</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Priority</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Owner</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {legalDocuments.map((doc, i) => {
                const pc = priorityConfig[doc.priority as ComplianceAreaDetail['priority']] ?? { bg: 'bg-gray-100', text: 'text-gray-600' };
                return (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-900">{doc.doc}</td>
                    <td className="px-5 py-3"><DocStatusBadge status={doc.status} /></td>
                    <td className="px-5 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded ${pc.bg} ${pc.text}`}>{doc.priority}</span></td>
                    <td className="px-5 py-3 text-gray-600">{doc.owner}</td>
                    <td className="px-5 py-3 text-gray-700 font-mono text-xs">{doc.deadline}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pre-Launch Checklist */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Pre-Launch Compliance Checklist</h3>
          <p className="text-xs text-gray-500 mt-0.5">All critical items must be complete before 1 November 2026 public launch</p>
        </div>
        <div className="divide-y divide-gray-100">
          {prelaunchChecklist.map((item, i) => (
            <div key={i} className="px-6 py-3 flex items-center gap-4 hover:bg-gray-50">
              <div className={`w-4 h-4 rounded border-2 shrink-0 ${item.critical ? 'border-red-400' : 'border-gray-300'}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900 font-medium">{item.item}</div>
              </div>
              <div className="text-xs text-gray-500 shrink-0">{item.owner}</div>
              <div className={`text-xs font-mono shrink-0 ${item.critical ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>{item.deadline}</div>
              {item.critical && <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-200 shrink-0">Critical</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Key Compliance Milestones</h3>
        </div>
        <div className="p-6 space-y-3">
          {[
            { date: '15 May 2026', label: 'DIA Informal Enquiry Lodged', detail: 'Submit questions on spot prize competition structure to Department of Internal Affairs', color: 'text-red-600' },
            { date: '30 Jun 2026', label: 'DIA Response Expected', detail: 'Allow 6–8 weeks for informal guidance (not legally binding; we proceed on Shelley\'s advice)', color: 'text-yellow-600' },
            { date: '31 Jul 2026', label: 'Board Approval Required', detail: 'Board passes resolution approving REAP and Year 1 budget including prize fund', color: 'text-red-600' },
            { date: '31 Jul 2026', label: 'Terms & Privacy Policy Sign-Off', detail: 'All participant-facing documents approved in writing by Shelley', color: 'text-red-600' },
            { date: '15 Aug 2026', label: 'Spot Prize Draw Procedure Complete', detail: 'Documented, witnessed, and tested draw procedure ready before beta launch', color: 'text-orange-600' },
            { date: '30 Sep 2026', label: 'Final Legal Sign-Off', detail: 'Written legal clearance from Shelley — hard gate for Season 1 public launch', color: 'text-red-600' },
            { date: '1 Nov 2026', label: 'Season 1 Public Launch', detail: 'All compliance conditions met. Game goes live.', color: 'text-green-600' },
          ].map((m, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={`text-xs font-bold w-28 shrink-0 pt-0.5 ${m.color}`}>{m.date}</div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{m.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{m.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
