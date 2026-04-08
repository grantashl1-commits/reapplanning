import { useState } from 'react';
import { Search, Plus, Download, X, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { welfareIncidents, type WelfareIncident } from '../data/reapData';

const severityConfig = {
  Low: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  Medium: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  High: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
  Critical: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-600' },
};

const statusConfig = {
  Open: { bg: 'bg-blue-50', text: 'text-blue-700' },
  Resolved: { bg: 'bg-green-50', text: 'text-green-700' },
  Escalated: { bg: 'bg-red-50', text: 'text-red-700' },
};

function CheckIcon({ checked }: { checked: boolean }) {
  return (
    <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-xs font-bold ${checked ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
      {checked ? '✓' : '–'}
    </span>
  );
}

function IncidentRow({ incident }: { incident: WelfareIncident }) {
  const [expanded, setExpanded] = useState(false);
  const sc = severityConfig[incident.severityLevel];
  const statusC = statusConfig[incident.status];

  return (
    <>
      <tr
        className="hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={() => setExpanded(e => !e)}
      >
        <td className="px-4 py-3 font-mono text-xs text-gray-500">{incident.id}</td>
        <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
          {new Date(incident.dateTime).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' })}
        </td>
        <td className="px-4 py-3 font-mono text-xs text-gray-600">{incident.participantId}</td>
        <td className="px-4 py-3">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1 w-fit ${sc.bg} ${sc.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
            {incident.severityLevel}
          </span>
        </td>
        <td className="px-4 py-3 text-sm text-gray-700 max-w-xs">
          <div className="truncate">{incident.natureOfContact}</div>
        </td>
        <td className="px-4 py-3">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${statusC.bg} ${statusC.text}`}>{incident.status}</span>
        </td>
        <td className="px-4 py-3 text-center">
          <CheckIcon checked={incident.escalatedToCEO} />
        </td>
        <td className="px-4 py-3 text-center">
          <CheckIcon checked={incident.boardNotified} />
        </td>
        <td className="px-4 py-3">
          <button className="text-gray-400 hover:text-gray-600">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-blue-50/40">
          <td colSpan={9} className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold text-gray-700 mb-1">Nature of Contact</div>
                <p className="text-gray-600">{incident.natureOfContact}</p>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1">Response Taken</div>
                <p className="text-gray-600">{incident.responseTaken}</p>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1">Outcome</div>
                <p className="text-gray-600">{incident.outcome}</p>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1">Follow-Up Actions</div>
                <p className="text-gray-600">{incident.followUpActions}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <CheckIcon checked={incident.escalatedToCEO} />
                  <span className="text-gray-600 text-xs">CEO Escalated</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckIcon checked={incident.boardNotified} />
                  <span className="text-gray-600 text-xs">Board Notified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckIcon checked={incident.legalAdviceSought} />
                  <span className="text-gray-600 text-xs">Legal Advice</span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function exportCsv(incidents: WelfareIncident[]) {
  const headers = ['ID', 'Date/Time', 'Participant ID', 'Nature of Contact', 'Severity', 'Response', 'Outcome', 'Escalated to CEO', 'Board Notified', 'Legal Advice', 'Follow-Up', 'Status'];
  const rows = incidents.map(i => [
    i.id, i.dateTime, i.participantId,
    `"${i.natureOfContact.replace(/"/g, '""')}"`,
    i.severityLevel,
    `"${i.responseTaken.replace(/"/g, '""')}"`,
    `"${i.outcome.replace(/"/g, '""')}"`,
    i.escalatedToCEO ? 'Yes' : 'No',
    i.boardNotified ? 'Yes' : 'No',
    i.legalAdviceSought ? 'Yes' : 'No',
    `"${i.followUpActions.replace(/"/g, '""')}"`,
    i.status,
  ]);
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `reap-welfare-register-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function WelfarePage() {
  const [incidents, setIncidents] = useState<WelfareIncident[]>(welfareIncidents);
  const [search, setSearch] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filtered = incidents.filter(i => {
    const matchSearch = !search || i.participantId.toLowerCase().includes(search.toLowerCase()) || i.natureOfContact.toLowerCase().includes(search.toLowerCase());
    const matchSev = !filterSeverity || i.severityLevel === filterSeverity;
    const matchStatus = !filterStatus || i.status === filterStatus;
    return matchSearch && matchSev && matchStatus;
  });

  return (
    <div className="p-8 space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welfare Register</h2>
          <p className="text-gray-600 text-sm mt-1">{incidents.length} incidents logged</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportCsv(filtered)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Download size={15} /> Export Register (CSV)
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            <Plus size={15} /> Log Incident
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {(['Low', 'Medium', 'High', 'Critical'] as WelfareIncident['severityLevel'][]).map(sev => {
          const sc = severityConfig[sev];
          const count = incidents.filter(i => i.severityLevel === sev).length;
          return (
            <div key={sev} className={`rounded-lg border p-4 ${sc.bg}`}>
              <div className={`text-2xl font-bold ${sc.text}`}>{count}</div>
              <div className={`text-xs font-semibold mt-0.5 ${sc.text}`}>{sev} Severity</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 bg-white border border-gray-200 rounded-lg p-3">
        <div className="flex items-center gap-2 flex-1 min-w-48">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by participant ID or contact..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm w-full outline-none text-gray-700 placeholder-gray-400"
          />
          {search && <button onClick={() => setSearch('')}><X size={13} className="text-gray-400" /></button>}
        </div>
        <select value={filterSeverity} onChange={e => setFilterSeverity(e.target.value)} className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white text-gray-700 outline-none">
          <option value="">All Severities</option>
          {['Low', 'Medium', 'High', 'Critical'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white text-gray-700 outline-none">
          <option value="">All Statuses</option>
          {['Open', 'Resolved', 'Escalated'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Participant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Nature of Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">CEO</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Board</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(i => <IncidentRow key={i.id} incident={i} />)}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400 text-sm">No incidents match the current filters.</div>}
        </div>
      </div>

      {/* Warning banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle size={16} className="text-yellow-600 mt-0.5 shrink-0" />
          <p className="text-sm text-yellow-800">
            <strong>Confidential:</strong> This register contains sensitive participant data. Access is restricted to Ashleigh (Living Lab Lead), Leanne (CEO), and legal counsel. All incidents must be reviewed within 24 hours of logging.
          </p>
        </div>
      </div>

      {showModal && (
        <LogIncidentModal
          onClose={() => setShowModal(false)}
          onLog={(incident) => {
            setIncidents(prev => [incident, ...prev]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

function LogIncidentModal({ onClose, onLog }: {
  onClose: () => void;
  onLog: (i: WelfareIncident) => void;
}) {
  const [participantId, setParticipantId] = useState('');
  const [natureOfContact, setNatureOfContact] = useState('');
  const [severity, setSeverity] = useState<WelfareIncident['severityLevel']>('Low');
  const [responseTaken, setResponseTaken] = useState('');
  const [outcome, setOutcome] = useState('');
  const [escalatedToCEO, setEscalatedToCEO] = useState(false);
  const [boardNotified, setBoardNotified] = useState(false);
  const [legalAdviceSought, setLegalAdviceSought] = useState(false);
  const [followUpActions, setFollowUpActions] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!participantId.trim() || !natureOfContact.trim()) return;
    onLog({
      id: `W${String(Date.now()).slice(-4)}`,
      dateTime: new Date().toISOString(),
      participantId: participantId.trim(),
      natureOfContact: natureOfContact.trim(),
      severityLevel: severity,
      responseTaken: responseTaken.trim(),
      outcome: outcome.trim(),
      escalatedToCEO,
      boardNotified,
      legalAdviceSought,
      followUpActions: followUpActions.trim(),
      status: 'Open',
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Log New Incident</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Participant ID *</label>
              <input required type="text" value={participantId} onChange={e => setParticipantId(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" placeholder="e.g. P-1234" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Severity Level</label>
              <select value={severity} onChange={e => setSeverity(e.target.value as WelfareIncident['severityLevel'])} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                {(['Low', 'Medium', 'High', 'Critical'] as WelfareIncident['severityLevel'][]).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Nature of Contact *</label>
            <textarea required value={natureOfContact} onChange={e => setNatureOfContact(e.target.value)} rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 resize-none" placeholder="Describe what happened and how contact was made..." />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Response Taken</label>
            <textarea value={responseTaken} onChange={e => setResponseTaken(e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 resize-none" placeholder="What action did you take?" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Outcome</label>
            <textarea value={outcome} onChange={e => setOutcome(e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 resize-none" placeholder="What was the result?" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Follow-Up Actions Required</label>
            <textarea value={followUpActions} onChange={e => setFollowUpActions(e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 resize-none" placeholder="Any next steps?" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Notifications</label>
            {[
              { label: 'Escalated to CEO', value: escalatedToCEO, onChange: setEscalatedToCEO },
              { label: 'Board Notified', value: boardNotified, onChange: setBoardNotified },
              { label: 'Legal Advice Sought', value: legalAdviceSought, onChange: setLegalAdviceSought },
            ].map(item => (
              <label key={item.label} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={item.value} onChange={e => item.onChange(e.target.checked)} className="rounded border-gray-300 text-blue-600" />
                <span className="text-sm text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700">Log Incident</button>
          </div>
        </form>
      </div>
    </div>
  );
}
