# Home Modalities section — exact target (skeleton lines 408–445)

Replace `<section class="modalities-section" id="modalities"> … </section>`. Keep `id="modalities"`, all
text, the three line-icon SVGs, the `leaf-modalities` feather (same class & position relative to the
heading block), the link href. NEVER drop or change text.
```
section.home-mod#modalities         relative; padding 112px 0 (≥1024: 160px 0)
  div.home-mod-container            max-width 1280px; margin 0 auto; padding 0 24px (≥1024: 0 48px)
    div.home-mod-intro.reveal       max-width 672px; position relative (feather inside, absolute, as now)
      span.eyebrow                  12px/16px; uppercase; letter-spacing .25em; burgundy @ .8
      h2                            margin-top 24px; Fraunces 36px, line-height 1.25 below 1024;
                                    ≥1024: 48px with line-height 48px (lg:text-5xl's own line-height);
                                    midnight. Markup like live — the space goes INSIDE the span:
                                    `Three lenses,<span class="…italic burgundy…"> one gentle practice.</span>`
      p                             margin-top 32px; 16px/26px; midnight @ .7
    div.home-mod-grid               margin-top 80px; grid; 1 col; gap 56px; ≥768: 3 cols; ≥1024: gap 48px
      article.home-mod-card.reveal  flex column
        div.home-mod-icon           80×80; clay rgb(108,50,133); margin-bottom 32px (svg fills it)
        div.home-mod-head           flex; align-items baseline; gap 12px; margin-bottom 16px
          span.num                  Fraunces 14px/20px; midnight @ .4   ("01", "02", "03")
          h3                        Fraunces 24px/32px; midnight
        div.home-mod-rule           height 1px; width 48px; clay @ .5; margin-bottom 20px
        p                           16px/26px; midnight @ .75
    blockquote.home-mod-quote.reveal  margin-top 96px; max-width 672px; padding-left 24px;
                                    border-left 2px solid burgundy
      p                             Fraunces italic; 24px with line-height 1.375 (33px) below 1024;
                                    ≥1024: 30px with line-height 36px (lg:text-3xl's own); spruce
    div.home-mod-more.reveal        margin-top 48px
      a                             inline-flex; align center; gap 8px; 14px/20px; burgundy; hover spruce
```
Delete old `.modalities-section`, `.modalities-intro`, `.modality-grid`, `.modality-item`,
`.modality-quote`, `.modality-link` rules only after grepping page.js and */index.html (the /modalities/
subpage uses `mod-*` classes — don't touch those).
