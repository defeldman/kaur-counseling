# Visual-fidelity audit tooling

Compares this site against the live original at `https://kaurcounseling.net/`.

## Setup

```bash
cd qa/tools
npm init -y && npm i playwright pixelmatch pngjs && npx playwright install chromium
```

## Capture first, then compare

```bash
node extract.mjs live desktop      # computed styles + geometry per text node
node extract.mjs gh   desktop
node capture.mjs live desktop      # full-page screenshots
node capture.mjs gh   desktop
```

Viewports: `desktop` (1440x900), `tablet` (768x1024), `mobile` (390x844).

## The comparators

| tool | finds |
|---|---|
| `cmp.mjs <vp> <route> style` | font, colour, size, line-height, letter-spacing, position deltas |
| `spacing.mjs <vp> <route> <px>` | where vertical rhythm drifts from live, and by how much |
| `presence.mjs <vp>` | elements present on live but **absent** here, and changed tags |
| `iconcmp.mjs <vp>` | SVG icons missing, wrong, or mis-positioned |
| `pixdiff.mjs <vp>` | whole-page pixel diff, with the worst 60px bands named |
| `sbs.mjs <vp> <route> <segH> <scale> <y0> <y1>` | side-by-side crops to eyeball |

Plus targeted probes: `speed3.mjs` (marquee velocity), `footer2.mjs`, `backlink.mjs`,
`secicons.mjs` (section heading badges), `iconinv2.mjs` (regenerates the live icon
inventory), `copytext.mjs` + `gapreport.sh` (copy parity), `hover.mjs`.

## Read this before trusting a clean report

- **`cmp.mjs` matches elements BY TEXT.** Anything absent on our side produces *no delta
  line at all*. Three missing "Back to" links and a whole set of icon badges survived
  twelve passes this way. Always run `presence.mjs` and `iconcmp.mjs` too.
- **`cmp.mjs`'s `bg` field reads only an element's OWN background**, not a parent band.
  Verify a background visually with `sbs.mjs` before concluding live doesn't have one.
- **`pixdiff.mjs` magnitude overstates severity when content is vertically offset.** A
  visually identical block shifted 35px can produce ~65,000 differing pixels. Use it to
  *locate* problems, not to score them.
- Page height matching proves nothing about icons — they sit inline and add no height.
- GitHub Pages lags 1–2 minutes behind a push. Confirm the deploy landed (curl the
  deployed asset and grep for a marker) before concluding a fix failed.

## Live reference data (in `qa/audit/`)

`live-icon-inventory.txt` — every icon on every live route: lucide name or raw paths, size,
position, colour, badge wrapper, and the adjacent text that locates it.
`live-copy/` — live page text per route. `*-deltas.txt`, `*-drift.txt` — latest reports.
