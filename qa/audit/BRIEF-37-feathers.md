# Fix brief 37 — feather drawings (user-reported)

Daniel: "in many pages that feather drawing looks wrong — find all those feather drawings and
replace them." Ground truth: `https://kaurcounseling.net/`.

## Cause (already found)

`page.js:32` defines `const leaf = '<span class="detail-leaf" …>'` — a leaf **drawn with CSS
borders/pseudo-elements** (`.detail-leaf` in `styles.css`, 8 rules). It is inserted into the hero
of every page rendered by `page.js` (line ~331). Live has **no such element**. Live's feathers are
all the same SVG, which we already have as `featherSvg()` (paths identical to live, verified).

Inventory of every feather, live vs ours, per route: `qa/audit/feathers-1440.txt`,
`qa/audit/feathers-390.txt` (`L` = live, `O` = ours; x/y page position, rendered box, CSS width,
rotation, colour, opacity). Regenerate with `qa/tools/feathers-all.mjs <width>` (needs playwright;
run from the vdiff scratchpad dir, with `python3 -m http.server 4173` serving the repo).

## Task 1 — remove the CSS leaf everywhere (one commit)

Delete the `leaf` constant, its use in the hero template, and every `.detail-leaf` rule. Then on
each route put back exactly what live has in the hero:
- `/about` — one feather above the "Starting out" eyebrow: live classes
  `mx-auto w-6 text-burgundy/40 mb-5 -rotate-6` → 24px wide (36px tall), colour
  `rgba(88,25,37,.4)`, rotate −6°, margin-bottom 20px, centred, **at all widths** (ours is
  missing it at 390px).
- `/services/*` (6 routes), `/privacy`, `/about/resources` — live has **no** extra hero leaf; the
  existing SVG hero feathers there already match. Just remove the CSS leaf.

## Task 2 — `/modalities` hero feathers (one commit)

Live has three small hero feathers (all `absolute`), ours has one big one:
- `top-8 right-16 w-12 text-burgundy/25 rotate-[28deg]` — 48px, rgba(88,25,37,.25), 28°
- `top-32 right-40 w-8 text-spruce/25 -rotate-[18deg]` — 32px, rgba(57,96,71,.25), −18°
- `top-56 right-6 w-10 text-burgundy/20 rotate-[44deg]` — 40px, rgba(88,25,37,.2), 44°
Find the positioned parent on live (Playwright) so top/right resolve against the same box. Match at
1440, 768 and 390.

## Done when

`feathers-all.mjs` at 1440, 768 and 390 shows the same count per route and every `O` row within
±4px position and identical size/rotation/colour of its `L` row. Screenshot-compare the /about and
/modalities heroes. `node --check page.js`. Commit each task separately on your branch and push
the branch (`git push -u origin HEAD`). Do not bump asset versions (the main branch will).
