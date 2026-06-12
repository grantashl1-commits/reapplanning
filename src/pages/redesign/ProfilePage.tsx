import React, { useState } from 'react';
import { ReaperMascot, BottomNav, StatusBadge, tw, C } from './shared';

// ─── Profile & Settings ───────────────────────────────────────────────────────
// Matches Whisk prototype: alias, survival stats, achievements,
// rewards & status, settings panel, help & legal, danger zone

interface Achievement {
  id: string;
  icon: string;
  label: string;
  earned: boolean;
}

interface ProfileData {
  alias: string;
  realName?: string;
  streak: number;
  seasonsSurvived: number;
  currentStatus: 'alive' | 'fallen';
  currentSeason: number;
  rewardEligibility: 'active' | 'pending' | 'ineligible';
  connectedWearable: string;
  timezone: string;
  privacyLocked: boolean;
  researchConsent: boolean;
}

const mockAchievements: Achievement[] = [
  { id: 'leader', icon: '👑', label: 'Leader', earned: true },
  { id: 'achievement', icon: '🏆', label: 'Achievement', earned: true },
  { id: 'life', icon: '♥', label: 'Life', earned: true },
  { id: 'graveyard', icon: '☠', label: 'Graveyard', earned: false },
  { id: 'countdown', icon: '⏳', label: 'Countdown', earned: true },
  { id: 'midnight', icon: '🌙', label: 'Midnight', earned: false },
  { id: 'streak', icon: '⚡', label: 'Streak', earned: true },
  { id: 'ghost', icon: '👻', label: 'Ghost', earned: false },
];

const defaultProfile: ProfileData = {
  alias: 'PIXEL_RUNNER_7',
  realName: 'Ashleigh Carlson',
  streak: 75,
  seasonsSurvived: 3,
  currentStatus: 'alive',
  currentSeason: 3,
  rewardEligibility: 'active',
  connectedWearable: 'Apple Watch Series 7',
  timezone: '[UTC-5 (EST)]',
  privacyLocked: true,
  researchConsent: true,
};

export default function ProfilePage({
  profile = defaultProfile,
  onNavigate,
  onLogout,
  onDeleteAccount,
}: {
  profile?: ProfileData;
  onNavigate?: (tab: string) => void;
  onLogout?: () => void;
  onDeleteAccount?: () => void;
}) {
  const [researchConsent, setResearchConsent] = useState(profile.researchConsent);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-black text-[#e5e3d0] font-mono pb-24">
      {/* ── Header ── */}
      <header className="px-4 pt-5 pb-4 border-b border-[#2a2a2a]">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest text-center mb-3">
          Profile
        </p>
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-[#161616] border-2 border-[#84ff00]/40 flex items-center justify-center flex-shrink-0">
            <ReaperMascot variant="thumbsup" size={44} />
          </div>
          <div className="flex-1">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest">Alias</p>
            <p className="font-mono font-bold text-base" style={{ color: C.green }}>
              {profile.alias}
            </p>
            <p className="text-[10px] text-gray-500 italic mt-0.5">
              "Aliases are acceptable. Excuses are not."
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {/* ── Survival Stats ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4 space-y-3">
          <StatRow
            label="Survival Streak"
            value={`${profile.streak} DAYS`}
            icon="⚡"
            green
            large
          />
          <StatRow
            label="Seasons Survived"
            value={`${profile.seasonsSurvived} SEASONS`}
            icon="👑"
            large
          />
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest">Current Status</p>
              <div className="mt-1">
                <StatusBadge status={profile.currentStatus} />
                <span className="text-[10px] text-gray-500 ml-1">
                  (Season {profile.currentSeason})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Achievements ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Achievements</p>
            <button className="text-[10px] text-[#84ff00] hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {mockAchievements.map((a) => (
              <div
                key={a.id}
                className={`flex flex-col items-center gap-1 p-2 border ${
                  a.earned
                    ? 'border-[#84ff00]/30 bg-[#84ff00]/5'
                    : 'border-[#2a2a2a] opacity-40'
                }`}
              >
                <span className="text-xl">{a.icon}</span>
                <p className="text-[8px] font-mono text-center text-gray-400 uppercase leading-tight">
                  {a.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-600 text-center mt-3 italic">
            "Your record is stored."
          </p>
        </div>

        {/* ── Rewards & Status ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">
            Rewards & Status
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#e5e3d0]">Reward Eligibility Status:</p>
            <span
              className={`text-xs font-mono border px-2 py-0.5 ${
                profile.rewardEligibility === 'active'
                  ? 'text-[#84ff00] border-[#84ff00]/40'
                  : 'text-gray-500 border-gray-500/40'
              }`}
            >
              [{profile.rewardEligibility.toUpperCase()}]
            </span>
          </div>
          {profile.rewardEligibility === 'active' && (
            <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
              You are eligible for prize draws. Keep surviving to maintain eligibility.
            </p>
          )}
        </div>

        {/* ── Settings ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-1">
            ⚙ Settings
          </p>
          <div className="space-y-3">
            <SettingRow
              label="Connected Wearable"
              value={profile.connectedWearable}
              icon="⌚"
            />
            <SettingRow
              label="Timezone"
              value={profile.timezone}
              icon="🌐"
            />
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">🔒</span>
                <div>
                  <p className="text-xs text-[#e5e3d0]">Privacy Settings</p>
                  <p className="text-[9px] text-gray-500">
                    {profile.privacyLocked ? 'Locked' : 'Open'}
                  </p>
                </div>
              </div>
              <span className="text-[#84ff00] text-lg">
                {profile.privacyLocked ? '🔒' : '🔓'}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-t border-[#2a2a2a] mt-1 pt-3">
              <div>
                <p className="text-xs text-[#e5e3d0]">Research Consent</p>
                <p className="text-[9px] text-gray-500 leading-relaxed mt-0.5">
                  "The details matter more than people think."
                </p>
              </div>
              <button
                onClick={() => setResearchConsent(!researchConsent)}
                className={`flex-shrink-0 w-10 h-5 rounded-full transition-colors relative ${
                  researchConsent ? 'bg-[#84ff00]' : 'bg-[#2a2a2a]'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-black transition-transform ${
                    researchConsent ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ── Help & Legal ── */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-1">
            ⚔ Help & Legal
          </p>
          <div className="space-y-1">
            {[
              { label: 'Support / Disputes', href: '/support' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Privacy Policy', href: '/privacy' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between py-2 border-b border-[#2a2a2a] last:border-b-0 hover:text-[#84ff00] transition-colors"
              >
                <span className="text-xs text-[#e5e3d0]">{item.label}</span>
                <span className="text-gray-500 text-xs">›</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Danger Zone ── */}
        <div className="bg-[#161616] border border-red-900/40 p-4 space-y-2">
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full py-2.5 border border-red-500/40 text-red-500 font-mono text-xs uppercase tracking-widest hover:bg-red-500/10 transition-colors"
            >
              Delete Account
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-red-400 text-center">
                This is permanent. The ledger forgets nothing, but your account will be gone.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onDeleteAccount}
                  className="py-2 bg-red-600 text-white font-mono text-xs uppercase tracking-widest hover:bg-red-700 transition-colors"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className={tw.ghostBtn + ' py-2'}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <button
            onClick={onLogout}
            className="w-full py-2.5 border border-[#84ff00]/40 text-[#84ff00] font-mono text-xs uppercase tracking-widest hover:bg-[#84ff00]/10 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <BottomNav active="profile" onNavigate={onNavigate as any} />
    </div>
  );
}

function StatRow({
  label,
  value,
  icon,
  green,
  large,
}: {
  label: string;
  value: string;
  icon: string;
  green?: boolean;
  large?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={large ? 'text-2xl' : 'text-lg'}>{icon}</span>
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-widest">{label}</p>
        <p
          className={`font-mono font-bold ${
            large ? 'text-xl' : 'text-sm'
          } ${green ? 'text-[#84ff00]' : 'text-[#e5e3d0]'}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function SettingRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="text-sm flex-shrink-0">{icon}</span>
      <div className="flex-1">
        <p className="text-[9px] text-gray-500 uppercase tracking-widest">{label}</p>
        <p className="text-xs text-[#e5e3d0]">{value}</p>
      </div>
    </div>
  );
}
