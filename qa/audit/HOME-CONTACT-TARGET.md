# Home Contact section — exact target (skeleton lines 446 → footer)

Replace the home Contact section (from the "Contact" eyebrow through the office map, up to the footer).
Keep all text, links/hrefs, the SimplePractice button (keep its `spwidget-button` class and data
attributes — it opens the scheduler), the icons, and the map iframe (src). NEVER drop or change text.
Reference: the /get-started/ page (page.js, `get-started-*` classes) was rebuilt from live and matches;
the appointment card and office block here are the same components — reuse its values where live's
classes are identical, but give these elements `home-contact-*` classes.
```
section.home-contact#contact         relative; padding 112px 0 (≥1024: 160px 0)
  div.rule                           absolute; left/right 0; top 0; height 1px; midnight @ .1
  div.container                      max-width 1280px; margin 0 auto; padding 0 24px (≥1024: 0 48px)
    div.grid                         grid; 1 col; gap 64px; ≥1024: 12 cols
      div.main (≥1024: span 7)
        span.eyebrow                 12px/16px; uppercase; .25em; spruce
        h2                           margin-top 24px; Fraunces 36px, lh 1.25 (<1024); ≥1024 48px/48px;
                                     `Are we the<br><span class="italic spruce">right fit?</span>`
        p                            margin-top 32px; max-width 448px; 16px/26px; midnight @ .7
        div (margin-top 48px)
          div.card                   border-radius 20px; border 1px spruce @ .15; bg spruce @ .05;
                                     padding 32px (≥640: 40px)
            h3                       Fraunces 24px, line-height 1.375 (33px); midnight
            p                        margin-top 16px; 16px/26px; midnight @ .7
            div (margin-top 32px) > a.spwidget-button   inline-flex; gap 8px; border-radius 999px;
                                     bg burgundy; padding 14px 28px; 14px/20px; letter-spacing .025em;
                                     cream; hover bg spruce (transition .3s)
            p                        margin-top 20px; 12px/16px; midnight @ .5
        div.links                    margin-top 32px; flex; wrap; column-gap 24px; row-gap 8px; 14px/20px
          a × 2                      inline-flex; gap 6px; burgundy; hover spruce
      aside.reveal (≥1024: col 9 / span 4)
        div.next                     border-radius 24px; bg spruce @ .05; border 1px spruce @ .15;
                                     padding 32px (≥1024: 40px)
          span                       12px/16px; uppercase; letter-spacing .2em; spruce
          ol                         margin-top 24px; each li after first: margin-top 20px
            li                       flex; gap 16px
              span.num               Fraunces 18px, line-height 1.375; spruce @ .6
              span                   16px/26px; midnight @ .75
        div.facts                    margin-top 32px; each row after first: margin-top 20px; midnight @ .75
          div.row                    flex; align-items center; gap 12px; text 14px/20px (icon + text)
    div.office.reveal                margin-top 96px
      div.office-head                flex; align center; gap 12px
        span                         12px/16px; uppercase; .25em; spruce
        span.line                    height 1px; flex 1; midnight @ .1
      div.office-grid                margin-top 32px; grid; 1 col; gap 40px; ≥1024: 12 cols, gap 48px;
                                     align-items start
        div (≥1024 span 4)
          h3                         Fraunces 24px, lh 1.25 (<1024); ≥1024 30px/36px;
                                     `A room in the<span class="italic spruce"> Mission.</span>`  (space INSIDE span)
          p                          margin-top 20px; 16px/26px; midnight @ .75
          div.notice                 margin-top 20px; border-radius 12px; border 1px burgundy @ .2;
                                     bg burgundy @ .05; padding 16px 20px
            p                        14px/22.75px; midnight @ .8; "Virtual sessions are always available,"
                                     and "October 1st" are font-weight 600 burgundy
          div (margin-top 32px; flex; align start; gap 12px)  address link 14px/22.75px midnight @ .8
          div (margin-top 16px; flex; align start; gap 12px)  phone link 14px midnight @ .8, hover burgundy
        div (≥1024 span 8)
          div.map                    border-radius 24px; overflow hidden; border 1px midnight @ .1;
                                     small shadow; iframe width 100%, aspect-ratio 16/10 (≥1024: 16/8), no border
```
Delete the old home contact/office rules only after grepping page.js and */index.html (get-started uses
its own `get-started-*` classes — don't touch those).
