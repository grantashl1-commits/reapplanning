import { useState } from 'react';
import { Upload, Search, X, FileImage, FileText, Image } from 'lucide-react';
import { mediaAssets, type MediaAsset } from '../data/reapData';

type AssetType = MediaAsset['type'] | '';

const typeConfig: Record<MediaAsset['type'], { bg: string; text: string; icon: React.ElementType }> = {
  Logo: { bg: 'bg-purple-50', text: 'text-purple-700', icon: Image },
  Marketing: { bg: 'bg-blue-50', text: 'text-blue-700', icon: FileImage },
  'UI Screenshot': { bg: 'bg-green-50', text: 'text-green-700', icon: FileImage },
  'Brand Asset': { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: FileImage },
  Document: { bg: 'bg-gray-100', text: 'text-gray-700', icon: FileText },
};

const formatConfig: Record<string, string> = {
  SVG: 'bg-orange-50 text-orange-700',
  PNG: 'bg-blue-50 text-blue-700',
  PDF: 'bg-red-50 text-red-700',
  JPG: 'bg-green-50 text-green-700',
};

function AssetCard({ asset }: { asset: MediaAsset }) {
  const tc = typeConfig[asset.type];
  const Icon = tc.icon;
  const fmtClass = formatConfig[asset.format] || 'bg-gray-100 text-gray-600';

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:border-gray-300 transition-colors">
      {/* Preview area */}
      <div className="bg-gray-50 h-32 flex items-center justify-center border-b border-gray-100">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${tc.bg}`}>
          <Icon size={28} className={tc.text} />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="text-sm font-semibold text-gray-900 leading-snug">{asset.name}</h4>
          <span className={`text-xs font-bold px-1.5 py-0.5 rounded font-mono shrink-0 ${fmtClass}`}>{asset.format}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${tc.bg} ${tc.text}`}>{asset.type}</span>
          <span className="text-xs text-gray-400">{asset.size}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {asset.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{tag}</span>
          ))}
        </div>

        <div className="text-xs text-gray-400">{asset.uploadDate}</div>
      </div>
    </div>
  );
}

export function MediaLibrary() {
  const [assets, setAssets] = useState<MediaAsset[]>(mediaAssets);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<AssetType>('');
  const [showUpload, setShowUpload] = useState(false);

  const filtered = assets.filter(a => {
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.tags.some(t => t.includes(search.toLowerCase()));
    const matchType = !filterType || a.type === filterType;
    return matchSearch && matchType;
  });

  const types: MediaAsset['type'][] = ['Logo', 'Marketing', 'UI Screenshot', 'Brand Asset', 'Document'];

  return (
    <div className="p-8 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Media Library</h2>
          <p className="text-gray-600 text-sm mt-1">{filtered.length} assets</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <Upload size={15} /> Upload Asset
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-48">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm w-full outline-none text-gray-700 placeholder-gray-400"
          />
          {search && <button onClick={() => setSearch('')}><X size={13} className="text-gray-400" /></button>}
        </div>
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value as AssetType)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none"
        >
          <option value="">All Types</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Type summary */}
      <div className="flex flex-wrap gap-2">
        {types.map(type => {
          const tc = typeConfig[type];
          const count = assets.filter(a => a.type === type).length;
          return (
            <button
              key={type}
              onClick={() => setFilterType(filterType === type ? '' : type)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                filterType === type
                  ? `${tc.bg} ${tc.text} border-current`
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              <span>{type}</span>
              <span className={`rounded-full px-1.5 py-0.5 text-xs ${filterType === type ? 'bg-white/50' : 'bg-gray-100'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map(asset => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-400 text-sm">No assets match your search.</div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUpload={(a) => { setAssets(prev => [...prev, a]); setShowUpload(false); }}
        />
      )}
    </div>
  );
}

function UploadModal({ onClose, onUpload }: { onClose: () => void; onUpload: (a: MediaAsset) => void }) {
  const [name, setName] = useState('');
  const [type, setType] = useState<MediaAsset['type']>('Brand Asset');
  const [format, setFormat] = useState('PNG');
  const [tags, setTags] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onUpload({
      id: `M${String(Date.now()).slice(-4)}`,
      name: name.trim(),
      type,
      format,
      uploadDate: '2026-04-09',
      size: 'Unknown',
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-gray-900">Upload Asset</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Asset Name *</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" placeholder="e.g. Season 2 Launch Poster" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Type</label>
              <select value={type} onChange={e => setType(e.target.value as MediaAsset['type'])} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                {(['Logo', 'Marketing', 'UI Screenshot', 'Brand Asset', 'Document'] as MediaAsset['type'][]).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Format</label>
              <select value={format} onChange={e => setFormat(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                {['PNG', 'SVG', 'JPG', 'PDF', 'MP4', 'GIF'].map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Tags (comma-separated)</label>
            <input type="text" value={tags} onChange={e => setTags(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" placeholder="social, launch, brand" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
}
