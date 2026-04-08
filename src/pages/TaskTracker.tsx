import { useState, useMemo } from 'react';
import { Search, Plus, X, ChevronUp, ChevronDown, MessageSquare, Link, Send, ChevronRight, CheckCircle2, ExternalLink } from 'lucide-react';
import {
  tasks as allTasks, resources, categoryColors, statusColors, priorityColors,
  type Task, type TaskCategory, type TaskStatus, type TaskPriority, type OwnerName
} from '../data/reapData';

type SortKey = 'name' | 'category' | 'owner' | 'status' | 'priority' | 'dueDate';
type SortDir = 'asc' | 'desc';

const categories: TaskCategory[] = ['Legal', 'Product Build', 'Marketing', 'Partnerships', 'Operations', 'Launch'];
const statuses: TaskStatus[] = ['Not Started', 'In Progress', 'Blocked', 'Completed'];
const priorities: TaskPriority[] = ['Critical', 'High', 'Medium', 'Low'];
const owners: OwnerName[] = ['Leanne', 'Ashleigh', 'Shelley', 'Dev Team'];

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

// Seed comments so the panel feels live
const seedComments: Record<string, Comment[]> = {
  T001: [
    { id: 'c1', author: 'Shelley', text: 'Letter drafted and sent to Leanne for review. Awaiting CEO approval before submission to DIA.', timestamp: '2026-04-01T09:15:00' },
    { id: 'c2', author: 'Leanne', text: 'Reviewed — good to go. Can you submit this week?', timestamp: '2026-04-02T14:30:00' },
  ],
  T002: [
    { id: 'c3', author: 'Shelley', text: 'Starting full Gambling Act analysis. Key question is whether spot prize draws subsidiary to the game fall within s4 definition.', timestamp: '2026-04-05T10:00:00' },
  ],
  T005: [
    { id: 'c4', author: 'Shelley', text: 'First draft of T&Cs in progress. Prize funding separation clause is the critical section.', timestamp: '2026-04-06T11:00:00' },
    { id: 'c5', author: 'Ashleigh', text: 'Can you flag when you reach the wearable data section? Want to align with privacy policy.', timestamp: '2026-04-07T09:45:00' },
  ],
};

function SortIcon({ field, sortKey, sortDir }: { field: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (field !== sortKey) return <span className="w-4 h-4 inline-block" />;
  return sortDir === 'asc' ? <ChevronUp size={14} className="inline" /> : <ChevronDown size={14} className="inline" />;
}

interface EditingCell {
  id: string;
  field: 'status' | 'priority' | 'owner' | 'dueDate';
}

function formatTs(ts: string) {
  return new Date(ts).toLocaleString('en-NZ', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

interface TaskDetailPanelProps {
  task: Task;
  allTasks: Task[];
  comments: Comment[];
  onClose: () => void;
  onAddComment: (taskId: string, text: string) => void;
}

function TaskDetailPanel({ task, allTasks, comments, onClose, onAddComment }: TaskDetailPanelProps) {
  const [commentText, setCommentText] = useState('');
  const cc = categoryColors[task.category];
  const sc = statusColors[task.status];
  const pc = priorityColors[task.priority];

  const blockedBy = task.dependencies
    ?.map(id => allTasks.find(t => t.id === id))
    .filter(Boolean) as Task[] | undefined;

  function submitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(task.id, commentText.trim());
    setCommentText('');
  }

  return (
    <div className="fixed inset-y-0 right-0 z-40 flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />
      {/* Panel */}
      <div className="relative ml-auto w-full max-w-md bg-white border-l border-gray-200 shadow-xl flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100">
          <div className="min-w-0 flex-1 pr-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-gray-400">{task.id}</span>
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${cc.bg} ${cc.text}`}>{task.category}</span>
            </div>
            <h3 className="text-base font-bold text-gray-900 leading-snug">{task.name}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 shrink-0 mt-0.5">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Status badges */}
          <div className="px-5 py-4 flex flex-wrap gap-2 border-b border-gray-100">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${sc.bg} ${sc.text}`}>{task.status}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${pc.bg} ${pc.text}`}>{task.priority}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">Owner: {task.owner}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">Due: {task.dueDate}</span>
          </div>

          {/* Description */}
          {task.description && (
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Description</div>
              <p className="text-sm text-gray-700 leading-relaxed">{task.description}</p>
            </div>
          )}

          {/* Completed date + output file */}
          {(task.completedDate || task.outputFile) && (
            <div className="px-5 py-4 border-b border-gray-100 bg-green-50/40">
              {task.completedDate && (
                <div className="flex items-center gap-2 text-sm text-green-700 mb-1">
                  <CheckCircle2 size={14} />
                  <span className="font-semibold">Completed {task.completedDate}</span>
                </div>
              )}
              {task.outputFile && (() => {
                const res = resources.find(r => r.id === task.outputFile);
                return res ? (
                  <div className="mt-1">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Output Document</div>
                    <div className="flex items-center justify-between bg-white rounded-lg border border-green-200 px-3 py-2">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{res.title}</div>
                        <div className="text-xs text-gray-500">{res.category} · {res.status}</div>
                      </div>
                      {res.filePath ? (
                        <a
                          href={res.filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 shrink-0"
                        >
                          <ExternalLink size={11} /> VIEW OUTPUT
                        </a>
                      ) : (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-gray-100 text-gray-400 shrink-0">PENDING</span>
                      )}
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}

          {/* Notes */}
          {task.notes && (
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Notes</div>
              <p className="text-sm text-gray-600 leading-relaxed bg-yellow-50 rounded-lg p-3 border border-yellow-100">{task.notes}</p>
            </div>
          )}

          {/* Dependencies */}
          {blockedBy && blockedBy.length > 0 && (
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Link size={12} /> Dependencies ({blockedBy.length})
              </div>
              <div className="space-y-1.5">
                {blockedBy.map(dep => {
                  const dsc = statusColors[dep.status];
                  return (
                    <div key={dep.id} className="flex items-center gap-2 text-sm">
                      <ChevronRight size={12} className="text-gray-400 shrink-0" />
                      <span className="font-mono text-xs text-gray-400">{dep.id}</span>
                      <span className="text-gray-700 flex-1 truncate">{dep.name}</span>
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded shrink-0 ${dsc.bg} ${dsc.text}`}>{dep.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Comments */}
          <div className="px-5 py-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <MessageSquare size={12} /> Comments ({comments.length})
            </div>
            {comments.length === 0 && (
              <div className="text-sm text-gray-400 text-center py-4">No comments yet</div>
            )}
            <div className="space-y-3">
              {comments.map(c => (
                <div key={c.id} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
                    {c.author[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-gray-800">{c.author}</span>
                      <span className="text-xs text-gray-400">{formatTs(c.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-snug">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comment input */}
        <div className="border-t border-gray-100 px-5 py-3">
          <form onSubmit={submitComment} className="flex gap-2 items-end">
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitComment(e); } }}
              placeholder="Add a comment..."
              rows={2}
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 resize-none"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>(allTasks);
  const [comments, setComments] = useState<Record<string, Comment[]>>(seedComments);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<TaskCategory | ''>('');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | ''>('');
  const [filterOwner, setFilterOwner] = useState<OwnerName | ''>('');
  const [sortKey, setSortKey] = useState<SortKey>('dueDate');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filtered = useMemo(() => {
    let result = [...tasks];
    if (search) result = result.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()));
    if (filterCategory) result = result.filter(t => t.category === filterCategory);
    if (filterStatus) result = result.filter(t => t.status === filterStatus);
    if (filterOwner) result = result.filter(t => t.owner === filterOwner);
    result.sort((a, b) => {
      const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
      if (sortKey === 'priority') {
        return sortDir === 'asc'
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      const va = a[sortKey] as string;
      const vb = b[sortKey] as string;
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    return result;
  }, [tasks, search, filterCategory, filterStatus, filterOwner, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  }

  function updateTask(id: string, field: keyof Task, value: string) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
    if (selectedTask?.id === id) setSelectedTask(prev => prev ? { ...prev, [field]: value } : prev);
    setEditingCell(null);
  }

  function addComment(taskId: string, text: string) {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: 'Ashleigh',
      text,
      timestamp: new Date().toISOString(),
    };
    setComments(prev => ({ ...prev, [taskId]: [...(prev[taskId] ?? []), newComment] }));
  }

  const colClass = 'px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-gray-700 select-none whitespace-nowrap';

  return (
    <div className="p-8 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Task Tracker</h2>
          <p className="text-gray-600 text-sm mt-1">{filtered.length} of {tasks.length} tasks · Click a row to view details &amp; comments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-48 bg-gray-50 rounded-md border border-gray-200 px-3 py-1.5">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm w-full outline-none text-gray-700 placeholder-gray-400"
          />
          {search && <button onClick={() => setSearch('')}><X size={13} className="text-gray-400" /></button>}
        </div>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value as TaskCategory | '')}
          className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white text-gray-700 outline-none"
        >
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as TaskStatus | '')}
          className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white text-gray-700 outline-none"
        >
          <option value="">All Statuses</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={filterOwner}
          onChange={e => setFilterOwner(e.target.value as OwnerName | '')}
          className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white text-gray-700 outline-none"
        >
          <option value="">All Owners</option>
          {owners.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        {(filterCategory || filterStatus || filterOwner || search) && (
          <button
            onClick={() => { setFilterCategory(''); setFilterStatus(''); setFilterOwner(''); setSearch(''); }}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X size={13} /> Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className={colClass} style={{ width: 70 }} onClick={() => handleSort('name')}>
                  ID <SortIcon field="name" sortKey={sortKey} sortDir={sortDir} />
                </th>
                <th className={colClass} onClick={() => handleSort('name')}>
                  Task <SortIcon field="name" sortKey={sortKey} sortDir={sortDir} />
                </th>
                <th className={colClass} onClick={() => handleSort('category')}>
                  Category <SortIcon field="category" sortKey={sortKey} sortDir={sortDir} />
                </th>
                <th className={colClass} onClick={() => handleSort('owner')}>
                  Owner <SortIcon field="owner" sortKey={sortKey} sortDir={sortDir} />
                </th>
                <th className={colClass} onClick={() => handleSort('status')}>
                  Status <SortIcon field="status" sortKey={sortKey} sortDir={sortDir} />
                </th>
                <th className={colClass} onClick={() => handleSort('priority')}>
                  Priority <SortIcon field="priority" sortKey={sortKey} sortDir={sortDir} />
                </th>
                <th className={colClass} onClick={() => handleSort('dueDate')}>
                  Due Date <SortIcon field="dueDate" sortKey={sortKey} sortDir={sortDir} />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(task => {
                const cc = categoryColors[task.category];
                const sc = statusColors[task.status];
                const pc = priorityColors[task.priority];
                const isSelected = selectedTask?.id === task.id;
                const commentCount = (comments[task.id] ?? []).length;
                return (
                  <tr
                    key={task.id}
                    onClick={() => setSelectedTask(isSelected ? null : task)}
                    className={`transition-colors cursor-pointer ${isSelected ? 'bg-blue-50 border-l-2 border-l-blue-500' : task.status === 'Completed' ? 'bg-green-50/40 hover:bg-green-50/60' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{task.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {task.status === 'Completed' && <CheckCircle2 size={14} className="text-green-500 shrink-0" />}
                        <div className="font-medium text-gray-900 max-w-xs">{task.name}</div>
                      </div>
                      {task.completedDate && (
                        <div className="text-xs text-green-600 mt-0.5 font-mono">Completed {task.completedDate}</div>
                      )}
                      {task.outputFile && (() => {
                        const res = resources.find(r => r.id === task.outputFile);
                        return res ? (
                          <a
                            href={res.filePath ?? '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 mt-0.5"
                          >
                            <ExternalLink size={10} /> VIEW OUTPUT
                          </a>
                        ) : null;
                      })()}
                      {!task.completedDate && !task.outputFile && task.notes && (
                        <div className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{task.notes}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${cc.bg} ${cc.text}`}>{task.category}</span>
                    </td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      {editingCell?.id === task.id && editingCell.field === 'owner' ? (
                        <select
                          autoFocus
                          value={task.owner}
                          onChange={e => updateTask(task.id, 'owner', e.target.value)}
                          onBlur={() => setEditingCell(null)}
                          className="text-xs border border-blue-400 rounded px-1 py-0.5 outline-none"
                        >
                          {owners.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : (
                        <span
                          className="text-sm text-gray-700 cursor-pointer hover:text-blue-600"
                          onClick={() => setEditingCell({ id: task.id, field: 'owner' })}
                        >
                          {task.owner}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      {editingCell?.id === task.id && editingCell.field === 'status' ? (
                        <select
                          autoFocus
                          value={task.status}
                          onChange={e => updateTask(task.id, 'status', e.target.value)}
                          onBlur={() => setEditingCell(null)}
                          className="text-xs border border-blue-400 rounded px-1 py-0.5 outline-none"
                        >
                          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      ) : (
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded cursor-pointer ${sc.bg} ${sc.text}`}
                          onClick={() => setEditingCell({ id: task.id, field: 'status' })}
                        >
                          {task.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      {editingCell?.id === task.id && editingCell.field === 'priority' ? (
                        <select
                          autoFocus
                          value={task.priority}
                          onChange={e => updateTask(task.id, 'priority', e.target.value)}
                          onBlur={() => setEditingCell(null)}
                          className="text-xs border border-blue-400 rounded px-1 py-0.5 outline-none"
                        >
                          {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      ) : (
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded cursor-pointer ${pc.bg} ${pc.text}`}
                          onClick={() => setEditingCell({ id: task.id, field: 'priority' })}
                        >
                          {task.priority}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      {editingCell?.id === task.id && editingCell.field === 'dueDate' ? (
                        <input
                          type="date"
                          autoFocus
                          value={task.dueDate}
                          onChange={e => updateTask(task.id, 'dueDate', e.target.value)}
                          onBlur={() => setEditingCell(null)}
                          className="text-xs border border-blue-400 rounded px-1 py-0.5 outline-none"
                        />
                      ) : (
                        <span
                          className="text-sm text-gray-700 cursor-pointer hover:text-blue-600 font-mono"
                          onClick={() => setEditingCell({ id: task.id, field: 'dueDate' })}
                        >
                          {task.dueDate}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {commentCount > 0 && (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <MessageSquare size={12} />
                          {commentCount}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">No tasks match the current filters.</div>
          )}
        </div>
      </div>

      {/* Task Detail Panel */}
      {selectedTask && (
        <TaskDetailPanel
          task={selectedTask}
          allTasks={tasks}
          comments={comments[selectedTask.id] ?? []}
          onClose={() => setSelectedTask(null)}
          onAddComment={addComment}
        />
      )}

      {/* Add Task Modal */}
      {showAddModal && (
        <AddTaskModal
          onClose={() => setShowAddModal(false)}
          onAdd={(t) => { setTasks(prev => [...prev, t]); setShowAddModal(false); }}
        />
      )}
    </div>
  );
}

function AddTaskModal({ onClose, onAdd }: { onClose: () => void; onAdd: (t: Task) => void }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Operations');
  const [owner, setOwner] = useState<OwnerName>('Ashleigh');
  const [status, setStatus] = useState<TaskStatus>('Not Started');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !dueDate) return;
    onAdd({
      id: `T${String(Date.now()).slice(-4)}`,
      name: name.trim(),
      category,
      owner,
      status,
      priority,
      dueDate,
      description: description.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-gray-900">Add New Task</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Task Name *</label>
            <input
              required
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
              placeholder="e.g. Draft privacy policy"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value as TaskCategory)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Owner</label>
              <select value={owner} onChange={e => setOwner(e.target.value as OwnerName)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                {owners.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                {priorities.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Due Date *</label>
            <input
              required
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 resize-none"
              placeholder="Optional description..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}
