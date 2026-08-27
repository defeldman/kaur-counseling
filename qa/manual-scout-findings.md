# Manual visual-diff findings — live (kaurcounseling.net) vs local static rebuild

Method: Chrome browser automation, side-by-side navigation of https://kaurcounseling.net/ (live, React/Vite SPA)
against http://localhost:4173/ (local static rebuild, served via `python3 -m http.server 4173`), using
screenshots, `getComputedStyle`/`getBoundingClientRect` extraction, and DOM text diffing. Desktop viewport only
(see "Not tested" section — this session's browser-automation window could not be resized to a mobile viewport,
so responsive/mobile behavior is unverified here).

Routes checked: `/`, `/about`, `/about/cost`, `/about/resources`, `/modalities`, `/get-started`, `/privacy`,
`/services/adhd`, `/services/burnout`. Routes not individually re-checked this pass (share the same
`page-service` template as `/services/adhd` and `/services/burnout`, and returned HTTP 200 live):
`/services/multiculturalism`, `/services/anxiety-depression`, `/services/transitions`, `/services/teens`.

Severity legend: **Critical** (breaks core UX), **High** (clearly visible, sitewide or on a key page),
**Medium** (visible on close inspection), **Low** (sub-pixel/negligible, optional polish).

---

## 1. CRITICAL — Detail-page content doesn't fade in on load without a scroll/interaction

**Pages:** every "detail" page tested — `/about`, `/about/cost`, `/about/resources`, `/modalities`,
`/get-started`, `/privacy`, `/services/adhd`, `/services/burnout` (8/8 reproduced). Homepage `/` is **not**
affected (its hero uses a plain CSS `@keyframes` animation and renders fine on load).

**Observed:** On the local site, the hero heading/eyebrow/lede and other `.scroll-reveal` elements stay stuck at
their initial (near-zero opacity, offset) state for 15–20+ seconds after page load with zero user interaction —
in several clean tests they never resolved even after a full, uninterrupted 18-second wait. As soon as *any*
scroll happens, the content in view snaps to fully visible instantly. On live, the equivalent content reliably
reaches full opacity on its own within roughly 5–18 seconds of load, with no scrolling required.

**Root cause hypothesis:** `script.js` lines ~78–94 set up a `.scroll-reveal` `IntersectionObserver` with
`{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' }` and add `is-visible` only from the observer's callback.
Per spec this should fire once immediately on `observe()` for elements already in the viewport, so it may be
sensitive to tab-visibility/background throttling in a way the live implementation isn't (no JS console errors
were present — this isn't a script crash).

**Suggested fix:** After calling `observer.observe(element)` in the `scrollRevealTargets.forEach` loop, also do
an immediate synchronous check (e.g. `element.getBoundingClientRect()` against `window.innerHeight`) and add
`is-visible` directly for anything already on-screen, instead of relying solely on the observer callback firing
promptly. This makes the reveal robust regardless of throttling.

**Caveat:** tested via an automated Chrome extension controlling two background tabs; some contribution from tab
backgrounding/throttling can't be fully ruled out. But the live tab consistently resolved under the *same*
conditions where the local tab consistently did not, repeated across 8 separate page loads — treat this as a
verified, reproducible difference, but the fixer should also sanity-check in a normal foregrounded tab.

---

## 2. HIGH — Eyebrow label color/size wrong on 5 of 7 homepage sections (sitewide pattern)

The generic `.eyebrow` base rule (`styles.css` line 18) is:
`font-size:11px; letter-spacing:.31em; color:#596c64`

Live's actual eyebrow styling is **not uniform gray** — it's `font-size:12px` (9.6px specifically inside the
hero card), `letter-spacing:.25em` (~3px), and the **color varies by section**, mostly spruce green:

| Eyebrow text | Location (`index.html`) | Live: size / tracking / color | Local: size / tracking / color | Status |
|---|---|---|---|---|
| "Welcome" | line 87, `.hero-card .eyebrow` | 9.6px / 2.4px / `rgb(57,96,71)` spruce | 11px / 3.41px / `rgb(89,108,100)` gray | **wrong** |
| "About Sohavani Mand" | line 117, `.about-intro` | 12px / 3px / spruce | 11px / 3.41px / gray | **wrong** |
| "Our Approach" | line 203, `.centered-intro` | 12px / 3px / burgundy `rgb(88,25,37)` | 12px / 3px / burgundy | ✅ already correct (existing override) |
| "People we serve" | line 230, `.people-intro` | 12px / 3px / navy 60% `rgba(23,39,64,.6)` | 11px / 3.41px / gray | **wrong** |
| "Modalities" | line 261, `.modalities-intro` | 12px / 3px / burgundy 80% | 12px / 3px / burgundy 80% | ✅ already correct |
| "Contact" | line 277, `.contact-main` | 12px / 3px / spruce | 11px / 3.41px / gray | **wrong** |
| "What happens next" | line 290, `.contact-aside` | 12px / 2.4px / spruce | 11px / 3.41px / gray (inferred, no override exists in CSS) | **wrong** |
| "Office" | line 310, `.office-copy` | 12px / 3px / spruce | 11px / 3.41px / gray (inferred, no override exists) | **wrong** |

**Suggested fix:** change the base `.eyebrow` rule to `font-size:12px; letter-spacing:.25em; color:var(--spruce)`
(spruce is the common case), keep the existing `.centered-intro>.eyebrow` and `.modalities-intro>.eyebrow`
burgundy overrides as-is, add a new override for `.people-intro>.eyebrow{color:rgba(23,39,64,.6)}`, and give
`.hero-card .eyebrow` its own smaller `font-size:9.6px` (in addition to its existing `margin-bottom:17px`).

---

## 3. MEDIUM — Several homepage headings off by a few px in size/margin, or wrong tag

All confirmed via matched-text `getComputedStyle` extraction on both sites (same viewport session):

| Heading text | `index.html` line | Live | Local | Diff |
|---|---|---|---|---|
| "An office in the Mission · with parking." | 103, `.notice-copy h2` | `<h3>`, 20px, margin 0/0 | `<h2>`, 22px, margin 0/**4px** | wrong tag, +2px size, +4px margin-bottom |
| "Two principles that guide every session." | 204, `.approach-section h2` | 48px, margin-top **20px** | 48px, margin-top **28px** | +8px margin-top |
| "Three lenses, one gentle practice." | 262, `.modalities-section h2` | 48px, margin-top **24px** | 48px, margin-top **32px** | +8px margin-top |
| "Request an appointment" | 281, `.appointment-card h3` | 24px | 26px | +2px size |
| "A room in the Mission." | 311, `.office-copy h2` | `<h3>`, 30px | `<h2>`, 32px, margin-top 39px | wrong tag, +2px size |
| "Are we the right fit?" | 278 | 48px, margin-top 24px | 49px, margin-top 27px | +1px size, +3px margin (low priority) |
| Person-card names (Women / People of Color / Men / Teens Coming of Age / LGBTQ+ Community) | ~230s, `.person-card h3` | 30px | 31px | +1px (low priority, likely rounding) |

Note: `.detail-hero h1`, `.notice-copy h2`, and `.office-copy h2` currently use heading tags that don't match
live's actual tag (`h2` locally vs `h3` on live for two of these) — worth checking whether live intentionally
demotes these to `h3` for document-outline reasons; if so, match the tag as well as the size.

---

## 4. MEDIUM — About page hero: "self love." should NOT be colored burgundy (unlike every other detail page)

`index.html`'s About-page hero heading uses `<em>` for emphasis, and the shared rule
`.detail-hero h1 em{color:var(--burgundy)}` colors it burgundy. This is correct on `/get-started`
("*right fit?*"), `/about/resources` ("*the curious and healing.*"), and presumably the service pages — but
**live's `/about` page renders "self love." in the same plain navy as the rest of the heading, with no color
emphasis at all**, while local renders "self" and "love." in burgundy.

**Suggested fix:** scope an override for the About page specifically, e.g.
`.page-about .detail-hero h1 em{color:inherit}` (verify against the actual `.page-about` class already used
elsewhere in `styles.css`).

---

## 5. MEDIUM — Modalities page: missing top gradient accent bar

Live's `/modalities` page has a thin (~4–6px) horizontal gradient strip pinned to the very top edge of the
viewport: burgundy → purple/accent → sage green (left to right), sitting above the header. Local has no such
element — plain cream background at the very top. Only checked on the Modalities page this pass; worth
verifying whether this bar is Modalities-specific or should appear on other detail pages too (it was not
observed on the homepage screenshots).

---

## 6. MEDIUM — Modalities page: missing "FIVE FRAMEWORKS" eyebrow

Live shows a small-caps "FIVE FRAMEWORKS" eyebrow label directly above the "Each one a different way of
listening." heading (the second intro block on `/modalities`, above the per-framework list). Local jumps
straight from blank space to the heading with no eyebrow text at all — this looks like a missing/omitted
element rather than a styling issue.

---

## 7. LOW — Modalities "MODALITIES" pill badge looks more solid/opaque than intended

CSS gives `.page-modalities .detail-hero .eyebrow` a `background:rgba(112,64,138,.08)` (a very light purple
wash). In the rendered screenshot the local pill reads as a fairly solid gray-mauve chip rather than a subtle
tint — worth a side-by-side zoom comparison against live to confirm whether this is a real discrepancy or just
screenshot/JPEG compression making a light tint look more saturated.

---

## Not tested / out of scope this pass

- **Mobile / responsive viewports.** The browser-automation window in this session could not be resized below
  its default size (`resize_window` calls reported success but `window.innerWidth` never changed, confirmed
  stuck at ~1456–1618px across multiple attempts down to a requested 390×844). Local `styles.css` already
  contains `@media` rules with decimal-pixel values that look like they were measured against the live mobile
  layout (per `TASKS.md`'s pass history), but none of that was re-verified visually in this session.
- Hover states, nav dropdown (About/Services) open/close behavior, and keyboard focus states were not
  re-verified this pass (TASKS.md indicates these were checked in earlier passes).
- `/services/multiculturalism`, `/services/anxiety-depression`, `/services/transitions`, `/services/teens` were
  confirmed to exist (HTTP 200 live, template match on `/services/adhd` and `/services/burnout`) but not
  individually screenshot-compared.
- The homepage hero container width (`.hero-images{max-width:1200px}` locally) appeared visually narrower than
  live's equivalent when eyeballed early in this session, but the two browser windows could not be forced to
  the same viewport width to get a clean pixel measurement — flagged here as **unconfirmed**, worth a follow-up
  check with matched viewports rather than acting on it directly.
- The hidden `#privacy` note modal on the homepage (`index.html` line 335, `hidden` attribute) was checked and
  is correctly non-visible/non-issue — noted only because it showed up as a false positive in an early
  heading-tag scan.

## Everything else checked and matching

Homepage section order/structure, most heading font sizes (H1/H2/H3 base sizes), hero card background
(`rgba(255,255,255,.8)` with `backdrop-filter:blur(12px)`, confirmed identical), header/nav CTA pill button
styling (14px, not uppercase, `border-radius:999px`, confirmed identical), body copy, all 13 routes resolving
with matching headings/copy/images where checked, and the "Our Approach"/"Modalities" eyebrow color overrides
already match live exactly.
