# Fix brief 18 — final desktop cleanup after the back links

Ground truth: `https://kaurcounseling.net/` at 1440x900.

Brief 17 fixed everything the user reported. Verified: the ticker now runs at **23 px/s**
on both sites, all three back links are present and positioned correctly, session rates is
a bulleted list, and the superbill paragraph is split. Good work.

Adding the back links shifted three routes. Current state:

```
home 9887/9887 ✓        modalities 3433/3433 ✓   get-started 1618/1618 ✓
adhd 3748/3748 ✓        multiculturalism 2556/2556 ✓   burnout 2194/2194 ✓
anxiety 2165/2165 ✓     transitions 2146/2146 ✓  teens 2590/2590 ✓
privacy 2216/2216 ✓     home/… 10 of 13 exact

about      3752 / 3776  (+24)
resources  3360 / 3384  (+24)
cost       2447 / 2457  (+10)   — plus 3 style deltas
```

---

## 1. Cost — session-rate list items are the wrong size and colour

The list is now correctly a bulleted list, but the items are styled as small muted text:

| | live | ours |
|---|---|---|
| font-size | **16px** | 15px |
| line-height | **26px** | 25.8px |
| colour | **`rgba(23,39,64,0.75)`** | `rgba(23,39,64,0.6)` |

They should read as ordinary body copy, same as the paragraphs around them.

## 2. Cost — the closing line is indented and too narrow

It is left-aligned now, but inset from the body column:

| | live | ours |
|---|---|---|
| `If this feels like the right place to begin…` | x=**384**, width **672** | x=424, width 560 |
| `Get Started` button | x=**384** | x=424 |

Both should sit flush with the body text at **x=384** and use the full **672px** measure —
the same column as `Choosing not to bill insurance…` directly above (live x=384, w=672).

## 3. The back links add ~24px too much space

The link itself is positioned correctly on all three routes; the gap **below** it is too
large, which pushes everything down.

**about** (+24 net): drift is `+14` by `Starting out` and `+10` more by the intro
paragraph, then holds. Live `Starting out` y=242, ours y=256.

**resources** (+24 net): `+11` by the intro, `+11` more by `Relationships`.
Live intro y=280, ours y=291.

**cost** (+10 net): `+17` by `Therapy is an investment…` (live y=851, ours y=868), then a
further `+30` into `Session rates` which is mostly cancelled by `-30` at `Payment details`
— so also check the space above and below the session-rate list.

Live's back-link block occupies from y=112 (about) / y=128 (cost, resources) to the start
of the hero. Match live's `margin-bottom` on the back link rather than adjusting the hero's
top padding, so the link stays where it is.

---

## Scope

- **Ten routes are pixel-exact — do not regress them.** Scope every change to the three
  affected routes.
- Do not touch the ticker, the nav, the footer, or anything brief 17 fixed.

## Verification

`node --check page.js` must pass, all 13 routes must render under
`python3 -m http.server 4173`, and you must report every route's `scrollHeight` at
1440x900. Targets:

home 9887 · about 3752 · cost 2447 · resources 3360 · modalities 3433 · get-started 1618 ·
adhd 3748 · multiculturalism 2556 · burnout 2194 · anxiety 2165 · transitions 2146 ·
teens 2590 · privacy 2216

## Deliverable

Commit to `main` and push. Report the measurement table.
