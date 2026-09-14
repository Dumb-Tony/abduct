// Accelerated browser keyboard-event replay. No direct field stepping or teleporting.
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'C:/Users/wabba/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pilot,MISSIONS}=require('./campaign.cjs');const assert=require('node:assert/strict'),path=require('node:path');
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox']});try{
const page=await browser.newPage({viewport:{width:1280,height:960}});const initialTime=Date.now();await page.clock.install({time:initialTime});await page.goto(process.env.TEST_URL||'file:///'+path.resolve('prototypes/m1/index.html').replaceAll('\\','/'));await page.clock.pauseAt(initialTime+1000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
const from=Number(process.env.MISSION_FROM||0),to=Number(process.env.MISSION_TO||6);if(from>=6){await page.evaluate(ids=>{localStorage.setItem('abduct-campaign-1',JSON.stringify(Object.fromEntries(ids.map(id=>[id,{time:60,stars:2}]))));},MISSIONS.slice(0,6).map(m=>m.id));await page.reload();}
for(let mission=from;mission<to;mission++){
 await page.getByRole('button',{name:'Contracts',exact:true}).click();await page.locator(`[data-mission="${mission}"]`).click();await page.getByRole('button',{name:'Launch contract'}).click();
 await page.evaluate(source=>{let drive=eval('('+source+')')(),sx=0,sy=0,held=new Set();window.stopDrive=false;
 function tick(){const f=abductTest.field;if(window.stopDrive||f.won||f.failed){for(const code of held)document.body.dispatchEvent(new KeyboardEvent('keyup',{code,bubbles:true}));return;}
  const input=drive(f);sx+=input.x;sy+=input.y;const next=new Set();if(input.beam)next.add('Space');if(Math.abs(sx)>.5){next.add(sx>0?'KeyD':'KeyA');sx-=Math.sign(sx);}if(Math.abs(sy)>.5){next.add(sy>0?'KeyS':'KeyW');sy-=Math.sign(sy);}
  for(const code of held)if(!next.has(code))document.body.dispatchEvent(new KeyboardEvent('keyup',{code,bubbles:true}));for(const code of next)if(!held.has(code))document.body.dispatchEvent(new KeyboardEvent('keydown',{code,bubbles:true}));held=next;requestAnimationFrame(tick);
 }requestAnimationFrame(tick);},pilot.toString());
 for(let seconds=0;seconds<240;seconds+=10){await page.clock.runFor(10000);if(await page.evaluate(()=>abductTest.field.won||abductTest.field.failed))break;}
 const r=await page.evaluate(()=>({name:abductTest.field.mission.name,won:abductTest.field.won,time:abductTest.field.time,hits:abductTest.field.hits,delivered:abductTest.field.deliveries,losses:abductTest.field.losses}));console.log('keyboard-event replay',r);await page.evaluate(()=>window.stopDrive=true);assert(r.won,`${r.name} keyboard-event route`);
}
assert.equal(errors.length,0);console.log('PASS: requested browser keyboard-event routes at virtual render cadence');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
