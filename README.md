# Abduct — The Night Shift

[Play the campaign](https://dumb-tony.github.io/abduct/?v=night-shift)

A single-player UFO cargo game built around an elastic tractor beam. Every load pulls back. Fly six contracts across moonlit farms and the county outskirts: carry cows, swing through hay, transport heavy freight, and bring home a windy pumpkin harvest.

## What's playable

- Six selectable contracts with briefings, next-job flow, retries, best times and three-star ratings.
- Three cargo classes: cow (mass 2), giant pumpkin (1.2), heavy freight crate (6). UFO mass 3; the established thrust and spring tuning are retained.
- Solid walls, taller clearance routes, narrow collectors, multiple deliveries and a visible gust corridor with calm air above it.
- A no-quota practice field. All jobs are available immediately; you can play in order or jump ahead.
- Two scenery kits, animated beam/impact effects, optional synthesized sound, reduced motion and touch buttons.

WASD/arrows fly. Hold Space to acquire below the craft; release to detach. Toggle mode is available. R restarts the current contract, Escape pauses, and Contracts opens the job board. The collector accepts slow cargo after one second of stable ground contact. Delivered loads are secured and leave room for the next arrival. On the finale, the final load cannot be secured until the hay is cleared, so a required wrecking tool remains available.

Gold: finish within the contract's stated target with no overload drops. Silver: within twice the target. Bronze: complete the contract. Progress and settings are saved locally, with an in-memory fallback when storage is unavailable. Reset saved progress clears campaign times/stars and the legacy M1 record. Campaign records are separate from the old prototype's times.

## Offline and source

Open `prototypes/m1/index.html` directly. This legacy path now contains the expanded campaign, with all HTML, CSS, game logic, art and generated sound embedded. No server, installation, assets, network or build is needed to play. It remains an exploratory small game, not a full production release.

See [campaign design](docs/CAMPAIGN.md), [GDD](GDD.md), and [test evidence and remaining human gates](docs/PLAYTEST_LOG.md). Original private source-basis notes and diagnostic/screenshot artifacts remain local and ignored. Pages publishes only `prototypes/m1`.

## Verification

Run `node tests/physics.cjs` and `node tests/campaign.cjs`. Browser suites: `tests/browser.cjs`, `tests/browser-edges.cjs`, `tests/presentation.cjs`, `tests/campaign-browser.cjs`, and `tests/campaign-keys.cjs`. The latter runs six browser keyboard-event routes with accelerated virtual time; it is not human feel testing. `tests/keyboard-route.cjs` is a real-time Playwright-keyboard first-contract replay.

On this Windows bundled runtime, use `node --no-node-snapshot`. Browser suites use installed Chrome and Playwright; `PLAYWRIGHT_PATH` can override the bundled package location and `TEST_URL` can point at the deployment. No testing dependency is needed to play.
