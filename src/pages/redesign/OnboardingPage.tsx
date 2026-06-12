import React, { useState } from 'react';
import { ReapLogo, ReaperMascot, tw, C } from './shared';

// ─── Onboarding — Set Your Record ────────────────────────────────────────────
// 3-step flow before entering a season
// Matches Whisk prototype: "Aliases are acceptable. Excuses are not."

type ActivityType = 'running' | 'scythe' | 'other';
type DevicePreference = 'apple-watch' | 'fitbit' | 'garmin' | 'health-connect' | 'terra' | 'ble' | 'none';
type DisplayPreference = 'real-name' | 'alias';

interface OnboardingData {
  displayName: string;
  dateOfBirth: string;
  isOver18: boolean;
  region: string;
  timezone: string;
  activityTypes: ActivityType[];
  devicePreference: DevicePreference;
  displayPreference: DisplayPreference;
  consent18: boolean;
  consentTerms: boolean;
  consentPrivacy: boolean;
  consentHealth: boolean;
  consentUnderstand: boolean;
  consentResearch: boolean;
  consentUpdates: boolean;
}

const defaultData: OnboardingData = {
  displayName: '',
  dateOfBirth: '',
  isOver18: false,
  region: '',
  timezone: '',
  activityTypes: ['running'],
  devicePreference: 'apple-watch',
  displayPreference: 'alias',
  consent18: false,
  consentTerms: false,
  consentPrivacy: false,
  consentHealth: false,
  consentUnderstand: false,
  consentResearch: false,
  consentUpdates: false,
};

const regions = [
  'Waikato', 'Auckland', 'Wellington', 'Canterbury', 'Otago',
  'Bay of Plenty', 'Hawke\'s Bay', 'Taranaki', 'Other NZ', 'International',
];

const devices: { id: DevicePreference; label: string }[] = [
  { id: 'apple-watch', label: 'Apple Watch' },
  { id: 'fitbit', label: 'Fitbit' },
  { id: 'garmin', label: 'Garmin' },
  { id: 'health-connect', label: 'Health Connect' },
  { id: 'terra', label: 'Terra' },
  { id: 'ble', label: 'Bluetooth HRM' },
  { id: 'none', label: 'None / Screenshots' },
];

const activityOptions: { id: ActivityType; label: string; icon: string }[] = [
  { id: 'running', label: 'Running', icon: '🏃' },
  { id: 'scythe', label: 'Scythe Swing', icon: '⚔️' },
  { id: 'other', label: 'Other', icon: '👍' },
];

export default function OnboardingPage({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(defaultData);

  function update<K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleActivity(type: ActivityType) {
    setData((prev) => ({
      ...prev,
      activityTypes: prev.activityTypes.includes(type)
        ? prev.activityTypes.filter((t) => t !== type)
        : [...prev.activityTypes, type],
    }));
  }

  const allConsentGiven =
    data.consent18 && data.consentTerms && data.consentPrivacy &&
    data.consentHealth && data.consentUnderstand;

  return (
    <div className="min-h-screen bg-black text-[#e5e3d0] font-mono flex flex-col items-center px-5 pb-24">
      {/* Header */}
      <div className="pt-8 pb-4 flex justify-center">
        <ReapLogo size="sm" />
      </div>

      {/* Step indicator */}
      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">
        Step {step} of 3:{' '}
        <span className="text-[#84ff00]">
          {step === 1 && 'Set Your Record'}
          {step === 2 && 'Display Preference'}
          {step === 3 && 'Consent'}
        </span>
      </div>

      {/* Reaper message */}
      <div className="w-full max-w-sm flex items-center gap-3 mb-5">
        <ReaperMascot variant="ledger" size={52} />
        <div className="flex-1 bg-[#161616] border border-[#2a2a2a] px-3 py-2.5 text-xs text-[#e5e3d0] leading-relaxed">
          {step === 1 && 'Aliases are acceptable. Excuses are not.'}
          {step === 2 && 'Choose how you appear. The ledger is public.'}
          {step === 3 && 'Read before you sign. The Reaper notices.'}
        </div>
      </div>

      <div className="w-full max-w-sm">
        {step === 1 && <Step1 data={data} update={update} toggleActivity={toggleActivity} />}
        {step === 2 && <Step2 data={data} update={update} />}
        {step === 3 && <Step3 data={data} update={update} allConsent={allConsentGiven} />}

        {/* Navigation */}
        <div className="mt-6 space-y-3">
          {step < 3 ? (
            <button
              onClick={() => setStep((s) => Math.min(s + 1, 3))}
              disabled={step === 1 && (!data.displayName || !data.dateOfBirth)}
              className={`${tw.greenBtn} disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={onComplete}
              disabled={!allConsentGiven}
              className={`${tw.greenBtn} disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              Save My Record
            </button>
          )}
          {step > 1 && (
            <button
              onClick={() => setStep((s) => Math.max(s - 1, 1))}
              className={tw.ghostBtn}
            >
              ← Back
            </button>
          )}
        </div>

        {/* Legal links */}
        <div className="flex justify-center gap-4 mt-4 text-[10px] text-gray-600">
          <a href="/terms" className="hover:text-[#84ff00]">Terms</a>
          <a href="/privacy" className="hover:text-[#84ff00]">Privacy Policy</a>
          <a href="/health" className="hover:text-[#84ff00]">Health Declaration</a>
        </div>
      </div>
    </div>
  );
}

// ─── Step 1: Identity & Preferences ──────────────────────────────────────────
function Step1({
  data,
  update,
  toggleActivity,
}: {
  data: OnboardingData;
  update: <K extends keyof OnboardingData>(k: K, v: OnboardingData[K]) => void;
  toggleActivity: (t: ActivityType) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-[#161616] border border-[#2a2a2a] p-4 space-y-4">
        <div>
          <h3 className="font-mono font-bold text-base text-[#e5e3d0]">Set Your Record</h3>
          <p className="text-xs text-gray-500 mt-1">
            Before you enter the season, The Ledger needs a few details.
          </p>
        </div>

        <Field label="Display name or alias">
          <input
            type="text"
            value={data.displayName}
            onChange={(e) => update('displayName', e.target.value)}
            placeholder="e.g. PHOENIX, NOVA_11"
            className={tw.input}
            maxLength={30}
          />
          <p className="text-[10px] text-gray-600 mt-1">Display name or alias/wow or alias</p>
        </Field>

        <Field label="Date of birth">
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={data.dateOfBirth}
              onChange={(e) => update('dateOfBirth', e.target.value)}
              className={`${tw.input} flex-1`}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                .toISOString()
                .split('T')[0]}
            />
            <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer whitespace-nowrap">
              <input
                type="checkbox"
                checked={data.isOver18}
                onChange={(e) => update('isOver18', e.target.checked)}
                className="accent-[#84ff00]"
              />
              Confirm 18+
            </label>
          </div>
          <p className="text-[10px] text-gray-600 mt-1">
            Used to calculate your Zone 2 heart-rate range. Must be 18+.
          </p>
        </Field>

        <Field label="Region">
          <select
            value={data.region}
            onChange={(e) => update('region', e.target.value)}
            className={`${tw.input} appearance-none`}
          >
            <option value="">Select region</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </Field>

        <Field label="Registered timezone">
          <div className="relative">
            <input
              type="text"
              value={data.timezone}
              onChange={(e) => update('timezone', e.target.value)}
              placeholder="IANA names search e.g. Pacific/Auckland"
              className={tw.input}
            />
          </div>
          <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-2 mt-2">
            <p className="text-[10px] text-[#84ff00] font-mono">Your timezone matters</p>
            <p className="text-[10px] text-gray-500 leading-relaxed mt-1">
              Your daily deadline is based on your registered timezone. Once the season starts,
              timezone changes may be locked or require review.
            </p>
          </div>
        </Field>

        <Field label="Preferred activity types">
          <div className="flex gap-2">
            {activityOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleActivity(opt.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs transition-colors ${
                  data.activityTypes.includes(opt.id)
                    ? 'border-[#84ff00] text-[#84ff00] bg-[#84ff00]/10'
                    : 'border-[#2a2a2a] text-gray-500'
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </Field>

        <Field label="Connected device preference">
          <select
            value={data.devicePreference}
            onChange={(e) => update('devicePreference', e.target.value as DevicePreference)}
            className={`${tw.input} appearance-none`}
          >
            {devices.map((d) => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
        </Field>
      </div>
    </div>
  );
}

// ─── Step 2: Display Preference ───────────────────────────────────────────────
function Step2({
  data,
  update,
}: {
  data: OnboardingData;
  update: <K extends keyof OnboardingData>(k: K, v: OnboardingData[K]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-[#161616] border border-[#2a2a2a] p-4 space-y-4">
        <div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Use your real first name or an alias on public leaderboards.
          </p>
        </div>

        <div className="space-y-2">
          {(['real-name', 'alias'] as DisplayPreference[]).map((pref) => (
            <button
              key={pref}
              type="button"
              onClick={() => update('displayPreference', pref)}
              className={`w-full flex items-center gap-3 p-3 border text-sm transition-colors ${
                data.displayPreference === pref
                  ? 'border-[#84ff00] bg-[#84ff00]/10 text-[#84ff00]'
                  : 'border-[#2a2a2a] text-gray-400 hover:border-[#84ff00]/30'
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                  data.displayPreference === pref
                    ? 'border-[#84ff00] bg-[#84ff00]'
                    : 'border-gray-600'
                }`}
              />
              {pref === 'real-name' ? 'Show real name on leaderboard' : 'Show alias on leaderboard'}
            </button>
          ))}
        </div>

        <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-3">
          <p className="text-[10px] text-gray-500 leading-relaxed">
            {data.displayPreference === 'alias'
              ? 'Your alias will appear publicly. Your real name stays private.'
              : 'Your real first name will appear on public leaderboards.'}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Consent ──────────────────────────────────────────────────────────
function Step3({
  data,
  update,
  allConsent,
}: {
  data: OnboardingData;
  update: <K extends keyof OnboardingData>(k: K, v: OnboardingData[K]) => void;
  allConsent: boolean;
}) {
  const required: { key: keyof OnboardingData; label: string }[] = [
    { key: 'consent18', label: 'I confirm I am 18 or older' },
    { key: 'consentTerms', label: 'I accept the Terms of Participation' },
    { key: 'consentPrivacy', label: 'I accept the Privacy Policy' },
    { key: 'consentHealth', label: 'I accept the Health Declaration' },
    { key: 'consentUnderstand', label: 'I understand REAP is a physical activity challenge' },
  ];
  const optional: { key: keyof OnboardingData; label: string }[] = [
    { key: 'consentResearch', label: 'Optional: I consent to anonymised Living Lab research' },
    { key: 'consentUpdates', label: 'Optional: Send me REAP updates and season news' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-[#161616] border border-[#2a2a2a] p-4 space-y-4">
        <div className="bg-[#0e0e0e] border border-[#84ff00]/20 p-3">
          <p className="text-[10px] text-[#84ff00] font-mono uppercase tracking-widest mb-1">
            This is a movement challenge
          </p>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            REAP is a physical activity challenge designed to help you build daily movement habits.
            It is not a prize-first competition.
          </p>
        </div>

        <div className="space-y-3">
          {required.map(({ key, label }) => (
            <ConsentRow
              key={key}
              checked={data[key] as boolean}
              onChange={(v) => update(key, v)}
              label={label}
              required
            />
          ))}
        </div>

        <div className="border-t border-[#2a2a2a] pt-3 space-y-3">
          {optional.map(({ key, label }) => (
            <ConsentRow
              key={key}
              checked={data[key] as boolean}
              onChange={(v) => update(key, v)}
              label={label}
              required={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ConsentRow({
  checked,
  onChange,
  label,
  required,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  required: boolean;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 accent-[#84ff00] flex-shrink-0"
      />
      <span
        className={`text-xs leading-relaxed ${
          checked ? 'text-[#e5e3d0]' : 'text-gray-500'
        } group-hover:text-[#e5e3d0] transition-colors`}
      >
        {label}
        {required && <span className="text-[#84ff00] ml-1">*</span>}
      </span>
    </label>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
