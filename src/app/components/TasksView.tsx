import { useState } from 'react';
import { AlertCircle, CheckCircle2, Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface Task {
  name: string;
  category: string;
  description: string;
  owner: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked';
  dueDate: string;
  dependencies: string[];
  notes: string;
}

export function TasksView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const tasks: Task[] = [
    {
      name: "Resolve 'at random' vs 'skill-based' contradiction in Rules/Terms",
      category: "Legal & Compliance",
      description: "The current Terms and Rules contain conflicting language — some sections describe the prize draw as 'at random' while others imply skill-based elimination determines eligibility. This must be resolved to comply with NZ gambling and promotional competition law.",
      owner: "Legal/Shelley",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-06-30",
      dependencies: [],
      notes: "DIA distinguishes between 'games of chance' (regulated) and 'games of skill' (unregulated). The current hybrid wording creates legal exposure. Recommend landing on: skill-based survival gate + random draw among eligible survivors. Shelley to confirm this framing is defensible."
    },
    {
      name: "Get DIA informal guidance on prize draw structure",
      category: "Legal & Compliance",
      description: "Seek informal guidance from the Department of Internal Affairs on whether REAP's prize draw structure (survival gate + random draw among survivors) requires a gambling licence or qualifies as an exempt promotional competition.",
      owner: "Legal/Shelley",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-07-15",
      dependencies: ["Resolve 'at random' vs 'skill-based' contradiction in Rules/Terms"],
      notes: "DIA informal guidance is not binding but provides a defensible paper trail. If DIA signals concern, the prize structure may need to be restructured (e.g., moved to a Section 4(1)(d) exempt format). Allow 4-6 weeks for DIA response."
    },
    {
      name: "Add prize funding separation disclosure to Terms",
      category: "Legal & Compliance",
      description: "Insert explicit clause confirming prize fund is funded entirely from Sport Waikato operational funds, maintained separately from subscription revenue at the accounting level.",
      owner: "Legal/Shelley",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-06-30",
      dependencies: [],
      notes: "This separation is legally material — it removes the 'consideration for prize' element that would engage gambling law. Must be auditable."
    },
    {
      name: "Build prize_awards database table and draw protocol",
      category: "Development",
      description: "Create database schema for prize_awards table. Build admin interface for conducting documented, auditable prize draws. Ensure each draw is logged with eligible participant pool, selection basis, timestamp, and result.",
      owner: "Dev Team",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-09-15",
      dependencies: ["Get DIA informal guidance on prize draw structure"],
      notes: "Prize draw process must be independently verifiable. Consider using provably fair random selection (cryptographic hash) or documented performance-based selection. Export functionality for board reporting required."
    },
    {
      name: "Deploy Supabase edge functions (payment webhook, midnight elimination)",
      category: "Development",
      description: "Deploy production-ready Supabase Edge Functions for Stripe payment webhook processing and automated midnight elimination processing. Test thoroughly in staging.",
      owner: "Dev Team",
      priority: "Critical",
      status: "In Progress",
      dueDate: "2026-08-31",
      dependencies: [],
      notes: "Estimated 3 hours development time. Critical path item — midnight elimination is the core product mechanic. Must handle timezone edge cases correctly."
    },
    {
      name: "Integrate 8+ wearable APIs (Garmin, Apple Health, Fitbit, etc.)",
      category: "Development",
      description: "Build and test integrations with all major wearable platforms: Garmin Connect, Apple Health, Fitbit, Google Fit, Strava, Polar, Whoop, Samsung Health. Implement Zone 2 classification logic across all data sources.",
      owner: "Dev Team",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-09-15",
      dependencies: [],
      notes: "Each wearable API has different data structures and reliability profiles. Zone 2 classification (moderate intensity, 50-70% max HR) must be consistent across platforms. Build fallback for devices that don't provide heart rate data."
    },
    {
      name: "Build disputes management system",
      category: "Development",
      description: "Create admin interface for reviewing participant disputes (incorrect eliminations, device sync failures, data discrepancies). Log all dispute resolutions for audit trail.",
      owner: "Dev Team",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-09-30",
      dependencies: [],
      notes: "Consumer Guarantees Act requires fair process for service complaints. Disputes will occur — need documented, transparent resolution process."
    },
    {
      name: "Legal sign-off: Terms, Rules, Privacy Policy",
      category: "Legal & Compliance",
      description: "Final legal review and written approval of all participant-facing documents by Shelley. Hard deadline for launch.",
      owner: "Legal/Shelley",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-07-31",
      dependencies: ["Resolve 'at random' vs 'skill-based' contradiction in Rules/Terms", "Add prize funding separation disclosure to Terms", "Get DIA informal guidance on prize draw structure"],
      notes: "Non-negotiable deadline for November 1 launch. If DIA does not respond before end of June, Shelley will need to advise whether we proceed on the basis of her own assessment or delay launch."
    },
    {
      name: "Draft and approve welfare protocol for elimination notifications",
      category: "Risk & Welfare",
      description: "Document protocol for elimination notification copy (tone, support signposting) and vulnerable participant scenarios. Include mental health resource referrals.",
      owner: "Living Lab / CEO",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-08-15",
      dependencies: [],
      notes: "Ethical and reputational risk mitigation. Elimination at midnight is emotionally charged. Need non-shaming, forward-looking language. Consider partnership with NZ mental health organization."
    },
    {
      name: "Confirm prize sponsorship interest (Garmin NZ, health insurers)",
      category: "Commercial",
      description: "Approach potential prize sponsors to offset Year 1 prize fund commitment ($9,324 for 2 seasons). Target sponsors: Garmin NZ, health insurers, corporate wellness providers.",
      owner: "CEO / Commercial Lead",
      priority: "Medium",
      status: "Not Started",
      dueDate: "2026-08-31",
      dependencies: [],
      notes: "Prize sponsorship must be structured as donation/sponsorship to Sport Waikato operational funds — not direct contribution to prize pool. Maintains legal separation."
    },
    {
      name: "Brief Sport NZ and key funders before public announcement",
      category: "Stakeholder Management",
      description: "Pre-brief Sport NZ, Waikato Regional Council, and other key funders on REAP concept, rationale, and risk mitigation before any public media coverage.",
      owner: "CEO",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-09-15",
      dependencies: [],
      notes: "Reputational risk mitigation. Funders should hear about REAP from Sport Waikato, not from media. Prepare briefing deck with behavioural science rationale and risk framework."
    },
    {
      name: "Recruit and contract celebrity for October soft launch",
      category: "Marketing",
      description: "Identify and contract NZ celebrity or media personality for October soft launch. Draft and execute celebrity endorsement agreement with legal sign-off.",
      owner: "Marketing Lead",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-08-31",
      dependencies: ["Legal sign-off: Terms, Rules, Privacy Policy"],
      notes: "Celebrity must be brand-appropriate (playfully dark, health/fitness credible). Contract must include media obligations and controversy clause."
    },
    {
      name: "Run internal test season (Sport Waikato staff)",
      category: "Testing",
      description: "Run a closed test season with 20-30 Sport Waikato staff to validate elimination processing, wearable sync, and user experience before public launch.",
      owner: "Living Lab / Dev Team",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-09-30",
      dependencies: ["Deploy Supabase edge functions (payment webhook, midnight elimination)", "Integrate 8+ wearable APIs (Garmin, Apple Health, Fitbit, etc.)"],
      notes: "Board approval condition #6. At least one test season must be completed before public Season 1. Identify and fix bugs in controlled environment."
    },
    {
      name: "File trade mark for 'Survive the Reap' and REAP logo",
      category: "Legal & Compliance",
      description: "File trade mark application with IPONZ for 'Survive the Reap' name and REAP logo to protect brand identity. Mechanics are unprotectable but the name is.",
      owner: "Legal/Shelley",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-07-31",
      dependencies: [],
      notes: "From Competitive Strategy: Protects the brand identity; mechanics are unprotectable but the name is. File before any public announcement."
    },
    {
      name: "Approach 2–3 RSTs with licence offer framework",
      category: "Strategy & Partnerships",
      description: "Develop and approach 2-3 Regional Sport Trusts with a licence offer framework to convert the RST network into distribution partners, not future competitors.",
      owner: "CEO",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-09-15",
      dependencies: [],
      notes: "From Competitive Strategy: If other RSTs are running REAP under licence rather than building their own version, the model is protected through partnership rather than IP. Complete before Season 2 planning."
    },
    {
      name: "Publish Living Lab research protocol",
      category: "Research",
      description: "Publish the Living Lab research protocol for REAP to establish it as a research product from Day 1 and make it harder for competitors to claim research credibility retroactively.",
      owner: "Living Lab / CEO",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-10-15",
      dependencies: [],
      notes: "From Competitive Strategy: Establishes REAP as a research product from Day 1. Should be published before public launch on 1 November 2026."
    },
    {
      name: "Explore TERRA API for device integration",
      category: "Development",
      description: "Investigate TERRA API as a universal device integration solution to reduce technical moat gap with platform players and ensure REAP works across all major wearables.",
      owner: "Dev Team",
      priority: "Medium",
      status: "Not Started",
      dueDate: "2026-06-30",
      dependencies: [],
      notes: "From Competitive Strategy: Reduces technical moat gap with platform players; ensures REAP works across all major wearables before a competitor does. Timeline: June 2026."
    },
    {
      name: "Develop annual championship concept",
      category: "Strategy & Partnerships",
      description: "Design the annual championship event concept where survivors of all seasons in a year are eligible for a major in-person championship event with prizes. Creates multi-season participant investment.",
      owner: "CEO / Marketing Lead",
      priority: "Medium",
      status: "Not Started",
      dueDate: "2027-01-31",
      dependencies: [],
      notes: "From Competitive Strategy: A multi-season competitive structure creates participant investment in the REAP brand over time. Timeline: Year 2 planning."
    },
    {
      name: "Legal sign-off: Website marketing copy",
      category: "Legal & Compliance",
      description: "Obtain Shelley's written approval for all website marketing copy before website goes live. No participant-facing content publishes without legal sign-off.",
      owner: "Legal/Shelley",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-10-15",
      dependencies: [],
      notes: "From Governance Framework: Nothing publishes without Shelley's written approval. This is a standing rule, not a case-by-case decision. Required before website goes live."
    },
    {
      name: "Legal sign-off: Prize structure disclosure",
      category: "Legal & Compliance",
      description: "Obtain Shelley's written approval for prize structure disclosure documentation before season starts. Must comply with promotional competition regulations.",
      owner: "Legal/Shelley",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-10-25",
      dependencies: [],
      notes: "From Governance Framework: Required before season starts. Prize structure (7 × $666 per season, skill-based survival gate + random draw among eligible survivors) must be clearly disclosed."
    },
    {
      name: "Legal sign-off: Corporate Group Agreement template",
      category: "Legal & Compliance",
      description: "Draft and obtain Shelley's written approval for Corporate Group Agreement template before corporate sales begin.",
      owner: "Legal/Shelley",
      priority: "Medium",
      status: "Not Started",
      dueDate: "2026-10-31",
      dependencies: [],
      notes: "From Governance Framework: Required before corporate sales begin. Template should cover group registration, payment terms, participant data handling, and liability."
    },
    {
      name: "Implement prize draw audit log system",
      category: "Development",
      description: "Build prize_awards database table and admin interface for conducting documented, auditable prize draws. Each draw must be logged with timestamp, eligible pool size, criterion applied, winner identifier, and prize value.",
      owner: "Dev Team",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-09-15",
      dependencies: ["Build prize_awards database table and draw protocol"],
      notes: "From Governance Framework: Prize draw administration must meet governance requirements. Record stored in prize_awards table. Independent third party may witness at least one draw per season (recommended)."
    },
    {
      name: "Complete funder briefing programme",
      category: "Stakeholder Management",
      description: "CEO to lead funder briefing programme with Sport NZ and other key funders before public launch. Must be completed before 1 November 2026 launch.",
      owner: "CEO",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-10-15",
      dependencies: [],
      notes: "From Governance Framework: CEO responsibility specific to launch. Funder briefing must be completed before public launch. Critical for maintaining funder relationships and managing reputational risk."
    },
    {
      name: "Set up reporting schedule and templates",
      category: "Governance",
      description: "Create templates for end-of-season report, financial summary, welfare incident log, legal compliance status report, and data/research summary. Schedule reporting cadence with appropriate recipients.",
      owner: "Living Lab / Finance",
      priority: "Medium",
      status: "Not Started",
      dueDate: "2026-10-15",
      dependencies: [],
      notes: "From Governance Framework: 5 report types required with varying frequency. End-of-season report (LL Lead → Board), Financial summary (Finance → CEO + Board), Welfare incident log (CEO → Board, quarterly or on event), Legal compliance status (CEO + Legal → Board, before each season), Data/research summary (Living Lab → Board + Sport NZ, annual)."
    },
    {
      name: "Establish Tier 1/Tier 2 trigger response protocols",
      category: "Risk & Governance",
      description: "Document operational procedures for Tier 1 triggers (immediate pause + same-day board notification) and Tier 2 triggers (board review within 72 hours). Ensure all staff understand escalation pathways.",
      owner: "CEO / Living Lab Lead",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-09-30",
      dependencies: [],
      notes: "From Governance Framework: Tier 1 triggers include DIA formal indication of unlicensed gambling, participant welfare incident, systematic technical failure affecting >5% participants, court order/regulatory action, or privacy breach. Clear protocols ensure rapid response to serious incidents."
    },
    {
      name: "Draft and approve media response protocols",
      category: "Communications",
      description: "Create documented media handling protocols including core messages, FAQ responses, approved phrases, and escalation procedures. Train all staff who may do media on response frameworks.",
      owner: "CEO / Communications Lead",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-09-15",
      dependencies: [],
      notes: "From Media Handling Guide: Staff must be briefed on core messages (health case, loss aversion, charitable trust revenue story, research value, first mover advantage) and how to answer hard questions without sounding defensive. Media training required for CEO and Living Lab Lead before October soft launch."
    },
    {
      name: "Secure mental health organisation partnership for welfare protocol co-development",
      category: "Risk & Welfare",
      description: "Approach NZ mental health organisations to co-develop welfare elements of REAP, including elimination notification language and support resource signposting.",
      owner: "CEO / Living Lab Lead",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-08-31",
      dependencies: ["Draft and approve welfare protocol for elimination notifications"],
      notes: "From Media Handling Guide: Formal partnership with a NZ mental health organisation strengthens welfare response credibility and provides expert guidance on elimination notification design. This should be mentioned in any media response about mental health concerns."
    },
    {
      name: "Prepare evidence pack for media engagements",
      category: "Communications",
      description: "Compile evidence pack including WHO physical activity guidelines, NZ inactivity statistics, health cost data, Kahneman & Tversky Prospect Theory citations, Sport Waikato community programme reach data, and Living Lab research mandate documentation.",
      owner: "Living Lab Lead / CEO",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-09-30",
      dependencies: [],
      notes: "From Media Handling Guide: All core messages must be backed by readily available evidence. CEO and Living Lab Lead need this pack for any media interview to support claims about health benefits, behavioural science rationale, and charitable trust context."
    },
    {
      name: "Conduct staff welfare protocol training before Season 1",
      category: "Risk & Welfare",
      description: "Brief all staff members who may receive participant communications on the Level 1/2/3 response framework, crisis resources, escalation paths, and documentation requirements.",
      owner: "Living Lab Lead / CEO",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-10-25",
      dependencies: ["Draft and approve welfare protocol for elimination notifications"],
      notes: "From Product Harm Protocol: Staff must know crisis resources (Lifeline 0800 543 354, 1737) immediately without looking up. Briefing session required before each season opens. This is standard operating procedure, not emergency response."
    },
    {
      name: "Board adoption of Product Harm & Welfare Protocol",
      category: "Governance",
      description: "Present Product Harm & Welfare Protocol to Sport Waikato Board for formal adoption before Season 1 launch. Protocol covers psychological harm (Levels 1-3), physical harm, financial harm, response procedures, and documentation requirements.",
      owner: "CEO",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-09-30",
      dependencies: ["Draft and approve welfare protocol for elimination notifications"],
      notes: "From Product Harm Protocol: Status is Draft — requires board adoption before launch. Protocol demonstrates that welfare risks were considered, documented, and managed with appropriate care. Absence of protocol is itself an ethical and legal liability."
    },
    {
      name: "Set up welfare and disputes register database",
      category: "Development",
      description: "Create database table and admin interface for logging welfare incidents with all required fields: date/time, participant ID (anonymised), nature of contact, severity level, response taken, outcome, escalations (CEO/Board/Legal), follow-up actions, and status.",
      owner: "Dev Team",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-09-15",
      dependencies: [],
      notes: "From Product Harm Protocol: Register must be maintained throughout each season. Privacy Act 2020 requires secure handling — personal information retained securely, not disclosed externally, available to Privacy Commissioner on request. Register reviewed at end of season for board report (anonymised)."
    },
    {
      name: "Review and finalise elimination notification copy with mental health partner",
      category: "Risk & Welfare",
      description: "Once mental health partnership is established, co-develop and finalise elimination notification copy to ensure tone is honest, forward-looking, and includes appropriate support resource signposting.",
      owner: "Living Lab Lead / Mental Health Partner",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-10-15",
      dependencies: ["Secure mental health organisation partnership for welfare protocol co-development"],
      notes: "From Product Harm Protocol: Elimination notification must be non-triumphant, signpost support resources. Mental health partner will review and approve notification language as part of co-development process."
    },
    {
      name: "Brief board on reputation protection scenarios and response framework",
      category: "Governance",
      description: "Present Reputation Protection Plan to Board covering 6 crisis scenarios (DIA gambling challenge, welfare incident, celebrity controversy, data breach, negative media, competitor launch) with prepared responses for each. Ensure board comfort with bold positioning and confident response tone.",
      owner: "CEO",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-09-30",
      dependencies: [],
      notes: "From Reputation Protection Plan: Board should be fully prepared for reality that some media coverage will be negative or sceptical. This is not a reason to be less bold — it's a reason to have a clear, confident plan for responding to adversity before it happens."
    },
    {
      name: "Lodge informal DIA enquiry about prize structure compliance",
      category: "Legal & Compliance",
      description: "Submit informal enquiry to Department of Internal Affairs regarding REAP's spot prize draw structure and promotional competition model to confirm compliance with Gambling Act 2003 before public launch. Present four key questions about consideration test, subsidiarity test, charitable trust status impact, and prize funding separation. Document DIA's position.",
      owner: "CEO / Legal Counsel (Shelley)",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-05-15",
      dependencies: [],
      notes: "UPDATED from Gambling Compliance Section: DIA enquiry target moved to 15 May 2026 (was 15 Sept) to allow 6-8 weeks for response before final Terms locked (30 June deadline). Questions focus on spot prize/subsidiary model, not performance awards. Shelley will advise whether launch can proceed on her assessment if DIA doesn't respond in time."
    },
    {
      name: "Finalise and publish Terms of Participation with additional clauses",
      category: "Legal & Compliance",
      description: "Integrate Clauses A-E (Wellbeing & Mental Health, Gamification & Responsible Participation, Accessible Participation, Device Failure, Vulnerable Participant Elimination) into full Terms of Participation. Obtain Shelley's legal sign-off before publication.",
      owner: "Legal Counsel (Shelley)",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-09-30",
      dependencies: [],
      notes: "From Terms Additions document: All clauses require legal sign-off by Shelley before publication. Should be reviewed alongside complete Terms, Refund Policy, and Privacy Policy for consistency."
    },
    {
      name: "Develop sponsorship pitch deck and identify Season 1 prospects",
      category: "Revenue & Partnerships",
      description: "Create sponsorship pitch materials covering 4 sponsorship types (Prize, Group League, Title, Research) with indicative pricing. Identify and approach 5-10 potential sponsors for Season 1 (October 2026 soft launch).",
      owner: "CEO / Living Lab Lead",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-08-31",
      dependencies: [],
      notes: "From Sponsorship Agreement: Types available: Prize Sponsorship ($5k-$20k), Sponsored Group League ($5k-$25k), Season Title Sponsorship ($20k-$50k), Research Partnership ($10k-$30k/year). All agreements require legal sign-off before execution."
    },
    {
      name: "Prepare board report template with end-of-season metrics",
      category: "Governance",
      description: "Create standardized end-of-season board report template including: total participants, survival rates by milestone, prize awards record, welfare register summary (anonymised), revenue breakdown, engagement metrics, lessons learned, and Season 2 recommendations.",
      owner: "Living Lab Lead",
      priority: "Medium",
      status: "Not Started",
      dueDate: "2026-10-15",
      dependencies: [],
      notes: "From Governance Framework: End-of-season report to Board is a formal reporting requirement. Report should be delivered within 30 days of season end. Welfare register must be included (anonymised)."
    },
    {
      name: "Update Terms with spot prize draw compliance language",
      category: "Legal & Compliance",
      description: "Insert gambling compliance statements into Terms: (1) Draws are automatic for active survivors, no additional payment required; (2) Draws are promotional features, not primary purpose; (3) Prize funding separation statement confirming prizes funded from SW operational funds, not subscription revenue.",
      owner: "Legal Counsel (Shelley)",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-09-30",
      dependencies: ["Lodge informal DIA enquiry about prize structure compliance"],
      notes: "From Gambling Compliance Section: Three critical statements required in Terms to establish consideration test, subsidiarity test, and prize funding independence. Must be integrated by Shelley before publication."
    },
    {
      name: "Establish accounting separation for prize funding",
      category: "Finance",
      description: "Set up separate accounting treatment for prize fund ($4,662/season, $18,648/year) funded entirely from Sport Waikato operational funds, maintained separately from participant subscription revenue at accounting level. Must be independently auditable.",
      owner: "Finance Manager / CEO",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-09-15",
      dependencies: [],
      notes: "From Gambling Compliance Section: Prize funding independence (Layer 3 of compliance architecture) requires documented financial separation. Prize fund is SW operational commitment, not app operating cost. No participant's $13 fee is used to fund any prize."
    },
    {
      name: "Review all marketing copy to remove gambling-linked language",
      category: "Marketing",
      description: "Audit all marketing materials (website, social, ads, app copy) to ensure: (1) No prize amounts in headlines/hero/CTAs; (2) No phrases like 'survive the month to win' or 'your $13 entry includes a chance to win'; (3) Draws described as 'promotional features' not primary product; (4) No 'lucky draw' or 'lottery' language.",
      owner: "Marketing / Living Lab Lead",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-09-30",
      dependencies: [],
      notes: "From Gambling Framing Strategy: Correct language is essential to subsidiarity test. Marketing must lead with game mechanic, not prize. Prize values only in Season Rules and Terms. Use 'spot prize draw' and 'automatic eligibility' language."
    },
    {
      name: "Build prize draw audit trail in Supabase",
      category: "Development",
      description: "Implement prize_awards table logging for each draw: timestamp, eligible pool size (count of active confirmed-paid survivors), winner participant ID, prize value ($666), draw trigger point (Day 7, Day 13, etc.). Required for compliance audit trail.",
      owner: "Dev Team",
      priority: "High",
      status: "Not Started",
      dueDate: "2026-09-15",
      dependencies: [],
      notes: "From Gambling Framing Strategy checklist: Admin backend must log timestamp and eligible pool for each draw. This creates auditable record demonstrating draws were run fairly and eligibility was correctly restricted to active survivors."
    },
    {
      name: "Board resolution: approve prize structure and DIA enquiry authorization",
      category: "Governance",
      description: "Present gambling compliance position to Board for formal approval: seven spot prize draws per season at $666 each ($4,662/season, $18,648/year), funded from SW operational funds. Authorize management to proceed with DIA informal enquiry and engage Shelley for legal sign-off.",
      owner: "CEO",
      priority: "Critical",
      status: "Not Started",
      dueDate: "2026-08-31",
      dependencies: [],
      notes: "From Gambling Compliance Section: Board resolution required before launch. Board must understand three-layer compliance architecture (consideration test, subsidiarity test, prize funding independence) and approve proactive DIA approach."
    }
  ];

  const categories = ['all', ...Array.from(new Set(tasks.map(t => t.category)))];

  const filteredTasks = selectedCategory === 'all'
    ? tasks
    : tasks.filter(t => t.category === selectedCategory);

  const tasksByStatus = {
    'Not Started': filteredTasks.filter(t => t.status === 'Not Started'),
    'In Progress': filteredTasks.filter(t => t.status === 'In Progress'),
    'Blocked': filteredTasks.filter(t => t.status === 'Blocked'),
    'Completed': filteredTasks.filter(t => t.status === 'Completed')
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'Critical': return 'text-red-700 bg-red-50 border-red-200';
      case 'High': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-700 bg-green-50 border-green-200';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 className="text-green-600" size={20} />;
      case 'In Progress': return <Clock className="text-yellow-600" size={20} />;
      default: return <AlertCircle className="text-gray-400" size={20} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const isOverdue = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tasks & Action Plan</h2>
        <p className="text-gray-600">
          Complete task list with dependencies, owners, and due dates
        </p>
      </div>

      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-700">
            {tasks.filter(t => t.priority === 'Critical').length}
          </div>
          <div className="text-sm text-red-600 font-semibold">Critical Priority</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-700">
            {tasks.filter(t => t.status === 'In Progress').length}
          </div>
          <div className="text-sm text-yellow-600 font-semibold">In Progress</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-700">
            {tasks.filter(t => t.status === 'Not Started').length}
          </div>
          <div className="text-sm text-gray-600 font-semibold">Not Started</div>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-700">
            {tasks.filter(t => t.status === 'Completed').length}
          </div>
          <div className="text-sm text-green-600 font-semibold">Completed</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'All Tasks' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <div key={status} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">{status}</h3>
              <span className="text-sm font-semibold text-gray-600 bg-white px-2 py-1 rounded">
                {statusTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {statusTasks.map((task, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setExpandedTask(expandedTask === task.name ? null : task.name)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className={`inline-block text-xs font-semibold px-2 py-1 rounded border mb-2 ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </div>
                      <div className="font-semibold text-gray-900 text-sm mb-1">{task.name}</div>
                      <div className="text-xs text-gray-600 mb-2">{task.category}</div>
                    </div>
                    {expandedTask === task.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>

                  {expandedTask === task.name && (
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                      <div>
                        <div className="text-xs font-semibold text-gray-700 mb-1">Description</div>
                        <div className="text-xs text-gray-600">{task.description}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-700 mb-1">Owner</div>
                        <div className="text-xs text-gray-900">{task.owner}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-700 mb-1">Due Date</div>
                        <div className={`text-xs ${isOverdue(task.dueDate) ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                          {formatDate(task.dueDate)}
                        </div>
                      </div>
                      {task.dependencies.length > 0 && (
                        <div>
                          <div className="text-xs font-semibold text-gray-700 mb-1">Dependencies</div>
                          <div className="text-xs text-gray-600">{task.dependencies.length} dependent task(s)</div>
                        </div>
                      )}
                      {task.notes && (
                        <div>
                          <div className="text-xs font-semibold text-gray-700 mb-1">Notes</div>
                          <div className="text-xs text-gray-600">{task.notes}</div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    {getStatusIcon(task.status)}
                    <div className={`text-xs font-semibold ${isOverdue(task.dueDate) && task.status !== 'Completed' ? 'text-red-600' : 'text-gray-600'}`}>
                      {formatDate(task.dueDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}