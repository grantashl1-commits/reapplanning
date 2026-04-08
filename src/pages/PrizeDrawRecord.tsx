import { useState } from 'react';
import { Save, Plus, Edit2, X, CheckCircle } from 'lucide-react';

interface DrawRecord {
  id: string;
  drawNumber: number;
  drawName: string;
  season: number;
  timestamp: string;
  eligiblePoolSize: number;
  winnerId: string;
  winnerName: string;
  prizeAmount: number;
  randomisationMethod: string;
  paymentStatus: 'pending' | 'issued' | 'confirmed';
  notes: string;
}

const initialRecords: DrawRecord[] = [
  {
    id: 'draw-s1-1',
    drawNumber: 1,
    drawName: 'Week 1 Survivor',
    season: 1,
    timestamp: new Date('2026-11-08 00:15').toISOString(),
    eligiblePoolSize: 1098,
    winnerId: 'P004521',
    winnerName: 'Sarah M.',
    prizeAmount: 666,
    randomisationMethod: 'Cryptographically secure random (CSPRNG)',
    paymentStatus: 'confirmed',
    notes: 'Cheque SW-2026-001847 delivered 17 Nov 2026',
  },
];

export function PrizeDrawRecord() {
  const [records, setRecords] = useState<DrawRecord[]>(initialRecords);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<DrawRecord>>({
    drawNumber: 2,
    drawName: 'Friday the 13th',
    season: 1,
    prizeAmount: 666,
    randomisationMethod: 'Cryptographically secure random (CSPRNG)',
    paymentStatus: 'pending',
  });

  const handleInputChange = (field: keyof DrawRecord, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.drawNumber || !formData.winnerName) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      setRecords(records.map(r => r.id === editingId ? { ...formData, id: editingId } as DrawRecord : r));
      setEditingId(null);
    } else {
      const newRecord: DrawRecord = {
        id: `draw-s${formData.season}-${formData.drawNumber}`,
        timestamp: new Date().toISOString(),
        ...formData,
      } as DrawRecord;
      setRecords([...records, newRecord]);
    }

    setShowForm(false);
    setFormData({
      drawNumber: 2,
      drawName: '',
      season: 1,
      prizeAmount: 666,
      randomisationMethod: 'Cryptographically secure random (CSPRNG)',
      paymentStatus: 'pending',
    });
  };

  const handleEdit = (record: DrawRecord) => {
    setFormData(record);
    setEditingId(record.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this draw record?')) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      drawNumber: 2,
      drawName: '',
      season: 1,
      prizeAmount: 666,
      randomisationMethod: 'Cryptographically secure random (CSPRNG)',
      paymentStatus: 'pending',
    });
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prize Draw Records</h1>
          <p className="text-gray-600 mt-2">
            Maintain audit trail for all REAP prize draws. {records.length} draw(s) recorded.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} /> New Draw Record
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingId ? 'Edit Draw Record' : 'New Draw Record'}
            </h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Draw Identity */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Draw Number *</label>
              <input
                type="number"
                value={formData.drawNumber || ''}
                onChange={e => handleInputChange('drawNumber', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1-7"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Draw Name *</label>
              <input
                type="text"
                value={formData.drawName || ''}
                onChange={e => handleInputChange('drawName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Week 1 Survivor"
              />
            </div>

            {/* Season & Timestamp */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Season *</label>
              <input
                type="number"
                value={formData.season || ''}
                onChange={e => handleInputChange('season', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Draw Timestamp (NZST)</label>
              <input
                type="datetime-local"
                value={formData.timestamp ? new Date(formData.timestamp).toISOString().slice(0, 16) : ''}
                onChange={e => handleInputChange('timestamp', new Date(e.target.value).toISOString())}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Eligible Pool */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Eligible Pool Size *</label>
              <input
                type="number"
                value={formData.eligiblePoolSize || ''}
                onChange={e => handleInputChange('eligiblePoolSize', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 1098"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Randomisation Method *</label>
              <select
                value={formData.randomisationMethod || ''}
                onChange={e => handleInputChange('randomisationMethod', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select method</option>
                <option value="Cryptographically secure random (CSPRNG)">Cryptographically secure random (CSPRNG)</option>
                <option value="Third-party randomisation service">Third-party randomisation service</option>
                <option value="Python secrets module">Python secrets module</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Winner Details */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Winner ID *</label>
              <input
                type="text"
                value={formData.winnerId || ''}
                onChange={e => handleInputChange('winnerId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., P004521"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Winner Name *</label>
              <input
                type="text"
                value={formData.winnerName || ''}
                onChange={e => handleInputChange('winnerName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Sarah M."
              />
            </div>

            {/* Prize & Payment */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Prize Amount (NZD) *</label>
              <input
                type="number"
                value={formData.prizeAmount || ''}
                onChange={e => handleInputChange('prizeAmount', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="666"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Payment Status</label>
              <select
                value={formData.paymentStatus || ''}
                onChange={e => handleInputChange('paymentStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="issued">Issued</option>
                <option value="confirmed">Confirmed</option>
              </select>
            </div>

            {/* Notes */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-1">Notes & Documentation</label>
              <textarea
                value={formData.notes || ''}
                onChange={e => handleInputChange('notes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Cheque #, transaction ID, or other relevant details"
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Save size={16} /> Save Record
            </button>
          </div>
        </div>
      )}

      {/* Records Table */}
      {!showForm && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {records.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-sm">No draw records yet. Create one to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Draw</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Season</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Timestamp (NZST)</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Eligible Pool</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Winner</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Prize</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Payment</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, idx) => (
                    <tr key={record.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        #{record.drawNumber} {record.drawName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">Season {record.season}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(record.timestamp).toLocaleString('en-NZ', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.eligiblePoolSize.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {record.winnerId} / {record.winnerName}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">NZD ${record.prizeAmount}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            record.paymentStatus === 'confirmed'
                              ? 'bg-green-50 text-green-700'
                              : record.paymentStatus === 'issued'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {record.paymentStatus === 'confirmed' && <CheckCircle size={12} className="inline mr-1" />}
                          {record.paymentStatus.charAt(0).toUpperCase() + record.paymentStatus.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(record)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit record"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete record"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Compliance Checklist */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-sm font-bold text-blue-900 mb-3">Compliance Verification Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <label className="flex items-center gap-2 text-blue-800">
            <input type="checkbox" className="rounded" /> Eligible pool accurately reflects season status
          </label>
          <label className="flex items-center gap-2 text-blue-800">
            <input type="checkbox" className="rounded" /> Randomisation method documented and reproducible
          </label>
          <label className="flex items-center gap-2 text-blue-800">
            <input type="checkbox" className="rounded" /> Winner meets all eligibility criteria (age, residency, payment)
          </label>
          <label className="flex items-center gap-2 text-blue-800">
            <input type="checkbox" className="rounded" /> Prize funding confirmed available in budget
          </label>
          <label className="flex items-center gap-2 text-blue-800">
            <input type="checkbox" className="rounded" /> No conflicts of interest identified
          </label>
          <label className="flex items-center gap-2 text-blue-800">
            <input type="checkbox" className="rounded" /> Privacy Act & Gambling Act compliance confirmed
          </label>
        </div>
      </div>
    </div>
  );
}
