const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({headless:true,...(process.env.MATRIX_CHROMIUM_PATH?{executablePath:process.env.MATRIX_CHROMIUM_PATH}:{}),args:['--no-sandbox','--disable-gpu']});
const page=await browser.newPage({viewport:{width:1440,height:960}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:8000/determinant/');await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(100);
await page.screenshot({path:'evidence/v5/opening.png'});
await page.getByRole('button',{name:'Pause background animation',exact:true}).click();
const cameraStart=await page.locator('#hero-grid').evaluate(el=>el.toDataURL());
await page.evaluate(()=>scrollTo(0,innerHeight*.4));await page.waitForTimeout(100);
assert.ok(Number(await page.locator('.hero').getAttribute('data-camera-progress'))>0);
assert.notEqual(await page.locator('#hero-grid').evaluate(el=>el.toDataURL()),cameraStart);
assert.equal((await page.locator('.hero').boundingBox()).y,0);
await page.screenshot({path:'evidence/v5/camera-pan.png'});
async function at(id,raw=.8){await page.evaluate(({id,raw})=>{const el=document.getElementById(id),r=el.getBoundingClientRect();scrollTo(0,scrollY+r.top-Number(el.dataset.pin)+raw*Number(el.dataset.travel));},{id,raw});await page.waitForTimeout(100);assert.equal(await page.locator('.step.active').getAttribute('id'),id);}
const check=async(id,v)=>assert.equal(await page.locator('#'+id).innerText(),v);
const arrow=()=>page.locator('#example-arrow line').evaluate(el=>[Number(el.getAttribute('x2')),Number(el.getAttribute('y2'))]);
await at('vector',.15);const a1=await arrow(),text1=await page.locator('#vector .step-copy').boundingBox();
await at('vector',.72);const a2=await arrow(),text2=await page.locator('#vector .step-copy').boundingBox();
assert.ok(Math.hypot(a1[0]-350,a1[1]-400)<Math.hypot(a2[0]-350,a2[1]-400));
assert.ok(Math.abs(text1.y-text2.y)<2);assert.ok(text2.y>=0&&text2.y+text2.height<=960);
await check('mode-label','2 / 15');assert.equal(await page.getByText(/Scroll story/i).count(),0);
await page.screenshot({path:'evidence/v5/pinned-vector.png'});
for(const id of ['basis','columns','unit-square','area-scale','collapse','reflection']){
 await at(id,.72);const text=await page.locator('#'+id+' .step-copy').boundingBox();assert.ok(text.y>=0&&text.y+text.height<=962,id+' text should remain visible at completion');
}
await check('det','-1');await at('collapse',.72);await check('det','0');await page.screenshot({path:'evidence/v5/pinned-collapse.png'});
await at('columns');await check('scene-caption','Vector (−1, 2) → (3, 2)');await at('unit-square');await check('det','1');
await at('playground',.1);assert.equal(await page.locator('.explore-controls').isVisible(),true);assert.equal(await page.getByRole('button',{name:'Resume story',exact:true}).count(),0);
await page.getByRole('button',{name:'Stretch + shear',exact:true}).click();await check('det','2');
await page.getByRole('button',{name:'Reflect ↔',exact:true}).click();assert.equal(await page.locator('#a').inputValue(),'-2');assert.equal(await page.locator('#b').inputValue(),'-1');await check('det','-2');
await page.getByRole('button',{name:'Reflect ↔',exact:true}).click();await check('det','2');assert.equal(await page.locator('#a').inputValue(),'2');
await page.locator('#scrubber').fill('337');await page.getByRole('button',{name:'Reflect ↔',exact:true}).click();assert.equal(await page.locator('#a').inputValue(),'-1.337');assert.equal(await page.locator('#b').inputValue(),'-0.337');
await page.getByRole('button',{name:'Reflect ↔',exact:true}).click();assert.equal(await page.locator('#a').inputValue(),'1.337');
await at('area-scale');await check('det','2');assert.equal(await page.locator('.explore-controls').isVisible(),false);
await at('playground',.1);assert.equal(await page.locator('#a').inputValue(),'1.337');
await page.getByRole('button',{name:'Play transformation',exact:true}).click();await at('beyond');const determinant=await page.locator('#det').innerText();await page.waitForTimeout(160);await check('det',determinant);assert.equal(await page.locator('.explore-controls').isVisible(),false);
const links=page.locator('a[href="https://yizhe-ang.github.io/matrix-explorable/"]');assert.ok(await links.count()>=2);for(const link of await links.all()){assert.equal(await link.getAttribute('target'),'_blank');assert.match(await link.getAttribute('rel'),/noopener/);}
assert.equal(await page.locator('a[href^="../index.html"]').count(),0);
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:'evidence/v5/mobile-opening.png'});
await at('basis',.72);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:'evidence/v5/mobile-story.png'});
assert.deepEqual(errors,[]);console.log('PASS: opening camera pan; copy stays visible through vector/matrix completion; indicator only; exact current-picture reflection and double-reflection; automatic demo exit, persistence, playback cancellation; original URLs/new tabs; mobile overflow; no JS errors.');await browser.close();
})();
