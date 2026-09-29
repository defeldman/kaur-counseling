// Usage: node boxdiff.mjs <width> <route> "<text snippet>" [levels]
// For the element containing the text on live and ours, print the ancestor chain with
// box-model values side by side, plus previous-sibling gap. Live shows Tailwind classes.
import { chromium } from 'playwright';
const [,, w='1440', route='', snippet='', lv='7'] = process.argv;
const b=await chromium.launch(); const res={};
for (const [name,base] of [['live','https://kaurcounseling.net/'],['ours','http://localhost:4173/']]){
  const p=await b.newPage({viewport:{width:+w,height:900}});
  await p.goto(base+route,{waitUntil:'networkidle'});
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,50))}});
  await p.waitForTimeout(1000);
  res[name]=await p.evaluate(({snippet,lv})=>{
    const norm=s=>s.replace(/\s+/g,' ').trim().toLowerCase();
    const want=norm(snippet); let hit=null;
    for(const el of document.querySelectorAll('body *')){ if(el.closest('svg'))continue;
      const own=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join(' ');
      if(norm(own).includes(want)||(el.children.length===0&&norm(el.textContent).includes(want))){hit=el;break;} }
    if(!hit) return ['NOT FOUND'];
    const out=[]; let e=hit;
    for(let i=0;i<+lv&&e&&e!==document.body;i++){
      const c=getComputedStyle(e), r=e.getBoundingClientRect();
      const prev=e.previousElementSibling; const gap=prev?Math.round(r.top-prev.getBoundingClientRect().bottom):'';
      const cls=(e.getAttribute('class')||'').slice(0,90);
      out.push(`${i} <${e.tagName.toLowerCase()} ${cls}> y=${Math.round(r.top+scrollY)} h=${Math.round(r.height)} w=${Math.round(r.width)} gapFromPrev=${gap}\n     m=${c.margin} p=${c.padding} lh=${c.lineHeight} fs=${c.fontSize} ${c.display}${c.display.includes('flex')||c.display.includes('grid')?` gap=${c.rowGap}/${c.columnGap}`:''}`);
      e=e.parentElement; }
    return out; },{snippet,lv});
  await p.close();
}
await b.close();
console.log(`### ${route||'home'} @${w}  "${snippet}"`);
for(const n of ['live','ours']){console.log(`-- ${n}`); res[n].forEach(l=>console.log('  '+l));}
