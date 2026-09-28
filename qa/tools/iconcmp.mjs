import fs from 'fs';
const [,, vp='desktop'] = process.argv;
const routes=JSON.parse(fs.readFileSync(new URL('./routes.json',import.meta.url))).map(r=>r[0]);
let tot={missing:0,extra:0,moved:0};
for(const r of routes){
  let L,G; try{ L=JSON.parse(fs.readFileSync(`./dom/${vp}/live/${r}.json`));
                G=JSON.parse(fs.readFileSync(`./dom/${vp}/gh/${r}.json`)); }catch(e){ continue; }
  const real=s=>s.w>0&&s.h>0;
  const sig=s=>(s.d||[]).join('|').slice(0,70);
  const lv=L.svgs.filter(real), gv=G.svgs.filter(real);
  const gUsed=new Set(); const missing=[], moved=[];
  for(const a of lv){
    // match by path signature first, then by size+position
    let j=gv.findIndex((b,i)=>!gUsed.has(i)&&sig(b)===sig(a));
    if(j<0){ missing.push(a); continue; }
    gUsed.add(j); const b=gv[j];
    if(Math.abs(a.x-b.x)>6||Math.abs(a.y-b.y)>8||Math.abs(a.w-b.w)>3||Math.abs(a.h-b.h)>3)
      moved.push([a,b]);
  }
  const extra=gv.filter((_,i)=>!gUsed.has(i));
  if(!missing.length&&!extra.length&&!moved.length) continue;
  console.log(`\n### ${r} @${vp}   live=${lv.length} ours=${gv.length}`);
  if(missing.length){ console.log(`  ICONS ON LIVE, ABSENT FROM OURS (${missing.length}):`);
    missing.slice(0,14).forEach(s=>console.log(`    ${s.w}x${s.h} @${s.x},${s.y}  vb=${s.vb}  d=${(s.d||[])[0]||''}`.slice(0,120))); }
  if(extra.length){ console.log(`  ICONS ON OURS, NOT ON LIVE (${extra.length}):`);
    extra.slice(0,10).forEach(s=>console.log(`    ${s.w}x${s.h} @${s.x},${s.y}  vb=${s.vb}  d=${(s.d||[])[0]||''}`.slice(0,120))); }
  if(moved.length){ console.log(`  MOVED/RESIZED (${moved.length}):`);
    moved.slice(0,8).forEach(([a,b])=>console.log(`    ${a.w}x${a.h}@${a.x},${a.y} -> ${b.w}x${b.h}@${b.x},${b.y}`)); }
  tot.missing+=missing.length; tot.extra+=extra.length; tot.moved+=moved.length;
}
console.log(`\n=== TOTAL @${vp}: missingIcons=${tot.missing} extraIcons=${tot.extra} moved=${tot.moved} ===`);
