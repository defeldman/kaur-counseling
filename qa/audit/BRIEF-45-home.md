# Fix brief 45-home — rebuild ONE page: /? (same method as the successful /about/cost rebuild)

Branch `fix/home` in its own worktree. **Never push to main**; commit here and push the branch.
Serve THIS directory on port **4175** (`python3 -m http.server 4175`) — other ports belong to other agents.

## The model to copy
Read `git show 2ddd6d4` first — the /about/cost rebuild. It passed: page height equal to live and every
text block within ±2px at 1440, 768 and 390. Do the same for /?:

1. **Markup** (`page.js`, the home route): rewrite it so its element nesting mirrors live's tree in
   `qa/audit/live-skeleton/home.txt` from `<main>` down, element for element. Use NEW page-specific class
   names only (`home-main`, `home-article`, …). **Do not use any existing class** (`detail-shell`,
   `detail-content`, `detail-section`, `scroll-reveal`, `privacy-*`, `office-*`, …) except the shared
   header/footer and feather classes; for scroll-reveal, register the new elements in `script.js` like cost did.
2. **CSS:** ONE new block at the end of `styles.css` translating each live class at every breakpoint.
   Values come from the classes: `p-6 lg:p-8` → 24px, 32px at ≥1024; `gap-3` → 12px; `mt-10` → 40px.
   Tailwind: 1 unit = 4px; text-xs 12/16, sm 14/20, base 16/24, lg 18/28, xl 20/28, 2xl 24/32, 3xl 30/36,
   4xl 36/40, 5xl 48/1; `space-y-N` = margin-top N×4 on children after the first; `sm:` ≥640, `md:` ≥768,
   `lg:` ≥1024. Colours: midnight rgb(23,39,64), burgundy rgb(88,25,37), spruce rgb(57,96,71),
   cream rgb(241,234,223); `/80` = alpha .8. **A value that isn't a Tailwind value (like 27px, or a 14px
   gap) means you guessed — look at the class again.**
3. **Delete** every old rule targeting this page — for a multi-line rule delete ALL of its lines including its closing `}`, and when a selector list names other pages too, remove only this page's selector. Afterwards `python3 qa/tools/css_braces.py < styles.css` must print `[] unclosed 0` (a stray top-level `}` silently swallows the next rule). (`.page-home`, and any page-only class it used).
4. **Check and iterate:** copy `qa/tools/pagecheck.mjs` to `/private/tmp/claude-502/-Users-danielfeldman-software-kaurcounseling-rewrite-kaur-landing/f16b7cbc-e200-4ce4-a75e-db973c6e959b/scratchpad/vdiff` and run `node pagecheck.mjs 4175 ?`
   there. It compares page height and every visible text block with live at 1440/768/390. For each block it
   reports, run `node boxdiff.mjs <w> ? "<text>" 6` (use a copy whose local URL is :4175) to see live's
   classes vs our box model; fix; re-run. **Keep iterating until pagecheck shows height equal and differing 0
   at all three widths** (casing-only text differences are fine). Also check hover states, scroll-reveal, and
   that feathers on the page still match (`feathers-all.mjs` copy with URL → :4175).


**HOME PAGE NOTES (read carefully).** Home is NOT rendered by page.js — its markup is the static `index.html` at the repo root (body has no data-page; its CSS rules are mostly under `body:not([data-page])`). The skeleton is `qa/audit/live-skeleton/home.txt`. Rebuild index.html's <main> content to mirror it (header and footer stay shared as they are). Name new classes `home-*`. MUST PRESERVE, and re-check after your changes: (1) the hero keeps the TREE image (`assets/images/…` as now — do not switch to hero-room.webp), (2) the scrolling marquee strip ('Healing takes its own time…') keeps its current speed: animation-duration 152s with translateX(-50%) over the duplicated track — verify its pixels/second still matches live (~22.5px/s), (3) scroll-reveal animations and their stagger delays (script.js revealStaggerGroups) still fire, including on the office/contact sections, (4) hover states on nav, cards, buttons and links, (5) all 18 home feathers (`leaf-*`, `home-about-feather`, marquee feathers) keep their classes and still match live — verify with a copy of feathers-all.mjs pointed at your port. For pagecheck, use route `?` (e.g. `node pilot.mjs <port> '?'`) because an empty route falls back to another page. Other pages must not change (their CSS is scoped; the shared header/footer must stay identical).

Already rebuilt this way and passing (do not modify their blocks): /about/cost, /privacy, /get-started, and the shared footer.

Before committing: `node --check page.js script.js icons.js`. One commit. Print the final pagecheck output
and the number of old rules deleted, then exit.

## STATUS (consolidated)
Done and verified: the hero matches live; copy fixes (AD(H)D, "Young Women Coming of Age", Rumi quote
marks). Check: the Rumi quote must be ONE unbroken sentence — remove any `<br />` inside it.

Remaining cause: the About, Wheelhouse and Our Approach sections (and below) are still the OLD structure
with invented values. Rebuild them ONE SECTION AT A TIME from `qa/audit/live-skeleton/home.txt`:
1. **About** (skeleton lines 68–91): section `relative py-28 lg:py-40` (112px / 160px ≥1024). Grid
   `mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start` (ours: flex, gap 0).
   Left `lg:col-span-5`, right `lg:col-span-6 lg:col-start-7`. Blockquote `mt-8 pl-6 border-l-2
   border-burgundy`; its p `text-2xl lg:text-3xl leading-snug italic text-spruce` = 24px/33px. The
   "Learn more about me" link is inside `<div class="mt-8">`, link gap 8px.
2. **Wheelhouse** (lines 92–316): intro p `mt-8`; grid `mt-20 grid grid-cols-1 md:grid-cols-2
   lg:grid-cols-4 gap-14 lg:gap-10` (80px top, 56px gap, 40px ≥1024); card `flex flex-col`; h3 inside
   `<div class="mb-4">`, `text-2xl` 24/32, no padding.
3. **Our Approach** (lines 317–347): section `relative py-28 lg:py-36 bg-cream`; grid `mt-16 grid
   grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10`; card `flex flex-col items-center text-center
   rounded-2xl border-2 border-midnight bg-cream px-8 py-10 lg:py-12`; h3 `text-xl tracking-[0.18em]
   uppercase` ("Self Empowerment" wraps to 2 lines at 390); icon wrapper `my-7`; copy `space-y-4`,
   p `text-[0.95rem] leading-relaxed`.
4. Then People we serve (line 348), Modalities (408), Contact (446) the same way.
Measure with `node drift.mjs 4175 '?' 390` (also 768, 1440) in /Users/danielfeldman/.claude/jobs/6cdeaeba/tmp/verify: it lists,
top to bottom, where the offset steps. Keep feathers, reveal classes, hovers, hero and marquee intact.
