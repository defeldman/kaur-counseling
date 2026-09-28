# Fix brief 11 — two missing burgundy blocks + last style deltas

Ground truth: `https://kaurcounseling.net/`. Measurements: `qa/audit/desktop-style-deltas.txt`.

Style deltas are down to **17** across all 13 routes. Brief 10's modalities card grid came
out exact (576x583 card, 40px padding, 24px radius, `576px 576px` / 32px gap — all match
live). Two burgundy blocks are still missing, and they account for most of the remaining
height error.

---

## 1. Modalities closing CTA card is missing (−334px on this route)

Live ends `/modalities` with a centred burgundy card. We render only a bare spruce italic
heading on cream — no card, no body copy, no button.

```html
<div class="relative rounded-3xl bg-burgundy text-cream px-8 py-14 lg:py-20 text-center reveal overflow-hidden">
  <!-- leaf 1: top right -->
  <svg viewBox="0 0 100 150" class="pointer-events-none absolute right-8 top-8 w-16 text-cream/15 -rotate-12" …/>
  <!-- leaf 2: bottom left -->
  <svg viewBox="0 0 100 150" class="pointer-events-none absolute left-10 bottom-6 w-12 text-cream/10 rotate-[20deg]" …/>
  <h2 class="relative font-display text-3xl lg:text-4xl leading-tight">Curious which lens<span class="italic text-cream/80"> fits your story?</span></h2>
  <p class="relative mt-6 text-cream/80 leading-relaxed max-w-xl mx-auto">We will find the right shape together. Reach out for a free consultation and we'll begin the conversation.</p>
  <a class="relative mt-10 inline-flex items-center gap-2 text-sm text-burgundy bg-cream px-7 py-3.5 rounded-full hover:bg-spruce hover:text-cream transition-colors duration-300" href="/get-started">Get Started …</a>
</div>
```

Measured:

| property | value |
|---|---|
| box | x=256, w=**928**, h=**364** |
| background | `rgb(88,25,37)`, radius **24px** |
| padding | **80px 32px** (`px-8 py-14 lg:py-20`) |
| text-align | **center** |
| `h2` | Fraunces **36px / 40px**, `rgb(241,234,223)`; the trailing `fits your story?` is a `<span class="italic text-cream/80">` |
| `p` | Inter **16px / 26px**, `rgba(241,234,223,0.8)`, `max-width: 36rem`, centred, `margin-top: 24px` |
| button | cream bg, burgundy text, `padding: 14px 28px`, radius 9999px, 14px / 20px, `margin-top: 40px`, hover → spruce bg + cream text, 300ms |

Both leaves are the same feather SVG already used by the ticker / service CTA card — reuse
the shared helper. **Leaf 1:** `right: 32px; top: 32px; width: 64px; cream at 15%;
rotate -12deg`. **Leaf 2:** `left: 40px; bottom: 24px; width: 48px; cream at 10%;
rotate 20deg`.

## 2. ADHD `50%+` statistic block is missing its burgundy treatment

We render it as plain Inter 16px navy body text. Live is a burgundy card:

```html
<div class="relative rounded-3xl bg-burgundy text-cream px-8 py-12 lg:py-14 overflow-hidden">
  <svg viewBox="0 0 100 150" class="pointer-events-none absolute right-8 top-6 w-14 text-cream/15 -rotate-12" …/>
  <p class="relative font-display text-5xl lg:text-6xl leading-none">50%+</p>
  <p class="relative mt-4 text-lg text-cream/85 leading-relaxed max-w-xl">of adults with ADHD also live with anxiety or depression, …</p>
</div>
```

| property | value |
|---|---|
| box | x=256, w=**928**, h=**276** |
| background | `rgb(88,25,37)`, radius **24px** |
| padding | **56px 32px** |
| text-align | **left** (not centred) |
| `50%+` | Fraunces **60px / 60px**, `rgb(241,234,223)`, weight 400 |
| body | **18px / 29.25px**, `rgba(241,234,223,0.85)`, `max-width: 36rem`, `margin-top: 16px` |
| leaf | `right: 32px; top: 24px; width: 56px; cream at 15%; rotate -12deg` |

---

## 3. Remaining style deltas (17 total)

**transitions** — "Therapy can help you:" list items (`Process your emotions`,
`Find clarity and direction`, `Build confidence in this next chapter`,
`Feel more grounded and supported`): live **Fraunces 18px / 24.75px**; ours Inter 16px / 24px.
Brief 10 §4 asked for this and it did not land — check what selector is winning.

**teens** — same list treatment for `A space that's just yours`, `Tools for the pressure`,
`Words for what you feel`, `A safe adult outside your family`.

**adhd** — "How we work with it" list items (`Honor your gifts: creativity, intensity,
range.`, `Tend the costs of pretending.`, …): live **line-height 26px**,
`rgba(23,39,64,0.8)`; ours 24px, solid `rgb(23,39,64)`.

**resources** — closing line `Want more? I'm always adding to this list. Bring what you're
reading…`: live **Fraunces italic 24px / 33px**, spruce `rgb(57,96,71)`; ours Inter 16px /
26px `rgba(23,39,64,0.7)`.

## 4. Remove the `.text-link` arrow hover slide

Our `.text-link:hover span { transform: translateX(4px) }` has no counterpart on live —
I checked the live arrow's computed transform at rest and on hover and it is `none` in both
states. (An earlier brief of mine wrongly told you live animated this; it does not.)
Colour still changes burgundy → spruce on hover, which is correct and should stay.

---

## Scope

- Do not touch the nav, footer, ticker, hero images, the service/about CTA cards, or the
  modalities card grid you just built.
- Where this brief and live disagree, follow live and say so.

## Verification

`node --check page.js` must pass and all 13 routes must render under
`python3 -m http.server 4173`. After your change the modalities page should be close to
**3433px** tall and adhd close to **3748px** at a 1440x900 viewport.

## Deliverable

Commit to `main` and push. Report per section.
