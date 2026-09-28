# Fix brief 02 — header nav, page titles, marquee ticker, people cards, footer

Ground truth is the LIVE site `https://kaurcounseling.net/`. This repo publishes to
`https://defeldman.github.io/kaur-counseling/`. All measurements below were taken with
headless Chromium at 1440x900, comparing computed styles and bounding boxes element by
element. Machine-generated detail: `qa/audit/desktop-style-deltas.txt`.

This pass is **structure and markup**. A separate pass handles the remaining per-element
color/size touch-ups — do not chase those here.

---

## 1. Header navigation — a whole nav item is missing

Live desktop nav order is:

`Home` · `Cost` · `About ⌄` · `Modalities` · `Contact` · `Services ⌄` · `Get Started`

This repo is missing the top-level **`Cost`** link, and instead has `Cost of Therapy`
buried inside the About dropdown. Because of that every nav item sits ~72px to the right
on live vs here (live `Home` starts at x=617; ours at x=689).

Live's exact structure, verbatim from the live DOM:

- Top-level `Cost` link, `href="/about/cost"` (ours: `about/cost/`), label exactly `Cost`.
  It sits **between `Home` and `About`**, and is a plain link with the same classes as
  `Home` / `Modalities` / `Contact` (including the burgundy underline-on-hover effect).
- The **About dropdown contains only two items**: `What to Expect` (`/about`) and
  `Resources` (`/about/resources`). `Cost of Therapy` must be **removed** from it.
- The Services dropdown is unchanged (6 items).
- Nav item gap on live is `40px` (Tailwind `gap-10`). Ours is currently `39px`.

Apply to **both** the desktop nav and the mobile nav, on **all 13 pages**.

Live dropdown panel spec (for reference, ours is close but verify):
`absolute left-1/2 -translate-x-1/2 top-full pt-3`, panel is
`min-w-56 rounded-xl border border-border bg-cream shadow-lg shadow-midnight/5 py-2`
(Services panel is `min-w-64`), items are `block px-5 py-2 text-sm text-midnight/70`
with hover `text-burgundy` + `bg-spruce/5`, transition 200ms.

### Nav chevron

Live uses the **lucide `chevron-down`** icon:

```html
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round"
     class="lucide lucide-chevron-down transition-transform duration-300">
  <path d="m6 9 6 6 6-6"></path>
</svg>
```

Ours uses `viewBox="0 0 20 20"` with `d="m5 7.5 5 5 5-5"`. Replace with the above
geometry (14x14, stroke-width 2, round caps/joins).

---

## 2. Page `<title>` — wrong on all 13 routes

Live serves the **same** title on every route:

```
Sohavani Mand, LMFT | ADHD & Burnout Therapy for Women in the Mission District, San Francisco
```

Ours uses `Sohavani Mand, LMFT | Kaur Counseling` (and `… | Privacy` on /privacy/).
Set the live string on all 13 pages.

---

## 3. Marquee ticker ("Healing takes its own time, be gentle with yourself")

Two real differences: the **separator glyph** and the **text styling**.

### Separator

Live does **not** use the `⌁` character. It uses an inline **feather/leaf SVG** after each
phrase, verbatim:

```html
<svg viewBox="0 0 100 150" class="w-4 text-cream/55 rotate-[22deg] shrink-0"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M50 16 C26 40 24 88 48 114"></path>
  <path d="M50 16 C74 40 76 88 52 114"></path>
  <path d="M48 114 C46 124 48 134 42 146"></path>
  <path d="M50 20 L49 112"></path>
  <path d="M50 42 L32 50"></path>
  <path d="M50 62 L28 74"></path>
  <path d="M50 82 L32 92"></path>
  <path d="M50 42 L68 50"></path>
  <path d="M50 62 L72 74"></path>
  <path d="M50 82 L68 92"></path>
</svg>
```

That is **16px wide** (`w-4`), cream at **55% opacity**, rotated **22deg**, non-shrinking.
Ours renders a `⌁` in Inter at 21px — remove it entirely and use the SVG.

### Text

Live phrase span: `font-display italic text-sm lg:text-base tracking-wide px-5 whitespace-nowrap`
which at desktop computes to:

- Fraunces, **italic**
- `font-size: 16px`
- **`line-height: 24px`** (ours: `normal`)
- **`letter-spacing: 0.4px`** (`tracking-wide` = 0.025em; ours: `normal`)
- **`padding: 0 20px`** (`px-5`)
- `white-space: nowrap`
- color cream `rgb(241,234,223)`

Net effect: each live item measures **412px** wide and repeats on a **428px** pitch.
Ours measures 352px. After the padding + tracking + SVG are added this should match.

### Animation

Live bar: `overflow-hidden bg-burgundy text-cream py-3` (12px vertical padding).
Inner track: `flex whitespace-nowrap will-change-transform` with
**`animation: 32s linear infinite marquee`**, and the track holds **two identical
`shrink-0` groups** so the loop is seamless. Match the 32s linear timing.

---

## 4. "People we serve" cards — image must stay on the left in every row

Live keeps the portrait **on the left of every card** and only flips the *text alignment*
on alternating rows. Ours moves the image to the right on rows 2 and 4.

Measured (live -> ours):

| row | card | live image x | live text x | our image x | our text x |
|-----|------|--------------|-------------|-------------|------------|
| 1 | Women | 297 | 473 | 297 | 473 |
| 2 | People of Color | **297** | 473 | **999** | 297 |
| 3 | Men | 297 | 473 | 297 | 473 |
| 4 | Teens Coming of Age | **297** | 473 | **999** | 297 |
| 5 | LGBTQ+ | 297 | 473 | 297 | 473 |

So: **image column always first at x=297**; on even rows the heading and body text are
**right-aligned** within their column (they still start at x=473). Do not move the image.

---

## 5. Footer

### 5a. Nothing in the footer top row should wrap

On live every footer field is a single line. Ours wraps five of them, which pushes the
whole footer ~50px taller:

| field | live | ours |
|-------|------|------|
| `Sohavani Mand, LMFT` | one line, **18px / 28px** | **wraps to 2 lines**, 20px / 21.6px |
| `CA Lic. #150884` | one line, 12px / 16px, **burgundy `rgb(88,25,37)`**, x=290 | wraps, 11px / 14.85px, `rgb(106,100,101)`, **uppercased to `CA LIC.`** |
| `Kaur Counseling, Marriage & Family Therapy, Inc.` | one line, 12px / 16px, **`rgba(57,96,71,0.7)`**, x=420 | wraps, 11px / 14.85px, `rgb(123,133,124)` |
| `415-930-5395` | one line, 12px / 16px, x=801, w=102 | wraps, 12px / 16.2px, x=775, w=136 |
| `Privacy & Disclaimer` | one line, x=1243, w=69 | wraps to 2 lines |

Fix the sizes/colors **and** stop the wrapping (give the columns room; `white-space: nowrap`
where appropriate). Remove the `text-transform: uppercase` on the licence line — live is
mixed case `CA Lic. #150884`.

Footer nav links (`Home` `About` `Services` `Contact` `Privacy & Disclaimer`) are already
correct at 14px / 20px `rgba(23,39,64,0.6)` — just stop them wrapping.

### 5b. Legal strip is the wrong width and colour

- Live's bottom legal strip container spans **x=80 to x=1360 (width 1280)**.
  Ours spans x=128 to x=1312 (width 1184). Widen it to match.
- Crisis line (`If you are in crisis, call or text …`): live **`rgba(23,39,64,0.5)`**,
  ours `rgba(23,39,64,0.7)`.
- `988` and `911`: live are `<span>` at **font-weight 600**, colour `rgba(23,39,64,0.7)`.
  Ours are `<strong>` at weight 700.
- Copyright line: live **`rgba(23,39,64,0.4)`** at 12px / 16px. Ours `rgba(23,39,64,0.7)`.

---

## 6. Rumi quote (homepage)

Live uses **straight** double quotes: `"As you live deeper in the heart, the mirror gets
clearer and cleaner."`

Ours uses curly quotes `“ ”`. Change to straight quotes. (The line-break positions already
match; leave those alone.)

---

## Scope and constraints

- Do **not** touch the hero images — already handled in commit `04e3b43`.
- Do **not** chase the remaining small colour/size deltas in
  `qa/audit/desktop-style-deltas.txt`; a later pass owns those.
- Keep all existing responsive behaviour working; re-check the mobile nav after the
  `Cost` link is added.
- Verify locally with `python3 -m http.server 4173`.

## Deliverable

Commit to `main` and push. Report which of the six numbered items you completed.
