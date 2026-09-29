# Home — two text fixes, then the Our Approach section (exact target; skeleton lines 317–347)

## First: two text fixes (small, do these first)
1. The Wheelhouse heading lost its first word. It must read **My _Wheelhouse._** —
   `<h2>My <em class="burgundy">Wheelhouse.</em></h2>` (only "Wheelhouse." is italic burgundy).
2. In the "What brings you through the door" list, live has a "Learn more" link inside the open panel of
   FOUR items that ours lacks: **Burnout** → services/burnout/, **Teens** → services/teens/, the item
   whose text ends "…and ADHD support." (check which service it points to on live: open it on
   https://kaurcounseling.net/ and read the href), and **Life transitions** → services/transitions/.
   Copy the markup/classes of the existing panel "Learn more" links in that list.

## Then: Our Approach — replace `<section class="approach-section" id="approach"> … </section>`
Keep `id="approach"`, all text, the two approach feathers (`leaf-approach-right`, `leaf-approach-left`
— same classes; positions relative to the heading block unchanged), the two card icons, the link.
```
section.home-approach#approach      relative; padding 112px 0 (≥1024: 144px 0); background cream
  div.home-approach-container       max-width 1024px; margin 0 auto; padding 0 24px (≥1024: 0 48px)
    div.home-approach-intro.reveal  max-width 672px; margin 0 auto; text-align center; position relative
      (the two feather svgs, absolute, as now)
      span.eyebrow                  12px/16px; uppercase; letter-spacing .25em; burgundy
      h2                            margin-top 20px; Fraunces 36px/1.25 (≥1024: 48px/1.25); midnight;
                                    "Two principles that<br><em spruce italic>guide every session.</em>"
    div.home-approach-grid          margin-top 64px; grid; 1 col; ≥768: 2 cols; gap 32px (≥1024: 40px)
      article.home-approach-card.reveal  flex column; align-items center; text-align center;
                                    border-radius 16px; border 2px solid midnight; background cream;
                                    padding 40px 32px (≥1024: 48px 32px)
        h3                          Fraunces 20px/28px; letter-spacing .18em; uppercase; midnight
        div.home-approach-icon      margin 28px 0; midnight; svg 64×64
        div.home-approach-copy      each p after the first: margin-top 16px
          p                         15.2px/1.625 (text-[0.95rem] leading-relaxed); midnight @ .75
    div.home-approach-more.reveal   margin-top 56px; text-align center
      a                             inline-flex; align center; gap 8px; 14px/20px; burgundy; hover spruce
```
Delete old `.approach-section`, `.approach-grid`, `.approach-card` rules (grep first).
