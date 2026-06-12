import React, { useState } from 'react';
import { ReaperMascot, BottomNav, StatusBadge, tw, C } from './shared';

// ─── The Ledger ───────────────────────────────────────────────────────────────
// Matches Whisk prototype: "THE LEDGER HAS BEEN UPDATED."
// Tabs: Survivors | Graveyard | Rankings

type LedgerTab = 'survivors' | 'graveyard' | 'rankings';

interface Survivor {
  id: string;
  alias: string;
  streak: number;
  streakIcon: string;
  regionalRank: number;
  team?: string;
  status: 'alive';
}

interface Fallen {
  id: string;
  alias: string;
  epigraph: string;
  rank: number;
  daysAlive: number;
}

interface RankingEntry {
  id: string;
  alias: string;
  streak: number;
  totalMinutes: number;
  seasons: number;
  team?: string;
  isRegionalLeader?: boolean;
  isAchievementLeader?: boolean;
}

const survivors: Survivor[] = [
  { id: '1', alias: 'Night_Stalker_9', streak: 22, streakIcon: '⚡', regionalRank: 3, team: 'Midnight Riders', status: 'alive' },
  { id: '2', alias: 'PixelCrusher_8', streak: 15, streakIcon: '⌛', regionalRank: 7, team: undefined, status: 'alive' },
  { id: '3', alias: 'CARDIO_KAREN', streak: 42, streakIcon: '🔥', regionalRank: 1, team: 'Carlsons', status: 'alive' },
  { id: '4', alias: 'GLUTE_OVERLORD', streak: 30, streakIcon: '⚡', regionalRank: 2, team: 'Stevens', status: 'alive' },
  { id: '5', alias: 'ECHO_LOCATED', streak: 18, streakIcon: '⚡', regionalRank: 5, team: 'Den Hertogs', status: 'alive' },
  { id: '6', alias: 'LUNG_GOBLIN', streak: 12, streakIcon: '⚡', regionalRank: 8, team: 'Carlsons', status: 'alive' },
];

const fallen: Fallen[] = [
  { id: '1', alias: 'Couch_Potato_Alpha', epigraph: '"Claimed by the couch."', rank: 19, daysAlive: 7 },
  { id: '2', alias: 'Moon_Walker_X', epigraph: '"Last seen negotiating with midnight."', rank: 21, daysAlive: 9 },
  { id: '3', alias: 'BIG_DADDY_BATS', epigraph: '"Fell at the 11th hour. Literally."', rank: 45, daysAlive: 3 },
  { id: '4', alias: 'PALE_HORSE_GHOST', epigraph: '"The sofa won."', rank: 62, daysAlive: 1 },
];

const rankings: RankingEntry[] = [
  { id: '1', alias: 'Shadow_Rider_42', streak: 30, totalMinutes: 8421, seasons: 3, team: 'Midnight Riders', isRegionalLeader: true },
  { id: '2', alias: 'Achievement_Hunter', streak: 25, totalMinutes: 7200, seasons: 2, team: 'Spectral Sprinters', isAchievementLeader: true },
  { id: '3', alias: 'Night_Stalker_9', streak: 22, totalMinutes: 6100, seasons: 2, team: 'Midnight Riders' },
  { id: '4', alias: 'PixelCrusher_8', streak: 15, totalMinutes: 5400, seasons: 1 },
  { id: '5', alias: 'CARDIO_KAREN', streak: 42, totalMinutes: 4900, seasons: 1, team: 'Carlsons' },
];

export default function LedgerPage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [tab, setTab] = useState<LedgerTab>('survivors');

  return (
    <div className="min-h-screen bg-black text-[#e5e3d0] font-mono pb-24">
      {/* ── Dramatic Header ── */}
      <div
        className="relative overflow-hidden px-4 pt-5 pb-4"
        style={{ background: 'linear-gradient(180deg, #0a1a00 0%, #000 100%)' }}
      >
        <div className="flex items-start gap-3">
          <ReaperMascot variant="ledger" size={64} className="flex-shrink-0" />
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-1">
              Archive Entry: {new Date().toLocaleTimeString('en-NZ', { timeZone: 'Pacific/Auckland', hour12: false, hour: '2-digit', minute: '2-digit' })} NZT
            </p>
            <h1 className="font-mono font-black text-lg leading-tight" style={{ color: C.green }}>
              THE LEDGER HAS<br />BEEN UPDATED.
            </h1>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex border-b border-[#2a2a2a] px-4">
        {(['survivors', 'graveyard', 'rankings'] as LedgerTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-[10px] font-mono uppercase tracking-widest transition-colors ${
              tab === t
                ? 'text-[#84ff00] border-b-2 border-[#84ff00]'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {t === 'survivors' && '♥ Survivors'}
            {t === 'graveyard' && '☠ Graveyard'}
            {t === 'rankings' && '♛ Rankings'}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4">
        {tab === 'survivors' && <SurvivorsTab survivors={survivors} />}
        {tab === 'graveyard' && <GraveyardTab fallen={fallen} />}
        {tab === 'rankings' && <RankingsTab rankings={rankings} />}
      </div>

      <BottomNav active="ledger" onNavigate={onNavigate as any} />
    </div>
  );
}

// ─── Survivors Tab ────────────────────────────────────────────────────────────
function SurvivorsTab({ survivors }: { survivors: Survivor[] }) {
  return (
    <div className="space-y-3">
      <div className="bg-[#161616] border border-[#84ff00]/20 px-3 py-2">
        <p className="text-[10px] text-gray-500">
          Rankings <span className="text-gray-600">(Public safe only)</span>
        </p>
      </div>

      {survivors.map((s) => (
        <div
          key={s.id}
          className="bg-[#161616] border border-[#2a2a2a] p-3"
          style={{
            borderLeftColor: C.green,
            borderLeftWidth: 3,
          }}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status="alive" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-mono font-bold text-[#e5e3d0] truncate">
                {s.alias}
              </p>
              {s.team && (
                <p className="text-[9px] text-gray-500 mt-0.5">Team: {s.team}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <LedgerStat
              label="Streak"
              value={`${s.streakIcon} ${s.streak} Days`}
              green
            />
            <LedgerStat
              label="Regional Rank"
              value={`⊕ #${s.regionalRank}`}
            />
            <LedgerStat
              label="Team"
              value={s.team ?? 'None'}
            />
          </div>
        </div>
      ))}

      <p className="text-[9px] text-gray-600 text-center py-2">
        *Only public-safe community status shown. No private health data.*
      </p>
    </div>
  );
}

// ─── Graveyard Tab ────────────────────────────────────────────────────────────
function GraveyardTab({ fallen }: { fallen: Fallen[] }) {
  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-[#2a2a2a]" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 flex items-center gap-1">
          ☠ The Fallen
        </span>
        <div className="flex-1 border-t border-[#2a2a2a]" />
      </div>

      {fallen.map((f) => (
        <div
          key={f.id}
          className="bg-[#161616] border border-[#2a2a2a] p-3"
          style={{
            borderLeftColor: '#ef4444',
            borderLeftWidth: 3,
          }}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status="fallen" />
            <p className="text-sm font-mono font-bold text-gray-400 flex-1">{f.alias}</p>
            <span className="text-[10px] text-gray-600">Rank #{f.rank}</span>
          </div>
          <p className="text-xs text-gray-500 italic mt-2 leading-relaxed">{f.epigraph}</p>
          <p className="text-[9px] text-gray-600 mt-1">Survived {f.daysAlive} days</p>
        </div>
      ))}

      <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-3 mt-4">
        <ReaperMascot variant="ledger" size={32} className="mx-auto mb-2" />
        <p className="text-[10px] text-gray-600 text-center leading-relaxed italic">
          "Their record is stored. Every absence, noted."
        </p>
      </div>
    </div>
  );
}

// ─── Rankings Tab ─────────────────────────────────────────────────────────────
function RankingsTab({ rankings }: { rankings: RankingEntry[] }) {
  return (
    <div className="space-y-3">
      {/* Leaders callout */}
      <div className="bg-[#161616] border border-[#2a2a2a] p-3 grid grid-cols-2 gap-2">
        <div>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
            ⊕ Regional Leader
          </p>
          <p className="text-xs text-[#84ff00] font-mono mt-0.5">
            {rankings.find((r) => r.isRegionalLeader)?.alias ?? '—'}
          </p>
        </div>
        <div>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
            🏆 Achievement Leader
          </p>
          <p className="text-xs text-[#84ff00] font-mono mt-0.5">
            {rankings.find((r) => r.isAchievementLeader)?.alias ?? '—'}
          </p>
        </div>
      </div>

      {rankings.map((r, i) => (
        <div
          key={r.id}
          className={`bg-[#161616] border p-3 ${
            r.isRegionalLeader || r.isAchievementLeader
              ? 'border-[#84ff00]/40'
              : 'border-[#2a2a2a]'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-sm font-mono font-bold w-6 ${
                i === 0 ? 'text-[#84ff00]' : i === 1 ? 'text-gray-300' : 'text-gray-500'
              }`}
            >
              #{i + 1}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-mono text-[#e5e3d0]">{r.alias}</p>
                {r.isRegionalLeader && (
                  <span className="text-[8px] border border-[#84ff00]/40 text-[#84ff00] px-1">
                    REGIONAL
                  </span>
                )}
                {r.isAchievementLeader && (
                  <span className="text-[8px] border border-yellow-400/40 text-yellow-400 px-1">
                    ACHIEVEMENT
                  </span>
                )}
              </div>
              {r.team && (
                <p className="text-[9px] text-gray-500">{r.team}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <LedgerStat label="Streak" value={`${r.streak}d`} green />
            <LedgerStat label="Total Min" value={r.totalMinutes.toLocaleString()} />
            <LedgerStat label="Seasons" value={String(r.seasons)} />
          </div>
        </div>
      ))}
    </div>
  );
}

function LedgerStat({
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
      <p className={`text-[10px] font-mono ${green ? 'text-[#84ff00]' : 'text-gray-400'}`}>
        {value}
      </p>
    </div>
  );
}
