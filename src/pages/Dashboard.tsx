import { CheckCircle, Clock, AlertCircle, TrendingUp, Users, BarChart2, CalendarDays, Flame, FileText } from 'lucide-react';
import { NavLink } from 'react-router';
import {
  tasks, seasons, resources, getDaysToLaunch, getProgressPercent, getCriticalBlockers,
  getTasksByStatus, categoryColors, statusColors, formatMilestoneDate, type Task
} from '../data/reapData';

function StatCard({ label, value, sub, color, icon: Icon }: {
  label: string; value: string; sub: string; color: string; icon: React.ElementType;
}) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <Icon className={color} size={22} />
        <span className={`text-xs font-semibold px-2 py-1 rounded ${color.replace('text-', 'text-').replace('-600', '-600')} bg-opacity-10`} />
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
      <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
    </div>
  );
}

function TaskRow({ task }: { task: Task }) {
  const sc = statusColors[task.status];
  const cc = categoryColors[task.category];
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${task.status === 'Completed' ? 'bg-green-500' : task.status === 'Blocked' ? 'bg-red-500' : task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-300'}`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">{task.name}</div>
        <div className="text-xs text-gray-500">{task.owner} · Due {task.dueDate}</div>
      </div>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${cc.bg} ${cc.text} shrink-0`}>{task.category}</span>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${sc.bg} ${sc.text} shrink-0`}>{task.status}</span>
    </div>
  );
}

export function Dashboard() {
  const daysToLaunch = getDaysToLaunch();
  const progressPct = getProgressPercent();
  const blockers = getCriticalBlockers();
  const inProgress = getTasksByStatus('In Progress');
  const complete = getTasksByStatus('Completed');

  // Tasks due within the next 30 days (dynamic — always relative to today)
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() + 30);
  const cutoffISO = cutoff.toISOString().split('T')[0];
  const soon = tasks
    .filter(t => t.status !== 'Completed' && t.dueDate <= cutoffISO)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 8);

  // Key milestones derived from tasks and seasons — dates update automatically
  const season1 = seasons.find(s => s.number === 1)!;
  const diaTask = tasks.find(t => t.id === 'T001')!;
  const milestones = [
    {
      label: 'DIA Informal Enquiry',
      date: formatMilestoneDate(diaTask.dueDate),
      status: diaTask.status,
      color: diaTask.status === 'In Progress' ? 'text-yellow-600 bg-yellow-50'
           : diaTask.status === 'Completed'   ? 'text-green-600 bg-green-50'
           : diaTask.status === 'Blocked'     ? 'text-red-600 bg-red-50'
           :                                   'text-gray-600 bg-gray-50',
    },
    {
      label: 'Legal Sign-Off Deadline',
      date: formatMilestoneDate(season1.legalSignOffDeadline!),
      status: 'Not Started' as const,
      color: 'text-red-600 bg-red-50',
    },
    {
      label: 'Celebrity Soft Launch',
      date: formatMilestoneDate(season1.softLaunchDate!, true),
      status: 'Not Started' as const,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Season 1 Public Launch',
      date: formatMilestoneDate(season1.launchDate),
      status: 'Not Started' as const,
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  // Category breakdown
  const categories = ['Legal', 'Product Build', 'Marketing', 'Partnerships', 'Operations', 'Launch'] as const;
  const catCounts = categories.map(cat => ({
    cat,
    total: tasks.filter(t => t.category === cat).length,
    done: tasks.filter(t => t.category === cat && t.status === 'Completed').length,
    inProgress: tasks.filter(t => t.category === cat && t.status === 'In Progress').length,
  }));

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Project Dashboard</h2>
        <p className="text-gray-600">REAP (Survive the Reap) — Sport Waikato Living Lab</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-blue-600" size={22} />
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">LAUNCH</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{daysToLaunch}</div>
          <div className="text-sm text-gray-500 mt-1">Days to Season 1</div>
          <div className="text-xs text-gray-400 mt-0.5">1 Nov 2026</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-green-600" size={22} />
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">PROGRESS</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{progressPct}%</div>
          <div className="text-sm text-gray-500 mt-1">Tasks Complete</div>
          <div className="text-xs text-gray-400 mt-0.5">{complete.length} of {tasks.length}</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="text-red-600" size={22} />
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">CRITICAL</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{blockers.filter(t => t.priority === 'Critical').length}</div>
          <div className="text-sm text-gray-500 mt-1">Critical Tasks Open</div>
          <div className="text-xs text-gray-400 mt-0.5">{blockers.filter(t => t.status === 'Blocked').length} blocked</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <BarChart2 className="text-purple-600" size={22} />
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">ACTIVE</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{inProgress.length}</div>
          <div className="text-sm text-gray-500 mt-1">Tasks In Progress</div>
          <div className="text-xs text-gray-400 mt-0.5">Across all owners</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category progress */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">Progress by Category</h3>
          <div className="space-y-3">
            {catCounts.map(({ cat, total, done, inProgress: ip }) => {
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              const cc = categoryColors[cat];
              return (
                <div key={cat}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{cat}</span>
                    <span className="text-xs text-gray-500">{done}/{total} · {ip} in progress</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${cc.text.replace('text-', 'bg-').replace('-700', '-500')}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Documentation Status */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">Documentation Status</h3>
            <NavLink to="/docs" className="text-xs text-blue-600 hover:text-blue-700 font-medium">View →</NavLink>
          </div>
          {(() => {
            const complete = resources.filter(r => r.status === 'Complete' || r.status === 'Final' || r.status === 'Approved').length;
            const review = resources.filter(r => r.status === 'Under Review' || r.status === 'Draft — Awaiting Legal Review').length;
            const draft = resources.filter(r => r.status === 'Draft').length;
            const pct = Math.round((complete / resources.length) * 100);
            return (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-xs text-gray-500">{complete}/{resources.length}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{complete}</div>
                    <div className="text-xs text-gray-600">Complete</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-amber-600">{review}</div>
                    <div className="text-xs text-gray-600">In Review</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-600">{draft}</div>
                    <div className="text-xs text-gray-600">Draft</div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Tasks due soon */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Due in Next 30 Days</h3>
          <NavLink to="/tasks" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all →</NavLink>
        </div>
        <div className="px-6 py-2">
          {soon.length === 0
            ? <p className="text-sm text-gray-500 py-4">No tasks due in the next 30 days.</p>
            : soon.map(t => <TaskRow key={t.id} task={t} />)
          }
        </div>
      </div>

      {/* Key milestones */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 mb-4">Key Milestones</h3>
        <div className="space-y-3">
          {milestones.map(m => (
            <div key={m.label} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">{m.label}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <CalendarDays size={11} />
                  {m.date}
                </div>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${m.color}`}>{m.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <Flame className="text-blue-600 mt-0.5 shrink-0" size={18} />
          <div>
            <h3 className="text-sm font-bold text-blue-900 mb-1">Board Resolution Required</h3>
            <p className="text-sm text-blue-800">
              Sport Waikato board approval of REAP as a Living Lab product, Year 1 budget ($27,650 NZD),
              DIA enquiry authorisation, and legal sign-off delegation is required by {formatMilestoneDate(season1.boardApprovalDeadline!)}.
            </p>
            <NavLink to="/overview" className="text-xs font-semibold text-blue-700 hover:text-blue-800 mt-2 inline-block">
              View full board report →
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
