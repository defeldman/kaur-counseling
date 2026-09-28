import { chromium } from 'playwright';
const base=process.argv[2], label=process.argv[3];
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
await p.route('**/*', r=>/google\.com\/maps/.test(r.request().url())?r.abort():r.continue());
await p.goto(base,{waitUntil:'networkidle',timeout:60000}); await p.waitForTimeout(2500);
const h=await p.evaluate(()=>document.body.scrollHeight);
for(let y=0;y<h;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(110);}
await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(800);
// targets: first nav link, nav cta, a text-link, a door button
const targets=await p.evaluate(()=>{
  const pick=[];
  const nav=[...document.querySelectorAll('header a')].find(a=>/^Home$/.test(a.textContent.trim()));
  if(nav) pick.push(['nav-link', nav.textContent.trim()]);
  const cta=[...document.querySelectorAll('header a')].find(a=>/Get Started/.test(a.textContent));
  if(cta) pick.push(['nav-cta', cta.textContent.trim()]);
  const tl=[...document.querySelectorAll('a')].find(a=>/Learn more about me/.test(a.textContent));
  if(tl) pick.push(['text-link', 'Learn more about me']);
  return pick;
});
const snap=async(sel,name)=>{
  const st=await p.evaluate(txt=>{
    const el=[...document.querySelectorAll('a')].find(a=>a.textContent.replace(/\s+/g,' ').trim().startsWith(txt));
    if(!el) return null; const cs=getComputedStyle(el);
    const arrow=el.querySelector('svg'); const acs=arrow?getComputedStyle(arrow):null;
    return {color:cs.color,bg:cs.backgroundColor,td:cs.textDecorationLine,
      arrowTf:acs?acs.transform:null};
  }, sel);
  return st;
};
for(const [kind,txt] of targets){
  const before=await snap(txt,kind);
  await p.evaluate(t=>{const el=[...document.querySelectorAll('a')].find(a=>a.textContent.replace(/\s+/g,' ').trim().startsWith(t)); if(el) el.scrollIntoView({block:'center'});}, txt);
  await p.waitForTimeout(300);
  const loc=p.locator(`a:has-text("${txt}")`).first();
  try{ await loc.hover({timeout:5000}); }catch(e){ console.log(kind,'hover fail'); continue; }
  await p.waitForTimeout(600);
  const after=await snap(txt,kind);
  console.log(`\n## ${label} ${kind} "${txt}"`);
  console.log('  rest :',JSON.stringify(before));
  console.log('  hover:',JSON.stringify(after));
}
await b.close();
