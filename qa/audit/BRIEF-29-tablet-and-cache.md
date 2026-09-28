# Fix brief 29 — bump asset versions, finish tablet layout

Ground truth: `https://kaurcounseling.net/`.

Brief 27 moved every breakpoint onto live's 640/768/1024 and the header is now right at
all widths. Homepage height matches live exactly at 768 (11546) and 1023 (11298).
Brief 28 fixed the invisible modality cards. Tablet height error across 13 routes fell
from 5430px to 1326px.

## 1. Bump every asset version (do this first)

All pages still reference `styles.css?v=13`, `page.js?v=13`, `script.js?v=13`,
`icons.js?v=13` — the same URLs as before briefs 26–28. Anyone who cached them (including
Daniel, who reported `/modalities/` empty) keeps the broken files. Bump **every** asset
reference on **every** page to `?v=14`, consistently.

## 2. Tablet (768x1024) — per-route height error

```
live / ours   get-started 2056/1692 (-364)   multiculturalism 2441/2620 (+179)
              modalities 3777/3624 (-153)     privacy 2137/2256 (+119)
              resources 3406/3315 (-91)       adhd 3929/4016 (+87)
              home 11621/11546 (-75)          teens 2820/2748 (-72)
              cost 2488/2543 (+55)            transitions 2348/2296 (-52)
              burnout 2139/2182 (+43)         about 4091/4072 (-19)
              anxiety 2146/2129 (-17)
```

Inputs: `qa/audit/tablet-spacing-drift.txt` (where each route's vertical rhythm diverges)
and `qa/audit/tablet-style-deltas.txt` (font/colour/size differences at 768).
Work worst-first: **get-started**, **multiculturalism**, **modalities**, **privacy**.

Re-capture with `node qa/tools/extract.mjs gh tablet` then
`node qa/tools/cmp.mjs tablet <route> style` and `node qa/tools/spacing.mjs tablet <route> 20`.

## 3. Homepage at exactly 1024px is 90px short

live 10148 / ours 10058. The `lg` (≥1024) rules — gutters 24→48px etc. — are not all
matching. 1023 is exact, so the difference is entirely in `@media (min-width:1024px)`.

---

## Do not regress

- 1440 heights: home 9887 · about 3752 · cost 2447 · resources 3360 · modalities 3433 ·
  get-started 1618 · adhd 3748 · multiculturalism 2556 · burnout 2194 · anxiety 2165 ·
  transitions 2146 · teens 2590 · privacy 2216
- 390 `scrollWidth`: 390 everywhere, home 415.
- `node qa/tools/stuck.mjs http://localhost:4173/` → 0 stuck on all 13 routes.
- Header: at 767 hamburger only, at ≥768 desktop nav only (currently correct).

## Verification — Playwright only, never estimate

Report: 768 heights for all 13 routes; 1024 home height; the 1440 table; 390 widths;
`stuck.mjs` result; `node --check` on page.js, script.js, icons.js.

Commit to `main` and push.
