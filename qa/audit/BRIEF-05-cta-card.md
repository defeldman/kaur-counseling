# Fix brief 05 — restore the burgundy closing CTA card (regression) + About page details

Ground truth: `https://kaurcounseling.net/`.

## 0. Read this first — brief 03 contained a mistake

Brief 03 §6 said the service-page closing pull quote had "NO background fill" and told you
to remove the burgundy block treatment. **That was wrong.** The measurement tool only reads
an element's *own* `background-color`; the burgundy comes from the parent card, which the
tool could not see. Live really does render a **rounded burgundy card**, and the repo's
previous behaviour was closer to correct than what is deployed now.

Current state on our service pages: plain italic text on cream, followed by an invented
"A PLACE TO BEGIN / Ready to start a conversation? / Reach out for a free consultation…"
section. Live has neither of those. Restore the card and delete the invented section.

---

## 1. Service pages — closing CTA card

Live markup (verbatim from `https://kaurcounseling.net/services/burnout`):

```html
<div class="relative rounded-3xl bg-burgundy text-cream px-8 py-12 lg:py-14 overflow-hidden">
  <svg viewBox="0 0 100 150"
       class="pointer-events-none absolute right-8 top-6 w-14 text-cream/15 -rotate-12"
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M50 16 C26 40 24 88 48 114"></path>
    <path d="M50 16 C74 40 76 88 52 114"></path>
    <path d="M48 114 C46 124 48 134 42 146"></path>
    <path d="M50 20 L49 112"></path>
    <path d="M50 42 L32 50"></path>
    <path d="M50 62 L28 74"></path>
    <path d="M50 82 L32 92"></path>
    <path d="M50 42 L68 50"></path>
    <path d="M50 62 L72 74"></path>
    <path d="M50 82 L68 92"></path>
  </svg>
  <p class="relative font-display text-2xl lg:text-3xl italic leading-snug max-w-2xl">…</p>
  <a class="relative mt-8 inline-flex items-center gap-2 bg-cream text-burgundy px-7 py-3.5
            rounded-full text-sm tracking-wide hover:bg-spruce hover:text-cream
            transition-colors duration-300" href="/get-started">Get Started
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right">
      <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
    </svg>
  </a>
</div>
```

Measured at 1440 wide:

| property | value |
|---|---|
| card box | x=256, w=**928**, h=**264** |
| background | `rgb(88,25,37)` |
| border-radius | **24px** |
| padding | **56px 32px** |
| quote `p` | Fraunces **italic 30px / 36px**, colour `rgb(241,234,223)`, `max-width: 42rem` |
| leaf svg | absolute, `right: 32px`, `top: 24px`, **56px** wide, `cream at 15% opacity`, rotated **-12deg** |
| button | bg `rgb(241,234,223)`, text `rgb(88,25,37)`, radius `9999px`, padding **14px 28px**, 14px / 20px, letter-spacing **0.35px**, height **48px**, `margin-top: 32px` |
| button hover | background → spruce `rgb(57,96,71)`, text → cream, 300ms |
| button icon | lucide `arrow-right`, 16x16, `viewBox="0 0 24 24"`, paths `M5 12h14` and `m12 5 7 7-7 7`, gap 8px |

The quote text is the **last sentences of the closing paragraph** — e.g. on Burnout,
"Recovery is not a project to optimize. It is a returning." (Brief 04 may have moved these
back into the body paragraph; on live they appear **only** inside this card, not in the
paragraph. Check what brief 04 left and make the result match live.)

**Also delete** the invented closing section on our service pages:
`A PLACE TO BEGIN` / `Ready to start a conversation?` /
`Reach out for a free consultation and we'll begin with wherever you are.` /
a `Get Started ↗` text link. Live has no such section — the burgundy card is the last thing
before the footer.

---

## 2. About page — same card, slightly different treatment

Live markup:

```html
<div class="reveal mt-20 rounded-[2rem] bg-burgundy text-cream p-10 lg:p-14 text-center">
  <svg viewBox="0 0 100 150" class="mx-auto w-7 text-cream/40 mb-6 -rotate-6" …>…</svg>
  <p class="font-display text-2xl lg:text-3xl italic leading-snug mb-8 max-w-2xl mx-auto">
    If this feels like the right place to begin, you don't have to figure it out alone.
  </p>
  <a class="inline-flex items-center gap-2 bg-cream text-burgundy px-7 py-3.5 rounded-full
            text-sm tracking-wide hover:bg-spruce hover:text-cream transition-colors
            duration-300" href="/get-started">Get Started</a>
</div>
```

Differences from the service-page card:

| property | value |
|---|---|
| card box | x=256, w=928, h=**330** |
| border-radius | **32px** |
| padding | **56px** (all sides) |
| alignment | **centred** |
| margin-top | 80px |
| leaf svg | **centred** (`margin: 0 auto`), **28px** wide, `cream at 40% opacity`, rotated **-6deg**, `margin-bottom: 24px` — *not* absolutely positioned |
| quote `p` | Fraunces italic 30px / 36px cream, centred, `max-width: 42rem`, `margin-bottom: 32px` |
| button | same as §1 but **no arrow icon** |

Ours currently renders that line as Inter 16px / 26px `rgba(23,39,64,0.7)` with a
burgundy-background button — i.e. the card is missing entirely and the button is inverted.

---

## 3. About page — two smaller misses

- `How I work` and `What therapy feels like` headings: live **`font-weight: 400`**,
  `line-height: 28px`. Ours: weight `500`, lh `24px`.
- The credentials list rows (`Licensed Marriage & Family Therapist (LMFT) · CA Lic. #…`,
  `Master's in Counseling, Sonoma State University`, `Six years in practice…`,
  `Specialties: …`, `Modality training: …`): live has
  **`background: rgba(57,96,71,0.05)`** on each row and `line-height: 20px`.
  Ours has no background and `line-height: 25.2px`.

---

## 4. Verify the ticker survived

Brief 02 built the marquee with the same feather SVG used above. Confirm it still renders
and animates (32s linear, seamless) after your changes — the leaf path data is shared.

---

## Scope

- Do not change the nav, footer, hero images, or the copy that brief 04 just corrected.
- Keep the reveal-on-scroll behaviour the About card has on live (`reveal` class).
- Verify locally with `python3 -m http.server 4173`.

## Deliverable

Commit to `main` and push. Report what you changed per section.
