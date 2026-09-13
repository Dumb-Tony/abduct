const {chromium}=require(process.env.PLAYWRIGHT_PATH||'C:/Users/wabba/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1080}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.TEST_URL||'file:///'+path.resolve('prototypes/m1/index.html').replaceAll('\\','/'));
  await page.screenshot({path:'test-artifacts/visual-update-start.png'});
  await page.getByRole('button',{name:'Begin field test'}).click();
  await page.locator('#sound').check();await page.waitForTimeout(100);
  assert(await page.evaluate(()=>abductTest.presentation.audioState==='running'),'generated audio starts after gesture');
  await page.locator('#sound').uncheck();await page.waitForTimeout(50);
  assert(await page.evaluate(()=>abductTest.presentation.humGain<.014),'muting ramps down the hum');
  await page.locator('canvas').click({position:{x:10,y:10}});await page.keyboard.down('Space');
  await page.evaluate(()=>{const f=abductTest.field;for(let i=0;i<1100;i++){const u=f.u,tx=f.time>5?1040:190,ty=300;f.step({x:Math.max(-1,Math.min(1,((tx-u.x)*3-u.vx*3)/500)),y:Math.max(-1,Math.min(1,((ty-u.y)*5-u.vy*4-520/4.5)/500)),beam:true});}});
  await page.waitForTimeout(40);assert(await page.evaluate(()=>!!abductTest.field.link));await page.screenshot({path:'test-artifacts/visual-update-flight.png'});
  await page.keyboard.up('Space');
  // Exercise presentation events; these are controlled fixtures, not manual play.
  await page.evaluate(()=>{abductTest.field.hay[0].down=true;});await page.waitForTimeout(30);
  assert(await page.evaluate(()=>abductTest.presentation.particles>0),'hay event produces bounded particles');
  await page.locator('#motion').check();assert.equal(await page.evaluate(()=>abductTest.presentation.particles),0);
  await page.evaluate(()=>abductTest.field.hay[1].down=true);await page.waitForTimeout(30);assert.equal(await page.evaluate(()=>abductTest.presentation.particles),0);
  const before=await page.evaluate(()=>JSON.stringify({u:abductTest.field.u,c:abductTest.field.loads,time:abductTest.field.time}));
  await page.evaluate(()=>{abductTest.pause();});await page.waitForTimeout(80);
  const paused=await page.evaluate(()=>JSON.stringify({u:abductTest.field.u,c:abductTest.field.loads,time:abductTest.field.time}));await page.waitForTimeout(80);
  assert.equal(await page.evaluate(()=>JSON.stringify({u:abductTest.field.u,c:abductTest.field.loads,time:abductTest.field.time})),paused,'presentation cannot advance paused physics');
  await page.reload();assert(await page.locator('#motion').isChecked(),'less motion persists');
  await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-artifacts/visual-update-mobile.png'});
  const b=await page.getByRole('button',{name:'Begin field test'}).boundingBox();assert(b.y>=0&&b.y+b.height<=844);
  assert.equal(errors.length,0);console.log('PASS: new start/flight/mobile renders, generated sound/mute, hay particles, reduced motion persistence, paused simulation, zero page errors');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
