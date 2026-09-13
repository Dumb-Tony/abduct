# Milestone 1 — Standalone HTML vertical prototype

**Status: M1 implemented on 2026-09-13; technical evidence recorded in PLAYTEST_LOG.md, fresh-player gates pending.** The sole purpose of this milestone is proving the core mechanic/verb before expanding content. Follow the offline, fixed-step, restart, storage, and measurement contract in GDD.md. All thresholds are initial acceptance targets to validate, not completed test results.

## Question and hypothesis
Can a swinging load be both a fun burden and a tool, with its mass visibly affecting the UFO?

## Exact playable slice
A side-view field, one saucer, one cow, an optional heavy crate, three hay blocks and one delivery pad. Carry the cow to the pad; optionally knock over hay with it first. Unlimited attempts and no enemy. Show time and delivered state. Beam has fixed length initially; optional reel experiment is disabled by default.

## Implementation specification
Initial mass ratio: UFO 3, cow 2, heavy crate 6. The saucer supports itself with baseline lift; user thrust has finite capacity. Start tether at 120 pixels, spring frequency near 2 Hz and damping ratio around 0.35, converting those targets into k/c using reduced mass. Clamp forces and cap extreme extension. Delivery requires target within the pad, speed below threshold and stable ground contact for one second. Beam release remains under user control; no instant inventory absorption.

## Deliberate exclusions
No weapons, police, upgrades, second map, realistic animal skeleton, multi-load capture or cinematic destruction.

## Test procedure and exit gate
Five players get five attempts. Four should attach and deliver the cow by attempt three. Three should intentionally build and then reduce swing, and identify that the heavier crate changes flight. Three should voluntarily replay or try a deliberate hay collision. Record uncontrolled-loss frequency and camera confusion.

Test fast direction reversal, contact beneath the UFO, maximum extension, release/reacquire, objects beyond boundaries and pause during high tension. Run ten minutes without numerical explosions or unbounded energy. A load must never pass through solid ground or grant duplicate delivery.

## Decision rule and deliverables
One offline HTML with mass/tension debug toggle and test notes. If the load barely affects flight, fix reciprocal force before adding obstacles. If settling is tedious, tune damping and pad tolerance. If it is easy only because the beam teleports cargo, the mechanic has not passed.

The 2026-09-13 user request now authorizes an exploratory six-contract expansion beyond this original M1 slice. The current HTML includes that campaign; this file preserves the original test hypothesis. See CAMPAIGN.md for current scope and PLAYTEST_LOG.md for measured evidence and still-open human gates.
