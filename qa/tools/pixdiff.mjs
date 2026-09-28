import fs from 'fs'; import path from 'path';
import { PNG } from 'pngjs'; import pixelmatch from 'pixelmatch';
// Whole-page pixel diff. Reports the worst horizontal bands so you know WHERE to look.
const [,, vp='desktop', only] = process.argv;
const routes=JSON.parse(fs.readFileSync(new URL('./routes.json',import.meta.url))).map(r=>r[0]);
const outDir=path.join(process.cwd(),'pixdiff',vp); fs.mkdirSync(outDir,{recursive:true});
let grand=0;
for(const r of routes){
  if(only && r!==only) continue;
  const fa=`shots/${vp}/live/${r}.png`, fb=`shots/${vp}/gh/${r}.png`;
  if(!fs.existsSync(fa)||!fs.existsSync(fb)){ console.log(`${r.padEnd(18)} (no screenshots)`); continue; }
  const A=PNG.sync.read(fs.readFileSync(fa)), B=PNG.sync.read(fs.readFileSync(fb));
  const W=Math.min(A.width,B.width), H=Math.min(A.height,B.height);
  const crop=(src)=>{const o=new PNG({width:W,height:H});
    for(let y=0;y<H;y++) src.data.copy(o.data,y*W*4, y*src.width*4, y*src.width*4+W*4); return o;};
  const a=crop(A), b=crop(B);
  const diff=new PNG({width:W,height:H});
  const n=pixelmatch(a.data,b.data,diff.data,W,H,{threshold:0.12,includeAA:true});
  fs.writeFileSync(path.join(outDir,`${r}.png`), PNG.sync.write(diff));
  // band analysis: 60px rows
  const band=60, bands=[];
  for(let y0=0;y0<H;y0+=band){ let c=0;
    for(let y=y0;y<Math.min(y0+band,H);y++) for(let x=0;x<W;x++){ const i=(y*W+x)*4;
      if(diff.data[i]>200&&diff.data[i+1]<120) c++; }
    bands.push([y0,c]); }
  bands.sort((p,q)=>q[1]-p[1]);
  const pct=(100*n/(W*H)).toFixed(2);
  const hint=bands.slice(0,4).filter(x=>x[1]>400).map(([y,c])=>`y${y}(${c})`).join(' ');
  console.log(`${r.padEnd(18)} diffPx=${String(n).padStart(8)}  ${String(pct).padStart(5)}%  heights ${A.height}/${B.height}   worst: ${hint}`);
  grand+=n;
}
console.log(`\nTOTAL diff pixels @${vp}: ${grand}`);
