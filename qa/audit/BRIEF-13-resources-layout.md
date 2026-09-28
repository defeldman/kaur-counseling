# Fix brief 13 — resources page layout + remaining vertical spacing

Ground truth: `https://kaurcounseling.net/`. Spacing measurements:
`qa/audit/spacing-drift.txt` (per route, showing where our page drifts away from live's
vertical rhythm).

Style deltas are down to 2 across all 13 routes. What remains is **vertical spacing and two
layout differences**, which the style comparator cannot see. Total height error is 1159px.

---

## 1. Resources — the poem card should be COLLAPSED, with hover to expand

This is the single biggest remaining item (+185px on this route, with ±300px swings).

Live shows **only the first stanza** (5 lines) plus the attribution and a
`HOVER TO READ THE FULL POEM` hint. The rest of the poem is collapsed and reveals **on
hover**. We render the entire poem all the time.

Live card — collapsed box is **x=256, w=928, h=290**:

```html
<figure role="group" aria-label="The Guest House by Rumi — hover or tap to read the full poem"
        class="reveal mt-10 rounded-xl bg-sage/50 border border-spruce/20 px-5 sm:px-8 py-5
               relative overflow-hidden cursor-default transition-all duration-500">
```
- background `rgba(213,222,207,0.5)`, border `1px solid spruce/20`, radius **12px**,
  padding **20px 32px**, `margin-top: 40px`
- two decorative feather SVGs (same shared leaf):
  - top-right: `absolute -right-2 -top-1 w-9 text-spruce/20 rotate-[22deg]` (36px)
  - bottom-left: `absolute -left-1 bottom-0 w-7 text-burgundy/15 -rotate-[18deg]` (28px)
- inner wrapper `relative max-w-md mx-auto text-center` — **centred, max-width 28rem**

Contents:
- eyebrow `A poem to sit with` — `text-[0.6rem] uppercase tracking-[0.3em] text-spruce/80`
  → **9.6px, letter-spacing 2.88px**
- `<h2 class="mt-1.5 font-display text-lg italic text-midnight">The Guest House</h2>`
  → **18px italic**
- first stanza: `mt-3 space-y-0.5 font-display text-sm leading-snug text-midnight/85`
  → **Fraunces 14px / 19.25px, `rgba(23,39,64,0.85)`**, one `<p>` per line, 5 lines:
  "This being human is a guest house." / "Every morning a new arrival." /
  "A joy, a depression, a meanness," / "some momentary awareness comes" /
  "as an unexpected visitor."

**The collapse mechanism** — live uses the CSS-grid `0fr → 1fr` trick:
```html
<div class="grid transition-all duration-500 ease-out grid-rows-[0fr] opacity-0 mt-0">
  <div class="overflow-hidden">
    … remaining stanzas …
  </div>
</div>
```
On hover the outer div goes to `grid-rows-[1fr] opacity-100` with a top margin, over
**500ms ease-out**. Implement the same way so the expansion animates smoothly.

Between stanzas live draws a small divider:
```html
<div class="my-3 flex items-center justify-center gap-2 text-spruce/40">
  <span class="h-px w-8 bg-spruce/30"></span>
  <svg viewBox="0 0 100 150" class="w-3 -rotate-3" …>…</svg>   <!-- the shared leaf, 12px -->
  <span class="h-px w-8 bg-spruce/30"></span>
</div>
```

Remaining stanzas (each its own `space-y-0.5 font-display text-sm leading-snug
text-midnight/85` block, separated by the divider above):
- "Welcome and entertain them all!" / "Even if they're a crowd of sorrows," / "who violently
  sweep your house" / "empty of its furniture," / "still, treat each guest honorably." /
  "He may be clearing you out" / "for some new delight."
- then the remaining stanzas per `qa/audit/live-copy/resources.txt`.

## 2. Resources — book list is a two-column grid with stacked internals

Live: `mt-8 grid sm:grid-cols-2 gap-x-10 gap-y-8` → computed **`404px 404px`**,
**`gap: 32px 40px`** (row-gap 32px, column-gap 40px).

Each book is a cell, **stacked vertically**:
```html
<div class="border-t border-midnight/12 pt-4">
  <h3 class="font-display text-xl text-midnight leading-snug">
    <a href="https://www.amazon.com/s?k=…" target="_blank" rel="noopener noreferrer"
       class="inline-flex items-start gap-1.5 hover:text-burgundy transition-colors duration-300">
      Attached
      <svg … width="13" height="13" class="lucide lucide-external-link mt-1.5 shrink-0 text-midnight/40">…</svg>
    </a>
  </h3>
  … author … description …
</div>
```
- cell: `border-top: 1px solid rgba(23,39,64,0.12)`, `padding-top: 16px`, box **404x128**
- title: **Fraunces 20px**, `leading-snug`, links to an Amazon search, with a **13x13
  `lucide-external-link`** at `text-midnight/40`, `gap: 6px`, hover → burgundy 300ms
- author and description follow **below** the title, not beside it

Ours renders each book as a **single-column row split into three side-by-side columns**
(`grid-template-columns: 1.15fr 1fr 1.35fr`). Replace with the live two-column grid of
stacked cells.

---

## 3. Remaining vertical spacing drift

`qa/audit/spacing-drift.txt` lists, per route, the points where our cumulative offset from
live changes. Work through it. The largest:

**modalities** — `-180px` at the closing CTA (`fits your story?`). The burgundy card you
added in brief 11 is still ~180px shorter than live's. Live's card is **h=364** with
padding **80px 32px** (`px-8 py-14 lg:py-20` — note the `lg:py-20` = 80px, not 56px).
Check that the `lg` padding is actually applying at 1440px.

**adhd** — `+133px` accumulates before "When the diagnosis arrives later" (the first
six-card grid is too tall), and `+42px` more at the `50%+` block. Live's stat card is
**h=276**, padding **56px 32px**.

**about** — `+83px` at "If this feels like the right place to begin" (the CTA card's
`margin-top` — live is `mt-20` = 80px), plus smaller drifts of `+20` to `+39` through the
cards and credentials rows.

**home** — the contact block: `Request an appointment` is `-90px` and `Tue–Sat · 9am–6pm`
`+105px`, i.e. our contact grid's two columns have different internal spacing from live's.

**cost / privacy / multiculturalism / burnout / anxiety / transitions / teens** — each
carries 35–156px of drift; the report shows where.

---

## Scope

- Do not change copy, colours or type sizes — those are at parity and verified.
- Do not touch the nav, footer, ticker, hero images, or the modalities card grid.
- Where this brief and live disagree, follow live and say so.

## Verification

`node --check page.js` must pass and all 13 routes must render under
`python3 -m http.server 4173`. Afterwards each route's `document.body.scrollHeight` at
1440x900 should be within ~20px of live:
home 9887 · about 3752 · cost 2447 · resources 3360 · modalities 3433 · get-started 1618 ·
adhd 3748 · multiculturalism 2556 · burnout 2194 · anxiety 2165 · transitions 2146 ·
teens 2590 · privacy 2216

## Deliverable

Commit to `main` and push. Report per section with the before/after heights you measured.
