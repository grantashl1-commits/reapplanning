import { useState } from 'react';
import { Search, Upload, X, ExternalLink, Clock, CheckCircle } from 'lucide-react';
import { resources, type Resource } from '../data/reapData';
import { ResourcesView } from '../app/components/ResourcesView';

const statusConfig: Record<Resource['status'], { bg: string; text: string }> = {
  Draft: { bg: 'bg-gray-100', text: 'text-gray-700' },
  'Draft — Awaiting Legal Review': { bg: 'bg-amber-50', text: 'text-amber-700' },
  'Under Review': { bg: 'bg-blue-50', text: 'text-blue-700' },
  Approved: { bg: 'bg-green-50', text: 'text-green-700' },
  Final: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  Complete: { bg: 'bg-green-50', text: 'text-green-700' },
};

const categoryConfig: Record<Resource['category'], { bg: string; text: string }> = {
  Legal: { bg: 'bg-red-50', text: 'text-red-700' },
  Operations: { bg: 'bg-green-50', text: 'text-green-700' },
  Marketing: { bg: 'bg-purple-50', text: 'text-purple-700' },
  Governance: { bg: 'bg-blue-50', text: 'text-blue-700' },
  Product: { bg: 'bg-orange-50', text: 'text-orange-700' },
  Technical: { bg: 'bg-cyan-50', text: 'text-cyan-700' },
  'Product Copy': { bg: 'bg-pink-50', text: 'text-pink-700' },
};

const typeConfig: Record<Resource['type'], string> = {
  Policy: 'bg-gray-100 text-gray-600',
  Agreement: 'bg-purple-50 text-purple-600',
  Strategy: 'bg-blue-50 text-blue-600',
  Report: 'bg-green-50 text-green-600',
  Protocol: 'bg-orange-50 text-orange-600',
  Framework: 'bg-yellow-50 text-yellow-600',
};

function ResourceCard({ resource }: { resource: Resource }) {
  const sc = statusConfig[resource.status];
  const cc = categoryConfig[resource.category];
  const tc = typeConfig[resource.type];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:border-gray-300 transition-colors flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 leading-snug">{resource.title}</h4>
          <div className="text-xs text-gray-500 mt-0.5">{resource.owner} · {resource.dateCreated}</div>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded shrink-0 ${sc.bg} ${sc.text}`}>
          {resource.status === 'Complete' ? (
            <span className="inline-flex items-center gap-1">
              <CheckCircle size={11} />
              Complete
            </span>
          ) : (
            resource.status
          )}
        </span>
      </div>

      <p className="text-xs text-gray-600 leading-relaxed mb-3 flex-1">{resource.description}</p>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${cc.bg} ${cc.text}`}>{resource.category}</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${tc}`}>{resource.type}</span>
        </div>

        {resource.filePath ? (
          <a
            href={resource.filePath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0"
          >
            <ExternalLink size={11} />
            VIEW
          </a>
        ) : (
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-gray-100 text-gray-400 cursor-not-allowed shrink-0">
            <Clock size={11} />
            PENDING
          </span>
        )}
      </div>
    </div>
  );
}

const allCategories: Resource['category'][] = ['Legal', 'Operations', 'Marketing', 'Governance', 'Product', 'Technical', 'Product Copy'];
const allStatuses: Resource['status'][] = ['Draft', 'Draft — Awaiting Legal Review', 'Under Review', 'Approved', 'Final', 'Complete'];

export function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<Resource['category'] | ''>('');
  const [filterStatus, setFilterStatus] = useState<Resource['status'] | ''>('');

  const filtered = resources.filter(r => {
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCategory || r.category === filterCategory;
    const matchStatus = !filterStatus || r.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  const withFile = resources.filter(r => r.filePath).length;
  const pending = resources.filter(r => !r.filePath).length;

  return (
    <div className="p-8 space-y-8">
      {/* Document library */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resources & Policies</h2>
            <p className="text-gray-600 text-sm mt-1">
              {filtered.length} of {resources.length} documents · {withFile} with files · {pending} pending
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
            <Upload size={15} /> Upload Document
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-48">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-sm w-full outline-none text-gray-700 placeholder-gray-400"
            />
            {search && <button onClick={() => setSearch('')}><X size={13} className="text-gray-400" /></button>}
          </div>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value as Resource['category'] | '')}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none"
          >
            <option value="">All Categories</option>
            {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as Resource['status'] | '')}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none"
          >
            <option value="">All Statuses</option>
            {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {(filterCategory || filterStatus || search) && (
            <button
              onClick={() => { setFilterCategory(''); setFilterStatus(''); setSearch(''); }}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X size={13} /> Clear
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(r => <ResourceCard key={r.id} resource={r} />)}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-400 text-sm">No documents match your search.</div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Full planning documents */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Planning Documents</h3>
        <p className="text-gray-600 text-sm mb-6">Full text of key planning and legal documents</p>
        <ResourcesView />
      </div>
    </div>
  );
}
