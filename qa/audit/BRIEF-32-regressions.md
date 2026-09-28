# Fix brief 32 — regressions, phone heights, tablet styles

Ground truth: `https://kaurcounseling.net/`. **Commit and push each task separately.**

## NEW RULE: the regression gate

Things fixed in earlier briefs keep getting undone by later ones. From now on:

```
python3 -m http.server 4173 &      # from the repo root
qa/tools/regress.sh http://localhost:4173/
```

Run it **before you start** (note the numbers) and **before every commit**. It prints, per
viewport, total style deltas and total height error vs live, plus any content stuck
invisible. **No number may get worse than your starting baseline**, and heights that are 0
must stay 0. Starting baseline right now:

```
desktop: styleDeltas=54  heightErr=0px
tablet:  styleDeltas=147 heightErr=0px
mobile:  styleDeltas=170 heightErr=164px  (home:1 about:2 cost:34 modalities:26 get-started:29 multiculturalism:28 burnout:16 anxiety:2 privacy:26)
```

Per-element detail: `qa/audit/{desktop,tablet,mobile}-style-deltas.txt` (`live->ours`).

## Task 1 — undo the regressions (desktop 54 → as close to 0 as possible)

- **Footer crisis line colour — every route.** Live `rgba(23,39,64,0.5)` at all widths.
  Ours is `0.5` only inside a phone media query (`styles.css` ~line 2073); desktop/tablet
  fall back to `0.7`. Make `0.5` the base rule. (39 of the 54 desktop deltas.)
- **`/services/transitions` and `/services/teens`** — the "Therapy can help you:" /
  "What you get here:" list items are live **navy `rgb(23,39,64)`**; ours are spruce.
- **`/about/resources`** — closing line "Want more? I'm always adding to this list…" is live
  **Fraunces italic 24px / 33px, spruce `rgb(57,96,71)`**; ours has reverted to Inter 16px.
- **`/get-started`**:
  - The intro paragraph has `letter-spacing: 0.55px` — a hack added to force a 4-line wrap.
    Live's letter-spacing is `normal`. **Remove it.** Find the real cause of the wrap
    difference (text box width, padding, or the words) — or leave it at 3 lines if you
    cannot find a real cause; do not fake it.
  - "Virtual sessions…" notice: only **"Virtual sessions are always available,"** and
    **"October 1st"** are burgundy bold; the rest of the sentence is live
    `rgba(23,39,64,0.8)`. Ours makes the whole sentence burgundy.
  - Office paragraph "My office is a calm…": live **16px**, ours 15px.

## Task 2 — phone (390) heights: 164px → 0

`qa/audit/mobile-spacing-drift.txt` shows where each route drifts:
cost +/-34, get-started 29, multiculturalism 28, modalities 26, privacy 26, burnout 16.
Only edit `@media (max-width:767px)` / `(max-width:639px)` rules for this task.

## Task 3 — tablet (768) style deltas: 147 → lower

Heights at 768 are already exact — keep them exact. Work through
`qa/audit/tablet-style-deltas.txt` for font size / line-height / colour differences.
Only edit `@media (min-width:768px) and (max-width:1023px)` rules (or add them).

## Final commit

Bump every asset `?v=` to **16**.

## Deliverable

Report the `regress.sh` output before you started and after each task.
