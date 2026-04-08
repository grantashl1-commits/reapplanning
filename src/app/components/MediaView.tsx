import { Radio, MessageSquare, AlertCircle, CheckCircle, XCircle, Newspaper } from 'lucide-react';

export function MediaView() {
  const coreMessages = [
    {
      title: 'The Health Case is Real',
      message: '"21 minutes of Zone 2 movement every day. That\'s the World Health Organisation\'s recommendation. REAP is a game designed to make you do it. Not because you want to. Because you paid $13 and you don\'t want to lose."',
      evidence: 'WHO physical activity guidelines. NZ inactivity statistics (1 in 4 adults insufficiently active). The health cost of inactivity in NZ (hundreds of millions annually, Ministry of Health).'
    },
    {
      title: 'Loss Aversion Works Where Rewards Don\'t',
      message: '"Decades of behavioural science research tells us that people are twice as motivated to avoid a loss as they are to gain an equivalent reward. Every other fitness app offers you a reward for showing up. REAP makes it cost you something if you don\'t. That\'s not a dark idea — that\'s the science."',
      evidence: 'Kahneman & Tversky\'s Prospect Theory (1979). The $13 as a commitment device, not a prize entry fee.'
    },
    {
      title: 'The Charitable Trust Revenue Story',
      message: '"Every dollar of subscription revenue goes back into Sport Waikato\'s community programmes. This is not a commercial product trying to make a profit off people\'s desire to be healthy. It is a charitable trust using a commercial model to fund its community mission. The game pays for the programmes."',
      evidence: 'Sport Waikato\'s community programme reach. The prize fund is separate from subscription revenue and is funded from Sport Waikato\'s operational budget.'
    },
    {
      title: 'The Research Value is Independent of Commercial Success',
      message: '"Even if Season 1 has 100 participants, we will have the first real-world dataset in New Zealand on whether a daily-elimination movement game produces behaviour change. That data is publishable, fundable, and applicable to the next intervention. The Living Lab value doesn\'t require commercial scale. It requires good data."',
      evidence: 'Living Lab mandate. Research design. University partnership (if any). The WHO 150-minute compliance data.'
    },
    {
      title: 'First Mover in an Uncontested Space',
      message: '"There is no competitor in New Zealand doing this. We are the first. The first organisation to build a brand in the gamified movement space in New Zealand has a meaningful advantage — recognition, community, data. REAP is not a feature. It\'s a product with a name, a personality, and a community. That\'s harder to replicate than the mechanic."',
      evidence: ''
    }
  ];

  const faqItems = [
    {
      question: 'Isn\'t this just a gambling product?',
      doNotSay: [
        '"No, definitely not" (dismissive and sounds defensive)',
        '"We\'ve taken legal advice" (sounds like you\'re hiding something)'
      ],
      doSay: '"No — and here\'s why. People pay $13 to play a survival game. That\'s what the $13 is for — 30 days of a daily movement challenge where something real happens if you don\'t move. The prize draws are a bonus attached to surviving, not the reason you play. If you\'re still alive when a draw happens, you\'re automatically in it — no extra cost, no separate entry. It\'s the same model as any promotional competition attached to a commercial product: you buy the product, the draw is a promotional benefit. The prize money never touches the subscription revenue — Sport Waikato funds the prizes separately from its own operational budget. We\'ve engaged legal counsel on this and we\'ll be seeking DIA guidance before launch. We\'re confident in the structure."'
    },
    {
      question: 'What about people with mental health issues getting an elimination notification at midnight?',
      doNotSay: [
        '"We\'ve thought about that" (inadequate and sounds dismissive)',
        '"The Terms have a health disclaimer" (legalistic and cold)'
      ],
      doSay: '"This is something we take seriously and have designed for explicitly. The elimination notification is not triumphant — it\'s honest and forward-looking. It signposts support resources. Our pre-participation screening is clear that REAP is not recommended for people in acute mental health distress. And we have a formal welfare protocol — a documented response plan — for any participant who contacts us in distress. We also believe, and the behavioural science supports, that a product that creates daily movement habits can have genuine positive effects on mental health. We\'re pursuing a formal partnership with a NZ mental health organisation to co-develop the welfare elements. This is a risk we own. We don\'t pretend it doesn\'t exist."'
    },
    {
      question: '\'THE KILLER MOVEMENT APP\' — is that an appropriate name for a publicly-funded charitable trust?',
      doNotSay: [
        '"It\'s just a name" (dismissive)',
        '"We considered other options" (suggests doubt)'
      ],
      doSay: '"It is exactly what we intended. We are trying to reach the 1.8 million New Zealanders who aren\'t doing enough physical activity. They don\'t need another gentle wellness app. They need something that makes daily movement feel consequential. The name signals that this is different. It\'s a game. The stakes are real. The humour is intentional. And every dollar it generates goes back into community sport. A publicly-funded organisation that plays it safe and reaches no-one isn\'t fulfilling its mandate. We are."'
    },
    {
      question: 'What happens if someone is eliminated because of illness?',
      doNotSay: [],
      doSay: '"Every participant gets two Redemption Days per season — pre-declared days where you\'re protected from elimination regardless of activity. These exist specifically for illness and genuine emergencies. If someone\'s device fails and they were genuinely active, there\'s a disputes process. And if someone faces extraordinary circumstances, there\'s a human at Sport Waikato who can review it. The game is designed to be consequential, not cruel."'
    },
    {
      question: 'Why should a publicly-funded charity be running a commercial subscription product?',
      doNotSay: [],
      doSay: '"Sport Waikato\'s mandate is to improve physical activity in the Waikato. REAP is a direct expression of that mandate — it creates daily movement, generates research data, and funds community programmes. The subscription model is a means, not an end. Sport Waikato has always sought diverse revenue sources to reduce dependence on government funding. A product that pays for itself and funds community programmes while generating behaviour change data is exactly what a well-governed charitable trust should be doing."'
    },
    {
      question: 'What if a celebrity gets eliminated on Day 1?',
      doNotSay: [],
      doSay: '"That would be the most honest possible advertisement for the game. This is real. The rules apply to everyone. Even if you\'re a [name], if you miss 21 minutes, you\'re eliminated. That\'s the point."'
    }
  ];

  const approvedPhrases = [
    'The only fitness app where something actually happens if you fail.',
    '21 minutes a day. Grounded in WHO evidence. Powered by loss aversion.',
    'Not a gym subscription. Not a wellness app. A survival game.',
    'Every dollar goes back to community sport in New Zealand.',
    'The Living Lab built it. The science explains it. You just have to move.',
    'If Duolingo can make language learning feel urgent, we can make movement feel essential.',
    'Being eliminated on Day 3 still means you moved every day for 3 days. For some people, that\'s already a record.',
    '"I got Reaped" — shareable, honest, and already NZ\'s newest fitness phrase.'
  ];

  const neverSay = [
    'Anything that connects the $13 fee to the prize: "your subscription includes a chance to win," "from $13/month, win up to $666"',
    '"Lucky draw" or "lottery" — use "spot prize draw" instead',
    '"We considered whether this was gambling" (implies doubt; instead, state the compliant structure confidently)',
    '"There\'s no random draw" or "prizes are performance-based" — this was the old framing; the draws are real and honest, and the compliance position is that they\'re subsidiary and promotional, not that chance has been eliminated',
    '"We know some people might find the aesthetic off-putting" (sounds apologetic)',
    'Any placeholder statistics (average survival rate, re-enrolment rates) before Season 1 data exists',
    'Any specific prize dollar amounts in headline/hero positions'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Media & Communications Guide</h2>
        <p className="text-gray-600">
          Media handling protocols, core messages, and response frameworks for staff
        </p>
      </div>

      {/* The Underlying Thread */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <Radio className="text-blue-600 flex-shrink-0 mt-1" size={28} />
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">The Underlying Thread</h3>
            <p className="text-xs text-gray-600 italic mb-4">
              Everything in this guide is built on one idea. It must be internalized before any media engagement:
            </p>
          </div>
        </div>
        <div className="bg-white border-2 border-blue-400 rounded-lg p-5">
          <p className="text-sm text-gray-900 italic leading-relaxed">
            <strong>Sport Waikato has the funding, the mandate, the research infrastructure, and the courage to try something that no-one else in New Zealand has tried.</strong> We are not apologising for being bold. We are explaining why boldness is the only serious response to a physical inactivity crisis that is costing this country hundreds of millions of dollars a year in preventable health costs. We went big. We went bold. We went different. That is the story.
          </p>
        </div>
        <div className="mt-4 p-3 bg-amber-50 border border-amber-300 rounded-lg">
          <p className="text-sm text-amber-900">
            <strong>Critical:</strong> If media smells hesitation or defensiveness, they will frame the story as a misstep. If they encounter confidence, clarity, and a compelling health narrative, they write a feature.
          </p>
        </div>
      </div>

      {/* Core Messages */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="text-green-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Core Messages — Build These Into Everything</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6 italic">
          These are the affirmative messages that should anchor every interview, every press release, every social post. They come directly from what the evidence shows REAP actually does.
        </p>
        <div className="space-y-4">
          {coreMessages.map((msg, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-2">{msg.title}</h4>
              <p className="text-sm text-gray-700 mb-3 italic">{msg.message}</p>
              {msg.evidence && (
                <div className="text-xs text-gray-600 bg-white border border-gray-200 rounded p-2">
                  <strong>Evidence to have ready:</strong> {msg.evidence}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ - Anticipated Hard Questions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="text-orange-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Anticipated Hard Questions — and How to Answer Them</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          These questions will come up. Be prepared with clear, confident responses that don\'t sound defensive.
        </p>
        <div className="space-y-6">
          {faqItems.map((faq, idx) => (
            <div key={idx} className="border-l-4 border-orange-400 bg-orange-50 p-4 rounded-r-lg">
              <h4 className="font-bold text-gray-900 mb-3">Q: {faq.question}</h4>

              {faq.doNotSay.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="text-red-600 flex-shrink-0" size={18} />
                    <span className="text-sm font-semibold text-red-900">Do NOT say:</span>
                  </div>
                  <ul className="space-y-1 ml-6">
                    {faq.doNotSay.map((item, i) => (
                      <li key={i} className="text-sm text-red-800">• {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-600 flex-shrink-0" size={18} />
                  <span className="text-sm font-semibold text-green-900">Do say:</span>
                </div>
                <p className="text-sm text-gray-700 ml-6 italic">{faq.doSay}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Press Release Template */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Newspaper className="text-blue-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Press Release Template</h3>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-5 font-mono text-xs space-y-3">
          <p className="font-bold">FOR IMMEDIATE RELEASE</p>
          <p className="font-bold">[Date]</p>

          <p className="font-bold text-base">Sport Waikato Launches REAP: New Zealand\'s First Daily-Movement Survival Game</p>

          <p className="italic">"Miss 21 minutes. Get eliminated." — Sport Waikato\'s Living Lab launches a bold new approach to physical inactivity.</p>

          <p><strong>HAMILTON, NZ</strong> — Sport Waikato today launched REAP — Survive the Reap — New Zealand\'s first daily-movement survival game, ahead of a public launch on 1 November 2026.</p>

          <p>REAP is a 30-day game with one rule: complete 21 minutes of Zone 2 cardiovascular movement every day. Miss a day, and you are eliminated. Permanently, for that season. Participants pay $13/month for a season entry. Active survivors are automatically eligible for spot prize draws at milestone points throughout the season — at no additional cost.</p>

          <p>Sport Waikato CEO [Leanne surname] said the concept emerged from the Living Lab\'s research into why conventional fitness programmes fail: "The problem isn\'t motivation. Most people want to be more active. The problem is daily follow-through. We used the same behavioural science that makes Duolingo streaks sticky — but applied it to movement, with real consequences for failure. It turns out that when you have something to lose, you show up."</p>

          <p>REAP\'s 21-minute daily minimum aligns directly with the World Health Organisation\'s 150-minute weekly moderate-activity recommendation. "We\'re not asking for a gym session. We\'re asking for a brisk walk. The data is clear that this level of activity, sustained daily, produces real health benefits. The game makes it happen."</p>

          <p>An October 2026 celebrity soft launch precedes the public Season 1 on November 1. The Friday the 13th event — coinciding with the season\'s Day 13 survival milestone — will be the first major elimination moment of Season 1.</p>

          <p>All subscription revenue goes directly to Sport Waikato\'s community programmes. "This is charitable trust innovation. The game funds the mission."</p>

          <p className="mt-4">
            <strong>For further information:</strong><br />
            [CEO name, title, email, phone]<br />
            REAP: [website URL]<br />
            Living Lab: [URL]
          </p>

          <p className="font-bold text-center">-ENDS-</p>
        </div>
      </div>

      {/* Approved Phrases */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="text-green-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Approved Key Phrases for Public Content</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Board-approved, evidence-backed phrases for use across all public-facing content:
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {approvedPhrases.map((phrase, idx) => (
            <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-gray-800 italic">"{phrase}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* What to Never Say */}
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <XCircle className="text-red-600" size={24} />
          <h3 className="text-xl font-bold text-red-900">What to NEVER Say in Public</h3>
        </div>
        <p className="text-sm text-red-800 mb-4 font-semibold">
          These phrases create legal risk, undermine credibility, or sound defensive. Avoid them completely:
        </p>
        <ul className="space-y-2">
          {neverSay.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-red-600 flex-shrink-0 mt-1">✕</span>
              <span className="text-sm text-red-900">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Staff Brief */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">The "Go Big, Go Bold" Staff Brief</h3>
        <p className="text-xs text-gray-600 italic mb-4">
          For internal use when briefing Sport Waikato staff who may be uncomfortable with REAP\'s aesthetic.
        </p>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            Sport Waikato has something that a VC-backed startup doesn\'t have: a genuine community mandate, public accountability, and the trust of funders who believe in evidence-based innovation. We also have money to take a calculated risk on something genuinely new.
          </p>
          <p>
            The organisations that change health behaviour at scale are not the ones that play it safe. They\'re the ones that understand human psychology well enough to design products that work with it, not against it. Loss aversion is real. The elimination mechanic is designed around real science. The dark aesthetic is intentional and evidence-based — it speaks to the audience we most need to reach.
          </p>
          <p className="font-semibold text-gray-900">
            If REAP achieves cultural traction — if "I got Reaped" becomes a phrase, if the Survival Board becomes a daily social ritual, if Friday 13th events become anticipated moments — then Sport Waikato has built something that genuinely cannot be bought. That is worth doing. That is worth the risk of a few uncomfortable trustee conversations.
          </p>
          <p className="font-bold text-orange-700 text-base">
            We went big. We went bold. We went different. That\'s what the Living Lab exists for.
          </p>
        </div>
      </div>

      {/* Document Footer */}
      <div className="text-xs text-gray-500 italic text-center border-t border-gray-200 pt-4">
        <p>Classification: Internal | Sport Waikato Living Lab | April 2026</p>
        <p>For CEO, Living Lab Lead, and anyone doing media</p>
      </div>
    </div>
  );
}
