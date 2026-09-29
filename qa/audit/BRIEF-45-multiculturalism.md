# Fix brief 45-multiculturalism — rebuild ONE page: /services/multiculturalism/ (same method as the successful /about/cost rebuild)

Branch `fix/multiculturalism` in its own worktree. **Never push to main**; commit here and push the branch.
Serve THIS directory on port **4175** (`python3 -m http.server 4175`) — other ports belong to other agents.

## The model to copy
Read `git show 2ddd6d4` first — the /about/cost rebuild. It passed: page height equal to live and every
text block within ±2px at 1440, 768 and 390. Do the same for /services/multiculturalism/:

1. **Markup** (`page.js`, the multiculturalism route): rewrite it so its element nesting mirrors live's tree in
   `qa/audit/live-skeleton/multiculturalism.txt` from `<main>` down, element for element. Use NEW page-specific class
   names only (`multiculturalism-main`, `multiculturalism-article`, …). **Do not use any existing class** (`detail-shell`,
   `detail-content`, `detail-section`, `scroll-reveal`, `privacy-*`, `office-*`, …) except the shared
   header/footer and feather classes; for scroll-reveal, register the new elements in `script.js` like cost did.
2. **CSS:** ONE new block at the end of `styles.css` translating each live class at every breakpoint.
   Values come from the classes: `p-6 lg:p-8` → 24px, 32px at ≥1024; `gap-3` → 12px; `mt-10` → 40px.
   Tailwind: 1 unit = 4px; text-xs 12/16, sm 14/20, base 16/24, lg 18/28, xl 20/28, 2xl 24/32, 3xl 30/36,
   4xl 36/40, 5xl 48/1; `space-y-N` = margin-top N×4 on children after the first; `sm:` ≥640, `md:` ≥768,
   `lg:` ≥1024. Colours: midnight rgb(23,39,64), burgundy rgb(88,25,37), spruce rgb(57,96,71),
   cream rgb(241,234,223); `/80` = alpha .8. **A value that isn't a Tailwind value (like 27px, or a 14px
   gap) means you guessed — look at the class again.**
3. **Delete** every old rule targeting this page (`.page-multiculturalism`, and any page-only class it used).
4. **Check and iterate:** copy `qa/tools/pagecheck.mjs` to `/private/tmp/claude-502/-Users-danielfeldman-software-kaurcounseling-rewrite-kaur-landing/f16b7cbc-e200-4ce4-a75e-db973c6e959b/scratchpad/vdiff` and run `node pagecheck.mjs 4175 services/multiculturalism/`
   there. It compares page height and every visible text block with live at 1440/768/390. For each block it
   reports, run `node boxdiff.mjs <w> services/multiculturalism/ "<text>" 6` (use a copy whose local URL is :4175) to see live's
   classes vs our box model; fix; re-run. **Keep iterating until pagecheck shows height equal and differing 0
   at all three widths** (casing-only text differences are fine). Also check hover states, scroll-reveal, and
   that feathers on the page still match (`feathers-all.mjs` copy with URL → :4175).


**Template note:** /services/adhd was rebuilt as a reusable service template (classes `svc-*`, in main — see `git show eec49bc`). Switch this page to that SAME template (render pageId 'services-multiculturalism' through it), adding only what this page's skeleton has that ADHD's doesn't. Don't change the ADHD page's result. Delete the old `.page-services-multiculturalism` rules; keep shared `.page-service` rules (other service pages still use them).

Already rebuilt this way and passing (do not modify their blocks): /about/cost, /privacy, /get-started, and the shared footer.

Before committing: `node --check page.js script.js icons.js`. One commit. Print the final pagecheck output
and the number of old rules deleted, then exit.
