# Fix brief 14 — adhd closing section + last two spacing drifts

Ground truth: `https://kaurcounseling.net/`.

**The desktop audit is essentially complete.** 11 of 13 routes now match live's page height
*exactly* (0px difference), and style deltas across all 13 routes are down to 2. This brief
clears the last items.

Current state at 1440x900 (`live` vs `ours`):

```
home 9887/9887 ✓   cost 2447/2447 ✓   resources 3360/3360 ✓   modalities 3433/3433 ✓
get-started 1618/1618 ✓   adhd 3748/3748 ✓   multiculturalism 2556/2556 ✓
burnout 2194/2194 ✓   transitions 2146/2146 ✓   teens 2590/2590 ✓   privacy 2216/2216 ✓
about 3752/3741 (-11)   anxiety 2165/2168 (+3)
```

---

## 1. ADHD's closing section must NOT be a burgundy card

This is the only remaining visible difference on desktop.

We wrapped the adhd closing line in a burgundy CTA card. **Live does not.** I checked every
route: the burgundy closing card appears on `multiculturalism`, `burnout`,
`anxiety-depression`, `transitions`, `teens`, `about` and `modalities` — but **not** on
`adhd`, `cost` or `resources`.

(ADHD *does* have a burgundy card — the `50%+` statistic block mid-page, h=276, which you
added in brief 11 and which is correct. Leave that alone. It is the *closing* section that
must not be a card.)

Live's adhd closing, on the plain cream background:

| element | live |
|---|---|
| `You are not a problem to be fixed. You are a person learning to live well with yourself.` | Fraunces **italic 20px / 27.5px**, spruce `rgb(57,96,71)` |
| `Get Started →` button | background **burgundy `rgb(88,25,37)`**, text **cream `rgb(241,234,223)`** — i.e. the normal button, not the inverted cream-on-burgundy one |

Ours currently renders that line at 30px / 36px in cream inside a burgundy card, with an
inverted cream-background button.

`cost` and `resources` likewise end with a normal burgundy-background button and no card —
verify those are already right after your change.

## 2. `about` — −11px net

`qa/audit/spacing-drift.txt` shows the points. The notable ones:

| live y | our y | local change | at |
|---|---|---|---|
| 554 | 546 | **−18** | `Sessions` |
| 1178 | 1160 | **−18** | `A little more human` |
| 1398 | 1399 | **+19** | `First-gen Indian woman` |
| 1434 | 1446 | +11 | card body text |

So the `Sessions` row and the `A little more human` section each sit 18px high, and the
card grid then runs 19px long. Net −11px.

## 3. `anxiety-depression` — +3px net

| live y | our y | local change | at |
|---|---|---|---|
| 1108 | 1156 | **+56** | `How we work with it` |
| 1279 | 1311 | −30 | `Understand what's happening beneath the surface` |
| 1290 | 1333 | +11 | `Recognize the patterns that keep you stuck` |

The `How we work with it` section starts 56px too low and the list that follows is too
tight, roughly cancelling out. Fix both rather than leaving them to offset each other.

---

## Scope

- Do not touch anything that currently matches — 11 routes are at exact parity and a
  careless global spacing change will break them.
- Re-measure every route after your change.

## Verification

`node --check page.js` must pass, all 13 routes must render under
`python3 -m http.server 4173`, and **every** route's `scrollHeight` at 1440x900 must be
within a few px of the live values listed at the top — including the eleven that are
already exact.

## Deliverable

Commit to `main` and push. Report the per-route before/after heights.
