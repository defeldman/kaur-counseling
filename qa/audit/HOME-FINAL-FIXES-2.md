# Home — last residual differences (drift is already clean; these are what pilot still reports)

1. "What brings you through the door" h3: live markup is
   `What brings you through the<span class="italic text-burgundy"> door</span>` — move the space INSIDE the
   span (ours has it before the em). Line-height: 1.25 below 1024px, **36px at ≥1024** (lg:text-3xl's own).
2. Section eyebrow labels (People we serve, Modalities, and any other home label you made inline): the
   span's own line-height must be **16px** (text-xs) while the row stays 24px (the parent's line-height).
   Ours is 18px now.
3. Office notice paragraph (just below the hero, "A calm, private room in the heart of the Mission…"):
   ours has a `max-width:228px`; live has no max-width (width 236px at 390). Remove it; mirror live's
   flex layout so the text column is live's width.
4. Contact → Office block, at 768 (single column): live's left column is 296px tall, ours 323px:
   - the address link (3150 18th St, Suite 404, San Francisco, CA 94110 + icons) must be ONE line like live
     (live: `<a class="group text-sm text-midnight/80 leading-relaxed">address<span class="ml-1 inline-flex
     items-center text-burgundy …">icons</span></a>` inside `div.mt-8.flex.items-start.gap-3`) — ours wraps
     to 2 lines (48px). Match live's structure/icon sizes so it fits.
   - the phone link row: live `a.text-sm` → 14px/20px (no leading-relaxed) → 20px tall; ours 23px.
   - the map: use `aspect-ratio:16/10` (≥1024: 16/8) on the iframe like live instead of fixed heights.
5. Re-check "Mission." in that h3 at 768 (pilot says width 92 live vs 97 ours though markup matches) —
   compare with `PORT=4175 node boxdiff.mjs 768 ? "Mission." 3`; fix only if a real style differs.

Acceptance (from /Users/danielfeldman/.claude/jobs/6cdeaeba/tmp/verify): `node pilot.mjs 4175 ?` → height equal (±4) and differing=0 at 1440/768/390,
ignoring only the moving marquee line "Healing takes its own time…". Also drift clean, textdiff adds nothing,
braces OK, feathers match.
