# Fix brief 20 — 91 missing icons across the site (service pages worst)

Ground truth: `https://kaurcounseling.net/`.

Daniel reported the service pages "look much worse" and specifically that
`/services/burnout` has *"different and missing icons for the 3 title/subtitle colored
combos."* He is right. This is a large, real gap my earlier audits missed entirely.

**Why it was missed:** the comparison tool aligned elements **by text content**. Icons and
decorative SVGs carry no text, so they were invisible to it — and because most sit inline
beside a heading, page heights still matched live exactly. Every "pixel-exact" claim in
earlier briefs was about text geometry only. There is now an SVG comparator
(`iconcmp.mjs`) and its output is in `qa/audit/icon-deltas.txt`.

## Scale of the gap

```
route              live  ours   missing
adhd                16     4      12
transitions         18     4      14
teens               17     4      13
multiculturalism    12     4       8
burnout             10     4       6
anxiety             16    10       6
get-started          6     2       4
resources           27    19       8
modalities          13    10       3
home                81    75       9   (+3 wrong, 28 mis-positioned)
about                8     6       2
privacy              7     6       5   (+4 wrong)
cost                 3     2       1
                              ------
                       TOTAL  91 missing, 7 wrong, 71 mis-positioned
```

## Inputs

- **`qa/audit/live-icon-inventory.txt`** — the authoritative list. For every icon on every
  live route: its lucide name (or raw path data for the custom ones), pixel size, absolute
  position, colour, badge wrapper, class list, and the nearby text that locates it.
- `qa/audit/icon-deltas.txt` — what is missing / extra / mis-positioned per route.

---

## 1. Section-heading icon badges — the thing Daniel spotted

Every service page gives each section heading a **rounded badge with a lucide icon tinted
to that heading's colour**. We render none of them.

`/services/burnout` (badge `48x48`, `border-radius: 16px`, transparent background):

| heading | colour | icon |
|---|---|---|
| The slow creep | burgundy `rgb(88,25,37)` | `lucide-wind` |
| Why it's so hard to ask for help | spruce `rgb(57,96,71)` | `lucide-hand-heart` |
| Tending and rebuilding | clay `rgb(108,50,133)` | `lucide-sprout` |

`/services/multiculturalism` (badge `48x48`, radius 16px, transparent):

| heading | colour | icon |
|---|---|---|
| Multicultural Therapy | burgundy | `lucide-earth` |
| Acculturation & Assimilation Stress | spruce | `lucide-languages` |
| First-Generation & Second-Generation Issues | clay | `lucide-users` |
| Third Culture Kid (TCK) Therapy | burgundy | `lucide-compass` |
| Intergenerational Trauma Therapy | spruce | `lucide-network` |

`/services/anxiety-depression` (badge **44x44**, radius 16px, transparent):

| heading | colour | icon |
|---|---|---|
| Anxiety | burgundy | `lucide-brain` |
| Depression | spruce | `lucide-cloud-rain` |
| When they show up together | clay | `lucide-layers` |

`/services/adhd` — badges are **48x48, radius 16px, with a 10%-opacity tinted background**
(not transparent), and the icon is 24–28px:

| heading | badge bg | icon |
|---|---|---|
| ADD in women looks different | `rgba(88,25,37,0.1)` | custom `viewBox="0 0 64 64"` (paths in the inventory) |
| When the diagnosis arrives later | `rgba(88,25,37,0.1)` | custom `0 0 64 64` |
| How it shows up | `rgba(57,96,71,0.1)` | `lucide-brain` 24x24 |
| The grief, and the broken trust in yourself | `rgba(57,96,71,0.1)` | custom `0 0 64 64` |
| How we work with it | `rgba(108,50,133,0.1)` | `lucide-clock` 24x24 |

`/services/transitions` uses `lucide-baby` and `/services/teens` uses `lucide-backpack` on
their main section headings — see the inventory for the rest.

## 2. List-item icon badges

On `/services/adhd`, each item under "How we work with it" has a **36x36 circular badge**
(`border-radius: 9999px`, `background: rgba(108,50,133,0.1)`) holding an **18x18 clay**
lucide icon:

| item | icon |
|---|---|
| Honor your gifts: creativity, intensity, range. | `lucide-sparkles` |
| Tend the costs of pretending. | `lucide-heart` |
| Grieve what was, and slowly rebuild trust in yourself. | `lucide-shield-check` |
| Build rhythms and boundaries shaped for how your brain actually works. | `lucide-layers` |

`transitions` and `teens` use **20x20** icons on their card grids and **14x14
`M5 13l4 4L19 7` check marks** on their "Therapy can help you" / "What you get here" lists.
All listed in the inventory.

## 3. The back link lost its arrow — my mistake, restore it

Brief 17 told you live's back link has "no `←` character" and to drop the glyph. That was
half right: live has no literal character because it uses a **`lucide-arrow-left` icon**,
16x16, `class="lucide lucide-arrow-left mt-px"`, colour spruce `rgb(57,96,71)`, sitting at
the link's left edge. We now render no arrow at all. Restore it as the icon.

## 4. Decorative feather leaves are missing from the service heroes

Live flanks each service hero with two of the shared feather SVGs
(`viewBox="0 0 100 150"` — the same one used by the ticker and the CTA cards):

- left: `absolute -left-10 -top-6 w-10 text-burgundy/25`, renders ~52x67
- right: `absolute right-0 -top-2 w-7 text-spruce/30`, renders ~44x50

We render neither. The inventory lists the per-route sizes, offsets and rotations.

## 5. Wrong icons on /privacy

We use different glyphs from live:

| live | ours |
|---|---|
| `m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z` (triangle-alert) | `m12 3 9 17H3L12 3Z` |
| `lucide-phone` 16x16 (`M22 16.92v3a2 2 0 0 1-2.18 2 …`) x3 | a different phone path at 14x14 x3 |

Match live's paths and sizes.

## 6. Also on adhd — content column geometry

While in there, two measured layout issues:

| element | live | ours |
|---|---|---|
| body paragraph "The picture most people carry…" | x=**256**, w=**672** | x=320, w=800 |
| card label "Relationships" | x=**277**, w=**254** | x=348, w=199 |
| lede "An ADHD diagnosis arriving later…" | w=**672** | w=700 |

Our content column is indented 64px and 128px too wide, and the card grid is inset and
narrow.

---

## Scope and method

- Work route by route against `qa/audit/live-icon-inventory.txt`. It is the source of
  truth; where this brief summarises, the inventory has the exact values.
- Reuse a single shared feather-SVG helper rather than pasting it repeatedly — it already
  exists for the ticker and CTA cards.
- All lucide icons share
  `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round"`.
- Do **not** change text, colours or spacing that already match — 10 of 13 routes are at
  live's exact height and must stay there.

## Verification

`node --check page.js` must pass and all 13 routes must render under
`python3 -m http.server 4173`. Report the per-route icon counts (ours vs live's numbers in
the table above) and every route's `scrollHeight` at 1440x900:

home 9887 · about 3752 · cost 2447 · resources 3360 · modalities 3433 · get-started 1618 ·
adhd 3748 · multiculturalism 2556 · burnout 2194 · anxiety 2165 · transitions 2146 ·
teens 2590 · privacy 2216

## Deliverable

Commit to `main` and push. Report per route: icons added, and anything in the inventory you
could not place.
