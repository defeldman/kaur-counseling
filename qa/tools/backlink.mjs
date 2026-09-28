import { chromium } from 'playwright';
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
await p.route('**/*', r=>/google\.com\/maps/.test(r.request().url())?r.abort():r.continue());
const routes=[['cost','/about/cost','/about/cost/'],['about','/about','/about/'],['resources','/about/resources','/about/resources/'],
 ['modalities','/modalities','/modalities/'],['adhd','/services/adhd','/services/adhd/'],['privacy','/privacy','/privacy/'],
 ['get-started','/get-started','/get-started/']];
for(const [k,lp,gp] of routes){
  const out={};
  for(const [lbl,base,path] of [['live','https://kaurcounseling.net',lp],['ours','https://defeldman.github.io/kaur-counseling',gp]]){
    await p.goto(base+path,{waitUntil:'networkidle',timeout:60000}); await p.waitForTimeout(1500);
    out[lbl]=await p.evaluate(()=>{
      const a=[...document.querySelectorAll('a')].find(x=>/^←?\s*Back to/.test(x.textContent.trim()));
      if(!a) return 'ABSENT';
      const cs=getComputedStyle(a); const bb=a.getBoundingClientRect();
      return `${a.textContent.replace(/\s+/g,' ').trim()} | vis=${cs.display!=='none'&&bb.width>0} x=${Math.round(bb.x)} y=${Math.round(bb.y+scrollY)}`;
    });
  }
  console.log(`${k.padEnd(13)} live: ${String(out.live).padEnd(52)} ours: ${out.ours}`);
}
await b.close();
