# Home People we serve — exact target (skeleton lines 348–407)

Replace `<section class="people-section"> … </section>`. Keep all text, the five portrait images (src/alt),
and both section feathers (`leaf-people`, `people-small-feather` — same classes, same positions relative
to the section). NEVER drop or change text.
```
section.home-people                   relative; overflow hidden; background sage (current section bg)
  (the two feather svgs, absolute, as now)
  div.home-people-container           relative; max-width 1024px; margin 0 auto; padding 112px 24px
                                      (≥1024: 144px 48px)
    div.home-people-intro.reveal      max-width 672px
      span.eyebrow                    12px/16px; uppercase; letter-spacing .25em; midnight @ .6
      h3                              margin-top 16px; Fraunces 30px/1.25 (≥1024: 48px/1.25); midnight;
                                      "is for." italic clay rgb(108,50,133)
      p                               margin-top 20px; 16px/26px; midnight @ .7
    div.home-people-list              margin-top 64px; display grid; gap 24px
      article.home-person.reveal      relative; overflow hidden; border-radius 32px; padding 32px
                                      (≥1024: 40px); border 1px solid rgba(241,234,223,.1);
                                      background by card, cycling: 1 burgundy@.1, 2 spruce@.1, 3 clay@.1,
                                      4 burgundy@.1, 5 spruce@.1
        div.home-person-row           flex column; align-items center; gap 24px;
                                      ≥640: flex-direction row, gap 32px (image always FIRST, on the left)
          div.home-person-photo       112×112 (≥1024: 144×144); flex-shrink 0; border-radius 50%;
                                      overflow hidden; ring 4px (box-shadow 0 0 0 4px) in the card colour @ .3;
                                      img absolute inset 0, 100%/100%, object-fit cover
          div.home-person-text        flex 1; text-align center; ≥640: text-align LEFT on cards 1,3,5 and
                                      RIGHT on cards 2,4
            h3                        Fraunces 24px/1.25 (≥1024: 30px/1.25); card colour (burgundy/spruce/clay)
            div.rule                  margin-top 12px; height 1px; width 40px; card colour @ .5;
                                      centered (margin 12px auto 0); ≥640: at the text's side
                                      (cards 1,3,5: margin-left 0; cards 2,4: margin-left auto, margin-right 0)
            p                         margin-top 16px; 15.2px/1.625; midnight @ .75
```
Delete old `.people-section`, `.people-intro`, `.people-list`, `.person-card*`, `.card-rule` (home) rules —
grep page.js and */index.html first.

## IMPORTANT — spaces before styled words (live's pattern; the last attempt failed only on this)
Live puts the space INSIDE the styled span: `Who this room<span class="…italic clay…"> is for.</span>`.
Ours has `Who this room <em>is for.</em>` (space outside), which makes "is for." start ~10px later.
Use live's form here. Apply the same fix to the About heading in this file's index.html:
`Therapy rooted in<em …> authenticity, curiosity,</em> and connection.` — i.e. move the space that
precedes the em INTO the em (check live's skeleton: `Therapy rooted in` then span ` authenticity, curiosity,`).
Never nudge with position/left to compensate.
