# Fix brief 40 — replace the new fudge values, then tablet and phone drift

Ground truth: `https://kaurcounseling.net/`. **Commit and push each task separately.** Gate before
every commit: `node --check page.js script.js icons.js` and `qa/tools/regress.sh http://localhost:4173/`
(serve the repo with `python3 -m http.server 4173`). Current: styleDeltas 30/82/190,
heightErr 257/764/1107 (desktop/tablet/phone). Do not touch feather rules (all 49 feathers × 3 widths
match live — verified).

## NEW RULE — every value must be traced to live

For every CSS value you add or change, your report must include one row:
`selector | property: our value | live element (its Tailwind classes) | live computed value`.
A value with no live element that computes to it is a fudge and must not be committed. Live is
Tailwind: spacing is almost always a multiple of 4px; a value like 2.2px, 152.8px, 59px or
`position:relative; top:10px` is a warning sign.

## Task 1 — replace the fudges from brief 39 (one commit)

Brief 39 added these; each one forces a number instead of fixing the cause. Remove each, find the
real cause of the gap it was covering (wrong margin/padding on a *different* element, wrong
line-height, missing element), fix that instead, and fill in the table above:
- `.page-cost .detail-shell{padding-bottom:59px}`, `.page-privacy .detail-shell{padding-bottom:48px}`
  (per-page shell padding was removed in brief 33 — the shared value is 112px; what makes cost and
  privacy different on live?)
- `.page-cost .detail-content>.detail-section:nth-of-type(3){padding-bottom:57px}`
- `.page-services-anxiety-depression .service-overlap-card{margin-bottom:2.2px}` and
  `.page-services-anxiety-depression .detail-content{padding-top:17px}`
- `.page-service .back-link{position:relative;top:4px}` (tablet) and `{top:10px}` (phone) — a
  relative nudge moves the link but not the layout; find the real spacing above the back link.
- tablet `.site-header{min-height:152.8px}` / `.footer-top{min-height:192px}` — set the real
  paddings/line-heights of the header/footer contents so the height comes out naturally.
- `.page-services-adhd .detail-content>.detail-section:first-child{padding-bottom:38px}`, and the
  per-route `margin-bottom:24px` / `margin-top:56px/64px` lines — keep only if the table shows live
  has that exact value on the matching element.

## Task 2 — tablet (768) drift, 764px (one commit)

Regenerate drift (`node spacing.mjs tablet <route> 8` in
`/private/tmp/claude-502/-Users-danielfeldman-software-kaurcounseling-rewrite-kaur-landing/f16b7cbc-e200-4ce4-a75e-db973c6e959b/scratchpad/vdiff`
after regress.sh), write `qa/audit/spacing-drift-40.txt`, and fix the largest jumps first — check
first for jumps repeated across many routes (one shared cause).

## Task 3 — phone (390) drift, 1107px (one commit, bump assets to `?v=22`)

Same method for mobile.

**Do not stop before Task 3 is committed, then print your report (with the value table) and exit.**
