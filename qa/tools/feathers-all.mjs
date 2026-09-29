import { chromium } from 'playwright';
const routes=['','about/','about/cost/','about/resources/','modalities/','get-started/','services/adhd/','services/multiculturalism/','services/burnout/','services/anxiety-depression/','services/transitions/','services/teens/','privacy/'];
const b=await chromium.launch();
const vp=process.argv[2]||'1440';
for (const r of routes){
  const rows={};
  for (const [name,base] of [['live','https://kaurcounseling.net/'],['ours','http://localhost:4173/']]){
    const p=await b.newPage({viewport:{width:+vp,height:900}});
    await p.goto(base+r,{waitUntil:'networkidle'});
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}});
    await p.waitForTimeout(1200);
    rows[name]=await p.evaluate(()=>{
      const out=[];
      for(const s of document.querySelectorAll('svg[viewBox="0 0 100 150"], .detail-leaf')){
        const c=getComputedStyle(s), rc=s.getBoundingClientRect(); if(c.display==='none'||!rc.width)continue;
        const m=c.transform.match(/matrix\(([^,]+), ([^,]+)/); const deg=m?Math.round(Math.atan2(+m[2],+m[1])*180/Math.PI):0;
        out.push(`${s.tagName==='svg'?'svg ':'CSS-LEAF'} x=${Math.round(rc.left)} y=${Math.round(rc.top+scrollY)} ${Math.round(rc.width)}x${Math.round(rc.height)} w=${c.width} rot=${deg} ${c.color} op=${c.opacity}`);
      } return out;});
    await p.close();
  }
  console.log(`\n### /${r} @${vp}  live=${rows.live.length} ours=${rows.ours.length}`);
  const n=Math.max(rows.live.length,rows.ours.length);
  for(let i=0;i<n;i++) console.log(' L',rows.live[i]||'-','\n O',rows.ours[i]||'-');
}
await b.close();
