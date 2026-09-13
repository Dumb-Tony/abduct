# The Night Shift — exploratory campaign

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

After-hours Playground has all three cargo classes and hay, no victory state or quota. R resets it. The six contracts are immediately selectable to make the direction easy to explore. Stars and personal bests supply replay goals without restricting access.

## Core systems

The original UFO/cow/crate masses, spring frequency, damping, thrust, speed guards and fixed 1/120 timestep are retained. Pumpkin mass is 1.2, radius 21. Static obstacles use circle/AABB projection at each of four collision microsteps. Beam wrapping and collision with scenery are not simulated: cargo and craft collide, while the beam line can cross geometry. Each route has ample space to lift cargo above its obstacles.

Collectors are per-contract. Each required body must be fully within its pad, grounded, below 22px/s and stable for one second. It is then marked secured and excluded from collision/acquisition; that state awards delivery only once. On mixed demolition jobs the last required cargo remains available until the hay quota is met. Optional tools are not consumed on delivery-only jobs. The practice field accepts any cargo but never automatically ends.

Windfall uses a bounded rightward acceleration within x=410..855 and below y=210. Every nine seconds begins with three calm seconds, followed by a smooth six-second gust rising/falling to 65px/s². The visible corridor, calm-air line, countdown and moving streaks communicate this without extra controls. It acts on both craft and loads; no change applies outside this contract.

Objective score is 500 per required delivery plus 100 per required hay target. The time bonus is capped at 25% of that total. Optional hay cannot inflate mission score. Gold requires time at or below the listed target and zero overload drops; silver allows twice the target; any completion earns bronze. Best time and best star count are stored independently per stable mission ID in `abduct-campaign-1`. Settings remain in the guarded legacy adapter. Old M1 scores are not imported into campaign competition.

## Remaining questions

Does the player enjoy returning for second cargo, or does that become empty travel? Are hay contacts sufficiently intentional rather than lucky? Is the light pumpkin distinct enough under wind? Are the gold targets appropriate for keyboard players? Does securing the last load only after hay clearance read clearly? Human testing should guide the next iteration rather than adding more missions automatically.

One craft is retained to preserve the handling the user likes. A future scout/cargo-saucer comparison, reeling, and a telegraphed farmer hazard remain design options, not shipped features. The current campaign is a concrete direction to play, not a claim that production readiness or the original fresh-player gates are complete.
