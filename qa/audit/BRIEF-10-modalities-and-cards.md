# Fix brief 10 — modalities card grid, card-label colours, resources book list

Ground truth: `https://kaurcounseling.net/`. Measurements: `qa/audit/desktop-style-deltas.txt`.

Style deltas are down to 78 across all 13 routes and total page-height error is 949px
(from 3149px). This brief covers the largest remaining items.

---

## 1. Modalities framework section — wrong layout (biggest item)

Live renders the five frameworks as a **two-column grid of bordered cards**. We render them
as a **single full-width column** with a horizontal rule, and we put "What it is" and
"When & why I use it" **side by side in two columns inside each entry**. Live stacks those
two blocks vertically *inside* the card.

**Grid:** `display: grid`, `grid-template-columns: 576px 576px` (i.e. `md:grid-cols-2`),
`gap: 32px` (`gap-6 lg:gap-8`). Container starts at x=128.

**Card** (`<article>`), measured 576x583 for card 1:
```
rounded-3xl border p-8 lg:p-10 transition-colors duration-300
border-radius: 24px
padding: 40px
border: 1px solid <accent>/0.2      hover: <accent>/0.4      (transition-colors 300ms)
background: <accent> at 0.035 (burgundy) / 0.04 (spruce, clay)
```

**Card internals, in order:**
1. A header row `flex items-start justify-between mb-6` containing:
   - an icon badge: `w-14 h-14 rounded-2xl bg-<accent>/10 flex items-center justify-center
     text-<accent>` wrapping a `w-7 h-7` svg (`viewBox="0 0 64 64"`, `fill="none"`);
   - the number `<span class="font-display text-sm text-<accent>/50">01</span>`
     (clay uses `/55`).
2. `<h3 class="font-display text-2xl lg:text-3xl text-midnight leading-snug">` —
   computes to **Fraunces 30px / 36px, `rgb(23,39,64)`**.
3. A short rule: `<div class="h-px w-10 my-5 bg-<accent>/40">` — 1px tall, 40px wide,
   20px margin above and below.
4. `<div class="space-y-5">` holding two blocks, each:
   `<span class="text-xs uppercase tracking-[0.22em] text-<accent>/80">What it is</span>`
   then `<p class="mt-2 text-midnight/75 leading-relaxed">…</p>`.
   The eyebrow computes to **12px, uppercase, letter-spacing 2.64px**; the paragraph to
   **16px / 26px `rgba(23,39,64,0.75)`**.

**Accent per card** (`clay` = `rgb(108,50,133)`):

| # | title | accent | eyebrow colour |
|---|---|---|---|
| 01 | Internal Family Systems | burgundy `rgb(88,25,37)` | `burgundy/80` |
| 02 | Dialectical Behavior Therapy | spruce `rgb(57,96,71)` | `spruce` (full) |
| 03 | Cognitive Behavioral Therapy | clay `rgb(108,50,133)` | `clay/85` |
| 04 | Art | burgundy | `burgundy/80` |
| 05 | Attachment | spruce | `spruce` (full) |

Note 02 and 05 use the eyebrow at **full opacity**, not 80%.

**Icons** (all `viewBox="0 0 64 64" fill="none"`, `class="w-7 h-7"`, `stroke="currentColor"`,
`stroke-width="1.5"`):

- **01 IFS** — five circles:
  `<circle cx="32" cy="32" r="11"/><circle cx="16" cy="20" r="6"/><circle cx="48" cy="20" r="6"/><circle cx="20" cy="46" r="6"/><circle cx="44" cy="46" r="6"/>`
- **02 DBT**:
  `<path d="M10 38c6-12 12-12 18 0s12 12 18 0" stroke-linecap="round"/>`
  `<path d="M10 26c6-12 12-12 18 0" stroke-linecap="round" stroke-dasharray="2 3"/>`
  `<circle cx="50" cy="22" r="3"/>`
- **03 CBT**:
  `<path d="M16 24a18 18 0 0 1 32 6" stroke-linecap="round"/>`
  `<path d="M48 40a18 18 0 0 1-32-6" stroke-linecap="round"/>`
  `<path d="M12 22l4 8-8 2" stroke-linecap="round" stroke-linejoin="round"/>`
  `<path d="M52 42l-4-8 8-2" stroke-linecap="round" stroke-linejoin="round"/>`
- **04 Art**:
  `<path d="M24 10c12 0 8 16 18 16 6 0 6 12-6 12-10 0-24-4-24-16 0-6 5-12 12-12Z" stroke-linejoin="round"/>`
  `<circle cx="44" cy="48" r="4"/><circle cx="20" cy="52" r="2.5"/>`
- **05 Attachment**:
  `<path d="M32 48C32 48 14 36 14 24a9 9 0 0 1 18 0 9 9 0 0 1 18 0c0 12-18 24-18 24Z" stroke-linejoin="round"/>`
  `<path d="M20 24a4 4 0 0 1 4-4" stroke-linecap="round"/>`

Cards carry the `reveal` class with a small per-card `transition-delay` (card 1 is `0.04s`).

---

## 2. My brief 09 got two colour rules wrong — correct them

**2a. ADHD card labels are NOT a colour cycle.** Brief 09 §1 told you the service card
labels cycle burgundy → spruce → clay. That is true on `transitions` and `teens`, but on
**`adhd` every card label is burgundy `rgb(88,25,37)`**. We now paint `Work & career` and
`Hyperfocus ↔ overwhelm` spruce and `School & study` / `Sex & intimacy` clay. Make all
adhd card labels burgundy.

**2b. Service `h1` italic.** Brief 09 §5 said italic was over-applied, and you removed it
from `burnout`. But live's `Burnout.` **is** italic — that heading is entirely the
emphasised word. The rule is: italic belongs to the `<em>` portion, and for a heading that
is *only* the emphasised word, the whole heading is italic. Restore italic on
`services/burnout` (`Burnout.`) and check each service `h1` individually against live
rather than applying one blanket rule.

**2c. Modalities "What it is" eyebrow colours are swapped** between the first two cards.
Fixing §1's card order should resolve this — verify after.

---

## 3. Resources — book list

| element | live | ours |
|---|---|---|
| section heading (`Relationships`, `Parenting`, …) | `rgba(88,25,37,0.8)` | `rgba(23,39,64,0.7)` |
| book title (`Attached`, `Hold Me Tight`, …) | **20px / 27.5px, weight 400** | 18px, weight 500, lh normal |
| author (`Amir Levine & Rachel Heller`) | **italic** | normal |
| description | **15.2px / 24.7px** | 14px / 20px |
| intro (`Books I return to and often share…`) | lh **29.25px** | 29.7px |

---

## 4. Small remaining items

**transitions / teens** — the "Therapy can help you:" / "What you get here:" list items
(`Process your emotions`, `A space that's just yours`, …): live **Fraunces 18px / 24.75px**;
ours Inter 16px / 24px. Also the `Therapy can help you:` heading is live spruce
`rgb(57,96,71)`; ours burgundy.

**anxiety-depression**
- `When they show up together` heading: live clay `rgb(108,50,133)`; ours spruce.
- `I'm not here to tell you to "just think positively"…`: live `rgba(23,39,64,0.7)`;
  ours `rgba(23,39,64,0.75)`.
- The bulleted outcomes (`Understand what's happening beneath the surface`, …):
  live **lh 22px, `rgba(23,39,64,0.8)`**; ours 24px, solid `rgb(23,39,64)`.

**get-started** — office address line: live lh **22.75px**, ours 20px.

**privacy** — closing note `This page provides a general overview and is not legal advice…`:
live **14px / 22.75px `rgba(23,39,64,0.5)`**; ours 16px / 26px `rgba(23,39,64,0.7)`.

---

## Scope

- Do not touch the nav, footer, ticker, hero images, CTA cards or the animation work.
- Where the brief and the live page disagree, **follow live** and say so in your report —
  two of my previous instructions were wrong and you should expect more.

## Verification

`node --check page.js` must pass and all 13 routes must render under
`python3 -m http.server 4173`.

## Deliverable

Commit to `main` and push. Report per section, flagging anything where live disagreed
with this brief.
