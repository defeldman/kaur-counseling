import { chromium } from 'playwright';
import fs from 'fs'; import path from 'path';
const LIVE='https://kaurcounseling.net', GH='https://defeldman.github.io/kaur-counseling';
const routes = JSON.parse(fs.readFileSync(new URL('./routes.json', import.meta.url)));
const which=process.argv[2], vpName=process.argv[3]||'desktop', only=process.argv[4];
const VPS={desktop:{width:1440,height:900},mobile:{width:390,height:844},tablet:{width:768,height:1024}};
const base = which==='live'?LIVE:GH, i = which==='live'?1:2;
const outDir=path.join(process.cwd(),'dom',vpName,which); fs.mkdirSync(outDir,{recursive:true});
const browser=await chromium.launch();
const page=await browser.newPage({viewport:VPS[vpName]});
await page.route('**/*', r=>/google\.com\/maps|googletagmanager|google-analytics/.test(r.request().url())?r.abort():r.continue());
for(const [key,lp,gp] of routes){
  if(only && key!==only) continue;
  try{ await page.goto(base+(i===1?lp:gp),{waitUntil:'networkidle',timeout:60000}); }catch(e){ console.error('FAIL',key); continue; }
  await page.waitForTimeout(2000);
  const h=await page.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<h;y+=500){ await page.evaluate(y=>scrollTo(0,y),y); await page.waitForTimeout(150);}
  await page.evaluate(()=>scrollTo(0,0)); await page.waitForTimeout(1200);
  const data=await page.evaluate(()=>{
    const px=n=>Math.round(n);
    const texts=[];
    const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let n; const seen=new Set();
    while(n=walk.nextNode()){
      const t=n.textContent.replace(/\s+/g,' ').trim(); if(!t) continue;
      const el=n.parentElement; if(!el) continue;
      const r=el.getBoundingClientRect(); if(r.width===0&&r.height===0) continue;
      const cs=getComputedStyle(el);
      if(cs.display==='none'||cs.visibility==='hidden') continue;
      texts.push({t:t.slice(0,90), tag:el.tagName,
        x:px(r.x), y:px(r.y+scrollY), w:px(r.width), h:px(r.height),
        ff:cs.fontFamily.split(',')[0].replace(/["']/g,''), fs:cs.fontSize, fw:cs.fontWeight,
        fst:cs.fontStyle, lh:cs.lineHeight, ls:cs.letterSpacing, tt:cs.textTransform,
        col:cs.color, bg:cs.backgroundColor==='rgba(0, 0, 0, 0)'?null:cs.backgroundColor});
    }
    const imgs=[...document.querySelectorAll('img')].map(el=>{const r=el.getBoundingClientRect();
      return {src:el.currentSrc||el.src, x:px(r.x),y:px(r.y+scrollY),w:px(r.width),h:px(r.height),
        fit:getComputedStyle(el).objectFit, radius:getComputedStyle(el).borderRadius};});
    const svgs=[...document.querySelectorAll('svg')].map(el=>{const r=el.getBoundingClientRect();
      return {vb:el.getAttribute('viewBox'),x:px(r.x),y:px(r.y+scrollY),w:px(r.width),h:px(r.height),
        d:[...el.querySelectorAll('path')].map(p=>(p.getAttribute('d')||'').slice(0,60))};});
    const nav=[...document.querySelectorAll('header a, nav a')].map(a=>({t:a.textContent.replace(/\s+/g,' ').trim(),href:a.getAttribute('href')}));
    const bodyBg=getComputedStyle(document.body).backgroundColor;
    return {title:document.title, bodyBg, nav, texts, imgs, svgs,
      height:document.body.scrollHeight};
  });
  fs.writeFileSync(path.join(outDir,key+'.json'), JSON.stringify(data,null,1));
  console.log(key, data.texts.length, 'texts', data.imgs.length,'imgs');
}
await browser.close();
