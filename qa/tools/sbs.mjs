import fs from 'fs'; import path from 'path'; import { PNG } from 'pngjs';
// usage: node sbs.mjs <vp> <route> <segHeight> [scale] [startY] [endY]
const [,, vp='desktop', route='home', segH=1200, scale=0.5, startY=0, endYArg] = process.argv;
const S = Number(scale), SEG = Number(segH), SY = Number(startY);
const load = f => PNG.sync.read(fs.readFileSync(f));
const dir = p => path.join(process.cwd(),'shots',vp,p,route+'.png');
const A = load(dir('live')), B = load(dir('gh'));
const endY = endYArg ? Number(endYArg) : Math.max(A.height, B.height);
const outDir = path.join(process.cwd(),'sbs',vp,route); fs.mkdirSync(outDir,{recursive:true});

function crop(src, y, h){ const out = new PNG({width:src.width,height:h});
  for(let r=0;r<h;r++){ const sy=y+r; if(sy>=src.height){ out.data.fill(30, r*src.width*4, (r+1)*src.width*4); continue;}
    src.data.copy(out.data, r*src.width*4, sy*src.width*4, (sy+1)*src.width*4);} return out; }
function scaleDown(src, f){ const w=Math.round(src.width*f), h=Math.round(src.height*f); const out=new PNG({width:w,height:h});
  const inv=1/f; for(let y=0;y<h;y++)for(let x=0;x<w;x++){ let r=0,g=0,b=0,n=0;
    for(let dy=0;dy<inv;dy++)for(let dx=0;dx<inv;dx++){ const sx=Math.min(src.width-1,Math.floor(x*inv+dx)), sy=Math.min(src.height-1,Math.floor(y*inv+dy));
      const i=(sy*src.width+sx)*4; r+=src.data[i];g+=src.data[i+1];b+=src.data[i+2];n++; }
    const o=(y*w+x)*4; out.data[o]=r/n;out.data[o+1]=g/n;out.data[o+2]=b/n;out.data[o+3]=255;} return out; }

const files=[];
let idx=0;
for(let y=SY; y<endY; y+=SEG){
  const h=Math.min(SEG, endY-y);
  const a=scaleDown(crop(A,y,h),S), b=scaleDown(crop(B,y,h),S);
  const gap=14; const W=a.width+gap+b.width, H=Math.max(a.height,b.height);
  const out=new PNG({width:W,height:H}); out.data.fill(255);
  for(let r=0;r<a.height;r++) a.data.copy(out.data,(r*W)*4, r*a.width*4,(r+1)*a.width*4);
  for(let r=0;r<H;r++) for(let c=0;c<gap;c++){const o=(r*W+a.width+c)*4; out.data[o]=255;out.data[o+1]=0;out.data[o+2]=0;out.data[o+3]=255;}
  for(let r=0;r<b.height;r++) b.data.copy(out.data,(r*W+a.width+gap)*4, r*b.width*4,(r+1)*b.width*4);
  const f=path.join(outDir, `seg${String(idx).padStart(2,'0')}_y${y}.png`);
  fs.writeFileSync(f, PNG.sync.write(out)); files.push(f); idx++;
}
console.log(files.join('\n'));
console.log(`live h=${A.height} gh h=${B.height}`);
