# Home — final small fixes (all sections are rebuilt; these are the last differences)

## 1. Eyebrow labels must be INLINE spans like live (causes 8px per section)
Live's small uppercase labels are `<span>`s that sit INLINE inside a block parent, e.g.
`<div class="max-w-2xl reveal"><span class="text-xs uppercase tracking-[0.25em] …">People we serve</span><h3 class="mt-4 …">`.
Because the span is inline, its line box takes the parent's line-height (24px), so the label row is 24px tall
with the 12px text vertically centred. Ours are block `<p class="eyebrow">` with line-height 16px → each label
row is 8px shorter and the text sits ~5px higher. Measured at 1440: People intro 152px vs live 160px;
Modalities intro 220px vs 228px. Fix: in the People-we-serve and Modalities intros make the label an inline
`<span>` (not display:block; no own line-height override that changes the line box) exactly like live, so the
row is 24px. Then check EVERY other home section's label the same way against live with
`PORT=4175 node boxdiff.mjs 1440 ? "<label text>" 3` (About Sohavani Mand, Our Approach, Contact, Office,
What happens next, Welcome): the label's y and its parent's height must match live.

## 2. Office notice (just below the hero) — 768px wrap
Live (skeleton lines 54–67): card `flex flex-col md:flex-row md:items-center md:justify-between gap-5`;
inside, `div.flex.items-start.gap-4` (16px gap) with the 40×40 icon circle (`mt-0.5`) and the text div.
Ours uses a grid with 20px column gap, so the text column is 4px narrower at 768 and "· with parking."
drops to its own line (live: the h3 is 226px wide and wraps after "· with"). Mirror live's flex structure
and gaps. The h3 is `An office in the<span class="italic clay"> Mission</span><span class="midnight"> · with parking.</span>`
— spaces INSIDE the spans like live.

## Acceptance
From /Users/danielfeldman/.claude/jobs/6cdeaeba/tmp/verify: `node drift.mjs 4175 ? 390`, `768`, `1440` must print NO lines except the marquee ("Healing takes
its own time…", which moves — ignore it). `node pilot.mjs 4175 ?` should then show height equal and
differing≈0 at all widths (ignore the moving marquee text). textdiff must not add differences; braces OK;
feathers still match.
