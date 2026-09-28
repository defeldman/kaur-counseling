# Fix brief 03 — remaining per-element styling deltas

Ground truth: `https://kaurcounseling.net/`. Ours: `https://defeldman.github.io/kaur-counseling/`.
Measured headless at 1440x900. Detail: `qa/audit/desktop-style-deltas.txt`
(format `property live->ours`).

This is a **CSS-only** pass. Do not change copy or markup structure.

---

## 0. REGRESSION TO UNDO FIRST — footer meta columns

Brief 02 told you the footer must not wrap. **That instruction was wrong** and this pass
reverts it. Live *does* wrap these columns; they are narrow, letter-spaced, uppercase.

Live (exact, desktop 1440):

| field | x | w | h | size / line-height | letter-spacing | transform | colour |
|---|---|---|---|---|---|---|---|
| `Sohavani Mand, LMFT` | 128 | 150 | **56** (2 lines) | 18px / 28px | normal | none | `rgb(23,39,64)` |
| `CA Lic. #150884` | 290 | 118 | **32** (2 lines) | 12px / 16px | **2.4px** | **uppercase** | `rgb(88,25,37)` |
| `Kaur Counseling, Marriage & Family Therapy, Inc.` | 420 | 369 | **32** (2 lines) | 12px / 16px | **2.4px** | uppercase | `rgba(57,96,71,0.7)` |
| `415-930-5395` | 801 | 102 | **32** (2 lines) | 12px / 16px | **2.4px** | uppercase | `rgb(88,25,37)` |
| `Home` | 927 | 39 | 20 | 14px / 20px | normal | none | `rgba(23,39,64,0.6)` |
| `About` | 998 | 39 | 20 | — | — | — | — |
| `Services` | 1069 | 57 | 20 | — | — | — | — |
| `Contact` | 1159 | 52 | 20 | — | — | — | — |
| `Privacy & Disclaimer` | 1243 | **69** | **40** (2 lines) | 14px / 20px | normal | none | `rgba(23,39,64,0.6)` |

Ours currently forces every one of these onto a single line with `letter-spacing: normal`
and has lost `text-transform: uppercase` on the licence line. Restore the letter-spacing
and uppercase, and size the columns so they wrap exactly as the `w`/`h` above describe.
This applies on all 13 routes.

---

## 1. Cross-page — these repeat on most or all routes

- **`.back-link`** ("Back to Home", "Back to Services"): live `letter-spacing: normal`.
  Ours: `0.14px`.
- **`.button` / "Get Started" CTA**: live `line-height: 20px`, `letter-spacing: 0.35px`.
  Ours: `21px` / `normal`. Same for "Request Appointment" on the homepage.
- **Detail-page section `h2`**: live **`30px / 36px`**. Ours: `31px / 35.65px`.
  (Exception: the Cost page — see §3.)
- **Small eyebrow labels inside detail sections** — "What it is", "When & why I use it",
  "A little more human", "Five frameworks": live **`12px / 16px`**. Ours: `15px / 25.8px`.
  Letter-spacing live `2.64px` (modalities) / `3px` (about); ours `3.75px`.
  This is the single most visible remaining miss — ours renders them ~25% too large.
- **Detail card `h3`** ("Our first session", "How I show up", "We're a team"):
  live `line-height: 28px`. Ours: `21.6px`.
- **Detail card `p`**: live `line-height: 22.75px`. Ours: `23.1px`.
- **Section intro paragraphs** (homepage "The areas I've gone deepest in…",
  "Therapy doesn't always begin…", "Whoever you are, however you got here…",
  "No single approach fits every life…"): live **`rgba(23,39,64,0.7)`**, ours
  `rgba(23,39,64,0.6)`.

---

## 2. Homepage

- **`.pronunciation`** (`Kaur Counseling — "Kaur" is pronounced like "Core"`):
  live is **italic**. Ours is normal. (Size/colour are already correct: Inter 12px / 16px,
  `rgba(57,96,71,0.6)`.)
- **`Opens a secure scheduling window, no email form.`**: live `rgba(23,39,64,0.5)`,
  ours `rgba(23,39,64,0.7)`.
- **Office notice** — `Virtual sessions are always available,` and `October 1st` are
  **burgundy `rgb(88,25,37)`** on live. Ours renders them `rgba(23,39,64,0.8)`.
- Office address `3150 18th St, Suite 404, San Francisco, CA 94110`:
  live `line-height: 22.75px`, ours `20px`.

---

## 3. Cost page

- `h1` "The cost of individual therapy": live `letter-spacing: normal`, ours `-0.96px`.
- Lede "Private-pay, with a clear path to reimbursement.": live **`24px / 33px`**,
  ours `26px / 32.5px`.
- Section `h2`s ("Session rates", "Payment details", "A superbill for reimbursement",
  "Why pay out of pocket?"): live **`24px / 32px`** — *not* the 30px used elsewhere.
  Ours: `31px / 35.65px`.

---

## 4. About page

- "Starting out" eyebrow: live `letter-spacing: 3.6px`, ours `3px`.
- "What to expect" `h2`: live `30px / 36px`, ours `31px / 33.48px`.
- "Verified on Psychology Today": live **`11.2px / 16.8px`, `letter-spacing: 2.24px`**.
  Ours: `10px / 15px`, ls `2.5px`.
- Fact-grid `strong` ("First-gen Indian woman", "ADHD brain", "Dog mom",
  "Lifelong learner"): live **`font-weight: 400`**, `line-height: 28px`.
  Ours: weight `500`, lh `normal`.
- "A little more human" eyebrow: live `12px / 16px`, ls `3px`. Ours `15px / 25.8px`, ls `3.75px`.
- "A few things about me" `h2`: live `30px / 36px`, ours `31px / 35.65px`.

---

## 5. Modalities page

- **"What it is" eyebrow colour alternates per card on live** and ours paints them all
  spruce. Live values, in card order:
  - card 1 (Relational Therapy): `rgba(88,25,37,0.8)` — burgundy at 80%
  - card 2: `rgba(88,25,37,0.8)`
  - card 3 (Cognitive Behavioral Therapy): `rgba(108,50,133,0.85)` — **purple at 85%**
  - card 4 (Art): `rgba(88,25,37,0.8)`
  Ours renders every one `rgb(57,96,71)`.
- Card `h2`s ("Internal Family Systems", "Dialectical Behavior Therapy",
  "Cognitive Behavioral Therapy", "Art", "Attachment"): live `30px / 36px`,
  ours `31px / 35.65px`.
- "Get Started" CTA: live has background `rgb(241,234,223)` (cream); ours has none.

---

## 6. Service pages (adhd / burnout / anxiety-depression / transitions / teens / multiculturalism)

- **`h1` is italic on live** (e.g. `Burnout.`); ours renders it normal.
- Eyebrow ("Specialty"): live `line-height: 16px`, ours `14.5px`.
- Lede: live **`24px / 33px`**, ours `26px / 32.5px`.
- Section `h2`s: live `30px / 36px`, ours `31px / 35.65px`.
- Body `p`: live `line-height: 29.25px`, ours `29.16px`.
- **Closing pull quote** (e.g. "Recovery is not a project to optimize. It is a returning…"):
  live is **`30px / 36px` with NO background fill**. Ours renders it `26px / 32.5px` on a
  solid burgundy `rgb(88,25,37)` background. Remove the burgundy block treatment.
- **"Get Started" button colours are inverted**: live is **burgundy text `rgb(88,25,37)`
  on a cream `rgb(241,234,223)` background**. Ours is cream text on burgundy.

---

## Scope

- CSS only. Do not touch copy, markup, the nav, the ticker, or the hero images.
- Ignore any delta line where the quoted text is a bare `©` or `.` — those are artefacts of
  the comparison tool aligning an icon glyph against a text node, not real differences.
- Ignore the `x=` offsets on the marquee "Healing takes its own time…" spans; that is just
  animation phase at screenshot time.
- Verify locally with `python3 -m http.server 4173`.

## Deliverable

Commit to `main` and push. Report which numbered sections you completed.
