import { chromium } from 'playwright';
const routes=['about/','about/resources/','modalities/','get-started/','services/teens/','services/transitions/'];
const b=await chromium.launch();
for (const w of [768]) for (const r of routes){
  const out=[];
  for (const base of ['https://kaurcounseling.net/','https://defeldman.github.io/kaur-counseling/']){
    const p=await b.newPage({viewport:{width:w,height:1024}});
    await p.goto(base+r+(base.includes('github')?'?nc='+Date.now():''),{waitUntil:'networkidle'});
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}});
    await p.waitForTimeout(800);
    out.push(await p.evaluate(()=>{
      const f=document.querySelector('footer'); const ft=f.getBoundingClientRect().top+scrollY;
      let last=0,lastTxt='';
      const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
      while(tw.nextNode()){const n=tw.currentNode; if(!n.textContent.trim()||f.contains(n))continue;
        const el=n.parentElement; const s=getComputedStyle(el); if(s.visibility==='hidden'||+s.opacity===0)continue;
        const rg=document.createRange(); rg.selectNodeContents(n); const rc=rg.getBoundingClientRect(); if(!rc.height)continue;
        const bt=rc.bottom+scrollY; if(bt<ft&&bt>last){last=bt;lastTxt=n.textContent.trim().slice(0,30)}}
      return {gap:Math.round(ft-last),footerTop:Math.round(ft),lastTxt};
    }));
    await p.close();
  }
  console.log(w,r.padEnd(24),'live',JSON.stringify(out[0]),'\n',' '.repeat(28),'ours',JSON.stringify(out[1]));
}
await b.close();
