# Fix brief 06 — content parity on the remaining seven routes

Ground truth: `https://kaurcounseling.net/`. Ours: `https://defeldman.github.io/kaur-counseling/`.

Brief 04 brought the six **service** pages to copy parity. This brief does the same for the
rest: `resources`, `home`, `about`, `cost`, `modalities`, `get-started`, `privacy`.

## Reference files

- **`qa/audit/copy-gaps.txt`** — the main input. For each route it lists, tag-free and
  de-duplicated:
  - `--- ON LIVE, MISSING FROM OURS ---` — text the live page renders that we do not.
  - `--- ON OURS, NOT ON LIVE ---` — text we render that live does not. Most of these are
    invented copy that should be **replaced by the live wording**, not simply deleted —
    check the live dump for what occupies that slot before removing anything.
- `qa/audit/live-copy/<route>.txt` — the full live page text in document order, with the
  element tag that renders each block. Use this to see where a missing block belongs.
- `qa/audit/gh-copy/<route>.txt` — the same dump from our deployed page.

## Size of the gap, worst first

| route | missing from ours | invented on ours |
|---|---|---|
| `about/resources` | **37** | 18 |
| `/` (home) | **23** | 6 |
| `about` | 14 | 16 |
| `about/cost` | 8 | 12 |
| `modalities` | 6 | 6 |
| `get-started` | 2 | 1 |
| `privacy` | 1 | 2 |

---

### `about/resources` — biggest gap

Two things are missing:

1. **The full text of Rumi's "The Guest House"** in the sage poem card. Live prints the
   whole poem, one line per `<p>`, beginning "Every morning a new arrival." / "A joy, a
   depression, a meanness," / "as an unexpected visitor." … through "…and invite them in." /
   "Be grateful for whoever comes," / "because each has been sent" / "as a guide from
   beyond." Attribution is `JALALUDDIN RUMI` with the credit line
   "Translated by Coleman Barks ·" and a link to **Scottish Poetry Library**.
   Exact line breaks are in `qa/audit/live-copy/resources.txt`.

2. **Three book sections with headings, intros and per-book descriptions**:
   - `RELATIONSHIPS` — intro "On attachment, communication, and the everyday work of
     staying close." Books include descriptions such as "A practical, accessible guide to
     adult attachment styles and how they shape our closest bonds.", "Research-grounded
     tools for friendship, conflict, and shared meaning.", "An honest, forward-looking guide
     for couples doing the work."
   - `PARENTING` — intro "On raising whole humans, and on tending yourself along the way."
     with descriptions "A research-based approach to discipline rooted in connection.",
     "Emotion-coaching for a child's inner world.", "An enduring classic on respectful
     communication with children."
   - `SELF-HELP` / trauma — "Gentle, honest reads for growth, meaning, and
     self-acceptance.", "On cultivating courage, compassion, and wholehearted living.",
     "On how the body and mind carry what happened, and the paths toward repair.",
     "A searing, hopeful memoir of living with and healing from complex PTSD.",
     "An indispensable introduction to IFS, meeting every part with curiosity."

   Our page currently renders the book titles without these descriptions and without the
   section intros. Reuse the existing `.book` grid markup so the styling carries over.

### `/` (home)

23 blocks missing. Work through the `home` section of `copy-gaps.txt` against
`live-copy/home.txt`. Note that several apparent gaps are our own markup splitting a block
differently — verify against the live dump before adding anything.

### `about`

Live's "A little more human" card grid has a **label plus a full paragraph** per card, and
our page has shorter or different text. Live labels include `First-gen Indian woman`,
`ADHD brain`, `Dog mom`, `Chocolate fiend`, `Duct tape & coffee`, each with its own
paragraph (e.g. "I believe dogs make almost everything better. Mine also makes sure I leave
the house, get some fresh air, and remember that a little bit of chaos is essential for a
well balanced life."). Live also has an `H2` **"How we'll work together"**. Exact text in
`live-copy/about.txt`.

### `about/cost`

Live has a **session-rate list** we are missing:
- `50-minute individual session — $250`
- `80-minute extended session — $400`
- `Couples and family sessions — $300 (50 minutes)`

plus the `THE INVESTMENT` eyebrow, the payment-details paragraph ("Payment is due at the
time of each session…"), the superbill paragraph ("I'm out-of-network with most insurance
plans…"), and the privacy rationale ("Choosing not to bill insurance means your diagnosis
and treatment stay between us…"). Use the live wording verbatim — these are the client's
actual published rates and terms, so accuracy matters.

### `modalities`

Live numbers its five frameworks `01`–`05` and titles them `Internal Family Systems`,
`Attachment`, `Cognitive Behavioral Therapy`, `Dialectical Behavior Therapy`, `Art`.
Live also closes with `Curious which lens fits your story?` and "We will find the right
shape together. Reach out for a free consultation and we'll begin the conversation."

### `get-started`, `privacy`

Near parity already (1–2 blocks each). Check `copy-gaps.txt` and close the remainder.
On `privacy`, confirm the three crisis resources read exactly:
- `988 Suicide & Crisis Lifeline. Call or text 988, 24/7.`
- `741741 Crisis Text Line. Text HOME to 741741, 24/7.`
- `911 for life-threatening emergencies.`

---

## Mandatory verification before you commit

A previous agent broke every page by putting an unescaped apostrophe inside a
single-quoted JavaScript string in `page.js`. Much of this brief's copy contains
apostrophes and curly quotes. So, before committing:

1. `node --check page.js` must exit clean.
2. Start `python3 -m http.server 4173` and confirm **all 13 routes** render their expected
   `H1` and body content — not a blank page.

Do not commit unless both pass.

## Scope

- Copy and markup only. Do not re-tune colours, sizes or spacing.
- Do not touch the header, footer, ticker, hero images, or the burgundy CTA card.
- Reuse existing class names so new content inherits the current styling.

## Deliverable

Commit to `main` and push. Report per route what you changed, and call out anything in
`copy-gaps.txt` you judged to be a dump artefact rather than a real difference.
