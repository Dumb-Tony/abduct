# Abduct — Playtest log

## 2026-09-13 / M1.1 / single field / physics m1.1

Decision: **iterate at M1 with fresh human players**. The playable slice is implemented. Automated technical checks pass as recorded below; the five-player comprehension, enjoyment and voluntary-replay gates have NOT been tested. No M2 expansion is implied.

### Environment and method

Windows PC: AMD Ryzen 9 9950X (16 cores); enumerated GPUs AMD Radeon RX 9070 XT and AMD Radeon integrated graphics. Automated browser: installed Chrome 153.0.8010.37, headless, viewport 1440×1000; narrow-layout check 390×844. Headless tests do not establish which physical GPU drove rendering or actual displayed smoothness. An idle 120-frame sample averaged 6.00 ms between animation callbacks, maximum 6.10 ms. Debug overlay displayed about 0.9 ms frame work in the inspected screenshot. These are directional automation measurements, not a sustained loaded 60 Hz human observation. Actual human display resolution and feel testing remain unrecorded.

Node 24.19.0 requires `--no-node-snapshot` on this machine; otherwise it exits before executing scripts. Tests do not require that flag on ordinary Node installations. Browser scripts use the preinstalled Playwright package and Chrome, without adding game runtime dependencies.

### Technical evidence

- `tests/physics.cjs`: complete pickup, lift, carry over all hay, descend and settle route, 18.05 simulated seconds, zero overload losses, score 612. Input is a scripted proportional controller applying forces; it never teleports the load.
- Render cadence replays at 30/60/120 FPS: completion 18.0667 / 18.0583 / 18.0500 seconds, all score 612. Time spread 0.093%, position spread 0.012%; below 2% investigation threshold.
- Same one-second input with cow versus crate: UFO horizontal travel 154.75 versus 130.52 px; final height coordinate 273.28 versus 355.49. Larger downward coordinate means the heavy load pulls the craft lower. Reciprocal mass is materially observable in simulation.
- Ten simulated minutes (72,000 fixed steps) of repeated full-thrust direction reversals and release/reacquire cycles: finite bounded states, maximum measured speed 568.09 px/s, two hay contacts, no overload losses in this replay. This is accelerated simulation, not ten minutes of human play.
- Explicit regressions: extreme extension detaches, release/reacquire, outside-world recovery and five-second penalty, cargo contact beneath UFO, high-speed hay hit, no duplicate delivery award, ground bounds, 100 resets. Four microsteps per 1/120 step plus speed caps bound collision travel.
- `tests/browser.cjs`: file:// loads only the single HTML; zero external requests or browser errors. Keyboard attachment, lifting, release, focus-loss freeze/input clear, result/retry, ten rapid restarts, toggle beam, local record reset, blocked-storage fallback and narrow layout pass. Full route also runs against the same browser simulation.
- `tests/keyboard-route.cjs`: completes a full route through Playwright keyboard down/up events driven by a feedback controller. This tests the actual browser input path; it is NOT manual feel testing. The first test omitted releasing over the collector and hovered narrowly above it; the replay now releases by 23 seconds. Exact final route timing is recorded below after the ground-contact correction.
- Start, play/debug, result and narrow-layout screenshots were visually inspected by the agent. Screenshots remain in ignored local test-artifacts; no diagnostic dumps are published.

### Tuning and implementation choices

Masses 3/2/6; rest length 120 px; frequency 2 Hz and damping ratio 0.35 using reduced mass. Cargo gravity 260 px/s². Bare craft hover cancels its own gravity; finite thrust is 1700 N horizontal and 2300 N vertical. Spring tension is unilateral, equal/opposite, capped at 7000 N; overload warning begins at 90% capacity and detaches after 0.25 seconds. Extreme 240 px extension detaches immediately as a numerical guard. A release latch prevents automatic overload reacquisition. Velocity guard is 650 px/s per axis.

The entire 1200×680 field remains in view, eliminating camera crop of the load for this small slice. No moving camera or reel experiment is needed. Hay uses one-time toppling states rather than general destruction physics. The 220 px collector accepts a fully contained cow below 22 px/s with actual grounded contact for one continuous second. It may remain attached if physically settled. A 500-point delivery plus capped 125-point time bonus is awarded once; hay has no farming score.

Focused fixes: clear button focus after Start/Resume so Space reaches beam controls; overload requires release before reacquisition; use an accessible viewport overlay on narrow screens; require the grounded flag rather than near-floor tolerance alone for delivery. No new content was added to address these issues.

### Open human gates

Recruit five fresh players, five attempts each. Four should attach and deliver by attempt three; three should intentionally build/reduce swing and identify the heavy crate's handling difference; three should voluntarily replay or try hay collision. Record uncontrolled drops, camera confusion, accessibility concerns and actual display smoothness. No fresh testers were recruited by this agent and no subjective gate is claimed passed. Keyboard desktop is the primary target; touch controls and audio still need human usability checks. General remapping, advanced accessibility and M2 systems remain outside this bounded build.

Final grounded keyboard-route retest: 24.0917 seconds, result screen reached, zero overload losses, cow y=554 with grounded=true and vertical velocity zero. The route goes above the hay and releases over the pad. This is automated keyboard interaction, not human feel testing.

Additional edge regressions pass: exact equal/opposite spring momentum, no pushing while slack, a second ten-minute unpowered decay run (final body speeds below 1 px/s), and browser pause above 6000 N freezing state until resume. The narrow-screen start button is fully visible and its screenshot was inspected.

Publication verification: GitHub Pages workflow 34739281392 succeeded; https://dumb-tony.github.io/abduct/ returned HTTP 200. The public URL passed browser.cjs with zero page errors and only the game document requested. Public keyboard route reached results in 24.1167 seconds, zero overload losses, cow grounded at y=554. Network access required the authorized elevated test process; initial sandbox navigation was denied, then the public checks succeeded. Source-basis notes and local screenshots remain ignored. The follow-up evidence commit does not change the tested HTML.

## 2026-09-13 / M1 clarity follow-up

User requested continued improvement and clarifying questions. Asked which area to prioritize and what felt frustrating; no answer had arrived during this bounded feedback pass. Fixed stale attachment status after beam release. Added collector guidance for approaching, partial containment, airborne cargo, excess speed, settling and success; settling percentage remains on the pad. Flight parameters, physics version and records stay compatible.

Validation: offline browser regression passed with zero page errors or external requests; start/play/result/restart and blocked storage still work. Agent inspected the updated play screenshot. Full physics suite passed, including the same 18.05-second route, FPS consistency, reciprocal mass and two ten-minute simulation stress/decay cases. These remain automated tests. Human handling feedback and fresh-player gates remain open. Published-build verification is performed after the deployment.

## 2026-09-13 / Visual update 02 / physics m1.1 unchanged

User explicitly requested shipping the proposed presentation improvements. Replaced the original flat teal field and rectangular actors with a purple dusk palette, layered hills and pasture, amber-lit barn and silo, moon craters, fireflies and clouds. The cow has rounded shapes, hooves, horns, tail, blinking eyes, dangling legs and landing squash; the saucer has a glass dome, visible alien pilot, shaded hull and cycling lights. Added animated tractor-beam flow, targeting brackets, collector scan lines, bounded hay/landing particles and delivery rings. A larger start-screen character vignette, cleaner instruments and visible 'VISUAL UPDATE · 02' badge make this release identifiable immediately. Added optional synthesized hover hum and descending impact/attachment cues. Less motion respects the system preference initially, persists locally, freezes decorative animation and suppresses new particles; enabling it clears existing effects.

All drawing remains embedded Canvas 2D in the single offline HTML. No external images, fonts, dependencies or network requests were added. Renderer state is separate from physics, with no simulation writes or simulation randomness. Compared the full RULES/Field source against the previous deployed HTML: identical. Kept physics/record version m1.1 accordingly.

Validation on the same Windows PC and Chrome 153.0.8010.37: physics regressions pass, unchanged scripted route 18.05 seconds and score 612; complete automated keyboard route 24.1167 seconds, zero overload drops, cow grounded. Browser start/play/result/retry, offline/storage fallback, 390px layout and high-tension pause checks pass. New tests/presentation.cjs checks generated audio starts with a gesture, mute ramps down, hay effects appear, Less motion clears/suppresses particles and persists, and presentation leaves paused simulation frozen. Agent visually inspected new start, flight and mobile screenshots; adjusted mobile title size after detecting an awkward word wrap. No browser page errors. A 120-frame headless sample averaged 5.0ms between callbacks (5.3ms max); this is not a physical-display frame-rate claim.

Screenshots and one-off edit helpers remain local in ignored test-artifacts. Human feel, audio quality and five-fresh-player gates remain open; this update addresses presentation without claiming those gates passed. Deploy the reviewed HTML to existing GitHub Pages and compare public response plus rerun the presentation checks there before handoff.
