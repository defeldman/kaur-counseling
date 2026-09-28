# Fix brief 22 — wrong icon glyphs, 13 still-missing icons, and a site-wide 25px gap

Ground truth: `https://kaurcounseling.net/`.

Brief 21's footer work is **correct and verified** — footer is now exactly 241px, border
`rgb(215,204,188)`, row 0 flex/space-between with a 775px meta group and 385px nav group,
and every legal line at x=128. Leave the footer alone.

Two things remain.

---

## 1. A site-wide 25px gap is missing above the footer

Every route is now ~25px shorter than live, and the loss is at the footer boundary — the
footer itself is the right height, it just starts 25px too high.

```
live / ours     home 9887/9858   about 3752/3721   cost 2447/2423   resources 3360/3297
                modalities 3433/3408   get-started 1618/1593   privacy 2216/2191
                multiculturalism 2556/2581   anxiety 2165/2180   burnout 2194/2199
                transitions 2146/2134   teens 2590/2578        adhd 3748/3748 ✓
```

On `/privacy` live's `<footer>` starts at y=1975; ours at y=1950. Same on `/get-started`
(live 1443, ours 1418). Restore the 25px — it is the space between the last content section
and the footer's top border, not footer padding.

`qa/audit/spacing-drift.txt` has the per-route detail; a few routes carry extra local drift
on top (privacy `-21` at "Licensee identification", `-20` at "Website privacy", `-31` at
"This page provides a general overview…"; get-started `-21` at "Request an appointment",
`+34` at "Office").

## 2. Icons: right count, wrong glyph

The service pages now have the correct **number** of icons, but several are the **wrong
lucide glyph**. Full list in `qa/audit/icon-deltas.txt` — each route's "ABSENT FROM OURS"
and "NOT ON LIVE" entries pair up.

### `/services/burnout` — 2 wrong

| position | live path (correct) | ours (wrong) |
|---|---|---|
| 2nd section badge | `M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16` (`lucide-hand-heart`) | `M11 14h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1` |

(The 1st and 3rd match; the diff tool lists them because their y shifted with §1.)

### `/services/transitions` — 4 wrong

| live | ours |
|---|---|
| `M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16` | `M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M2 12h20` |
| `M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8` | `m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z` |
| `M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0` (`lucide-graduation-cap`) | `m22 10-10-5-10 5 10 5 10-5Z` |

### `/services/teens` — 3 wrong

| live | ours |
|---|---|
| `M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z` (`lucide-backpack`) | `M6 7V5a6 6 0 0 1 12 0v2` |
| `M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0` (`lucide-graduation-cap`) | `m22 10-10-5-10 5 10 5 10-5Z` |
| `M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2` (`lucide-users`) | `M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2` (note `H6` vs `H8`) |

`/services/adhd` (3), `/services/multiculturalism` (2) and
`/services/anxiety-depression` (1) have the same kind of mismatch — see the deltas file.

**Also on transitions/teens the icons are horizontally offset**: live places them at
x=297 / 614 / 932; ours at x=357 / 630 / 902. Match live's positions.

## 3. Thirteen icons are still genuinely absent

### Homepage — 3 wheelhouse icons, 80x80, `viewBox="0 0 64 64"`, burgundy, `class="w-full h-full"`, every stroke `stroke-width="1.5"`

- **AD(H)D & Late-Stage Diagnosis** @x=128,y=2725
  `<path d="M32 10c-3 6 4 9 4 14a9 9 0 1 1-18 0c0-5 4-6 6-10" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="44" r="5"/><path d="M30 44h-6M34 44h6" stroke-linecap="round"/><path d="M14 22c2-2 5-2 7 0M43 18c2-2 5-2 7 0" stroke-linecap="round" stroke-dasharray="2 3"/>`
- **Young Women Coming of Age** @x=740,y=2725
  `<circle cx="32" cy="24" r="9"/><path d="M18 52c0-8 6-14 14-14s14 6 14 14" stroke-linecap="round"/><path d="M44 14c3 1 5 4 5 8M20 14c-3 1-5 4-5 8" stroke-linecap="round" stroke-dasharray="2 3"/>`
- **Transitions** @x=1046,y=2725
  `<path d="M14 48c8-2 12-8 18-8s10 6 18 4" stroke-linecap="round" stroke-dasharray="2 3"/><circle cx="14" cy="48" r="4"/><circle cx="50" cy="44" r="4"/><path d="M32 16v14M32 30l-5-5M32 30l5-5" stroke-linecap="round" stroke-linejoin="round"/>`

Plus a **15x15 `lucide-arrow-right`** at @813,4892.

### Decorative feather leaves (the shared `viewBox="0 0 100 150"` SVG)

| route | size @position |
|---|---|
| about | 32x45 @704,3140 |
| resources | 45x56 @233,2421 · 55x64 @175,2864 |
| modalities | 83x107 @1079,2742 · 70x84 @285,2978 |

---

## Method

`qa/audit/live-icon-inventory.txt` remains the source of truth — it has every icon's exact
paths, size, position, colour, badge and the adjacent text that locates it. Where this
brief and the inventory differ, follow the inventory.

All lucide icons share `viewBox="0 0 24 24" fill="none" stroke="currentColor"
stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`.

## Scope

- **Do not touch the footer** — it is correct.
- Do not change text, colours or type that already match.

## Verification

`node --check page.js` must pass and all 13 routes must render under
`python3 -m http.server 4173`. Report per-route `scrollHeight` at 1440x900 against:

home 9887 · about 3752 · cost 2447 · resources 3360 · modalities 3433 · get-started 1618 ·
adhd 3748 · multiculturalism 2556 · burnout 2194 · anxiety 2165 · transitions 2146 ·
teens 2590 · privacy 2216

## Deliverable

Commit to `main` and push. Report per section.
