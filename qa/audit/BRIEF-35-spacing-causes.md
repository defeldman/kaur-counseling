# Fix brief 35 — spacing, with the causes already located

Ground truth: `https://kaurcounseling.net/`. Rules from briefs 33/34 still apply: no per-page
padding/margin/height values whose only job is to force the total height; measure live's
computed values with Playwright, never guess. **Commit and push each task separately.**
Gate before every commit: `node --check page.js script.js icons.js` and
`qa/tools/regress.sh http://localhost:4173/` (server: `python3 -m http.server 4173` from repo root).

Current (HEAD 5304522): heightErr desktop 672 / tablet 721 / phone 1260; styleDeltas 30/82/170.

**Per-route drift report: `qa/audit/spacing-drift-34.txt`.** For every route × viewport it lists
each point where our text Y position jumps away from live (`liveY ourY drift change text`).
Each row is one place to fix: the gap *just above* that text is wrong by `change` px.
Regenerate after changes: from
`/private/tmp/claude-502/-Users-danielfeldman-software-kaurcounseling-rewrite-kaur-landing/f16b7cbc-e200-4ce4-a75e-db973c6e959b/scratchpad/vdiff`
run `node spacing.mjs <desktop|tablet|mobile> <route> 8` (regress.sh refreshes its `dom/` data).

## Task 1 — the shared footer gap (one fix per viewport, affects all 12 detail routes)

The jump at the footer ("Sohavani Mand, LMFT") is the **same on every detail route**:
desktop **+25px** (ours too low), tablet **−74px**, phone **−70px** (ours too high).
So one shared rule is wrong per viewport — the `.detail-shell` bottom padding, the last
section's bottom padding/margin, or the footer's own top padding at tablet/phone. Measure on
live, for one route at each width, every box between the last content line and the footer
brand text (padding-bottom of each wrapper, footer padding-top, footer inner layout), and match
them. One commit. Expected result: heightErr drops by ~25×11 / 74×12 / 70×12.

## Task 2 — desktop per-route jumps (commit when done)

Work down `spacing-drift-34.txt` for `@desktop`. Largest: transitions `Therapy can help you:`
+105 (the list block above it), cost `Sohavani` +78 after Task 1 → check the cost CTA card
block, resources `Sohavani` +52, modalities −83 (the closing card area; the
`.page-modalities .modalities-closing-card{margin-top:180px}` rule looks like a fudge — check
it), anxiety `How we work with it` +19 and following. Also check whether
`.page-cost … margin-top:135px` and `.page-get-started .detail-content{margin-top:79px}` are real
live values or fudges. Target: every desktop route within ±4px.

## Task 3 — tablet per-route jumps (commit when done)

Same, for `@tablet`, without breaking desktop.

Phone will be the next brief — **but do not leave early**: finish Task 3 before stopping. If a
jump can't be fixed with real values, list it with the cause in the report.
Report per task: before/after regress.sh numbers and each cause fixed.
