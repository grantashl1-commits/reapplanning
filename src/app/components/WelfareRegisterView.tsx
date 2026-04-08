import { useState } from 'react';
import { HeartPulse, Plus, Search, Filter, Download, AlertCircle, CheckCircle } from 'lucide-react';

interface WelfareIncident {
  id: string;
  dateTime: string;
  participantId: string;
  natureOfContact: 'Welfare' | 'Dispute' | 'Physical Harm';
  severityLevel: '1' | '2' | '3' | 'N/A';
  responseTaken: string;
  outcome: string;
  escalatedToCEO: boolean;
  boardNotified: boolean;
  legalAdviceSought: boolean;
  followUpActions: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
}

export function WelfareRegisterView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data - in production this would come from Supabase
  const incidents: WelfareIncident[] = [
    {
      id: 'INC-001',
      dateTime: '2026-11-05T23:45:00',
      participantId: 'P-1847 (anonymised)',
      natureOfContact: 'Welfare',
      severityLevel: '2',
      responseTaken: 'Acknowledged within 3 hours. Validated participant\'s distress. Signposted Mental Health Foundation line (1737). Offered priority registration for Season 2.',
      outcome: 'Participant thanked staff for response. No further contact. Incident documented.',
      escalatedToCEO: false,
      boardNotified: false,
      legalAdviceSought: false,
      followUpActions: 'None required. Monitor for any follow-up contact.',
      status: 'Closed'
    },
    {
      id: 'INC-002',
      dateTime: '2026-11-10T14:22:00',
      participantId: 'P-2156 (anonymised)',
      natureOfContact: 'Dispute',
      severityLevel: 'N/A',
      responseTaken: 'Acknowledged within 18 hours. Reviewed Supabase activity records. Checked device sync log. Elimination was technically correct (19 minutes logged on Day 7).',
      outcome: 'Responded with clear explanation of data. Offered Season 2 priority registration. No reinstatement per Terms.',
      escalatedToCEO: false,
      boardNotified: false,
      legalAdviceSought: false,
      followUpActions: 'None required. Participant accepted explanation.',
      status: 'Closed'
    },
    {
      id: 'INC-003',
      dateTime: '2026-11-13T08:15:00',
      participantId: 'P-3421 (anonymised)',
      natureOfContact: 'Dispute',
      severityLevel: 'N/A',
      responseTaken: 'Acknowledged within 12 hours. Reviewed activity records. Device sync error identified - participant completed 28 minutes but only 15 minutes synced to system.',
      outcome: 'Participant reinstated immediately. Technical team investigating sync error cause. No other participants affected by this specific error.',
      escalatedToCEO: true,
      boardNotified: false,
      legalAdviceSought: false,
      followUpActions: 'Tech team to implement additional sync validation checks. Monitor for similar errors.',
      status: 'Resolved'
    }
  ];

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch =
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.participantId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.responseTaken.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || incident.natureOfContact === filterType;
    const matchesSeverity = filterSeverity === 'all' || incident.severityLevel === filterSeverity;

    return matchesSearch && matchesType && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case '3': return 'bg-red-100 text-red-800 border-red-200';
      case '2': return 'bg-orange-100 text-orange-800 border-orange-200';
      case '1': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getNatureColor = (nature: string) => {
    switch (nature) {
      case 'Welfare': return 'bg-purple-100 text-purple-800';
      case 'Dispute': return 'bg-blue-100 text-blue-800';
      case 'Physical Harm': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Closed':
      case 'Resolved':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'In Progress':
        return <AlertCircle className="text-yellow-600" size={16} />;
      default:
        return <AlertCircle className="text-gray-400" size={16} />;
    }
  };

  const stats = {
    total: incidents.length,
    welfare: incidents.filter(i => i.natureOfContact === 'Welfare').length,
    disputes: incidents.filter(i => i.natureOfContact === 'Dispute').length,
    physicalHarm: incidents.filter(i => i.natureOfContact === 'Physical Harm').length,
    level3: incidents.filter(i => i.severityLevel === '3').length,
    escalated: incidents.filter(i => i.escalatedToCEO).length,
    open: incidents.filter(i => i.status === 'Open' || i.status === 'In Progress').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <HeartPulse size={32} className="text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Welfare & Disputes Register</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Documented log of all participant welfare incidents, disputes, and physical harm reports
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Plus size={20} />
          <span>Log New Incident</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white border border-gray-200 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Incidents</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-700">{stats.welfare}</div>
          <div className="text-sm text-purple-600 font-semibold">Welfare</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-700">{stats.disputes}</div>
          <div className="text-sm text-blue-600 font-semibold">Disputes</div>
        </div>
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-700">{stats.physicalHarm}</div>
          <div className="text-sm text-red-600 font-semibold">Physical Harm</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-700">{stats.level3}</div>
          <div className="text-sm text-orange-600 font-semibold">Level 3 Crisis</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-700">{stats.escalated}</div>
          <div className="text-sm text-yellow-600 font-semibold">CEO Escalated</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-700">{stats.open}</div>
          <div className="text-sm text-gray-600 font-semibold">Open/In Progress</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search incidents, participant IDs, or responses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Filter by Type */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              <option value="Welfare">Welfare</option>
              <option value="Dispute">Dispute</option>
              <option value="Physical Harm">Physical Harm</option>
            </select>
          </div>

          {/* Filter by Severity */}
          <div>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Severity Levels</option>
              <option value="3">Level 3 - Crisis</option>
              <option value="2">Level 2 - Significant</option>
              <option value="1">Level 1 - Distress</option>
              <option value="N/A">N/A (Disputes)</option>
            </select>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-4 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Download size={18} />
            <span className="text-sm font-semibold">Export Register (CSV)</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing <strong>{filteredIncidents.length}</strong> of <strong>{incidents.length}</strong> incidents
      </div>

      {/* Incidents Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date & Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Participant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Escalations</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredIncidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold text-gray-900">{incident.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(incident.dateTime).toLocaleDateString('en-NZ', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-gray-600">
                      {new Date(incident.dateTime).toLocaleTimeString('en-NZ', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-700">{incident.participantId}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${getNatureColor(incident.natureOfContact)}`}>
                      {incident.natureOfContact}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded border text-xs font-semibold ${getSeverityColor(incident.severityLevel)}`}>
                      {incident.severityLevel === 'N/A' ? 'N/A' : `Level ${incident.severityLevel}`}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      {incident.escalatedToCEO && (
                        <span className="inline-flex items-center text-xs text-red-700">
                          <CheckCircle size={14} className="mr-1" /> CEO
                        </span>
                      )}
                      {incident.boardNotified && (
                        <span className="inline-flex items-center text-xs text-orange-700">
                          <CheckCircle size={14} className="mr-1" /> Board
                        </span>
                      )}
                      {incident.legalAdviceSought && (
                        <span className="inline-flex items-center text-xs text-purple-700">
                          <CheckCircle size={14} className="mr-1" /> Legal
                        </span>
                      )}
                      {!incident.escalatedToCEO && !incident.boardNotified && !incident.legalAdviceSought && (
                        <span className="text-xs text-gray-500">None</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(incident.status)}
                      <span className="text-sm text-gray-900">{incident.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Results */}
      {filteredIncidents.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <AlertCircle className="mx-auto text-gray-400 mb-3" size={48} />
          <p className="text-gray-600 font-semibold mb-1">No incidents found</p>
          <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Documentation Requirements Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-bold text-blue-900 mb-2">Documentation Requirements</h4>
        <p className="text-sm text-gray-700 mb-3">
          This register must be maintained throughout each season with all required fields. The register is reviewed at the end of each season and included in the end-of-season board report (anonymised).
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <strong>Required for all incidents:</strong>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>Date and time of incident</li>
              <li>Participant identifier (anonymised)</li>
              <li>Nature of contact (welfare/dispute/physical harm)</li>
              <li>Severity level (1, 2, 3, or N/A)</li>
              <li>Response taken</li>
            </ul>
          </div>
          <div>
            <strong>Additional tracking:</strong>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>Outcome</li>
              <li>Escalated to CEO? (Yes/No)</li>
              <li>Board notified? (Yes/No)</li>
              <li>Legal advice sought? (Yes/No)</li>
              <li>Follow-up actions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
