# Manual visual-diff findings, pass 2 — live vs local, after `c45ebad` ("Implement manual scout fidelity fixes")

Method: same as pass 1 (`qa/manual-scout-findings.md`) — Chrome browser automation, side-by-side navigation of
https://kaurcounseling.net/ vs http://localhost:4173/, `getComputedStyle`/`getBoundingClientRect` extraction,
and screenshots. This pass's browser windows happened to land on a **matched, narrower viewport (~570–633px,
same "mobile" `max-width:800px` CSS tier on both sites)** rather than desktop — which, unlike pass 1, made a
real mobile/tablet-width comparison possible. Combined with re-checking the specific items from pass 1.

## Pass-1 fixes verified as working

- **Detail-page reveal-on-load (was CRITICAL).** Fixed. Re-tested `/about`, `/modalities`, `/privacy` with a
  fresh load and 2–3s wait, zero scrolling: content is fully visible immediately, no more indefinite
  near-zero-opacity stall. `script.js`'s added synchronous `getBoundingClientRect` check on top of the
  `IntersectionObserver` is working as intended.
- **About page "self love." emphasis color.** Fixed — renders plain navy on local now, matching live.
- **Modalities page top gradient accent bar.** Fixed — present and matches live's burgundy→purple→sage strip.
- **Modalities page "FIVE FRAMEWORKS" eyebrow.** Fixed — present above "Each one a different way of listening.",
  matches live.
- **Office notice / office copy / appointment-card heading tags and sizes** (`<h3>` instead of `<h2>`, correct
  px sizes) — fixed, confirmed via computed style at this viewport (all read identical live vs local: 20px/24px
  headings, matching tags).
- **Eyebrow color/size fix** — confirmed via computed style: "Welcome" (9.6px, spruce), "About Sohavani Mand"
  (12px, spruce), "People we serve" (12px, navy 60%) all now match live exactly, letter-spacing and margins
  included.
- **Modalities pill badge color** — re-examined side-by-side at matched viewport this time (pass 1 flagged this
  as low-confidence/unconfirmed). It's a **false alarm** — live's "MODALITIES" pill is the same solid dusty-mauve
  color as local's, not a subtle wash as the raw CSS alpha value suggested. No fix needed; TASKS.md's remaining
  open item can be closed.

## Still open from pass 1 (not addressed by `c45ebad`)

- **"Two principles that guide every session." and "Three lenses, one gentle practice." margin-top** — the fix
  commit didn't touch `.centered-intro h2{margin-top:26px}` or `.modalities-intro h2{margin-top:25px}` (styles.css
  lines 39/43 base rules). Pass 1 measured live's desktop margin-top as 20px and 24px respectively vs local's
  28px/32px at the time; not re-verified at desktop width this pass (this session's browser windows only landed
  on ~570–633px), but the source diff confirms these specific declarations are unchanged, so treat as still open.
- **Homepage hero container max-width** (`.hero-images{max-width:1200px}` vs live's apparently-wider container) —
  still unconfirmed/unmeasured at a clean matched desktop viewport. Not re-investigated this pass.

---

## NEW — CRITICAL: mobile nav dropdown renders as a small floating box instead of a full-width panel

**Where:** any page, any viewport ≤800px (the `max-width:800px` mobile header layout). Reproduced on the
homepage.

**Observed:** Tapping the hamburger icon does toggle the menu open/closed correctly (`site-header.menu-open` /
`body.menu-open` classes apply, `aria-expanded` updates) — but the panel only shows as a narrow ~165px-wide box
tucked under the hamburger icon on the right edge of the header, overlapping the hero image, with cramped nav
links. Live's equivalent panel spans the full viewport width edge-to-edge as a proper dropdown, with large
touch-friendly rows (Home / About / Modalities / Contact / Services / a full-width "Get Started" pill) and a
visible divider under the header.

**Root cause (confirmed via computed style):** `.mobile-nav` is supposed to get `position:absolute;left:0;
right:0` from its rule at `styles.css` line 53 (inside `@media (max-width:800px)`), which would make it a
full-width overlay. But a **later, equal-specificity rule at line 389** —
`.site-header>*{position:relative;z-index:1}` — wins the cascade by source order (both selectors have identical
specificity: one class), so `.mobile-nav` computes to `position:relative` instead. As a `position:relative` flex
child of `.site-header`'s flex row, it just sits inline after the hamburger button at its content width, instead
of overlaying the page.

Confirmed live via `getComputedStyle`: `position` was `"relative"`, `width` `"165.339px"` (content-sized), while
the intended `left:0;right:0` had no effect because they don't apply to `position:relative` in the way they do to
`position:absolute`.

**Suggested fix:** add a rule after line 389 (or otherwise win the cascade) restoring `.mobile-nav`'s intended
positioning, e.g. `.site-header>.mobile-nav{position:absolute}` (one extra class of specificity beats
`.site-header>*`), scoped inside the same `@media (max-width:800px)` block so it doesn't affect anything at
desktop width. Verify `.desktop-nav` (the other direct child affected by the same `.site-header>*` rule) still
looks correct after the fix — it likely relies on `position:relative` intentionally for its own `::after`
underline pseudo-element, so don't remove the general rule, just add a more specific override for `.mobile-nav`.

---

## NEW — HIGH: hero images render disproportionately small at tablet-ish widths (~500–800px)

**Where:** homepage hero, `max-width:800px` breakpoint.

**Observed (measured via `getBoundingClientRect`, live viewport 570px / local viewport 633px):**

| | Live (vp 570px) | Local (vp 633px) |
|---|---|---|
| Tree image width | 198px (**34.7%** of viewport) | 130px (**20.5%** of viewport) |
| Lavender image width | 324px (**56.8%** of viewport) | 212px (**33.5%** of viewport) |

Both sides position the lavender image flush to the right edge (~1–1.5% margin) at this width, so the
comparison is apples-to-apples as a share of viewport width — live's hero images take up roughly **60% more of
the screen**, proportionally, than local's at this width. This matches what the screenshots show directly: on
live the tree/lavender images look like a natural part of the hero; on local they look noticeably small,
floating in a lot of empty cream space around the hero card.

**Root cause:** `styles.css` only has two tiers for the hero images — a single `@media (max-width:800px)` block
with fixed pixel dimensions (`.hero-tree{width:130px;height:371px}` etc., evidently sized for a true phone width
around ~390px) and the desktop tier above 800px. There's no intermediate/fluid scaling for the wide range of
tablet-ish widths in between (~480–800px), so a phone-tuned fixed size gets used all the way up to 800px,
making the hero look undersized well before the breakpoint switches to desktop.

**Suggested fix:** either add an intermediate breakpoint (e.g. `min-width:560px` and `max-width:800px`) with
larger fixed hero image dimensions measured against live at a mid-tablet width, or switch the mobile hero image
sizing to viewport-relative units (`vw`/`%`) with `max-width` caps so it scales continuously between phone and
the 800px cutoff instead of jumping.

---

## Not (re-)tested this pass

- True small-phone width (~375–430px) — this session's windows landed on ~570–633px both times; the disproportion
  finding above should be re-checked at a true phone width too, in case the fixed pixel values are in fact
  correctly sized for ~390px and only wrong in the 480–800px middle range as diagnosed, vs. being wrong
  everywhere under 800px.
- Full re-sweep of all 13 routes — this pass focused on verifying the specific pass-1 fixes plus the two new
  issues found opportunistically at the matched mobile viewport. `/get-started`, `/services/*` pages were not
  re-screenshotted this pass; they share the same header/nav component as the homepage, so the mobile-nav bug
  above should reproduce there too, but wasn't independently confirmed on each route.
