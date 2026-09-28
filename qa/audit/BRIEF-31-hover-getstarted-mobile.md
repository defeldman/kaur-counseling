# Fix brief 31 — hover states, get-started polish, phone (390px) typography

Ground truth: `https://kaurcounseling.net/`. **Commit and push each task separately.**

Verified state: 1440 and 768 heights exact on all 13 routes; header, footer, icons, widths
correct; 0 stuck-invisible content; brief 30 fixed the get-started sectioning.

## Task 1 — hover states

Full diff in `qa/audit/hover-deltas.txt` (live vs ours, hovered with Playwright).
Confirmed differences:

- **Top nav links** (`Home`, `Cost`, `Modalities`, `Contact`): live grows a **1px burgundy
  underline** on hover — an `::after` with `position:absolute; bottom:-4px; left:0;
  height:1px; background: rgb(88,25,37)`, width **0 → 100%**, `transition: all .3s
  cubic-bezier(.4,0,.2,1)`. Text also goes `rgba(23,39,64,.7)` → `rgb(23,39,64)` (ours
  already does this). Ours has no underline.
- **Footer links** (`Home`, `About`, `Services`, `Contact`, `Privacy & Disclaimer`): live
  hover colour is **full navy `rgb(23,39,64)`**. Ours goes **burgundy** — wrong.
- **Buttons, book links, cards**: my tool matched different elements on each site, so
  verify by hand against live — burgundy-card CTA buttons (live: cream bg → spruce bg,
  burgundy text → cream), normal burgundy buttons (live: burgundy → spruce bg), resources
  book title links (live: `hover:text-burgundy`), modality cards (live: border
  `<accent>/20` → `<accent>/40`), door accordion rows (live: label → burgundy).

## Task 2 — get-started polish (desktop 1440)

Brief 30 got the structure right. Remaining:
- Intro "I'm glad you're here…" wraps to **4 lines on live** (breaks "Book a 15-" /
  "minute"), 3 on ours. Same 18px/29.25px and 672px box — find why ours fits more per line
  (letter-spacing? word-spacing? actual text width?) and match.
- The "Request an appointment" card starts ~7px higher on ours and its internal padding is
  tighter (button sits higher). Match live's card top and padding.
- "OFFICE" eyebrow row: on live the heading "A room in the *Mission*." sits clearly below the
  eyebrow+rule row; ours looks cramped against it. Match the gap.
- Address "3150 18th St, Suite 404, San Francisco, CA 94110": live wraps as
  "…San Francisco, CA 94110" / ↗ icon on the next line; ours wraps "…CA" / "94110" with the
  icon at the right. Match live's wrap.
- Keep get-started at **1618** tall.

## Task 3 — phone (390x844) typography and spacing

193 style deltas and 676px of height error remain at 390px. Inputs:
`qa/audit/mobile-style-deltas.txt`, `qa/audit/mobile-spacing-drift.txt`. Worst routes:

```
route         style deltas   height error (px)
home               58            106
adhd               23            120
transitions        10            128
teens              10            103
resources          13             56
```

Re-capture with `node qa/tools/extract.mjs gh mobile` (live captures are current) and
use `cmp.mjs mobile <route> style` / `spacing.mjs mobile <route> 20`. Only edit rules inside
`@media (max-width:767px)` (and `639px` blocks) for this task.

## Do not regress

- 1440 heights: home 9887 · about 3752 · cost 2447 · resources 3360 · modalities 3433 ·
  get-started 1618 · adhd 3748 · multiculturalism 2556 · burnout 2194 · anxiety 2165 ·
  transitions 2146 · teens 2590 · privacy 2216
- 768 heights: home 11621 · about 4091 · cost 2488 · resources 3406 · modalities 3777 ·
  get-started 2056 · adhd 3929 · multiculturalism 2441 · burnout 2139 · anxiety 2146 ·
  transitions 2348 · teens 2820 · privacy 2137
- 390 `scrollWidth` 390 (home 415). `stuck.mjs` → 0.

## Verification — Playwright only, after each task

`node --check page.js script.js icons.js`; the relevant heights; then commit + push that task.
Bump every asset `?v=` to **15** in your final commit.
