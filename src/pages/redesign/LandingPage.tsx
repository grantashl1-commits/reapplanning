import React, { useState } from 'react';
import { ReapLogo, ReaperMascot, tw, C } from './shared';

// ─── Landing Page ─────────────────────────────────────────────────────────────
// Three slides carousel + feature accordion + CTA
// Matches Whisk prototype: "Move Daily. Stay Alive. Reap the Rewards."

type Slide = 'overview' | 'mascot' | 'ledger';

const features = [
  {
    icon: '♥',
    title: 'DAILY SURVIVAL',
    body: '22 minutes required daily, deadline applies, consistency matters.',
  },
  {
    icon: '⌚',
    title: 'WEARABLES & VERIFICATION',
    body: 'Apple Health, Health Connect, Garmin, Fitbit, Terra, Bluetooth heart rate monitors, other approved providers.',
  },
  {
    icon: '✚',
    title: 'HEALTH & SAFETY',
    body: 'Move within your own abilities, consult a health professional if unsure. REAP encourages safe physical activity.',
  },
];

// Pixel-art names book placeholder text
const LEDGER_NAMES = [
  'SHADOW_RIDER_42', 'NIGHT_STALKER_9', 'PIXEL_CRUSHER_8',
  'IRONLUNG_07', 'COUCH_POTATO', 'MOON_WALKER_X',
  'CARDIO_KAREN', 'GLUTE_OVERLORD', 'ECHO_LOCATED',
  'CRUSTY_CARDIO', 'HEART_RATE_HEATHER', 'BAT_OUTTA_HELL',
  'AUNTY_AEROBIC', 'SOFA_KING_FIT', 'LUNG_GOBLIN',
  'PALE_HORSE', 'ROBOST', 'NIGHTRUNNER',
];

export default function LandingPage({ onEnter }: { onEnter?: () => void }) {
  const [slide, setSlide] = useState<Slide>('overview');
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-[#e5e3d0] font-mono flex flex-col items-center px-5 pb-24">
      {/* Header */}
      <div className="pt-10 pb-6 flex flex-col items-center">
        <ReapLogo size="lg" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-2">
          Global Survival Fitness Challenge
        </p>
      </div>

      {/* Slide Tabs */}
      <div className="flex gap-2 mb-4">
        {(['overview', 'mascot', 'ledger'] as Slide[]).map((s) => (
          <button
            key={s}
            onClick={() => setSlide(s)}
            className={`w-2 h-2 rounded-full transition-colors ${
              slide === s ? 'bg-[#84ff00]' : 'bg-[#2a2a2a]'
            }`}
          />
        ))}
      </div>

      {/* Slide Panel */}
      <div className="w-full max-w-sm mb-6">
        {slide === 'overview' && <OverviewSlide />}
        {slide === 'mascot' && <MascotSlide />}
        {slide === 'ledger' && <LedgerSlide />}
      </div>

      {/* Feature Accordion */}
      <div className="w-full max-w-sm space-y-px mb-8">
        {features.map((f, i) => (
          <div key={i} className="bg-[#161616] border border-[#2a2a2a]">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 text-left"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <span className="text-[#84ff00] text-sm w-5 flex-shrink-0">{f.icon}</span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#e5e3d0] flex-1">
                {f.title}
              </span>
              <span
                className="text-gray-500 text-xs transition-transform"
                style={{ transform: expanded === i ? 'rotate(90deg)' : 'none' }}
              >
                ›
              </span>
            </button>
            {expanded === i && (
              <div className="px-4 pb-3 text-xs text-gray-400 font-mono leading-relaxed border-t border-[#2a2a2a]">
                {f.body}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="w-full max-w-sm space-y-3">
        <button
          onClick={onEnter}
          className={tw.greenBtn}
        >
          Enter the Challenge
        </button>
        <div className="flex justify-center gap-6 text-[10px] text-gray-500">
          <a href="/terms" className="hover:text-[#84ff00] transition-colors">Terms & Conditions</a>
          <a href="/privacy" className="hover:text-[#84ff00] transition-colors">Privacy Policy</a>
          <a href="/health" className="hover:text-[#84ff00] transition-colors">Health Declaration</a>
        </div>
      </div>
    </div>
  );
}

function OverviewSlide() {
  return (
    <div className="bg-[#161616] border border-[#2a2a2a] p-5 space-y-3">
      <h1 className="font-mono font-bold text-xl text-[#e5e3d0] leading-snug">
        Move Daily. Stay Alive.<br />
        <span style={{ color: C.green }}>Reap the Rewards.</span>
      </h1>
      <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
        <p>
          REAP is a global survival fitness challenge developed by The Living Lab, Sport Waikato's
          physical activity innovation studio.
        </p>
        <p>Complete at least 22 qualifying minutes of movement each day.</p>
        <p>Every day completed keeps you alive.</p>
        <p>Miss your daily deadline and The Reaper records it in the ledger.</p>
        <p>
          The Reaper is not a coach or mascot. He is a very old observer who keeps a record of
          inactivity.
        </p>
        <p>The challenge is the product. The reward is surviving.</p>
        <p>
          Those who survive may become eligible to reap additional independently funded rewards.
        </p>
        <p className="text-gray-600 italic">Participation does not guarantee a prize.</p>
      </div>
    </div>
  );
}

function MascotSlide() {
  return (
    <div className="bg-[#161616] border border-[#2a2a2a] p-5 flex flex-col items-center gap-5">
      {/* Reaper on graveyard background */}
      <div className="relative w-full flex justify-center py-4">
        {/* Green topo-map texture background — replace with actual bg image */}
        <div
          className="absolute inset-0 opacity-10 rounded"
          style={{ background: 'radial-gradient(ellipse at 50% 70%, #84ff00 0%, transparent 70%)' }}
        />
        <ReaperMascot variant="scythe" size={120} />
      </div>
      {/* Reaper quote */}
      <div className="bg-[#0e0e0e] border border-[#2a2a2a] px-4 py-3 w-full">
        <p className="text-xs text-[#e5e3d0] font-mono italic text-center leading-relaxed">
          "Stay moving and I remain pleasantly unemployed."
        </p>
      </div>
    </div>
  );
}

function LedgerSlide() {
  return (
    <div className="bg-[#161616] border border-[#2a2a2a] p-5">
      {/* Open book illustration — swap for actual pixel art asset */}
      <div className="flex justify-center mb-4">
        <div className="w-48 h-28 bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center rounded-sm relative overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="flex-1 border-r border-[#3a3a3a] p-2 overflow-hidden">
              {LEDGER_NAMES.slice(0, 9).map((n, i) => (
                <p key={i} className="text-[7px] text-gray-500 font-mono leading-tight truncate">
                  {n}
                </p>
              ))}
            </div>
            <div className="flex-1 p-2 overflow-hidden">
              {LEDGER_NAMES.slice(9).map((n, i) => (
                <p key={i} className="text-[7px] text-gray-500 font-mono leading-tight truncate">
                  {n}
                </p>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-black/40 to-transparent" />
        </div>
      </div>
      <p className="text-[10px] text-gray-400 font-mono text-center leading-relaxed">
        Every entry is permanent. Every absence is noted.
        <br />
        <span style={{ color: C.green }}>Your name goes in the ledger today.</span>
      </p>
    </div>
  );
}
