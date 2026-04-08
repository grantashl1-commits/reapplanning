import { Target, TrendingUp, Users, Globe, Lightbulb, Rocket } from 'lucide-react';

export function StrategyView() {
  const targetAudience = [
    {
      segment: 'Primary',
      description: '18–45, already somewhat active but inconsistent. Yo-yo relationship with fitness. F45 type, High Rocks type, challenge-culture people.',
      size: 'Large',
      acquisition: 'Social media advertising, Sport Waikato network, RST distribution'
    },
    {
      segment: 'Secondary',
      description: 'Corporate/social groups, friend leagues, workplace wellness programmes',
      size: 'Medium-Large',
      acquisition: 'Corporate group partnerships, B2B sales, employer wellness contracts'
    },
    {
      segment: 'Tertiary',
      description: 'Inactive people pulled in by social pressure ("all my mates are doing it")',
      size: 'Medium',
      acquisition: 'Viral/word-of-mouth, friend referrals, social proof'
    }
  ];

  const launchStrategy = [
    {
      date: 'October 2026',
      phase: 'Celebrity Soft Launch',
      description: 'Invite-only soft launch with NZ media personalities (7 Sharp, MediaWorks/The Breeze, Radio Hauraki), radio stations, and regional influencers. General public NOT yet playing — just watching.',
      objectives: ['Generate earned media coverage', 'Build anticipation and FOMO', 'Test product with high-profile users', 'Create social proof before public launch'],
      kpis: ['Media mentions', 'Social media impressions', 'Waitlist signups']
    },
    {
      date: '1 November 2026',
      phase: 'Season 1 — Public Launch',
      description: 'General public season opens. 30-day survival game begins.',
      objectives: ['Achieve 150-400 participants (base case: 250)', 'Validate product-market fit', 'Generate real-world behaviour change data', 'Test all technical systems at scale'],
      kpis: ['Participant sign-ups', 'Daily active users', 'Survival rate', 'Revenue']
    },
    {
      date: '13 November 2026',
      phase: 'Friday the 13th Event',
      description: 'Mid-season push. Thematically perfect date for REAP brand. Recruitment campaign for December season.',
      objectives: ['Re-engage eliminated participants', 'Drive December season pre-registrations', 'Create viral social moment'],
      kpis: ['Social media engagement', 'December season signups', 'Media coverage']
    },
    {
      date: 'December 2026',
      phase: 'Season 2 — Holiday Season',
      description: 'What is your New Year resolution? Play REAP. Target participants looking for January behaviour change.',
      objectives: ['Demonstrate repeat season viability', 'Test retention: do Season 1 survivors return?', 'Build Year 2 momentum'],
      kpis: ['Returning participants', 'New signups', 'Retention rate', 'Season-on-season growth']
    }
  ];

  const growthMechanics = [
    {
      mechanic: 'Wordle Model',
      description: 'Daily shareable result, lives in WhatsApp groups, network effect',
      implementation: 'Shareable daily status card: "I\'m on Day 15. Still alive." Elimination cards that friends can share.'
    },
    {
      mechanic: 'Friend Leagues',
      description: 'Friend groups, workplace groups, cross-group competition (like fantasy sports)',
      implementation: 'League feature where groups compete. Survival board shows who\'s in and who\'s out. Social accountability.'
    },
    {
      mechanic: 'RST Distribution Network',
      description: 'Commission/rev-share model — RSTs financially incentivised to sign up players ($3 per confirmed participant)',
      implementation: 'Partner with 17 RSTs in Sport NZ network. Regional survival boards. Local events and challenges.'
    },
    {
      mechanic: 'Viral Elimination',
      description: 'Public elimination is the social driver. "I got Reaped" becomes NZ fitness slang.',
      implementation: 'Make elimination shareable. Normalize the language. Build culture around survival and elimination.'
    }
  ];

  const futureOpportunities = [
    {
      opportunity: 'Teams Season',
      description: 'Version where teams survive together — if one team member fails, the whole team faces a consequence (extra challenge, not elimination). Collective obligation mechanic.',
      timeline: 'Year 2',
      revenue: 'Corporate team registrations at premium pricing'
    },
    {
      opportunity: 'Corporate League',
      description: 'Annual corporate league where business teams compete across multiple seasons, with mid-year and end-of-year championships. Recurring corporate engagement model.',
      timeline: 'Year 2',
      revenue: 'Annual sponsorship fees from businesses. Estimated $500-$2,000 per team.'
    },
    {
      opportunity: 'Annual Championship',
      description: 'Survivors of all seasons in a year eligible for annual championship event — in-person celebration, major prize draw, genuine sport/community event.',
      timeline: 'Year 2',
      revenue: 'Ticket sales, sponsorship, corporate hospitality packages'
    },
    {
      opportunity: 'International Expansion',
      description: 'REAP model is not NZ-specific. Expand to Australia, UK, or other English-speaking markets with strong RST/sport trust equivalents.',
      timeline: 'Year 3',
      revenue: 'International subscriptions, licensing to international sport organisations'
    },
    {
      opportunity: 'Licensing to RSTs',
      description: 'White-label or licensed version to other RSTs in NZ and internationally. Licensed REAP in Bay of Plenty, Canterbury, Otago creates national reach without direct management.',
      timeline: 'Year 2-3',
      revenue: 'Licensing fees, revenue share model'
    },
    {
      opportunity: 'Research Partnerships',
      description: 'Formal partnerships with NZ universities (Waikato, AUT, Victoria, Otago). Real-world data is attractive research dataset.',
      timeline: 'Year 1-2',
      revenue: 'Grant funding for research infrastructure, external validation, academic credibility'
    }
  ];

  const valueProposition = [
    {
      driver: 'Loss Aversion',
      explanation: '$13 paid = skin in the game. Participants financially invested in staying active.',
      evidence: 'Behavioural economics: loss aversion is ~2x stronger motivator than equivalent gain.'
    },
    {
      driver: 'Public Commitment',
      explanation: 'Leaderboard visibility. Being eliminated is public. Social accountability.',
      evidence: 'Commitment devices increase follow-through by 30-50% in habit formation studies.'
    },
    {
      driver: 'Artificial Tension',
      explanation: 'Clock, reaper, daily deadline. Creates urgency and ritual.',
      evidence: 'Deadline effect: time-bound goals significantly increase completion rates.'
    },
    {
      driver: 'Belonging',
      explanation: 'Friend groups, WhatsApp leagues, shared experience. Community around survival.',
      evidence: 'Social support is the strongest predictor of sustained behaviour change in public health literature.'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Strategy & Future Vision</h2>
        <p className="text-gray-600">
          Market positioning, growth strategy, launch plan, and future opportunities
        </p>
      </div>

      {/* Strategic Positioning */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Target className="text-blue-600" size={28} />
          <h3 className="text-xl font-bold text-gray-900">Strategic Positioning</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">What REAP Is</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• A survival game that produces a wellbeing outcome</li>
              <li>• Daily movement as game mechanic, not wellness goal</li>
              <li>• "Playfully dark" aesthetic — deliberately provocative</li>
              <li>• Loss aversion as primary behavioural driver</li>
              <li>• Social accountability through public elimination</li>
              <li>• Living Lab innovation experiment with revenue model</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">What REAP Is NOT</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• NOT a wellbeing app (it's a survival game)</li>
              <li>• NOT focused on intensity (Zone 2 is sustainable)</li>
              <li>• NOT a prize competition (prizes are secondary)</li>
              <li>• NOT trying to be inclusive to all demographics</li>
              <li>• NOT following Sport Waikato's rainbow wellness brand</li>
              <li>• NOT a flagship programme (it's a pilot)</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
          <p className="text-sm text-gray-900">
            <strong>Tagline:</strong> <span className="text-lg font-bold text-blue-600">"Move Daily. Stay Alive."</span>
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Owns the mental consistency angle, not physical intensity. 21 minutes of Zone 2 movement. Every day. Or you're out.
          </p>
        </div>
      </div>

      {/* Target Audience */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Users className="text-purple-600" size={24} />
          <h3 className="text-lg font-bold text-gray-900">Target Audience & Market Sizing</h3>
        </div>

        {/* Market Sizing Table */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">Market Sizing — Waikato Region</h4>
          <table className="w-full text-sm">
            <thead className="bg-white border-b border-gray-300">
              <tr>
                <th className="text-left py-2 px-3 font-bold text-gray-900">Market</th>
                <th className="text-left py-2 px-3 font-bold text-gray-900">Definition</th>
                <th className="text-right py-2 px-3 font-bold text-gray-900">Size</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-3 font-semibold text-gray-900">TAM</td>
                <td className="py-2 px-3 text-gray-700">Adults 18–65 in Waikato region</td>
                <td className="text-right py-2 px-3 font-semibold text-gray-900">~280,000</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-3 font-semibold text-gray-900">SAM</td>
                <td className="py-2 px-3 text-gray-700">Adults with wearable devices and digital literacy</td>
                <td className="text-right py-2 px-3 font-semibold text-gray-900">~70,000</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-gray-900">SOM</td>
                <td className="py-2 px-3 text-gray-700">Year 1 realistic capture (conservative–optimistic)</td>
                <td className="text-right py-2 px-3 font-semibold text-blue-600">150–400</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-600 mt-3">
            <strong>Note:</strong> TAM = Total Addressable Market; SAM = Serviceable Addressable Market; SOM = Serviceable Obtainable Market (Year 1 target)
          </p>
        </div>

        <div className="space-y-4">
          {targetAudience.map((segment, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-900">{segment.segment} Audience</h4>
                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded border border-purple-200">
                  {segment.size}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{segment.description}</p>
              <div className="text-xs text-gray-600">
                <strong>Acquisition:</strong> {segment.acquisition}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Value Proposition */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="text-yellow-600" size={24} />
          <h3 className="text-lg font-bold text-gray-900">Value Proposition — Why People Play</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {valueProposition.map((prop, idx) => (
            <div key={idx} className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-bold text-yellow-900 mb-1">{prop.driver}</h4>
              <p className="text-sm text-yellow-800 mb-2">{prop.explanation}</p>
              <p className="text-xs text-yellow-700 italic">{prop.evidence}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Critical insight:</strong> People do not play REAP for prizes. They play for loss aversion, public commitment,
            artificial tension, and belonging. Prizes are the marketing hook, not the retention driver. Retention is the primary KPI.
          </p>
        </div>
      </div>

      {/* Launch Strategy Timeline */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Rocket className="text-green-600" size={24} />
          <h3 className="text-lg font-bold text-gray-900">Launch Strategy & Timeline</h3>
        </div>
        <div className="space-y-6">
          {launchStrategy.map((phase, idx) => (
            <div key={idx} className="border-l-4 border-green-500 pl-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm font-bold text-green-600">{phase.date}</div>
                  <h4 className="text-lg font-bold text-gray-900">{phase.phase}</h4>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{phase.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold text-gray-700 mb-1">Objectives</div>
                  <ul className="space-y-1">
                    {phase.objectives.map((obj, i) => (
                      <li key={i} className="text-xs text-gray-600">• {obj}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-700 mb-1">KPIs</div>
                  <div className="flex flex-wrap gap-2">
                    {phase.kpis.map((kpi, i) => (
                      <span key={i} className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200">
                        {kpi}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Mechanics */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="text-blue-600" size={24} />
          <h3 className="text-lg font-bold text-gray-900">Viral Growth Mechanics</h3>
        </div>
        <div className="space-y-4">
          {growthMechanics.map((mech, idx) => (
            <div key={idx} className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-1">{mech.mechanic}</h4>
              <p className="text-sm text-blue-800 mb-2">{mech.description}</p>
              <div className="text-xs text-blue-700">
                <strong>Implementation:</strong> {mech.implementation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Opportunities */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="text-purple-600" size={24} />
          <h3 className="text-lg font-bold text-gray-900">Future Opportunities & Expansion</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {futureOpportunities.map((opp, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-900">{opp.opportunity}</h4>
                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded border border-purple-200">
                  {opp.timeline}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{opp.description}</p>
              <div className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200 inline-block">
                {opp.revenue}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Success Metrics — What We're Measuring</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Primary KPIs</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-sm font-semibold text-gray-900">Retention Rate</span>
                <span className="text-xs font-semibold text-green-700">Season-on-Season</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-semibold text-gray-900">Subscriber Growth</span>
                <span className="text-xs font-semibold text-blue-700">Monthly Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                <span className="text-sm font-semibold text-gray-900">Revenue</span>
                <span className="text-xs font-semibold text-purple-700">Net Monthly</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Secondary KPIs</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm font-semibold text-gray-900">Survival Rate</span>
                <span className="text-xs font-semibold text-gray-700">Average Days Survived</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm font-semibold text-gray-900">Social Sharing</span>
                <span className="text-xs font-semibold text-gray-700">Virality Coefficient</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm font-semibold text-gray-900">Behaviour Transfer</span>
                <span className="text-xs font-semibold text-gray-700">90-Day Post-Season Activity</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-sm text-yellow-900">
            <strong>The holy grail:</strong> If even 30% of Season 1 survivors continue daily Zone 2 movement for 90 days
            after the season ends, REAP has done something that most fitness products cannot demonstrate — lasting behaviour change.
          </p>
        </div>
      </div>

      {/* Data Opportunity */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Data Asset & Research Value</h3>
        <p className="text-sm text-gray-700 mb-4">
          Movement data across seasons = rich insight into when/why people fail (laziest day, weather correlation,
          seasonal drop-off). Strong board story about what Sport Waikato learns from running this.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="text-sm font-semibold text-green-700 mb-1">Research Value</div>
            <div className="text-xs text-gray-600">Publishable data on gamified behaviour change in NZ adults</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="text-sm font-semibold text-blue-700 mb-1">University Partnerships</div>
            <div className="text-xs text-gray-600">Academic credibility, grant funding, external validation</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <div className="text-sm font-semibold text-purple-700 mb-1">Health System Planning</div>
            <div className="text-xs text-gray-600">Real-world Zone 2 compliance data for health interventions</div>
          </div>
        </div>
      </div>
    </div>
  );
}