import fs from 'fs';
const [,, vp='desktop', route='home', mode='all'] = process.argv;
const L=JSON.parse(fs.readFileSync(`./dom/${vp}/live/${route}.json`));
const G=JSON.parse(fs.readFileSync(`./dom/${vp}/gh/${route}.json`));
const norm=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,40);
const key=t=>norm(t.t);
const gmap=new Map(); G.texts.forEach((t,i)=>{const k=key(t); if(!gmap.has(k)) gmap.set(k,[]); gmap.get(k).push(t);});
const used=new Set();
const out=[], missing=[];
for(const a of L.texts){
  const k=key(a); const cands=gmap.get(k);
  if(!cands){ missing.push(a); continue; }
  const b=cands.find(c=>!used.has(c)); if(!b){ missing.push(a); continue; } used.add(b);
  const d=[];
  if(a.ff!==b.ff) d.push(`font ${a.ff}->${b.ff}`);
  if(a.fs!==b.fs) d.push(`size ${a.fs}->${b.fs}`);
  if(a.fw!==b.fw) d.push(`weight ${a.fw}->${b.fw}`);
  if(a.fst!==b.fst) d.push(`style ${a.fst}->${b.fst}`);
  if(a.lh!==b.lh) d.push(`lh ${a.lh}->${b.lh}`);
  if(a.ls!==b.ls) d.push(`ls ${a.ls}->${b.ls}`);
  if(a.tt!==b.tt) d.push(`transform ${a.tt}->${b.tt}`);
  if(a.col!==b.col) d.push(`COLOR ${a.col}->${b.col}`);
  if((a.bg||'')!==(b.bg||'')) d.push(`bg ${a.bg}->${b.bg}`);
  if(Math.abs(a.x-b.x)>3) d.push(`x ${a.x}->${b.x} (${b.x-a.x>0?'+':''}${b.x-a.x})`);
  if(Math.abs(a.w-b.w)>4) d.push(`w ${a.w}->${b.w} (${b.w-a.w>0?'+':''}${b.w-a.w})`);
  if(Math.abs(a.y-b.y)>6) d.push(`y ${a.y}->${b.y} (${b.y-a.y>0?'+':''}${b.y-a.y})`);
  if(d.length) out.push({y:a.y, t:a.t.slice(0,55), d});
}
const extra=G.texts.filter(t=>!used.has(t));
console.log(`### ${route} @${vp}  liveH=${L.height} ghH=${G.height} (${G.height-L.height>0?'+':''}${G.height-L.height})`);
if(L.title!==G.title) console.log(`TITLE: "${L.title}" -> "${G.title}"`);
if(missing.length){console.log(`\n-- TEXT ON LIVE, ABSENT/DIFFERENT ON GH (${missing.length}) --`);
  missing.forEach(m=>console.log(`  y=${m.y} [${m.tag}] ${m.t}`));}
if(extra.length){console.log(`\n-- TEXT ON GH, ABSENT/DIFFERENT ON LIVE (${extra.length}) --`);
  extra.forEach(m=>console.log(`  y=${m.y} [${m.tag}] ${m.t}`));}
const styleOnly = mode==='style';
console.log(`\n-- STYLE/GEOMETRY DELTAS (${out.length}) --`);
out.sort((a,b)=>a.y-b.y).forEach(o=>{
  const dd = styleOnly ? o.d.filter(x=>!/^[xyw] /.test(x)) : o.d;
  if(dd.length) console.log(`  y=${o.y} "${o.t}"\n      ${dd.join(' | ')}`);
});
