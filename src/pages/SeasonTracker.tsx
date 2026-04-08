import { Users, DollarSign, Award, Clock, Info } from 'lucide-react';
import { seasons, spotPrizeDrawSchedule, type Season } from '../data/reapData';

const statusConfig = {
  Planning: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
  Ready: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  Active: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  Complete: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
};

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' });
}

function SeasonCard({ season, index }: { season: Season; index: number }) {
  const sc = statusConfig[season.status];
  const isFirst = index === 0;

  return (
    <div className={`relative flex gap-6 pb-10 ${index === seasons.length - 1 ? '' : ''}`}>
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
          isFirst ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500'
        }`}>
          S{season.number}
        </div>
        {index < seasons.length - 1 && (
          <div className="w-0.5 bg-gray-200 flex-1 mt-2" style={{ minHeight: 40 }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-2">
        <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{season.name}</h3>
            <p className="text-sm text-gray-600 mt-0.5">{season.description}</p>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
            {season.status}
          </span>
        </div>

        {/* Dates grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {season.softLaunchDate && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 font-medium mb-0.5">Soft Launch</div>
              <div className="text-sm font-semibold text-gray-900">{formatDate(season.softLaunchDate)}</div>
            </div>
          )}
          {season.boardApprovalDeadline && (
            <div className="bg-red-50 rounded-lg p-3">
              <div className="text-xs text-red-600 font-medium mb-0.5">Board Approval Deadline</div>
              <div className="text-sm font-semibold text-gray-900">{formatDate(season.boardApprovalDeadline)}</div>
            </div>
          )}
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-xs text-blue-600 font-medium mb-0.5">Public Launch</div>
            <div className="text-sm font-semibold text-gray-900">{formatDate(season.launchDate)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 font-medium mb-0.5">Season End</div>
            <div className="text-sm font-semibold text-gray-900">{formatDate(season.seasonEndDate)}</div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gray-400 shrink-0" />
            <div>
              <div className="text-xs text-gray-500">Target</div>
              <div className="text-sm font-bold text-gray-900">{season.targetParticipants.toLocaleString()}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-gray-400 shrink-0" />
            <div>
              <div className="text-xs text-gray-500">Price</div>
              <div className="text-sm font-bold text-gray-900">${season.subscriptionPrice}/mo</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Award size={16} className="text-gray-400 shrink-0" />
            <div>
              <div className="text-xs text-gray-500">Prize Pool</div>
              <div className="text-sm font-bold text-gray-900">${season.prizePool.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SeasonTracker() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Season Tracker</h2>
        <p className="text-gray-600 text-sm mt-1">Four-season rollout plan for REAP</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-gray-900">4</div>
          <div className="text-xs text-gray-500 mt-0.5">Planned Seasons</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-gray-900">1 Nov</div>
          <div className="text-xs text-gray-500 mt-0.5">Season 1 Launch</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-gray-900">$52</div>
          <div className="text-xs text-gray-500 mt-0.5">Annual Subscription</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-gray-900">$4,662</div>
          <div className="text-xs text-gray-500 mt-0.5">Prize Pool / Season</div>
        </div>
      </div>

      {/* Target participants table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Participation Targets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Season</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Launch Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Target Participants</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Est. Revenue</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {seasons.map(s => {
                const sc = statusConfig[s.status];
                const estRevenue = s.targetParticipants * s.subscriptionPrice * 1; // 1 month for 30-day season
                return (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-semibold text-gray-900">{s.name}</td>
                    <td className="px-5 py-3 text-gray-600">{formatDate(s.launchDate)}</td>
                    <td className="px-5 py-3 font-semibold text-gray-900">{s.targetParticipants.toLocaleString()}</td>
                    <td className="px-5 py-3 text-gray-600">${estRevenue.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${sc.bg} ${sc.text}`}>{s.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-4">Season Timeline</h3>
        <div>
          {seasons.map((s, i) => (
            <SeasonCard key={s.id} season={s} index={i} />
          ))}
        </div>
      </div>

      {/* Spot prize draw schedule */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Spot Prize Draw Schedule — Per Season</h3>
          <p className="text-xs text-gray-500 mt-0.5">7 draws per season. Active, confirmed-paid survivors are automatically eligible — no additional payment required.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Draw</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Day</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Eligibility</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Prize</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {spotPrizeDrawSchedule.map(draw => (
                <tr key={draw.drawNumber} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">#{draw.drawNumber}</td>
                  <td className="px-5 py-3"><span className="font-mono text-sm text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Day {draw.dayTrigger}</span></td>
                  <td className="px-5 py-3 font-medium text-gray-900">{draw.name}</td>
                  <td className="px-5 py-3 text-gray-600 text-xs">{draw.eligibility}</td>
                  <td className="px-5 py-3 font-bold text-green-700">${draw.prize}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td colSpan={4} className="px-5 py-3 text-gray-700">Season Total</td>
                <td className="px-5 py-3 text-green-700">${spotPrizeDrawSchedule.reduce((s, d) => s + d.prize, 0).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Info size={16} className="text-yellow-600 mt-0.5 shrink-0" />
          <div className="text-sm text-yellow-800">
            <strong>Compliance note:</strong> Prize draws are promotional spot draws subsidiary to the Survive the Reap game product. The $13/month subscription is paid for game access, not for draw eligibility. Prize fund ($4,662/season) is funded entirely from Sport Waikato's operational budget — entirely separate from subscription revenue. No participant fee contributes to any prize.
            <div className="mt-1 font-semibold">Language: use "spot prize draw" — never "lottery", "lucky draw", or "random draw".</div>
          </div>
        </div>
      </div>
    </div>
  );
}
