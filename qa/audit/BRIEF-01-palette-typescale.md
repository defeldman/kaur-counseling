# Fix brief 01 — global palette tokens + body type scale

Ground truth is the LIVE site `https://kaurcounseling.net/`. This repo is published at
`https://defeldman.github.io/kaur-counseling/`. Every measurement below was taken with
headless Chromium at viewport 1440x900, comparing computed styles element-by-element.

Full machine-generated delta report: `qa/audit/desktop-style-deltas.txt`
(format: `y=<live scroll-y> "<text>"` then `property live->local`).

## Root cause

The live site is Tailwind-based and paints body copy as the **navy token at fractional
opacity over the cream background**. This repo baked those blends into flat hex greys that
are each a few points off, and simultaneously shaved 1px off the common body sizes.

Live palette tokens (exact):

| token    | value              | hex     |
|----------|--------------------|---------|
| midnight/navy | `rgb(23, 39, 64)`  | #172740 |
| burgundy | `rgb(88, 25, 37)`  | #581925 |
| spruce   | `rgb(57, 96, 71)`  | #396047 |
| cream    | `rgb(241, 234, 223)` | #F1EADF |
| purple   | `rgb(108, 50, 133)` | #6C3285 |

## Required changes

### 1. Body-copy color — highest impact (52 occurrences across all routes)

Live paints default body paragraphs `rgba(23, 39, 64, 0.6)`. This repo uses flat
`rgb(98, 101, 107)` (`#62656b`) and a family of near-miss greys. Replace **every** baked
grey that stands in for tinted navy with the real `rgba(23,39,64,<alpha>)` blend.

Observed substitutions to correct (live -> current local):

```
rgba(23, 39, 64, 0.6)  -> rgb(98, 101, 107)   x52   # #62656b, and siblings #5d626b #5f646e
                                                    # #59616b #5d6570 #606873 #5e6570 #626770
rgba(23, 39, 64, 0.7)  -> rgba(23, 39, 64, 0.5)  x26
rgba(23, 39, 64, 0.4)  -> rgba(23, 39, 64, 0.7)  x13
rgb(57, 96, 71)        -> rgb(69, 108, 83)       x9    # spruce drifted lighter
rgba(88, 25, 37, 0.8)  -> rgb(57, 96, 71)        x6    # burgundy/80 replaced by spruce
rgba(23, 39, 64, 0.85) -> rgb(79, 93, 99)        x5
rgba(57, 96, 71, 0.6)  -> rgb(156, 156, 146)     x3
rgba(23, 39, 64, 0.4)  -> rgb(146, 144, 140)     x3
rgba(23, 39, 64, 0.8)  -> rgba(23, 39, 64, 0.75) x2
rgba(57, 96, 71, 0.6)  -> rgb(136, 144, 128)     x1
rgba(23, 39, 64, 0.8)  -> rgb(94, 93, 97)        x1
```

Prefer introducing CSS custom properties (e.g. `--navy-60: rgba(23,39,64,.6)`) and using
them, rather than pasting literals in 50 places.

Leave alone the handful of entries in the report where the *element* is wrong rather than
the color (e.g. `rgb(88,25,37) -> rgb(241,234,223)`); those are separate layout bugs being
handled in another pass. Only change colors where the element is clearly the same one.

### 2. Body type scale — every common size is 1px small

| live size / line-height | current local      | note |
|-------------------------|--------------------|------|
| `16px` / `26px`         | `15px` / `22.5px`  | default body paragraph; live is Tailwind `text-base leading-relaxed` = 16px/1.625 |
| `14px` / `20px`         | `13px` / `19.5px`  | secondary/meta text |
| `12px` / `16px`         | `11px` / `16.5px`  | small print / captions |

Counts across the 13 routes: 16->15 x18, 14->13 x20, 12->11 x25 (plus matching
line-height misses). These come from hardcoded `font-size:15px` / `13px` / `11px` rules
throughout `styles.css`.

Apply the live values. Where the live line-height is `26px` on a `16px` element, that is
`line-height: 1.625`, not `1.5`.

### 3. Specific one-off typography misses on the homepage

- Pronunciation line `Kaur Counseling — "Kaur" is pronounced like "Core"`:
  live is **Inter 12px / 16px, `rgba(57, 96, 71, 0.6)`**.
  Local has it as Fraunces italic 13px/19.5px `#889080`. Selector `.pronunciation`.
- `— Rumi` cite: live **14px / 20px, letter-spacing 2.8px**. Local: 11px/11px, ls 3.08px.
  Selector `.rumi-quote cite`.
- `Welcome` hero label: live line-height **14.4px**; local 12px.
- `Scroll to explore`: live **9.6px / 14.4px, letter-spacing 2.88px**;
  local 10px/15px, ls 2.8px.
- `.text-link` ("Learn more", "Learn more about me", etc.): live line-height **20px**;
  local 16.8px.
- Office address `3150 18th St, Suite 404, San Francisco, CA 94110` in the homepage office
  notice: live color is **burgundy `rgb(88,25,37)`**; local renders it
  `rgba(23,39,64,0.75)`.
- Modality numbers `01` `02` `03` (homepage modalities strip): live **14px / 20px,
  `rgba(23,39,64,0.4)`**; local 13px/normal `rgb(146,144,140)`.
- Contact "What happens next" numbers `01` `02` `03`: live line-height **24.75px**,
  color **`rgba(57,96,71,0.6)`**; local `normal` / `rgb(156,156,146)`.
- Contact step paragraphs: live **16px / 26px**; local 14px/21px.
- Homepage office `virtual-note` ("...but in-person sessions start October 1st"):
  live color `rgba(23,39,64,0.8)`, **no background fill**, `font-weight 600` on the
  emphasised spans. Local uses `rgb(94,93,97)` on `rgba(232,224,212,0.55)` with weight 700.

## Scope and constraints

- Touch **`styles.css` only** unless a change genuinely cannot be made in CSS.
- Do **not** change the header/nav markup, the marquee ticker, the "people we serve"
  section layout, or any page's `<title>`. Those are assigned to other passes.
- Do not restructure layout. This pass is color + type scale only.
- Preserve all existing responsive breakpoints; apply the same 1px corrections inside the
  `@media` blocks where the same baked values appear.
- Verify locally with `python3 -m http.server 4173` before committing.

## Deliverable

Commit to `main` with a clear message and push. The site auto-deploys to GitHub Pages.
