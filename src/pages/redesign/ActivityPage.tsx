import React, { useState } from 'react';
import {
  ReapLogo,
  ReaperMascot,
  CircularProgress,
  BottomNav,
  WeekBarChart,
  tw,
  C,
} from './shared';

// ─── Activity Page ────────────────────────────────────────────────────────────
// Matches Whisk prototype: Activity hub with ring, connected sources,
// weekly bar chart, heart rate zones, session history

interface Session {
  id: string;
  date: string;
  time: string;
  type: string;
  typeIcon: string;
  duration: number;
  avgHR: number;
  calories: number;
  zone2Minutes: number;
}

interface ConnSource {
  id: string;
  name: string;
  icon: string;
  status: 'active' | 'syncing' | 'inactive';
  date?: string;
}

const mockSessions: Session[] = [
  { id: '1', date: '21 OCT', time: '10:15AM', type: 'Running', typeIcon: '🏃', duration: 25, avgHR: 138, calories: 225, zone2Minutes: 22 },
  { id: '2', date: '20 OCT', time: '6:00PM', type: 'Cycling', typeIcon: '🚴', duration: 40, avgHR: 120, calories: 350, zone2Minutes: 35 },
  { id: '3', date: '19 OCT', time: '7:30AM', type: 'Walking', typeIcon: '🚶', duration: 35, avgHR: 105, calories: 180, zone2Minutes: 28 },
  { id: '4', date: '18 OCT', time: '12:30PM', type: 'Running', typeIcon: '🏃', duration: 22, avgHR: 142, calories: 210, zone2Minutes: 22 },
];

const mockSources: ConnSource[] = [
  { id: 'apple', name: 'Apple Health', icon: '🍎', status: 'active', date: 'Active' },
  { id: 'hc', name: 'Health Connect', icon: '💚', status: 'active', date: 'Active' },
  { id: 'garmin', name: 'Garmin', icon: '⌚', status: 'active', date: 'Active' },
  { id: 'fitbit', name: 'Fitbit', icon: '📊', status: 'active', date: 'Active' },
  { id: 'terra', name: 'Terra', icon: '🌍', status: 'active', date: 'Active' },
  { id: 'ble', name: 'BLE HRM', icon: '📡', status: 'syncing', date: 'Syncing' },
];

const weekData = [
  { day: 'MON', value: 14, goal: 22 },
  { day: 'TUE', value: 35, goal: 22 },
  { day: 'WED', value: 29, goal: 22 },
  { day: 'THU', value: 23, goal: 22 },
  { day: 'FRI', value: 28, goal: 22 },
  { day: 'SAT', value: 25, goal: 22 },
  { day: 'SUN', value: 30, goal: 22 },
];

const hrZones = [
  { label: 'Zone 1 (Recovery)', max: 20, active: false },
  { label: 'Zone 2 (Aerobic)', max: 60, active: true },
  { label: 'Zone 3 (Tempo)', max: 40, active: false },
  { label: 'Zone 4 (Threshold)', max: 20, active: false },
  { label: 'Zone 5 (Max)', max: 5, active: false },
];

export default function ActivityPage({
  minutesLogged = 14,
  minutesTarget = 22,
  currentHR = 125,
  onNavigate,
}: {
  minutesLogged?: number;
  minutesTarget?: number;
  currentHR?: number;
  onNavigate?: (tab: string) => void;
}) {
  const [activeSession, setActiveSession] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-[#e5e3d0] font-mono pb-24">
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[#2a2a2a]">
        <ReapLogo size="sm" />
        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Activity Hub</p>
      </header>

      <div className="px-4 space-y-4 pt-4">
        {/* ── Today's Ring + Reaper ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <div className="flex items-start gap-4">
            <CircularProgress
              value={minutesLogged}
              max={minutesTarget}
              size={110}
              label={`${minutesLogged}/${minutesTarget}`}
              sublabel="MIN"
            />
            <div className="flex-1 flex flex-col justify-between h-full">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                  Today's Target
                </p>
                <p className="font-bold text-lg" style={{ color: C.green }}>
                  {minutesTarget} Qualifying Minutes
                </p>
              </div>
              <div className="mt-3">
                <ReaperMascot variant="default" size={48} />
                <p className="text-[10px] text-gray-500 italic mt-1 leading-snug">
                  "Twenty-two minutes. Try not to make this complicated."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Connected Sources ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">
            ♥ Connected Sources:
          </p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {mockSources.map((src) => (
              <div
                key={src.id}
                className={`border p-2 flex flex-col items-center gap-1 ${
                  src.status === 'active'
                    ? 'border-[#84ff00]/30 bg-[#84ff00]/5'
                    : src.status === 'syncing'
                    ? 'border-yellow-400/30 bg-yellow-400/5'
                    : 'border-[#2a2a2a]'
                }`}
              >
                <span className="text-lg">{src.icon}</span>
                <p className="text-[9px] font-mono text-center text-[#e5e3d0] leading-tight">
                  {src.name}
                </p>
                <p
                  className={`text-[8px] uppercase tracking-wide ${
                    src.status === 'active'
                      ? 'text-[#84ff00]'
                      : src.status === 'syncing'
                      ? 'text-yellow-400'
                      : 'text-gray-600'
                  }`}
                >
                  ({src.date})
                </p>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-gray-600">Last Sync: 10:14 AM ↻</p>
        </div>

        {/* ── This Week's Activity ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">This Week's Activity</p>
            </div>
            <ReaperMascot variant="running" size={44} />
          </div>
          <WeekBarChart data={weekData} />
        </div>

        {/* ── Heart Rate Zones ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Heart-Rate Zones</p>
          <div className="space-y-2 mb-4">
            {hrZones.map((z, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span
                      className={`text-[9px] font-mono ${
                        z.active ? 'text-[#84ff00]' : 'text-gray-500'
                      }`}
                    >
                      {z.label}
                    </span>
                    {z.active && (
                      <span className="text-[8px] text-[#84ff00] border border-[#84ff00]/40 px-1">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="h-2 bg-[#0e0e0e] border border-[#2a2a2a]">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${z.max}%`,
                        backgroundColor: z.active ? C.green : '#2a4a00',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#0e0e0e] border border-[#84ff00]/20 px-3 py-2.5">
            <p className="text-[10px] text-gray-500">Current HR</p>
            <p className="text-xl font-bold" style={{ color: C.green }}>
              {currentHR} BPM
            </p>
            <p className="text-[10px] text-gray-400">Zone 2 (Aerobic): ACTIVE</p>
          </div>
        </div>

        {/* ── Session History ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">
            Session History Panel
          </p>
          <div className="space-y-2">
            {mockSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                expanded={activeSession === session.id}
                onToggle={() =>
                  setActiveSession(activeSession === session.id ? null : session.id)
                }
              />
            ))}
          </div>
        </div>

        {/* ── Action Bar ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <div className="grid grid-cols-3 gap-2">
            <button className={`${tw.greenBtn} py-2.5`}>
              <span className="text-xs">▶ Start</span>
              <br />
              <span className="text-[9px]">Play</span>
            </button>
            <button className={tw.ghostBtn + ' py-2.5'}>
              <span className="text-xs">⌚ Submit</span>
              <br />
              <span className="text-[9px]">Session</span>
            </button>
            <div className="border border-[#2a2a2a] p-2 flex flex-col items-center justify-center">
              <ReaperMascot variant="ledger" size={28} />
              <p className="text-[8px] text-gray-600 text-center mt-1 leading-tight">
                Evidence First. Verdict Later.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="activity" onNavigate={onNavigate as any} />
    </div>
  );
}

function SessionCard({
  session,
  expanded,
  onToggle,
}: {
  session: Session;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-[#2a2a2a] bg-[#0e0e0e]">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-[#161616] transition-colors"
      >
        <div className="flex-shrink-0 w-10 text-center">
          <p className="text-[9px] text-[#84ff00] font-mono leading-tight">
            {session.date.split(' ')[0]}
          </p>
          <p className="text-[9px] text-gray-500 font-mono">
            {session.date.split(' ')[1]}
          </p>
        </div>
        <span className="text-lg flex-shrink-0">{session.typeIcon}</span>
        <div className="flex-1">
          <p className="text-xs text-[#e5e3d0] font-mono">{session.type.toUpperCase()}</p>
          <p className="text-[9px] text-gray-500">{session.time}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#84ff00] font-mono">{session.duration} min</p>
          <p className="text-[9px] text-gray-500">{session.avgHR} bpm</p>
        </div>
        <span className="text-gray-500 text-xs">{expanded ? '▲' : '▼'}</span>
      </button>
      {expanded && (
        <div className="px-3 pb-3 border-t border-[#2a2a2a] pt-2 grid grid-cols-3 gap-2">
          <SessionStat label="Duration" value={`${session.duration} min`} />
          <SessionStat label="Avg HR" value={`${session.avgHR} bpm`} />
          <SessionStat label="Calories" value={`${session.calories} kcal`} />
          <SessionStat label="Zone 2 Min" value={`${session.zone2Minutes} min`} green />
        </div>
      )}
    </div>
  );
}

function SessionStat({
  label,
  value,
  green,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div>
      <p className="text-[8px] text-gray-600 uppercase tracking-widest">{label}</p>
      <p className={`text-xs font-mono ${green ? 'text-[#84ff00]' : 'text-[#e5e3d0]'}`}>
        {value}
      </p>
    </div>
  );
}
