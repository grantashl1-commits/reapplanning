import { FileText, AlertCircle, CheckCircle, XCircle, Users, Shield, Scale, HeartPulse, AlertOctagon, FileCheck, Handshake } from 'lucide-react';
import {
  refundScenarios, ambassadorContent, competitors, preLaunchActions,
  governanceStructure, decisionAuthority, pauseShutdownTriggers,
  legalSignOffDocs, reportingSchedule,
} from '../../data/reapData';

export function ResourcesView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Resources & Policies</h2>
        <p className="text-gray-600">
          Legal documents, consumer policies, and participant resources
        </p>
      </div>

      {/* Draft Notice */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm text-yellow-800">
              <strong>Draft Status:</strong> This refund policy requires legal sign-off by Shelley before publication. Review alongside REAP Terms of Participation and Season Rules to ensure consistency.
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Prepared: April 2026 | Sport Waikato / The Living Lab
            </p>
          </div>
        </div>
      </div>

      {/* Refund Policy */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="text-blue-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Refund Policy and Consumer Rights</h3>
        </div>

        {/* What You Are Paying For */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">What You Are Paying For</h4>
          <p className="text-sm text-gray-700 mb-3">
            Your <strong>$13.00 monthly subscription</strong> is consideration for <strong>access to the REAP platform and the right to participate in a season</strong> — not for the outcome of participation.
          </p>
          <p className="text-sm text-gray-700 mb-3">
            REAP is a game. The subscription fee purchases your entry into that game. It does not purchase survival, a prize, a guaranteed period of active participation, or any particular result. What you receive on payment is immediate and complete: access to the platform, a live season entry, daily activity tracking, the survival board, and all features of the product as described.
          </p>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Key Principle:</strong> You receive what you paid for at the moment you pay for it. Elimination does not undo that.
            </p>
          </div>
        </div>

        {/* Elimination Is a Game Outcome */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Elimination Is a Game Outcome — Not a Service Failure</h4>
          <p className="text-sm text-gray-700 mb-3">
            REAP is a survival game in which elimination is a core, designed, and expected feature — not a malfunction, error, or failure of service.
          </p>
          <p className="text-sm text-gray-700 mb-3">By registering and paying, you acknowledge and accept that:</p>
          <ul className="space-y-2 text-sm text-gray-700 mb-3">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 flex-shrink-0">•</span>
              <span>Elimination from a season may occur as early as Day 1</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 flex-shrink-0">•</span>
              <span>Elimination is automatic and irreversible once triggered by the system</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 flex-shrink-0">•</span>
              <span>Elimination results from your own activity log not meeting the daily threshold — it is not caused by any failure of Sport Waikato's platform or service delivery</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 flex-shrink-0">•</span>
              <span>The possibility of early elimination is a fundamental part of what REAP is, fully disclosed before payment is taken</span>
            </li>
          </ul>
          <p className="text-sm text-gray-700 mb-3">
            A participant eliminated on Day 3 has received the service they paid for. The platform functioned as described. The season entry was valid. The activity tracking was available. The elimination itself — however early — is the game operating correctly.
          </p>
          <p className="text-sm text-gray-700">
            Under the <strong>Consumer Guarantees Act 1993</strong>, a service fails to meet the consumer guarantee of fitness for purpose only where the service has not been delivered as described or reasonably expected. REAP's elimination mechanic is described in full on the product page, in the Season Rules, and in these Terms before any payment is made. There is no misdescription. There is no service failure.
          </p>
        </div>

        {/* No Refunds After Season Commencement */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">No Refunds After Season Commencement</h4>
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-3">
            <p className="text-sm text-red-900 font-bold">
              Refunds are not available once a season has commenced (from midnight on Day 1).
            </p>
          </div>
          <p className="text-sm text-gray-700 mb-3">This policy applies regardless of:</p>
          <ul className="space-y-2 text-sm text-gray-700 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-red-600 flex-shrink-0">•</span>
              <span>How many days you survived before being eliminated</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 flex-shrink-0">•</span>
              <span>Whether you were eliminated on Day 1, Day 3, or Day 29</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 flex-shrink-0">•</span>
              <span>Whether your elimination resulted from technical issues with a connected third-party device or application</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 flex-shrink-0">•</span>
              <span>Whether you chose not to participate after payment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 flex-shrink-0">•</span>
              <span>Whether you were unaware of the elimination rules at the time of payment (the rules are displayed in full before checkout)</span>
            </li>
          </ul>
          <div className="border-l-4 border-gray-300 pl-4">
            <p className="text-sm text-gray-700 mb-3">
              <strong>Why this policy applies:</strong>
            </p>
            <p className="text-sm text-gray-700 mb-3">
              The season commences at midnight on Day 1 and the game state becomes live at that moment. Sport Waikato's operational costs — server infrastructure, elimination processing, data management, prize fund commitment, and administrative overhead — are incurred from that point regardless of any individual participant's survival status. The marginal cost of operating the game is not reduced by the elimination of any individual participant.
            </p>
            <p className="text-sm text-gray-700">
              More fundamentally, a refund policy that allowed refunds upon elimination would make REAP unworkable as a game: it would remove the financial stake that is the product's primary behaviour-change mechanism. The $13 commitment device works because it is committed. A refundable stake is not a stake.
            </p>
          </div>
        </div>

        {/* Pre-Season Cancellations */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Pre-Season Cancellations</h4>
          <p className="text-sm text-gray-700 mb-3">
            If you have registered and paid but the season has not yet commenced (Day 1 has not started), you may request a full refund by contacting Sport Waikato at [contact email] before midnight on the night the season opens. Refunds in this window will be processed within 5–10 working days.
          </p>
          <p className="text-sm text-gray-700">
            Once Day 1 has commenced, no refunds are available under any circumstances.
          </p>
        </div>

        {/* Ongoing Subscription */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Ongoing Subscription — Your Cancellation Rights</h4>
          <p className="text-sm text-gray-700 mb-3">
            The $13.00 monthly subscription is a <strong>recurring charge</strong> processed via Stripe. It will continue to be charged monthly until you cancel.
          </p>
          <p className="text-sm text-gray-700 mb-3">
            You may cancel your subscription at any time through your Account Settings. Cancellation takes effect at the end of your current billing period. You will retain platform access (including the ability to view the survival board and register for the next season) until the end of that period.
          </p>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <p className="text-sm text-amber-900 mb-2"><strong>Important:</strong></p>
            <ul className="space-y-1 text-sm text-amber-900">
              <li>• Cancellation does not entitle you to a refund for the current billing period</li>
              <li>• Elimination from a season does not automatically cancel your subscription</li>
              <li>• You are responsible for cancelling your subscription if you do not wish to continue being billed between seasons</li>
              <li>• Eliminated participants who retain their subscription remain eligible to register for the next season</li>
            </ul>
          </div>
          <p className="text-sm text-gray-700 mt-3">
            If you believe you have been charged in error (for example, after a confirmed cancellation), contact Sport Waikato at [contact email] and we will investigate within 5 working days.
          </p>
        </div>

        {/* Device and Connectivity Failures */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Device and Connectivity Failures</h4>
          <p className="text-sm text-gray-700 mb-3">
            REAP accepts activity data from connected third-party applications and devices (Apple Health, Garmin Connect, Strava, Google Fit, and others). Sport Waikato does not operate, control, or provide technical support for these third-party services.
          </p>
          <p className="text-sm text-gray-700 mb-3">
            If your activity data was not synced to REAP before midnight due to a failure of a third-party device, application, or connectivity service:
          </p>
          <ul className="space-y-2 text-sm text-gray-700 mb-3">
            <li className="flex items-start gap-2">
              <span className="text-gray-500 flex-shrink-0">•</span>
              <span>This does not constitute a failure of the REAP platform</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-500 flex-shrink-0">•</span>
              <span>Sport Waikato is not liable for elimination resulting from third-party sync failures</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-500 flex-shrink-0">•</span>
              <span>No refund is available on this basis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-500 flex-shrink-0">•</span>
              <span>Manual activity submission is available as a fallback — it is your responsibility to use this if your device does not sync in time</span>
            </li>
          </ul>
          <p className="text-sm text-gray-700">
            You are responsible for ensuring your activity is recorded and synced before midnight each day. REAP strongly recommends manual activity submission as a backup if there is any uncertainty about device sync status.
          </p>
        </div>

        {/* Redemption Days */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Redemption Days</h4>
          <p className="text-sm text-gray-700">
            Each participant receives two Redemption Days per season, which must be declared in advance. A Redemption Day protects you from elimination on that day regardless of activity status. Redemption Days exist specifically to accommodate genuine unavoidable absences (illness, emergency, travel).
          </p>
          <p className="text-sm text-gray-700 mt-3">
            The existence of Redemption Days is further evidence that elimination is not arbitrary or beyond your control — you have a structured mechanism to manage the two most foreseeable circumstances where activity may be genuinely impossible. Use of Redemption Days is entirely at your discretion and your responsibility.
          </p>
        </div>

        {/* Fair Trading Act */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Fair Trading Act 1986 — No Misleading Representations</h4>
          <p className="text-sm text-gray-700 mb-3">
            Sport Waikato will not make any representation about REAP that is false, misleading, or deceptive under the Fair Trading Act 1986. Specifically:
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 flex-shrink-0">•</span>
              <span>All statistics displayed on the platform (survival rates, participant numbers, activity data) reflect real, verified data — not illustrative or placeholder figures</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 flex-shrink-0">•</span>
              <span>Prize values and frequency are accurately disclosed in the Season Rules before each season begins</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 flex-shrink-0">•</span>
              <span>The subscription price, billing frequency, and cancellation terms are displayed in full before checkout and are not misrepresented at any point in the registration flow</span>
            </li>
          </ul>
          <p className="text-sm text-gray-700 mt-3">
            If you believe any representation made to you during registration was inaccurate or misleading, contact Sport Waikato at [contact email].
          </p>
        </div>

        {/* Summary Table */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Summary</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left font-bold text-gray-900">Situation</th>
                  <th className="border border-gray-300 px-4 py-2 text-center font-bold text-gray-900">Refund Available?</th>
                </tr>
              </thead>
              <tbody>
                {refundScenarios.map((scenario, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      {scenario.situation}
                      {scenario.note && (
                        <span className="block text-xs text-gray-500 mt-1">({scenario.note})</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      {scenario.refundAvailable ? (
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="text-green-600" size={18} />
                          <span className="text-sm font-semibold text-green-600">Yes</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <XCircle className="text-red-600" size={18} />
                          <span className="text-sm font-semibold text-red-600">No</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Contact</h4>
          <p className="text-sm text-gray-700 mb-3">
            For all refund enquiries, subscription issues, or consumer law questions:
          </p>
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <p className="text-sm text-gray-900 font-bold">Sport Waikato / The Living Lab</p>
            <p className="text-sm text-gray-700">[Email address]</p>
            <p className="text-sm text-gray-700">[Physical address for Consumer Guarantees Act purposes]</p>
            <p className="text-sm text-gray-700 mt-2">We will respond to all enquiries within 5 working days.</p>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="text-xs text-gray-600 italic border-t border-gray-200 pt-4">
          <p className="mb-2">
            This policy is subject to your rights under the Consumer Guarantees Act 1993 and the Fair Trading Act 1986. Nothing in this policy limits any rights you have under New Zealand consumer law that cannot be excluded by contract. This policy does not affect your right to cancel your subscription at any time.
          </p>
          <p>
            This document requires legal sign-off by Shelley before publication. It should be reviewed alongside the REAP Terms of Participation and Season Rules to ensure consistency.
          </p>
        </div>
      </div>

      {/* Ambassador Agreement */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Users className="text-purple-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">REAP Ambassador Agreement</h3>
        </div>

        {/* Agreement Header */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 mb-2">
            This Agreement is entered into between:
          </p>
          <p className="text-sm text-gray-900 mb-2">
            <strong>Sport Waikato Incorporated</strong>, a charitable trust registered under the Charitable Trusts Act 1957 (NZCN: [insert]), and
          </p>
          <p className="text-sm text-gray-900 mb-3">
            <strong>[Ambassador Name]</strong> of [address] ("Ambassador")
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-bold text-gray-900">Date of Agreement:</span> [Date]
            </div>
            <div>
              <span className="font-bold text-gray-900">Season:</span> October 2026 (Celebrity Soft Launch)
            </div>
          </div>
        </div>

        {/* 1. Background */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">1. Background</h4>
          <p className="text-sm text-gray-700">
            Sport Waikato operates REAP — Survive the Reap — a 30-day daily movement survival game launching publicly on 1 November 2026. The Ambassador has been invited to participate in the October 2026 celebrity soft launch season (the "Season") as part of REAP's pre-launch awareness campaign.
          </p>
          <p className="text-sm text-gray-700 mt-2">
            The Ambassador's participation is gifted — no subscription fee is charged. The Ambassador's role is to participate genuinely in the Season and share their experience authentically with their audience.
          </p>
        </div>

        {/* 2. Ambassador Obligations */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">2. Ambassador Obligations</h4>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-900 font-semibold mb-2">2.1 Genuine participation</p>
              <p className="text-sm text-gray-700">
                The Ambassador agrees to make a genuine effort to complete 21 minutes of Zone 2 cardiovascular movement each day during the Season. The Ambassador acknowledges that elimination is a designed game outcome and that being eliminated (including on Day 1) does not constitute a failure of this Agreement.
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-900 font-semibold mb-2">2.2 Minimum content</p>
              <p className="text-sm text-gray-700 mb-3">
                The Ambassador agrees to create and publish a minimum of <strong>four pieces of content</strong> during October 2026 on their primary social media platform(s), comprising:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Post</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Timing</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ambassadorContent.map((content, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900">{content.post}</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-gray-700">{content.timing}</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-gray-700">{content.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-700 mt-2">
                Additional content is welcome and encouraged. Content may be posts, stories, reels, videos, or any format suited to the Ambassador's platform.
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-900 font-semibold mb-2">2.3 Authenticity</p>
              <p className="text-sm text-gray-700">
                Content must be the Ambassador's genuine voice and experience. Sport Waikato will not script, pre-approve (unless asked), or require specific language. Authentic accounts of struggling with the daily requirement, or being eliminated early, are entirely acceptable and are part of the product's intended narrative.
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-900 font-semibold mb-2">2.4 Disclosure</p>
              <p className="text-sm text-gray-700">
                All content must include an appropriate disclosure that the Ambassador's participation is gifted (e.g., #gifted, #ad, or similar in accordance with the Ambassador's local advertising standards obligations).
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-900 font-semibold mb-2">2.5 App access and data</p>
              <p className="text-sm text-gray-700">
                The Ambassador agrees to register on the REAP platform using their real date of birth (age verification), connect a compatible activity tracking device or app, and allow the REAP platform to access their daily activity data during the Season. Activity data will be handled in accordance with REAP's Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Restrictions */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">3. Restrictions</h4>
          <p className="text-sm text-gray-700 mb-3">The Ambassador agrees not to:</p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-sm text-red-900">
                <strong>3.1</strong> Describe REAP, its prize structure, or its subscription model as gambling, a lottery, a prize competition, or as a product that offers a chance to win money in exchange for payment. This language is legally inaccurate and is specifically prohibited.
              </p>
            </div>
            <div>
              <p className="text-sm text-red-900">
                <strong>3.2</strong> Disclose any prize amounts, prize values, or prize eligibility criteria without prior written approval from Sport Waikato.
              </p>
            </div>
            <div>
              <p className="text-sm text-red-900">
                <strong>3.3</strong> Make any false, misleading, or unsubstantiated claims about REAP's health benefits (e.g., specific weight loss or disease prevention claims).
              </p>
            </div>
            <div>
              <p className="text-sm text-red-900">
                <strong>3.4</strong> Disclose any confidential product information provided by Sport Waikato before the public launch date of 1 November 2026.
              </p>
            </div>
            <div>
              <p className="text-sm text-red-900">
                <strong>3.5</strong> Encourage their audience to use the product in a manner inconsistent with the Season Rules or Terms of Participation.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Sport Waikato's Obligations */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">4. Sport Waikato's Obligations</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-900 font-semibold mb-1">4.1 Gifted season pass</p>
              <p className="text-sm text-gray-700">
                Sport Waikato will provide the Ambassador with a gifted October 2026 season entry at no charge.
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-900 font-semibold mb-1">4.2 Product information</p>
              <p className="text-sm text-gray-700">
                Sport Waikato will provide the Ambassador with a clear briefing document covering how the product works, the daily requirement, Redemption Days, and prize eligibility before the Season starts.
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-900 font-semibold mb-1">4.3 Support</p>
              <p className="text-sm text-gray-700">
                A dedicated contact at Sport Waikato will be available to the Ambassador throughout October for any questions, technical issues, or disputes.
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-900 font-semibold mb-1">4.4 Content resharing</p>
              <p className="text-sm text-gray-700">
                Sport Waikato may reshare the Ambassador's public content (with appropriate credit) on REAP's own social media channels and website. Sport Waikato will not edit the Ambassador's content before resharing.
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-900 font-semibold mb-1">4.5 Future partnership</p>
              <p className="text-sm text-gray-700">
                If the soft launch partnership is successful, Sport Waikato may approach the Ambassador about a paid ambassador arrangement for Season 1 or subsequent seasons. This Agreement does not constitute a commitment to such an arrangement by either party.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Intellectual Property */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">5. Intellectual Property</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 flex-shrink-0">5.1</span>
              <span>Content created by the Ambassador remains the property of the Ambassador.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 flex-shrink-0">5.2</span>
              <span>Sport Waikato grants the Ambassador a limited licence to use the REAP name, logo, and brand assets in content created under this Agreement, in accordance with any brand guidelines provided.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 flex-shrink-0">5.3</span>
              <span>The Ambassador grants Sport Waikato a non-exclusive, royalty-free licence to reshare content created under this Agreement on Sport Waikato's owned channels, for the duration of the Season and for marketing purposes for a period of 12 months thereafter.</span>
            </li>
          </ul>
        </div>

        {/* 6. Controversy and Termination */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">6. Controversy and Termination</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-900 font-semibold mb-1">6.1 Ambassador conduct</p>
              <p className="text-sm text-gray-700 mb-2">Sport Waikato may terminate this Agreement immediately if the Ambassador:</p>
              <ul className="space-y-1 text-sm text-gray-700 ml-4">
                <li>• Is the subject of credible public allegations of serious misconduct (violence, fraud, dishonesty, or conduct materially inconsistent with Sport Waikato's values)</li>
                <li>• Makes public statements that are materially negative about REAP's primary purpose (daily movement and health), denigrating the product's value to participants beyond honest personal experience</li>
                <li>• Breaches any restriction in Clause 3</li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-gray-900 font-semibold mb-1">6.2 Termination effect</p>
              <p className="text-sm text-gray-700">
                On termination, Sport Waikato may remove the Ambassador's content from its own channels and cease association. The Ambassador may retain content they have published independently. No compensation is payable on termination for Ambassador conduct.
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-900 font-semibold mb-1">6.3 Ambassador's right to exit</p>
              <p className="text-sm text-gray-700">
                The Ambassador may withdraw from the Agreement at any time with 48 hours' notice. In this case, they are asked (but not required) to publish one final post acknowledging withdrawal and Season 2 registration. No penalty applies.
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-900 font-semibold mb-1">6.4 Product discontinuation</p>
              <p className="text-sm text-gray-700">
                If Sport Waikato discontinues REAP before the Season ends, this Agreement terminates automatically and the Ambassador has no further obligations.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Confidentiality */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">7. Confidentiality</h4>
          <p className="text-sm text-gray-700">
            The Ambassador acknowledges that product details, launch plans, legal documents, financial projections, and any other information marked as confidential and shared in the briefing process are confidential to Sport Waikato. This obligation survives termination and lasts for 12 months from the date of this Agreement.
          </p>
        </div>

        {/* 8. Liability */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">8. Liability</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-500 flex-shrink-0">8.1</span>
              <span>The Ambassador participates in REAP at their own physical risk. Sport Waikato is not liable for any physical injury or health consequence of the Ambassador's participation in the daily movement requirement.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-500 flex-shrink-0">8.2</span>
              <span>The Ambassador acknowledges having read the REAP Terms of Participation and Season Rules and accepts their terms.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-500 flex-shrink-0">8.3</span>
              <span>The Ambassador is responsible for their own content, including for compliance with applicable advertising standards and social media platform policies.</span>
            </li>
          </ul>
        </div>

        {/* 9. General */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">9. General</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-500 flex-shrink-0">9.1</span>
              <span><strong>Governing law:</strong> This Agreement is governed by the laws of New Zealand. Any dispute is subject to the exclusive jurisdiction of New Zealand courts.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-500 flex-shrink-0">9.2</span>
              <span><strong>Entire agreement:</strong> This Agreement constitutes the entire agreement between the parties regarding the soft launch participation and supersedes any prior discussion or correspondence.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-500 flex-shrink-0">9.3</span>
              <span><strong>Amendment:</strong> Any amendment must be in writing and signed by both parties.</span>
            </li>
          </ul>
        </div>

        {/* Signature Section */}
        <div className="border-t border-gray-300 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <p className="text-sm font-bold text-gray-900 mb-3">SIGNED by Sport Waikato Incorporated:</p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Name: ___________________________</p>
                <p>Title: ___________________________</p>
                <p>Date: ___________________________</p>
                <p>Signature: _______________________</p>
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <p className="text-sm font-bold text-gray-900 mb-3">SIGNED by Ambassador:</p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Name: ___________________________</p>
                <p>Date: ___________________________</p>
                <p>Signature: _______________________</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ambassador Briefing Document */}
        <div className="mt-8 border-t-2 border-purple-300 pt-6">
          <h4 className="font-bold text-gray-900 mb-3 text-lg">Ambassador Briefing Document</h4>
          <p className="text-xs text-gray-600 italic mb-4">To be provided to each Ambassador alongside the signed Agreement.</p>

          <div className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-gray-900 font-bold mb-2">What REAP is:</p>
              <p className="text-sm text-gray-700">
                REAP is a 30-day daily movement survival game. Every day you must complete 21 minutes of Zone 2 cardiovascular movement — that's moderate aerobic effort, achievable by walking briskly, cycling, swimming, or light running. Log it via your connected device (or manually if needed) before midnight. At 23:59 NZST each night, anyone who hasn't hit 21 minutes is eliminated. Permanently, for that season.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-900 font-bold mb-2">What Zone 2 means:</p>
              <p className="text-sm text-gray-700">
                The intensity where you can hold a conversation but it takes a bit of effort. 60–70% of max heart rate. Think: brisk walk, easy jog, steady bike. Not a sprint.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-gray-900 font-bold mb-2">Your Redemption Days:</p>
              <p className="text-sm text-gray-700">
                You have two Redemption Days per season. These must be declared in advance (in the app) on a day you know you won't be able to move. Use them wisely.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-gray-900 font-bold mb-2">What the prize is:</p>
              <p className="text-sm text-gray-700">
                There are performance prizes at milestone points during the season — awarded to the participants who have most demonstrably moved during each measurement period. You are eligible for these if you're still alive. You do not need to promote prizes in your content. Just talk about the game.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <p className="text-sm text-gray-900 font-bold mb-2">What we'd love from your content:</p>
              <p className="text-sm text-gray-700">
                Be honest. Be yourself. If you find it hard, say so. If you get eliminated, film your reaction. The best content from this launch will be authentic, not polished. The game is better when people see how real it is.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-gray-900 font-bold mb-2">What not to say:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Don't describe the subscription as a "prize entry fee" or "gambling" or "lottery"</li>
                <li>• Don't quote specific prize dollar amounts in public posts</li>
                <li>• Don't make health claims about weight loss or disease prevention</li>
                <li>• Don't mention anything in our legal or financial documents that was shared in confidence</li>
              </ul>
            </div>

            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-900 font-bold mb-2">Contact:</p>
              <p className="text-sm text-gray-700">[Name], [email], [phone] — available throughout October.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Strategy */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-green-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Competitive Risk Register & Market Differentiation Strategy</h3>
        </div>

        <div className="mb-4 text-xs text-gray-600 italic">
          Classification: Internal Strategy | Sport Waikato Living Lab | April 2026
        </div>

        {/* Core Competitive Insight */}
        <div className="mb-6 p-4 bg-gradient-to-br from-green-50 to-blue-50 border-l-4 border-green-500 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-3">The Core Competitive Insight</h4>
          <p className="text-sm text-gray-700 mb-3">
            REAP has no meaningful intellectual property protection on its game mechanic. Any organisation with sufficient resources can observe the model, replicate the elimination mechanic, build an app, and launch a competitor. This is a fact. The strategic question is not "how do we prevent this?" — we cannot. The question is: <strong>"what do we build that cannot be copied?"</strong>
          </p>
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-900 italic">
              "If REAP achieves cultural traction — if 'I got Reaped' becomes New Zealand fitness slang, if the Survival Board becomes a genuine daily social ritual, if Friday 13th events become anticipated fixtures — the brand becomes something larger than the product. That is hard to build and impossible to buy. It is worth designing for."
            </p>
          </div>
        </div>

        {/* Section 1: Current Competitive Landscape */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">1. Current Competitive Landscape</h4>

          <div className="mb-4">
            <p className="text-sm text-gray-900 font-semibold mb-2">Direct Competitors — None in NZ</p>
            <p className="text-sm text-gray-700">
              There is currently no direct NZ competitor offering a daily-movement survival elimination game. This is confirmed.
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-900 font-semibold mb-3">International Analogues (not direct competitors in NZ market)</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Product</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Country</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Model</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Status</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Threat Level</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((comp, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-3 py-2 font-semibold text-gray-900">{comp.product}</td>
                      <td className="border border-gray-300 px-3 py-2 text-gray-700">{comp.country}</td>
                      <td className="border border-gray-300 px-3 py-2 text-gray-700">{comp.model}</td>
                      <td className="border border-gray-300 px-3 py-2 text-gray-700">{comp.status}</td>
                      <td className="border border-gray-300 px-3 py-2 text-gray-700">{comp.threat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-gray-900 font-bold mb-2">Platform Risk — The Highest Competitive Threat</p>
            <p className="text-sm text-gray-700 mb-2">
              The most significant competitive risk is not a startup or another RST. It is <strong>Apple, Google, or Garmin</strong> introducing an elimination-based daily movement feature natively into their fitness ecosystem.
            </p>
            <p className="text-sm text-gray-700 mb-2">If this happens before REAP achieves meaningful traction:</p>
            <ul className="space-y-1 text-sm text-gray-700 ml-4">
              <li>• Any participant who already uses Apple Health, Google Fit, or Garmin Connect has zero friction to switch</li>
              <li>• The platform player has infinite distribution, zero marketing cost, and existing data access</li>
              <li>• REAP's subscription becomes redundant for that audience</li>
            </ul>
            <p className="text-sm text-gray-900 font-semibold mt-2">
              Assessment: This risk is real but not imminent. As of April 2026, none of these platforms have announced or filed patents on elimination-based movement mechanics. The window to establish brand and community before this risk materialises is real.
            </p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-gray-900 font-bold mb-2">RST Network Risk</p>
            <p className="text-sm text-gray-700 mb-2">
              Another Regional Sport Trust or national sport organisation could replicate the model with their own brand and community. This is a lower threat in the short term (no other RST is currently doing this) but a meaningful risk if REAP Season 1 demonstrates proof of concept.
            </p>
            <p className="text-sm text-gray-900 font-semibold">
              Mitigation: Move to secure RST partnership agreements (licensing or distribution) before Season 2. If other RSTs are running REAP under licence rather than building their own version, the model is protected through partnership rather than IP.
            </p>
          </div>
        </div>

        {/* Section 2: What Cannot Be Copied */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">2. What Cannot Be Copied</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-900 font-bold mb-2">The Brand</p>
              <p className="text-sm text-gray-700">
                "I got Reaped" is a phrase that, if it enters popular use, belongs to REAP in perpetuity. No competitor can retroactively own that phrase. The Survival Board, Friday 13th events, the "21 minutes" specificity, the grim reaper aesthetic — these are being built into NZ culture deliberately and early. Cultural properties cannot be cloned. They can only be built.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-900 font-bold mb-2">The Data</p>
              <p className="text-sm text-gray-700">
                After one season, REAP has the only real-world dataset on daily-movement elimination game behaviour in New Zealand. After two seasons, it has longitudinal data. After four, it has genuine research infrastructure. This data is not replicable from scratch — a competitor starting two years later starts two years behind.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-900 font-bold mb-2">The Charitable Trust Context</p>
              <p className="text-sm text-gray-700">
                A global fitness app, a VC-backed startup, and a government agency all have their own credibility challenges. REAP's position as a product of a publicly accountable charitable trust with a genuine health mandate, Living Lab research rigour, and Sport NZ network connections is a differentiation that a commercial competitor cannot manufacture.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-900 font-bold mb-2">The Community</p>
              <p className="text-sm text-gray-700">
                The Friday 13th event, the Survival Board as a social artefact, corporate leagues, RST community groups — these are social structures built around REAP. A late-arriving competitor gets the mechanic but not the community. Communities switch products only when the new product is dramatically better.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-900 font-bold mb-2">First-Mover Cultural Authority</p>
              <p className="text-sm text-gray-700">
                REAP will be the organisation that introduced the elimination movement game to New Zealand. That provenance matters. "The original" is a genuine brand position even when imitators exist. Being first is a durable asset.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Risk Scenarios */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">3. Risk Scenarios and Responses</h4>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
              <p className="text-sm text-gray-900 font-bold mb-2">Scenario A: A NZ Startup Copies the Model (Year 2–3)</p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Trigger:</strong> A well-funded NZ startup launches a comparable daily-movement elimination game after REAP's Season 1 attracts media attention.
              </p>
              <p className="text-sm text-gray-700 mb-1"><strong>Response strategy:</strong></p>
              <ol className="space-y-1 text-sm text-gray-700 ml-4">
                <li>1. Don't panic. A competitor launching validates the market. Respond with acceleration, not defensiveness.</li>
                <li>2. Double down on community. The startup has the mechanic. REAP has the community, the Survival Board history, the Friday 13th events, the RST network.</li>
                <li>3. Lock in RST partnerships. If other RSTs are REAP-licensed partners before the competitor launches, the national distribution channel is closed to them.</li>
                <li>4. Research positioning. Publish Living Lab Season 1 findings. REAP becomes the evidence-based product; the competitor is the imitation.</li>
                <li>5. Consider formal partnership. If the competitor is well-funded, explore whether a licence or partnership serves REAP's mission better than a fight.</li>
              </ol>
            </div>

            <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
              <p className="text-sm text-gray-900 font-bold mb-2">Scenario B: A Global Platform Introduces an Elimination Feature (Year 2–5)</p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Trigger:</strong> Apple, Garmin, or Google announces an elimination-based daily movement feature in their native fitness app.
              </p>
              <p className="text-sm text-gray-700 mb-1"><strong>Response strategy:</strong></p>
              <ol className="space-y-1 text-sm text-gray-700 ml-4">
                <li>1. Lean into the differentiation that platforms cannot replicate: community, charitable mandate, Living Lab research, NZ-specific identity, human support, the social layer.</li>
                <li>2. A platform feature is a product addition. REAP is a culture. A native step challenge in Apple Fitness+ does not have elimination cards, a Survival Board, a Friday 13th event, or a brand identity.</li>
                <li>3. Target the audience platforms miss: participants who want community and accountability, not just another fitness tracker metric.</li>
                <li>4. Explore integration. A native Apple Health / Garmin integration that feeds into REAP (rather than competing with it) turns the platform risk into a distribution advantage.</li>
              </ol>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
              <p className="text-sm text-gray-900 font-bold mb-2">Scenario C: Another RST Launches a Similar Product</p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Trigger:</strong> A well-resourced RST (e.g., Auckland, Canterbury) observes Season 1 and launches their own version.
              </p>
              <p className="text-sm text-gray-700 mb-1"><strong>Response strategy:</strong></p>
              <ol className="space-y-1 text-sm text-gray-700 ml-4">
                <li>1. Offer the RST a licence before they build. The Living Lab licensing model should be a standing offer to RSTs from before Season 2.</li>
                <li>2. Move first on national expansion. A national REAP season (multi-regional, with RST community boards) announced before any competitor RST launches changes the dynamic entirely.</li>
                <li>3. Protect the brand. "Survive the Reap" should be a registered trade mark. File before Season 1. The mechanic cannot be protected. The name can.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Section 4: What to Do Now */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">4. What to Do Now (Before Season 1)</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Action</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Rationale</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Timeline</th>
                </tr>
              </thead>
              <tbody>
                {preLaunchActions.map((action, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-3 py-2 text-gray-900 font-semibold">{action.action}</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-700">{action.rationale}</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-700">{action.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 5: The Go Big, Go Bold Mandate */}
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-300 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-3 text-lg">5. The Go Big, Go Bold Mandate</h4>
          <p className="text-sm text-gray-700 mb-4">
            The underlying strategic thread of REAP is stated plainly in the internal analysis:
          </p>
          <div className="bg-white border-2 border-orange-400 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-900 italic font-semibold">
              "If REAP achieves cultural traction — if 'I got Reaped' becomes New Zealand fitness slang, if the Survival Board becomes a genuine daily social ritual, if Friday 13th events become anticipated fixtures — the brand becomes something larger than the product. That is hard to build and impossible to buy. It is worth designing for."
            </p>
          </div>
          <p className="text-sm text-gray-900 font-bold mb-2">
            This is not a nice idea. It is the competitive strategy. <span className="text-orange-600">The moat is the culture, not the code.</span>
          </p>
          <p className="text-sm text-gray-700 mb-2">This means:</p>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• The dark aesthetic is not a risk to be managed. It is the brand. Protect it.</li>
            <li>• "THE KILLER MOVEMENT APP" is not hyperbole. It is a claim worth defending with behaviour.</li>
            <li>• Every season should do something culturally memorable that a competitor cannot easily replicate.</li>
            <li>• Every Friday 13th event should be a genuine moment that people talk about.</li>
            <li>• Every elimination card should be something people actually share.</li>
          </ul>
          <p className="text-sm text-gray-700 mt-4">
            Sport Waikato has the funding, the mandate, the Living Lab infrastructure, and the seven-month runway to build something that genuinely matters. The organisations that change culture are the ones that believe in what they're doing without apology. That is the competitive advantage no amount of venture capital can manufacture.
          </p>
        </div>

        {/* Document Footer */}
        <div className="mt-6 text-xs text-gray-600 italic">
          <p>Document name: "REAP — Competitive Risk Register and Market Differentiation Strategy"</p>
          <p>Prepared: April 2026 | Review: Before Season 2 planning</p>
        </div>
      </div>
      {/* Governance Framework Section */}
      <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Scale className="size-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl">Governance Framework</h2>
            <p className="text-gray-600">Roles, responsibilities, decision-making authority, and accountability structures</p>
          </div>
        </div>

        {/* Governance Structure */}
        <div className="mb-8">
          <h3 className="text-lg mb-4">Governance Structure</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-3 bg-gray-50">Role</th>
                  <th className="text-left p-3 bg-gray-50">Authority</th>
                  <th className="text-left p-3 bg-gray-50">Reporting</th>
                </tr>
              </thead>
              <tbody>
                {governanceStructure.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-3">{item.role}</td>
                    <td className="p-3 text-sm text-gray-700">{item.authority}</td>
                    <td className="p-3 text-sm text-gray-700">{item.reporting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Decision Authority Matrix */}
        <div className="mb-8">
          <h3 className="text-lg mb-4">Decision Authority Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-3 bg-gray-50">Decision</th>
                  <th className="text-left p-3 bg-gray-50">Developer</th>
                  <th className="text-left p-3 bg-gray-50">LL Lead</th>
                  <th className="text-left p-3 bg-gray-50">CEO</th>
                  <th className="text-left p-3 bg-gray-50">Board</th>
                </tr>
              </thead>
              <tbody>
                {decisionAuthority.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-3">{item.decision}</td>
                    <td className="p-3 text-sm text-gray-700">{item.developer}</td>
                    <td className="p-3 text-sm text-gray-700">{item.llLead}</td>
                    <td className="p-3 text-sm text-gray-700">{item.ceo}</td>
                    <td className="p-3 text-sm text-gray-700">{item.board}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Spot Prize Draw Structure — Gambling Act Compliance */}
        <div className="mb-8">
          <h3 className="text-lg mb-4">Spot Prize Draw Structure — Gambling Act 2003 Compliance</h3>

          {/* Critical Position Statement */}
          <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">Core Legal Position</h4>
            <p className="text-sm text-gray-900 mb-2">
              <strong>The product is "Survive the Reap" — the prize draws are promotional benefits subsidiary to the game.</strong>
            </p>
            <p className="text-sm text-gray-700 mb-2">
              Participants pay $13/month for a 30-day daily-movement survival game (activity tracking, Survival Board, community features, elimination mechanic). At seven milestone points during the season, Sport Waikato runs spot prize draws among all active, confirmed-paid survivors. Entry is automatic — no separate payment, no separate form, no additional action required.
            </p>
            <p className="text-sm text-gray-700 font-semibold">
              A participant does not pay $13 in order to be entered in a draw. They pay $13 to play a game, and surviving the game makes them eligible for a draw that they did not pay separately to enter.
            </p>
          </div>

          {/* Seven Spot Prize Draws */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">The Seven Spot Prize Draws</h4>
            <p className="text-sm text-gray-700 mb-3">
              REAP will hold <strong>seven spot prize draws per 30-day season</strong>, each awarding <strong>$666 NZD</strong>. Total prize pool per season: <strong>$4,662</strong>. Total annual prize commitment (4 seasons): <strong>$18,648</strong>.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Draw</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Trigger Point</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Eligibility</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Prize Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-3 py-2">Draw 1</td>
                    <td className="border border-gray-300 px-3 py-2">Day 7 — Week 1 Survivor</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-700">All confirmed-paid survivors at midnight Day 7</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">$666</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">Draw 2</td>
                    <td className="border border-gray-300 px-3 py-2">Day 13 — Friday the 13th</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-700">All confirmed-paid survivors at midnight Day 13</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">$666</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-3 py-2">Draw 3</td>
                    <td className="border border-gray-300 px-3 py-2">Day 14 — Fortnight Survivor</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-700">All confirmed-paid survivors at midnight Day 14</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">$666</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">Draw 4</td>
                    <td className="border border-gray-300 px-3 py-2">Day 21 — Three Week Warrior</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-700">All confirmed-paid survivors at midnight Day 21</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">$666</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-3 py-2">Draw 5</td>
                    <td className="border border-gray-300 px-3 py-2">Day 24 — Redemption Day</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-700">All confirmed-paid survivors who are Redemption Day eligible</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">$666</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">Draw 6</td>
                    <td className="border border-gray-300 px-3 py-2">Day 28 — Final Week</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-700">All confirmed-paid survivors at midnight Day 28</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">$666</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-3 py-2">Draw 7</td>
                    <td className="border border-gray-300 px-3 py-2">Day 30 — Season Finale</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-700">All confirmed-paid survivors at midnight Day 30</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">$666</td>
                  </tr>
                  <tr className="bg-purple-50 font-semibold">
                    <td colSpan={3} className="border border-gray-300 px-3 py-2 text-right">Total Prize Pool per Season:</td>
                    <td className="border border-gray-300 px-3 py-2">$4,662</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              <strong>Key Rule:</strong> Eligibility is restricted to active, confirmed-paid survivors at the draw trigger point. A participant who has been eliminated cannot be selected, regardless of subscription status. This is enforced at the database level.
            </p>
          </div>

          {/* Three-Layer Compliance Architecture */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">The Compliance Architecture: Three Layers</h4>

            <div className="space-y-3">
              {/* Layer 1 */}
              <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
                <h5 className="font-bold text-blue-900 mb-2">Layer 1 — The Consideration Test (Primary Defence)</h5>
                <p className="text-sm text-gray-700 mb-2">
                  The Gambling Act requires that the element of chance be connected to the consideration paid. The consideration test asks: <em>why did the participant pay?</em>
                </p>
                <p className="text-sm text-gray-900 font-semibold mb-2">
                  For REAP, the answer is unambiguous: participants pay to play a survival game. Prize draw eligibility is an automatic consequence of surviving, not something participants pay for.
                </p>
                <div className="bg-white border border-blue-200 p-3 rounded text-sm italic text-gray-800 mt-2">
                  "Participation in REAP prize draws is automatic for all active, confirmed-paid survivors at each draw trigger point. No additional payment or entry is required for prize draw eligibility. REAP prize draws are a promotional feature of the Survive the Reap game. They are not the primary purpose of the product and are not the primary reason participants subscribe."
                </div>
              </div>

              {/* Layer 2 */}
              <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
                <h5 className="font-bold text-green-900 mb-2">Layer 2 — The Subsidiarity Test (Supporting Defence)</h5>
                <p className="text-sm text-gray-700 mb-2">
                  The DIA's published guidance on promotional competitions identifies the key question as whether the prize draw is <em>subsidiary</em> to a genuine primary activity.
                </p>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Primary marketing leads with the game mechanic, not the prize</li>
                  <li>Prize values do not appear in primary/hero marketing positions</li>
                  <li>The primary motivation is loss aversion, not prize acquisition</li>
                  <li>REAP is a charitable trust health initiative</li>
                </ul>
              </div>

              {/* Layer 3 */}
              <div className="border border-purple-200 bg-purple-50 p-4 rounded-lg">
                <h5 className="font-bold text-purple-900 mb-2">Layer 3 — Prize Funding Independence (Supporting Defence)</h5>
                <p className="text-sm text-gray-700 mb-2">
                  Prizes are funded entirely from <strong>Sport Waikato's general operational funds</strong>, separate from participant subscription revenue at the accounting level. No portion of any participant's $13 fee is allocated to, pooled for, or used to fund any prize.
                </p>
                <div className="bg-white border border-purple-200 p-3 rounded text-sm italic text-gray-800 mt-2">
                  "Prizes offered in connection with REAP seasons are funded entirely from Sport Waikato Incorporated's general operational funds. These funds are maintained separately from participant subscription revenue. No portion of any participant's subscription fee is used to fund, pool, or contribute to any prize."
                </div>
              </div>
            </div>
          </div>

          {/* Draw Governance Procedures */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Draw Governance Procedures</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold mb-3 text-purple-600">Before Each Draw</h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Eligible participant pool identified from database (active survivors, confirmed payment)</li>
                  <li>• Draw trigger point published in Season Rules before season begins</li>
                  <li>• No discretion, no amendment to eligibility criteria</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold mb-3 text-purple-600">At Each Draw</h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Winner selected at random from eligible pool</li>
                  <li>• Result recorded: timestamp, eligible pool size, winner identifier, prize value</li>
                  <li>• Record stored in prize_awards table in database</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold mb-3 text-purple-600">After Each Draw</h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Winner notified privately</li>
                  <li>• Prize not paid until winner provides proof of identity and age (18+)</li>
                  <li>• Draw recorded in end-of-season report to board</li>
                  <li>• Independent third party may witness at least one draw per season (recommended)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why $666 and Why Seven Draws */}
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Why $666 and Why Seven Draws?</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>1. Proportionality.</strong> At $666 per draw ($4,662 per season), the prize pool is consistent with promotional competition prize levels historically treated as outside the Gambling Act's regulated categories.</p>
              <p><strong>2. Brand alignment.</strong> The $666 figure is on-brand for REAP's survival-game aesthetic — immediately recognisable and socially shareable without escalating the legal risk profile.</p>
              <p><strong>3. Engagement retention.</strong> Seven milestone draws maintain participant engagement across the full season, reducing elimination-driven subscriber churn.</p>
            </div>
          </div>

          {/* Language Framework */}
          <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-lg">
            <h4 className="font-semibold text-amber-900 mb-2">Critical Language Requirements</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-bold text-red-700 mb-2">NEVER SAY:</p>
                <ul className="list-disc ml-5 text-gray-700 space-y-1">
                  <li>"Your $13 entry includes a chance to win"</li>
                  <li>"Win up to $666 from $13/month"</li>
                  <li>"Survive the month to win"</li>
                  <li>"Lucky draw" or "Lottery"</li>
                  <li>Any prize amount in headlines or CTAs</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-green-700 mb-2">CORRECT FRAMING:</p>
                <ul className="list-disc ml-5 text-gray-700 space-y-1">
                  <li>"Active survivors are automatically eligible for spot prize draws"</li>
                  <li>"No additional payment required"</li>
                  <li>"Draws are a promotional feature of the game"</li>
                  <li>"Prize amounts in Season Rules and Terms only"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Gambling Act Framing Strategy */}
        <div className="mb-8">
          <h3 className="text-lg mb-4">Gambling Act Framing Strategy — Internal Guidance</h3>
          <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg mb-4">
            <p className="text-sm text-red-900 font-bold">⚠️ INTERNAL STRATEGY DOCUMENT — DO NOT PUBLISH PARTICIPANT-FACING</p>
            <p className="text-sm text-red-800 mt-1">This section provides internal guidance on how to position the prize structure outside the Gambling Act 2003. This is not legal advice and does not constitute legal sign-off.</p>
          </div>

          {/* The Three-Element Test */}
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">The Three-Element Test</h4>
            <p className="text-sm text-gray-700 mb-2">
              The Gambling Act 2003 defines gambling as requiring <strong>all three</strong> of these simultaneously:
            </p>
            <div className="grid md:grid-cols-3 gap-3 mb-3">
              <div className="bg-white border border-blue-200 p-3 rounded text-center">
                <p className="text-sm font-semibold text-gray-900">1. Payment of consideration</p>
              </div>
              <div className="bg-white border border-blue-200 p-3 rounded text-center">
                <p className="text-sm font-semibold text-gray-900">2. An element of chance</p>
              </div>
              <div className="bg-white border border-blue-200 p-3 rounded text-center">
                <p className="text-sm font-semibold text-gray-900">3. A prize</p>
              </div>
            </div>
            <p className="text-sm text-gray-900 font-bold">
              REAP's strategy: establish that the $13 payment is not made in consideration for the element of chance. This is the consideration test, and it is the correct legal foundation for REAP.
            </p>
          </div>

          {/* Why Performance Award Model Doesn't Work */}
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
            <h4 className="font-bold text-yellow-900 mb-2">Why the Performance Award Model Doesn't Work for REAP</h4>
            <p className="text-sm text-gray-700 mb-2">An earlier version proposed awarding prizes based on performance criteria. This approach was abandoned for structural reasons:</p>
            <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-1">
              <li><strong>REAP's eligibility is binary.</strong> You either logged 21+ minutes or you were eliminated. No performance gradient among survivors.</li>
              <li><strong>Every survivor has an identical streak.</strong> At Day 13, every survivor has survived 13 consecutive days. The streak criterion doesn't differentiate.</li>
              <li><strong>REAP doesn't accumulate total minutes.</strong> The app tracks whether the daily threshold was met, not how far above the threshold participants performed.</li>
            </ol>
            <p className="text-sm text-gray-900 font-semibold mt-2">
              The honest structure is: you're alive, you're in the draw, a winner is chosen randomly. That structure is lawful because it is promotional and subsidiary — not the reason participants pay.
            </p>
          </div>

          {/* Comparable Models */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Comparable Promotional Competition Models</h4>
            <p className="text-sm text-gray-700 mb-2">REAP's spot prize structure is identical to recognised promotional competitions across New Zealand:</p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-green-50 border border-green-200 p-3 rounded">
                <p className="text-sm text-gray-700">☕ A customer buys a coffee; being a Gold loyalty member enters them in a monthly draw</p>
              </div>
              <div className="bg-green-50 border border-green-200 p-3 rounded">
                <p className="text-sm text-gray-700">⛽ A petrol station customer pays for fuel; their receipt contains an instant-win competition</p>
              </div>
              <div className="bg-green-50 border border-green-200 p-3 rounded">
                <p className="text-sm text-gray-700">🛒 A retailer runs "spend $50 and enter to win" — customers pay for goods, the draw is promotional</p>
              </div>
              <div className="bg-green-50 border border-green-200 p-3 rounded">
                <p className="text-sm text-gray-700">🍔 McDonald's Monopoly — customers buy a meal; the prize game is attached as a promotional benefit</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-2 italic">
              In every case: the payment is for a genuine product or service. The prize draw is incidental, promotional, and subsidiary.
            </p>
          </div>

          {/* Subsidiarity in Practice */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Subsidiarity in Practice: What the Product Must Demonstrate</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Feature</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Status</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Why it matters</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-3 py-2">Game mechanic operates independently of draws</td>
                    <td className="border border-gray-300 px-3 py-2 text-green-700 font-semibold">✓ Yes</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-700">Shows the game is a real product</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">Primary marketing leads with game, not prize</td>
                    <td className="border border-gray-300 px-3 py-2 text-green-700 font-semibold">✓ Yes</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-700">Shows draw is subsidiary</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-3 py-2">Prize dollar amounts absent from hero/CTA positions</td>
                    <td className="border border-gray-300 px-3 py-2 text-green-700 font-semibold">✓ Yes</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-700">Shows product is primary pitch</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">Participants' primary motivation is loss aversion</td>
                    <td className="border border-gray-300 px-3 py-2 text-green-700 font-semibold">✓ Yes</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-700">Shows draw is incidental</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-3 py-2">Sport Waikato's charitable mandate is health</td>
                    <td className="border border-gray-300 px-3 py-2 text-green-700 font-semibold">✓ Yes</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-700">Shows overall purpose</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pre-Launch Compliance Checklist */}
          <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Pre-Launch Compliance Checklist</h4>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">Terms confirm $13 is for game access, not prize entry</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">Terms confirm draws are automatic and free</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">Terms confirm draws are promotional/subsidiary</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">Prize funding separation statement in Terms</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">Prize amounts absent from headlines/hero/CTAs</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">No copy links subscription fee to prize eligibility</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">Admin backend logs timestamp and pool for each draw</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">DIA informal enquiry lodged (target: 15 May 2026)</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">Shelley legal sign-off on Terms (target: Sept 2026)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Triggers for Pause or Shutdown */}
        <div className="mb-8">
          <h3 className="text-lg mb-4">Triggers for Pause or Shutdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-3 bg-gray-50">Tier</th>
                  <th className="text-left p-3 bg-gray-50">Trigger</th>
                  <th className="text-left p-3 bg-gray-50">Action Required</th>
                </tr>
              </thead>
              <tbody>
                {pauseShutdownTriggers.map((item, index) => (
                  <tr key={index} className={`border-b border-gray-200 ${item.tier === 'Tier 1' ? 'bg-red-50' : 'bg-yellow-50'}`}>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${item.tier === 'Tier 1' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {item.tier}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700">{item.trigger}</td>
                    <td className="p-3 text-sm text-gray-700">{item.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700"><strong>Season Termination:</strong> Ending the current season early (before Day 30) requires board resolution. Appropriate when Tier 1 trigger cannot be resolved within 72 hours, legal advice indicates unacceptable liability, or technical failure cannot be remediated within 48 hours. On termination: notify all active participants, pause subscription billing, make refund decision with legal advice (default: pro-rata refund for remaining days), and execute communication plan.</p>
          </div>
        </div>

        {/* Legal Sign-Off Requirements */}
        <div className="mb-8">
          <h3 className="text-lg mb-4">Legal Sign-Off Requirements</h3>
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm"><strong>Critical Rule:</strong> Nothing publishes without Shelley\'s written approval. This is a standing rule, not a case-by-case decision.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-3 bg-gray-50">Document</th>
                  <th className="text-left p-3 bg-gray-50">Required Before</th>
                  <th className="text-left p-3 bg-gray-50">Shelley Sign-Off</th>
                </tr>
              </thead>
              <tbody>
                {legalSignOffDocs.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-3">{item.document}</td>
                    <td className="p-3 text-sm text-gray-700">{item.requiredBefore}</td>
                    <td className="p-3 text-sm text-gray-700">{item.shelleySignOff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reporting Schedule */}
        <div>
          <h3 className="text-lg mb-4">Reporting Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-3 bg-gray-50">Report</th>
                  <th className="text-left p-3 bg-gray-50">Frequency</th>
                  <th className="text-left p-3 bg-gray-50">Author</th>
                  <th className="text-left p-3 bg-gray-50">Recipient</th>
                </tr>
              </thead>
              <tbody>
                {reportingSchedule.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-3">{item.report}</td>
                    <td className="p-3 text-sm text-gray-700">{item.frequency}</td>
                    <td className="p-3 text-sm text-gray-700">{item.author}</td>
                    <td className="p-3 text-sm text-gray-700">{item.recipient}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Product Harm & Welfare Protocol */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <HeartPulse size={24} className="text-purple-600" />
          <h3 className="text-xl font-bold text-gray-900">Product Harm & Welfare Protocol</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Sport Waikato's documented response protocol for participant welfare incidents, physical harm, and incorrect eliminations. This protocol demonstrates that welfare risks were considered, documented, and managed with appropriate care.
        </p>

        {/* Purpose */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-2">Purpose</h4>
          <p className="text-sm text-gray-700">
            This protocol exists because Sport Waikato has accepted a responsibility: there will be participants who are eliminated during periods of vulnerability. The probability is not zero. This document is our prepared response for when it happens. The absence of a protocol is itself an ethical and legal liability.
          </p>
        </div>

        {/* Categories of Harm */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Categories of Harm</h4>
          <div className="space-y-4">
            {/* Psychological Harm */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h5 className="font-bold text-purple-900 mb-2">1. Psychological Harm</h5>
              <p className="text-sm text-gray-700 mb-3">
                A participant receives an elimination notification during or immediately before a mental health crisis. The notification is experienced not as a game outcome but as a confirmation of failure.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">Level 3: Crisis</span>
                  <span className="text-sm text-gray-700">Language includes self-harm, hopelessness, or indicates an emergency</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded">Level 2: Significant Distress</span>
                  <span className="text-sm text-gray-700">Language suggests real emotional impact beyond disappointment</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">Level 1: Distress/Frustration</span>
                  <span className="text-sm text-gray-700">Expresses frustration or upset — does not indicate crisis</span>
                </div>
              </div>
            </div>

            {/* Physical Harm */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-bold text-blue-900 mb-2">2. Physical Harm</h5>
              <p className="text-sm text-gray-700">
                A participant injures themselves pursuing the 21-minute daily requirement (e.g., exercising while ill, exercising through pain to maintain streak, or exercising in unsafe conditions at midnight).
              </p>
            </div>

            {/* Financial Harm */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h5 className="font-bold text-green-900 mb-2">3. Financial Harm</h5>
              <p className="text-sm text-gray-700">
                A participant argues they have been incorrectly eliminated and demands a refund, or a pattern of technical failures produces incorrect eliminations at scale. Financial and welfare harm may co-occur.
              </p>
            </div>
          </div>
        </div>

        {/* Response Procedures */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Immediate Response Procedures</h4>

          {/* Level 3 - Crisis */}
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-bold text-red-900">Level 3 — Crisis Response</h5>
              <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded">Priority: Immediate (within 15 minutes)</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              <strong>Trigger:</strong> Any communication from a participant that includes language indicating self-harm, a mental health emergency, or expressions of hopelessness following elimination.
            </p>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Response:</strong></p>
              <ol className="list-decimal ml-5 space-y-1">
                <li>Acknowledge with warm, non-dismissive language</li>
                <li>Signpost crisis resources immediately: Lifeline 0800 543 354, or 1737 (free, 24/7)</li>
                <li>Do not leave the conversation — stay present if participant is still communicating</li>
                <li>Escalate immediately to CEO (phone call, not message)</li>
                <li>Document the communication (screenshot/log) — do not delete</li>
                <li>If immediate risk to life: contact NZ Police (111) with participant's contact details</li>
                <li>Do not offer refund or reinstatement in crisis communication</li>
              </ol>
              <p className="mt-2"><strong>After immediate response:</strong> CEO reviews incident, welfare check follow-up if warranted, incident logged in register, Board notified same day if serious, legal advice if any risk of liability.</p>
            </div>
          </div>

          {/* Level 2 - Significant Distress */}
          <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-bold text-orange-900">Level 2 — Significant Distress</h5>
              <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-2 py-1 rounded">Priority: Same business day</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              <strong>Trigger:</strong> A participant contacts Sport Waikato expressing significant emotional distress following elimination — distress that goes beyond ordinary disappointment.
            </p>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Response:</strong></p>
              <ol className="list-decimal ml-5 space-y-1">
                <li>Acknowledge and validate</li>
                <li>Signpost support: Mental Health Foundation line (1737 or mentalhealth.org.nz)</li>
                <li>Consider whether goodwill gesture is appropriate (e.g., priority registration for Season 2)</li>
                <li>Document the communication</li>
                <li>Escalate to Living Lab Lead for awareness</li>
              </ol>
            </div>
          </div>

          {/* Level 1 - Distress or Frustration */}
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-bold text-yellow-900">Level 1 — Distress or Frustration</h5>
              <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded">Priority: Within 24 hours</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              <strong>Trigger:</strong> A participant expresses frustration, upset, or disappointment following elimination — but language does not indicate crisis.
            </p>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Response:</strong></p>
              <ol className="list-decimal ml-5 space-y-1">
                <li>Acknowledge: "Elimination is the core of the game and it does sting — that's by design"</li>
                <li>If appropriate: signpost Season 2 registration</li>
                <li>If legitimate dispute exists: follow the disputes process</li>
                <li>No crisis resources required unless conversation escalates</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Physical Harm Response */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Physical Harm Response</h4>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700 mb-3">
              <strong>Trigger:</strong> A participant reports injury, illness, or hospitalisation connected to REAP participation.
            </p>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Response:</strong></p>
              <ol className="list-decimal ml-5 space-y-1">
                <li>Express genuine concern — do not be defensive or immediately refer to Terms</li>
                <li>Ask what happened and listen</li>
                <li>Escalate immediately to CEO</li>
                <li>Document everything</li>
                <li>Engage legal advice within 24 hours</li>
                <li>Do not make any admission of liability without legal advice</li>
                <li>Consider whether circumstances constitute Fair Trading Act issue</li>
              </ol>
              <p className="mt-2 text-xs italic">Note: Terms of Participation and health disclaimer do not eliminate Sport Waikato\'s liability if the product was designed or marketed in a way that foreseeably contributed to harm. Legal advice is essential.</p>
            </div>
          </div>
        </div>

        {/* Incorrect Elimination Process */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Incorrect Elimination — Disputes Process</h4>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700 mb-3">
              <strong>Trigger:</strong> A participant contacts Sport Waikato claiming they were incorrectly eliminated (device failure, sync error, technical fault).
            </p>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Standard disputes process:</strong></p>
              <ol className="list-decimal ml-5 space-y-1">
                <li>Acknowledge within 24 hours</li>
                <li>Review evidence: check participant\'s activity records in Supabase, device sync log, elimination timestamp</li>
                <li>Determine: was elimination technically correct, or was there a system error?</li>
                <li><strong>If correct elimination:</strong> Respond clearly and compassionately. Explain the data. Offer Season 2 priority registration. No reinstatement, no refund (per Terms).</li>
                <li><strong>If system error:</strong> Reinstate immediately. Investigate cause. Determine if error affected other participants. If systematic error: board notification, public acknowledgement, case-by-case resolution.</li>
              </ol>
              <p className="mt-2 text-xs">All disputes are logged with participant ID, date, claim, evidence reviewed, decision, and outcome.</p>
            </div>
          </div>
        </div>

        {/* Staff Training */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Staff Training Requirements</h4>
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <p className="text-sm text-gray-700 mb-2">
              Any staff member who may receive participant communications must be briefed on:
            </p>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
              <li>The Level 1/2/3 response framework</li>
              <li>Crisis resources (Lifeline, 1737) — must be accessible immediately, not looked up</li>
              <li>Escalation path (Living Lab Lead → CEO)</li>
              <li>Documentation requirement</li>
            </ul>
            <p className="text-sm text-gray-700 mt-3">
              <strong>A briefing session should be conducted before each season opens.</strong> The welfare protocol is not an emergency document — it is standard operating procedure.
            </p>
          </div>
        </div>

        {/* Mental Health Partnership */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Mental Health Partnership (Strategic Priority)</h4>
          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <p className="text-sm text-gray-700 mb-2">
              Sport Waikato is pursuing a formal partnership with a NZ mental health organisation (candidate: Lifeline NZ, Mental Health Foundation of NZ, or a PHO mental health service) to:
            </p>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
              <li>Co-develop the welfare protocol elements</li>
              <li>Review and approve the elimination notification copy</li>
              <li>Provide warm referral connections in elimination communications</li>
              <li>Co-research the wellbeing impacts of REAP participation across a season</li>
            </ul>
            <p className="text-sm text-gray-700 mt-3">
              <strong>This partnership turns the largest reputational risk into a genuine product differentiator</strong> and demonstrates that Sport Waikato took the mental health question seriously from Day 1.
            </p>
            <p className="text-sm text-gray-600 mt-2 italic">
              Action: CEO to approach candidate organisations before Season 1 launch (June–July 2026 target).
            </p>
          </div>
        </div>

        {/* Legal Framework */}
        <div>
          <h4 className="font-bold text-gray-900 mb-3">Legal Framework</h4>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700 mb-3">The welfare protocol operates within the following legal context:</p>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <strong>Consumer Guarantees Act 1993:</strong> Sport Waikato is not liable for elimination as a game outcome. It may be liable if the service was not delivered as described (e.g., incorrect technical elimination).
              </div>
              <div>
                <strong>Fair Trading Act 1986:</strong> Sport Waikato must not make claims about the product's health benefits that are false or misleading. The product is a game, not a clinical intervention.
              </div>
              <div>
                <strong>Health and Safety at Work Act 2015:</strong> Sport Waikato has a duty of care to its staff who manage welfare incidents. Staff handling Level 3 situations must have support available.
              </div>
              <div>
                <strong>Privacy Act 2020:</strong> All welfare incident records are personal information and must be handled accordingly — retained securely, not disclosed externally, available to the Privacy Commissioner on request.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reputation Protection Plan */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <AlertOctagon size={24} className="text-red-600" />
          <h3 className="text-xl font-bold text-gray-900">Reputation Protection Plan</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Sport Waikato's prepared response framework for potential crisis scenarios. Bold decisions attract bold responses — this plan ensures the organisation can respond with confidence, not retreat.
        </p>

        {/* Foundation */}
        <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-2">Foundation Position</h4>
          <p className="text-sm text-gray-700 mb-2">
            Sport Waikato's decision to build REAP is a bold one. Bold decisions attract bold responses. The board should be fully prepared for the reality that some media coverage of REAP will be negative or sceptical, particularly in the launch period.
          </p>
          <p className="text-sm text-gray-900 font-semibold">
            This is not a reason to be less bold. It is a reason to have a clear, confident plan for responding to adversity before it happens.
          </p>
        </div>

        {/* Crisis Scenarios */}
        <div className="space-y-4">
          {/* Scenario 1: DIA Gambling Challenge */}
          <div className="border border-red-200 rounded-lg overflow-hidden">
            <div className="bg-red-50 px-4 py-3 border-b border-red-200">
              <h5 className="font-bold text-red-900">Scenario 1: DIA Gambling Challenge</h5>
              <p className="text-sm text-red-700 mt-1">
                <strong>Trigger:</strong> Department of Internal Affairs formally contacts Sport Waikato indicating REAP may constitute unlicensed gambling
              </p>
            </div>
            <div className="p-4 bg-white">
              <div className="mb-3">
                <h6 className="text-sm font-bold text-gray-900 mb-2">Immediate Response (within 4 hours):</h6>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Cease all prize draw activity immediately</li>
                  <li>Contact Shelley (legal counsel) immediately — this is her call to lead</li>
                  <li>Do not make any public statement until legal advice is received</li>
                  <li>Notify board same day</li>
                </ul>
              </div>
              <div className="mb-3">
                <h6 className="text-sm font-bold text-gray-900 mb-2">Public Narrative (if it becomes public):</h6>
                <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                  <p className="text-sm text-gray-800 italic">
                    "Sport Waikato took proactive steps to seek informal DIA guidance before launching REAP. We are working constructively with the DIA to confirm our prize structure is compliant. REAP's performance awards are skill-based — they go to whoever has moved the most — not to randomly selected participants. We are confident in our structure and are happy to work through any questions the DIA has."
                  </p>
                </div>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r">
                <p className="text-sm text-red-900">
                  <strong>What never to say:</strong> Anything that implies the product was designed to skirt gambling law. It was designed to comply. Say so.
                </p>
              </div>
            </div>
          </div>

          {/* Scenario 2: Participant Welfare Incident */}
          <div className="border border-purple-200 rounded-lg overflow-hidden">
            <div className="bg-purple-50 px-4 py-3 border-b border-purple-200">
              <h5 className="font-bold text-purple-900">Scenario 2: Participant Welfare Incident</h5>
              <p className="text-sm text-purple-700 mt-1">
                <strong>Trigger:</strong> A participant is hospitalised, experiences a mental health crisis, or is otherwise seriously harmed in a way plausibly connected to REAP
              </p>
            </div>
            <div className="p-4 bg-white">
              <div className="mb-3">
                <h6 className="text-sm font-bold text-gray-900 mb-2">Immediate Response (within 2 hours):</h6>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Human welfare is the absolute first priority. All other considerations are secondary.</li>
                  <li>Follow the Product Harm Protocol — Level 3 crisis response</li>
                  <li>CEO is notified immediately</li>
                  <li>Board is notified same day</li>
                  <li>Legal advice engaged immediately</li>
                  <li>Do not make any public statement without legal advice</li>
                </ul>
              </div>
              <div className="mb-3">
                <h6 className="text-sm font-bold text-gray-900 mb-2">Prepared Statement (adapt to circumstances):</h6>
                <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                  <p className="text-sm text-gray-800 italic">
                    "Sport Waikato takes participant wellbeing extremely seriously. We are aware of a situation involving a REAP participant and we are in contact with them directly. REAP includes explicit wellbeing screening, crisis resource signposting in all elimination communications, and a documented welfare protocol that we follow for any participant in distress. We are reviewing this situation carefully."
                  </p>
                </div>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r">
                <p className="text-sm text-red-900">
                  <strong>What never to say:</strong> "The Terms of Participation are clear that Sport Waikato is not responsible..." — in a welfare incident, leading with legal disclaimers is reputationally catastrophic and ethically wrong.
                </p>
              </div>
            </div>
          </div>

          {/* Scenario 3: Celebrity Controversy */}
          <div className="border border-amber-200 rounded-lg overflow-hidden">
            <div className="bg-amber-50 px-4 py-3 border-b border-amber-200">
              <h5 className="font-bold text-amber-900">Scenario 3: Celebrity Controversy</h5>
              <p className="text-sm text-amber-700 mt-1">
                <strong>Trigger:</strong> A celebrity ambassador becomes the subject of public controversy during or after the October soft launch
              </p>
            </div>
            <div className="p-4 bg-white">
              <div className="mb-3">
                <h6 className="text-sm font-bold text-gray-900 mb-2">Immediate Response (within 24 hours):</h6>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Do not publicly comment on the celebrity's controversy unless directly asked</li>
                  <li>Quietly cease resharing the celebrity's REAP content on Sport Waikato channels</li>
                  <li>Review the Ambassador Agreement termination clause</li>
                  <li>If the celebrity's controversy is directly contrary to Sport Waikato's values: formally terminate the agreement</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-3 rounded">
                <p className="text-sm text-gray-700">
                  <strong>If media asks:</strong> "Sport Waikato is focused on REAP's launch and the health mission behind it. We're not going to comment on [celebrity's] personal situation."
                </p>
              </div>
            </div>
          </div>

          {/* Scenario 4: Data Breach */}
          <div className="border border-indigo-200 rounded-lg overflow-hidden">
            <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-200">
              <h5 className="font-bold text-indigo-900">Scenario 4: Data Breach</h5>
              <p className="text-sm text-indigo-700 mt-1">
                <strong>Trigger:</strong> An unauthorised party accesses participant personal data, including health-related activity data
              </p>
            </div>
            <div className="p-4 bg-white">
              <div className="mb-3">
                <h6 className="text-sm font-bold text-gray-900 mb-2">Immediate Response (within 2 hours):</h6>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Contain: revoke compromised credentials, disable affected access points</li>
                  <li>Assess: what data was accessed, how many participants affected, what type of data</li>
                  <li>Notify: if likely to cause serious harm — Privacy Commissioner must be notified; affected individuals notified ASAP</li>
                  <li>Legal advice engaged immediately</li>
                  <li>CEO and board notified same day</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                <p className="text-sm text-gray-800 italic">
                  <strong>Public narrative:</strong> "Sport Waikato became aware of a data security incident affecting [number] REAP participants. We immediately contained the breach and are contacting all affected participants directly. We have notified the Privacy Commissioner as required. The security of participant data is a priority and we are taking immediate steps to prevent recurrence."
                </p>
              </div>
            </div>
          </div>

          {/* Scenario 5: Sustained Negative Media Campaign */}
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
              <h5 className="font-bold text-gray-900">Scenario 5: Sustained Negative Media Campaign</h5>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Trigger:</strong> A journalist or media outlet publishes an adversarial story about REAP
              </p>
            </div>
            <div className="p-4 bg-white">
              <div className="mb-3">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>The right tone:</strong> Confident. Evidence-led. Mission-forward. Not defensive.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Who responds:</strong> CEO (Leanne) only. All media enquiries go to the CEO.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 p-3 rounded mb-3">
                <p className="text-sm text-green-900 font-semibold mb-2">The Bold Response Model:</p>
                <p className="text-sm text-gray-800 italic">
                  "We welcome scrutiny of REAP. We built something deliberately different and we're confident in why. If anyone wants to understand the behavioural science, the legal framework, or why a publicly-funded charitable trust is running a survival game, we're happy to explain."
                </p>
              </div>
            </div>
          </div>

          {/* Scenario 6: Competitor Launch */}
          <div className="border border-orange-200 rounded-lg overflow-hidden">
            <div className="bg-orange-50 px-4 py-3 border-b border-orange-200">
              <h5 className="font-bold text-orange-900">Scenario 6: Competitor or Imitation Product Launches</h5>
              <p className="text-sm text-orange-700 mt-1">
                <strong>Trigger:</strong> A well-resourced competitor announces or launches a similar product in New Zealand
              </p>
            </div>
            <div className="p-4 bg-white">
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                <li>Do not comment on the competitor publicly (looks insecure)</li>
                <li>Accelerate community-building activities: announce the next season, the RST expansion, the Friday 13th event, the Annual Championship</li>
                <li>Privately assess whether the competitor is a licensing opportunity or a genuine competitor</li>
                <li>Remind stakeholders: "Sport Waikato built this first. We have the data, the community, and the Living Lab behind us."</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Proactive Actions */}
        <div className="mt-6">
          <h4 className="font-bold text-gray-900 mb-3">Proactive Reputation Protection: Things to Do Before Any Crisis</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Action</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Rationale</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-3 py-2">Funder briefing (Sport NZ) before public launch</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">No funder should be surprised by media coverage</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Board briefing with full risk documentation</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">Board comfort and prepared responses</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-3 py-2">Mental health partnership announced at launch</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">Addresses the largest reputational risk proactively</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">DIA informal enquiry lodged before launch</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">Demonstrates responsible operator behaviour</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-3 py-2">Legal sign-off published as a fact (not details)</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">"Our Terms and prize structure have received formal legal sign-off" is a powerful statement</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Welfare protocol document on file</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">If a welfare incident occurs, "we had a documented protocol" is the most important thing to be able to say</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-3 py-2">Celebrity briefing with clear expectations</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">Reduces ambassador-generated reputation risk</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Staff briefed and aligned</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">Staff fielding public queries should not be surprised or ill-equipped</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-300 rounded-lg">
          <p className="text-sm text-gray-900 font-bold mb-2">The Underlying Thread</p>
          <p className="text-sm text-gray-700">
            The organisations that protect their reputation best are not the ones who never take risks. They are the ones who take calculated risks with their eyes open, who document what they considered and why, and who respond to adversity with confidence rather than retreat.
          </p>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <FileCheck size={24} className="text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">Terms of Participation — Additional Clauses</h3>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-amber-900 font-semibold">
            <strong>Status:</strong> Draft — requires legal sign-off by Shelley before publication
          </p>
          <p className="text-sm text-gray-700 mt-1">
            These clauses are drafted for insertion into the REAP Terms of Participation. They should be integrated by legal counsel in accordance with the overall Terms structure.
          </p>
        </div>

        <div className="space-y-6">
          {/* Clause A */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-bold text-gray-900 mb-2">Clause A: Participant Wellbeing and Mental Health</h4>

            <div className="mb-4">
              <h5 className="font-semibold text-gray-900 mb-2">A.1 — Nature of the Product</h5>
              <p className="text-sm text-gray-700 mb-2">
                REAP is a game designed to build daily movement habits through structured commitment and social accountability. It is a behavioural challenge product. It is not a mental health programme, a therapeutic intervention, a clinical service, or a replacement for professional health advice.
              </p>
              <p className="text-sm text-gray-700">
                Sport Waikato acknowledges that for most participants, elimination is a game outcome — disappointing but manageable. For a small number of participants, in certain circumstances, an elimination notification may land during a period of personal difficulty and cause significant distress. We have designed the product and our welfare protocols with this possibility in mind.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="font-semibold text-gray-900 mb-2">A.2 — Who Should Not Participate</h5>
              <p className="text-sm text-gray-700 mb-2">Sport Waikato recommends that you do not register for a REAP season if you are currently experiencing:</p>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                <li>Acute mental health distress, including active episodes of clinical depression, generalised anxiety disorder, or suicidal ideation</li>
                <li>Active recovery from an eating disorder, particularly where structured exercise rules may conflict with clinical treatment plans</li>
                <li>A period of acute grief, bereavement, or trauma within the last 30 days</li>
                <li>A medical condition for which daily moderate-intensity exercise is clinically contraindicated</li>
                <li>Active treatment for, or recent history of, exercise-related injury where daily activity may cause re-injury</li>
              </ul>
            </div>

            <div className="mb-4">
              <h5 className="font-semibold text-gray-900 mb-2">A.3 — Support Resources</h5>
              <div className="bg-purple-50 border border-purple-200 p-3 rounded">
                <p className="text-sm text-gray-700 mb-2">If you are experiencing mental health difficulties during your REAP season:</p>
                <ul className="list-none text-sm text-gray-700 space-y-1">
                  <li><strong>Lifeline:</strong> 0800 543 354 (free, 24/7)</li>
                  <li><strong>Need to Talk (1737):</strong> Text or call 1737 (free, 24/7)</li>
                  <li><strong>Mental Health Foundation:</strong> mentalhealth.org.nz</li>
                  <li><strong>Your GP</strong> or local community mental health service</li>
                </ul>
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-gray-900 mb-2">A.4 — Contacting Sport Waikato</h5>
              <p className="text-sm text-gray-700">
                If you contact Sport Waikato in distress following an elimination or at any point during the season, you will receive a human response — not an automated reply. Our welfare protocol ensures that communications expressing significant distress are escalated and responded to promptly and with care.
              </p>
            </div>
          </div>

          {/* Clause B */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-gray-900 mb-2">Clause B: Gamification, Habit Formation, and Responsible Participation</h4>

            <div className="mb-4">
              <h5 className="font-semibold text-gray-900 mb-2">B.1 — Design Intent</h5>
              <p className="text-sm text-gray-700">
                REAP uses behavioural science mechanisms — specifically loss aversion and social accountability — to build a daily movement habit. These mechanisms are effective precisely because they create psychological stakes. That is their purpose. Sport Waikato acknowledges that any mechanism powerful enough to change behaviour is powerful enough, in rare cases, to contribute to unhealthy patterns of engagement.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="font-semibold text-gray-900 mb-2">B.2 — Signs of Unhealthy Participation</h5>
              <p className="text-sm text-gray-700 mb-2">You should consider pausing your participation or cancelling your subscription if you notice:</p>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                <li>You are exercising through pain, injury, or illness in order to avoid elimination</li>
                <li>You are setting an alarm for 11:30pm or midnight to exercise, disrupting sleep</li>
                <li>You are experiencing significant distress (not ordinary disappointment) when you miss a session</li>
                <li>REAP participation is creating conflict in your personal relationships</li>
                <li>You feel unable to stop participating even when it is causing you harm</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-gray-900 mb-2">B.3 — Sport Waikato's Right to Intervene</h5>
              <p className="text-sm text-gray-700">
                Sport Waikato reserves the right to pause or terminate a participant's account, with a full refund of the current period's subscription, if we become aware of patterns suggesting a participant is engaging with REAP in ways that are harmful to their health or wellbeing. This is a welfare provision, not a punitive one.
              </p>
            </div>
          </div>

          {/* Clause C */}
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-bold text-gray-900 mb-2">Clause C: Accessible Participation — Addressing Financial Barriers</h4>

            <div className="mb-4">
              <h5 className="font-semibold text-gray-900 mb-2">C.1 — Acknowledgement</h5>
              <p className="text-sm text-gray-700">
                Sport Waikato is a charitable trust with a mandate to improve physical activity across all communities in the Waikato. We acknowledge that a $13/month subscription creates a financial barrier for participants on low or fixed incomes — including many of the communities most affected by physical inactivity and its health consequences. This is a genuine tension we take seriously.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="font-semibold text-gray-900 mb-2">C.2 — Pathways to Subsidised Participation</h5>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
                <li><strong>Corporate and community group sponsorship:</strong> Employers, health organisations, iwi, and community groups can sponsor group entries</li>
                <li><strong>Community scholarships (from Season 2):</strong> Fully-funded scholarship places per season for participants referred through community health programmes</li>
                <li><strong>RST subsidies:</strong> Regional Sport Trusts may negotiate subsidised group rates for community participants</li>
              </ul>
              <p className="text-sm text-gray-700 mt-2 italic">
                If you cannot afford the subscription fee and believe REAP could benefit your health, please contact Sport Waikato. We will do our best to find a pathway that works.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-gray-900 mb-2">C.3 — No Differential Treatment</h5>
              <p className="text-sm text-gray-700">
                Participants who access REAP through subsidised or scholarship pathways receive the same experience, prize eligibility, and support as full-subscription participants. Financial status is not disclosed to other participants.
              </p>
            </div>
          </div>

          {/* Clause D */}
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-bold text-gray-900 mb-2">Clause D: Device and Technology Failure</h4>

            <div className="mb-4">
              <h5 className="font-semibold text-gray-900 mb-2">D.1 — Responsibility for Activity Tracking</h5>
              <p className="text-sm text-gray-700">
                REAP accepts activity data from compatible third-party applications and devices. Sport Waikato does not manufacture, supply, operate, or support any wearable device or fitness application. The reliability and accuracy of data from connected devices is the responsibility of the device manufacturer and application operator, not Sport Waikato.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="font-semibold text-gray-900 mb-2">D.2 — Manual Activity Submission</h5>
              <p className="text-sm text-gray-700">
                REAP provides a manual activity submission option as a backup for situations where your connected device or application fails to sync before midnight. It is your responsibility to use manual submission if your device does not sync. The manual submission option is available from the REAP app until 23:45 NZST each day.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-gray-900 mb-2">D.4 — Disputes Process for Device Failure</h5>
              <p className="text-sm text-gray-700 mb-2">
                If you believe you completed 21+ minutes of qualifying activity on the day of your elimination and were eliminated as a result of a device or sync failure beyond your control, you may lodge a dispute within 48 hours of your elimination.
              </p>
              <div className="bg-orange-50 border border-orange-200 p-3 rounded">
                <p className="text-sm text-gray-700 mb-2"><strong>What Sport Waikato will do:</strong></p>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Review the dispute within 3 working days</li>
                  <li>Check your activity records in the REAP database</li>
                  <li>Make a decision based on the available evidence</li>
                </ul>
                <p className="text-sm text-gray-900 font-semibold mt-2">
                  Sport Waikato's decision on disputes is final. The disputes process is a goodwill mechanism, not a legal right to reinstatement.
                </p>
              </div>
            </div>
          </div>

          {/* Clause E */}
          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-bold text-gray-900 mb-2">Clause E: Vulnerable Participant Elimination — Ethical Position</h4>

            <div className="mb-4">
              <h5 className="font-semibold text-gray-900 mb-2">E.1 — Acknowledgment of Risk</h5>
              <p className="text-sm text-gray-700">
                Sport Waikato acknowledges plainly: there will be participants who are eliminated during periods of personal vulnerability. The probability is not zero. This is a foreseeable consequence of a product that delivers automated elimination notifications at 23:59 to people who are real human beings with real lives.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="font-semibold text-gray-900 mb-2">E.2 — Our Commitment</h5>
              <p className="text-sm text-gray-700 mb-2">Sport Waikato's response to this risk is not to disclaim it. It is to own it. We have:</p>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                <li>Designed elimination notifications to be honest and forward-looking, not triumphant or punishing</li>
                <li>Included support resource signposting in every elimination communication</li>
                <li>Created a documented welfare protocol for responding to participants in distress</li>
                <li>Recommended in these Terms that participants in acute mental health distress do not participate</li>
                <li>Committed to maintaining a human point of contact for welfare concerns throughout each season</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-gray-900 mb-2">E.3 — Limitation of Liability</h5>
              <p className="text-sm text-gray-700">
                Notwithstanding the above, Sport Waikato is not liable for psychological distress, loss of enjoyment, or other non-physical harm arising from elimination from a REAP season, provided that Sport Waikato has followed its documented welfare protocol and the health recommendations in these Terms were clearly communicated before registration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsorship Agreement */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Handshake size={24} className="text-green-600" />
          <h3 className="text-xl font-bold text-gray-900">Sponsorship Agreement Template</h3>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-amber-900 font-semibold">
            <strong>Status:</strong> Draft — requires legal sign-off before execution
          </p>
        </div>

        {/* Types of Sponsorship */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Types of Sponsorship Available</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Type</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">What the sponsor gets</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-bold text-gray-900">Pricing (indicative)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-3 py-2 font-semibold">Prize Sponsorship</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">Brand in prize notifications, prize category named after sponsor, logo on Survival Board, mention in Season Rules</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">$5,000–$20,000/season</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-semibold">Sponsored Group League</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">Named branded group league, group survival board, end-of-season activity report, co-branded marketing</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">$5,000–$25,000/season</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-3 py-2 font-semibold">Season Title Sponsorship</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">"REAP — Powered by [Sponsor]" branding across all season materials</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">$20,000–$50,000/season</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-semibold">Research Partnership</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">Access to aggregated de-identified season data, co-branding on Living Lab research outputs</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">$10,000–$30,000/year</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Clauses */}
        <div className="space-y-4">
          <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
            <h5 className="font-bold text-green-900 mb-2">1. Sport Waikato's Obligations</h5>
            <p className="text-sm text-gray-700">
              Examples include: named prize awards with logo placement, group league creation with branded survival boards, end-of-season aggregated reports (no individual data), co-branded social media campaigns.
            </p>
          </div>

          <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
            <h5 className="font-bold text-blue-900 mb-2">2. Sponsor's Obligations</h5>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Payment:</strong> Full sponsorship fee due before Season commences. No benefits delivered until payment confirmed.
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Compliance:</strong> Sponsor will not use its association with REAP to make any claim that contradicts Sport Waikato's published Terms, Rules, or legal position.
            </p>
            <p className="text-sm text-gray-700">
              <strong>Confidentiality:</strong> Sponsor will treat any participant data (including aggregated data) as confidential. Reports may be used internally for health programme evaluation only.
            </p>
          </div>

          <div className="border border-purple-200 bg-purple-50 p-4 rounded-lg">
            <h5 className="font-bold text-purple-900 mb-2">3. Data Access and Privacy</h5>
            <p className="text-sm text-gray-700 mb-2">
              <strong>No individual data:</strong> Sport Waikato will not provide Sponsor with individual participant data under this Agreement. Individual data is only available where participants have separately and specifically opted in.
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Group report minimum size:</strong> Aggregated group reports will not be produced for groups of fewer than 10 participants. For groups of 10–20, data will be presented in ranges to reduce re-identification risk.
            </p>
            <p className="text-sm text-gray-700">
              <strong>Privacy Act compliance:</strong> Both parties will comply with the Privacy Act 2020 in respect of any personal data handled under this Agreement.
            </p>
          </div>

          <div className="border border-orange-200 bg-orange-50 p-4 rounded-lg">
            <h5 className="font-bold text-orange-900 mb-2">5. Competitive Exclusivity</h5>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Category exclusivity:</strong> Sport Waikato grants Sponsor exclusive category sponsorship for the duration of the Season. Sport Waikato will not accept sponsorship from a direct competitor during the Season.
            </p>
            <p className="text-sm text-gray-700">
              <strong>Right of first refusal:</strong> Sponsor has a right of first refusal to renew its sponsorship category for the following season at equivalent terms. Sport Waikato will contact Sponsor at least 60 days before the following season commences.
            </p>
          </div>

          <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
            <h5 className="font-bold text-red-900 mb-2">6. Reputation and Values</h5>
            <p className="text-sm text-gray-700 mb-2">
              Sport Waikato reserves the right to terminate this Agreement immediately if Sponsor:
            </p>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
              <li>Is found to have engaged in conduct that is materially inconsistent with Sport Waikato's values or charitable mandate</li>
              <li>Makes public statements that misrepresent REAP, its prize structure, or its legal compliance status</li>
              <li>Is the subject of regulatory action, serious public controversy, or reputational events that would damage REAP's reputation</li>
            </ul>
            <p className="text-sm text-gray-700 mt-2">
              On termination under this clause, Sport Waikato will refund a pro-rata portion of the Sponsorship Fee for the unused portion of the Season.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
