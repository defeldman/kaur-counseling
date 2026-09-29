import { chromium } from 'playwright';
const [,, port='4175', route='about/cost/'] = process.argv;
const b=await chromium.launch();
for (const w of [1440,768,390]){
  const r={};
  for (const [n,base] of [['live','https://kaurcounseling.net/'],['ours',`http://localhost:${port}/`]]){
    const p=await b.newPage({viewport:{width:w,height:900}});
    await p.goto(base+route,{waitUntil:'networkidle'});
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}});
    await p.waitForTimeout(1200);
    r[n]=await p.evaluate(()=>{const o={H:document.documentElement.scrollHeight,t:{}};
      const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
      while(tw.nextNode()){const n=tw.currentNode,s=n.textContent.trim(); if(s.length<4)continue; const e=n.parentElement; if(e.closest('header,footer,nav'))continue;
        const cs=getComputedStyle(e); if(+cs.opacity===0||cs.visibility==='hidden')continue;
        const rg=document.createRange();rg.selectNodeContents(n);const rc=rg.getBoundingClientRect(); if(!rc.height)continue;
        const k=s.slice(0,40); if(!(k in o.t)) o.t[k]={y:Math.round(rc.top+scrollY),x:Math.round(rc.left),w:Math.round(rc.width),h:Math.round(rc.height),c:cs.color,f:cs.fontSize+'/'+cs.lineHeight+' '+cs.fontFamily.split(',')[0]+' '+cs.fontWeight}}
      return o;});
    await p.screenshot({path:`${process.env.HOME}/Screenshots/kaur-audit/cost-pilot-${n}-${w}.png`,fullPage:true});
    await p.close();
  }
  let bad=[];
  for(const [k,a] of Object.entries(r.live.t)){const o=r.ours.t[k]; if(!o){bad.push(`MISSING "${k}"`);continue;}
    const d=[]; if(Math.abs(a.y-o.y)>4)d.push(`y ${a.y}->${o.y}`); if(Math.abs(a.x-o.x)>4)d.push(`x ${a.x}->${o.x}`); if(Math.abs(a.h-o.h)>4)d.push(`h ${a.h}->${o.h}`); if(Math.abs(a.w-o.w)>4)d.push(`w ${a.w}->${o.w}`); if(a.c!==o.c)d.push(`color ${a.c}->${o.c}`); if(a.f!==o.f)d.push(`font ${a.f}->${o.f}`);
    if(d.length)bad.push(`"${k}": ${d.join(', ')}`);}
  console.log(`\n@${w} height live=${r.live.H} ours=${r.ours.H}  text blocks=${Object.keys(r.live.t).length}  differing=${bad.length}`); bad.slice(0,15).forEach(x=>console.log('   '+x));
}
await b.close();
