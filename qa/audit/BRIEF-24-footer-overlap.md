# Fix brief 24 — URGENT: footer text is overlapping; plus CTA gaps and icons

Ground truth: `https://kaurcounseling.net/`.

Daniel reports the footer *"does not look good, its smushed together."* He is right and it
is a **visible breakage**: the phone number renders on top of the nav links.

---

## 1. URGENT — footer meta items overflow into the nav

Brief 21 rebuilt row 0 as a flex row (correct) but dropped the width constraints that make
each meta item wrap to two lines. They now render on one line each, so the group is far
wider than its 775px budget and the last item collides with the nav.

Measured on `/privacy` at 1440x900:

| item | live width | live height | ours width | ours height |
|---|---|---|---|---|
| `Sohavani Mand, LMFT` | **150** | **56** (2 lines) | 188 | 28 (1 line) |
| `CA Lic. #150884` | **118** | **32** (2 lines) | 145 | 16 (1 line) |
| `Kaur Counseling, Marriage & Family Therapy, Inc.` | **369** | **32** (2 lines) | 457 | 16 (1 line) |
| `415-930-5395` | **102** | **32** (2 lines) | 125 | 16 (1 line) |

Live x positions: **128 / 290 / 420 / 801**, last item ending at **x=903**.
Ours: 128 / 328 / 485 / **954**, last item ending at **x=1079** — and the nav group starts
at **x=927**, so they overlap on screen.

**Fix:** constrain each of the four meta items to live's width (150 / 118 / 369 / 102) so
each wraps onto two lines exactly as live does. The row container (`x=128 w=775`) and the
nav group (`x=927 w=385`) are already correct — do not change those.

Also restore **font-weight 600** on the `988` and `911` spans in the crisis line; ours
renders them at normal weight.

Everything else about the footer is verified correct — height 241px, border
`rgb(215,204,188)`, three rows with padding `48px` / `0 48px 16px` / `0 48px 40px`, all
lines at x=128. Do not touch those.

## 2. Asset cache-busting versions are inconsistent

`index.html` requests `styles.css?v=12` while every subpage requests `styles.css?v=11`.
Both resolve to the same file, so a visitor can end up holding a stale stylesheet for one
page and a fresh one for another. Daniel reported `/modalities/` appearing **empty** — it
renders correctly server-side (3433px, H1 present, no JS errors, all assets HTTP 200), so a
stale cached asset is the most likely explanation.

Unify every page's `?v=` across `styles.css`, `page.js`, `script.js` and `icons.js`, and
bump them all together so any stale cache is invalidated.

## 3. Service-page spacing — measured targets, not deltas

The previous pass moved this the wrong way (it set the CTA panel gap to 24px when it needed
to grow). Here are **measured live values** to aim at.

Gap between the last text block above the closing burgundy card and the card's top edge:

| route | live | ours | change |
|---|---|---|---|
| multiculturalism | **109** | 72 | +37 |
| burnout | **120** | 73 | +47 |
| anxiety-depression | **362** | 305 | +57 |
| adhd | 77 | 77 | ✓ leave |

Section-heading row y positions (the badge+heading flex row):

| route | live | ours |
|---|---|---|
| multiculturalism | 712, 954, **1222**, **1464**, **1711** | 712, 954, 1196, 1438, 1681 |
| burnout | 652, **998**, **1319** | 652, 972, 1292 |

The first one or two sections are already exact; from the next section on we are **26px
short**. Find the rule that shortens the gap between a section's end and the following
heading row, and restore those 26px — without disturbing the sections that already match.

Resulting heights should be: multiculturalism **2556** (now 2493), burnout **2194** (now
2147), anxiety **2165** (now 2182), adhd **3748** (now 3750).

## 4. Icons — 18 missing, 12 wrong (third attempt)

This has not moved in two passes. `qa/audit/icon-deltas.txt` pairs each missing icon with
the wrong one we render in its place; `qa/audit/live-icon-inventory.txt` has exact paths.

Genuinely absent:
- **home** (4): three 80x80 `viewBox="0 0 64 64"` wheelhouse icons at y=2725 —
  **AD(H)D & Late-Stage Diagnosis** @x=128, **Young Women Coming of Age** @x=740,
  **Transitions** @x=1046 — burgundy, `class="w-full h-full"`, all strokes
  `stroke-width="1.5"`; plus a 15x15 `lucide-arrow-right` @813,4892.
- **resources** (2): feather leaves 45x56 @233,2421 and 55x64 @175,2864.

Wrong glyph (each pairs with an "extra" at the same position):
- **teens**: live `lucide-backpack`
  `M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z`; ours renders a
  padlock `M6 7V5a6 6 0 0 1 12 0v2`.
- **teens/transitions**: live `lucide-graduation-cap`
  `M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0`; ours
  `m22 10-10-5-10 5 10 5 10-5Z`.
- **teens**: live `lucide-users` `M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2` — ours has
  `H8` where live has `H6`.
- **burnout**: live `lucide-hand-heart` `M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16`;
  ours `M11 14h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1`.
- **adhd** (2), **multiculturalism** (2), **anxiety** (1) — same pattern, see the deltas file.

---

## Verification — do this in the browser, not by arithmetic

The last pass reported estimated heights because it could not run page scripts. Use
Playwright (already a dependency) or `curl` + a headless run to get **real**
`document.body.scrollHeight` values. Do not estimate.

`node --check page.js` must pass and all 13 routes must render under
`python3 -m http.server 4173`. Report measured heights against:

home 9887 · about 3752 · cost 2447 · resources 3360 · modalities 3433 · get-started 1618 ·
adhd 3748 · multiculturalism 2556 · burnout 2194 · anxiety 2165 · transitions 2146 ·
teens 2590 · privacy 2216

And confirm the footer: the four meta items each wrap to two lines, the last ends at
**x=903**, and nothing overlaps the nav group at x=927.

## Deliverable

Commit to `main` and push. Report per section with measured numbers.
