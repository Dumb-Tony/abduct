const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('prototypes/m1/index.html','utf8');const sandbox={};vm.createContext(sandbox);vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);const {Field,RULES}=sandbox.Abduct;
const step=(f,n,input)=>{for(let i=0;i<n;i++)f.step(typeof input==='function'?input(f,i):input)};
function routeInput(f){const u=f.u,c=f.loads[0];let tx=190,ty=300;
 if(f.time>5){tx=1040;ty=300}if(f.time>14){tx=1040;ty=435}
 return {x:Math.max(-1,Math.min(1,((tx-u.x)*3-u.vx*3)/500)),y:Math.max(-1,Math.min(1,((ty-u.y)*5-u.vy*4- (f.link?520/4.5:0))/500)),beam:f.time<23};
}
const route=new Field();step(route,120*40,routeInput);console.log('route',JSON.stringify({won:route.won,time:route.time,u:route.u,cow:route.loads[0],losses:route.losses}));assert(route.won,'full pickup/carry/settle route');assert.equal(route.score,500+Math.max(0,Math.round(125*(1-route.time/180))));const score=route.score;step(route,1000,{});assert.equal(route.score,score);
const outcomes=[30,60,120].map(fps=>{const f=new Field();for(let i=0;i<fps*40;i++)f.advance(1/fps,routeInput(f));return {fps,x:f.loads[0].x,time:f.time,score:f.score,won:f.won}});console.log('FPS replay',outcomes);for(const o of outcomes){assert(o.won);assert(Math.abs(o.time-outcomes[2].time)/outcomes[2].time<.02)}
const mass=[];for(const index of [0,1]){const f=new Field(),b=f.loads[index];f.u.x=b.x;f.u.y=300;b.y=450;f.link=b;step(f,120,{beam:true,x:1,y:-.5});mass.push({mass:b.m,uX:f.u.x-(index?370:190),uY:f.u.y})}console.log('mass comparison',mass);assert(mass[1].uY>mass[0].uY+10);assert(mass[1].uX<mass[0].uX);
const reverse=new Field();step(reverse,120*600,(f,i)=>({x:Math.sin(i*.031)>0?1:-1,y:Math.sin(i*.017)>0?1:-1,beam:i%480<420}));for(const b of [reverse.u,...reverse.loads]){assert(Number.isFinite(b.x+b.y+b.vx+b.vy));assert(b.y+b.r<=580.001);assert(Math.hypot(b.vx,b.vy)<1000)}console.log('10 minute stress',{steps:reverse.steps,maxSpeed:reverse.maxSpeed,losses:reverse.losses,hits:reverse.hits});
const max=new Field();max.link=max.loads[0];max.u.y=100;max.loads[0].y=550;max.step({beam:true});assert.equal(max.link,null);
const reacquire=new Field();reacquire.step({beam:true});assert(reacquire.link);reacquire.step({beam:false});assert.equal(reacquire.link,null);reacquire.step({beam:true});assert(reacquire.link);
const recovery=new Field();recovery.loads[0].x=1500;recovery.step({});assert(recovery.loads[0].x<1200);assert(recovery.time>=5);
const contact=new Field();contact.loads[0].x=contact.u.x;contact.loads[0].y=contact.u.y+5;contact.step({});assert(Math.hypot(contact.loads[0].x-contact.u.x,contact.loads[0].y-contact.u.y)>45);
const hay=new Field();hay.loads[0].x=485;hay.loads[0].y=550;hay.loads[0].vx=300;step(hay,40,{});assert(hay.hits>0);
for(let i=0;i<100;i++){reverse.reset();assert.equal(reverse.time,0);assert.equal(reverse.link,null);assert.equal(reverse.score,0)}
console.log('PASS: route, score, FPS, reciprocal mass, stress, extension, reacquisition, recovery, contact, hay, restarts');
const slack=new Field();slack.u.y=300;slack.loads[0].y=390;slack.link=slack.loads[0];slack.step({beam:true});assert.equal(slack.tension,0,'slack beam never pushes');
const reaction=new Field();reaction.u.y=300;reaction.loads[0].x=240;reaction.loads[0].y=450;reaction.link=reaction.loads[0];reaction.step({beam:true});assert(Math.abs(reaction.u.vx*3+reaction.loads[0].vx*2)<1e-8,'spring horizontal momentum is equal and opposite');
const free=new Field();free.u.y=150;free.loads[0].y=300;free.loads[0].vx=300;free.link=free.loads[0];step(free,72000,{beam:true});assert(Math.hypot(free.u.vx,free.u.vy)<1);assert(Math.hypot(free.loads[0].vx,free.loads[0].vy)<1);console.log('PASS: unilateral slack, exact reciprocal impulse, ten-minute unpowered decay');
module.exports={routeInput};
