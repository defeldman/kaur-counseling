import fs from 'fs';
// Reports STRUCTURAL differences cmp.mjs cannot see:
//  - text present on live but absent from ours (and vice versa)
//  - element tag changed for the same text (e.g. LI -> DIV, list -> table)
const [,, vp='desktop'] = process.argv;
const routes=JSON.parse(fs.readFileSync(new URL('./routes.json',import.meta.url))).map(r=>r[0]);
const norm=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
let totalMissing=0, totalExtra=0, totalTag=0;
for(const r of routes){
  let L,G;
  try{ L=JSON.parse(fs.readFileSync(`./dom/${vp}/live/${r}.json`));
       G=JSON.parse(fs.readFileSync(`./dom/${vp}/gh/${r}.json`)); }catch(e){ continue; }
  const gmap=new Map();
  G.texts.forEach(t=>{const k=norm(t.t); if(!gmap.has(k)) gmap.set(k,[]); gmap.get(k).push(t);});
  const lmap=new Map();
  L.texts.forEach(t=>{const k=norm(t.t); if(!lmap.has(k)) lmap.set(k,[]); lmap.get(k).push(t);});
  const missing=[], tagDiff=[];
  for(const [k,arr] of lmap){
    if(!k) continue;
    const g=gmap.get(k);
    if(!g){ missing.push(arr[0]); continue; }
    if(g[0].tag!==arr[0].tag) tagDiff.push([arr[0],g[0]]);
  }
  const extra=[...gmap].filter(([k])=>k&&!lmap.has(k)).map(([,a])=>a[0]);
  if(!missing.length&&!extra.length&&!tagDiff.length) continue;
  console.log(`\n### ${r} @${vp}`);
  if(missing.length){ console.log(`  ON LIVE, ABSENT FROM OURS (${missing.length}):`);
    missing.slice(0,12).forEach(m=>console.log(`    [${m.tag}] y=${m.y} "${m.t.slice(0,60)}"`)); }
  if(extra.length){ console.log(`  ON OURS, NOT ON LIVE (${extra.length}):`);
    extra.slice(0,12).forEach(m=>console.log(`    [${m.tag}] y=${m.y} "${m.t.slice(0,60)}"`)); }
  if(tagDiff.length){ console.log(`  TAG CHANGED (${tagDiff.length}):`);
    tagDiff.slice(0,10).forEach(([a,b])=>console.log(`    ${a.tag}->${b.tag} "${a.t.slice(0,55)}"`)); }
  totalMissing+=missing.length; totalExtra+=extra.length; totalTag+=tagDiff.length;
}
console.log(`\n=== TOTAL @${vp}: missing=${totalMissing} extra=${totalExtra} tagChanged=${totalTag} ===`);
