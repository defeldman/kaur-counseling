import fs from 'fs';
const [,, vp='desktop', route='home', minJump='12'] = process.argv;
const L=JSON.parse(fs.readFileSync(`./dom/${vp}/live/${route}.json`));
const G=JSON.parse(fs.readFileSync(`./dom/${vp}/gh/${route}.json`));
const norm=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,40);
const gmap=new Map(); G.texts.forEach(t=>{const k=norm(t.t); if(!gmap.has(k)) gmap.set(k,[]); gmap.get(k).push(t);});
const used=new Set(); const pairs=[];
for(const a of L.texts){
  const c=gmap.get(norm(a.t)); if(!c) continue;
  const b=c.find(x=>!used.has(x)); if(!b) continue; used.add(b);
  pairs.push({t:a.t.slice(0,52), ly:a.y, gy:b.y, d:b.y-a.y});
}
pairs.sort((x,y)=>x.ly-y.ly);
console.log(`### ${route} @${vp}  liveH=${L.height} ghH=${G.height} (${G.height-L.height>0?'+':''}${G.height-L.height})`);
console.log(`matched ${pairs.length} blocks; showing points where cumulative drift changes by >${minJump}px\n`);
let prev=0;
console.log(' liveY   ourY   drift   change  text');
for(const p of pairs){
  const ch=p.d-prev;
  if(Math.abs(ch)>=Number(minJump)){
    console.log(`${String(p.ly).padStart(6)} ${String(p.gy).padStart(6)} ${String(p.d).padStart(7)} ${String(ch>0?'+'+ch:ch).padStart(8)}  ${p.t}`);
    prev=p.d;
  }
}
console.log(`\nfinal drift at last matched block: ${pairs.length?pairs[pairs.length-1].d:'n/a'}px`);
