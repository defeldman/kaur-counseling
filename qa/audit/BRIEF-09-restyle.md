# Fix brief 09 — style the newly-added content

Ground truth: `https://kaurcounseling.net/`. Full measurements:
`qa/audit/desktop-style-deltas.txt` (format `property live->ours`).

Briefs 04 and 06 brought the copy to parity — that worked, and page heights are now much
closer to live. But the new blocks were added as **plain paragraphs** where live renders
**styled cards**, so they inherit body styling instead of card styling. This pass fixes
that, plus a few one-off regressions.

---

## 1. Service-page card grids — the biggest item

On `adhd`, `transitions`, `teens`, `multiculturalism`, `anxiety-depression`, `burnout`,
the new card grids render as body paragraphs.

**Live card label:** Fraunces **18px / 24.75px, weight 400** — and the colour **cycles**
across the grid:

| position in grid | colour |
|---|---|
| 1st, 4th, … | burgundy `rgb(88,25,37)` |
| 2nd, 5th, … | spruce `rgb(57,96,71)` |
| 3rd, 6th, … | purple `rgb(108,50,133)` |

**Live card body:** **14px / 22.75px**, `rgba(23,39,64,0.65)`.

Ours renders labels as Inter 16px weight 700 `rgba(23,39,64,0.75)` and bodies as
16px / 29.25px `rgba(23,39,64,0.75)` — i.e. no card styling at all.

On `transitions` and `teens` the same grid uses a slightly larger label: live
**20px / 27.5px** with the same burgundy/spruce/purple cycle; ours is 19px / 28px, all navy.

Reuse the card markup/classes the repo already has for service card grids so this is one
change, not six.

## 2. Section headings above those grids

`You might be navigating…` (transitions), `What you might be carrying` (teens) and their
siblings: live **36px / 40px**; ours **30px / 36px**.

## 3. Body paragraph line-height inside `.detail-section`

Live uses **26px** for the card/section body paragraphs that our CSS is giving
**29.25px** (seen on multiculturalism, burnout, anxiety, adhd). Separately, the *lede*
paragraphs are live **29.25px** and ours **29.16px** — round that to 29.25px.

## 4. `anxiety-depression` H1 is badly broken

Live: `Anxiety` **60px / 60px** navy, then `Depression.` **60px / 60px italic burgundy
`rgb(88,25,37)`**.
Ours: both at **30px / 36px**, `Depression.` non-italic and spruce `rgb(57,96,71)`.

The H1 has lost its hero styling on this route. Check what page-scoped rule is winning.

## 5. Service H1 italic was over-applied

Brief 03 said service `h1`s are italic. That is only true of the **emphasised** part.
Live `adhd`: `ADHD & Late-Stage` is **normal**, only `Diagnosis.` is italic.
Ours now italicises the whole heading. Italic belongs on the `<em>` span only.

Same shape on `transitions`: live's lede emphasis `difficult.` is
**weight 500, normal (not italic), burgundy `rgb(88,25,37)`**; ours renders it
weight 400, italic, `rgba(23,39,64,0.75)`.

## 6. Resources — the poem card

| element | live | ours |
|---|---|---|
| `A poem to sit with` eyebrow | **9.6px / 14.4px**, ls **2.88px**, `rgba(57,96,71,0.8)` | 12px / 16px, ls 3px, `rgba(88,25,37,0.8)` |
| `The Guest House` | **18px / 28px italic** | 20px / 21.6px normal |
| poem lines | **14px / 19.25px, normal (not italic)**, `rgba(23,39,64,0.85)` | 17px / 26.35px italic, `rgba(23,39,64,0.6)` |
| `Jalaluddin Rumi` | **10.4px / 15.6px, weight 400**, ls **2.08px** | 12px / 19.2px, weight 500, ls 1.8px |
| `Translated by Coleman Barks ·` | **10.4px italic**, ls normal, `rgba(23,39,64,0.5)` | 10px normal, ls 0.5px, `rgb(118,122,118)` |
| `Scottish Poetry Library` link | same as above but spruce `rgb(57,96,71)` | `rgb(118,122,118)` |

## 7. Modalities — framework numbers and eyebrow colours

Live numbers `01`–`05`: **Fraunces 14px / 20px**, letter-spacing `normal`,
`text-transform: none`, and the colour cycles at **50–55% opacity**:

- `01` `rgba(88,25,37,0.5)` · `02` `rgba(57,96,71,0.5)` · `03` `rgba(108,50,133,0.55)`
- `04` `rgba(88,25,37,0.5)` · `05` `rgba(57,96,71,0.5)`

Ours: Inter 12px / 16px, ls 3px, uppercase, all spruce `rgb(57,96,71)`.

The `What it is` eyebrow colour is now **inverted** — live `rgb(57,96,71)` where ours has
`rgba(88,25,37,0.8)`. Brief 03 §5 had this backwards for the first card; go by the live
page per card.

Closing line "We will find the right shape together…": live **16px / 26px**
`rgba(241,234,223,0.8)` (cream on the dark CTA); ours 15px / 22.5px `rgb(101,109,115)`.

## 8. Privacy

- `h1` letter-spacing: live `normal`, ours `-0.96px`.
- Section `h2`s (`If you are in crisis`, `Professional disclaimer`,
  `Licensee identification`, `Website privacy`,
  `Notice of Privacy Practices (summary)`, `Telehealth`):
  live **24px / 32px**, ours 28px / 36px.

## 9. Cost

- `Therapy is an investment in the life you're building…`: live **18px / 29.25px**,
  `rgba(23,39,64,0.75)`; ours 16px / 24px, solid `rgb(23,39,64)`.
- The three detail paragraphs (payment, superbill, privacy rationale): live
  `rgba(23,39,64,0.75)`; ours `rgba(23,39,64,0.7)`.
- Closing line `If this feels like the right place to begin…`: live **Fraunces italic
  24px / 33px spruce `rgb(57,96,71)`**; ours Inter 16px / 24px `rgb(94,102,112)`.

## 10. Get Started

- `Are we the` / `right fit?` h1: live letter-spacing `normal`; ours `-1.8px`.
- Lede line-height: live 29.25px, ours 28.8px.
- `Opens a secure scheduling window, no email form.`: live `rgba(23,39,64,0.5)`,
  ours `rgba(23,39,64,0.7)`.
- `My office is a calm, private space…`: live has **no background**; ours paints
  `rgba(91,30,42,0.05)` behind it.

## 11. Homepage accordion panel

Now that the panel is in the DOM (brief 07 switched it to `max-height`), its text measures:
live **line-height 22.75px**, ours **21px**. Everything else about it matches.

---

## Scope

- CSS only wherever possible. If a card grid genuinely needs different markup to pick up
  existing card classes, change the markup — but do not alter any wording.
- Do not touch the nav, footer, ticker, hero images, CTA cards or the animation work.

## Verification

`node --check page.js` must pass and all 13 routes must render under
`python3 -m http.server 4173`.

## Deliverable

Commit to `main` and push. Report per section, and flag anything where the live page
disagreed with this brief — measure live yourself if a value looks wrong.
