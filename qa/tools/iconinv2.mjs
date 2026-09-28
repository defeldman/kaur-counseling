import { chromium } from 'playwright';
import fs from 'fs';
const routes=JSON.parse(fs.readFileSync(new URL('./routes.json',import.meta.url)));
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
await p.route('**/*', r=>/google\.com\/maps/.test(r.request().url())?r.abort():r.continue());
const out=[];
for(const [key,lp] of routes){
  await p.goto('https://kaurcounseling.net'+lp,{waitUntil:'networkidle',timeout:60000}); await p.waitForTimeout(1800);
  const h=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<h;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(80);}
  const r=await p.evaluate(()=>{
    const near=el=>{ let n=el,hops=0; while(n&&hops<5){const t=(n.textContent||'').replace(/\s+/g,' ').trim(); if(t.length>3)return t.slice(0,58); n=n.parentElement;hops++;} return ''; };
    const seenLeaf=new Set();
    return [...document.querySelectorAll('svg')].filter(s=>{const b=s.getBoundingClientRect();return b.width>0&&b.height>0;})
      .map(s=>{const bb=s.getBoundingClientRect();const cs=getComputedStyle(s);
        const cls=s.getAttribute('class')||''; const lucide=(cls.match(/lucide-[a-z-]+/)||[])[0];
        const vb=s.getAttribute('viewBox');
        const par=s.parentElement; const ps=par?getComputedStyle(par):null; const pb=par?par.getBoundingClientRect():null;
        const isLeaf = vb==='0 0 100 150';
        let inner=null;
        if(!lucide){ if(isLeaf){ if(!seenLeaf.has('leaf')){seenLeaf.add('leaf'); inner='(the shared feather SVG — see the ticker/CTA card)';} else inner='(shared feather SVG)'; }
          else inner=s.innerHTML.replace(/\s+/g,' ').trim().slice(0,600); }
        return {name:lucide||`custom vb="${vb}"`, size:`${Math.round(bb.width)}x${Math.round(bb.height)}`,
          at:`${Math.round(bb.x)},${Math.round(bb.y+scrollY)}`, color:cs.color, cls:cls.slice(0,78),
          badge: par&&pb&&pb.width<=72&&ps.borderRadius!=='0px'?`${Math.round(pb.width)}x${Math.round(pb.height)} radius=${ps.borderRadius} bg=${ps.backgroundColor}`:null,
          inner, ctx:near(s.parentElement)};});
  });
  out.push(`######## ${key}   (${r.length} icons on live)`);
  r.forEach(s=>{ out.push(`  ${s.name}  ${s.size} @${s.at}  color=${s.color}${s.badge?`\n      badge: ${s.badge}`:''}`);
    out.push(`      class="${s.cls}"`);
    if(s.inner) out.push(`      paths: ${s.inner}`);
    out.push(`      near: "${s.ctx}"`); });
  out.push('');
  console.error('done',key);
}
fs.writeFileSync('/Users/danielfeldman/software/kaurcounseling-rewrite/kaur-landing/qa/audit/live-icon-inventory.txt', out.join('\n'));
await b.close();
