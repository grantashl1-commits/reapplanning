import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { tasks, categoryColors, type Task, type TaskCategory } from '../data/reapData';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

interface DayCell {
  day: number | null;
  tasks: Task[];
}

export function CalendarView() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(9); // October by default (season launch)
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(null);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(null);
  }

  const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
  const monthTasks = tasks.filter(t => t.dueDate.startsWith(monthStr));

  const daysInMonth = getDaysInMonth(year, month);
  const firstDow = getFirstDayOfWeek(year, month);

  // Build grid (6 weeks × 7 days)
  const cells: DayCell[] = [];
  for (let i = 0; i < firstDow; i++) cells.push({ day: null, tasks: [] });
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${monthStr}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, tasks: tasks.filter(t => t.dueDate === dateStr) });
  }
  while (cells.length < 42) cells.push({ day: null, tasks: [] });

  const selectedTasks = selectedDay !== null
    ? tasks.filter(t => t.dueDate === `${monthStr}-${String(selectedDay).padStart(2, '0')}`)
    : null;

  // Category dot colors (Tailwind bg classes derived from categoryColors)
  const dotMap: Record<TaskCategory, string> = {
    Legal: 'bg-red-500',
    'Product Build': 'bg-blue-500',
    Marketing: 'bg-purple-500',
    Partnerships: 'bg-yellow-500',
    Operations: 'bg-green-500',
    Launch: 'bg-orange-500',
  };

  return (
    <div className="p-8 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Calendar View</h2>
        <p className="text-gray-600 text-sm mt-1">Task due dates visualised by month</p>
      </div>

      {/* Month nav */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <button onClick={prevMonth} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500">
            <ChevronLeft size={18} />
          </button>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{MONTH_NAMES[month]} {year}</div>
            <div className="text-xs text-gray-500">{monthTasks.length} tasks due this month</div>
          </div>
          <button onClick={nextMonth} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAY_NAMES.map(d => (
            <div key={d} className="py-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wide">
              {d}
            </div>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7">
          {cells.map((cell, idx) => {
            const isSelected = cell.day === selectedDay;
            const isToday = cell.day !== null && year === 2026 && month === 3 && cell.day === 9; // Apr 9 2026
            return (
              <div
                key={idx}
                onClick={() => cell.day && setSelectedDay(cell.day === selectedDay ? null : cell.day)}
                className={`min-h-[72px] p-2 border-r border-b border-gray-100 last:border-r-0 transition-colors ${
                  cell.day ? 'cursor-pointer hover:bg-blue-50/50' : 'bg-gray-50/50'
                } ${isSelected ? 'bg-blue-50 ring-1 ring-inset ring-blue-300' : ''}`}
              >
                {cell.day && (
                  <>
                    <div className={`text-sm font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                      isToday ? 'bg-blue-600 text-white' : 'text-gray-700'
                    }`}>
                      {cell.day}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cell.tasks.slice(0, 3).map(t => (
                        <span key={t.id} className={`w-2 h-2 rounded-full ${dotMap[t.category]}`} title={t.name} />
                      ))}
                      {cell.tasks.length > 3 && (
                        <span className="text-xs text-gray-400">+{cell.tasks.length - 3}</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {(Object.entries(dotMap) as [TaskCategory, string][]).map(([cat, dot]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
            <span className="text-xs text-gray-600">{cat}</span>
          </div>
        ))}
      </div>

      {/* Selected day tasks */}
      {selectedTasks && selectedTasks.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-base font-bold text-gray-900 mb-3">
            Tasks due {MONTH_NAMES[month]} {selectedDay}, {year}
          </h3>
          <div className="space-y-2">
            {selectedTasks.map(t => {
              const cc = categoryColors[t.category];
              return (
                <div key={t.id} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotMap[t.category]}`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{t.owner} · {t.description?.slice(0, 100)}{t.description?.length > 100 ? '…' : ''}</div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded shrink-0 ${cc.bg} ${cc.text}`}>{t.category}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedTasks && selectedTasks.length === 0 && selectedDay && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center text-sm text-gray-400">
          No tasks due on {MONTH_NAMES[month]} {selectedDay}.
        </div>
      )}
    </div>
  );
}
