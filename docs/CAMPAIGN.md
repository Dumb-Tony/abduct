# Nightfall — playable campaign

## Authorization and scope

On 2026-09-13 the user reported that the presentation looked better and they liked the mechanics for now, then explicitly requested expanding the game to explore its potential. This supersedes the earlier implementation cap at M1. It is one returning player's observation, not the five-fresh-player gate. The expansion keeps single-player, one UFO, and force-based tractor-beam handling. It does not add multiplayer, upgrades, a shooter arsenal or production infrastructure.

## Contract sequence

| Contract | Required objective | New pressure | Gold target |
| --- | --- | --- | --- |
| First Contact | Deliver one cow | Learn lift and settling; legacy handling retained | 45s |
| Hay Fever | Smash three hay targets with cargo | Build and aim a deliberate swing; no delivery required | 55s |
| Heavy Lifting | Deliver heavy freight | Triple the cow mass, two walls and a narrower pad | 65s |
| Double Take | Deliver two cows | Return trip over a taller obstacle | 100s |
| Windfall | Deliver two giant pumpkins | Light cargo, gust corridor, high calm route | 110s |
| Last Call | Deliver cow, pumpkin and crate; smash three hay targets | Plan cargo order and use a load before securing it | 160s |

After-hours Playground has all five cargo classes and hay, no victory state or quota. R resets it. The original six contracts are immediately selectable to make the direction easy to explore. Stars and personal bests supply replay goals without restricting access.

## Core systems

The original UFO/cow/crate masses, spring frequency, damping, thrust, speed guards and fixed 1/120 timestep are retained. Pumpkin mass is 1.2, radius 21. Static obstacles use circle/AABB projection at each of four collision microsteps. Beam wrapping and collision with scenery are not simulated: cargo and craft collide, while the beam line can cross geometry. Each route has ample space to lift cargo above its obstacles.

Collectors are per-contract. Each required body must be fully within its pad, grounded, below 22px/s and stable for one second. It is then marked secured and excluded from collision/acquisition; that state awards delivery only once. On mixed demolition jobs the last required cargo remains available until hay and tower quotas are met. Optional tools are not consumed on delivery-only jobs. The practice field accepts any cargo but never automatically ends.

Windfall uses a bounded rightward acceleration within x=410..855 and below y=210. Every nine seconds begins with three calm seconds, followed by a smooth six-second gust rising/falling to 65px/s². The visible corridor, calm-air line, countdown and moving streaks communicate this without extra controls. It acts on both craft and loads; no change applies outside this contract.

Objective score is 500 per required delivery plus 100 per required hay target. The time bonus is capped at 25% of that total. Optional hay cannot inflate mission score. Gold requires time at or below the listed target and zero damage, overload drops or cargo replacements; silver allows twice the target; any completion earns bronze. Best time and best star count are stored independently per stable mission ID and ship in `abduct-nightfall-2`. Settings remain in the guarded legacy adapter. Old M1 scores are not imported into campaign competition.

## Nightfall expansion — 2026-09-14

The user requested a mix of campaign progression, physics puzzles and arcade chaos, prioritizing active hazards and harder cargo on desktop. This extends the scope to twelve contracts and three selectable ships. The original Courier retains its handling. Swift unlocks at two completed contracts; Atlas and the first three new contracts at three; final operations at six. Existing campaign saves migrate to Courier records. A full-screen button supports desktop play.

| Contract | Objective and pressure | Gold target |
| --- | --- | --- |
| Lights Out | Cow delivery under a sweeping searchlight | 70s |
| Dead Weight | Atlas ballast delivery over walls with a patrol drone | 80s |
| Field Medicine | Two fragile specimens with a patrol drone | 115s |
| Counterweight | Disable two towers using cargo, then deliver a cow | 105s |
| Storm Warning | Specimen and pumpkin in wind, drone and searchlight | 130s |
| Mothership Manifest | Atlas ballast and specimen, three hay targets, tower and drone | 180s |

Searchlights build a visible lock for 1.35 seconds before hitting. Drones damage on contact. Three hits fail the contract; each hit provides three seconds of protection and jams the beam for 1.5 seconds. Moving cargo can disable defenses; required towers count once. Fragile specimens take damage on hard impacts and return to source if broken, adding ten seconds. Ballast mass is 9; Atlas provides the lift and beam capacity for required ballast jobs. Practice offers all five cargo types.

## Remaining human checks

Automated complete routes establish feasibility, not enjoyment. Next player feedback should guide hazard readability, cargo damage fairness, ship preference, return-trip pacing and medal targets. This is a larger playable game, with balance and fresh-player comprehension still to validate.
