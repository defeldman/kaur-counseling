import { chromium } from 'playwright';
import fs from 'fs';
const routes=JSON.parse(fs.readFileSync(new URL('./routes.json',import.meta.url)));
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
await p.route('**/*', r=>/google\.com\/maps/.test(r.request().url())?r.abort():r.continue());
const out=['# Live icon markup — VERBATIM. Copy these exactly; do not redraw paths.',''];
for(const [key,lp] of routes){
  await p.goto('https://kaurcounseling.net'+lp,{waitUntil:'networkidle',timeout:60000}); await p.waitForTimeout(1500);
  const h=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<h;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(70);}
  const r=await p.evaluate(()=>{
    const near=el=>{let n=el,k=0;while(n&&k<5){const t=(n.textContent||'').replace(/\s+/g,' ').trim();if(t.length>3)return t.slice(0,60);n=n.parentElement;k++;}return '';};
    return [...document.querySelectorAll('svg')].filter(s=>{const b=s.getBoundingClientRect();return b.width>0&&b.height>0&&s.getAttribute('viewBox')!=='0 0 100 150';})
      .map(s=>{const bb=s.getBoundingClientRect();return {at:`${Math.round(bb.width)}x${Math.round(bb.height)} @${Math.round(bb.x)},${Math.round(bb.y+scrollY)}`,
        near:near(s.parentElement), html:s.outerHTML.replace(/\s+/g,' ')};});
  });
  out.push(`## ${key}`,'');
  r.forEach(s=>out.push(`- ${s.at} — near "${s.near}"`,'  ```html',`  ${s.html}`,'  ```'));
  out.push('');
}
fs.writeFileSync('/Users/danielfeldman/software/kaurcounseling-rewrite/kaur-landing/qa/audit/live-icon-markup.md', out.join('\n'));
await b.close(); console.log('ok');
