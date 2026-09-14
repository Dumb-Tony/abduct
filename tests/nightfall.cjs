const {Field,MISSIONS,pilot,run}=require('./campaign.cjs');const assert=require('node:assert/strict');
for(let i=6;i<12;i++){const f=run(i);console.log('route',i+1,f.mission.name,{won:f.won,time:+f.time.toFixed(3),hits:f.damage,deliveries:f.deliveries,towers:f.disabled,replacements:f.recoveries});assert(f.won);assert(!f.failed);}
// Record a 30Hz input tape, then replay that identical tape at three rendering
// cadences. Adaptive pilots can take different routes after a differently timed hit.
for(let mission=6;mission<12;mission++){
 const ship=MISSIONS[mission].requiredShip||'courier',source=new Field(mission,ship),control=pilot(),tape=[];
 for(let i=0;i<9000&&!source.won&&!source.failed;i++){const input=control(source);tape.push(input);source.advance(1/30,input);}assert(source.won);
 const results=[30,60,120].map(fps=>{const f=new Field(mission,ship);for(let frame=0;frame<tape.length*fps/30&&!f.won&&!f.failed;frame++)f.advance(1/fps,tape[Math.floor(frame*30/fps)]);return f;});
 for(const f of results){assert(f.won);assert.equal(f.time,source.time);assert.equal(f.score,source.score);assert.equal(f.damage,source.damage);}console.log('identical-input cadence',mission+1,'30/60/120: exact time, score and damage match');
}
const light=new Field(6);light.u.x=600;light.u.y=340;
for(let i=0;i<100;i++){const d=light.defenses[0];light.time=0;light.u.x=600;light.u.y=340;light.hazards(1/120);}assert.equal(light.damage,0,'lock-on warning precedes damage');
for(let i=0;i<100;i++)light.hazards(1/120);assert.equal(light.damage,1);assert.equal(light.shields,2);assert(light.jam>0);light.hit();assert.equal(light.shields,2,'invulnerability prevents damage every frame');
light.invulnerable=0;light.hit();light.invulnerable=0;light.hit();assert(light.failed);const time=light.time;light.step({y:1});assert.equal(light.time,time);light.reset();assert.equal(light.shields,3);assert(!light.failed);
const tower=new Field(9);const d=tower.defenses[0],b=tower.loads[0];b.x=d.x;b.y=d.y;b.vx=150;tower.hazards(.01);assert(d.disabled);assert.equal(tower.disabled,1);tower.hazards(.01);assert.equal(tower.disabled,1);
const fragile=new Field(8),pod=fragile.loads[0];fragile.impact(pod,100);assert.equal(pod.integrity,100);fragile.impact(pod,350);assert(pod.integrity<100);fragile.time+=1;fragile.impact(pod,400);assert.equal(fragile.recoveries,1);assert.equal(pod.x,pod.sourceX);assert.equal(pod.integrity,100);assert(fragile.time>=11);fragile.impact(pod,400);assert.equal(fragile.recoveries,1,'replacement grace prevents repeated breakage');
const tooHeavy=new Field(7,'courier'),hauler=new Field(7,'atlas');for(const f of [tooHeavy,hauler]){f.u.y=300;f.loads[0].y=450;f.link=f.loads[0];for(let i=0;i<240;i++)f.step({y:-1,beam:true});}assert(hauler.u.y<tooHeavy.u.y-50,'Atlas provides materially more lift');
for(let i=6;i<12;i++){const f=new Field(i,MISSIONS[i].requiredShip||'courier');for(let j=0;j<120*90&&!f.failed&&!f.won;j++){f.step({x:Math.sin(j*.03)>0?1:-1,y:Math.sin(j*.017)>0?1:-1,beam:j%480<420});for(const b of [f.u,...f.activeLoads()]){assert(Number.isFinite(b.x+b.y+b.vx+b.vy));assert(b.y+b.r<=580.001);}}assert(f.shields>=0);console.log('hazard stress',i+1,'finite; terminal=',f.failed?'failure':f.won?'success':'running');}
console.log('PASS: six new routes, warned damage, shield grace, failure/reset, target scoring, specimen damage/replacement, Atlas lift and hazard stress');
