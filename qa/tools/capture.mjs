import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const LIVE = 'https://kaurcounseling.net';
const GH   = 'https://defeldman.github.io/kaur-counseling';
const routes = JSON.parse(fs.readFileSync(new URL('./routes.json', import.meta.url)));

const which = process.argv[2];           // 'live' | 'gh'
const vpName = process.argv[3] || 'desktop';
const only = process.argv[4];            // optional route key filter
const VPS = { desktop: {width:1440,height:900}, mobile: {width:390,height:844}, tablet:{width:768,height:1024} };
const vp = VPS[vpName];
const base = which === 'live' ? LIVE : GH;
const idx = which === 'live' ? 1 : 2;
const outDir = path.join(process.cwd(), 'shots', vpName, which);
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
const page = await ctx.newPage();
// block the maps iframe + analytics for determinism
await page.route('**/*', r => {
  const u = r.request().url();
  if (/google\.com\/maps|googletagmanager|google-analytics|doubleclick|clarity\.ms/.test(u)) return r.abort();
  return r.continue();
});

for (const [key, livePath, ghPath] of routes) {
  if (only && key !== only) continue;
  const url = base + (idx === 1 ? livePath : ghPath);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  } catch (e) { console.error('NAV FAIL', key, String(e).slice(0,80)); continue; }
  await page.waitForTimeout(2500);
  // trigger all scroll reveals: step down the page, then back to top
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += Math.floor(vp.height * 0.6)) {
    await page.evaluate(y => window.scrollTo(0, y), y);
    await page.waitForTimeout(260);
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(900);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1600);
  // freeze animations for a stable frame
  await page.addStyleTag({ content: `*,*::before,*::after{animation-play-state:paused !important; transition:none !important;}` });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, `${key}.png`), fullPage: true });
  const dims = await page.evaluate(() => ({ w: document.documentElement.scrollWidth, h: document.body.scrollHeight }));
  console.log(key, JSON.stringify(dims));
}
await browser.close();
