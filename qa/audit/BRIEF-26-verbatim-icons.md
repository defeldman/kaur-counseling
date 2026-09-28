# Fix brief 26 — copy icons VERBATIM, restore the leaves properly, 3px footer overflow

Ground truth: `https://kaurcounseling.net/`.

Brief 25 fixed the big mobile overflow (`/about/` 736px → 393, `/modalities/` 1162px → 393
at a 390px viewport) and every route still matches live's height at 1440. Three items remain.

---

## 1. Icons have been hand-drawn instead of copied — use the new verbatim file

**Why this keeps failing:** the old inventory recorded standard lucide icons by **name
only** (e.g. `lucide-hand-heart`) with no paths. Agents kept the first path and invented the
rest. Example, `/services/burnout` section badge 2:

```
live  M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16 | m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4 | m2 15 6 6 | M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.…
ours  M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16 | M2 14h2l3 3h7l5-5a2 2 0 0 0-3-3l-3 3 | M2 14v6h4 | M22 14v6h-4 | M12 7s-3-2-3-4a2 2 0 0 1 3-1 …
```

First path right, everything after it invented. Same for burnout's `wind` and `sprout`.

**New input: `qa/audit/live-icon-markup.md`** — every non-leaf icon on every live route,
with its size, position, the text beside it, and its **complete `<svg>…</svg>` outerHTML
copied from the live DOM**.

**Rule: copy each `<svg>` byte-for-byte. Do not retype, simplify, or redraw any path.**
You may change only the `class` attribute to fit our CSS.

Currently wrong (the markup file has the correct SVG for each):
- `/services/burnout` — all 3 section badges (`wind`, `hand-heart`, `sprout`)
- `/services/multiculturalism` — 2
- `/services/teens` — 2
- `/services/anxiety-depression` — 1
- `/services/transitions` — 1

Then **grep every lucide icon in `icons.js` against the markup file** and correct any other
hand-drawn ones, even ones my comparator did not flag.

## 2. Four homepage arrows — still missing

Brief 25 §2 was not done. Live renders a `lucide-arrow-right` after each of these homepage
links (verbatim markup in the file, under `## home`):

| link | size |
|---|---|
| Learn more about how I work | 15x15 |
| Explore all the modalities | 15x15 |
| Learn more about the cost | 14x14 |
| Browse the reading list | 14x14 |

## 3. Put the decorative leaves back — inside their elements

Brief 25 deleted the five page-absolute leaves instead of relocating them, so they are
missing again (about 1, modalities 2, resources 2). Restore them **inside the element each
decorates**, positioned relative to it — never with page coordinates:

- **about** — the small centred leaf at the top of the burgundy closing CTA card, in normal
  flow: `mx-auto w-7 text-cream/40 mb-6 -rotate-6`.
- **modalities** — the two leaves inside the burgundy closing CTA card (which is
  `relative overflow-hidden`): `absolute right-8 top-8 w-16 text-cream/15 -rotate-12` and
  `absolute left-10 bottom-6 w-12 text-cream/10 rotate-[20deg]`.
- **resources** — two leaves; find them in `qa/audit/live-icon-inventory.txt` (search
  `######## resources`, `vb="0 0 100 150"`) and place each relative to its section.

Because the burgundy card is `overflow:hidden`, leaves inside it cannot widen the page.

## 4. 3px horizontal overflow on every subpage at 390px

At a 390px viewport every subpage measures `scrollWidth` **393**; live measures **390**.
The culprit is `.footer-business` ("Kaur Counseling, Marriage & Family Therapy, Inc."),
which extends to x=393. Constrain it on mobile so nothing passes the viewport edge.

(Leave the homepage alone at 390px: live itself is 415px wide there because of the ticker,
and we match it.)

---

## Scope

- Desktop heights are exact on all 13 routes. The footer is correct. Do not regress either.

## Verification — measure with Playwright, do not estimate

1. `node --check page.js` and `node --check icons.js` pass; all 13 routes render.
2. For every icon you touched, diff its `outerHTML` paths against
   `qa/audit/live-icon-markup.md` — they must be identical.
3. `scrollWidth` at 390 for all 13 routes: 390, except home = 415.
4. `scrollHeight` at 1440x900 still:
   home 9887 · about 3752 · cost 2447 · resources 3360 · modalities 3433 · get-started 1618 ·
   adhd 3748 · multiculturalism 2556 · burnout 2194 · anxiety 2165 · transitions 2146 ·
   teens 2590 · privacy 2216

## Deliverable

Commit to `main` and push. Report the four checks with numbers.
