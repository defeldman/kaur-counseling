// Dump live's DOM tree (tag + Tailwind classes + short own text) for every route.
import { chromium } from 'playwright'; import fs from 'fs';
const routes={home:'',about:'about/',cost:'about/cost/',resources:'about/resources/',modalities:'modalities/','get-started':'get-started/',adhd:'services/adhd/',multiculturalism:'services/multiculturalism/',burnout:'services/burnout/',anxiety:'services/anxiety-depression/',transitions:'services/transitions/',teens:'services/teens/',privacy:'privacy/'};
const out=process.argv[2]; fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch();
for(const [name,r] of Object.entries(routes)){
  const p=await b.newPage({viewport:{width:1440,height:900}});
  await p.goto('https://kaurcounseling.net/'+r,{waitUntil:'networkidle'});
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,40))}});
  const txt=await p.evaluate(()=>{
    const lines=[];
    const walk=(e,d)=>{ if(e.tagName==='SCRIPT'||e.tagName==='STYLE')return;
      if(e.tagName==='svg'){lines.push('  '.repeat(d)+`<svg ${(e.getAttribute('class')||'')}>`);return;}
      const own=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join(' ').replace(/\s+/g,' ').slice(0,60);
      lines.push('  '.repeat(d)+`<${e.tagName.toLowerCase()}${e.getAttribute('class')?' class="'+e.getAttribute('class')+'"':''}>${own?' '+own:''}`);
      for(const c of e.children) walk(c,d+1); };
    walk(document.querySelector('#root')||document.body,0); return lines.join('\n'); });
  fs.writeFileSync(`${out}/${name}.txt`,txt); console.log(name, txt.split('\n').length,'lines');
  await p.close();
}
await b.close();
