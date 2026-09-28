# Fix brief 34 — finish brief 33: real spacing, one viewport per task

Ground truth: `https://kaurcounseling.net/`. Read `qa/audit/BRIEF-33-real-spacing.md` first —
the rules there still apply (no new per-page padding/margin/height values whose only job is
to make the total height match; live is Tailwind so real values are multiples of 4px).

## Where things stand

The working tree has **uncommitted** changes from the previous agent in `styles.css`. Keep them:
- All per-page `.detail-shell` bottom-padding fudges removed (some now empty rules
  `.page-x .detail-shell{}` — delete those empty rules).
- Measured live wrapper padding: 112px regular detail routes, 96px about/privacy, 0 modalities.
- Real fix: the teens checkmark `<ul>` reused the icon class `service-list-check`, which gave
  the list the icon's grid sizing; the CTA now sits after the list.

Height error vs live with this tree (the fudges were hiding it): desktop 672px, tablet 628px,
phone 1260px. Style deltas 30 / 82 / 170.

## Method, every route

`python3 -m http.server 4173 &`, then `qa/tools/regress.sh http://localhost:4173/` for totals.
Per route: `node spacing.mjs <vp> <route> 4` (from the playwright dir
`/private/tmp/claude-502/-Users-danielfeldman-software-kaurcounseling-rewrite-kaur-landing/f16b7cbc-e200-4ce4-a75e-db973c6e959b/scratchpad/vdiff`,
after regress.sh has refreshed `dom/`) shows the first text block where our Y position drifts
from live. Go to that block, measure live's computed margin/padding/line-height/gap for it and
its parents with Playwright, and fix ours. Rerun and move down the page. Check shared rules
first — a single wrong `.detail-section` margin shows up on 10 routes at once.

## Task 1 — desktop 1440 (commit + push when done)
All 13 routes: text Y within ±4px of live, heightErr 0. Also commit the teens CTA fix here.
## Task 2 — tablet 768 (commit + push)
Same target. Don't break desktop.
## Task 3 — phone 390 (commit + push), then bump assets to `?v=17` in the same commit.
Same target. Don't break desktop or tablet.

Before each commit: `node --check page.js script.js icons.js`, regress.sh; styleDeltas must not
exceed 30/82/170 and stuck content must be none. If a route can't reach ±4px with real values,
leave it and list the remainder with its cause in your report. **Do not stop after Task 1 —
continue to Tasks 2 and 3.** Report per task: before/after numbers and each real cause fixed.
