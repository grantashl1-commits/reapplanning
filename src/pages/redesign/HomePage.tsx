import React, { useState } from 'react';
import {
  ReapLogo,
  ReaperMascot,
  CircularProgress,
  CountdownTimer,
  BottomNav,
  StatusBadge,
  tw,
  C,
  GreenHeart,
} from './shared';

// ─── Home Dashboard ───────────────────────────────────────────────────────────
// Matches Whisk prototype: Season header, activity ring, session controls,
// Reaper message panel, activity progress, community survival

interface HomePageProps {
  playerName?: string;
  seasonName?: string;
  seasonDay?: number;
  seasonTotal?: number;
  minutesLogged?: number;
  minutesTarget?: number;
  deviceStatus?: 'active' | 'syncing' | 'disconnected';
  qualifyingPct?: number;
  reaperMessage?: string;
  currentHR?: number;
  zone?: number;
  connectedSources?: ConnectedSource[];
  communityStats?: CommunityStats;
  onStartSession?: () => void;
  onSyncDevice?: () => void;
  onSubmitEvidence?: () => void;
  onViewLedger?: () => void;
  onNavigate?: (tab: string) => void;
}

interface ConnectedSource {
  id: string;
  name: string;
  icon: string;
  status: 'active' | 'syncing' | 'inactive';
  lastSync?: string;
}

interface CommunityStats {
  participants: number;
  alive: number;
  fallen: number;
  communityMinutes: number;
}

const defaultSources: ConnectedSource[] = [
  { id: 'apple', name: 'Apple Health', icon: '🍎', status: 'active' },
  { id: 'garmin', name: 'Garmin', icon: '⌚', status: 'active' },
  { id: 'terra', name: 'Terra', icon: '🌍', status: 'active' },
  { id: 'healthconnect', name: 'Health Connect', icon: '💚', status: 'active' },
  { id: 'fitbit', name: 'Fitbit', icon: '📊', status: 'active' },
  { id: 'ble', name: 'Bluetooth Monitor', icon: '📡', status: 'syncing', lastSync: '10:14 AM' },
];

const defaultCommunity: CommunityStats = {
  participants: 12846,
  alive: 8421,
  fallen: 4425,
  communityMinutes: 2481904,
};

export default function HomePage({
  playerName = 'Ashleigh Carlson',
  seasonName = 'Season 07 — Winter Survival',
  seasonDay = 18,
  seasonTotal = 30,
  minutesLogged = 18,
  minutesTarget = 22,
  deviceStatus = 'active',
  qualifyingPct = 82,
  reaperMessage = 'You are still alive. For now.',
  currentHR = 125,
  zone = 2,
  connectedSources = defaultSources,
  communityStats = defaultCommunity,
  onStartSession,
  onSyncDevice,
  onSubmitEvidence,
  onViewLedger,
  onNavigate,
}: HomePageProps) {
  const [activeNav] = useState<'home' | 'activity' | 'ledger' | 'teams' | 'profile'>('home');

  const statusLabel = minutesLogged >= minutesTarget ? 'active' : 'alive';

  return (
    <div className="min-h-screen bg-black text-[#e5e3d0] font-mono pb-24">
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-4 pt-4 pb-3">
        <ReapLogo size="sm" />
        <div className="text-right">
          <p className="text-xs text-[#e5e3d0]">{playerName}</p>
          <p className="text-[10px] text-gray-500">
            {seasonName} · Day {seasonDay} of {seasonTotal}
          </p>
        </div>
      </header>

      <div className="px-4 space-y-4">
        {/* ── Status Banner ── */}
        <div className="flex items-center justify-between bg-[#161616] border border-[#2a2a2a] px-4 py-2.5">
          <StatusBadge status={statusLabel} />
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">
            Day {seasonDay}/{seasonTotal}
          </span>
        </div>

        {/* ── Activity Ring + Stats ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <div className="flex items-center gap-6">
            <CircularProgress
              value={minutesLogged}
              max={minutesTarget}
              size={130}
              label={`${minutesLogged}/${minutesTarget}`}
              sublabel="Minutes"
            />
            <div className="flex-1 space-y-3">
              <StatRow label="Today's Target" value={`${minutesTarget} Minutes`} green />
              <StatRow label="Qualifying Logged" value={`${qualifyingPct}%`} />
              <StatRow
                label="Device Status"
                value={deviceStatus.toUpperCase()}
                green={deviceStatus === 'active'}
              />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                  Time Until Deadline
                </p>
                <p className="text-xs text-[#84ff00] font-bold mt-0.5">
                  <CountdownTimer targetHour={23} targetMinute={59} />
                </p>
              </div>
            </div>
          </div>

          {/* Big countdown */}
          <div className="mt-4 text-center border-t border-[#2a2a2a] pt-3">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
              Time Remaining Until Deadline
            </p>
            <p className="text-3xl font-bold" style={{ color: C.green }}>
              <CountdownTimer targetHour={23} targetMinute={59} />
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">Remaining</p>
          </div>
        </div>

        {/* ── Session Controls ── */}
        <div className="space-y-2.5">
          <button onClick={onStartSession} className={tw.greenBtn}>
            ▶ Start Session
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onSyncDevice}
              className="py-2.5 border border-[#2a2a2a] text-xs font-mono uppercase tracking-widest text-[#e5e3d0] hover:border-[#84ff00]/40 transition-colors"
            >
              ⌚ Sync Device
            </button>
            <button
              onClick={onSubmitEvidence}
              className="py-2.5 border border-[#2a2a2a] text-xs font-mono uppercase tracking-widest text-[#e5e3d0] hover:border-[#84ff00]/40 transition-colors"
            >
              📷 Submit Evidence
            </button>
          </div>
          <button
            onClick={onViewLedger}
            className={tw.ghostBtn}
          >
            ☰ View Ledger
          </button>
          <p className="text-[10px] text-gray-600 text-center">
            Verification Panel · Activity is verified through connected devices.
          </p>
        </div>

        {/* ── Reaper Message ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">
            Message from the Reaper
          </p>
          <div className="flex items-start gap-3">
            <ReaperMascot variant="default" size={56} />
            <div className="flex-1 space-y-2">
              <div className="bg-[#0e0e0e] border border-[#2a2a2a] px-3 py-2 text-xs text-[#e5e3d0] leading-relaxed">
                {reaperMessage}
              </div>
              <div className="bg-[#0e0e0e] border border-[#2a2a2a] px-3 py-2 text-xs text-gray-500 leading-relaxed">
                Modern life makes my job far too easy.
              </div>
              <div className="bg-[#0e0e0e] border border-[#2a2a2a] px-3 py-2 text-xs text-gray-600 leading-relaxed">
                Midnight approaches. I enjoy punctuality.
              </div>
            </div>
          </div>
        </div>

        {/* ── Activity Progress ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">
            <GreenHeart /> Today's Movement <GreenHeart />
          </p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <ActivityCard
              title="Heart Rate"
              content={
                <HeartRateSparkline />
              }
              sub={`${currentHR} BPM`}
            />
            <ActivityCard
              title="Zone 2 Status"
              content={
                <div className="text-[10px] font-mono">
                  <p className="text-[#84ff00]">Zone {zone}</p>
                  <p className="text-gray-500">Straps 2</p>
                </div>
              }
            />
            <ActivityCard
              title="Progress"
              content={
                <CircularProgress value={minutesLogged} max={minutesTarget} size={52} strokeWidth={5} />
              }
            />
          </div>

          {/* Connected sources */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">
              Connected Sources
            </p>
            <div className="space-y-1.5">
              {connectedSources.map((src) => (
                <div key={src.id} className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1.5">
                    <span>{src.icon}</span>
                    {src.name}
                  </span>
                  <span
                    className={`text-[9px] uppercase tracking-widest ${
                      src.status === 'active'
                        ? 'text-[#84ff00]'
                        : src.status === 'syncing'
                        ? 'text-yellow-400'
                        : 'text-gray-600'
                    }`}
                  >
                    {src.status === 'syncing' ? `Syncing` : src.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-gray-600 mt-2">
              Last Sync:{' '}
              {connectedSources.find((s) => s.lastSync)?.lastSync ?? 'just now'} ↻
            </p>
          </div>
        </div>

        {/* ── Community Survival ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">
            Global Survival Status
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <CommStat label="Participants" value={communityStats.participants.toLocaleString()} />
            <CommStat label="Still Alive" value={communityStats.alive.toLocaleString()} green />
            <CommStat label="Fallen" value={communityStats.fallen.toLocaleString()} danger />
            <CommStat
              label="Comm. Minutes"
              value={(communityStats.communityMinutes / 1000).toFixed(0) + 'k'}
              green
            />
          </div>

          {/* Survival graph placeholder */}
          <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-3 mb-2">
            <p className="text-[9px] text-gray-600 mb-2 uppercase tracking-widest">Survival graph</p>
            <SurvivalGraph />
          </div>

          {/* World heatmap placeholder */}
          <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-3">
            <p className="text-[9px] text-gray-600 mb-2 uppercase tracking-widest">
              World activity heat map
            </p>
            <WorldHeatmap />
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">
            <GreenHeart /> Quick Actions <GreenHeart />
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: '⚡', label: 'Start Session', action: onStartSession },
              { icon: '📊', label: 'Activity', action: () => onNavigate?.('activity') },
              { icon: '☰', label: 'Ledger', action: onViewLedger },
              { icon: '♟', label: 'Teams', action: () => onNavigate?.('teams') },
              { icon: '🏆', label: 'Achievements', action: undefined },
              { icon: '📈', label: 'Statistics', action: undefined },
              { icon: '🎁', label: 'Rewards', action: undefined },
              { icon: '⚙', label: 'Settings', action: () => onNavigate?.('profile') },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="flex flex-col items-center gap-1 bg-[#0e0e0e] border border-[#2a2a2a] p-2 hover:border-[#84ff00]/30 transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wider text-center leading-tight">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate as any} />
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatRow({
  label,
  value,
  green = false,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div>
      <p className="text-[9px] text-gray-500 uppercase tracking-widest">{label}</p>
      <p className={`text-xs font-bold ${green ? 'text-[#84ff00]' : 'text-[#e5e3d0]'}`}>
        {value}
      </p>
    </div>
  );
}

function ActivityCard({
  title,
  content,
  sub,
}: {
  title: string;
  content: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-2 flex flex-col items-center gap-1">
      <p className="text-[8px] text-gray-500 uppercase tracking-widest text-center">{title}</p>
      {content}
      {sub && <p className="text-[9px] text-[#84ff00]">{sub}</p>}
    </div>
  );
}

function CommStat({
  label,
  value,
  green,
  danger,
}: {
  label: string;
  value: string;
  green?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-2">
      <p className="text-[9px] text-gray-500 uppercase tracking-widest">{label}</p>
      <p
        className={`text-sm font-bold ${
          green ? 'text-[#84ff00]' : danger ? 'text-red-400' : 'text-[#e5e3d0]'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function HeartRateSparkline() {
  const points = [65, 72, 80, 95, 110, 125, 118, 122, 125];
  const max = 140;
  const w = 60;
  const h = 28;
  const pts = points
    .map((v, i) => `${(i / (points.length - 1)) * w},${h - (v / max) * h}`)
    .join(' ');
  return (
    <svg width={w} height={h}>
      <polyline points={pts} fill="none" stroke={C.green} strokeWidth={1.5} />
    </svg>
  );
}

function SurvivalGraph() {
  const data = [100, 98, 96, 93, 90, 88, 84, 80, 77, 75];
  const max = 100;
  const w = '100%';
  const h = 36;
  return (
    <svg width="100%" height={h} preserveAspectRatio="none">
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = h - (v / max) * h;
        return i === 0 ? null : (
          <line
            key={i}
            x1={`${((i - 1) / (data.length - 1)) * 100}%`}
            y1={h - (data[i - 1] / max) * h}
            x2={`${x}%`}
            y2={y}
            stroke={C.green}
            strokeWidth={1.5}
          />
        );
      })}
    </svg>
  );
}

function WorldHeatmap() {
  // Placeholder dots representing activity hotspots
  const dots = [
    { x: 22, y: 40 }, { x: 28, y: 38 }, { x: 35, y: 50 },
    { x: 48, y: 35 }, { x: 52, y: 38 }, { x: 60, y: 42 },
    { x: 72, y: 45 }, { x: 78, y: 48 }, { x: 85, y: 40 },
  ];
  return (
    <div className="relative w-full h-12 bg-[#050505] overflow-hidden">
      {/* Simple world outline approximation */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 50">
        <rect x="5" y="10" width="20" height="20" rx="2" fill="#1a1a1a" />
        <rect x="30" y="8" width="20" height="22" rx="2" fill="#1a1a1a" />
        <rect x="54" y="8" width="15" height="20" rx="2" fill="#1a1a1a" />
        <rect x="72" y="12" width="22" height="18" rx="2" fill="#1a1a1a" />
      </svg>
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            backgroundColor: C.green,
            boxShadow: `0 0 4px ${C.green}`,
          }}
        />
      ))}
    </div>
  );
}
