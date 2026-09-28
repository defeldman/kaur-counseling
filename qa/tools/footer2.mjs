import { chromium } from 'playwright';
const b=await chromium.launch();
for(const [lbl,u] of [['LIVE','https://kaurcounseling.net/privacy'],['OURS','https://defeldman.github.io/kaur-counseling/privacy/']]){
  const p=await b.newPage({viewport:{width:1440,height:900}});
  await p.route('**/*', r=>/google\.com\/maps/.test(r.request().url())?r.abort():r.continue());
  await p.goto(u,{waitUntil:'networkidle',timeout:60000}); await p.waitForTimeout(2000);
  const h=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<h;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(90);}
  const r=await p.evaluate(()=>{
    const f=document.querySelector('footer');
    const out=[];
    [...f.children].forEach((row,ri)=>{
      const cs=getComputedStyle(row);
      out.push(`ROW${ri} ${cs.display} just=${cs.justifyContent} align=${cs.alignItems} gap=${cs.gap} pad=${cs.padding} h=${Math.round(row.getBoundingClientRect().height)}`);
      [...row.children].forEach(c=>{
        const b=c.getBoundingClientRect(); const ccs=getComputedStyle(c);
        out.push(`   ${c.tagName} x=${Math.round(b.x)} w=${Math.round(b.width)} h=${Math.round(b.height)} disp=${ccs.display} gap=${ccs.gap} "${(c.textContent||'').replace(/\s+/g,' ').trim().slice(0,46)}"`);
      });
    });
    return out.join('\n');
  });
  console.log('=====',lbl+'\n'+r+'\n');
  await p.close();
}
await b.close();
