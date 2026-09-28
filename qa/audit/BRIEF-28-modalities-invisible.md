# Fix brief 28 — URGENT: the modalities cards never become visible

Daniel reports `https://defeldman.github.io/kaur-counseling/modalities/` is **empty**. It is:
the five framework cards stay at `opacity: 0` forever, even when a real visitor scrolls
through the page.

## Cause

`page.js` (the `framework(...)` card template, ~line 311) hardcodes
`class="reveal scroll-reveal …"` on each `<article>`. The `scroll-reveal` class starts an
element hidden (opacity 0, translateY 24px) until it gains `is-visible`. But the observer in
`script.js` (~line 109–133) only observes the elements in its own `scrollRevealTargets`
list and only adds `scroll-reveal` to those itself. The cards aren't in that list, so nothing
ever gives them `is-visible`.

Verified with realistic mouse-wheel scrolling on the deployed site: all 5 cards
`opacity: 0` and never `is-visible`. Every other route passes the same test.

## Fix

Make the modality cards take part in the same reveal system as everything else:
include them in the observed set (or have the observer pick up any element that carries
`scroll-reveal` in the markup), so each card fades in on scroll with live's staggered timing
(`0.9s ease-out`, per-card delay — live's first card is `transition-delay: 0.04s`).

Also make it fail safe: if the observer does not run for any reason, nothing that carries
`scroll-reveal` may remain invisible.

## Scope

- Touch only the reveal wiring (`page.js` card template and/or the `script.js` observer).
- **Another agent is working concurrently on breakpoint CSS in `styles.css`.** Do not edit
  `styles.css`. Before committing, `git pull --rebase origin main`.

## Verification

1. `node --check page.js` and `node --check script.js`.
2. Run `node qa/tools/stuck.mjs http://localhost:4173/` against a local server
   (`python3 -m http.server 4173`). It scrolls every route with the mouse wheel like a real
   visitor and lists anything still invisible. It must report `stuck-invisible: 0` for all
   13 routes (it currently reports 5 on modalities).
3. `/modalities/` at 1440x900 still measures `scrollHeight` 3433.

## Deliverable

Commit to `main` and push.
