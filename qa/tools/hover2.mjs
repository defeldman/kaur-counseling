import { chromium } from 'playwright';
// Hover every interactive element type on a page; record computed style before/after.
const [,, base, label] = process.argv;
const pages=[['home',''],['modalities','modalities'],['about','about'],['resources','about/resources']];
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
await p.route('**/*', r=>/google\.com\/maps/.test(r.request().url())?r.abort():r.continue());
const out={};
for(const [k,path] of pages){
  await p.goto(base+path,{waitUntil:'networkidle',timeout:60000}); await p.waitForTimeout(1500);
  const h=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<h;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60);}
  const targets=await p.evaluate(()=>{
    const want=[['nav link','header a',a=>a.textContent.trim()==='Modalities'],
      ['nav cta','header a',a=>/Get Started/.test(a.textContent)],
      ['text link','main a',a=>/Learn more about me|Explore all the modalities|Browse the reading list/.test(a.textContent)],
      ['door row','button',b=>/Burnout/.test(b.textContent)],
      ['cta button','a',a=>/^Get Started/.test(a.textContent.trim())&&getComputedStyle(a).borderRadius==='9999px'],
      ['modality card','article',()=>true],
      ['book link','main a',a=>/Attached/.test(a.textContent)],
      ['footer link','footer a',a=>a.textContent.trim()==='About']];
    const res=[];
    for(const [name,sel,f] of want){ const el=[...document.querySelectorAll(sel)].find(e=>{const r=e.getBoundingClientRect();let v=true,n=e;while(n){const c=getComputedStyle(n);if(c.visibility==='hidden'||c.display==='none')v=false;n=n.parentElement;}return v&&r.width>0&&f(e);});
      if(el){ el.setAttribute('data-hv',name); res.push(name);} }
    return res;});
  for(const name of targets){
    const snap=()=>p.evaluate(n=>{const e=document.querySelector(`[data-hv="${n}"]`);const c=getComputedStyle(e);
      const s=e.querySelector('svg'),sc=s?getComputedStyle(s):null;
      return {color:c.color,bg:c.backgroundColor,border:c.borderColor,shadow:c.boxShadow,tf:c.transform,td:c.textDecorationLine,
        svgTf:sc?sc.transform:null, after:getComputedStyle(e,'::after').width};},name);
    try{await p.locator(`[data-hv="${name}"]`).scrollIntoViewIfNeeded({timeout:4000});}catch(e){out[`${k}: ${name}`]='(not reachable)';continue;} await p.mouse.move(0,0); await p.waitForTimeout(400);
    const a=await snap(); try{await p.locator(`[data-hv="${name}"]`).hover({timeout:4000});}catch(e){out[`${k}: ${name}`]='(hover failed)';continue;} await p.waitForTimeout(700); const bb=await snap();
    const diff={}; for(const k of Object.keys(a)) if(a[k]!==bb[k]) diff[k]=`${a[k]} -> ${bb[k]}`;
    out[`${k}: ${name}`]=Object.keys(diff).length?diff:'(no change)';
  }
}
console.log(JSON.stringify(out,null,1));
await b.close();
