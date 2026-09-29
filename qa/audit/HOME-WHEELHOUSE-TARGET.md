# Home Wheelhouse section — exact target structure (mirror of live; skeleton lines 92–316)

Replace `<section class="services-section" id="services"> … </section>` (everything up to, NOT
including, the burgundy marquee strip — leave the marquee exactly as it is). Keep `id="services"`, all
text, the four line-icon SVGs, the "Learn more" links and hrefs, the `leaf-wheelhouse` feather (keep its
class; its position relative to the "My Wheelhouse." heading must stay the same), and the accordion
behaviour of the "What brings you through the door" list (click to open, chevron rotates).

```
section.home-wheel#services          position relative
  div.home-wheel-rule                absolute; left/right 0; top 0; height 1px; bg rgba(23,39,64,.15)
  div.home-wheel-bg                  absolute; inset 0; background sage (the current section bg colour)
  (keep any existing texture/overlay layer as absolute inset-0, pointer-events none)
  div.home-wheel-container           relative; max-width 1280px; margin 0 auto; padding 112px 24px
                                     (≥1024: 160px 48px); colour midnight
    div.home-wheel-intro.reveal      max-width 672px
      h2                             Fraunces 36px/1.25 (≥1024: 48px/1.25); "Wheelhouse." italic burgundy
      p                              margin-top 32px; 16px/26px; midnight @ .7
    div.home-wheel-grid              margin-top 80px; grid; 1 col; gap 56px;
                                     ≥768: 2 cols; ≥1024: 4 cols, gap 40px
      article.home-wheel-card.reveal flex column
        div.home-wheel-icon          80×80px; burgundy; margin-bottom 32px (svg fills it)
        div.home-wheel-head          margin-bottom 16px
          h3                         Fraunces 24px/32px; midnight; no padding/margin
        div.home-wheel-rule-short    height 1px; width 48px; bg rgba(88,25,37,.5); margin-bottom 20px
        p                            16px/26px; midnight @ .75
        a (Learn more)               margin-top 24px; inline-flex; align center; gap 6px; 14px/20px;
                                     burgundy; hover spruce (transition .3s)   [3rd card has no link on live? — copy live: check skeleton]
    div.home-door.reveal             margin-top 96px
      div.home-door-intro            max-width 672px; margin-bottom 40px
        h3                           Fraunces 24px/1.25 (≥1024: 30px/1.25); "door" italic burgundy
        p                            margin-top 16px; 16px/26px; midnight @ .7
      div.home-door-grid             grid; 1 col; ≥640: 2 cols; column-gap 48px; row-gap 8px; max-width 768px
        div.home-door-item           border-bottom 1px solid rgba(23,39,64,.1)
          button                     width 100%; flex; align center; gap 16px; padding 12px 0; text-left
            span.dot                 20×20; round; border 1px rgba(88,25,37,.6); burgundy; centered 12px svg
            span.label               flex 1; Fraunces 18px/28px; midnight; group-hover burgundy
            span.chev                burgundy; 16px svg; rotates when open (transition .3s)
          div.panel                  overflow hidden; max-height 0 (open: its content height); transition .3s
            p                        14px/22.75px; italic; midnight @ .65
            a (Learn more)           margin-top 8px; inline-flex; gap 6px; 14px/20px; burgundy
```
Delete old rules for `.services-section`, `.wheelhouse`, `.wheelhouse-grid`, `.wheelhouse-item`,
`.wheelhouse-rule`, `.line-icon` (home only), and the old door-list classes — **only after grepping**
page.js and */index.html. Move script.js reveal/stagger selectors to the new classes.
