# Abduct

[Play the M1 field test](https://dumb-tony.github.io/abduct/)

A tiny single-player UFO physics prototype. Bring one cow across a night field and settle it on the collector. A unilateral spring applies reciprocal force: cargo pulls against your flight. Build a swing, countersteer, optionally topple three hay blocks, and compare the heavier crate.

## Run offline

Open `prototypes/m1/index.html` directly in a browser. Everything is embedded; no server, installation, downloads, or build required. Desktop keyboard play is the primary test target. Small screens have touch buttons; landscape is recommended.

- WASD or arrows: thrust. The craft supplies its own hover lift; carrying weight requires upward thrust.
- Hold Space: acquire in the cone below the UFO; release: detach. Optional toggle mode is available.
- Settle the cow fully inside the collector, below 22 px/s, for one second. Releasing over the pad makes settling easier.
- R: restart. Escape: pause. F3: physics overlay. Focus loss automatically pauses and clears held controls.
- Overload releases the beam; release the beam control before reacquiring.

Only versioned settings and the best completion time are stored locally, with an in-memory fallback if storage is denied. Reset local record clears the time. Sound is optional and generated locally.

## Scope and evidence

M1 implements one field, one UFO, one cow, one heavy crate, three hay blocks, and the complete start/play/result/retry loop. No later milestones are authorized by this build. See [design](GDD.md), [M1 specification](docs/PROTOTYPE_M1.md), and [actual tests and open human gates](docs/PLAYTEST_LOG.md).

Tests: `node tests/physics.cjs`; browser checks: `node tests/browser.cjs` and `node tests/keyboard-route.cjs`. Browser scripts require Playwright and Chrome; set `PLAYWRIGHT_PATH` to an installed Playwright package if needed. `TEST_URL` overrides the local HTML with the deployed URL. On the current Windows bundled runtime, use `node --no-node-snapshot` because its default snapshot fails before script execution. No runtime dependency is needed to play.

The original private source-basis note stays local and is excluded from Git. Pages uploads only `prototypes/m1`. Screenshots and diagnostic artifacts stay local in ignored `test-artifacts`.
