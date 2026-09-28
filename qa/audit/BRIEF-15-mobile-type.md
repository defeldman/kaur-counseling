# Fix brief 15 — mobile (390px) typography and spacing

Ground truth: `https://kaurcounseling.net/` at a **390x844** viewport.

Desktop is done: 11 of 13 routes match live's page height exactly and style deltas are ~2.
Mobile has not had a typography pass — **324 style deltas and 3366px of total height
error** across the 13 routes.

Inputs:
- `qa/audit/mobile-style-deltas.txt` — per-route, per-element `property live->ours`
- `qa/audit/mobile-spacing-drift.txt` — per-route, where our vertical rhythm diverges

---

## The core mistake

Our `@media` blocks assume mobile needs a smaller type scale. **Live does the opposite:**
it keeps body copy at the *same* size as desktop and only reduces the display headings.

Our mobile override currently **shrinks body text** and **enlarges several headings**.

### Body text — live does NOT shrink it (139 of the 324 deltas)

| live (mobile) | ours (mobile) | count |
|---|---|---|
| `16px` | `14px` | **53** |
| `12px` | `10px` | **39** |
| `14px` | `13px` | 17 |
| `15.2px` | `14px` | 13 |
| `11.2px` | `9px` | 13 |
| `18px` | `16px` | 10 |

Live's mobile body paragraph set, measured on the homepage:

```
Inter 16px   / 26px     rgba(23,39,64,0.75)     ← default body
Inter 15.2px / 24.7px   rgba(23,39,64,0.75)
Inter 14px   / 22.75px  rgba(23,39,64,0.7)
Inter 12px   / 16px     rgba(57,96,71,0.6)
Fraunces 24px / 33px    rgb(57,96,71)           ← pull quote
```

These are the **same values as desktop**. The simplest correct fix is to stop overriding
body font sizes in the mobile media queries at all, then re-check.

### Headings — live's mobile sizes, measured

| element (homepage) | live | ours |
|---|---|---|
| `h1` "In-person & virtual therapy…" | **20px / 24px** | 20px / 21.6px |
| `h2` "Therapy rooted in…" | **36px / 45px** | 39px / 42.12px |
| `h3` "An office in the…" | 20px / 25px | 20px / 25px ✓ |
| `h3` "AD(H)D & Late-Stage Diagnosis" | **24px / 32px** | 24px / 25.92px |
| `h3` "What brings you through the door" | **24px / 30px** | 29px / 31.32px |
| `h3` "Collaboration" | **Fraunces 20px / 28px, weight 400** | **Inter 21px / 23.1px, weight 500** |
| `h3` "Who this room is for." | **30px / 37.5px** | **16.38px / 17.69px** ← badly broken |
| `h2` "Are we the right fit?" | **36px** | 42px / 45.36px |
| `h3` "Request an appointment" | 24px / 33px | 24px / 33px ✓ |

Two things to note:
- Ours computes line-heights from a **ratio (~1.08)**; live uses specific values
  (24px on 20px, 45px on 36px, 32px on 24px, 37.5px on 30px). Set them explicitly.
- `Collaboration` has the wrong **font family and weight** on mobile (Inter 500 vs
  Fraunces 400), and `Who this room is for.` is rendering at 16px where live is 30px —
  check what mobile rule is winning on those.

Other recurring heading deltas from the report: `24px->30px` (22x), `36px->43px` (18x),
`lh 33px->36px` (14x), `lh 37.8px->43px` (13x), `lh 45px->42.12px` (9x).

### Colours — the same baked-grey problem, still present in the mobile rules

Brief 01 replaced flat greys with the real navy/spruce blends, but the `@media` blocks
still carry old values:

| live | ours | count |
|---|---|---|
| `rgba(23,39,64,0.75)` | `rgba(23,39,64,0.7)` | **23** |
| `rgba(57,96,71,0.7)` | `rgb(119,128,121)` | **13** |
| `rgba(88,25,37,0.8)` | `rgb(57,96,71)` | **11** |

---

## Spacing

`qa/audit/mobile-spacing-drift.txt` shows where each route diverges. Height errors:

```
transitions +534   teens +585   resources +422   anxiety +419   cost +292
adhd +232   get-started +224   modalities +206   burnout +158
multiculturalism +144   privacy +112   home +38   about 0
```

Most of this should collapse once the type scale is right — fix typography first,
re-measure, then chase whatever spacing remains.

## One live quirk to preserve

Live's **mobile homepage has horizontal overflow**: at a 390px viewport its
`document.documentElement.scrollWidth` is **415px**. That is how live behaves and we should
match it rather than "fixing" it. Every other route is exactly 390px.

---

## Scope

- Mobile/tablet `@media` CSS only. **Do not change desktop** — 11 routes match live exactly
  at 1440px and must stay that way.
- The mobile nav (hamburger/X, `+` affordances, full-width button) was just fixed and is
  correct — leave it alone.

## Verification

- `node --check page.js` must pass and all 13 routes must render under
  `python3 -m http.server 4173`.
- Re-measure at **both** 390x844 and 1440x900. Desktop heights must still be:
  home 9887 · about 3752 · cost 2447 · resources 3360 · modalities 3433 · get-started 1618 ·
  adhd 3748 · multiculturalism 2556 · burnout 2194 · anxiety 2165 · transitions 2146 ·
  teens 2590 · privacy 2216
- Report mobile heights before/after.

## Deliverable

Commit to `main` and push. Report per section.
