import { useState } from 'react';
import { resources, type Resource } from '../data/reapData';
import { FileText, BookOpen, Zap, Users, BarChart2, ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ResourceCollection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  resourceIds: string[];
}

const collections: ResourceCollection[] = [
  {
    id: 'legal-signoff',
    title: 'Legal Sign-Off Bundle',
    description: 'All required legal documents for launch approval',
    icon: FileText,
    color: 'bg-red-50 text-red-700',
    resourceIds: ['R026', 'R028', 'R029', 'R027'],
  },
  {
    id: 'dia-kit',
    title: 'DIA Enquiry Kit',
    description: 'Documents needed for Department of Internal Affairs submission',
    icon: BookOpen,
    color: 'bg-blue-50 text-blue-700',
    resourceIds: ['R043', 'R024', 'R005'],
  },
  {
    id: 'launch-pack',
    title: 'Launch Campaign Pack',
    description: 'Marketing and participant messaging for Season 1 launch',
    icon: Zap,
    color: 'bg-purple-50 text-purple-700',
    resourceIds: ['R030', 'R031', 'R032', 'R033', 'R034', 'R035', 'R036', 'R037'],
  },
  {
    id: 'tech-specs',
    title: 'Technical Implementation',
    description: 'Engineering specifications for the REAP platform',
    icon: Zap,
    color: 'bg-cyan-50 text-cyan-700',
    resourceIds: ['R038', 'R039', 'R040', 'R041'],
  },
  {
    id: 'governance',
    title: 'Governance Package',
    description: 'Board updates, welfare protocols, and equity policy',
    icon: Users,
    color: 'bg-green-50 text-green-700',
    resourceIds: ['R042', 'R044', 'R045', 'R043'],
  },
  {
    id: 'reporting',
    title: 'Reporting Suite',
    description: 'Board reports, financial models, and compliance audits',
    icon: BarChart2,
    color: 'bg-orange-50 text-orange-700',
    resourceIds: ['R006', 'R012', 'R014', 'R023'],
  },
];

function CollectionCard({ collection }: { collection: ResourceCollection }) {
  const Icon = collection.icon;
  const collectionResources = resources.filter(r => collection.resourceIds.includes(r.id));
  const complete = collectionResources.filter(r => r.status === 'Complete' || r.status === 'Final' || r.status === 'Approved').length;
  const percentage = Math.round((complete / collectionResources.length) * 100);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:border-gray-300 hover:shadow-md transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-3 rounded-lg ${collection.color}`}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{collection.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{collection.description}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-500">{complete} of {collectionResources.length} complete</span>
          <span className="text-xs font-bold text-gray-900">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${percentage}%` }} />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {collectionResources.slice(0, 3).map(doc => (
          <div key={doc.id} className="flex items-center justify-between text-xs">
            <span className="text-gray-600 truncate pr-2">{doc.title}</span>
            {doc.status === 'Complete' || doc.status === 'Final' || doc.status === 'Approved' ? (
              <CheckCircle size={14} className="text-green-600 shrink-0" />
            ) : doc.status === 'Draft' ? (
              <Clock size={14} className="text-gray-400 shrink-0" />
            ) : (
              <AlertCircle size={14} className="text-amber-500 shrink-0" />
            )}
          </div>
        ))}
        {collectionResources.length > 3 && (
          <div className="text-xs text-gray-500 pt-2">+{collectionResources.length - 3} more</div>
        )}
      </div>

      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">
        <BookOpen size={14} /> View Collection
      </button>
    </div>
  );
}

function CriticalPathWidget() {
  const criticalDocs = resources.filter(r =>
    ['R026', 'R028', 'R029', 'R027', 'R043', 'R044'].includes(r.id)
  );

  const statusBreakdown = {
    complete: criticalDocs.filter(r => r.status === 'Complete' || r.status === 'Final').length,
    review: criticalDocs.filter(r => r.status === 'Under Review' || r.status === 'Draft — Awaiting Legal Review').length,
    pending: criticalDocs.filter(r => r.status === 'Draft').length,
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Critical Path Status</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <div className="text-2xl font-bold text-green-600">{statusBreakdown.complete}</div>
          <div className="text-xs text-gray-600 mt-1">Complete / Final</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <div className="text-2xl font-bold text-amber-600">{statusBreakdown.review}</div>
          <div className="text-xs text-gray-600 mt-1">Under Review</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <div className="text-2xl font-bold text-gray-600">{statusBreakdown.pending}</div>
          <div className="text-xs text-gray-600 mt-1">Draft</div>
        </div>
      </div>
      <p className="text-sm text-gray-700">
        {statusBreakdown.complete === 6
          ? '✓ All legal and governance docs ready for review'
          : `${6 - statusBreakdown.complete} docs still in progress`}
      </p>
    </div>
  );
}

function RecentActivityWidget() {
  const recent = resources
    .filter(r => r.dateCreated === '2026-04-09')
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Additions</h3>
      <div className="space-y-3">
        {recent.map(doc => (
          <div key={doc.id} className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
            <div>
              <div className="text-sm font-semibold text-gray-900">{doc.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{doc.category}</div>
            </div>
            {doc.filePath && (
              <a
                href={doc.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 shrink-0"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DocumentationHub() {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const selected = collections.find(c => c.id === selectedCollection);
  const selectedResources = selected ? resources.filter(r => selected.resourceIds.includes(r.id)) : [];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Documentation Hub</h1>
        <p className="text-gray-600 mt-2">
          {resources.length} documents organized by workflow. {resources.filter(r => r.status === 'Complete' || r.status === 'Final' || r.status === 'Approved').length} complete.
        </p>
      </div>

      {/* Critical Path and Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CriticalPathWidget />
        <RecentActivityWidget />
      </div>

      {/* Collections Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Collections & Workflows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map(collection => (
            <div key={collection.id} onClick={() => setSelectedCollection(collection.id)} className="cursor-pointer">
              <CollectionCard collection={collection} />
            </div>
          ))}
        </div>
      </div>

      {/* Selected Collection Details */}
      {selected && (
        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selected.title}</h2>
              <p className="text-gray-600 mt-2">{selected.description}</p>
            </div>
            <button
              onClick={() => setSelectedCollection(null)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedResources.map(doc => (
              <div key={doc.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{doc.title}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded whitespace-nowrap ${
                    doc.status === 'Complete' ? 'bg-green-50 text-green-700' :
                    doc.status === 'Final' ? 'bg-emerald-50 text-emerald-700' :
                    doc.status === 'Approved' ? 'bg-green-50 text-green-700' :
                    doc.status === 'Under Review' ? 'bg-blue-50 text-blue-700' :
                    'bg-gray-50 text-gray-700'
                  }`}>
                    {doc.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3">{doc.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{doc.owner}</span>
                  {doc.filePath ? (
                    <a
                      href={doc.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <ExternalLink size={12} /> View
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs">Pending</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
