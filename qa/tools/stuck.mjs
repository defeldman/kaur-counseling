import { chromium } from 'playwright';
// Scrolls like a real visitor (wheel), then lists anything still invisible.
const base=process.argv[2]||'https://defeldman.github.io/kaur-counseling/';
const routes=['','about/','about/cost/','about/resources/','modalities/','get-started/','services/adhd/','services/multiculturalism/','services/burnout/','services/anxiety-depression/','services/transitions/','services/teens/','privacy/'];
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
for(const r of routes){
  await p.goto(base+r+'?nc='+Date.now(),{waitUntil:'load'}); await p.waitForTimeout(1500);
  const h=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<h+900;y+=110){ await p.mouse.wheel(0,110); await p.waitForTimeout(40); }
  await p.waitForTimeout(1500);
  const stuck=await p.evaluate(()=>[...document.querySelectorAll('main *, section, article')]
    .filter(e=>{const c=getComputedStyle(e); return parseFloat(c.opacity)<0.05 && e.textContent.trim().length>20 && e.getBoundingClientRect().height>40;})
    .filter((e,i,a)=>!a.some(o=>o!==e&&o.contains(e)))
    .map(e=>`${e.tagName}.${String(e.className).slice(0,30)} "${e.textContent.replace(/\s+/g,' ').trim().slice(0,40)}"`));
  console.log(`${(r||'home').padEnd(28)} stuck-invisible: ${stuck.length}${stuck.length?'\n    '+stuck.slice(0,6).join('\n    '):''}`);
}
await b.close();
