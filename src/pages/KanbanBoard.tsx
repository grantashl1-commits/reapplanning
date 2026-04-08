import { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { tasks as initialTasks, categoryColors, priorityColors, type Task, type TaskStatus } from '../data/reapData';

const ITEM_TYPE = 'TASK_CARD';

const columns: { status: TaskStatus; label: string; color: string; dotColor: string }[] = [
  { status: 'Not Started', label: 'Not Started', color: 'bg-gray-100 text-gray-700', dotColor: 'bg-gray-400' },
  { status: 'In Progress', label: 'In Progress', color: 'bg-blue-50 text-blue-700', dotColor: 'bg-blue-500' },
  { status: 'Blocked', label: 'Blocked', color: 'bg-red-50 text-red-700', dotColor: 'bg-red-500' },
  { status: 'Completed', label: 'Completed', color: 'bg-green-50 text-green-700', dotColor: 'bg-green-500' },
];

interface DragItem {
  id: string;
  fromStatus: TaskStatus;
}

interface TaskCardProps {
  task: Task;
  onMove: (id: string, toStatus: TaskStatus) => void;
}

function TaskCard({ task }: TaskCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: ITEM_TYPE,
    item: { id: task.id, fromStatus: task.status },
    collect: m => ({ isDragging: m.isDragging() }),
  });
  drag(ref);

  const cc = categoryColors[task.category];
  const pc = priorityColors[task.priority];

  return (
    <div
      ref={ref}
      className={`bg-white rounded-lg border border-gray-200 p-3 cursor-grab active:cursor-grabbing shadow-sm transition-opacity ${isDragging ? 'opacity-40' : 'opacity-100'}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-mono text-gray-400">{task.id}</span>
        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${pc.bg} ${pc.text} shrink-0`}>{task.priority}</span>
      </div>
      <div className="text-sm font-medium text-gray-900 mb-2 leading-snug">{task.name}</div>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${cc.bg} ${cc.text}`}>{task.category}</span>
        <span className="text-xs text-gray-500">{task.owner}</span>
      </div>
      <div className="text-xs text-gray-400 mt-1.5">Due {task.dueDate}</div>
    </div>
  );
}

interface ColumnProps {
  status: TaskStatus;
  label: string;
  color: string;
  dotColor: string;
  tasks: Task[];
  onMove: (id: string, toStatus: TaskStatus) => void;
}

function KanbanColumn({ status, label, color, dotColor, tasks, onMove }: ColumnProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: ITEM_TYPE,
    drop: (item) => { if (item.fromStatus !== status) onMove(item.id, status); },
    collect: m => ({ isOver: m.isOver() }),
  });
  drop(ref);

  return (
    <div
      ref={ref}
      className={`flex flex-col rounded-xl border border-gray-200 overflow-hidden transition-colors ${isOver ? 'border-blue-400 bg-blue-50/50' : 'bg-gray-50'}`}
      style={{ minHeight: 400 }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dotColor}`} />
          <span className="text-sm font-semibold text-gray-900">{label}</span>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${color}`}>{tasks.length}</span>
      </div>
      <div className="flex-1 p-3 space-y-2 overflow-y-auto" style={{ maxHeight: 600 }}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onMove={onMove} />
        ))}
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-20 text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filterCategory, setFilterCategory] = useState('');

  const filtered = filterCategory ? tasks.filter(t => t.category === filterCategory) : tasks;

  function handleMove(id: string, toStatus: TaskStatus) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: toStatus } : t));
  }

  const categories = ['Legal', 'Product Build', 'Marketing', 'Partnerships', 'Operations', 'Launch'];

  return (
    <div className="p-8 space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kanban Board</h2>
          <p className="text-gray-600 text-sm mt-1">Drag tasks between columns to update status</p>
        </div>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white text-gray-700 outline-none"
        >
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map(col => (
          <KanbanColumn
            key={col.status}
            status={col.status}
            label={col.label}
            color={col.color}
            dotColor={col.dotColor}
            tasks={filtered.filter(t => t.status === col.status)}
            onMove={handleMove}
          />
        ))}
      </div>
    </div>
  );
}
