# Fix brief 12 — mobile navigation (390px)

Ground truth: `https://kaurcounseling.net/` at a **390x844** viewport.

The desktop work is nearly done; this is the first mobile pass. Everything below was read
off the live page with the mobile menu open.

---

## 1. The toggle must become an X when the menu is open

Live swaps the hamburger for a **lucide `x`** while the menu is open. Ours keeps showing
three bars in both states.

Closed — **lucide `menu`**, 22x22:
```html
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu">
  <line x1="4" x2="20" y1="12" y2="12"></line>
  <line x1="4" x2="20" y1="6" y2="6"></line>
  <line x1="4" x2="20" y1="18" y2="18"></line>
</svg>
```

Open — **lucide `x`**, 22x22:
```html
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
  <path d="M18 6 6 18"></path>
  <path d="m6 6 12 12"></path>
</svg>
```

Button class on live is `md:hidden text-midnight`. Ours currently builds the icon from three
`<span>` bars — replace with these SVGs and swap on open/close.

## 2. Submenu affordance is a `+` at the right edge, not an inline chevron

Live puts a **lucide `plus`** hard against the **right edge** of the row (x=350 in a 390
viewport, i.e. 24px from the right) for `About` and `Services`. Ours renders a small chevron
immediately after the label text.

```html
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round"
     class="lucide lucide-plus transition-transform duration-300">
  <path d="M5 12h14"></path><path d="M12 5v14"></path>
</svg>
```

16x16, right-aligned, and it carries `transition-transform duration-300` — it **rotates**
when the submenu opens (the same 45° treatment the desktop "door" accordion uses).

So each of those rows is a flex row: label on the left, `+` pushed to the right.

## 3. "Get Started" is a full-width block button

| property | live | ours |
|---|---|---|
| display | **block** | inline-flex |
| box | x=**24**, w=**342**, h=**44** (full content width) | compact pill hugging the text |
| text-align | **center** | left |
| padding | **12px 20px** | — |
| font-size | 14px | 15px |
| background / colour | `rgb(88,25,37)` / `rgb(241,234,223)` | same |
| border-radius | 9999px | same |
| margin-top | 12px (`mt-3`) | — |

Live class: `mt-3 text-center text-sm text-cream bg-burgundy px-5 py-3 rounded-full`.

## 4. Type and colour in the mobile menu

| element | live | ours |
|---|---|---|
| brand `Kaur Counseling` | **20px / 28px** | 14px |
| menu links (`Home`, `Cost`, `About`, …) | **14px / 20px**, `rgba(23,39,64,0.8)` | 15px, solid `rgb(23,39,64)` |
| first link `Home` top | y=**92** | y=112 |
| row pitch | **40px** | ~40px (already correct) |
| header height | **91px**, padding `24px 0` | 91px (already correct) |

The 20px offset on the first link follows from the panel's top padding — match live's.

---

## Scope

- Mobile/`@media` CSS and the header markup only. Do not change desktop layout, and do not
  touch page content.
- The `+` rotation should reuse the accordion's timing:
  `0.3s cubic-bezier(0.4,0,0.2,1)`.

## Verification

- `node --check page.js` must pass and all 13 routes must render under
  `python3 -m http.server 4173`.
- At a 390px viewport, confirm: the toggle shows a hamburger closed and an X open; About and
  Services show a right-aligned `+` that rotates on open; Get Started spans the full width
  with centred text; and the desktop nav at 1440px is unchanged.

## Deliverable

Commit to `main` and push. Report per section.
