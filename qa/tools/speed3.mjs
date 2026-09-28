import { chromium } from 'playwright';
const b=await chromium.launch();
for(const [lbl,u] of [['LIVE','https://kaurcounseling.net/'],['OURS','https://defeldman.github.io/kaur-counseling/']]){
  const p=await b.newPage({viewport:{width:1440,height:900}});
  await p.route('**/*', r=>/google\.com\/maps/.test(r.request().url())?r.abort():r.continue());
  await p.goto(u,{waitUntil:'networkidle',timeout:60000}); await p.waitForTimeout(2500);
  const h=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<h;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(90);}
  // scroll the ticker into view and keep it there
  await p.evaluate(()=>{
    for(const el of document.querySelectorAll('*')){
      if(/marquee/i.test(getComputedStyle(el).animationName)){ el.scrollIntoView({block:'center'}); break; }
    }
  });
  await p.waitForTimeout(1500);
  const info=await p.evaluate(async()=>{
    let track=null;
    for(const el of document.querySelectorAll('*')){ if(/marquee/i.test(getComputedStyle(el).animationName)){track=el;break;} }
    if(!track) return {none:true};
    const cs=getComputedStyle(track);
    const read=()=>{const t=getComputedStyle(track).transform; if(!t||t==='none')return 0; return new DOMMatrixReadOnly(t).m41;};
    const s=[]; const t0=performance.now();
    for(let i=0;i<14;i++){ s.push([performance.now()-t0, read()]); await new Promise(r=>requestAnimationFrame(()=>setTimeout(r,250))); }
    const vs=[];
    for(let i=1;i<s.length;i++){ const dt=(s[i][0]-s[i-1][0])/1000, dx=s[i][1]-s[i-1][1]; if(dx<0&&dt>0) vs.push(-dx/dt); }
    vs.sort((a,b)=>a-b);
    const half=track.scrollWidth/2;
    return {dur:cs.animationDuration, timing:cs.animationTimingFunction,
      trackW:track.scrollWidth, halfW:Math.round(half),
      theoreticalPxPerSec: Math.round(half/parseFloat(cs.animationDuration)),
      measuredPxPerSec: Math.round(vs[Math.floor(vs.length/2)]||0), n:vs.length};
  });
  console.log(lbl, JSON.stringify(info));
  await p.close();
}
await b.close();
