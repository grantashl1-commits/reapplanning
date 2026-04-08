import { NavLink } from 'react-router';
import {
  LayoutDashboard, CheckSquare, Columns, CalendarDays, TrendingUp,
  BookOpen, Image, Users, BarChart2, AlertTriangle, FileText,
  Target, Radio, HeartPulse, ChevronLeft, ChevronRight, Flame, X, GitMerge
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'MAIN',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'PLANNING',
    items: [
      { path: '/tasks', label: 'Task Tracker', icon: CheckSquare },
      { path: '/kanban', label: 'Kanban Board', icon: Columns },
      { path: '/calendar', label: 'Calendar', icon: CalendarDays },
      { path: '/critical-path', label: 'Critical Path', icon: GitMerge },
      { path: '/seasons', label: 'Season Tracker', icon: TrendingUp },
    ],
  },
  {
    label: 'DOCUMENTATION',
    items: [
      { path: '/docs', label: 'Documentation Hub', icon: FileText },
      { path: '/resources', label: 'Resource Library', icon: BookOpen },
      { path: '/media-library', label: 'Media Library', icon: Image },
    ],
  },
  {
    label: 'TEAM',
    items: [
      { path: '/team', label: 'Team', icon: Users },
    ],
  },
  {
    label: 'BOARD REPORTS',
    items: [
      { path: '/overview', label: 'Overview', icon: BarChart2 },
      { path: '/budget', label: 'Budget', icon: BarChart2 },
      { path: '/risks', label: 'Risk Analysis', icon: AlertTriangle },
      { path: '/compliance', label: 'Compliance', icon: FileText },
      { path: '/strategy', label: 'Strategy', icon: Target },
      { path: '/comms', label: 'Media & Comms', icon: Radio },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { path: '/welfare', label: 'Welfare Register', icon: HeartPulse },
      { path: '/prize-draws', label: 'Prize Draw Records', icon: Flame },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const sidebarContent = (
    <div className={`h-full flex flex-col bg-white border-r border-gray-200 transition-all duration-200 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo */}
      <div className={`flex items-center border-b border-gray-200 ${collapsed ? 'justify-center px-0 py-5' : 'justify-between px-5 py-5'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-red-500 shrink-0" />
            <div>
              <div className="text-sm font-bold text-gray-900 leading-none">SURVIVE</div>
              <div className="text-sm font-bold text-gray-900 leading-none">THE REAP</div>
            </div>
          </div>
        )}
        {collapsed && <Flame size={20} className="text-red-500" />}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <div className="px-5 mb-1">
                <span className="text-xs font-semibold text-gray-400 tracking-wider">{group.label}</span>
              </div>
            )}
            {collapsed && <div className="mx-3 mb-1 border-t border-gray-100" />}
            <div className="space-y-0.5 px-2">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    title={collapsed ? item.label : undefined}
                    onClick={onMobileClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                        collapsed ? 'justify-center' : ''
                      } ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <Icon size={18} className="shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-gray-200 p-2">
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors text-sm ${collapsed ? 'justify-center' : ''}`}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block h-full shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={onMobileClose} />
          <div className="relative z-10 h-full">
            <div className="absolute top-3 right-3 z-20">
              <button
                onClick={onMobileClose}
                className="p-1.5 rounded-md bg-white border border-gray-200 text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
            <div className="h-full flex flex-col bg-white border-r border-gray-200 w-64">
              <div className="flex items-center gap-2 px-5 py-5 border-b border-gray-200">
                <Flame size={20} className="text-red-500 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-gray-900 leading-none">SURVIVE</div>
                  <div className="text-sm font-bold text-gray-900 leading-none">THE REAP</div>
                </div>
              </div>
              <nav className="flex-1 overflow-y-auto py-4">
                {navGroups.map((group) => (
                  <div key={group.label} className="mb-4">
                    <div className="px-5 mb-1">
                      <span className="text-xs font-semibold text-gray-400 tracking-wider">{group.label}</span>
                    </div>
                    <div className="space-y-0.5 px-2">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onMobileClose}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                                isActive
                                  ? 'bg-blue-50 text-blue-700 font-semibold'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`
                            }
                          >
                            <Icon size={18} className="shrink-0" />
                            <span>{item.label}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
