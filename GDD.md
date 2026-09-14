# Abduct — Game Design Document

## Elevator pitch
Pilot a tiny UFO whose tractor beam makes cargo hang like an elastic pendulum. Steal a cow, feel it pull against your flight, and learn to use the swinging load to transport, launch and demolish. Target missions: 2–5 minutes.

## Design pillars
- The tractor beam is the primary tool and source of mastery.
- Suspended mass reacts back on the saucer.
- Transportation and destruction share one physical vocabulary.
- Objectives are simple; solutions are playful and open.

## Player fantasy
Become a reckless alien cargo pilot. Stop at exactly the right moment, swing a cow through a hay barricade, then settle it into the collection zone with improbable precision. Slapstick animals remain unharmed in the presentation.

## Core gameplay loop
Read target → approach and attach → accelerate while managing load swing → navigate, deliver or deliberately collide → evade resistance → complete quota → escape → compare time/score → retry. Abduction is completed at a visible collector, not instantly on beam contact.

## Controls
WASD/arrows apply horizontal/vertical flight thrust; Space hold beam to acquire the nearest eligible object within a cone below the UFO, release to detach; Q/E shorten/lengthen the tether after attachment. R restart; Escape pause. M1 may fix tether length until the swing itself passes. Gamepad later: left stick flight, trigger beam, shoulder buttons reel. Hold/toggle beam is an option. Selection preview resolves ambiguity without a separate aiming mode.

## Moment-to-moment mechanics
Hover above a target and commit the beam. Accelerate slowly to carry safely or sharply to build swing. Countersteer to damp the pendulum. Release at the right arc to throw a hay bale. A heavy tractor might drag the saucer down, demanding a different path or vehicle later. Cargo hits obstacles while the UFO remains clear; the beam does not make the load intangible.

## Physics and systems
M1 uses 2D side view with two dynamic bodies joined by a unilateral damped spring: tension acts when distance exceeds rest length, never pushes the cargo away when slack. Proposed tension T = clamp(k × extension + c × separationSpeed, 0, Tmax). Apply equal-and-opposite force. Gravity acts on cargo and craft; baseline hover thrust supports the bare saucer, leaving cargo weight as a real burden. Steering is force-based with acceleration limits.

Use stable substeps, collision sweeps for fast loads and bounded tether stretch. If tension exceeds capacity for a clearly telegraphed duration, detach rather than explode numerically. Reeling changes rest length at a bounded rate and cannot inject unlimited energy. Initial beam acquires one object; multiple loads and tether wrapping are deferred. Static geometry must not be passed through by cargo; beam occlusion gets an explicit short warning before release if used.

## Scoring
Mission completion requires delivered quota or designated destruction, not arbitrary damage farming. Proposed score: intact cow delivery 500, target structure 300, optional precision landing 100, time bonus capped at 25% of objective score. Award each object/structure once. A thrown target outside the world reappears at a safe source point with a time penalty so required quotas remain possible. Recreational destruction adds little score; it cannot outweigh ignoring the mission. Timer includes recovery.

## Level and environment design
M1 field includes pickup patch, low hay obstacle, generous delivery platform and open swing space. Later barns, power lines and wind gaps teach clearance without adding combat controls. Conditional release: six missions across farm and small-town kits. Highway, fair, city, military base, airport and reverse-abduction facility are backlog. Each mandatory load has at least one safe carry route and an optional risky shortcut.

## Progression and unlocks
Earn mission medals to unlock a scout and cargo saucer after the standard craft is understood. Scout accelerates quickly but has low beam capacity; cargo saucer lifts more but turns slowly. Cosmetic hulls provide extra rewards. No mandatory stat grind. Record handling class alongside scores and compare like with like.

## Replayability
Faster settling, intentional throws, alternate routes, optional cargo and local medals supply replay. Later challenge missions can ask for no release or minimal collateral using the same map. Resistance begins with a single telegraphed farmer hazard in M2; escalating police/military remain conditional. The game must remain a beam-physics game rather than evolve into a shooter.

## Art direction
Playful rural diorama, clear saucer/cargo silhouettes, soft night colors and readable ground. Beam has transparent edges and a visible attachment point. Large scenery masses frame safe flight corridors. Animals use cartoon bounce and surprise rather than injury detail.

## Animation and VFX
Saucer banks with acceleration; cow legs react to swing and settle. Beam narrows and strains under tension, reinforced by a meter/icon. Impact squash and hay bursts sell contact without hiding the load. A delivery settle animation confirms success only after the physics validator accepts it.

## Audio
Hover hum reacts to thrust/load, beam whine reflects tension and attachment has a clean confirmation sound. Cargo rattles or moos sparingly. Distinct strain and release cues prevent unexplained drops. Music yields to the sound of a critical swing; subtitles/icons support essential cues.

## UI/UX
Show quota, time, target preview and a compact tension/weight cue near the beam. Teach grab, move and countersteer with space to experiment. Delivery zone shows required settling condition. Results separate mission awards and time bonus, with one-action retry. Camera includes both UFO and load, with bounded zoom to prevent disorientation.

## Accessibility and options
Remapping, beam toggle, optional fixed tether length, adjustable deadzones, reduced motion and high-contrast beam/targets. Practice assists can increase damping and capacity with separate records. Critical tension is shown through shape and pattern as well as color/sound. Avoid sustained precision hovering as a mandatory accessibility barrier by making the first collector generous.

## Technical approach
Canvas side view with dynamic circles/boxes, spring constraints and fixed-step solver. Developer overlay displays tension, rest length, load mass and both velocity vectors. Maintain score/object state separately from fragments. Benchmark stress at the maximum designed load before adding destruction. A 3D engine is considered only after a 2D swing proves enjoyable and depth justifies its costs.

## Risks and mitigations
Pendulum feels uncontrollable: tune damping and give players open practice space. Mass is cosmetic: apply reaction to saucer and compare light/heavy tests. Spring instability: clamp tension, substep and test fast reversals. Camera loses cargo: frame the pair with a bounded zoom. Cargo becomes a weapon-only novelty: require at least one precision delivery using the same swing model.

## Scope boundaries
M1 includes one field, one UFO, one cow, one heavier test load and hay blocks. No armed enemies, multi-object capture, rope wrapping, general destruction simulation or upgrades. Conditional release caps at six missions, two environment kits, three craft classes and a modest load library. No shooter arsenal, open world, multiplayer architecture or live services.

## Milestone roadmap
1. **Standalone HTML vertical prototype:** prove attachment, reciprocal mass, swinging, countersteering and delivery in one field.
2. **Physics/readability validation:** compare load classes, test bounded reel and one resistance hazard; retain only additions that serve beam mastery.
3. **Small game:** six missions, limited saucers and local medals; test carry and swing solutions on each map.
4. **Polish:** animation/audio, camera comfort, accessibility, collision stability and recovery cases.
5. **Expansion review:** larger scenes or resistance tiers require evidence; multiplayer remains a separate later decision.

## Development policy and evidence

This is a planning document, version 0.1, dated 2026-09-12. It is not a production commitment. The source is the concept-development response in “Generate Game Ideas” (conversation 6aa59721-d164-83ea-966e-8f286439cfce), read in full for the seven selected concepts. The user's current brief takes precedence over older multiplayer brainstorming. Mechanical formulas, key bindings, content budgets, and test thresholds below are proposed hypotheses, not previously approved requirements or measured results.

Single-player first. No accounts, servers, matchmaking, replication, rollback, network authority, or multiplayer-driven entity architecture. A later multiplayer proposal requires its own feasibility and scope decision. Ordinary modular separation of input, simulation, presentation, and save data is sufficient now.

Milestone 1 is a standalone HTML vertical prototype whose sole purpose is proving the core mechanic/verb before expanding content. “Vertical” means a complete tiny start–play–result–restart loop, not production polish. M1 is now implemented in prototypes/m1/index.html. This is a mechanic test, not a full production build; human exit gates remain open.

## Shared implementation and validation contract

Deliver the future M1 as one index.html with embedded CSS, JavaScript, geometry, and generated sound. It must open from file:// offline with no installation, build command, CDN, remote fonts, fetch, or external asset requirement. Use Canvas 2D for initial rendering, including projected geometry where specified. No engine decision for the full game is implied.

Use requestAnimationFrame for presentation and a fixed 1/120-second simulation accumulator, capped at eight catch-up steps. Discard excessive backlog after suspending a tab; pause on lost focus and clear held input. Tune to a stable 60 rendered frames/second on the actual test PC, whose CPU, GPU, browser, and resolution must be recorded. Compare repeated scripted input at 30, 60, and 120 rendered FPS; traversal/score differences above 2% need investigation. This is local repeatability, not a promise of cross-browser bitwise determinism.

Persist only settings and appropriate local records through a versioned localStorage adapter wrapped in try/catch. The game must remain playable in memory when storage is unavailable, especially under file://. Provide an explicit local reset action. Later ghost recordings must carry course, rules, and physics version identifiers. Never silently compare incompatible records.

Developer-only overlays report frame cost, simulation time, relevant physical variables, and reset state. M1 tests cover the normal loop, boundary cases, focus loss, rapid restart, and prolonged use. Do not invest in a general framework before a mechanic passes.

## Milestone governance

Milestones are exit gates, not promised calendar dates. At each gate, record observations, parameter changes, unresolved issues, and a proceed / iterate / park decision in docs/PLAYTEST_LOG.md. Recruit five fresh players where possible; an internal solo test can identify problems but cannot count as the fresh-player comprehension gate. Small samples are directional evidence.

M1 includes only the bespoke prototype specification in docs/PROTOTYPE_M1.md. Do not begin M2 merely because M1 runs without crashing. If the mechanic misses its enjoyment or readability gate, run up to two focused tuning rounds before deciding whether to revise the premise or park it. Adding levels, upgrades, story, or polished assets is not the remedy for an unproven verb.

## Campaign expansion authorization — 2026-09-13

The user has played the visual update, said they like the mechanics for now, and explicitly authorized expanding the premise. The prior M1-only implementation cap is superseded for this exploratory campaign. Six contracts, two scenery kits, three cargo classes, saved medals and a practice field are now implemented in the same standalone HTML. See docs/CAMPAIGN.md for the delivered scope and docs/PLAYTEST_LOG.md for evidence. This is not a claim that five fresh players passed the original gate; the supporting user feedback is one returning player's qualitative observation.

## Nightfall expansion authorization — 2026-09-14

The user requested campaign/unlocks, physics puzzles and arcade chaos together, prioritizing active hazards and harder cargo on desktop. Twelve contracts, three selectable UFOs, five cargo classes, active defenses, shields/failure/retry, ship-specific records and migrated progress now implement that direction. This authorization supersedes the earlier single-craft scope. See docs/CAMPAIGN.md and docs/PLAYTEST_LOG.md; fresh-player gates remain outstanding.
