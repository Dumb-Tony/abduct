const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context={};vm.createContext(context);vm.runInContext(fs.readFileSync('prototypes/m1/index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],context);
const {Field,MISSIONS}=context.Abduct;
function pilot(){let phase='pick',target=null,timer=0,dir=1,demoReady=false,previousTime=0;return f=>{
 const elapsed=f.time-previousTime;previousTime=f.time;
 const u=f.u,cruise=f.mission.id==='storm-warning'?125:190;let tx=u.x,ty=200,beam=true;
 if(f.blocked)return {x:0,y:-.5,beam:false};
 if(f.hits<f.mission.smash||f.disabled<(f.mission.targets||0)){
  if(!f.link){target=f.activeLoads().find(b=>b.kind==='cow')||f.activeLoads()[0];tx=target.x;ty=target.y-145;}
  else if(f.solids.length&&!demoReady){ty=cruise;tx=u.y>cruise+30?u.x:660;if(u.x>640&&u.y<cruise+30)demoReady=true;}else{const left=f.solids.length?660:120;tx=dir>0?1120:left;ty=425;if(u.x>1080)dir=-1;if(u.x<left+20)dir=1;}
 }else{
  if(!target||target.delivered||!target.required){target=f.activeLoads().find(b=>b.required);phase=f.deliveries?'return':'pick';timer=0;}
  if(!target)return {x:0,y:0,beam:false};
  if(!f.link&&['lift','carry','lower'].includes(phase)){phase='return';timer=0;}
  if(phase==='return'){beam=false;ty=cruise;tx=u.y>cruise+30?u.x:target.x;if(Math.abs(u.x-target.x)<12&&u.y<cruise+30){phase='pick';}}
  if(phase==='pick'){if(f.link&&f.link!==target)beam=false;tx=target.x;ty=target.y-145;if(f.link===target){phase='lift';timer=0;}}
  if(phase==='lift'){tx=target.x;ty=cruise;timer+=elapsed;if(u.y<cruise+25&&timer>2){phase='carry';timer=0;}}
  if(phase==='carry'){tx=f.pad.x+f.pad.w/2;ty=cruise;if(Math.abs(u.x-tx)<15&&Math.abs(target.x-tx)<35&&Math.abs(target.vx)<35){phase='lower';timer=0;}}
  if(phase==='lower'){tx=f.pad.x+f.pad.w/2;ty=440;timer+=elapsed;if(timer>6){phase='release';timer=0;}}
  if(phase==='release'){tx=f.pad.x+f.pad.w/2;ty=400;beam=false;timer+=elapsed;if(timer>8&&!target.delivered){phase='pick';timer=0;}}
 }
 return {x:Math.max(-1,Math.min(1,((tx-u.x)*3-u.vx*3)/500)),y:Math.max(-1,Math.min(1,((ty-u.y)*5-u.vy*4)/500-(f.link?f.link.m*260/f.ship.fy:0))),beam};
};}
function run(index,fps=120){const f=new Field(index,MISSIONS[index].requiredShip||'courier'),input=pilot();for(let i=0;i<fps*300&&!f.won;i++)f.advance(1/fps,input(f));return f;}
if(require.main===module){
for(let i=0;i<6;i++){const f=run(i);console.log(JSON.stringify({mission:f.mission.name,won:f.won,time:f.time,hits:f.hits,deliveries:f.deliveries,losses:f.losses,u:f.u,loads:f.loads.map(b=>({kind:b.kind,x:b.x,y:b.y,done:b.delivered}))}));assert(f.won,`${f.mission.name}: whole route must complete`);const score=f.score;for(let j=0;j<100;j++)f.step({});assert.equal(score,f.score);}
for(let i=0;i<6;i++){const results=[30,60,120].map(fps=>run(i,fps));assert(results.every(f=>f.won));const times=results.map(f=>f.time),spread=(Math.max(...times)-Math.min(...times))/Math.min(...times);console.log('cadence',MISSIONS[i].name,times.map(t=>+t.toFixed(3)),(spread*100).toFixed(3)+'%');assert(spread<.02,'campaign route cadence must remain within 2%');}
const guard=new Field(5);for(const b of guard.loads){b.x=1055;b.y=578-b.r;b.vx=b.vy=0;for(let i=0;i<240;i++)guard.step({});}assert.equal(guard.deliveries,2);assert.equal(guard.won,false);assert.equal(guard.activeLoads().length,1,'final wrecking load retained until hay quota');
const free=new Field(MISSIONS.findIndex(m=>m.practice));for(let i=0;i<1200;i++)free.step({});assert(!free.won,'practice never ends automatically');
const wind=new Field(4);wind.time=5;assert(wind.windAt({x:600,y:350})>0);assert.equal(wind.windAt({x:600,y:150}),0);wind.time=1;assert.equal(wind.windAt({x:600,y:350}),0);
for(let index=2;index<6;index++){const f=new Field(index);for(let i=0;i<120*90;i++){f.step({x:Math.sin(i*.03)>0?1:-1,y:Math.sin(i*.017)>0?1:-1,beam:i%480<420});for(const b of [f.u,...f.activeLoads()]){assert(Number.isFinite(b.x+b.y+b.vx+b.vy));assert(b.y+b.r<=580.001);for(const h of f.solids){const dx=b.x-Math.max(h.x,Math.min(h.x+h.w,b.x)),dy=b.y-Math.max(h.y,Math.min(h.y+h.h,b.y));assert(Math.hypot(dx,dy)>=b.r-2,'solid overlap exceeds tolerance');}}}console.log('90 second geometry stress',f.mission.name,'pass');}
console.log('PASS: six complete routes, FPS consistency, score integrity, last-load retention, practice, wind bands, geometry stress');
}
module.exports={Field,MISSIONS,pilot,run};
