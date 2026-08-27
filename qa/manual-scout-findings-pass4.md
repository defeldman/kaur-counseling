# Manual visual-diff findings, pass 4 — live vs local, after `d7d2431` ("Refine pass three responsive fidelity")

Method: same as passes 1–3. This pass's tabs mostly landed matched at true phone width (484px), which was ideal
for re-verifying the sub-560px hero-art clamp fix, plus a broad sweep of `/about/resources` and the six service
detail pages that hadn't been individually re-checked since pass 1.

## Pass-3 fixes verified as working

- **Sub-560px hero art clamp.** Fixed. At vp=484px (matched on both tabs), measured `.hero-tree`: live 162px vs
  local 163px; `.hero-lavender`: live 270px vs local 276px. Both within ~2%, effectively pixel-matched — the
  `clamp(130px, 34.3vw, 198px)` / `clamp(212px, 57vw, 324px)` rule works as intended.
- **Desktop `.centered-intro h2` / `.modalities-intro h2` margin-top.** Confirmed fixed via source: the
  `min-width:801px` block now reads `margin:20px auto 0` and `margin-top:24px` respectively, matching live's
  pass-1 measurements exactly. (No matching live+local desktop viewport was available this pass to re-measure
  live directly, but the source values now match what pass 1 measured on live, and neither commit since has
  touched them.)

## NEW — MEDIUM: `/services/anxiety-depression` doesn't match live's content for this one page

This page is the outlier among the six service pages — the other five (ADHD, Burnout, Multiculturalism,
Transitions, Teens) all match live correctly on the two points below; only Anxiety & Depression differs.

1. **Wrong eyebrow label.** Live shows **"ALSO IN MY CARE"** above the "Anxiety & Depression." H1. Local shows
   **"SPECIALTY"** (confirmed: `page.js:128`, the hardcoded third argument to
   `service('Anxiety & Depression.', '', 'SPECIALTY', ...)`). Every other service page's eyebrow was spot-checked
   (ADHD, Burnout directly in earlier passes; Transitions confirmed this pass) and all correctly say
   "Specialty" on live — this one page is the sole exception.

2. **Extra/duplicate intro paragraph, and wrong emphasis styling.** Live's `/services/anxiety-depression` shows
   exactly **one** plain (non-italic) paragraph directly under the H1: "Anxiety and depression can look
   completely different, but both have a way of adding a layer to everyday life that can make everything feel
   harder than it should." Local shows that same sentence styled as an **italic spruce-green lede**, followed by
   a **second, separate paragraph** that doesn't appear anywhere on live at that position: "Anxiety can keep
   your mind running long after you want it to stop. Depression can make everything feel heavier in a different
   way. You don't have to figure out what is happening alone."
   - Root cause: `page.js`'s `service()` function (line ~154) has two separate hardcoded maps, `leads[title]`
     (rendered as the italic `.detail-lede`) and `heroBodies[title]` (rendered as an extra plain
     `.detail-hero-body` paragraph right after it) — see lines 156–163 and 165–172. For 'Anxiety & Depression.'
     these hold two different pieces of text, and only the `leads` one (shown as plain, not italic, and without
     a second paragraph after it) appears on live.
   - This two-paragraph `lede` + `heroBody` pattern is correct for ADHD and Burnout (verified in earlier passes —
     live genuinely shows a short italic tagline followed by a longer body paragraph on those two), so **don't
     remove the pattern globally** — just fix this one page's data: either drop the `heroBodies['Anxiety &
     Depression.']` entry so only the single (non-italicized) lede shows, or confirm against live whether the
     `leads` text should lose its italic styling here specifically. Multiculturalism/Transitions/Teens were not
     individually checked for this same two-paragraph question this pass — worth a quick look since they share
     the same `service()` codepath and also have `heroBodies` entries.

## Spot-checked this pass, no issues found

- `/about/resources` at matched phone width (484px) — heading, poem card, colors, wrapping all match live
  closely.
- `/services/adhd`, `/services/burnout`, `/services/transitions` eyebrows re-confirmed as "Specialty" on live,
  matching local.

## Still open / not tested this pass

- **Homepage hero container max-width** (`.hero-images{max-width:1200px}`) — still never re-measured against a
  matched desktop viewport across four passes now; this session's browser windows have not once given both tabs
  a matching desktop-width viewport. Someone with direct devtools access (not this browser-automation path)
  should give this one a clean look.
- **True sub-430px phone width** — still not available in this session's browser windows (this pass's narrowest
  was 484px again).
- `/services/multiculturalism` and `/services/teens` — not opened this pass; low risk given they share the exact
  same template as the five pages that do check out, but not independently confirmed.
