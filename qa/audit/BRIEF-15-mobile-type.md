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

---

# Addendum — the last desktop item (anxiety-depression list)

Desktop is otherwise **complete**: all 13 routes match live's height exactly. This is the
only remaining desktop style delta, and it is a real visual difference.

The "How we work with it" outcome list on `/services/anxiety-depression` is missing its
**icon badges**, and we paint a sage tint behind the section that live does not have.

Live item markup:
```html
<div class="reveal flex items-center gap-3 rounded-2xl border border-border/70 bg-card/60 px-5 py-4">
  <span class="shrink-0 w-9 h-9 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-compass">…</svg>
  </span>
  <span class="text-midnight/80 leading-snug">Understand what's happening beneath the surface</span>
</div>
```

| property | value |
|---|---|
| grid | `456px 456px`, **gap 16px** (`grid sm:grid-cols-2 gap-4`) |
| item box | **456 x 78** |
| item background | `rgba(241,234,223,0.6)` — cream at 60%, **not** `rgba(249,247,244,0.6)` |
| item border | `1px solid rgba(215,204,188,0.7)` |
| item radius | **16px**, padding **16px 20px** |
| icon badge | `36x36`, radius 12px, background burgundy at 10%, icon colour burgundy |
| icon | **18x18** lucide, `viewBox="0 0 24 24"`, stroke-width 2, round caps/joins |
| label | `rgba(23,39,64,0.8)`, `leading-snug` |

Icons in order (all lucide):

1. `compass` — Understand what's happening beneath the surface
   `<path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/>`
2. `layers` — Recognize the patterns that keep you stuck
   `<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>`
3. `heart-handshake` — Respond to overwhelm without shutting down
   `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/>`
4. `brain` — Challenge thoughts that aren't serving you
   `<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/>`
5. `sparkles` — Reconnect with the things that matter to you
   `<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>`
6. `arrow-right` — Make changes that feel realistic, not overwhelming
   `<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`

Also **remove the sage/green section tint** we render behind this block — live's background
here is the plain cream page background. (I verified this on a screenshot, not just from
computed styles.)

Do this without changing the page height: anxiety currently matches live at 2165px exactly.
