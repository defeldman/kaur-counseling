# Fix brief 39 — shared layout differences (header, footer, back link), home tablet, desktop spots

Ground truth: `https://kaurcounseling.net/`. **Commit and push each task separately.** Rules from
briefs 33–38 apply: no per-page values whose only job is to force a total height; measure live's
computed values with Playwright. Gate before every commit: `node --check page.js script.js icons.js`
and `qa/tools/regress.sh http://localhost:4173/` (serve the repo with `python3 -m http.server 4173`).
Nothing may get worse than: styleDeltas 30/82/190, heightErr 591/770/1243 (desktop/tablet/phone).

The fonts now match live exactly (Inter v20 + Fraunces, byte-identical). Every feather matches
live — do **not** touch feather rules (`featherSvg`, `*-leaf`, `*feather*`, `detail-feather-anchor`).

Drift report (committed by the last agent): `qa/audit/spacing-drift-38.txt` — per route × viewport,
every point where our text Y jumps from live (`liveY ourY drift change text`). Regenerate with
`node spacing.mjs <desktop|tablet|mobile> <route> 8` in
`/private/tmp/claude-502/-Users-danielfeldman-software-kaurcounseling-rewrite-kaur-landing/f16b7cbc-e200-4ce4-a75e-db973c6e959b/scratchpad/vdiff`
after regress.sh refreshes `dom/`.

## Task 1 — shared header / footer / back link (affects every route)

- **Tablet header (768px), all 13 routes:** live's header "Get Started" button text is at page
  y=46, ours y=15 (−31). Screenshot both headers at 768 and match live's header layout (height,
  rows, button position, logo/nav arrangement). Don't copy live's own 768px footer-nav overflow bug.
- **Tablet footer, all 13 routes:** "If you are in crisis, call or text" is 40px higher than live
  relative to the footer content above it. Match the footer's vertical spacing at 768.
- **Back link on the 6 service routes:** "Back to Services" is +27px at tablet and −10px at phone
  relative to the header. Match live's spacing above/below it.
One commit.

## Task 2 — home page at tablet and phone

`home @tablet` has sections in a different order/grid from live: "— Rumi" +536, then the
services cards jump −673/−689 ("Transitions", "For teen girls…", "Becoming a parent…"), i.e. the
quote block and the services card grid are laid out differently at 768 (likely a different
column count or order). Screenshot live vs ours at 768 for the About → Services → Quote area and
match it. Then `home @mobile` (+231 total) — work down its drift list. One commit.

## Task 3 — desktop spots (1440)

From `spacing-drift-38.txt` @desktop: cost "Why pay out of pocket?" +45 and footer +53; privacy
footer +48; burnout "Why it's so hard to ask for help" +25 and "Recovery is not a project…" +25;
the same +25-ish steps on adhd, anxiety, teens, multiculturalism; get-started +49. Fix each at its
source (the gap just above the listed text). One commit, bump assets to `?v=21`.

**Do not stop before Task 3 is committed.** Report before/after regress.sh numbers per task.
