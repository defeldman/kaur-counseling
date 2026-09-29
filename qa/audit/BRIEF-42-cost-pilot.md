# Fix brief 42 — pilot: rebuild ONE page (/about/cost) to mirror live's structure

You are on branch `fix/cost-rebuild` in a separate worktree. **Do not push to main.** Commit on this
branch and push the branch (`git push -u origin HEAD`). Serve THIS directory on port **4175**
(`python3 -m http.server 4175`); other ports are in use.

## Background (read this)

Live is Tailwind; its class names are the full spec. Live's element tree for cost, with classes:
`qa/audit/live-skeleton/cost.txt`. The last agent tried to *add* Tailwind values on top of our
existing CSS without restructuring or deleting anything — spacing doubled and heights got 4× worse;
it was reverted. Our cost page is rendered by `page.js` (look for the cost route) with generic classes
(`detail-shell`, `detail-content`, `detail-section` …) that many layered rules in `styles.css` style.

## The task

1. **Markup:** change the cost page's markup in `page.js` so its element nesting mirrors live's
   skeleton from `<main>` down (main → article → back link → reveal div → … → the CTA card). Give
   the elements page-specific class names (e.g. `cost-main`, `cost-article`, `cost-rates` …).
   Keep all text, links and icons exactly as they are now. Header and footer: leave as they are.
2. **CSS:** add ONE new block at the end of `styles.css`, `/* /about/cost — built from live Tailwind
   classes */`, styling only those new class names, translating each live class at every breakpoint
   (`sm:` ≥640, `md:` ≥768, `lg:` ≥1024). Tailwind: 1 unit = 4px; text-xs 12/16, sm 14/20, base 16/24,
   lg 18/28, xl 20/28, 2xl 24/32, 3xl 30/36, 4xl 36/40, 5xl 48/1; `space-y-N` = margin-top N×4 on
   children after the first. Colours: midnight rgb(23,39,64), burgundy rgb(88,25,37), spruce
   rgb(57,96,71), cream rgb(241,234,223); `/80` etc. = alpha.
3. **Delete** every existing rule in `styles.css` that targets `.page-cost` (search for it — there
   are many, across media queries). Generic rules for `.detail-*` stay (other pages use them), but
   the cost page must no longer use those classes.
4. **Check** at 1440, 768 and 390 against live, from
   `/private/tmp/claude-502/-Users-danielfeldman-software-kaurcounseling-rewrite-kaur-landing/f16b7cbc-e200-4ce4-a75e-db973c6e959b/scratchpad/vdiff`:
   `node boxdiff.mjs <w> about/cost/ "<text>"` (edit its local URL to :4175) for each heading, and a
   full-page screenshot of live vs ours at each width. Target: every heading and paragraph within
   ±4px of live, and page height equal to live (2447 / 2488 / 2868 at 1440 / 768 / 390 — measure to
   confirm). Also check hover states and scroll-reveal still work on the page.

Commit once when done. Report: page heights live vs ours at the 3 widths, the boxdiff results for
the headings, the number of `.page-cost` rules deleted, and anything that still differs. Then exit.
