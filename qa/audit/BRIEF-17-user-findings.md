# Fix brief 17 — user-reported findings (ticker speed, back links, cost page)

Ground truth: `https://kaurcounseling.net/`. These were spotted by Daniel looking at the
deployed site, and I have verified and measured every one. **Do these first** — they are
user-visible defects, not fine-tuning.

---

## 1. The marquee ticker runs ~4.8x too fast

Both sites use `animation: marquee 32s linear infinite` with
`@keyframes marquee { 0% { transform: translate(0) } 100% { transform: translate(-50%) } }`.

The catch: **`-50%` in a transform resolves against the element's own layout width**, not
its content width. Live's track is a flex row whose *layout* width is constrained to the
bar (1440px at desktop) with its children overflowing (`shrink-0`, `whitespace-nowrap`).
Ours lets the track expand to its full content width.

Measured at a 1440px viewport, with the ticker scrolled into view:

| | track layout width | distance per cycle | duration | **velocity** |
|---|---|---|---|---|
| live | 1440px | 720px | 32s | **22.5 px/s** (measured 23) |
| ours | 6856px | 3428px | 32s | **107 px/s** (measured 107) |

**Target: ~22.5 px/s.**

Do not simply copy live's structure — live's version translates 720px and then snaps back
to 0, which does not land on a content boundary, so live actually jumps each cycle. Keep
our seamless loop (two identical groups, translate by exactly one group width) and set the
duration so the *velocity* matches:

- our group width is **3428px** (half the 6856px track)
- 3428 / 22.5 ≈ **152s**

So `animation-duration: 152s` with the existing `-50%` keyframe gives 22.5 px/s and stays
seamless. Verify by measuring px/s, not by eye.

Check the mobile/tablet breakpoints too — if the track width changes there, the duration
must change with it to hold ~22.5 px/s.

## 2. Three pages are missing their "Back to" link

I compared every route. Live shows a back link on `about`, `about/cost`,
`about/resources` and all six service pages; we render it only on the service pages.

| route | live | ours |
|---|---|---|
| `/about` | `Back to Home` at x=256, y=112 | **ABSENT** |
| `/about/cost` | `Back to Home` at **x=384**, y=128 | **ABSENT** |
| `/about/resources` | **`Back to About`** at x=256, y=128 | **ABSENT** |
| `/modalities` | none | present but `display:none` — **remove it** |
| `/services/*` | `Back to Services` | present ✓ |
| `/privacy`, `/get-started` | none | none ✓ |

Notes:
- The cost page's link sits at **x=384**, not 256, because that page uses a narrower
  container — align it to that page's content edge.
- Resources links back to **About**, not Home. Label and destination both differ.
- Live's label has **no `←` character**; ours renders a literal `← Back to Services`.
  Live uses an icon, so match live's treatment rather than prefixing an arrow glyph.

## 3. Cost page — "Session rates" is a plain bulleted list, not a price table

Live renders it as a simple `<ul>` with small bullets, one line each, in ordinary body
text:

```
• 50-minute individual session — $250
• 80-minute extended session — $400
• Couples and family sessions — $300 (50 minutes)
```

We render a **rate table**: the label left in muted grey, the price **right-aligned in
large bold burgundy**, with horizontal rules between rows. That treatment does not appear
on live's cost page at all. Replace it with the plain bulleted list.

## 4. Cost page — the superbill paragraph should be two paragraphs

Live splits it:
1. "I'm out-of-network with most insurance plans, … according to your out-of-network
   benefits."
2. "Many clients receive 50–80% of the session cost back. I'm happy to help you understand
   your benefits before we begin, so there are no surprises."

Ours runs it as one continuous paragraph.

## 5. Cost page — the closing line is left-aligned on live, not centred

`If this feels like the right place to begin, you don't have to figure it out alone.`

| | live | ours |
|---|---|---|
| alignment | **left**, starting at the body text's left edge | centred |
| measure | wider — wraps after "figure" | narrower — wraps after "begin," |
| divider above | **none** | a horizontal rule |
| button | left-aligned below | centred |

Colour and face (spruce italic Fraunces) are already correct — only the alignment, measure
and the stray divider are wrong.

---

## Why my tooling missed 2–5

My comparator aligns elements by text content, so an element that is **absent** on our side
produces no delta line at all — the back links were invisible to it. And a wrong *layout*
treatment (a table vs a list) with matching text and colours also produces no delta. I am
adding a presence check, but treat this brief as evidence that the reports are not
exhaustive.

## Scope

- Do not regress desktop: all 13 routes currently match live's height exactly at 1440x900
  (home 9887 · about 3752 · cost 2447 · resources 3360 · modalities 3433 · get-started 1618 ·
  adhd 3748 · multiculturalism 2556 · burnout 2194 · anxiety 2165 · transitions 2146 ·
  teens 2590 · privacy 2216). Adding the back links will change `about`, `cost` and
  `resources` — re-check those against live's heights afterwards, since live includes them.

## Verification

`node --check page.js` must pass, all 13 routes must render under
`python3 -m http.server 4173`, and you must report the measured ticker velocity in px/s.

## Deliverable

Commit to `main` and push. Report per section.
