# Fix brief 25 — URGENT: hardcoded leaf coordinates break mobile

Ground truth: `https://kaurcounseling.net/`.

Brief 24 landed well: the footer now matches live, and all 13 routes match live's page
height exactly at 1440x900. But it introduced a **serious mobile regression.**

## 1. URGENT — two pages now scroll sideways on phones

`page.js` places decorative feather leaves with **absolute page coordinates** measured at
1440px:

```js
const inventoryFeathers = {
  about: [[704,3140,32,45,'rgba(88,25,37,.4)']],
  modalities: [[1079,2742,83,107,'rgba(57,96,71,.2)'],[285,2978,70,84,'rgba(57,96,71,.2)']]
};
// rendered as <span style="position:absolute;left:${x}px;top:${y}px;…">
```

Those coordinates only mean something on a 1440px desktop. At a 390px phone viewport:

| route | `document.documentElement.scrollWidth` at 390px | live |
|---|---|---|
| `/about/` | **736** | 390 |
| `/modalities/` | **1162** | 390 |

The leaves sit hundreds of pixels past the right edge and drag the page wider, so the page
scrolls horizontally on every phone.

**Fix:** remove the page-absolute coordinates entirely. Place each leaf **inside the element
it decorates**, positioned relative to that element — exactly as live does. From the live
inventory:

- **about** 32x45 leaf — it is the centred leaf at the top of the burgundy closing CTA card
  (`mx-auto w-7 text-cream/40 mb-6 -rotate-6`, in normal flow, not absolute).
- **modalities** 83x107 and 70x84 leaves — these are the two leaves inside the burgundy
  closing CTA card: `absolute right-8 top-8 w-16 text-cream/15 -rotate-12` and
  `absolute left-10 bottom-6 w-12 text-cream/10 rotate-[20deg]`, positioned against the
  card (which is `relative overflow-hidden`).

Check `qa/audit/live-icon-inventory.txt` for any other `inventoryFeathers`-style placements
and convert them the same way. **Nothing on the page may be positioned with page-level
pixel coordinates.**

**Acceptance:** at 390x844, 768x1024 and 1440x900, every route's
`document.documentElement.scrollWidth` equals the viewport width — **except the homepage at
390px, where live itself is 415px wide**; match live there.

## 2. Four homepage "Learn more" arrows are missing

Live renders a `lucide-arrow-right` (`class="lucide lucide-arrow-right mt-px"`, burgundy,
paths `M5 12h14` and `m12 5 7 7-7 7`) after each of these links. Ours has none on:

| link text | live size |
|---|---|
| Learn more about how I work | 15x15 |
| Explore all the modalities | 15x15 |
| Learn more about the cost | 14x14 |
| Browse the reading list | 14x14 |

Ours already renders them on "Learn more about me" and the "Learn more" links in the door
accordion — match those.

## 3. One wrong icon on `/services/transitions`

The second card icon (Career Changes) should be live's
`M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16` + its rect (`lucide-briefcase`).
Ours renders `M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M2 12h20` (a different glyph).
Use the exact paths from `qa/audit/live-icon-inventory.txt`.

---

## Scope

- **Desktop heights are exact on all 13 routes — do not regress them.**
- **The footer is correct — do not touch it.**

## Verification

`node --check page.js` must pass and all 13 routes must render under
`python3 -m http.server 4173`. Using Playwright (measure, do not estimate), report:

1. `scrollWidth` for all 13 routes at **390**, **768** and **1440**.
2. `scrollHeight` for all 13 routes at 1440x900, which must still be:
   home 9887 · about 3752 · cost 2447 · resources 3360 · modalities 3433 ·
   get-started 1618 · adhd 3748 · multiculturalism 2556 · burnout 2194 · anxiety 2165 ·
   transitions 2146 · teens 2590 · privacy 2216

## Deliverable

Commit to `main` and push.
