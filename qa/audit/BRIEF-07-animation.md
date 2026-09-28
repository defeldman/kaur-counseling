# Fix brief 07 — animation and transition parity

Ground truth: `https://kaurcounseling.net/`.

Every value below was read out of the **live** page's computed styles and keyframe rules.
Our scroll-reveal system already matches live exactly (opacity 0 → 1, `translateY(24px)` → 0,
`opacity 0.9s ease-out, transform 0.9s ease-out`) — **do not change that**. The gaps are the
accordion, a set of timing functions, and the reveal stagger steps.

## Live keyframes (for reference — ours already match these three)

```css
@keyframes marquee    { 0% { transform: translate(0); }      100% { transform: translate(-50%); } }
@keyframes breathe-in { 0% { opacity:0; transform:scale(.98);} 100% { opacity:1; transform:scale(1);} }
@keyframes bounce     { 0%,100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(.8,0,1,1); }
                        50%     { transform: none;            animation-timing-function: cubic-bezier(0,0,.2,1); } }
```

Hero entrance delays on live — ours already match: left image `0s`, right image `0.15s`,
welcome card `0.3s`, scroll cue `0.5s`, all `breathe-in 1.2s ease-out forwards`.
Scroll-cue arrow: `bounce 1s ease infinite`. Marquee: `32s linear infinite`.

---

## 1. The "What brings you through the door" accordion has no animation at all

This is the biggest miss. Live animates the panel open and closed; ours snaps.

**Live panel:**
```
class="overflow-hidden transition-all duration-300 max-h-0"
overflow: hidden
max-height: 0px           (closed)  ->  a non-zero max-height when open
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

**Ours** (`.door-detail`): `display: none` → `display: block`, `overflow: visible`,
`max-height: none`, no transition. `display` is not animatable, so there is no open/close
motion whatsoever.

Rebuild it the live way: keep the panel in flow with `overflow: hidden` and animate
`max-height` (0 → large enough to fit the content) over `0.3s cubic-bezier(0.4,0,0.2,1)`.

While you are in there, two content details on that panel:

- Live's panel text is **italic** (`text-sm italic text-midnight/65 leading-relaxed`).
  Ours is `font-style: normal`. Size (14px) and colour (`rgba(23,39,64,0.65)`) already match.
- The "+" toggle rotates with `transition-transform duration-300` on live —
  i.e. `0.3s cubic-bezier(0.4,0,0.2,1)`. Ours uses `transform .2s ease`.

Live's check glyph path is `M5 13l4 4L19 7` at `stroke-width: 2.5` inside a `w-3 h-3`
(12x12) svg, in a `w-5 h-5` circle with `border-burgundy/60`. Ours uses `m5 12 4 4L19 6`.
Match live's path and stroke width.

---

## 2. Timing functions — ours use `ease` where live uses Tailwind's `cubic-bezier(0.4, 0, 0.2, 1)`

| what | live | ours |
|---|---|---|
| Site header | `all 0.5s cubic-bezier(.4,0,.2,1)` | `background, border-color 0.5s ease` |
| Nav dropdown menu | `all 0.2s cubic-bezier(.4,0,.2,1)` | `opacity, visibility, transform 0.2s ease` |
| Top-level nav links (colour) | `0.3s cubic-bezier(.4,0,.2,1)` | `0.3s ease` |
| Dropdown menu items (colour) | **`0.15s cubic-bezier(.4,0,.2,1)`** | `0.2s cubic-bezier(.4,0,.2,1)` |
| `.nav-cta` (background, colour) | `0.3s cubic-bezier(.4,0,.2,1)` | `0.3s ease` |
| `.text-link` arrow (transform) | `0.3s cubic-bezier(.4,0,.2,1)` | `0.2s ease` — **36 elements** |
| Chevron / toggle (transform) | `0.3s cubic-bezier(.4,0,.2,1)` | `0.2s ease` / `0.3s ease` |

The `.text-link` arrow is the most visible of these: every "Learn more" / "Learn more about
me" / "Explore all the modalities" link on the site slides its arrow on hover, and ours is
both faster and differently eased.

Ours also has a `transform 0.5s ease` transition on `.brand` that live does not have —
remove it.

---

## 3. `.office-notice` reveal duration

Ours: `opacity, transform 0.8s ease`. Every reveal on live is `0.9s ease-out`.
Bring it in line with the rest.

---

## 4. Reveal stagger steps

Live staggers reveals with these `transition-delay` values:
`0s, 0.08s, 0.12s, 0.15s, 0.16s, 0.24s, 0.32s, 0.36s`

Ours only ever uses `0s, 0.12s, 0.24s, 0.36s`. Live uses the finer `0.08 / 0.16 / 0.32`
steps for card grids (the "people we serve" cards and the modality cards use an 0.08s step)
and `0.15s` for the two-column about/hero split. Match the live delay on a per-section
basis — read it off the live page rather than guessing, e.g. in devtools or by fetching the
page and inspecting `getComputedStyle(el).transitionDelay` for each `.reveal`.

---

## 5. Redundant keyframes

Ours defines `breathe-in-card`, `breathe-in-cue` and `breathe-in-cue-fluid`, which are
`breathe-in` plus a `translateX(-50%)`. Live only has `breathe-in` — its card and cue are
centred by layout, not by a transform, which is why live's cue does not shift horizontally
as it fades in. If the extra keyframes are only compensating for a centring approach we no
longer need, collapse them into the single `breathe-in`. If removing them breaks centring,
leave them but make sure the visible motion (scale .98 → 1, opacity 0 → 1) is identical.

---

## Verification

- `node --check page.js` must pass, and all 13 routes must render under
  `python3 -m http.server 4173`.
- Open the homepage and confirm by eye: the hero images and card fade+scale in staggered,
  the scroll cue bounces continuously, the marquee scrolls seamlessly, sections fade and
  rise as you scroll, and **the door accordion now slides open and closed**.
- Respect `prefers-reduced-motion` if the repo already handles it — do not regress that.

## Deliverable

Commit to `main` and push. Report what you changed per section.
