export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SURVIVE THE REAP</h1>
          <p className="text-sm text-gray-500 italic mt-1">Classification: Confidential | April 2026</p>
          <p className="text-sm text-gray-600 mt-1">Sport Waikato — Board Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-700">Season 1 Launch</div>
            <div className="text-2xl font-bold text-blue-600">1 Nov 2026</div>
          </div>
        </div>
      </div>
    </header>
  );
}