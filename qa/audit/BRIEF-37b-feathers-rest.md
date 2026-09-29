# Fix brief 37b — the remaining wrong feathers (same branch, fix/feathers)

Follow-up to BRIEF-37. The CSS leaf is gone (verified: 0 at 1440/768/390) and the /about and
/modalities heroes match. The full inventory of this branch vs live is in
`qa/audit/feathers-wt-{1440,768,390}.txt` (`L` live, `O` ours; `w=` is the CSS width, `rot=` the
CSS rotation; the rendered box is the NxN before it). Live's Tailwind classes for each feather
are in `qa/audit/feathers-1440.txt`'s source run — or read them from live with Playwright
(`svg[viewBox="0 0 100 150"]`, `getAttribute('class')`). Match every feather's **CSS width,
rotation, colour/opacity and position** at 1440, 768 and 390. Commit each task separately,
push the branch. Serve this worktree on port 4174 (4173 is another agent's).

## Task 1 — feathers stuck at the top of the page (visible bug)
`/services/transitions` and `/services/teens`: the list feather (live: `pointer-events-none absolute
-right-4 -top-3 w-14 text-spruce/20 rotate-[22deg]`, 56px, 22°, next to the "Therapy can help you:" /
"What you get here:" list) renders at page y≈−19 in ours — its positioned ancestor is wrong. Put it
inside the list block with that block `position:relative`, like live.

## Task 2 — wrong size / missing rotation / wrong colour
An earlier agent set the CSS width to the rendered (rotated) box size and dropped the rotation.
- `/about/resources` 4 book-section feathers: live `w-8 text-burgundy/20 rotate-[18deg]`
  (32px, rgba(88,25,37,.2), 18°, `absolute -left-4 -top-3`). Ours: 45px, spruce .28, 0°.
- `/about/resources` closing feather: live `absolute -left-6 top-0 w-9 text-spruce/30 rotate-[24deg]`
  (36px, rgba(57,96,71,.3), 24°). Ours: 55px, burgundy .25, 0°.
- Home "People we serve" large feather: live `right-10 bottom-16 w-24 text-spruce/10 -rotate-12`
  (96px, −12°). Ours 124px, 0°.
- Home Modalities feather: live `-left-12 -top-6 w-10 text-burgundy/30 rotate-[14deg]` (40px, 14°).
  Ours 53px, 0°.
- Home **missing**: live `-left-12 -top-8 w-10 text-burgundy/30 -rotate-12` beside "About Sohavani
  Mand" (x=74 at 1440). Also verify the two "Our Approach" feathers (`-right-10 -top-6 w-9
  text-spruce/35 rotate-[24deg]`, `-left-10 top-2 w-7 text-burgundy/25 -rotate-[30deg]`) and the
  "People we serve" small one (`left-6 top-10 w-16 text-spruce/15 rotate-[18deg]`) exist and match.
  (The 16px marquee feathers are fine; their x differs only because the marquee is moving.)

## Task 3 — hero feather vertical position
Service hero feathers (both) are ~47px higher than live on all 6 service routes (live y=168–184,
ours 121–136); `/privacy` is 20px higher; `/about/resources` 23–36px higher. Measure the positioned
ancestor on live (which box `-top-4`/`-top-8` resolve against) and match. Don't move the text.

Done when a fresh `feathers-all.mjs` run (URL → localhost:4174) at all three widths has every row
within ±4px in x and in y *relative to the nearest heading* (page drift from other spacing work is
not your concern), with identical w/rot/colour.
