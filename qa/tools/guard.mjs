// node guard.mjs <port> <skip-route>  -> prints routes whose height differs from main (4173) by >1px
import { chromium } from 'playwright';
const [,,port,skip,basePort='4173']=process.argv;
const routes=['','about/','about/cost/','about/resources/','modalities/','get-started/','services/adhd/','services/multiculturalism/','services/burnout/','services/anxiety-depression/','services/transitions/','services/teens/','privacy/'].filter(r=>r!==skip);
const b=await chromium.launch(); const bad=[];
for(const w of [1440,768,390]) for(const r of routes){ const h=[];
  for(const p of [basePort,port]){const pg=await b.newPage({viewport:{width:w,height:900}}); await pg.goto(`http://localhost:${p}/${r}`,{waitUntil:'load',timeout:60000}); await pg.waitForTimeout(700); h.push(await pg.evaluate(()=>document.documentElement.scrollHeight)); await pg.close();}
  if(Math.abs(h[0]-h[1])>(r===''?40:1)) bad.push(`${w} ${r||'home'} main=${h[0]} branch=${h[1]}`);}
await b.close(); console.log(bad.length?'GUARD FAIL\n'+bad.join('\n'):'GUARD OK');
