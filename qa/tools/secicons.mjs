import { chromium } from 'playwright';
const route=process.argv[2]||'burnout';
const paths={burnout:['/services/burnout','/services/burnout/'],adhd:['/services/adhd','/services/adhd/'],
 teens:['/services/teens','/services/teens/'],transitions:['/services/transitions','/services/transitions/'],
 anxiety:['/services/anxiety-depression','/services/anxiety-depression/'],
 multiculturalism:['/services/multiculturalism','/services/multiculturalism/']};
const b=await chromium.launch();
for(const [lbl,base,pi] of [['LIVE','https://kaurcounseling.net',0],['OURS','https://defeldman.github.io/kaur-counseling',1]]){
  const p=await b.newPage({viewport:{width:1440,height:900}});
  await p.route('**/*', r=>/google\.com\/maps/.test(r.request().url())?r.abort():r.continue());
  await p.goto(base+paths[route][pi],{waitUntil:'networkidle',timeout:60000}); await p.waitForTimeout(2000);
  const h=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<h;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(90);}
  const r=await p.evaluate(()=>[...document.querySelectorAll('h2')].map(hx=>{
    // badge = preceding sibling or a span inside the heading's parent containing an svg
    let badge=hx.previousElementSibling;
    if(!badge||!badge.querySelector||!badge.querySelector('svg')){
      const par=hx.parentElement;
      badge=par?[...par.children].find(c=>c!==hx&&c.querySelector&&c.querySelector('svg')):null;
    }
    const svg=badge?badge.querySelector('svg'):null;
    const bs=badge?getComputedStyle(badge):null; const bb=badge?badge.getBoundingClientRect():null;
    const hs=getComputedStyle(hx);
    return {h2:hx.textContent.replace(/\s+/g,' ').trim().slice(0,40), h2col:hs.color,
      badge: bs?{w:Math.round(bb.width),h:Math.round(bb.height),bg:bs.backgroundColor,col:bs.color,radius:bs.borderRadius}:null,
      icon: svg?(svg.getAttribute('class')||'').match(/lucide-[a-z-]+/)?.[0]||svg.getAttribute('viewBox'):null};
  }));
  console.log(`=== ${lbl} ${route} ===`);
  r.forEach(x=>console.log(`  "${x.h2}"\n     h2col=${x.h2col}  badge=${JSON.stringify(x.badge)}  icon=${x.icon}`));
  await p.close();
}
await b.close();
