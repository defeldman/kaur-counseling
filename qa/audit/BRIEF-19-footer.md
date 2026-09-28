# Fix brief 19 — footer structure, alignment and spacing

Ground truth: `https://kaurcounseling.net/`. Reported by Daniel: *"the bottom footer bar
looks very different, spacing is better and alignment is better on kaurcounseling."*

He is right, and there are three separate problems. Measured at 1440x900 on `/privacy`
(the footer is identical on every route).

Live footer height **241px**; ours **266px**.

---

## 1. The legal text is mis-aligned — it juts 48px too far left

This is the most visible defect.

| | live | ours |
|---|---|---|
| `If you are in crisis, call or text …` | starts at **x=128** | starts at **x=80** |
| `© 2026 Sohavani Mand, LMFT. …` | starts at **x=128** | starts at **x=80** |
| brand row above | x=128 | x=128 |

On live every line in the footer aligns on the same left edge (x=128). Ours breaks that:
the two legal lines start 48px further left than everything above them.

**Cause (my mistake, correcting it here):** an earlier brief of mine told you the legal
strip's container is `x=80, w=1280`. That was the *container box* — live's container has
`padding: 0 48px`, so its **content** begins at x=128. The container should stay
`x=80, w=1280`; the **text inside it must be inset by the 48px padding**.

## 2. The top row should be flex `space-between`, not a fixed grid

Live groups the four meta items into **one flex container** and lets them sit naturally:

```
ROW0  display:flex  justify-content:space-between  align-items:center  gap:24px  padding:48px   h=152
   DIV  x=128 w=775 h=56   display:flex gap:12px   ← brand + licence + business + phone, one group
   DIV  x=927 w=385 h=40   display:flex gap:32px   ← Home About Services Contact Privacy & Disclaimer
```

Ours uses a five-column fixed grid with no gap:

```
ROW0  display:grid  grid-template-columns:150px 130px 381px 114px 409px  gap:0  padding:0   h=56
   DIV x=128 w=150  "Sohavani Mand, LMFT"
   DIV x=278 w=130  "CA Lic. #150884"
   DIV x=408 w=381  "Kaur Counseling, Marriage & Family Therapy, Inc."
   A   x=789 w=114  "415-930-5395"
   DIV x=927 w=385  nav links   (display:grid, gap:0)
```

The fixed columns are why the separators sit at slightly wrong intervals — our meta items
land at x=278/408/789 where live has them at roughly x=302/434/815 within a single
775px-wide flex group.

Rebuild row 0 as: a flex row, `justify-content: space-between`, `align-items: center`,
`gap: 24px`, `padding: 48px`, containing exactly **two** children —
a meta group (`display:flex; gap:12px`) and the nav group (`display:flex; gap:32px`).

## 3. Vertical rhythm — live uses three rows, we use two

Live:

```
ROW0  padding: 48px          h=152   (py-12 — the meta + nav row)
ROW1  padding: 0 48px 16px   h=32    (the crisis line)
ROW2  padding: 0 48px 40px   h=56    (the copyright line)
                             ---
                             241px
```

Ours:

```
.site-footer  padding: 49px 0 68px
ROW0 .footer-top     padding: 0   h=56
ROW1 .footer-bottom  margin-top: 47px   h=45   (both legal lines in one block)
                                        ---
                                        266px
```

Split the legal block into the two separate rows with live's padding, and move the vertical
padding onto the rows (as live does) rather than onto `.site-footer`. Row 0's own 48px
padding is what gives live its taller, more generous top row (152px vs our 56px).

## 4. Border colour

| | live | ours |
|---|---|---|
| `footer` border-top | **`rgb(215, 204, 188)`** | `rgba(24, 36, 58, 0.11)` |

---

## What is already correct — do not change it

The meta columns **do** wrap on live (`Sohavani Mand,` / `LMFT`, `CA LIC.` / `#150884`,
`415-930-` / `5395`, `Privacy &` / `Disclaimer`), they **are** uppercase with
`letter-spacing: 2.4px`, and the type sizes and colours all match live already. An earlier
brief of mine wrongly told you to stop that wrapping; it was corrected and is right now.
Keep it.

## Scope

- Footer only. Ten of thirteen routes are pixel-exact at 1440x900 — the footer is shared,
  so re-measure **every** route afterwards.
- Check the footer at 390px too; it must not regress.

## Verification

`node --check page.js` must pass and all 13 routes must render under
`python3 -m http.server 4173`. Then confirm:

- footer height **241px** at 1440x900
- every footer line's left edge at **x=128**
- row 0 is flex/space-between with a 775px meta group and a 385px nav group
- per-route `scrollHeight` at 1440x900: home 9887 · about 3752 · cost 2447 · resources 3360 ·
  modalities 3433 · get-started 1618 · adhd 3748 · multiculturalism 2556 · burnout 2194 ·
  anxiety 2165 · transitions 2146 · teens 2590 · privacy 2216

## Deliverable

Commit to `main` and push. Report the footer measurements and the per-route table.
