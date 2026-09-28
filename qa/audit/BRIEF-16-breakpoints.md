# Fix brief 16 — breakpoint boundaries (tablet 768px)

Ground truth: `https://kaurcounseling.net/`.

Desktop is complete — all 13 routes match live's height exactly at 1440x900. **Tablet is
the worst remaining viewport: 383 style deltas and 5430px of height error at 768px**, worse
than mobile. The cause is a single systematic mistake.

Input: `qa/audit/tablet-style-deltas.txt`.

---

## The root cause: our breakpoints are at the wrong widths

Live is Tailwind, so its breakpoints are **640 / 768 / 1024 / 1280**. Our CSS uses
**560 / 800 / 1100**. At 768px we are therefore still applying *mobile* rules while live has
already switched to its desktop layout.

I measured live directly by stepping the viewport across each boundary:

```
width  desktopNav  hamburger  navPadding
 767     false       true        24px
 768     true        false       24px     <-- nav switches here (Tailwind `md`)
1023     true        false       24px
1024     true        false       48px     <-- gutters widen here (Tailwind `lg`)
```

The most visible consequence: **at 768px live shows the full desktop navigation**
(`Home · Cost · About · Modalities · Contact · Services · Get Started`) while **we show the
hamburger**. Our header at 768px renders only the brand.

That one difference cascades — homepage height at 768px is live **11621** vs ours **14140**
(+2519px), because we are laying every section out in a single mobile column where live
uses its multi-column desktop grids.

## What to change

Re-point the breakpoint boundaries onto Tailwind's:

| ours now | should be | meaning |
|---|---|---|
| `@media (max-width:800px)` — 22 rules | **`max-width:767px`** | mobile |
| `@media (min-width:801px)` — 6 rules | **`min-width:768px`** | desktop layout begins |
| `@media (min-width:801px) and (max-width:1100px)` | **`min-width:768px) and (max-width:1023px`** | |
| `@media (max-width:1100px)` — 2 rules | **`max-width:1023px`** | |
| `@media (min-width:1101px)` — 10 rules | **`min-width:1024px`** | wider gutters etc |
| `@media (min-width:560px) and (max-width:800px)` | **`min-width:640px) and (max-width:767px`** | |
| `@media (max-width:559px)` | **`max-width:639px`** | |

`@media (min-width:768px)`, `(min-width:1024px)`, `(min-width:1280px)` and
`(max-width:1279px)` already exist and are correct — check they do not now conflict with the
re-pointed rules.

Note the gutter change at **1024px**, not 1100: page side padding goes **24px → 48px**.

## After re-pointing, re-measure

Changing the boundaries will fix most of the 5430px by itself, but it will also expose
tablet-specific values that were previously masked. Work through
`qa/audit/tablet-style-deltas.txt` for what remains. Current per-route height error at 768px:

```
home +2519   about +1180   get-started +361   adhd +357   teens +213   modalities +200
cost +142    burnout +135  multiculturalism +124   transitions +83   resources +75
anxiety +25  privacy +16
```

Live's tablet heights to aim at (768x1024):
home 11621 · about (measure) · and the rest per the report header lines.

Also: live's hero images are **fluid** (viewport-relative), scaling continuously rather than
stepping — at 768px the left hero image is 274px wide and the right 446px. Ours renders
269x371 and 438x506, so the widths are close but the **heights** are short (live 451 and 614
vs ours 371 and 506). Check the hero's aspect/height rule at tablet.

---

## Scope and cautions

- **Desktop must not regress.** All 13 routes match live exactly at 1440x900; re-measure
  every one afterwards.
- A mobile typography pass (brief 15) landed just before this one — do not undo it. Its
  rules live in the `max-width` blocks you are re-pointing, so move them carefully rather
  than rewriting them.
- The mobile nav (hamburger/X, `+` affordances, full-width button) is correct — it just
  needs to stop appearing at ≥768px.

## Verification

`node --check page.js` must pass and all 13 routes must render under
`python3 -m http.server 4173`. Then measure **all three** viewports and report:

- **1440x900** — must still be: home 9887 · about 3752 · cost 2447 · resources 3360 ·
  modalities 3433 · get-started 1618 · adhd 3748 · multiculturalism 2556 · burnout 2194 ·
  anxiety 2165 · transitions 2146 · teens 2590 · privacy 2216
- **768x1024** — report before/after against live
- **390x844** — must not regress from brief 15

Also confirm by eye at 768px that the **desktop navigation is visible and the hamburger is
gone**, and at 767px that it is the other way round.

## Deliverable

Commit to `main` and push. Report the three viewport measurement tables.
