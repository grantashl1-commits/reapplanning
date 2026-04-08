# REAP — Lovable Build Prompts
## Complete Series: Compliance Fixes, Features & Website Content
**Project:** Survive the Reap | Sport Waikato Living Lab
**Date:** 8 April 2026
**Developer:** Ashleigh Carlson

---

## HOW TO USE THIS DOCUMENT

Paste each prompt directly into Lovable as a new message. Work through them in order — each group has dependencies on the previous. Prompts marked **CRITICAL** must be done before any others in their category. Prompts marked **SECURITY — DO TODAY** must be done immediately.

Do not combine prompts into one Lovable message unless explicitly noted. Lovable works best with one focused change at a time.

---

# GROUP 1 — CRITICAL SECURITY (DO TODAY)

---

## PROMPT 1: Remove Hardcoded Credentials
**Priority:** SECURITY — DO TODAY
**Affects:** `supabase/functions/reset-admin/index.ts`, `supabase/functions/seed-demo/index.ts`

```
In the file supabase/functions/reset-admin/index.ts, remove the hardcoded password "ReapAdmin2026!" and replace it with a reference to a Supabase environment variable called ADMIN_RESET_PASSWORD. The function should read: const adminPassword = Deno.env.get('ADMIN_RESET_PASSWORD');

In the file supabase/functions/seed-demo/index.ts, remove the hardcoded password "SurviveOrFall2026!" and replace it with a reference to a Supabase environment variable called DEMO_SEED_PASSWORD. The function should read: const demoPassword = Deno.env.get('DEMO_SEED_PASSWORD');

Also check the entire codebase for any other hardcoded passwords, API keys, or secrets and replace them all with Deno.env.get() references. List every file changed.

Do not change any other logic in these functions.
```

---

## PROMPT 2: Fix Stripe Billing Mode + Add Cancellation Flow
**Priority:** CRITICAL — Legal (Fair Trading Act)
**Affects:** `supabase/functions/create-checkout/index.ts`, `src/pages/Register.tsx`, `src/pages/ProfileSettings.tsx`

```
In supabase/functions/create-checkout/index.ts, change the Stripe checkout mode from "subscription" to "payment" so participants are charged a one-time fee per season rather than an ongoing monthly subscription.

Update the line_items to use the existing price ID but with mode: "payment" instead of mode: "subscription".

In src/pages/Register.tsx, update the pricing copy wherever "$14.99 NZD / MONTH" appears to read "$14.99 NZD / SEASON" and update "SECURE YOUR SEASON PASS" to remain as-is.

In src/pages/ProfileSettings.tsx, add a section called "Season Membership" that shows the current season's status and a button labelled "Cancel / Don't Renew" that links to a Stripe customer portal session for managing their subscription, or displays contact information if not yet integrated.

Do not change any other logic.
```

---

## PROMPT 3: Fix "At Random" vs "Skill-Based" Legal Contradiction
**Priority:** CRITICAL — Legal (Gambling Act 2003)
**Affects:** `src/pages/Rules.tsx`, `src/pages/Terms.tsx`

```
In src/pages/Rules.tsx, find the SPOT PRIZES FAQ section. Replace the current text "Spot prizes may be awarded at random during the season to active players. Prizes are incidental rewards for participation and are not guaranteed." with this exact text:

"Sport Waikato may award spot prizes to active survivors during and within 7 days of the end of each season. Eligible participants are those who have not been eliminated and whose season membership is current at the time of the draw. Prizes are funded independently by Sport Waikato from its operating budget — no portion of season entry fees is used to fund prizes. Prize recipients are selected by Sport Waikato based on participation criteria including survival duration and activity performance. Prizes are an incidental reward for completing the challenge and are not the primary purpose of REAP. No additional payment is required to be eligible."

In src/pages/Terms.tsx, find Section 6 PRIZE COMPETITIONS. Replace the entire section content with this text:

"6. PRIZE COMPETITIONS

Sport Waikato may conduct spot prize draws for active REAP participants during and within 7 days of the conclusion of each season. These prize draws are incidental to the main REAP season challenge, which is a physical activity participation event.

Prize draws are open only to active survivors — participants who have not been eliminated and whose season membership is current. No additional payment or action is required to be eligible. Entry to the prize draw is free and automatic for all eligible active survivors.

All prizes are funded independently by Sport Waikato from its operational budget. No season entry fee revenue is used to fund prizes. Prize values, categories, and selection criteria are announced at the commencement of each season.

These prize competitions are conducted in accordance with New Zealand law. The spot prize draw is subsidiary to, and forms part of, the main REAP season event."

Do not change any other sections of Rules.tsx or Terms.tsx.
```

---

## PROMPT 4: Add Prize Funding Separation + Sport Waikato Attribution
**Priority:** CRITICAL — Legal + Reputational
**Affects:** `src/pages/Terms.tsx`, `src/components/` (layout/footer)

```
In src/pages/Terms.tsx, add a new subsection to Section 5 (PAYMENTS & REFUNDS) after the existing refund text. Add this paragraph:

"Prize Funding: Season entry fees are collected solely for access to the REAP season platform and service. No portion of any participant's subscription fee is pooled, aggregated, or used to fund any prize draw. All spot prizes are funded exclusively from Sport Waikato's operational budget as a separate expenditure, independently of revenue received from season entry fees."

In the main app layout (likely src/App.tsx or a layout component), add a persistent footer that appears on all pages. The footer should contain this text in small muted font: "REAP is a Sport Waikato Living Lab programme. A charitable trust. Revenue supports community sport and physical activity in Aotearoa New Zealand." alongside the existing Terms / Privacy / Live Board links.

Also add the same attribution line in small text directly below the REAP logo in the main navigation header: "A Sport Waikato Living Lab programme"
```

---

# GROUP 2 — CORE INFRASTRUCTURE (BUILD FIRST — EVERYTHING DEPENDS ON THIS)

---

## PROMPT 5: Midnight Elimination Cron Job
**Priority:** CRITICAL — Core product mechanic
**Affects:** New Supabase edge function + pg_cron configuration

```
Create a new Supabase edge function called "midnight-elimination" that runs the following logic:

1. Query the season_entries table for all records where status is 'ALIVE' or 'AT_RISK' in the current season month (format: YYYY-MM).

2. For each player, check the daily_activity table for today's date (using New Zealand time: UTC+13 in summer, UTC+12 in winter — use the timezone 'Pacific/Auckland').

3. Also check the redemption_days table — if the player has a record for today's date (used_date = today), mark them as surviving regardless of activity.

4. If a player has zone2_minutes >= 21 for today, update their season_entries status to 'ALIVE'.

5. If a player has zone2_minutes < 21 for today AND has not used a Redemption Day today, update their season_entries status to 'FALLEN' and set a fallen_at timestamp to now().

6. After processing all players, send an email via Resend to each newly eliminated player using the existing email template style. Subject: "The Reaper came at midnight." Body: "Your survival ended on Day [X]. You moved for [Y] days. That's [Y] more days of movement than you had before REAP. Season [next month] opens soon — come back and survive longer."

7. Log all eliminations to a new table called elimination_log with columns: user_id, season_month, eliminated_at, days_survived, final_zone2_minutes.

Create a database migration to add the elimination_log table with the columns above plus an id (uuid primary key) and created_at timestamp.

Enable this edge function to be called via a cron job. Add a pg_cron schedule in a new migration that runs this function daily at 23:59:00 in Pacific/Auckland timezone (which is 10:59 UTC in summer / 11:59 UTC in winter — use the IANA timezone approach).

Important: This function must be idempotent — if it runs twice on the same day, it should not double-eliminate anyone. Add a check: if fallen_at is already set for today, skip that player.
```

---

## PROMPT 6: Stripe Webhook Handler
**Priority:** CRITICAL — Payment audit trail
**Affects:** New Supabase edge function

```
Create a new Supabase edge function called "stripe-webhook" that handles incoming Stripe webhook events.

The function must:
1. Verify the Stripe webhook signature using the STRIPE_WEBHOOK_SECRET environment variable and the stripe-signature header. If verification fails, return 400.

2. Handle the following events:
   - checkout.session.completed: Set season_entries.status to 'CONFIRMED', set season_entries.paid_at to the current timestamp, and set profiles.subscribed to true for the matching user_id. Match by the client_reference_id field in the Stripe session (which should be set to the user's Supabase user ID — update the create-checkout function to include client_reference_id: user.id in the session creation params).
   - customer.subscription.deleted or checkout.session.expired: Set profiles.subscribed to false for the matching customer.

3. Return 200 for all handled events.

In supabase/functions/create-checkout/index.ts, add client_reference_id: user.id to the Stripe session creation object so the webhook can match the payment back to the correct user.

Create a database migration to ensure season_entries.paid_at column exists as TIMESTAMPTZ and profiles.subscribed column exists as BOOLEAN DEFAULT false.
```

---

## PROMPT 7: Server-Side Age Verification
**Priority:** CRITICAL — Regulatory
**Affects:** `supabase/functions/create-checkout/index.ts`

```
In supabase/functions/create-checkout/index.ts, add a server-side age check before creating the Stripe checkout session.

After authenticating the user, query the profiles table for the user's dob (date of birth) field.

Calculate the user's age from their dob. If their age is less than 18, return a 403 response with the JSON body: { error: "You must be 18 years or older to purchase a REAP season pass." }

If dob is null or missing from the profile, return a 400 response with the JSON body: { error: "Date of birth is required. Please complete your profile before purchasing." }

Only proceed to create the Stripe checkout session if the user is confirmed to be 18 or older.

Do not change the client-side age check in Register.tsx — keep both checks in place.
```

---

## PROMPT 8: Replace Hardcoded Stats with Live Database Queries
**Priority:** HIGH — Fair Trading Act
**Affects:** `src/pages/SeasonStatus.tsx`, `src/pages/Dashboard.tsx`, `src/components/PublicBoard.tsx` (or equivalent)

```
In src/pages/SeasonStatus.tsx, replace all hardcoded statistics with live database queries:

1. Replace the hardcoded alive count (currently 42) with a Supabase query counting season_entries where status = 'ALIVE' or 'CONFIRMED' for the current season month.

2. Replace the hardcoded fallen count (currently 158) with a Supabase query counting season_entries where status = 'FALLEN' for the current season month.

3. Replace the hardcoded waitlistCount (currently 87) with a Supabase query counting season_entries where status = 'WAITLISTED' for next month's season.

4. Replace the hardcoded lastSeasonSurvivors array (currently ["Ashleigh", "Nova_11", "Matthew", "Blade_X", "Rob"]) with a database query fetching the display_names of players whose status was 'SURVIVED' in the most recently completed season month.

5. If any query returns zero results (the database is empty, e.g. pre-launch), display nothing rather than a placeholder — hide the stats sections entirely if there is no real data to show.

In src/components/PublicBoard.tsx (or equivalent), apply the same approach — remove all hardcoded fallback statistics. If the database is empty, show only the "Season opens November 1" message without fake participant numbers.

Add appropriate loading states while the queries run.
```

---

## PROMPT 9: Fix Admin Panel — Wire FALL/REVIVE Buttons to Database
**Priority:** HIGH
**Affects:** `src/pages/Admin.tsx`

```
In src/pages/Admin.tsx, the FALL and REVIVE buttons in the player management section currently only update local React state (the mockPlayers array) and do not write to the database.

Replace the mockPlayers local state with a real Supabase query that fetches players from the season_entries table joined with profiles, for the currently selected season month.

Wire the FALL button to update the season_entries.status field to 'FALLEN' in the database for the selected player's season entry. Also set a fallen_at timestamp.

Wire the REVIVE button to update the season_entries.status field back to 'ALIVE' in the database for the selected player's season entry. Clear the fallen_at timestamp.

Also fix the SPOT PRIZE MANAGER section: when the admin clicks AWARD PRIZE, instead of only showing toast.success("Prize awarded!"), also:
1. Insert a new record into a prize_awards table with columns: id (uuid), user_id, season_month, prize_description, awarded_at (timestamp), awarded_by (the admin's user_id).
2. Send an email to the winning participant via Resend with subject "You've survived — and won." and body: "Congratulations, [alias]. You've been selected as a REAP spot prize recipient for Season [month]. Prize: [prize_description]. Sport Waikato will be in touch within 5 business days to arrange delivery."

Create a database migration for the prize_awards table with the columns listed above.
```

---

## PROMPT 10: Wire Redemption Day to Elimination Logic
**Priority:** HIGH
**Affects:** `supabase/functions/midnight-elimination/index.ts` (created in Prompt 5)

```
Update the midnight-elimination edge function created previously to correctly check Redemption Day usage before eliminating a player.

The check should work as follows:
1. Before evaluating whether a player's activity meets the threshold, query the redemption_days table for a record matching user_id = [player's user_id] AND used_date = today (in Pacific/Auckland timezone).
2. If a redemption day record exists for today, skip elimination for that player regardless of their zone2_minutes — they survive today.
3. Only proceed with the zone2_minutes < 21 elimination check if no Redemption Day is found for today.

Also update the dashboard Redemption Day card (RedemptionDayCard.tsx) to show: "Redemption Day used — you survive today regardless of activity." when a redemption day has been activated for the current date, instead of showing the normal activity tracking prompt.
```

---

# GROUP 3 — WEBSITE PAGES

---

## PROMPT 11: Update Landing Page (Homepage)
**Priority:** HIGH — Marketing + Legal
**Affects:** `src/pages/Landing.tsx`

```
Rebuild the Landing.tsx page with the following complete content and structure. Keep the existing dark visual theme and pixel/terminal aesthetic. All copy is final — use it exactly as written.

PAGE TITLE: REAP — The Killer Movement App | Move Daily. Stay Alive.
META DESCRIPTION: REAP is a 30-day daily movement survival game. Move 21 minutes a day or get eliminated at midnight. $14.99/season. How long can you survive?

HERO SECTION:
- Headline: THE KILLER MOVEMENT APP
- Subheadline: Move 21 minutes a day. Every day. Miss one — you're dead.
- Body: REAP is not a wellness app. It's a survival game. Move daily or face elimination at midnight. How long can you survive?
- CTA (primary): JOIN THE WAITLIST
- CTA (secondary): SEE HOW IT WORKS

SECTION — THE STAKES:
Heading: Inactivity kills. We made it obvious.
Body: The World Health Organisation estimates physical inactivity is one of the leading risk factors for global mortality. Millions of people know they should move more. They just don't. REAP doesn't lecture you about that. It just eliminates you at midnight if you don't show up. 21 minutes. Zone 2. Every day. That's all it takes to stay alive.

SECTION — HOW IT WORKS (5 steps):
Heading: Five Steps. No Mercy.
Step 1 — JOIN A SEASON: Pay your season pass ($14.99 NZD). Your survival clock starts on Day 1. Every participant starts alive.
Step 2 — MOVE DAILY: Complete at least 21 minutes of Zone 2 cardiovascular activity every day. Walk, run, cycle, swim — your call. Your wearable tracks it.
Step 3 — SYNC BEFORE MIDNIGHT: Connect your device. Your activity syncs to REAP. Hit your 21 minutes before midnight, you survive another day.
Step 4 — MISS A DAY. FACE THE REAP: Miss your 21 minutes? Eliminated at midnight. No extensions. No excuses. No exceptions.
Step 5 — SURVIVE. STAY IN THE DRAW: Every day you survive keeps you eligible for spot prize draws. Survivors earn recognition on the Survival Board.
CTA: See the Full Rules

SECTION — WHY IT WORKS:
Heading: The Psychology of Survival
Subheading: This isn't motivation. This is architecture.
Block 1 — LOSS AVERSION: Humans are wired to avoid loss more powerfully than they pursue gain. REAP doesn't reward movement — it threatens elimination for inactivity. That asymmetry is intentional.
Block 2 — DAILY ACCOUNTABILITY: One clear non-negotiable action each day. No decision fatigue. No "what should I do today?" Just: did you move? Yes or no.
Block 3 — STRUCTURED SIMPLICITY: 21 minutes. Zone 2. Midnight cutoff. Simple enough that your brain can't negotiate with them.
Block 4 — SOCIAL PRESSURE: The Survival Board is public. Your friends can see who's still alive. That visibility creates the accountability that gets you out the door at 11pm.

SECTION — THE SCIENCE (WHO data):
Heading: The Case for 21 Minutes
Four stats displayed as large visual numbers:
- 150–300 min: WHO recommended weekly moderate activity for adults
- 1 in 4: Adults globally who don't meet minimum physical activity guidelines
- 21 min: REAP's daily minimum — meeting the WHO lower threshold every day
- 30 days: One season. One habit. Built for life.

SECTION — TESTIMONIALS (placeholder):
Heading: Voices From the Living
Three testimonial cards — leave as placeholder text noting "[Real participant quotes added after Season 1]"

SECTION — SPORT WAIKATO LIVING LAB:
Heading: Built by a Charitable Trust. For a Reason.
Body: REAP is a product of the Sport Waikato Living Lab — a behavioural health research initiative of Sport Waikato, a charitable trust in the Waikato region of New Zealand. Every season pass goes toward community sport and physical activity programmes. Revenue funds the mission. The mission is getting people moving.
CTA: Learn About Sport Waikato

SECTION — FAQ PREVIEW:
Heading: Quick Answers
Q: Is this actually a game? A: Yes. Real rules, real elimination, real consequences. The movement is also real — and the health benefits are very real.
Q: What counts as Zone 2? A: Any sustained cardio where you can hold a conversation but couldn't sing. Your wearable measures it.
Q: What happens when I'm eliminated? A: Your survival ends. You can re-enter next season. Your data is saved.
Q: What's the spot prize? A: Active survivors are eligible for spot prize draws funded independently by Sport Waikato. Prizes are incidental — REAP is a movement game first, always.
Q: Can I get a refund? A: Season passes are non-refundable once the season begins. See our Terms.
CTA: Read the Full FAQ

FINAL CTA SECTION:
Heading: The Season Starts November 1.
Body: The first REAP season launches November 1, 2026. The first Friday 13th event: November 13. Join the waitlist now and be first in.
CTA (primary): JOIN THE WAITLIST — IT'S FREE
CTA (secondary): LEARN HOW IT WORKS

At the very bottom of the page, above the footer, add this attribution line in small muted text:
"REAP is a Sport Waikato Living Lab programme. Sport Waikato is a charitable trust. All revenue supports community sport and physical activity in Aotearoa New Zealand."
```

---

## PROMPT 12: Build New "How It Works" Page
**Priority:** HIGH — Marketing + SEO
**Create:** `src/pages/HowItWorks.tsx` + add route

```
Create a new page at the route /how-it-works called HowItWorks.tsx. Use the existing dark terminal/pixel aesthetic.

PAGE TITLE: How REAP Works — Rules, Zones, and the Midnight Elimination
META DESCRIPTION: Everything you need to know about REAP — Zone 2 explained, the Midnight Reap, Redemption Days, device compatibility, and the Survival Board.

HERO:
Headline: Here's How You Stay Alive.
Subheadline: Simple rules. No exceptions. You either moved today or you didn't.

SECTION — THE CORE MECHANIC:
Heading: One Rule to Live By
Body: Every day of a REAP season, you must complete at least 21 minutes of Zone 2 cardiovascular activity before midnight. That's it. That's the whole game. Everything else — the Survival Board, the spot prize draw, the Friday 13th events, the Redemption Days — is structure around that single requirement. Move, you survive. Don't, you're eliminated.

SECTION — ZONE 2 EXPLAINED:
Heading: What Is Zone 2?
Body: Zone 2 is moderate-intensity cardiovascular exercise — approximately 60–70% of your maximum heart rate. The practical test: you can hold a conversation, but you couldn't comfortably sing.
Activities that count: brisk walking, light jogging, cycling, swimming laps, rowing (moderate), elliptical, hiking, dancing (sustained effort)
Activities that do not count: strength/resistance training alone, yoga or stretching, very light walking, high-intensity intervals, recreational sport with significant rest periods
Note: Most modern wearables (Garmin, Apple Watch, Fitbit, Polar, Whoop) record Zone 2 automatically. REAP uses your device's heart rate zone data to verify compliance.

SECTION — THE MIDNIGHT REAP:
Heading: What Happens at Midnight
Body: At midnight in your local time zone, REAP checks your activity data. If you have completed 21+ minutes of verified Zone 2 activity, you survive. If you have not, your status changes to Eliminated. You will receive a notification. There is no appeal. There is no grace period. The midnight cutoff is the game — and the game is what drives the behaviour.

SECTION — REDEMPTION DAYS:
Heading: Your Two Lifelines
Body: Each participant receives two Redemption Days per season. A Redemption Day is a pre-declared rest day. Apply through the REAP app before midnight on the day you wish to use it. On a Redemption Day, you will not be eliminated for missing your 21-minute requirement.
Rules:
- You must declare it before midnight — not retroactively
- Redemption Days cannot be carried over between seasons
- Using both Redemption Days does not affect your spot prize eligibility
- No documentation required — just apply before midnight

SECTION — THE SURVIVAL BOARD:
Heading: Everyone Can See Who's Still Alive
Body: The Survival Board is a live display showing every participant's status. Green = Alive. Red = Eliminated (day noted). Gold = Redemption Day used. The board is visible to all participants. You choose a display name — your legal name and activity data are never publicly shown.

SECTION — SPOT PRIZES:
Heading: Survive to Be Eligible
Body: Sport Waikato may award spot prizes to active survivors during and within 7 days of each season. All prizes are funded independently by Sport Waikato — not from participant fees. No additional action is required to be eligible. Survival is the only criterion. Full prize terms are in the Rules.

SECTION — FRIDAY 13TH EVENTS:
Heading: The Calendar of Dread
Body: REAP seasons align with Friday 13th dates for special events. The first: Friday, 13 November 2026. Friday 13th events may include bonus challenges, community events, and special prize draw windows. Details released two weeks in advance via the app and email.

SECTION — DEVICE COMPATIBILITY:
Heading: What Works With REAP
Body: REAP connects with: Apple Health (iPhone/Apple Watch), Garmin Connect, Strava, Google Fit (Android), Fitbit. Connect your device during onboarding. Your device must sync before midnight on each day for your activity to count. If your device fails to sync due to a verified platform error, contact support — a dispute process exists for genuine technical failures.

SECTION — FAQ (full list):
Heading: Still Alive? Read On.
Include an expandable accordion FAQ with these entries:
Q: Can I do my 21 minutes in multiple sessions? A: Yes. Your Zone 2 minutes accumulate across the full day. Three 7-minute walks count. One 21-minute run counts. The total by midnight is what matters.
Q: What if I'm sick? A: Use a Redemption Day. You have two per season — save them for illness, injury, or genuine emergencies.
Q: What if my device doesn't sync in time? A: Sync your device before 11:30pm to be safe. If a genuine platform error occurs, contact support before the next midnight with evidence of your activity.
Q: Can I join mid-season? A: No. Seasons run from the 1st of each month. Join the waitlist for the following season.
Q: What happens to my data when I'm eliminated? A: Your season data and activity history are retained. You can re-enrol for the next season.
Q: Is REAP safe for everyone? A: REAP requires daily moderate cardiovascular activity. If you have a medical condition that affects exercise, consult your doctor before joining. Participants must be 18+.
Q: What's the difference between ALIVE, AT RISK, and FALLEN? A: ALIVE = you have met your 21-minute target today. AT RISK = you haven't moved yet today and midnight is approaching (you'll receive a 7pm warning). FALLEN = you were eliminated at midnight.

CTA: JOIN THE WAITLIST
```

---

## PROMPT 13: Build New About / Science Page
**Priority:** HIGH — Brand + Legal
**Affects:** `src/pages/About.tsx` (update existing or rebuild)

```
Update (or rebuild) src/pages/About.tsx with the following content. Keep the existing dark aesthetic.

PAGE TITLE: About REAP — The Survival Game Built on Science
META DESCRIPTION: REAP is a 30-day daily movement survival game from Sport Waikato's Living Lab. Built on WHO data, behavioural science, and a refusal to make wellness cute.

HERO:
Headline: This Is Not a Wellness App.
Subheadline: It's a survival game. Built on science. Run by a charitable trust. Powered by your daily movement — or ended by the absence of it.

SECTION — WHAT REAP IS:
Heading: A Game With Consequences
Body: Most fitness apps reward you for moving. Streaks, badges, leaderboards — dopamine dressed up as progress. REAP inverts that model entirely. In REAP, movement is not optional. It's survival. You move 21 minutes of Zone 2 cardio every day, or you are eliminated at midnight. This is not about aesthetics. It is not about weight loss. It is about inactivity — one of the world's leading preventable causes of early death — and the uncomfortable truth that knowing that fact has never, on its own, been enough to make people move. REAP is what happens when you stop trying to make movement aspirational and start making inactivity cost something.

SECTION — THE SCIENCE:
Heading: Why 21 Minutes. Why Every Day.
Body: The World Health Organisation recommends adults accumulate 150–300 minutes of moderate-intensity physical activity per week. That's 21–43 minutes per day. REAP uses the lower bound — 21 minutes — as its daily minimum. Not because it's easy. Because it's achievable by almost anyone with functional mobility, and because the evidence is unambiguous: meeting this threshold consistently is associated with significantly reduced risk of cardiovascular disease, type 2 diabetes, depression, and all-cause mortality. The problem is not that people don't know this. The problem is that knowing it doesn't change behaviour.

Subheading: Why We Chose Zone 2
Body: Zone 2 cardio — moderate intensity, conversational pace — is the most accessible and most evidenced category of physical activity for long-term health outcomes. It requires no equipment, no gym, no technical skill. Walking at a brisk pace qualifies. It is appropriate for the overwhelming majority of adults. It is also the zone most frequently sacrificed when life gets busy. REAP makes it non-negotiable — every single day.

Subheading: The Behavioural Science
Body: Loss aversion — the finding that humans work harder to avoid losing something than to gain something of equivalent value — is one of the most robust results in behavioural economics (Kahneman & Tversky, 1979). REAP applies this directly to daily movement. Your season pass, your survival status, and your place on the board are all things you can lose. That loss frame is more effective at driving compliance than any reward could be.

SECTION — SPORT WAIKATO LIVING LAB:
Heading: Who Built This
Body: Sport Waikato is a charitable trust and Regional Sports Trust (RST) operating in the Waikato region of New Zealand. Our purpose is to get people moving — consistently, across the full span of their lives. The Sport Waikato Living Lab is our innovation arm: a testing ground for novel physical activity interventions that challenge conventional wellness thinking. REAP is a Living Lab product — developed with genuine scepticism, designed with behavioural science, and launched with the explicit intention of measuring whether a game-based elimination mechanic can drive consistent daily movement in adults who otherwise struggle to maintain habits.

Subheading: Why a Charitable Trust Runs a Survival Game
Body: Because nobody else was going to. The fitness industry is worth billions. It is also failing. Physical inactivity rates have not improved meaningfully in two decades. The wellness industry has produced extraordinary products for people who are already active, and almost nothing that works for people who aren't. REAP is built for the inconsistent mover. Our research suggests this group is not unmotivated. They are under-structured. They don't need more inspiration. They need a cleaner consequence. REAP is that consequence.

SECTION — THE MISSION:
Heading: What We're Actually Trying to Do
Body: Every dollar of REAP season pass revenue goes back into Sport Waikato's community physical activity programmes. School sport. Workplace wellness. Community initiatives that reach people for whom a $14.99 app is not accessible. REAP has three goals: (1) Create a daily movement habit in adults who don't currently have one. (2) Generate real-world data on what works in game-based physical activity interventions. (3) Fund community sport programmes that extend the reach of the movement habit beyond the participants who can pay for it. If you play REAP, you move. That matters. If REAP succeeds, the revenue funds programmes for people who'll never hear of it. That matters more.

SECTION — PURPOSE & MISSION STATEMENTS (formal):
Heading: Our Purpose
Purpose Statement: Sport Waikato exists to enable more people to move more, more often. REAP is one expression of that purpose — a commercial product built on the belief that the right game mechanics can do what awareness campaigns cannot: make daily movement unavoidable.
Mission: To build a daily movement habit in inconsistent adults through game-based elimination mechanics, and to use the revenue generated to fund accessible community sport programmes in Aotearoa New Zealand.

TEAM SECTION: Placeholder section with heading "The People Behind the Reap" — leave team member cards as placeholder with [Name] and [Role] fields to be filled in.
```

---

## PROMPT 14: Build Pre-Launch Waitlist Page
**Priority:** HIGH — October Campaign
**Create:** `src/pages/Waitlist.tsx` + add route `/waitlist`

```
Create a new page at route /waitlist. This is the primary October pre-launch conversion page. Use the dark REAP aesthetic but make it feel urgent and exclusive.

PAGE TITLE: Join the REAP Waitlist — Season 1 Opens November 1, 2026
META DESCRIPTION: REAP Season 1 launches November 1. Join the waitlist now. 21 minutes a day or you're eliminated at midnight. Move daily. Stay alive.

HERO:
Headline: SEASON 1 OPENS NOVEMBER 1.
Subheadline: The waitlist is open now. Be first in when the season starts.
Body: REAP is a 30-day movement survival game. Move 21 minutes a day or get eliminated at midnight. The season hasn't started yet. But the clock is already running.

WAITLIST FORM:
- Email address field (required)
- First name field (required)  
- Optional: "How did you hear about REAP?" dropdown with options: Friend/word of mouth, Social media, Radio, Fitness community (F45/Hyrox/CrossFit/Parkrun), Workplace, Sport Waikato, Other
- Submit button: JOIN THE WAITLIST
- Below button, small text: "Free to join. No payment required until Season 1 opens. We'll email you when the season pass goes on sale."

BELOW THE FORM:
Three countdown/urgency elements:
- "SEASON 1 STARTS: NOVEMBER 1, 2026" (with a live countdown timer to November 1)
- "FRIDAY 13TH EVENT: NOVEMBER 13, 2026" 
- "WAITLIST SPOTS: LIMITED" 

SECTION — WHAT YOU'RE SIGNING UP FOR:
Three cards:
Card 1: "30 DAYS" — One season. One commitment. Move every day or face elimination.
Card 2: "21 MINUTES" — Zone 2 cardio daily. Achievable by anyone. Hard to do every single day.
Card 3: "$14.99 NZD" — Season pass. Payable when the season opens. Free to join the waitlist now.

SECTION — ALREADY PLAYING (for October celebrity cohort):
Heading: October: Invite Only.
Body: Before Season 1 opens to the public, REAP's October season is running by invite only — a closed group of New Zealand public figures and media getting eliminated in real time. Watch the Survival Board. See who's still alive. November is your turn.
CTA: VIEW THE SURVIVAL BOARD

FOOTER: Same Sport Waikato Living Lab attribution as the main landing page.

When the form is submitted, insert the email and first name into a new Supabase table called "waitlist" with columns: id (uuid), email, first_name, referral_source, created_at. Show a success message: "YOU'RE ON THE LIST. We'll email you when Season 1 opens. Stay alive until then."
```

---

## PROMPT 15: Build Press / Media Page
**Priority:** HIGH — Launch PR
**Create:** `src/pages/Press.tsx` + add route `/press`

```
Create a new page at route /press. This is for journalists, funders, and media contacts. Use the REAP aesthetic but with a slightly more professional tone. Add "PRESS" to the navigation.

PAGE TITLE: REAP — Press & Media | Sport Waikato Living Lab
META DESCRIPTION: Press releases, media kit, brand assets, and spokesperson contacts for REAP — the New Zealand daily movement survival game from Sport Waikato.

HERO:
Heading: PRESS & MEDIA
Subheading: For journalists, broadcasters, and content creators. Everything you need about REAP.

PRESS RELEASE SECTION:
Heading: PRESS RELEASE — FOR IMMEDIATE RELEASE (November 1, 2026)

Title: Sport Waikato Launches REAP: New Zealand's First Daily Movement Survival Game

Body of press release — use this text exactly:

"HAMILTON, NEW ZEALAND — Sport Waikato today launched REAP (Survive the Reap), a 30-day daily movement survival game designed to build consistent physical activity habits in New Zealand adults.

REAP is not a wellness application. It is a survival game with a single rule: move 21 minutes of moderate-intensity cardiovascular activity every day, or be eliminated at midnight.

Participants pay a $14.99 NZD season pass to join. Every participant begins alive. Every night at midnight, REAP checks whether each participant met their movement target. Those who did survive another day. Those who did not are eliminated from the season.

'The fitness industry has spent decades trying to make movement aspirational,' said [CEO Name], CEO of Sport Waikato. 'REAP takes a different approach entirely. We're not selling inspiration. We're selling consequences. And it turns out that the prospect of being eliminated — publicly, at midnight — is extraordinarily effective at getting people to move.'

REAP is developed by the Sport Waikato Living Lab, the innovation arm of Sport Waikato, a charitable trust based in the Waikato region. Revenue from season passes is used to fund Sport Waikato's community sport and physical activity programmes. The product is designed as a commercial revenue-generating behaviour change intervention that funds programmes for communities who cannot access it.

The first public season opens November 1, 2026. Season 1's first major event — aligned with the game's survival theme — occurs on Friday, 13 November 2026.

REAP's design draws on established behavioural science: loss aversion (the finding that humans work harder to avoid loss than to pursue gain), social accountability (public survival status), and structured simplicity (one rule, one cutoff, no exceptions). The 21-minute daily minimum aligns with the World Health Organisation's lower threshold for adult moderate-intensity physical activity.

For media enquiries, interview requests, or access to Season 1 data: [contact details]"

END PRESS RELEASE

KEY FACTS SECTION:
Heading: Key Facts at a Glance
- Product name: REAP (Survive the Reap)
- Operator: Sport Waikato Living Lab (charitable trust, Waikato, New Zealand)
- Launch date: 1 November 2026
- Season length: 30 days (calendar month)
- Season pass: $14.99 NZD/season
- Daily requirement: 21 minutes Zone 2 cardiovascular activity
- Elimination: Automatic at midnight if requirement not met
- Target audience: New Zealand adults 18–45, inconsistent exercisers
- First Friday 13th event: 13 November 2026
- Revenue use: Community sport and physical activity programmes

JOURNALIST FAQ SECTION:
Heading: Questions We Know You're Going to Ask

Q: Is this gambling?
A: No. REAP is a physical activity participation event conducted by a charitable trust. Participants pay a season pass for access to the platform and game — not for a chance to win. Any spot prize draws are subsidiary to the main event, funded independently by Sport Waikato, and open only to active survivors who earned eligibility through daily physical activity. This structure has been reviewed against the Gambling Act 2003 (NZ) by Sport Waikato's legal counsel.

Q: Why does Sport Waikato run a survival game?
A: Because conventional wellness programmes haven't moved the needle on physical inactivity rates. REAP is a Living Lab experiment: a commercial product built on behavioural science that tests whether game-based elimination mechanics can drive consistent daily movement in adults who otherwise struggle to maintain habits. It is provocative by design — because provocation creates the psychological stakes that make the behaviour change stick.

Q: What's with the dark aesthetic?
A: The dark survival aesthetic is intentional and functional. Public health research consistently shows that emotional salience — the feeling that something matters — drives behaviour change more effectively than positive reinforcement alone. The elimination mechanic and its accompanying tone create the psychological conditions for compliance. It is playful, not gory. The reference points are Hell Pizza, Wordle, and fantasy sports — not horror films.

Q: What if someone is vulnerable and gets an elimination notification?
A: REAP is a game for generally healthy adults over 18. The elimination notification is designed to be direct but not punishing — it acknowledges the end of a season, notes how many days the participant survived, and provides a clear pathway to re-enrol. REAP does not claim to be appropriate for everyone, and participants are encouraged to consult a doctor if they have medical conditions affecting exercise.

Q: Is Sport Waikato profiting from this?
A: Sport Waikato is a charitable trust. Revenue generated by REAP, after operating costs, is reinvested into Sport Waikato's community sport and physical activity programmes — including programmes for communities who cannot afford commercial fitness products.

CONTACT SECTION:
Heading: Talk to Us
- Media enquiries: [email placeholder]
- Interview requests: [email placeholder]  
- Spokesperson: [CEO name and title]
- Living Lab: [contact name and email]
- Brand assets: [link to folder placeholder]
```

---

## PROMPT 16: Build Corporate / Groups Page
**Priority:** MEDIUM — Revenue
**Create:** `src/pages/Corporate.tsx` + add route `/groups`

```
Create a new page at route /groups. Add "GROUPS" to the navigation. Use the REAP dark aesthetic.

PAGE TITLE: REAP Groups & Corporate Leagues | Survive Together
META DESCRIPTION: Create a REAP group for your workplace, fitness crew, or friend group. Private survival board. Shared elimination. Everyone starts alive — but only one group wins.

HERO:
Heading: EVERYONE STARTS ALIVE.
Subheading: Create your group. Invite your people. Watch each other fall.

SECTION — HOW GROUPS WORK:
Heading: Your Private Survival League
Body: Create a named REAP group. Share the invite link with your team, your friends, your gym crew — anyone you want to survive against. Everyone in your group joins the same season. You all see each other's daily survival status on your private group board. The last person in your group still alive wins the group.
Three cards:
- CREATE: Name your group. Get a shareable invite link. Set it as open or invite-only.
- INVITE: Send the link via WhatsApp, email, or wherever your people are. They join REAP and your group with one click.
- COMPETE: Watch the private board. Every morning, you'll know who survived the night — and who didn't.

CTA: CREATE A GROUP (links to register/login)

SECTION — CORPORATE LEAGUES:
Heading: For Workplaces
Body: REAP corporate leagues put whole teams into the survival game together. A Sport Waikato account manager sets up your group, manages the billing, and provides weekly survival reports to your wellness team. Your staff compete individually but survive (or fall) publicly within the company group. Corporate leagues include: dedicated group board, weekly activity reports, optional team challenges, and priority access to sponsored prize draws.
Pricing note: "Corporate pricing available for groups of 10+. Contact us for a quote."
CTA: GET A CORPORATE QUOTE (links to a contact form or email)

SECTION — SPONSORED GROUPS:
Heading: Partner Groups
Body: Sport Waikato works with sponsors and partners to create branded REAP groups with dedicated prizes for survivors. Partner groups may include early-access season registration, exclusive spot prize draws, and co-branded survival boards. If you're a brand or organisation interested in running a sponsored REAP group, contact us.
CTA: ENQUIRE ABOUT SPONSORSHIP (links to contact)

SECTION — FAQ:
Q: Can I be in more than one group? A: Yes. You can join multiple groups in the same season — your survival status and daily activity applies across all of them.
Q: Does joining a group cost extra? A: No. Groups are free to create and join. You still need a season pass to participate.
Q: What if my whole group gets eliminated? A: That's the game. Re-enrol for next season and build a stronger group. Your group persists between seasons.

Note: The actual group creation functionality will be built in a separate prompt. For now, the "CREATE A GROUP" CTA should link to the registration page with a note that group features are coming in Season 2.
```

---

## PROMPT 17: Update Rules Page (Legally Corrected)
**Priority:** CRITICAL — Legal
**Affects:** `src/pages/Rules.tsx`

```
Update src/pages/Rules.tsx to reflect the legally corrected content. Keep the existing visual structure and accordion/FAQ format where it exists. Replace all text content with the following:

PAGE TITLE: REAP Rules — Season Rules, Eligibility & Spot Prizes
META DESCRIPTION: Full REAP season rules — eligibility, Zone 2 activity requirements, midnight elimination, Redemption Days, disputes process, and spot prize terms.

HEADING: THE RULES OF SURVIVAL

SECTION — THE CORE RULE:
Every day of a REAP season, you must complete a minimum of 21 minutes of Zone 2 cardiovascular activity before midnight in your local time zone. Miss the target, miss the midnight cutoff, and you are eliminated from the season. That's the game.

SECTION — ELIGIBILITY:
- Participants must be 18 years of age or older
- Participants must hold a current REAP season pass ($14.99 NZD per season)
- Participants must have a connected device capable of recording Zone 2 heart rate data
- Participants must complete the onboarding process before the season start date
- Only one account per person — multiple accounts will be suspended

SECTION — ACTIVITY VERIFICATION:
Zone 2 activity is verified via connected device. REAP currently supports: Apple Health (iPhone/Apple Watch), Garmin Connect, Strava, Google Fit, Fitbit. Your device must sync and your activity must be recorded in REAP before midnight on each day of the season. Activity minutes accumulate across the full day — you do not need to complete all 21 minutes at once.

SECTION — ELIMINATION:
If a participant has not completed 21 minutes of verified Zone 2 activity by midnight on any day of the season, their status is updated to FALLEN at midnight. Elimination is automatic, final for that season, and non-negotiable except in the circumstances described in the Disputes section below. Eliminated participants retain account access, their activity history, and the ability to re-enrol for future seasons.

SECTION — REDEMPTION DAYS:
Each participant receives two Redemption Days per season. A Redemption Day is a pre-declared rest day. To use a Redemption Day, activate it in the REAP app before midnight on the day you wish to use it. Redemption Days cannot be used retroactively. Redemption Days cannot be transferred or carried forward between seasons. Using both Redemption Days in a season does not affect spot prize eligibility.

SECTION — DISPUTES & SYNC ISSUES:
If your connected device fails to record or sync activity due to a verified technical failure of the REAP platform (not your device or connection), you may raise a dispute via the Support page within 24 hours of the midnight elimination. Include: your activity record from your device, the time of sync failure, and a description of the issue. Sport Waikato will review disputes and may, at its discretion, reinstate a participant's survival status if a genuine platform-side failure is confirmed. Disputes are not available for missed activity, forgotten syncing, or personal device failures. Decisions are final.

SECTION — SURVIVAL BOARD:
All participants are displayed on the public Survival Board. Your display name (not your legal name) appears. Your daily survival status is visible. Your actual activity data (minutes, heart rate) is never publicly displayed. You may choose a display alias during registration.

SECTION — SPOT PRIZES:
Sport Waikato may award spot prizes to active survivors during and within 7 days of the end of each season. Eligibility: participants must be active (not eliminated) and hold a current season pass at the time of the draw. No additional payment, entry, or action is required. All prizes are funded independently by Sport Waikato from its operating budget. No portion of season entry fees is used to fund prizes. Prize recipients are selected by Sport Waikato based on participation criteria. Prizes are incidental rewards for REAP participation — they are not the primary purpose of the product, and REAP should not be joined with the primary expectation of winning a prize. Prize values, categories, and selection criteria are communicated at the start of each season. Prize draws occur during or within 7 days of season end.

SECTION — SEASON CALENDAR:
Seasons run from the 1st to the last day of each calendar month. Registration opens approximately two weeks before each season. Late registration (after the season start date) is not permitted — you must join the waitlist for the following season. Friday 13th events: on calendar dates that fall on a Friday the 13th, REAP may run special in-season events, challenges, or prize draws. Details released two weeks in advance.

SECTION — HEALTH & SAFETY:
REAP involves daily moderate cardiovascular activity. Consult your doctor before joining if you have a medical condition affecting your ability to exercise. REAP is not a medical programme and does not provide medical advice. Participants are responsible for exercising within their own physical limits. The 21-minute daily minimum is designed to be achievable by most healthy adults — it is not intended to push participants beyond safe exertion levels.
```

---

## PROMPT 18: Update Terms of Participation (Legally Corrected)
**Priority:** CRITICAL — Legal
**Affects:** `src/pages/Terms.tsx`

```
Update src/pages/Terms.tsx with the following complete and legally corrected Terms of Participation. Replace the entire content of the page with this text, keeping the existing visual formatting style.

HEADING: TERMS OF PARTICIPATION

Last updated: 1 October 2026. These terms govern participation in the REAP season programme operated by Sport Waikato Incorporated (Charitable Trust), Hamilton, New Zealand.

1. PARTICIPATION
REAP is a 30-day physical activity participation challenge. To participate you must be 18 years of age or older, hold a current season pass, and comply with these Terms. By registering and paying for a season pass, you agree to be bound by these Terms, the REAP Season Rules, and the Privacy Policy.

2. ACTIVITY VERIFICATION
Your daily physical activity is verified via data from your connected wearable device or fitness application. You are responsible for ensuring your device is connected, recording correctly, and synced before midnight on each day of the season. Sport Waikato verifies activity based on data received — activity that is not synced by midnight cannot be counted, except in the circumstances described in Section 4 (Disputes).

3. ELIMINATION
Failure to meet the daily 21-minute Zone 2 activity requirement by midnight on any day of the season results in automatic elimination from that season. Elimination is a designed game outcome and is not a failure of service. Two Redemption Days per season may be used to avoid elimination as described in the Season Rules.

4. DISPUTES
Participants may raise a dispute within 24 hours of an unexpected elimination if they believe the elimination was caused by a verified failure of the REAP platform (not the participant's device or internet connection). Submit disputes via the Support page with supporting evidence. Sport Waikato will review disputes and may reinstate a participant's status at its sole discretion where a genuine platform failure is confirmed. Dispute decisions are final.

5. PAYMENTS & REFUNDS
Season pass fees are $14.99 NZD per season (one-time payment per season, not a recurring subscription). Season passes are non-refundable once the season has begun. If you are eliminated on Day 1 due to a verified Sport Waikato platform failure, Sport Waikato may, at its discretion, offer a credit toward a future season. Nothing in these Terms limits your rights under the Consumer Guarantees Act 1993 or the Fair Trading Act 1986 (New Zealand).

Prize Funding: Season entry fees are collected solely for access to the REAP platform and service. No portion of any participant's season pass fee is used to fund any prize draw. All spot prizes are funded exclusively from Sport Waikato's operational budget, independently of season entry fee revenue.

6. PRIZE COMPETITIONS
Sport Waikato may conduct spot prize draws for active REAP participants during and within 7 days of the conclusion of each season. These prize draws are incidental to the main REAP season challenge, which is a physical activity participation event.

Prize draws are open only to active survivors — participants who have not been eliminated and whose season pass is current at the time of the draw. No additional payment or action is required to be eligible. Entry is free and automatic for all eligible active survivors.

All prizes are funded independently by Sport Waikato from its operational budget. No season entry fee revenue is used to fund prizes. Prize values, categories, and selection criteria are announced at the commencement of each season and may include criteria such as activity performance, survival duration, or other participation metrics.

These competitions are conducted as subsidiary events to the main REAP season event, in accordance with New Zealand law.

7. LIABILITY
Sport Waikato provides REAP as-is and does not guarantee that the platform will be available without interruption. To the extent permitted by law, Sport Waikato's liability for any claim arising from REAP participation is limited to the amount of the season pass fee paid. Sport Waikato is not liable for injury or health consequences arising from physical activity undertaken in connection with REAP. Participants undertake physical activity at their own risk.

8. DATA
Your personal data is collected, stored, and used in accordance with our Privacy Policy and the Privacy Act 2020 (New Zealand). Activity data is used to verify daily compliance and is not shared with third parties except as described in the Privacy Policy. You may request deletion of your data at any time by contacting privacy@[domain].

9. MINIMUM AGE
Participants must be 18 years of age or older. By registering, you confirm that you meet this requirement. Sport Waikato reserves the right to suspend accounts where the minimum age requirement is not met.

10. GENERAL
These Terms are governed by New Zealand law. Sport Waikato may update these Terms at any time — participants will be notified of material changes via email. Continued participation after notification constitutes acceptance of updated Terms.

Sport Waikato Incorporated is a charitable trust registered under the Charities Act 2005. All REAP revenue is applied to Sport Waikato's charitable purposes.

Contact: [contact email] | [postal address]
```

---

# GROUP 4 — SOCIAL & VIRAL FEATURES

---

## PROMPT 19: Build Group / League Feature (Database + Backend)
**Priority:** HIGH — Core growth mechanic
**Affects:** Database migrations + new edge functions

```
Build the database structure and backend for REAP group leagues.

Create a new database migration with these tables:

Table: groups
- id: uuid primary key default gen_random_uuid()
- name: text not null (e.g. "Hamilton F45 Crew")
- slug: text unique not null (URL-safe version of name, e.g. "hamilton-f45-crew")
- created_by: uuid references profiles(user_id)
- season_month: text not null (format: YYYY-MM)
- is_private: boolean default false
- invite_code: text unique not null (6-character random alphanumeric code generated on creation)
- sponsor_name: text (nullable — for sponsored groups)
- sponsor_logo_url: text (nullable)
- created_at: timestamptz default now()

Table: group_members
- id: uuid primary key default gen_random_uuid()
- group_id: uuid references groups(id) on delete cascade
- user_id: uuid references profiles(user_id)
- joined_at: timestamptz default now()
- UNIQUE constraint on (group_id, user_id)

Table: referral_links
- id: uuid primary key default gen_random_uuid()
- code: text unique not null (8-character alphanumeric)
- owner_type: text (values: 'group', 'rst', 'user', 'sponsor')
- owner_id: text not null (the ID of the group, RST name, or user)
- season_month: text
- click_count: integer default 0
- conversion_count: integer default 0
- created_at: timestamptz default now()

Add Row Level Security policies:
- groups: anyone can read public groups; only group creator can update/delete
- group_members: members can read their own group's member list; insert allowed for any authenticated user
- referral_links: readable by owner; insert by authenticated users only

Create a Supabase edge function called "join-group" that:
1. Takes a group invite_code in the request body
2. Finds the matching group record
3. Checks the user is not already in the group
4. Inserts a new group_members record
5. Increments the referral_links.conversion_count if the user arrived via a tracked referral link (pass referral_code as optional param)
6. Returns the group details
```

---

## PROMPT 20: Build Group League UI
**Priority:** HIGH — Core growth mechanic
**Affects:** New components + routes
**Depends on:** Prompt 19

```
Build the group league UI features.

1. Create a new page src/pages/Groups.tsx at route /groups that shows:
   - A list of groups the current user is a member of (querying group_members joined with groups for the current user)
   - A "Create a Group" button
   - A "Join with Invite Code" input field and button

2. Create a "Create Group" modal/form with fields:
   - Group name (text, required)
   - Season (current season month, pre-filled and read-only)
   - Private group toggle (default off)
   - On submit: inserts into the groups table, generates a slug from the name, generates a random 6-character invite_code, and redirects to the new group's page

3. Create a Group Detail page at route /groups/[slug] showing:
   - Group name and season
   - Private group survival board: a list of all group_members with their current survival status from season_entries (alive = green, fallen = red, at_risk = amber)
   - Sorted by: survived days descending (most days alive at top)
   - The invite link displayed prominently: "Invite link: reap.co.nz/join/[invite_code]" with a one-click copy button
   - A "Share via WhatsApp" button that pre-fills the message: "I've started a REAP group — [group name]. 21 minutes a day or you're eliminated at midnight. Join here: [invite_code_link]"
   - If the user is the group creator, show a "Manage Group" section with the invite code

4. Create a join-by-invite-code page at route /join/[code] that:
   - Shows the group name and current member count
   - Prompts non-logged-in users to register first (redirect to register with the code stored in localStorage)
   - Prompts logged-in users with "Join [Group Name]?" and a confirm button that calls the join-group edge function

5. Add a "GROUPS" link to the main navigation, visible to logged-in users.
```

---

## PROMPT 21: Build Shareable Daily Survival Card
**Priority:** HIGH — Viral growth
**Affects:** `src/pages/Dashboard.tsx`, new utility

```
Add a "Share Today's Status" feature to the Dashboard.

In src/pages/Dashboard.tsx, add a button in the daily movement card area labelled "SHARE YOUR STATUS". 

When clicked, this button should generate a shareable image card (using HTML Canvas or a styled div that can be screenshot/downloaded) with the following content:

SURVIVED card (when user has met their target today):
- Dark background with REAP branding
- Large text: "STILL ALIVE"
- Subtext: "Day [X] of 30" (where X is their days survived this season)
- Small text: "[today's date] • [zone2_minutes] min Zone 2"
- Small text: "REAP — Move Daily. Stay Alive. • survive-the-reap.lovable.app"
- Green accent colour

AT RISK card (when user has not met target yet today, before midnight):
- Same layout but amber accent
- Large text: "THE REAPER APPROACHES"
- Subtext: "[minutes_logged] / 21 min — [time_remaining] until midnight"

FALLEN card (when user has been eliminated):
- Same layout but red accent
- Large text: "FALLEN"
- Subtext: "Survived [X] days. Season [month]."
- Small text: "I'll be back. REAP Season [next month] opens soon."

Add two action buttons below the generated card:
1. "DOWNLOAD IMAGE" — saves the card as a PNG
2. "SHARE TO WHATSAPP" — opens WhatsApp with a pre-written message: "Day [X] and I'm [still alive / eliminated at Day X]. The REAP challenge: 21 minutes of movement every day. Join me next season: [waitlist link]" with the image attached if the Web Share API is available, or a link if not.

The feature should work on both mobile and desktop.
```

---

# GROUP 5 — ADMIN & REPORTING

---

## PROMPT 22: Build Admin Revenue Dashboard
**Priority:** HIGH — Board reporting
**Affects:** `src/pages/Admin.tsx`

```
Add a new "REVENUE" tab to the Admin panel in src/pages/Admin.tsx.

The Revenue tab should display the following metrics, all queried live from the database:

1. CURRENT SEASON METRICS:
   - Total active season pass holders (count of season_entries with status ALIVE, AT_RISK, or CONFIRMED for current season month)
   - Season gross revenue (count × $14.99 NZD)
   - Survival rate (% of participants still alive vs total who started)
   - Eliminations today (count of season_entries where fallen_at = today)

2. WAITLIST:
   - Total waitlist entries (count of records in the waitlist table)
   - New waitlist entries this week
   - Top referral sources (if referral_source field populated — group by and count)

3. ALL-TIME METRICS:
   - Total participants across all seasons (count of distinct user_ids in season_entries)
   - Total seasons run (count of distinct season_months in season_entries)
   - Season-on-season retention (% of Season N participants who also appear in Season N+1 — calculate for available seasons)

4. GROUP LEAGUES:
   - Total groups created (count from groups table)
   - Total group members (count from group_members table)
   - Most active group (group with most members)

5. PRIZE HISTORY:
   - A table listing all records from prize_awards table showing: date, recipient alias, prize description, season month

6. DATA EXPORT BUTTON:
   - A button labelled "EXPORT SEASON DATA (CSV)" that downloads a CSV of all season_entries for the current season joined with profiles (alias, season_month, status, days_survived, avg_zone2_minutes). No PII (no email, no legal name) in the export — alias and anonymised stats only.

Use loading spinners while queries run. All monetary values in NZD.
```

---

## PROMPT 23: Build Onboarding Baseline Survey + Update Onboarding Flow
**Priority:** MEDIUM — Research data
**Affects:** `src/pages/Onboarding.tsx`

```
Update src/pages/Onboarding.tsx to add two new screens to the onboarding flow.

SCREEN 1 (add after the "CHOOSE YOUR IDENTITY" screen):
Title: WHY YOU'RE HERE
Subtext: One quick question before you start.
Question: "Before joining REAP, how often were you completing 21+ minutes of moderate physical activity?"
Options (radio buttons):
- "Every day — I already move daily" 
- "Most days (4–6 per week)"
- "A few times a week (2–3)"
- "Once a week or less"
- "Rarely or never"
Skip link: "Skip this question"
Button: CONTINUE

SCREEN 2 (add after the responsibility/checkbox screen, just before BEGIN SEASON):
Title: ONE THING TO KNOW
Body: REAP is designed to build a movement habit that lasts beyond the season. We track your activity during the game. After the season ends, we may reach out to ask how your movement habits have changed — purely for research purposes, as part of the Sport Waikato Living Lab. Your data is never shared with third parties. You can opt out of research contact at any time.
Checkbox: "I'm happy to be contacted for research purposes after the season" (optional, default unchecked)
Button: BEGIN SEASON (same as existing)

Save the baseline activity frequency answer to a new column in profiles called baseline_activity_frequency (text, nullable).
Save the research consent checkbox to a new column in profiles called research_consent (boolean, default false).
Create a database migration for both new columns.
```

---

# GROUP 6 — UX & COPY FIXES

---

## PROMPT 24: Fix All Remaining Compliance Copy
**Priority:** HIGH — Legal
**Affects:** `src/pages/Webinar.tsx`, `src/pages/Leaderboard.tsx`, `src/components/DailyMovementCard.tsx`

```
Make the following targeted copy changes across three files:

1. In src/pages/Webinar.tsx, find the text "Miss a day and you fall. Survive the month to win." and change it to: "Miss a day and you fall. Survive the month to complete the challenge."

2. In src/pages/Leaderboard.tsx, find the column header "WON" (which tracks spot prize wins) and rename it to "PRIZES". Also check if there is a spotPrizeWins data field displayed prominently as a ranking metric — if so, move it to be the last column displayed after all health/activity metrics (SEASONS, MIN/W, WHO), not before them.

3. In src/components/DailyMovementCard.tsx or wherever the daily movement goal is labelled, check if there is any copy that says "WIN" or "win money" or connects movement completion to a financial prize. If found, replace with movement-focused language. Leave all other copy in these files unchanged.
```

---

## PROMPT 25: Update 7PM Warning Email Copy
**Priority:** MEDIUM — Tone + welfare
**Affects:** `supabase/functions/seven-pm-warning/index.ts`

```
In supabase/functions/seven-pm-warning/index.ts, update the warning email content.

Change the email subject from "The Reaper comes at midnight." to "Heads up — you haven't moved yet today."

Change the email body to preserve the urgency but remove the most aggressive language. Replace the current body with:

Subject: Heads up — you haven't moved yet today.

Body:
"Hey [alias].

You're still alive in REAP Season [month]. But the clock is running.

No qualifying movement has been recorded for today. The Reaper checks at midnight.

You have until [time_remaining] to complete your 21 minutes.

[OPEN REAP AND MOVE button]

That's it. 21 minutes. You've done it every other day. Tonight is no different.

— The Reaper"

Keep the existing logic (send at 7PM only, only once per day, only if under 21 minutes). Only change the email copy.
```

---

## PROMPT 26: Add Health & Safety Disclaimer to Onboarding + Registration
**Priority:** HIGH — Welfare + Legal
**Affects:** `src/pages/Register.tsx`, `src/pages/Onboarding.tsx`

```
In src/pages/Register.tsx, add a visible notice in the registration form before the submit button. Style it as a muted info box (not alarming, not a warning — informational). Text:

"REAP involves daily moderate cardiovascular exercise. If you have a medical condition that affects your ability to exercise, please consult your doctor before joining. REAP is not a medical programme and does not provide medical advice. Participants are responsible for exercising within their own physical limits."

In src/pages/Onboarding.tsx, in the responsibility/checkbox section, add one additional checkbox item (required, must be checked to proceed):

"I understand that REAP involves daily moderate physical activity. I have no medical conditions that prevent me from safely completing 21 minutes of moderate cardiovascular exercise daily, or I have consulted a doctor who has advised it is safe for me to do so."

Do not change any other elements of these pages.
```

---

## PROMPT 27: Update Elimination Notification (Welfare-Conscious Framing)
**Priority:** HIGH — Welfare
**Affects:** `supabase/functions/midnight-elimination/index.ts` (from Prompt 5)

```
Update the elimination email in the midnight-elimination edge function (created previously) to use this exact copy:

Subject: You survived [X] days. Season [next month] opens soon.

Body:
"[alias] — your Season [month] ended at midnight.

You survived [X] days. Every one of those days, you moved. That's [X × 21]+ minutes of Zone 2 activity you wouldn't have had otherwise.

That's not nothing. That's the whole point.

Season [next month] opens [date]. You can re-enrol from your dashboard — same account, fresh start.

[RE-ENROL FOR NEXT SEASON button]

If you're going through a tough time, support is available 24/7 at 1737.org.nz (free call or text 1737 from any NZ phone).

— REAP"

Replace [X] with the player's actual days_survived value from the elimination_log.
Replace [month] and [next month] with the actual season month values.
Replace [alias] with the player's display alias from profiles.
```

---

## PROMPT 28: Add RST Referral Link Tracking to Registration
**Priority:** MEDIUM — Distribution
**Affects:** `src/pages/Register.tsx`, `src/pages/Waitlist.tsx`

```
Update the registration flow and waitlist page to capture referral codes from URL parameters.

In src/pages/Register.tsx and src/pages/Waitlist.tsx:
1. On page load, check the URL for a query parameter called "ref" (e.g. /register?ref=WAIKATO01).
2. If found, store the ref code in localStorage under the key "reap_referral_code".
3. When the registration or waitlist form is submitted, include the stored ref code in the submission.

For registration: pass the ref code to the create-checkout edge function and store it in season_entries.invite_code field.

For waitlist: add a referral_code column to the waitlist table (via migration) and store the ref code there.

Also: when a referral code is present in the URL on the join-by-invite-code page (/join/[code]), increment the click_count field in the referral_links table for that code via a Supabase function call.

This enables RST commission tracking — each RST gets a unique ref code, and sign-ups via that code are attributed to them.
```

---

# GROUP 7 — FINAL POLISH

---

## PROMPT 29: Add Navigation Links for All New Pages
**Priority:** MEDIUM
**Affects:** Main navigation component

```
Update the main navigation to include links to all new pages created in this build series.

Public navigation (visible to non-logged-in users):
- REAP (logo/home link)
- HOW IT WORKS → /how-it-works
- ABOUT → /about
- GROUPS → /groups
- JOIN THE WAITLIST → /waitlist (highlighted as primary CTA button)
- LOGIN → /login

Authenticated navigation (visible to logged-in users, keep existing links):
- Add GROUPS → /groups between BOARD and PROFILE
- Keep all existing navigation items

Footer links (all pages):
- How It Works | About | Groups | Rules | Terms | Privacy | Press | Support
- "REAP is a Sport Waikato Living Lab programme. Charitable Trust."

Add /press and /corporate to the footer (labelled "Press" and "Corporate") but not to the main navigation — these are reference pages, not primary navigation destinations.
```

---

## PROMPT 30: SEO + Social Meta Tags for All Pages
**Priority:** MEDIUM — Discovery
**Affects:** All page files

```
Add Open Graph and Twitter Card meta tags to every page in the app. For each page, include:

- og:title (the page title)
- og:description (the page meta description)  
- og:image (a placeholder path "/og-reap-default.png" — to be replaced with actual image)
- og:type: "website"
- og:url: the full page URL
- twitter:card: "summary_large_image"
- twitter:title: same as og:title
- twitter:description: same as og:description

For the Landing page specifically, use these values:
og:title: "REAP — The Killer Movement App | Move Daily. Stay Alive."
og:description: "A 30-day daily movement survival game. Move 21 minutes or get eliminated at midnight. Join the waitlist for Season 1."

For the Waitlist page:
og:title: "Join the REAP Waitlist — Season 1 Opens November 1"
og:description: "21 minutes a day or you're eliminated at midnight. The first REAP season launches November 1, 2026. Join the waitlist — it's free."

Also set the default HTML lang attribute to "en-NZ" on the root HTML element.

If the app uses React Helmet, react-helmet-async, or a similar head management library, use that. If not, update the relevant template HTML file.
```

---

## BUILD ORDER SUMMARY

| Order | Prompt | Why |
|---|---|---|
| 1 | Remove hardcoded credentials | Security — do today |
| 2 | Fix Stripe mode + cancellation | Legal — Fair Trading Act |
| 3 | Fix "at random" contradiction | Legal — Gambling Act |
| 4 | Add prize funding + Living Lab branding | Legal + reputational |
| 5 | Midnight elimination cron job | Core mechanic — everything depends on this |
| 6 | Stripe webhook | Payment audit trail |
| 7 | Server-side age verification | Regulatory |
| 8 | Replace hardcoded stats | Fair Trading Act |
| 9 | Fix Admin FALL/REVIVE buttons | Operations |
| 10 | Wire Redemption Day to elimination | Game correctness |
| 11 | Update Landing page | Marketing |
| 12 | Build How It Works page | Marketing |
| 13 | Build About/Science page | Brand + legal |
| 14 | Build Waitlist page | October campaign |
| 15 | Build Press page | Launch PR |
| 16 | Build Corporate/Groups page | Revenue |
| 17 | Update Rules (legally corrected) | Legal |
| 18 | Update Terms (legally corrected) | Legal |
| 19 | Group feature — database + backend | Growth mechanic |
| 20 | Group feature — UI | Growth mechanic |
| 21 | Shareable survival card | Viral growth |
| 22 | Admin revenue dashboard | Board reporting |
| 23 | Onboarding baseline survey | Research data |
| 24 | Fix remaining compliance copy | Legal |
| 25 | Update 7PM warning email | Tone |
| 26 | Health & safety disclaimer | Welfare + legal |
| 27 | Welfare-conscious elimination email | Welfare |
| 28 | RST referral tracking | Distribution |
| 29 | Navigation updates | UX |
| 30 | SEO meta tags | Discovery |
