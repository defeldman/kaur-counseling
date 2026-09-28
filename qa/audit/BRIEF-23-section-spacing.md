# Fix brief 23 — service-page section spacing + last 14 icon glyphs

Ground truth: `https://kaurcounseling.net/`.

Brief 22 landed well. The 25px footer gap is restored and four routes are now exact
(`modalities`, `get-started`, `privacy` at 0; `cost` +1). Icons went from 29 missing /
19 wrong to **14 missing / 12 wrong**, and `about`, `modalities`, `get-started`, `privacy`
now match live's icon count exactly.

Two problems left.

---

## 1. Service pages gained too much space at each section heading

The 25px was applied globally, but the service pages did not need it — they now overshoot,
and the excess compounds at **every section heading**.

```
live / ours     multiculturalism 2556/2606 (+50)   anxiety 2165/2205 (+40)
                burnout 2194/2224 (+30)            adhd 3748/3773 (+25)
                transitions 2146/2159 (+13)        teens 2590/2603 (+13)
                resources 3360/3322 (-38)          about 3752/3746 (-6)
                home 9887/9883 (-4)
                modalities ✓  get-started ✓  privacy ✓   cost +1
```

On `/services/multiculturalism` the drift accumulates at each heading:

| live y | our y | local change | heading |
|---|---|---|---|
| 718 | 741 | **+23** | Multicultural Therapy |
| 960 | 1001 | **+18** | Acculturation & Assimilation Stress |
| 1470 | 1521 | +10 | Third Culture Kid (TCK) Therapy |
| 1712 | 1781 | **+18** | Intergenerational Trauma Therapy |

**It is not the badge.** I measured the badge row on both sites and it is already correct:
`display:flex`, `align-items:center`, height **48**, badge **48x48** at x=305,
`margin-bottom: 20px`. The row simply *starts* ~23px too low, so the extra space is the
section's own top margin/padding.

Find the rule that adds it and bring each service section's top spacing back to live's.
Per-route drift points are in `qa/audit/spacing-drift.txt`.

One genuine badge difference while you are there: the flex **gap is 18px on ours, 16px on
live** (which is why our `h2` sits at x=371 instead of 369).

### `/about/resources` is 38px short

Alternating ±17px drift through the book list — our poem card and book rows are each a few
px short. See the `resources` section of the spacing report.

---

## 2. The last icon glyphs

`qa/audit/icon-deltas.txt` has the exact pairs. Counts now:

| route | missing | wrong glyph |
|---|---|---|
| burnout | 3 | 3 |
| adhd | 2 | 2 |
| multiculturalism | 2 | 2 |
| transitions | 2 | 2 |
| teens | 2 | 2 |
| anxiety | 1 | 1 |
| home | 4 | — |
| resources | 2 | — |

For the service pages each "missing" pairs with an "extra" at the same spot — we render the
wrong lucide symbol. Known substitutions still outstanding:

- **teens**: live `lucide-backpack`
  (`M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z`) — ours renders a
  padlock (`M6 7V5a6 6 0 0 1 12 0v2`). Live `lucide-users` uses `…H6a4 4 0 0 0-4 4v2`;
  ours has `…H8a4 4 0 0 0-4 4v2`.
- **transitions / teens**: live `lucide-graduation-cap`
  (`M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0`) — ours renders
  `m22 10-10-5-10 5 10 5 10-5Z`.
- **burnout**: live `lucide-hand-heart`
  (`M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16`) — ours has
  `M11 14h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1`.

Still genuinely absent:

- **home** (4): the three 80x80 `viewBox="0 0 64 64"` wheelhouse icons at y=2725 —
  **AD(H)D & Late-Stage Diagnosis** @x=128, **Young Women Coming of Age** @x=740,
  **Transitions** @x=1046 (full paths in `qa/audit/live-icon-inventory.txt`, burgundy,
  `class="w-full h-full"`, every stroke `stroke-width="1.5"`) — plus a 15x15
  `lucide-arrow-right` at @813,4892.
- **resources** (2): decorative feather leaves, 45x56 @233,2421 and 55x64 @175,2864
  (the shared `viewBox="0 0 100 150"` SVG).

---

## Method

`qa/audit/live-icon-inventory.txt` is the source of truth for every icon's paths, size,
position and colour. All lucide icons share `viewBox="0 0 24 24" fill="none"
stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`.

## Scope

- **Do not touch the footer** — verified correct (241px, border `rgb(215,204,188)`, legal
  lines at x=128, row 0 flex/space-between).
- Do not regress `modalities`, `get-started`, `privacy` or `cost`, which are at live's
  height now.

## Verification

`node --check page.js` must pass and all 13 routes must render under
`python3 -m http.server 4173`. Report per-route `scrollHeight` at 1440x900 against:

home 9887 · about 3752 · cost 2447 · resources 3360 · modalities 3433 · get-started 1618 ·
adhd 3748 · multiculturalism 2556 · burnout 2194 · anxiety 2165 · transitions 2146 ·
teens 2590 · privacy 2216

## Deliverable

Commit to `main` and push. Report per section.
