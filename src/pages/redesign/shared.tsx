import React, { useEffect, useState } from 'react';

// ─── Design Tokens ────────────────────────────────────────────────────────────
export const C = {
  green: '#84ff00',
  greenDim: '#4f7000',
  greenGlow: 'rgba(132,255,0,0.15)',
  bone: '#e5e3d0',
  charcoal: '#0e0e0e',
  card: '#161616',
  cardHover: '#1e1e1e',
  border: '#2a2a2a',
  borderGreen: '#84ff00',
  muted: '#6b7280',
  danger: '#ef4444',
  warning: '#eab308',
};

// ─── Tailwind class strings ───────────────────────────────────────────────────
export const tw = {
  page: 'min-h-screen bg-black text-[#e5e3d0] font-mono',
  card: 'bg-[#161616] border border-[#2a2a2a] rounded-sm',
  cardGreen: 'bg-[#161616] border border-[#84ff00]/40 rounded-sm',
  label: 'text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono',
  heading: 'font-mono font-bold uppercase tracking-widest text-[#84ff00]',
  subheading: 'font-mono text-xs uppercase tracking-widest text-gray-400',
  greenBtn: 'w-full py-3 bg-[#84ff00] text-black font-mono font-bold uppercase tracking-widest text-sm hover:bg-[#a0ff30] transition-colors',
  ghostBtn: 'w-full py-3 border border-[#2a2a2a] text-[#e5e3d0] font-mono text-sm uppercase tracking-widest hover:border-[#84ff00]/50 transition-colors',
  input: 'w-full bg-[#111] border border-[#2a2a2a] text-[#e5e3d0] font-mono text-sm px-3 py-2.5 focus:outline-none focus:border-[#84ff00]/50 placeholder:text-gray-600',
};

// ─── REAP Logo ────────────────────────────────────────────────────────────────
// Replace <img> src with your actual logo asset path
export function ReapLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'h-8', md: 'h-12', lg: 'h-16' };
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Swap this img for your actual pixel-art REAP logo */}
      <img
        src="/assets/reap-logo.png"
        alt="REAP"
        className={`${sizes[size]} object-contain`}
        onError={(e) => {
          const t = e.currentTarget as HTMLImageElement;
          t.style.display = 'none';
          (t.nextSibling as HTMLElement)!.style.display = 'block';
        }}
      />
      <span
        className="hidden font-mono font-black text-3xl tracking-widest"
        style={{ color: C.green, display: 'none' }}
      >
        RE<span className="text-gray-400">☠</span>P
      </span>
    </div>
  );
}

// ─── Reaper Mascot ────────────────────────────────────────────────────────────
// variant maps to specific sprite assets — replace src paths with actuals
type ReaperVariant =
  | 'default'
  | 'running'
  | 'ledger'
  | 'thumbsup'
  | 'scythe'
  | 'wave'
  | 'megaphone'
  | 'thinking'
  | 'shocked'
  | 'trophy'
  | 'error';

export function ReaperMascot({
  variant = 'default',
  size = 96,
  className = '',
}: {
  variant?: ReaperVariant;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={`/assets/reaper-${variant}.png`}
      alt="The Reaper"
      width={size}
      height={size}
      className={`object-contain image-rendering-pixelated ${className}`}
      style={{ imageRendering: 'pixelated' }}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.opacity = '0';
      }}
    />
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
type Status = 'alive' | 'fallen' | 'at-risk' | 'active' | 'ghost';
const statusConfig: Record<Status, { label: string; color: string; icon: string }> = {
  alive: { label: 'ALIVE', color: 'text-[#84ff00] border-[#84ff00]/40', icon: '♥' },
  active: { label: 'ACTIVE', color: 'text-[#84ff00] border-[#84ff00]/40', icon: '●' },
  'at-risk': { label: 'AT RISK', color: 'text-yellow-400 border-yellow-400/40', icon: '⚠' },
  fallen: { label: 'FALLEN', color: 'text-red-500 border-red-500/40', icon: '☠' },
  ghost: { label: 'GHOST', color: 'text-gray-400 border-gray-400/40', icon: '👻' },
};

export function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1 border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${cfg.color}`}
    >
      <span>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}

// ─── Circular Progress Ring ───────────────────────────────────────────────────
export function CircularProgress({
  value,
  max,
  size = 140,
  strokeWidth = 10,
  label,
  sublabel,
}: {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}) {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const progress = Math.min(value / max, 1);
  const dashOffset = circumference * (1 - progress);
  const cx = size / 2;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke={C.green}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && (
          <span className="font-mono font-bold text-[#84ff00]" style={{ fontSize: size * 0.16 }}>
            {label}
          </span>
        )}
        {sublabel && (
          <span className="font-mono text-gray-400" style={{ fontSize: size * 0.08 }}>
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Countdown Timer ──────────────────────────────────────────────────────────
export function CountdownTimer({ targetHour = 23, targetMinute = 59 }: { targetHour?: number; targetMinute?: number }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    function calc() {
      const now = new Date();
      const target = new Date();
      target.setHours(targetHour, targetMinute, 59, 999);
      if (target <= now) target.setDate(target.getDate() + 1);
      const diff = target.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      setTimeLeft(`${h}:${m}:${s}`);
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetHour, targetMinute]);

  return <span className="font-mono font-bold tabular-nums">{timeLeft}</span>;
}

// ─── Bottom Navigation ────────────────────────────────────────────────────────
type NavTab = 'home' | 'activity' | 'ledger' | 'teams' | 'profile';
const navItems: { id: NavTab; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'activity', label: 'Activity', icon: '⚡' },
  { id: 'ledger', label: 'Ledger', icon: '☰' },
  { id: 'teams', label: 'Teams', icon: '♟' },
  { id: 'profile', label: 'Profile', icon: '◉' },
];

export function BottomNav({
  active,
  onNavigate,
}: {
  active: NavTab;
  onNavigate?: (tab: NavTab) => void;
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0e0e0e] border-t border-[#2a2a2a] z-50">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate?.(item.id)}
            className={`flex flex-col items-center gap-0.5 py-3 px-4 flex-1 transition-colors ${
              active === item.id
                ? 'text-[#84ff00]'
                : 'text-gray-600 hover:text-gray-400'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[9px] uppercase tracking-wider font-mono">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── Week Bar Chart ───────────────────────────────────────────────────────────
export function WeekBarChart({ data }: { data: { day: string; value: number; goal: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end justify-between gap-1.5 h-24">
      {data.map((d) => {
        const pct = (d.value / max) * 100;
        const met = d.value >= d.goal;
        return (
          <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-full flex items-end" style={{ height: 64 }}>
              <div
                className="w-full transition-all"
                style={{
                  height: `${pct}%`,
                  minHeight: d.value > 0 ? 4 : 0,
                  backgroundColor: met ? C.green : '#2a4a00',
                }}
              />
            </div>
            <span className="text-[9px] font-mono text-gray-500 uppercase">{d.day}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
export function Divider({ label }: { label?: string }) {
  if (!label) return <div className="border-t border-[#2a2a2a] my-4" />;
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 border-t border-[#2a2a2a]" />
      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600">{label}</span>
      <div className="flex-1 border-t border-[#2a2a2a]" />
    </div>
  );
}

// ─── Pixel Heart ─────────────────────────────────────────────────────────────
export function GreenHeart({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M7 12S1 8 1 4.5A3 3 0 0 1 7 3.5a3 3 0 0 1 6 1C13 8 7 12 7 12z"
        fill="#84ff00"
      />
    </svg>
  );
}
