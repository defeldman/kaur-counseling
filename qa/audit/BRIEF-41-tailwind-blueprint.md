# Fix brief 41 — build spacing from live's Tailwind classes (the blueprint)

Ground truth: `https://kaurcounseling.net/`. **Commit and push each task separately.**
Gate before every commit: `node --check page.js script.js icons.js` and `qa/tools/regress.sh http://localhost:4173/`
(serve the repo: `python3 -m http.server 4173`). Current: styleDeltas 30/82/190, heightErr 543/768/1081.
Do not touch feather rules — all 49 feathers × 3 widths match live.

## Why this brief is different

Measuring and nudging has not converged. But live is built with Tailwind, so **every spacing and
type value is written in its class names**, including the responsive changes (`sm:` ≥640, `md:` ≥768,
`lg:` ≥1024, `xl:` ≥1280). I dumped live's full element tree with classes for all 13 routes:

**`qa/audit/live-skeleton/<route>.txt`** (home, about, cost, resources, modalities, get-started,
adhd, multiculturalism, burnout, anxiety, transitions, teens, privacy).

Example (cost): `<main class="pt-32 pb-28">` → padding 128px top / 112px bottom;
`<article class="max-w-3xl mx-auto px-6 lg:px-12">` → max-width 768px, 24px side padding, 48px at ≥1024;
back link `mb-12` → 48px below; `<div class="mt-12 space-y-14">` → 48px top, 56px between sections;
h2 `text-2xl mb-4` → 24px/32px, 16px below. Our cost page instead has `detail-shell` padding-top 33px,
main padding-top 91.2px, section padding-bottom 32px, h2 margin 22px — different structure, which is
why nudging never converges.

Tailwind scale: 1 unit = 4px (`mb-4`=16px, `py-2.5`=10px, `space-y-14`=56px). Text: `text-xs` 12/16,
`text-sm` 14/20, `text-base` 16/24, `text-lg` 18/28, `text-xl` 20/28, `text-2xl` 24/32, `text-3xl` 30/36,
`text-4xl` 36/40, `text-5xl` 48/1, `text-6xl` 60/1, `leading-relaxed` 1.625, `leading-snug` 1.375,
`leading-tight` 1.25. `space-y-N` = margin-top N×4 on every child after the first.

Tool: `node qa/tools/boxdiff.mjs <width> <route-path> "<text snippet>" [levels]` (run from the playwright
dir `/private/tmp/claude-502/-Users-danielfeldman-software-kaurcounseling-rewrite-kaur-landing/f16b7cbc-e200-4ce4-a75e-db973c6e959b/scratchpad/vdiff`,
copy it there) prints the ancestor chain of any text on live (with classes) and ours, with
margin/padding/line-height/gap, side by side — use it to confirm each fix.

## Method

For each route: walk live's skeleton top to bottom; for each element, write the matching rule for
our element from its classes (all breakpoints). **Delete our old per-page spacing rules for that
element** (search `styles.css` for the selector — there are many layered overrides from briefs 25–40;
remove them, don't add another layer on top). Values should now be Tailwind values; anything else
needs a reason in your report.

## Task 1 — shared page shell + cost, privacy, get-started (one commit)
Header, `main` (pt/pb), `article` container, back link, and footer from the skeletons (same on all
subpages), then the full cost, privacy and get-started pages.

## Task 2 — the 6 service pages (one commit)
They share one template on live — compare adhd/multiculturalism/burnout/anxiety/transitions/teens
skeletons, implement the shared structure once, per-page differences only where the skeletons differ.

## Task 3 — about, resources, modalities (one commit, bump assets to `?v=23`)

Report per task: regress.sh before/after, and the list of old rules deleted. **Do not stop before
Task 3 is committed; then print the report and exit.** (Home is the next brief.)
