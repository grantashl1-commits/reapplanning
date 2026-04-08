import { LayoutDashboard, CheckSquare, DollarSign, AlertTriangle, FileText, Target, Book, Radio, HeartPulse } from 'lucide-react';

interface NavigationSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function NavigationSidebar({ activeView, setActiveView }: NavigationSidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks & Actions', icon: CheckSquare },
    { id: 'budget', label: 'Budget Breakdown', icon: DollarSign },
    { id: 'risks', label: 'Risk Analysis', icon: AlertTriangle },
    { id: 'compliance', label: 'Legal & Compliance', icon: FileText },
    { id: 'strategy', label: 'Strategy & Future', icon: Target },
    { id: 'resources', label: 'Resources & Policies', icon: Book },
    { id: 'media', label: 'Media & Communications', icon: Radio },
    { id: 'welfare', label: 'Welfare & Disputes', icon: HeartPulse }
  ];

  return (
    <nav className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}