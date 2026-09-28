# Fix brief 04 — content parity on the six service pages

Ground truth: `https://kaurcounseling.net/`. Ours: `https://defeldman.github.io/kaur-counseling/`.

**This pass is about COPY, not CSS.** Several service pages in this repo contain paraphrased
or entirely invented text where the live site has specific wording. The live site is the
client's actual published copy — it must be reproduced verbatim.

## Reference files

- `qa/audit/live-copy/<route>.txt` — the **live** page's visible text, in document order,
  each block tagged with the element that renders it (`[H1]`, `[H2]`, `[P]`, `[LI]`,
  `[SPAN]`, `[A]`). This is the target.
- `qa/audit/gh-copy/<route>.txt` — the same dump taken from **our** deployed page, so you
  can see exactly what we currently render.

Diff them per route, e.g.
`diff <(sort qa/audit/live-copy/adhd.txt) <(sort qa/audit/gh-copy/adhd.txt)`.

Ignore these known dump artefacts — they are not real differences:
- `[A] ← Back to Services` / `[A] Get Started ↗` appearing only on our side (the dump
  picks up link text the live dump attributes elsewhere).
- Eyebrow labels showing as `[P] SPECIALTY` on our side vs `[SPAN] SPECIALTY` on live.
- A block appearing on one side split across two lines and on the other as one line.

## Routes and the size of the gap

| route | live-only blocks | notes |
|---|---|---|
| `services/adhd` | 36 | **worst** — whole card grids and a statistic block missing |
| `services/transitions` | 20 | card copy invented; a "Therapy can help you:" list is missing |
| `services/teens` | 20 | card copy differs |
| `services/multiculturalism` | 8 | **all five card paragraphs are invented** |
| `services/anxiety-depression` | 8 | card copy differs |
| `services/burnout` | 2 | closing paragraph truncated |

---

### `services/adhd` — largest gap

Live has three content blocks we are missing entirely:

1. **A six-card grid under "ADD in women looks different"**, each card a bold label plus a
   one-line description:
   - `Relationships` — "Rejection sensitivity, people-pleasing, losing the thread of what you wanted to say."
   - `Work & career` — "Capable and praised, then quietly drowning in the details no one sees."
   - `School & study` — "Bright enough to coast, until you couldn't, and the shame set in."
   - `Self-esteem` — "A running inner monologue of 'I should have been able to.'"
   - `Body & food` — "Forgetting to eat, then overeating; restless sleep; tension you can't name."
   - `Sex & intimacy` — "Distracted, disconnected, or running on high alert instead of ease."

2. **A six-card grid under "How it shows up"**:
   - `A thousand things at once` — "Ping-ponging between tasks, a mind juggling everything at the same time."
   - `Hyperfocus ↔ overwhelm` — "Swinging between deep fixation and flood." (note the ↔ character)
   - `Forgetfulness about what you love` — "Even the things and people that matter slip away."
   - `Time warps and vanishes` — "Hours pass like minutes, or crawl like days."
   - `The exhaustion of masking` — "Performing a version of yourself, all day."
   - `The intention-action gap` — "Knowing exactly what to do, wanting to do it, and feeling paralyzed even when you're smart enough to execute."

3. **A statistic callout**: a large `50%+` followed by
   "of adults with ADHD also live with anxiety or depression, and some struggle with both.
   You are not overreacting; you are responding to a lifetime of feeling unreliable in a
   world that demanded reliability."

Plus a second paragraph under "The grief, and the broken trust in yourself" beginning
"This fractured trust often creates a cycle of self-frustration…", and a four-item list
under "How we work with it". All exact wording is in `qa/audit/live-copy/adhd.txt`.

### `services/multiculturalism`

Every card paragraph on our page is invented. Replace all five with the live text from
`qa/audit/live-copy/multiculturalism.txt` (they begin "We explore how your race…",
"We gently trace the trauma…", "We make sense of a belonging…", "We tend to the strain…",
"We unpack the family pressures…"). Also restore the live intro paragraph beginning
"To live between cultures is to hold more than one home inside you…" and the closing line
"You do not have to compress yourself to be understood here."

### `services/transitions`

Our card copy is invented. Use the live text. Live also has a **"Therapy can help you:"**
section with four items: "Process your emotions", "Find clarity and direction",
"Build confidence in this next chapter", "Feel more grounded and supported", and a closing
line "You don't have to navigate this next chapter alone." Live's lede also emphasises the
word *difficult.* — preserve that emphasis.

### `services/teens`, `services/anxiety-depression`

Bring the card and section copy to the live wording per the dumps.

### `services/burnout`

Only one real gap: our closing paragraph is truncated. Live ends it
"…with permission to be a person rather than only a function. **Recovery is not a project
to optimize. It is a returning.**" We render the last two sentences as a separate pull
quote and drop them from the paragraph. Match live: the sentences belong at the end of that
paragraph. (Brief 03 already removed the burgundy block styling from the pull quote — check
what that left behind and make the result match live.)

---

## How to add the new blocks

Match the existing page structure and class names in this repo so the new content inherits
the styling already in `styles.css`. The card grids above should reuse the same markup our
other service pages already use for card grids. Do **not** invent new CSS unless a live
treatment genuinely has no local equivalent — and if you must, keep it minimal and scoped.

## Scope

- Copy/markup only. Do not re-tune colours, font sizes or spacing — brief 03 just did that
  pass and a separate pass will re-audit after this one.
- Do not touch the header, footer, ticker or hero images.
- Verify locally with `python3 -m http.server 4173` that all six routes still render.

## Deliverable

Commit to `main` and push. Report per route what you changed and anything you judged to be
a dump artefact rather than a real difference.
