# Manual visual-diff findings, pass 3 — live vs local, after `0fc48bc` ("Fix pass two mobile fidelity findings")

Method: same as passes 1–2. This pass's browser windows mostly landed on true phone width (484px, below the
new 560px breakpoint) for one comparison, and separately gave local a genuine desktop width (~1493px) for a
source-level recheck of the still-open desktop items. Live never landed on a matching desktop width this pass,
so desktop-vs-desktop pixel comparison relies on pass 1's earlier measurements plus this pass's source diff.

## Pass-2 fixes verified as working

- **Mobile nav dropdown positioning (was CRITICAL).** Fixed. Re-tested at true phone width (484px): tapping the
  hamburger now opens a full-width panel spanning the viewport edge-to-edge with the list-style Home/About/
  Modalities/Contact/Services/Get-Started layout, matching live's structure — no more small floating box.
  `.site-header>.mobile-nav{position:absolute}` inside the `max-width:800px` block is doing its job.
- **Tablet-width hero image scaling (was HIGH).** Fixed for the 560–800px range — confirmed the new
  `min-width:560px and max-width:800px` rule exists and (per pass 2's diagnosis) uses `35vw`/`57vw`, which is
  fluid rather than fixed-pixel like before.

## New, smaller observation in the same area (worth a quick look, not urgent)

**Hero image sizing still slightly behind live in the upper end of the true-phone tier (~430–559px).** Below the
new 560px breakpoint, `.hero-tree`/`.hero-lavender` fall back to the original fixed pixel sizes (130px/212px
width), which don't scale at all across that whole sub-560px range. Measured at the two widths this pass
happened to land on:

| Viewport | Live tree width (% of vp) | Local tree width (% of vp) |
|---|---|---|
| 484px (live) / 538px (local) | 166px (34.3%) | 130px (24.2%, fixed) |

Live is fluid all the way down, so local's fixed value is closest to correct near the bottom of that range (true
phone, ~375–430px) and increasingly undersized as the viewport approaches 560px from below — the same shape of
issue as before, just confined to a narrower and lower-severity range now that the worse 560–800px case is
fixed. Low priority; only worth another intermediate breakpoint (e.g. `max-width:559px` split into two tiers) if
someone wants pixel-perfect fidelity across the whole phone range. Not re-verified at a true sub-430px width —
this session's windows never landed narrower than 484px.

**Unconfirmed, worth a spot-check:** immediately after opening the local mobile menu at 484px, one screenshot
showed the hero heading faintly visible "through" the "Get Started" pill button inside the open panel, while a
moment later (and in every other capture) the panel was fully opaque. This is most likely just the panel's
`opacity .2s` open transition caught mid-frame by the screenshot timing, not a real persistent transparency bug
— flagging only so a future pass can confirm the panel is fully opaque once settled (it appeared to be, in every
other check).

## Still open (confirmed via source, unaddressed by either fix commit)

- **`.centered-intro h2` / `.modalities-intro h2` desktop margin-top**, from pass 1. Grepped current
  `styles.css` directly this pass to confirm: the `min-width:801px` desktop override still sets
  `.centered-intro h2{margin:28px auto 0}` and `.modalities-intro h2{margin-top:32px}` — unchanged since pass 1,
  when live measured 20px and 24px respectively for "Two principles that guide every session." and "Three
  lenses, one gentle practice." That's still an 8px-too-much margin-top on both, at real desktop width.
- **Homepage hero container max-width** (`.hero-images{max-width:1200px}`) — still unconfirmed/unmeasured
  against a clean matched desktop viewport; carried forward from pass 1 as an open question, not re-investigated
  this pass either (no matching desktop viewport on both tabs was available).

## Spot-checked this pass, no issues found

- `/about/cost` at phone width (484px, live) — content, image, headings all match.
- Homepage and `/get-started` at desktop width (1493px, local only) — both render cleanly with no visible
  regressions from the two fix commits; reveal-on-load still works correctly at desktop width too.

## Not tested this pass

- A true sub-430px phone viewport (see hero-image note above).
- A matched live+local desktop viewport for the still-open margin-top items — numbers are carried forward from
  pass 1's measurements, not re-measured live this pass.
- The remaining service subpages (`multiculturalism`, `anxiety-depression`, `transitions`, `teens`) and
  `/about/resources` — not revisited this pass; no reason to expect regressions since neither fix commit touched
  their templates, but not independently reconfirmed.
