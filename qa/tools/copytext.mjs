import { chromium } from 'playwright';
import fs from 'fs'; import path from 'path';
const LIVE='https://kaurcounseling.net', GH='https://defeldman.github.io/kaur-counseling';
const routes=JSON.parse(fs.readFileSync(new URL('./routes.json',import.meta.url)));
const which=process.argv[2], only=process.argv[3];
const base=which==='live'?LIVE:GH, i=which==='live'?1:2;
const outDir=path.join(process.cwd(),'copy',which); fs.mkdirSync(outDir,{recursive:true});
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
await p.route('**/*', r=>/google\.com\/maps|googletagmanager|google-analytics/.test(r.request().url())?r.abort():r.continue());
for(const [key,lp,gp] of routes){
  if(only&&key!==only) continue;
  try{ await p.goto(base+(i===1?lp:gp),{waitUntil:'networkidle',timeout:60000}); }catch(e){ console.error('FAIL',key); continue; }
  await p.waitForTimeout(2000);
  const h=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<h;y+=500){ await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(120);}
  await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(800);
  const txt=await p.evaluate(()=>{
    const main=document.querySelector('main')||document.body;
    const out=[]; const seen=new Set();
    const walk=(el,depth)=>{
      for(const c of el.children){
        const cs=getComputedStyle(c);
        if(cs.display==='none'||cs.visibility==='hidden') continue;
        const tag=c.tagName;
        if(/^(H1|H2|H3|H4|P|LI|BLOCKQUOTE|CITE|FIGCAPTION|TD|TH|STRONG|EM|SPAN|A|BUTTON|SMALL|DIV)$/.test(tag)){
          const hasElemChild=[...c.children].some(x=>!/^(BR|EM|STRONG|SPAN|A|I|B|SUP)$/.test(x.tagName));
          if(!hasElemChild){
            let t=c.innerText? c.innerText.replace(/\s+/g,' ').trim() : '';
            if(t && !seen.has(tag+'|'+t)){ seen.add(tag+'|'+t); out.push(`[${tag}] ${t}`); continue; }
          }
        }
        walk(c,depth+1);
      }
    };
    walk(main,0);
    return out.join('\n');
  });
  fs.writeFileSync(path.join(outDir,key+'.txt'), txt);
  console.log(key, txt.split('\n').length,'blocks');
}
await b.close();
