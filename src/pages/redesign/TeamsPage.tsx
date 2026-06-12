import React, { useState } from 'react';
import { ReaperMascot, BottomNav, CircularProgress, tw, C } from './shared';

// ─── Teams Page ───────────────────────────────────────────────────────────────
// Matches Whisk prototypes: team overview, challenge, leaderboard, member pool
// Shows both workplace/community team dashboard and global team rankings

interface TeamMember {
  id: string;
  alias: string;
  realName?: string;
  isAlive: boolean;
  minutesToday: number;
  minutesGoal: number;
}

interface TeamChallenge {
  title: string;
  description: string;
  progressCurrent: number;
  progressMax: number;
  unit: string;
  daysLeft: number;
  hoursLeft: number;
  reward: string;
}

interface TeamLeaderboardEntry {
  rank: number;
  name: string;
  survivalRate: number;
  totalMinutes: number;
  membersAlive: number;
  totalMembers: number;
  isCurrentTeam?: boolean;
}

const mockMembers: TeamMember[] = [
  { id: '1', alias: 'ASHLEIGH_C', realName: 'Ashleigh Carlson', isAlive: true, minutesToday: 18, minutesGoal: 22 },
  { id: '2', alias: 'CARDIO_KAREN', isAlive: true, minutesToday: 22, minutesGoal: 22 },
  { id: '3', alias: 'LUNG_GOBLIN', isAlive: true, minutesToday: 14, minutesGoal: 22 },
  { id: '4', alias: 'MATT_C', realName: 'Matt Carlson', isAlive: true, minutesToday: 22, minutesGoal: 22 },
  { id: '5', alias: 'SOFA_KING_FIT', isAlive: true, minutesToday: 8, minutesGoal: 22 },
];

const mockChallenge: TeamChallenge = {
  title: 'The Ledger Leap',
  description: '50k Steps This Week',
  progressCurrent: 34500,
  progressMax: 50000,
  unit: 'steps',
  daysLeft: 3,
  hoursLeft: 12,
  reward: 'New Scythe Skin & "Corporate Titan" Title',
};

const mockLeaderboard: TeamLeaderboardEntry[] = [
  { rank: 1, name: '[HR HARVESTERS]', survivalRate: 96, totalMinutes: 16800, membersAlive: 23, totalMembers: 24 },
  { rank: 2, name: '[DEV SCYTHES]', survivalRate: 95, totalMinutes: 16100, membersAlive: 23, totalMembers: 24 },
  { rank: 3, name: '[SALES REAPERS]', survivalRate: 95, totalMinutes: 15900, membersAlive: 23, totalMembers: 24 },
  { rank: 4, name: '[STONE GUARD]', survivalRate: 94, totalMinutes: 14500, membersAlive: 28, totalMembers: 30, isCurrentTeam: true },
];

const globalLeaderboard = [
  { rank: 1, name: 'Spectral Sprinters', totalMinutes: 139990 },
  { rank: 2, name: 'Shadow Walkers', totalMinutes: 48720 },
  { rank: 3, name: 'Froan Freoners', totalMinutes: 69030 },
  { rank: 4, name: 'Dark Walders', totalMinutes: 59880 },
];

export default function TeamsPage({
  teamName = 'Corp Corpse Crew',
  teamCode = '',
  onNavigate,
  onInvite,
}: {
  teamName?: string;
  teamCode?: string;
  onNavigate?: (tab: string) => void;
  onInvite?: () => void;
}) {
  const [codeInput, setCodeInput] = useState(teamCode);
  const [showMembers, setShowMembers] = useState(false);

  const teamSurvivalRate = 98;
  const teamMinutes = 48720;
  const membersAlive = 23;
  const totalMembers = 24;

  const progress = mockChallenge.progressCurrent / mockChallenge.progressMax;

  return (
    <div className="min-h-screen bg-black text-[#e5e3d0] font-mono pb-24">
      {/* ── Header ── */}
      <header className="px-4 pt-5 pb-4 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-3">
          {/* Team logo / avatar */}
          <div className="w-14 h-14 bg-[#161616] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
            <ReaperMascot variant="megaphone" size={40} />
          </div>
          <div className="flex-1">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest">REAP | Teams</p>
            <p className="font-mono font-bold text-base" style={{ color: C.green }}>
              {teamName}
            </p>
            <p className="text-xs text-[#84ff00] mt-0.5">{teamSurvivalRate}% ALIVE</p>
          </div>
        </div>
        <p className="text-[10px] text-gray-500 mt-3 leading-relaxed">
          Your [Workplace/School/Community] TEAM HAS ENTERED THE CHALLENGE.<br />
          <span style={{ color: C.green }}>Survive together. One team. One ledger.</span>
        </p>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {/* ── Team Dashboard ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">
            Team Dashboard <span className="text-gray-600">(Aggregate Stats)</span>
          </p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span style={{ color: C.green }}>♥</span>
                <span className="text-xl font-bold" style={{ color: C.green }}>
                  {teamSurvivalRate}%
                </span>
              </div>
              <p className="text-[9px] text-gray-500 uppercase tracking-wider">Team Survival Rate</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-xl font-bold text-[#e5e3d0]">
                  {teamMinutes.toLocaleString()}
                </span>
              </div>
              <p className="text-[9px] text-gray-500 uppercase tracking-wider">Total Team Min</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#e5e3d0] mb-1">
                {membersAlive}/{totalMembers}
              </p>
              <p className="text-[9px] text-gray-500 uppercase tracking-wider">Members Alive</p>
            </div>
          </div>

          {/* Member avatars */}
          <div className="flex flex-wrap gap-1 mb-3">
            {Array.from({ length: totalMembers }).map((_, i) => (
              <div
                key={i}
                className={`w-5 h-5 rounded-full border flex items-center justify-center text-[8px] ${
                  i < membersAlive
                    ? 'border-[#84ff00] bg-[#84ff00]/20'
                    : 'border-[#2a2a2a] bg-[#111] opacity-40'
                }`}
              >
                {i < membersAlive ? '♥' : '☠'}
              </div>
            ))}
          </div>

          <p className="text-[9px] text-gray-500 text-center">
            {membersAlive} Members Still Alive: {membersAlive}/{totalMembers}
          </p>
        </div>

        {/* ── Join by Code ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Join by Code</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              placeholder="Enter Code"
              className={`${tw.input} flex-1`}
              maxLength={8}
            />
          </div>
          <button onClick={onInvite} className={`${tw.greenBtn} mt-3`}>
            + Invite Teammate
          </button>
        </div>

        {/* ── Active Team Challenge ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <div className="flex items-start justify-between mb-3">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
              ♥ Active Team Challenge
            </p>
          </div>

          <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-3 mb-3">
            <p className="text-xs text-[#84ff00] font-mono">
              Challenge: <span className="font-bold">{mockChallenge.title}</span>
            </p>
            <p className="text-[10px] text-gray-400 mt-1">{mockChallenge.description}</p>

            {/* Progress bar */}
            <div className="mt-3 mb-2">
              <div className="flex justify-between text-[9px] text-gray-500 mb-1">
                <span>{mockChallenge.progressCurrent.toLocaleString()} {mockChallenge.unit}</span>
                <span>{mockChallenge.progressMax.toLocaleString()} {mockChallenge.unit}</span>
              </div>
              <div className="h-3 bg-[#111] border border-[#2a2a2a] relative overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${progress * 100}%`,
                    backgroundColor: C.green,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-[9px]">
              <span className="text-gray-500">⏱ Time Remaining:</span>
              <span style={{ color: C.green }}>
                {mockChallenge.daysLeft} days, {mockChallenge.hoursLeft} hours
              </span>
            </div>
          </div>

          <div className="bg-[#0e0e0e] border border-[#84ff00]/20 p-3">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">
              Reward & Recognition
            </p>
            <p className="text-xs text-[#84ff00]">Team Reward: {mockChallenge.reward}</p>
          </div>
        </div>

        {/* ── Organization Team Leaderboard ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">
            Team Leaderboard (Organization)
          </p>
          <div className="space-y-2">
            {mockLeaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`p-2.5 border ${
                  entry.isCurrentTeam
                    ? 'border-[#84ff00]/40 bg-[#84ff00]/5'
                    : 'border-[#2a2a2a]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold w-5 ${
                      entry.rank === 1
                        ? 'text-[#84ff00]'
                        : entry.rank === 2
                        ? 'text-gray-300'
                        : entry.rank === 3
                        ? 'text-yellow-700'
                        : 'text-gray-500'
                    }`}
                  >
                    {entry.rank}.
                  </span>
                  <p className="text-xs font-mono flex-1 text-[#e5e3d0]">{entry.name}</p>
                  <span className="text-xs text-[#84ff00]">{entry.survivalRate}%</span>
                  <span className="text-[10px] text-gray-500">
                    {(entry.totalMinutes / 1000).toFixed(1)}k min
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Asterisk disclaimer */}
          <p className="text-[9px] text-gray-600 mt-2 leading-relaxed">
            *Privacy: All individual private health data is protected. Only aggregate stats are shown.*
          </p>
        </div>

        {/* ── Global Team Leaderboard ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1">
            ♥ Team Leaderboard (Global)
          </p>
          <div className="space-y-1.5">
            {globalLeaderboard.map((t) => (
              <div key={t.rank} className="flex items-center gap-2 py-1.5 border-b border-[#2a2a2a] last:border-b-0">
                <span className="text-[10px] text-gray-500 w-5">
                  {t.rank === 1 ? '🥇' : t.rank === 2 ? '🥈' : t.rank === 3 ? '🥉' : `${t.rank}.`}
                </span>
                <p className="text-xs text-[#e5e3d0] flex-1">Team {t.rank}: {t.name}</p>
                <span className="text-xs text-[#84ff00] font-mono">{t.totalMinutes.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Team Recognition ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1">
            ♥ Team Recognition
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: '🏆', label: 'Company Cup' },
              { icon: '👑', label: 'Company Cup' },
              { icon: '🪦', label: 'Corporate Survival Plaque' },
              { icon: '🥇', label: 'Gold Medal' },
              { icon: '🥈', label: 'Silver Medal' },
              { icon: '🥉', label: 'Bronze Medal' },
            ].map((trophy, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 border border-[#2a2a2a] p-2 bg-[#0e0e0e]"
              >
                <span className="text-2xl">{trophy.icon}</span>
                <p className="text-[8px] font-mono text-gray-500 text-center uppercase leading-tight">
                  {trophy.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Member Pool ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <button
            onClick={() => setShowMembers(!showMembers)}
            className="w-full flex items-center justify-between"
          >
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
              Member Pool{' '}
              <span className="text-gray-600">{totalMembers}</span>
            </p>
            <span className="text-gray-500 text-xs">{showMembers ? '▲' : '▼'}</span>
          </button>

          {showMembers && (
            <div className="mt-3 space-y-2">
              <p className="text-[9px] text-gray-600 leading-relaxed">
                *Privacy: All individual private health data is protected. Only aggregate stats are shown.*
              </p>
              {mockMembers.map((member) => (
                <div
                  key={member.id}
                  className={`flex items-center gap-3 p-2 border ${
                    member.isAlive ? 'border-[#2a2a2a]' : 'border-red-900/30'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      member.minutesToday >= member.minutesGoal
                        ? 'bg-[#84ff00]'
                        : member.isAlive
                        ? 'bg-yellow-400'
                        : 'bg-red-500'
                    }`}
                  />
                  <p className="text-xs flex-1 font-mono text-[#e5e3d0]">{member.alias}</p>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {member.minutesToday}/{member.minutesGoal} min
                  </span>
                </div>
              ))}
              <button onClick={onInvite} className={tw.greenBtn + ' mt-2'}>
                + Invite Teammate
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNav active="teams" onNavigate={onNavigate as any} />
    </div>
  );
}
