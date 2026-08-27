# Kaur Counseling static site

## Done

- [x] Inspect the live site at desktop and mobile sizes.
- [x] Capture the site imagery and save it under `assets/images/`.
- [x] Download the Fraunces and Inter font files into `assets/fonts/`.
- [x] Rebuild the homepage as a static HTML/CSS/JS site.
- [x] Preserve the SimplePractice appointment link, Google Maps embed, phone, email, and crisis notice.
- [x] Add responsive navigation and expandable service details.
- [x] Confirm the static source has no Base44 or remote font dependency.
- [x] Add a simple three-role visual loop: orchestrator, Scout, and Fixer.
- [x] Add saved-reference behavior so normal iterations do not repeatedly query Base44.
- [x] Add bounded iterations, stall detection, and optional Fixer commit/push behavior.
- [x] Scout and save the complete live-site route map, including internal pages and external integrations.
- [x] Reproduce the live site's internal About, cost, resources, modalities, contact, privacy, and service pages.
- [x] Update homepage navigation and calls to action to use the reproduced static routes.
- [x] Verify every reproduced route renders at the local preview URL.

## To verify

- [x] Compare the local page with the live site at desktop and mobile widths.
- [x] Check every navigation and external service link.
- [x] Connect this canonical folder to the private GitHub repository and push the initial site.
- [ ] Enable GitHub Pages from the repository. Blocked by the current GitHub plan: GitHub returned `422 Your current plan does not support GitHub Pages for this repository` while the repo is private.
- [ ] Point `kaurcounseling.net` to the GitHub Pages custom domain if desired.

## Easy edits

- Main copy and links: `index.html`
- Colors, layout, type, and responsive behavior: `styles.css`
- Menu and service accordion behavior: `script.js`
- Photos: `assets/images/`

## Second-pass Scout/Fixer log

- [x] Resources route: replace the generic centered/full-poem layout with the live site's left-aligned editorial layout, wide sage poem card, corner details, and hover-to-read preview.
- [x] About route: replace the two-column human section with the live three-column pastel card grid and measured row heights.
- [x] About route: restore the live left-border work notes and rounded sage “Who I see” card.
- [x] Navigation: add the live About and Services dropdown menus, route every submenu item, and support hover, keyboard focus, and mobile tap-to-open behavior.
- [x] Header scroll behavior: match the live transparent-at-top header and translucent, compact scrolled state without shifting the page rhythm.
- [x] Motion: add the live hero image/card entrance timing and continuously bouncing scroll cue, with reduced-motion handling.
- [x] Motion/scroll: add the live 0.9-second fade-and-rise reveals for below-the-fold sections and staggered card entrances.
- [ ] Continue visual comparison of hover states, scroll reveals, and mobile menu spacing on later passes.

## Third-pass Scout/Fixer log

- [x] Full route comparison: found that `Get Started` was still using the generic centered detail-page rhythm instead of the live left-aligned contact layout.
- [x] `Get Started`: removed the generic back link, matched the left-led hero, widened the appointment panel, preserved the SimplePractice scheduling integration, and aligned the office/map section spacing.
- [x] Full route comparison: found that `Privacy` was missing the live crisis-resource callout treatment and was using plain paragraphs for the emergency links.
- [x] `Privacy`: added the bordered crisis card, warning/phone icons, linked 911/988/Crisis Text Line resources, and matched the live divider and card rhythm.
- [x] `Modalities`: widened the desktop title measure to the live 672px content width.
- [x] Scroll behavior: corrected generated internal pages so the header remains viewport-fixed while the user scrolls through the office and footer sections.
- [x] Rechecked desktop About hover dropdown, homepage reveal timing, every reproduced route, and all route-level external-link integrations.
- [ ] Narrow-viewport screenshot pass for mobile menu spacing and touch dropdown behavior remains for a later round.

## Local preview

The current preview is available at http://localhost:4173/ while the local server is running.

## Fourth-pass Scout/Fixer log

- [x] Re-read the live homepage geometry at desktop size and corrected the fixed-header/hero rhythm, card wrapping, navigation spacing, and button sizing to the source measurements.
- [x] Matched the live palette tokens for cream, midnight, spruce, sage, burgundy, clay, borders, and muted text opacity.
- [x] Reordered the homepage “door” accordion to the live row-major order and replaced its check/plus glyphs with source-style SVG controls.
- [x] Replaced approximate wheelhouse, approach, modality, scroll, office, navigation-chevron, and inline-link glyphs with measured SVG treatments.
- [x] Matched the desktop wheelhouse, approach, and modalities section spacing, typography, icon sizing, separators, and lower-page rhythm.
- [x] Rechecked desktop About and Services dropdown hover states, accordion open/close behavior, scroll reveals, and external scheduling/map links.
- [x] Smoke-tested all 13 reproduced routes after the visual changes; every route rendered with its expected header, footer, and H1.
- [ ] Narrow-viewport screenshot/touch pass remains; the responsive CSS is preserved, but this browser session only exposes the desktop viewport.

## Manual scout findings pass

- [x] Make detail-page scroll reveals visible immediately when their initial viewport check succeeds, so background-tab throttling cannot leave the hero hidden indefinitely.
- [x] Match homepage eyebrow typography and section colors: 12px/16px with 0.25em tracking, spruce as the common color, navy-muted for People we serve, and the smaller Welcome label.
- [x] Match the live homepage/contact heading semantics and sizes for the office notice, appointment card, and Mission office heading.
- [x] Keep “self love.” navy on the About detail hero while preserving burgundy emphasis on the other detail routes.
- [x] Add the live four-pixel burgundy-to-clay-to-spruce accent bar to the Modalities detail page.
- [x] Restore the missing “Five frameworks” eyebrow above the Modalities framework intro and match its responsive heading scale.
- [x] Modalities pill opacity: rechecked at a matched narrower viewport and confirmed as a false alarm; live and local intentionally share the dusty-mauve badge treatment.

## Manual scout pass 2

- [x] Verified the pass-1 reveal, About emphasis, Modalities accent bar/framework label, heading semantics/sizes, and eyebrow typography fixes.
- [x] Restored the mobile navigation overlay's absolute positioning after the shared direct-child stacking rule was overriding it; the hamburger menu now spans the viewport with its intended touch layout.
- [x] Added a 560–800px tablet-width hero-art breakpoint using live-proportional widths (`35vw` tree and `57vw` lavender), while preserving the existing phone sizing below 560px.
- [ ] True small-phone screenshot/touch verification remains pending because the available browser viewport could not be resized below the narrower tablet-like tier.
