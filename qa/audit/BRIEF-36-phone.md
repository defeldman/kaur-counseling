# Fix brief 36 — phone (390px): footer, text wrapping, then per-route spacing

Ground truth: `https://kaurcounseling.net/`. Rules from briefs 33–35 still apply (no per-page
values whose only job is to force the total height; measure live with Playwright).
**Commit and push each task separately.** Gate before every commit: `node --check page.js script.js icons.js`
and `qa/tools/regress.sh http://localhost:4173/` (server: `python3 -m http.server 4173` from repo root).
Desktop and tablet numbers must not get worse.

Current (HEAD 1b5fb2f): heightErr desktop 333 / tablet 653 / **phone 1266**; styleDeltas 30/82/170.
Drift report for every route × viewport: `qa/audit/spacing-drift-35.txt` (regenerate with
`node spacing.mjs mobile <route> 8` from
`/private/tmp/claude-502/-Users-danielfeldman-software-kaurcounseling-rewrite-kaur-landing/f16b7cbc-e200-4ce4-a75e-db973c6e959b/scratchpad/vdiff`).

## Task 1 — phone footer (every route)

At 390px the footer blocks come in a different order/position from live on every route
(from the adhd report, relative to live: "Kaur Counseling, Marriage & Family Therapy, Inc." +51,
"Sohavani Mand, LMFT" −70, "415-930-5395" +86, "CA Lic. #150884" −100, "Privacy & Disclaimer" −20,
crisis line −14). Screenshot live's and our footer at 390px side by side (`qa/tools/sbs.mjs` or
Playwright) and match live's order, stacking, gaps and heights. Do NOT copy live's 768px
footer-nav overflow bug (that is tablet, and a live bug). One commit.

## Task 2 — phone text wrapping (the main height loss)

On phone, many blocks are shorter than live because our text wraps onto fewer lines — e.g.
`/services/adhd` "How we work with it" list items are each ~40px shorter than live
(−34, −44, −40, −44), "A late diagnosis…" section −131, "This fractured trust…" −127;
`/services/multiculturalism` each card −26 to −42. That means the phone font-size, line-height,
letter-spacing or the text box width differs. Measure live's computed font-size/line-height and
content width for those elements at 390px and match. The phone style-delta list
`qa/audit/mobile-style-deltas.txt` (`live->ours`) will show many of these. Fix at shared
rules (these patterns repeat across all 6 service pages). One commit.

## Task 3 — remaining phone per-route jumps

After 1 and 2, regenerate the phone drift and fix the remaining jumps >8px route by route
(largest now: adhd, multiculturalism, burnout, modalities, privacy, transitions). Bump assets to
`?v=18` in this commit.

**Do not stop before Task 3 is committed.** If a jump can't be matched with real values, list it
with its cause. Report per task: before/after regress.sh numbers and causes fixed.
