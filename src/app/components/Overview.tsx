import { AlertCircle, CheckCircle, Clock, TrendingUp, Users, DollarSign } from 'lucide-react';
import {
  getDaysToLaunch, getCriticalBlockers, totalYear1Budget, revenueScenarios,
  seasons, tasks, getCategoryProgressPercent, getCombinedProgressPercent,
  formatMilestoneDate,
} from '../../data/reapData';

export function Overview() {
  const daysToLaunch = getDaysToLaunch();
  const criticalOpen = getCriticalBlockers().filter(t => t.priority === 'Critical').length;
  const baseCase = revenueScenarios.find(s => s.name === 'Base Case')!;
  const season1 = seasons.find(s => s.number === 1)!;
  const diaTask = tasks.find(t => t.id === 'T001')!;
  const appDevTask = tasks.find(t => t.id === 'T040')!; // Load Testing — last major Product Build gate

  const legalPct = getCategoryProgressPercent('Legal');
  const appDevPct = getCategoryProgressPercent('Product Build');
  const marketingPct = getCombinedProgressPercent(['Marketing', 'Launch']);
  const operationsPct = getCategoryProgressPercent('Operations');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Executive Dashboard</h2>
        <p className="text-gray-600">
          Real-time overview of REAP project status, critical milestones, and key metrics
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-blue-600" size={24} />
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">TIMELINE</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{daysToLaunch} days</div>
          <div className="text-sm text-gray-600 mt-1">Until Season 1 Launch</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="text-red-600" size={24} />
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">CRITICAL</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{criticalOpen}</div>
          <div className="text-sm text-gray-600 mt-1">Critical Tasks Due</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-green-600" size={24} />
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">BUDGET</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">${totalYear1Budget.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Year 1 Total Commitment</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-purple-600" size={24} />
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">TARGET</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{baseCase.subscribers}</div>
          <div className="text-sm text-gray-600 mt-1">Base Case Subscribers Y1</div>
        </div>
      </div>

      {/* Project Status */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Project Status</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Legal & Compliance</span>
              <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">AT RISK</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: `${legalPct}%` }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Gambling Act compliance requires resolution before launch</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">App Development</span>
              <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">IN PROGRESS</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${appDevPct}%` }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Core features built, integrations and testing remaining</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Marketing & Launch</span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">PLANNED</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${marketingPct}%` }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Celebrity soft launch scheduled for October 2026</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Budget & Financial Planning</span>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">ON TRACK</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${operationsPct}%` }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Financial modeling complete, board approval pending</p>
          </div>
        </div>
      </div>

      {/* Critical Milestones */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Critical Milestones</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <AlertCircle className="text-red-600" size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">DIA Informal Enquiry</div>
                  <div className="text-sm text-gray-600">Submit gambling compliance enquiry to Department of Internal Affairs</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">{formatMilestoneDate(diaTask.dueDate)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1">
              <AlertCircle className="text-red-600" size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">Legal Terms Finalization</div>
                  <div className="text-sm text-gray-600">Terms, Rules, and Privacy Policy signed off by legal counsel</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">{formatMilestoneDate(season1.legalSignOffDeadline!)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">App Development Complete</div>
                  <div className="text-sm text-gray-600">Production deployment with all wearable integrations tested</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">{formatMilestoneDate(appDevTask.dueDate)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1">
              <TrendingUp className="text-blue-600" size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">Celebrity Soft Launch</div>
                  <div className="text-sm text-gray-600">Invite-only launch with NZ celebrities and media personalities</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">{formatMilestoneDate(season1.softLaunchDate!, true)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">Season 1 Launch</div>
                  <div className="text-sm text-gray-600">Public season opens — 30-day survival game begins</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">{formatMilestoneDate(season1.launchDate)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-blue-900 mb-2">Board Resolution Required</h3>
        <p className="text-sm text-blue-800 mb-4">
          That Sport Waikato approves REAP (Survive the Reap) as an official Living Lab product,
          approves the Year 1 budget commitment of ${totalYear1Budget.toLocaleString()} NZD (including $9,324 prize fund from
          operational funds), authorizes management to proceed with DIA informal enquiry and legal
          sign-off, and delegates day-to-day product decisions to the Living Lab Lead within the
          approved framework.
        </p>
        <div className="text-xs text-blue-700">
          See Legal & Compliance section for full conditions and risk mitigation framework
        </div>
      </div>
    </div>
  );
}