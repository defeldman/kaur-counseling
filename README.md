# Kaur Counseling

Static website for Kaur Counseling, published with GitHub Pages. There is no build step.

## Preview

From the repository root:

```bash
python3 -m http.server 4173
```

Open <http://localhost:4173/>. The home page is in `index.html`; the other routes use their own `index.html` shells and shared content in `page.js`. Shared styling is in `styles.css`, with behavior in `script.js` and icons in `icons.js`.

## Publish

The site is published from `main` at the repository root. Related changes should be grouped in one commit and pushed together to avoid queuing unnecessary GitHub Pages deployments. Verify the deployment has finished before checking the public site. The appointment scheduler and map use third-party services.

## Visual checks

The optional visual-fix loop is described in [qa/README.md](qa/README.md); its dry run shows the plan without launching agents:

```bash
node scripts/visual-loop.mjs --dry-run
```

The loop can launch agents and, with `--push`, commit and push changes. Use it only when that work is requested. See [qa/tools/README.md](qa/tools/README.md) for individual visual comparison tools and their limitations. See [AGENTS.md](AGENTS.md) for working conventions.
