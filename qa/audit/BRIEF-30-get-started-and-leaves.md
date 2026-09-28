# Fix brief 30 — get-started page (user-reported) + oversized leaves

Ground truth: `https://kaurcounseling.net/`. **Commit and push each numbered task separately**
(one commit per task), so each fix is reviewable and revertable on its own.

Daniel reports `/get-started/` *"has some differences in the coloring, sectioning."*
Verified at 1440x900:

## Task 1 — get-started sectioning and colouring

| element | live | ours |
|---|---|---|
| **"Virtual sessions…" notice** | a **boxed callout**: `background: rgba(88,25,37,0.05)`, `border: 1px solid rgba(88,25,37,0.2)`, `border-radius: 12px`, `padding: 16px 20px`, width **363**, x=128 y=1072. The words **"Virtual sessions are always available,"** and **"October 1st"** are `font-weight: 600`, burgundy `rgb(88,25,37)`. | a plain paragraph — no box, no bold, no burgundy |
| **"OFFICE" section header** | eyebrow `OFFICE` (12px, spruce `rgb(57,96,71)`, ls 3px, uppercase, w=61) followed on the same row by a **horizontal rule** — 1px tall, **1111px** wide, `rgba(23,39,64,0.1)` — filling the rest of the 1184px row. Container class `mt-24` (96px top margin). | eyebrow only, 455px wide block, no rule |
| **Map** | wrapped in a frame: `border-radius: 24px`, `border: 1px solid rgba(23,39,64,0.1)`, box **x=539, y=866, 773x388**; iframe 771x386 inside it | no frame; iframe x=635, 673x335 |
| **Office text column** | **363px** wide (paragraph, notice and address all 363) | 390–455px |
| **Address row** `3150 18th St…` | 363 wide, 46 tall, colour `rgb(23,39,64)` (full navy) | 455 wide, 81 tall, `rgba(23,39,64,0.8)` |
| **Appointment card description** "Choose a service, share a brief note…" | **one line**, 1102px wide, no max-width | `max-width: 680px`, wraps to 2 lines |
| **Intro paragraph** "I'm glad you're here…" | 18px / 29.25px, w=672, **4 lines** (h=117) | same font, **3 lines** (h=88) — check the copy against `qa/audit/live-copy/get-started.txt` and the wrap width |
| **Page left edge** | x=**128** | x=132 (4px off, all content) |

So the office section is a two-column grid: a 363px text column at x=128 and the framed map
starting at x=539. Live office grid top is `mt-24`.

## Task 2 — decorative leaves are ~20–25% too big

Skip if already fixed by brief 27. Measure first.

| route | leaf | live | ours (last measured) |
|---|---|---|---|
| about | CTA card leaf | **32x45** | 37x48 |
| modalities | CTA top-right | **83x107** | 103x122 |
| modalities | CTA bottom-left | **70x84** | 95x103 |

## Do not regress

- 1440 heights: home 9887 · about 3752 · cost 2447 · resources 3360 · modalities 3433 ·
  **get-started 1618** · adhd 3748 · multiculturalism 2556 · burnout 2194 · anxiety 2165 ·
  transitions 2146 · teens 2590 · privacy 2216
- 390 `scrollWidth` 390 (home 415); header correct at 767/768; footer correct.
- `node qa/tools/stuck.mjs http://localhost:4173/` → 0 stuck everywhere.

## Verification — Playwright only

After each task: `node --check page.js script.js icons.js`, re-measure the table rows above,
confirm get-started height is still 1618 at 1440. Then commit + push that task.
