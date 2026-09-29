# Home About section — exact target structure (mirror of live, with our text/assets)

Replace the whole `<section class="about-section" id="about"> … </section>` in index.html with this
structure (keep `id="about"`; keep the exact text, the portrait image src/alt, the feather SVG as-is):

```
section.home-about#about                    relative; padding 112px 0 (≥1024: 160px 0)
  div.home-about-rule                       absolute; left 0; right 0; top 0; height 1px; bg rgba(23,39,64,.1)
  div.home-about-container                  max-width 1280px; margin 0 auto; padding 0 24px (≥1024: 0 48px)
    div.home-about-intro.reveal             max-width 768px; position relative
      svg.home-about-feather                (unchanged — keep class and current styling)
      span.home-about-eyebrow               12px/16px; uppercase; letter-spacing .25em; spruce
      p.home-about-pronounce                margin-top 12px; 12px/16px; italic; spruce @ .6 alpha
      h2.home-about-title                   margin-top 24px; Fraunces 36px/1.25 (≥1024: 48px/1.25); midnight
                                            (the "authenticity, curiosity," em stays italic spruce)
    div.home-about-grid                     margin-top 56px (≥1024: 80px); display grid; 1 column;
                                            gap 48px (≥1024: 12 columns, gap 64px); align-items start
      div.home-about-left.reveal            ≥1024: grid-column span 5
        span.home-about-portrait            display inline-block; position relative; width 100%;
                                            aspect-ratio 4/5; border-radius 24px; overflow hidden
          img (existing portrait)           position absolute; inset 0; width/height 100%; object-fit cover
        blockquote.home-about-quote         margin-top 32px; padding-left 24px; border-left 2px solid burgundy
          p                                 Fraunces italic 24px/33px (≥1024: 30px/1.375); spruce;
                                            text: "As you live deeper in the heart, the mirror gets clearer and cleaner."  (NO <br>)
          footer                            margin-top 12px; 14px/20px; uppercase; letter-spacing .2em;
                                            burgundy @ .8; normal (not italic); text: — Rumi
      div.home-about-right.reveal           ≥1024: grid-column 7 / span 6
        p × 4 (existing copy)               16px/26px (leading-relaxed = 1.625); midnight @ .75;
                                            each p after the first: margin-top 20px
        div.home-about-more                 margin-top 32px
          a.home-about-link (existing)      inline-flex; align-items center; gap 8px; 14px/20px; burgundy;
                                            hover: spruce; transition color .3s
```
Then delete the old rules for `.about-section`, `.about-intro`, `.about-grid`, `.portrait-frame`,
`.about-copy`, `.rumi-quote`, `.pronunciation` **only after grepping that no other page uses them**
(page.js, */index.html). Register `.home-about-intro`, `.home-about-left`, `.home-about-right` in the
script.js reveal list if the old ones were there (keep the stagger behaviour of `.about-copy` by moving it
to `.home-about-right`).
