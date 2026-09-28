# Fix brief 33 — replace faked page heights with real spacing, then phone styles

Ground truth: `https://kaurcounseling.net/`. **Commit and push each task separately**
(Task 1 may be split into one commit per viewport). Regression gate as in brief 32:
`python3 -m http.server 4173 &` from the repo root, then `qa/tools/regress.sh http://localhost:4173/`
before you start and before every commit.

## The problem

Page heights currently match live at every width, but **only because of about 30
per-page `.detail-shell{padding-bottom:…}` overrides** in `styles.css` (lines ~1489–1932,
e.g. `.page-services-adhd .detail-shell{padding-bottom:260px}`,
`.page-services-multiculturalism …306px`, `.page-cost …1px`, `…19.25px`, `…15.25px`).
Each one soaks up whatever height is left over, so content above it sits in the wrong place.
Measured on the deployed site at 768px, the space between the last visible text and the footer:

| route | live | ours |
|---|---|---|
| /about | 147px | 65px |
| /about/resources | 125px | 234px |
| /modalities | 149px | 126px |
| /services/teens | 174px | 14px — and our last visible text is a list item, not the "Get Started" CTA button, so the CTA is missing, hidden or reordered: find out which |
| /services/transitions | 174px | 110px — same CTA question |

Tool: `node qa/tools/gap.mjs` (edit its `routes`/widths list; run it from a directory with
playwright installed, e.g. copy it next to `qa/tools/spacing.mjs`). Also use
`qa/tools/spacing.mjs <vp> <route>` which shows where text positions start drifting from live.

## Task 1 — real spacing (all 13 routes, 1440 / 768 / 390)

1. Delete every per-page `.detail-shell` `padding-bottom` override. Give `.detail-shell`
   (and any other section wrapper) the **same padding live uses** — measure live's computed
   padding/margins with Playwright, don't guess. Live is Tailwind, so real values are
   multiples of 4px (e.g. 64, 80, 96, 112); a value like 19.25px or 306px is a sign of a fudge.
2. Fix the height differences this exposes **where they actually come from**: wrong
   font-size/line-height, wrong gap between cards, wrong margin under a heading, a missing or
   extra element. Use `spacing.mjs` to find the first point where drift starts on each route.
3. Do not add any new per-page padding/margin/height number whose only purpose is to make
   the total height match. If a route cannot be matched exactly with real values, leave the
   small remainder and report it with its cause.
4. Target: for every route and viewport, text positions within ±4px of live
   (`spacing.mjs` with minJump 4 shows nothing), the gap above the footer within ±4px, and
   heightErr 0. **In this task heightErr may temporarily rise** while fudges are removed —
   that is expected — but it must be back to 0 (or explained) before the final commit of
   the task. styleDeltas and stuck content must not get worse.
5. Also check the **cost** and **get-started** routes have no faked values either; check
   `min-height` and `margin-bottom` fudges, not just `padding-bottom`.

## Task 2 — phone style deltas (170 → as low as possible)

See `qa/audit/mobile-style-deltas.txt` (`live->ours`); re-generate with regress.sh. Fix them at
the source; don't break desktop/tablet.

## Report

Before/after regress.sh numbers per task, a list of which fudge values were removed and what
real cause replaced each one, and any remaining differences with their cause. Final commit
bumps assets to `?v=17`.
