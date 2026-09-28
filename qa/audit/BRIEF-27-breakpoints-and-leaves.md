# Fix brief 27 — tablet breakpoints (supersedes brief 16) + oversized leaves

Ground truth: `https://kaurcounseling.net/`.

State after brief 26: desktop (1440) heights match live on all 13 routes, **zero wrong icon
glyphs**, and every route is the correct width at 390px. Tablet is now the worst viewport.

---

## 1. Between 767 and 1024px we show BOTH the desktop nav AND the hamburger

Measured on the homepage (`visible desktop nav` / `visible hamburger` / page height):

| width | live | ours |
|---|---|---|
| 767 | hamburger only · 12622 | nav **+ hamburger** · 13873 |
| 768 | nav only · 11546 | nav **+ hamburger** · 13874 |
| 1023 | nav only · 11298 | nav **+ hamburger** · 10374 |
| 1024 | nav only · 10148 | nav **+ hamburger** · 10374 |

Live's rules (Tailwind):
- **< 768px:** hamburger shown, desktop nav hidden.
- **≥ 768px:** desktop nav shown, hamburger hidden (`md:flex` / `md:hidden`).
- **≥ 1024px:** side gutters widen from **24px to 48px** (`lg:px-12`).

## 2. Root cause: our breakpoints are not live's

Live is Tailwind: **640 / 768 / 1024 / 1280**. Our `styles.css` uses:

```
23  @media (max-width:800px)        → should be max-width:767px
 7  @media (min-width:801px)        → should be min-width:768px
14  @media (min-width:1101px)       → should be min-width:1024px
 3  @media (max-width:1100px)       → should be max-width:1023px
 1  @media (min-width:801px) and (max-width:1100px) → (min-width:768px) and (max-width:1023px)
 1  @media (min-width:560px) and (max-width:800px)  → (min-width:640px) and (max-width:767px)
 1  @media (max-width:559px)        → max-width:639px
```
(note some are written without a space: `@media(min-width:1101px)` — catch those too)

Re-point every one of these onto live's boundaries, then make the hamburger and desktop nav
mutually exclusive exactly as described above.

After re-pointing, fix whatever tablet-specific layout remains so the homepage at
**768x1024 measures 11546** and at **1024 measures 10148**. Use
`qa/tools/cmp.mjs tablet <route> style` and `qa/tools/spacing.mjs tablet <route> 20`
(capture first with `qa/tools/extract.mjs live tablet` and `… gh tablet`) to find the rest.

## 3. Decorative leaves are ~20–25% too big

All present and correctly placed now, just oversized:

| route | leaf | live | ours |
|---|---|---|---|
| about | CTA card leaf | **32x45** @704,3140 | 37x48 @702,3113 |
| modalities | CTA card, top-right | **83x107** @1079,2742 | 103x122 @1059,2742 |
| modalities | CTA card, bottom-left | **70x84** @285,2978 | 95x103 @284,2964 |

Match live's sizes (live classes: about `w-7`; modalities `w-16` and `w-12`).

---

## Scope — do not regress

- Desktop 1440 heights: home 9887 · about 3752 · cost 2447 · resources 3360 ·
  modalities 3433 · get-started 1618 · adhd 3748 · multiculturalism 2556 · burnout 2194 ·
  anxiety 2165 · transitions 2146 · teens 2590 · privacy 2216
- 390px `scrollWidth`: 390 on every route, except home = 415 (matches live).
- Icons: copy-verbatim work from brief 26 is correct. Footer is correct.

## Verification — Playwright, not estimates

1. `node --check page.js` and `node --check icons.js`.
2. At widths **767, 768, 1023, 1024**: report whether desktop nav and hamburger are visible,
   and homepage `scrollHeight`, against the table in §1.
3. All 13 routes' `scrollHeight` at 1440x900 — unchanged.
4. All 13 routes' `scrollWidth` at 390.

## Deliverable

Commit to `main` and push. Report the four checks with numbers.
