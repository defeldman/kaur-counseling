# Fix brief 08 — replace unicode glyph icons with the live SVG icons

Ground truth: `https://kaurcounseling.net/`.

Our pages render several icons as **unicode text characters** — `⌖` `⌕` `✉` `◷` `⌁` `↗` —
where live renders proper inline **lucide** SVGs. Text glyphs pick up the body font, vary
between platforms, sit on the text baseline instead of being optically centred, and in
several cases simply look like the wrong symbol. This is a visible difference on the
homepage, Get Started, About and Resources.

Every icon below is copied verbatim from the live DOM. All of them share
`xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`.

## The icons

### clock — replaces `◷` (e.g. "Tue–Sat · 9am–6pm")
18x18, class `lucide lucide-clock text-spruce shrink-0`, parent `flex items-center gap-3`
```html
<circle cx="12" cy="12" r="10"></circle>
<polyline points="12 6 12 12 16 14"></polyline>
```

### map-pin — replaces `⌖` (e.g. "3150 18th St, Suite 404 · Mission District, SF")
18x18, class `lucide lucide-map-pin text-spruce shrink-0`
```html
<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
<circle cx="12" cy="10" r="3"></circle>
```

### mail — replaces `✉` ("sohavani@kaurcounseling.net")
18x18, class `lucide lucide-mail text-spruce shrink-0`
```html
<rect width="20" height="16" x="2" y="4" rx="2"></rect>
<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
```

### phone — replaces `⌕` ("415-930-5395")
18x18, class `lucide lucide-phone text-spruce shrink-0`
```html
<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
```

### external-link — replaces `↗` (homepage office notice address link)
13x13, class `lucide lucide-external-link mt-px`,
parent `ml-1 inline-flex items-center text-burgundy group-hover:text-spruce transition-colors`
```html
<path d="M15 3h6v6"></path>
<path d="M10 14 21 3"></path>
<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
```

### car — the "· with parking." affordance in the homepage office notice
16x16, class `lucide lucide-car`,
parent `shrink-0 inline-flex items-center gap-2 text-sm text-burgundy hover:text-spruce`
```html
<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
<circle cx="7" cy="17" r="2"></circle>
<path d="M9 17h6"></path>
<circle cx="17" cy="17" r="2"></circle>
```

### link — 14x14, class `lucide lucide-link opacity-60`, same parent as `car`
```html
<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
```

### arrow-right — the `.text-link` arrow ("Learn more", "Learn more about me", …)
15x15, class `lucide lucide-arrow-right mt-px`,
parent `inline-flex items-center gap-2 text-sm text-burgundy hover:text-spruce`
```html
<path d="M5 12h14"></path>
<path d="m12 5 7 7-7 7"></path>
```

### arrow-up-right — the "Request Appointment" / "Get Started ↗" button icon
16x16, class `lucide lucide-arrow-up-right`
```html
<path d="M7 7h10v10"></path>
<path d="M7 17 17 7"></path>
```

### menu — the mobile hamburger
22x22, class `lucide lucide-menu`, parent `md:hidden text-midnight`
```html
<line x1="4" x2="20" y1="12" y2="12"></line>
<line x1="4" x2="20" y1="6" y2="6"></line>
<line x1="4" x2="20" y1="18" y2="18"></line>
```
Ours builds the hamburger from three `<span>` bars. Use live's SVG so the stroke weight,
cap shape and spacing match.

---

## Two placements to get right

1. **Homepage office notice** — live wraps the map-pin in a **badge**: the svg sits inside
   `shrink-0 mt-0.5 w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center`
   and the icon itself is `text-burgundy` (not spruce) at 18x18. Ours renders a bare glyph.

2. **Contact / office fact rows** — live uses `flex items-center gap-3` with the 18x18
   spruce icon and `shrink-0`, so the icon never squashes and the text aligns to the icon's
   optical centre. Ours currently sets a fixed-width text span with `text-align: center`,
   which is what makes the glyphs drift.

## The `⌁` leaf glyph

`⌁` appears on About and Resources where live draws the same **feather/leaf SVG** already
used by the marquee ticker and the burgundy CTA card:

```html
<svg viewBox="0 0 100 150" fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M50 16 C26 40 24 88 48 114"></path>
  <path d="M50 16 C74 40 76 88 52 114"></path>
  <path d="M48 114 C46 124 48 134 42 146"></path>
  <path d="M50 20 L49 112"></path>
  <path d="M50 42 L32 50"></path>  <path d="M50 62 L28 74"></path>
  <path d="M50 82 L32 92"></path>  <path d="M50 42 L68 50"></path>
  <path d="M50 62 L72 74"></path>  <path d="M50 82 L68 92"></path>
</svg>
```
Reuse whatever shared helper the ticker/CTA card already uses rather than pasting a fourth
copy. Check the live page for the size, colour and rotation at each placement.

---

## Scope

- Replace the glyphs; do not otherwise change copy, colours, type or layout.
- Where a glyph sits in a shared component, fix it once at the source.
- If the repo has no icon helper, add a small one rather than inlining the same paths
  repeatedly.

## Verification

`node --check page.js` must pass and all 13 routes must render under
`python3 -m http.server 4173`. Then confirm no `⌖ ⌕ ✉ ◷ ⌁ ↗` characters remain in the
rendered output:
`grep -rn '⌖\|⌕\|✉\|◷\|⌁\|↗' *.html */index.html */*/index.html page.js styles.css`

## Deliverable

Commit to `main` and push. Report which icons you replaced and where.
