import { useMemo } from 'react';
import { AlertTriangle, ArrowRight, Clock, GitBranch, Zap } from 'lucide-react';
import { tasks, categoryColors, statusColors, priorityColors, type Task } from '../data/reapData';

// ─── Critical Path Algorithm ───────────────────────────────────────────────────
// Computes the longest dependency chain leading to each task.
// "Level" = 0 if no deps, otherwise max(level of deps) + 1.
// The critical path is the chain from source → task with the deepest level AND latest due date.

function computeLevels(taskList: Task[]): Map<string, number> {
  const taskMap = new Map(taskList.map(t => [t.id, t]));
  const memo = new Map<string, number>();

  function getLevel(id: string): number {
    if (memo.has(id)) return memo.get(id)!;
    const task = taskMap.get(id);
    if (!task || !task.dependencies || task.dependencies.length === 0) {
      memo.set(id, 0);
      return 0;
    }
    const depLevels = task.dependencies.map(dep => (taskMap.has(dep) ? getLevel(dep) : 0));
    const level = Math.max(...depLevels) + 1;
    memo.set(id, level);
    return level;
  }

  for (const t of taskList) getLevel(t.id);
  return memo;
}

function getCriticalChain(taskList: Task[]): Task[] {
  const taskMap = new Map(taskList.map(t => [t.id, t]));
  const levels = computeLevels(taskList);

  // Find deepest level
  const maxLevel = Math.max(...Array.from(levels.values()));

  // Among tasks at max level, pick the one with latest due date
  const deepTasks = taskList.filter(t => levels.get(t.id) === maxLevel);
  const root = deepTasks.sort((a, b) => b.dueDate.localeCompare(a.dueDate))[0];
  if (!root) return [];

  // Trace back through dependencies to build the chain
  const chain: Task[] = [];
  function trace(t: Task) {
    chain.unshift(t);
    if (!t.dependencies || t.dependencies.length === 0) return;
    // Pick the dep with the highest level (the one on the critical path)
    const depTasks = t.dependencies
      .map(id => taskMap.get(id))
      .filter(Boolean) as Task[];
    if (depTasks.length === 0) return;
    const parent = depTasks.sort((a, b) => (levels.get(b.id) ?? 0) - (levels.get(a.id) ?? 0))[0];
    trace(parent);
  }
  trace(root);
  return chain;
}

function getBlockers(taskList: Task[]): Map<string, string[]> {
  // For each task, find who depends on it (who it blocks)
  const blocksMap = new Map<string, string[]>();
  for (const t of taskList) {
    if (t.dependencies) {
      for (const depId of t.dependencies) {
        if (!blocksMap.has(depId)) blocksMap.set(depId, []);
        blocksMap.get(depId)!.push(t.id);
      }
    }
  }
  return blocksMap;
}

// ─── Component ─────────────────────────────────────────────────────────────────

function TaskChip({ task, highlight = false }: { task: Task; highlight?: boolean }) {
  const cc = categoryColors[task.category];
  const sc = statusColors[task.status];
  const pc = priorityColors[task.priority];

  return (
    <div className={`rounded-lg border p-3 min-w-[180px] max-w-[220px] flex-shrink-0 ${
      highlight
        ? 'border-blue-400 bg-blue-50 shadow-sm'
        : 'border-gray-200 bg-white shadow-sm'
    }`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-xs text-gray-400">{task.id}</span>
        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${pc.bg} ${pc.text}`}>{task.priority}</span>
      </div>
      <div className="text-xs font-semibold text-gray-900 leading-snug mb-2">{task.name}</div>
      <div className="flex items-center justify-between gap-1 flex-wrap">
        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${sc.bg} ${sc.text}`}>{task.status}</span>
        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${cc.bg} ${cc.text}`}>{task.category}</span>
      </div>
      <div className="text-xs text-gray-400 mt-1.5 font-mono">{task.dueDate}</div>
    </div>
  );
}

export function CriticalPath() {
  const taskMap = useMemo(() => new Map(tasks.map(t => [t.id, t])), []);
  const levels = useMemo(() => computeLevels(tasks), []);
  const criticalChain = useMemo(() => getCriticalChain(tasks), []);
  const blocksMap = useMemo(() => getBlockers(tasks), []);

  // Group tasks by level (waves)
  const maxLevel = Math.max(...Array.from(levels.values()));
  const waves: Task[][] = Array.from({ length: maxLevel + 1 }, (_, i) =>
    tasks.filter(t => levels.get(t.id) === i).sort((a, b) => a.dueDate.localeCompare(b.dueDate))
  );

  const criticalIds = new Set(criticalChain.map(t => t.id));

  // Tasks that are blocking the most downstream work
  const topBlockers = [...blocksMap.entries()]
    .map(([id, downstream]) => ({ task: taskMap.get(id)!, downstream }))
    .filter(x => x.task && x.task.status !== 'Completed')
    .sort((a, b) => b.downstream.length - a.downstream.length)
    .slice(0, 8);

  // Tasks with no dependencies and not complete — entry points
  const entryTasks = tasks.filter(t => (!t.dependencies || t.dependencies.length === 0) && t.status !== 'Completed');

  // Blocked tasks (status = Blocked or have unfinished deps)
  const blockedTasks = tasks.filter(t => {
    if (t.status === 'Completed') return false;
    if (t.status === 'Blocked') return true;
    return t.dependencies?.some(dep => {
      const dep_task = taskMap.get(dep);
      return dep_task && dep_task.status !== 'Completed';
    });
  });

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Critical Path</h2>
        <p className="text-gray-600 text-sm mt-1">Longest dependency chain and blocking analysis across {tasks.length} tasks</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{criticalChain.length}</div>
          <div className="text-xs text-gray-500 mt-0.5">Tasks on Critical Path</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{maxLevel + 1}</div>
          <div className="text-xs text-gray-500 mt-0.5">Dependency Waves</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-orange-600">{blockedTasks.length}</div>
          <div className="text-xs text-gray-500 mt-0.5">Currently Blocked</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{entryTasks.length}</div>
          <div className="text-xs text-gray-500 mt-0.5">Entry Tasks (No Deps)</div>
        </div>
      </div>

      {/* Critical chain */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Zap size={18} className="text-blue-600" />
          <div>
            <h3 className="text-base font-bold text-gray-900">Critical Path Chain</h3>
            <p className="text-xs text-gray-500">Longest dependency sequence — any delay here delays launch</p>
          </div>
        </div>
        <div className="p-6 overflow-x-auto">
          <div className="flex items-start gap-2 min-w-max">
            {criticalChain.map((task, i) => (
              <div key={task.id} className="flex items-center gap-2">
                <TaskChip task={task} highlight />
                {i < criticalChain.length - 1 && (
                  <ArrowRight size={20} className="text-blue-400 shrink-0 mt-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Blockers */}
      {topBlockers.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <AlertTriangle size={18} className="text-orange-500" />
            <div>
              <h3 className="text-base font-bold text-gray-900">Top Blocking Tasks</h3>
              <p className="text-xs text-gray-500">Tasks whose completion unblocks the most downstream work</p>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {topBlockers.map(({ task, downstream }) => {
              const cc = categoryColors[task.category];
              const sc = statusColors[task.status];
              const pc = priorityColors[task.priority];
              return (
                <div key={task.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-gray-400">{task.id}</span>
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${cc.bg} ${cc.text}`}>{task.category}</span>
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${pc.bg} ${pc.text}`}>{task.priority}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{task.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{task.owner} · Due {task.dueDate}</div>
                  </div>
                  <div className="shrink-0 text-center">
                    <div className="text-lg font-bold text-orange-600">{downstream.length}</div>
                    <div className="text-xs text-gray-500">blocked tasks</div>
                  </div>
                  <div className="shrink-0">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${sc.bg} ${sc.text}`}>{task.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Blocked tasks */}
      {blockedTasks.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Clock size={18} className="text-red-500" />
            <div>
              <h3 className="text-base font-bold text-gray-900">Waiting on Dependencies</h3>
              <p className="text-xs text-gray-500">Tasks that cannot start until predecessors are complete</p>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {blockedTasks.slice(0, 15).map(task => {
              const cc = categoryColors[task.category];
              const sc = statusColors[task.status];
              const unfinishedDeps = task.dependencies
                ?.map(id => taskMap.get(id))
                .filter(d => d && d.status !== 'Completed') as Task[] | undefined;
              return (
                <div key={task.id} className="px-6 py-3 hover:bg-gray-50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-gray-400">{task.id}</span>
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${sc.bg} ${sc.text}`}>{task.status}</span>
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${cc.bg} ${cc.text}`}>{task.category}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">{task.name}</div>
                  {unfinishedDeps && unfinishedDeps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {unfinishedDeps.map(dep => {
                        const dsc = statusColors[dep.status];
                        return (
                          <span key={dep.id} className={`text-xs px-2 py-0.5 rounded border ${dsc.bg} ${dsc.text} border-current/20`}>
                            {dep.id}: {dep.name.length > 35 ? dep.name.slice(0, 35) + '…' : dep.name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Dependency waves */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <GitBranch size={18} className="text-gray-600" />
          <div>
            <h3 className="text-base font-bold text-gray-900">Dependency Waves</h3>
            <p className="text-xs text-gray-500">Tasks grouped by their earliest possible start order. Tasks in the same wave can run in parallel. Blue = on critical path.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-20">Wave</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-20">ID</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Task</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Owner</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Due</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Blocks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {waves.map((wave, waveIdx) =>
                wave.map((task, taskIdx) => {
                  const cc = categoryColors[task.category];
                  const sc = statusColors[task.status];
                  const downstream = blocksMap.get(task.id) ?? [];
                  const isCritical = criticalIds.has(task.id);
                  return (
                    <tr
                      key={task.id}
                      className={`hover:bg-gray-50 transition-colors ${isCritical ? 'bg-blue-50/40' : ''}`}
                    >
                      {taskIdx === 0 && (
                        <td
                          className="px-5 py-3 font-bold text-gray-500 align-top"
                          rowSpan={wave.length}
                        >
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                            {waveIdx}
                          </span>
                        </td>
                      )}
                      <td className="px-5 py-3 font-mono text-xs text-gray-400">{task.id}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          {isCritical && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />}
                          <span className="font-medium text-gray-900 text-xs">{task.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${cc.bg} ${cc.text}`}>{task.category}</span>
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-600">{task.owner}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${sc.bg} ${sc.text}`}>{task.status}</span>
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-gray-600">{task.dueDate}</td>
                      <td className="px-5 py-3 text-xs text-gray-500">
                        {downstream.length > 0 ? (
                          <span className="font-semibold text-orange-600">{downstream.length} task{downstream.length !== 1 ? 's' : ''}</span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
