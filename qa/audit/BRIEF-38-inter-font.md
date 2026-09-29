# Fix brief 38 — use live's exact Inter font, then remove compensations for the wrong one

Ground truth: `https://kaurcounseling.net/`. **Commit and push each task separately.**
Gate before every commit: `node --check page.js script.js icons.js`, `qa/tools/regress.sh http://localhost:4173/`
(server: `python3 -m http.server 4173` from the repo root). Another agent is working on feathers
in a separate worktree (branch `fix/feathers`) — do not touch feather/leaf rules or `featherSvg`.

## Root cause found

Live loads Inter **v20** from Google Fonts — one latin file for weights 300/400/500/600:
`https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2`
(48,432 bytes, md5 `65850a373e258f1c897a2b3d75eb74de`).
Our `assets/fonts/inter-latin.woff2` is a **different, older file** (25,844 bytes, md5 `9e4949…`),
present since the first commit. Different glyph widths change text wrapping on every page at
every width — that is a large part of the height drift chased in briefs 33–36.
(Fraunces is fine: both our Fraunces files are byte-identical to live's.)

The last agent noticed the wrapping and added a second font, `InterPhone`
(`assets/fonts/inter-mobile-latin.woff2`, md5 `260c81…`, also not live's file), applied only to
`.page-service` at phone width. That raised phone styleDeltas 170 → 303 (font-family mismatch).

## Task 1 — the font (one commit)

- Download live's file (URL above), check its md5, and **replace** `assets/fonts/inter-latin.woff2`
  with it. Keep the `@font-face{font-family:Inter…}` rule, weight range 300 600 (live: 300–600).
- Remove the `InterPhone` `@font-face`, the `.page-service{font-family:InterPhone…}` rule, and
  delete `assets/fonts/inter-mobile-latin.woff2`.
- Bump the asset version to `?v=19` so browsers fetch the new font (the stylesheet URL changes;
  also check whether the font URL itself needs a version so Pages' cache doesn't serve the old file).
- Run regress.sh. Heights will move at every width — that's expected in this task. Report the
  numbers; styleDeltas on phone must drop back to ≤190.

## Task 2 — remove compensations built for the wrong font (one commit)

With the correct font, earlier tweaks meant to force wrapping/widths are now likely wrong. Search
`styles.css` for, and re-check against live (Playwright computed values), each of:
- non-`normal` `letter-spacing` on body copy, `word-spacing`, fixed `width`/`max-width` in px on
  text blocks that live doesn't have (e.g. `.page-services-adhd .detail-hero .detail-lede{width:672px}`),
  `font-stretch`, fractional font sizes.
- page-specific spacing from brief 36: `.service-cta{margin-top:64px}` on 4 routes,
  `.page-services-adhd .service-cta{margin-top:0}`, `.page-privacy .detail-content{padding-top:69px}`,
  modalities 56px values. Keep a value only if live's computed style has it on the matching element.
Remove what live doesn't have. Report each one removed or kept (with live's value).

## Task 3 — re-measure and fix remaining jumps (one commit)

Regenerate drift with `spacing.mjs` for all 12 detail routes + home at desktop/tablet/mobile (in
`/private/tmp/claude-502/-Users-danielfeldman-software-kaurcounseling-rewrite-kaur-landing/f16b7cbc-e200-4ce4-a75e-db973c6e959b/scratchpad/vdiff`)
and write it to `qa/audit/spacing-drift-38.txt`. Fix the jumps > 8px with real live values, largest
first. Do not stop before this is committed. Report before/after regress.sh numbers per task.
