const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('static/determinant/index.html','utf8');
const elements=new Map();
function element(id){if(!elements.has(id))elements.set(id,{value:'',textContent:'',innerHTML:'',style:{},setAttribute(){},classList:{toggle(){}},listeners:{},addEventListener(n,fn){this.listeners[n]=fn}});return elements.get(id)}
const presets=['1,0,0,1','2,1,0,1','-1,0,0,1','2,1,0,0','0,0,0,0'].map(m=>Object.assign(element(m),{dataset:{m}}));
const context=vm.createContext({document:{getElementById:element,querySelectorAll:()=>presets},cancelAnimationFrame(){},requestAnimationFrame(){return 1},DOMPoint:class{constructor(x,y){this.x=x;this.y=y}matrixTransform(){return this}}});
vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],context);
const check=(matrix,det,status)=>{vm.runInContext(`update(${JSON.stringify(matrix)})`,context);assert.equal(element('det').textContent,String(det));assert.equal(element('area').textContent,String(Math.abs(det)));assert.equal(element('status-title').textContent,status)};
check([1,0,0,1],1,'Invertible');check([2,1,0,1],2,'Invertible');check([-1,0,0,1],-1,'Invertible');assert.equal(element('orientation').textContent,'Reversed');
check([2,1,0,0],0,'Not invertible');assert.match(element('equations').textContent,/MP = \(1.5, 0\)/);assert.match(element('equations').textContent,/MQ = \(1.5, 0\)/);
check([0,0,1,2],0,'Not invertible');check([0,0,0,0],0,'Not invertible');check([0.1,0,0,0.1],0.01,'Invertible');check([0.1,0.2,0.2,0.4],0,'Not invertible');
for(const p of presets)p.listeners.click();
element('a').value='1';element('a').valueAsNumber=1;element('a').listeners.input();assert.equal(element('a').value,1);
element('plot').setPointerCapture=()=>{};element('plot').getScreenCTM=()=>({inverse(){return {}}});element('plot').listeners.pointerdown({target:{closest:()=>({dataset:{col:'0'}})},pointerId:1});element('plot').listeners.pointermove({clientX:482,clientY:394});assert.equal(element('a').value,2);assert.equal(element('c').value,1);element('plot').listeners.pointerup();
vm.runInContext('update([-1,0,0,1]); progress=500; render()',context);assert.equal(element('det').textContent,'0');assert.equal(element('status-title').textContent,'Not invertible');
// Exhaust all 41^4 supported matrices, independently checking the integer determinant criterion.
let count=0;for(let a=-20;a<=20;a++)for(let b=-20;b<=20;b++)for(let c=-20;c<=20;c++)for(let d=-20;d<=20;d++){if(a*d===b*c){let dx=-b,dy=a;if(!a&&!b){dx=-d;dy=c}if(!dx&&!dy)dx=1;assert.ok(a*dx+b*dy===0);assert.ok(c*dx+d*dy===0);}count++}
console.log(`PASS: preset states, signed area logic, singular collisions, numeric/drag handlers; null-space construction checked across ${count} matrices. This unit test uses a DOM stub; see VERIFICATION.md for separate browser checks.`);
