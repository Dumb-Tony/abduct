# Abduct — Nightfall

[Play the campaign](https://dumb-tony.github.io/abduct/?v=nightfall)

A single-player UFO cargo game built around an elastic tractor beam. Every load pulls back. Fly twelve contracts across moonlit farms and the county outskirts: carry cows, swing through hay, transport heavy freight, and bring home a windy pumpkin harvest.

## What's playable

- Twelve contracts with briefings, retries, ship-specific best times and three-star ratings.
- Five cargo classes: cow, pumpkin, freight crate, fragile specimen and heavy ballast.
- Three distinct UFOs: original Courier, agile Swift and heavy-lifting Atlas.
- Sweeping searchlights and patrol drones, three-hit shields, beam jamming and cargo-driven defense demolition.
- Solid walls, taller clearance routes, narrow collectors, multiple deliveries and a visible gust corridor with calm air above it.
- A no-quota practice field. The first six jobs are open; Swift unlocks after two completions, Atlas and Act II after three, and final operations after six.
- Farm, town and industrial scenery, animated beam/impact effects, optional synthesized sound, reduced motion and touch buttons.

WASD/arrows fly. Hold Space to acquire below the craft; release to detach. Toggle mode is available. R restarts the current contract, Escape pauses, and Contracts opens the job board. The collector accepts slow cargo after one second of stable ground contact. Delivered loads are secured and leave room for the next arrival. On the finale, the final load cannot be secured until the hay and tower objectives are cleared, so a required wrecking tool remains available.

Gold: finish within the contract's stated target with no hits, overload drops or cargo replacements. Silver: within twice the target. Bronze: complete the contract. Progress and settings are saved locally, with an in-memory fallback when storage is unavailable. Reset saved progress clears campaign times/stars and the legacy M1 record. Previous Night Shift completions migrate automatically; records are separate for each ship.

## Offline and source

Open `prototypes/m1/index.html` directly. This legacy path now contains the expanded campaign, with all HTML, CSS, game logic, art and generated sound embedded. No server, installation, assets, network or build is needed to play. It remains an exploratory small game, not a full production release.

See [campaign design](docs/CAMPAIGN.md), [GDD](GDD.md), and [test evidence and remaining human gates](docs/PLAYTEST_LOG.md). Original private source-basis notes and diagnostic/screenshot artifacts remain local and ignored. Pages publishes only `prototypes/m1`.

## Verification

Run `node tests/physics.cjs`, `node tests/campaign.cjs` and `node tests/nightfall.cjs`. Browser suites: `tests/browser.cjs`, `tests/browser-edges.cjs`, `tests/presentation.cjs`, `tests/campaign-browser.cjs`, and `tests/campaign-keys.cjs`, and `tests/nightfall-browser.cjs`. The keyboard suite runs browser keyboard-event routes (set MISSION_FROM=6 and MISSION_TO=12 for the six new jobs) with accelerated virtual time; it is not human feel testing. `tests/keyboard-route.cjs` is a real-time Playwright-keyboard first-contract replay.

On this Windows bundled runtime, use `node --no-node-snapshot`. Browser suites use installed Chrome and Playwright; `PLAYWRIGHT_PATH` can override the bundled package location and `TEST_URL` can point at the deployment. No testing dependency is needed to play.
