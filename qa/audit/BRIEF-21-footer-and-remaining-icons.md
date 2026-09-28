# Fix brief 21 — footer structure + the last 30 icons + adhd geometry

Ground truth: `https://kaurcounseling.net/`.

Brief 20 restored 61 of the 91 missing icons. All six service pages now match live's icon
count exactly, and Daniel's burnout report is fixed (`wind` / `hand-heart` / `sprout` badges
in the right colours). Whole-page pixel diff dropped from 4.19M to 3.07M differing pixels.

Remaining inputs: `qa/audit/live-icon-inventory.txt`, `qa/audit/icon-deltas.txt`.

---

## 1. Footer — reported by Daniel: *"spacing is better and alignment is better on kaurcounseling"*

Live footer height **241px**; ours **266px**. Three distinct problems.

### 1a. The legal text juts 48px too far left

| | live | ours |
|---|---|---|
| `If you are in crisis, call or text …` | x=**128** | x=**80** |
| `© 2026 Sohavani Mand, LMFT …` | x=**128** | x=**80** |
| brand row above | x=128 | x=128 |

On live every footer line shares the x=128 left edge. Ours breaks it.

**This is my error to correct:** an earlier brief told you the legal strip is
`x=80, w=1280`. That was the *container box* — live's container carries `padding: 0 48px`,
so its **content** starts at x=128. Keep the container at x=80/w=1280 and inset the text by
the 48px padding.

### 1b. Row 0 should be flex `space-between`, not a fixed grid

Live:
```
ROW0  display:flex  justify-content:space-between  align-items:center  gap:24px  padding:48px  h=152
   DIV x=128 w=775 h=56   display:flex gap:12px   ← brand + licence + business + phone, ONE group
   DIV x=927 w=385 h=40   display:flex gap:32px   ← Home About Services Contact Privacy & Disclaimer
```
Ours:
```
ROW0  display:grid  grid-template-columns:150px 130px 381px 114px 409px  gap:0  padding:0  h=56
   five separate children at x=128 / 278 / 408 / 789 / 927
```
The fixed columns are why the separators land at the wrong intervals — live's four meta
items sit inside a single 775px flex group (they fall at roughly x=302 / 434 / 815).

Rebuild row 0 as a flex row, `justify-content: space-between`, `align-items: center`,
`gap: 24px`, `padding: 48px`, with exactly **two** children: a meta group
(`display:flex; gap:12px`) and a nav group (`display:flex; gap:32px`).

### 1c. Live uses three rows; we use two

```
live  ROW0 padding:48px         h=152
      ROW1 padding:0 48px 16px  h=32   (crisis line)
      ROW2 padding:0 48px 40px  h=56   (copyright line)
                                ----
                                241px

ours  .site-footer padding:49px 0 68px
      .footer-top     padding:0            h=56
      .footer-bottom  margin-top:47px      h=45   (both legal lines in one block)
                                           ----
                                           266px
```
Split the legal block into two rows with live's padding, and move the vertical padding onto
the rows rather than onto `.site-footer`. Row 0's own 48px padding is what makes live's top
row 152px tall instead of our 56px.

### 1d. Border colour

`footer` border-top: live **`rgb(215,204,188)`**, ours `rgba(24,36,58,0.11)`.

**Do not change** the meta-column wrapping, uppercase, or `letter-spacing: 2.4px` — those
already match live and an earlier brief of mine wrongly told you to remove them.

---

## 2. The last 30 icons

### 2a. Homepage "wheelhouse" section icons (3 missing, 80x80, `viewBox="0 0 64 64"`, burgundy, `class="w-full h-full"`, all strokes `stroke-width="1.5"`)

At y=2725 — one per wheelhouse card. Full paths are in the inventory; they are:

- **AD(H)D & Late-Stage Diagnosis** @x=128
  `<path d="M32 10c-3 6 4 9 4 14a9 9 0 1 1-18 0c0-5 4-6 6-10" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="44" r="5"/><path d="M30 44h-6M34 44h6" stroke-linecap="round"/><path d="M14 22c2-2 5-2 7 0M43 18c2-2 5-2 7 0" stroke-linecap="round" stroke-dasharray="2 3"/>`
- **Young Women Coming of Age** @x=740
  `<circle cx="32" cy="24" r="9"/><path d="M18 52c0-8 6-14 14-14s14 6 14 14" stroke-linecap="round"/><path d="M44 14c3 1 5 4 5 8M20 14c-3 1-5 4-5 8" stroke-linecap="round" stroke-dasharray="2 3"/>`
- **Transitions** @x=1046
  `<path d="M14 48c8-2 12-8 18-8s10 6 18 4" stroke-linecap="round" stroke-dasharray="2 3"/><circle cx="14" cy="48" r="4"/><circle cx="50" cy="44" r="4"/><path d="M32 16v14M32 30l-5-5M32 30l5-5" stroke-linecap="round" stroke-linejoin="round"/>`

(The **Multicultural & Cross-Cultural Therapy** icon @x=434 already exists — verify it.)

Also missing on home: a **15x15 `lucide-arrow-right`** at y=4892, and a **124x161 feather**
at @1290,6709.

### 2b. Decorative feather leaves still missing

Same shared `viewBox="0 0 100 150"` SVG; sizes and positions from the inventory:

| route | size @position |
|---|---|
| about | 32x45 @704,3140 |
| resources | 45x56 @233,2421 · 55x64 @175,2864 |
| modalities | 83x107 @1079,2742 · 70x84 @285,2978 |

### 2c. `/services/anxiety-depression` — wrong icon

The Depression heading badge uses the wrong glyph:

| | path |
|---|---|
| live | `M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242` (`lucide-cloud-rain`) |
| ours | `M20 16.2A4.5 4.5 0 0 0 18 7.5h-1.3A6 6 0 1 0 5 14.8` |

There is also an extra empty-path `<svg>` at @330,1151 on our page — remove it.

### 2d. Service-page section badges are 44x44; live is 48x48

On `burnout`, `multiculturalism` and the others using transparent badges, live's badge is
**48x48** with `border-radius: 16px`. Ours renders 44x44. (`anxiety-depression` genuinely
uses 44x44 on live — leave that one.)

---

## 3. `/services/adhd` geometry

Height is now 3920 against live's **3748** (+172), and the content column is wrong:

| element | live | ours |
|---|---|---|
| body paragraph "The picture most people carry…" | x=**256**, w=**672** | x=320, w=800 |
| card label "Relationships" | x=**277**, w=**254** | x=348, w=199 |
| lede "An ADHD diagnosis arriving later…" | w=**672** | w=700 |

Our column is indented 64px and 128px too wide, and the card grid is inset and narrow.

---

## Scope

- Re-measure every route afterwards. Current heights vs live:
  home 9887/9887 ✓ · about 3752/3743 · cost 2447/2448 · resources 3360/3322 ·
  modalities 3433/3433 ✓ · get-started 1618/1618 ✓ · adhd 3748/3920 ·
  multiculturalism 2556/2586 · burnout 2194/2212 · anxiety 2165/2205 ·
  transitions 2146/2159 · teens 2590/2603 · privacy 2216/2216 ✓

## Verification

`node --check page.js` must pass and all 13 routes must render under
`python3 -m http.server 4173`. Report the per-route heights and the footer measurements
(height 241, every line at x=128, row 0 flex with a 775px meta group and 385px nav group).

## Deliverable

Commit to `main` and push. Report per section.
