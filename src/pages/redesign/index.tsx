// ─── REAP Redesign Pages ──────────────────────────────────────────────────────
// All pages based on Whisk v2 prototypes.
// Drop these into your survivethereap.com project and wire up to your router.
//
// Asset paths expected under /public/assets/:
//   reap-logo.png          — pixel-art REAP stone/graveyard/heart logo
//   reaper-default.png     — standing Reaper with scythe
//   reaper-running.png     — running Reaper
//   reaper-ledger.png      — Reaper holding open book/ledger
//   reaper-thumbsup.png    — Reaper thumbs up
//   reaper-scythe.png      — Reaper scythe swing
//   reaper-wave.png        — Reaper waving
//   reaper-megaphone.png   — Reaper with megaphone
//   reaper-thinking.png    — Reaper thinking/questioning
//   reaper-shocked.png     — Reaper shocked
//   reaper-trophy.png      — Reaper holding trophy
//   reaper-error.png       — Reaper error/X eyes
//
// Font: Add to your index.html or CSS:
//   <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
//   Then add to tailwind.config.js: fontFamily: { pixel: ['"Press Start 2P"', 'monospace'] }

export { default as LandingPage } from './LandingPage';
export { default as AuthPages } from './AuthPages';
export { default as OnboardingPage } from './OnboardingPage';
export { default as HomePage } from './HomePage';
export { default as ActivityPage } from './ActivityPage';
export { default as LedgerPage } from './LedgerPage';
export { default as ProfilePage } from './ProfilePage';
export { default as TeamsPage } from './TeamsPage';

// Shared design system components (use these in your own components too)
export {
  ReapLogo,
  ReaperMascot,
  StatusBadge,
  CircularProgress,
  CountdownTimer,
  BottomNav,
  WeekBarChart,
  Divider,
  GreenHeart,
  C,     // color constants
  tw,    // tailwind class strings
} from './shared';
