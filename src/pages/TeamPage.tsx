import { Mail } from 'lucide-react';
import { team, tasks, getTasksByOwner, type TeamMember } from '../data/reapData';

function OwnerInitials({ member }: { member: TeamMember }) {
  return (
    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold ${member.color} ${member.textColor}`}>
      {member.initials}
    </div>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const memberTasks = getTasksByOwner(member.name);
  const inProgress = memberTasks.filter(t => t.status === 'In Progress').length;
  const complete = memberTasks.filter(t => t.status === 'Completed').length;
  const critical = memberTasks.filter(t => t.priority === 'Critical' && t.status !== 'Completed').length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-start gap-4 mb-4">
        <OwnerInitials member={member} />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-600">{member.role}</p>
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 mt-1"
          >
            <Mail size={12} />
            {member.email}
          </a>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{member.bio}</p>

      {/* Areas */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Areas of Responsibility</div>
        <div className="flex flex-wrap gap-1.5">
          {member.areas.map(area => (
            <span key={area} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-medium">{area}</span>
          ))}
        </div>
      </div>

      {/* Task stats */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">{memberTasks.length}</div>
          <div className="text-xs text-gray-500">Tasks</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-blue-600">{inProgress}</div>
          <div className="text-xs text-gray-500">In Progress</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-red-600">{critical}</div>
          <div className="text-xs text-gray-500">Critical</div>
        </div>
      </div>
    </div>
  );
}

export function TeamPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Team</h2>
        <p className="text-gray-600 text-sm mt-1">REAP project team — roles, responsibilities, and task ownership</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {team.map(member => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* Task ownership breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Task Ownership Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Owner</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Total</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Not Started</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">In Progress</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Blocked</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Complete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {team.map(member => {
                const mt = getTasksByOwner(member.name);
                return (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${member.color} ${member.textColor}`}>
                          {member.initials}
                        </div>
                        <span className="font-medium text-gray-900">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-semibold text-gray-900">{mt.length}</td>
                    <td className="px-5 py-3 text-gray-600">{mt.filter(t => t.status === 'Not Started').length}</td>
                    <td className="px-5 py-3">
                      <span className="text-blue-700 font-semibold">{mt.filter(t => t.status === 'In Progress').length}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-red-700 font-semibold">{mt.filter(t => t.status === 'Blocked').length}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-green-700 font-semibold">{mt.filter(t => t.status === 'Completed').length}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
