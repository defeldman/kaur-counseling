# Kaur Counseling

Static, GitHub Pages-ready copy of the Kaur Counseling homepage.

## Preview locally

From this folder, run:

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173/.

## Publish with GitHub Pages

Create a GitHub repository, push this folder to its `main` branch, then choose **Settings → Pages → Deploy from a branch → main / root**. The site has no build step.

The appointment scheduler and Google Maps embed remain connected to their existing third-party services. Main copy and links are in `index.html`; layout and styling are in `styles.css`.

## Simple visual-fix loop

The loop has three roles: the orchestrator, Scout, and Fixer. Scout finds up to three differences; Fixer applies the changes and can commit and push them.

```bash
node scripts/visual-loop.mjs --dry-run
node scripts/visual-loop.mjs --refresh-reference --max-iterations 3
node scripts/visual-loop.mjs --push --branch auto/visual-loop --max-iterations 10
```

Scout captures the live reference only with `--refresh-reference` or when the local reference is missing. Normal iterations use the saved reference in `qa/reference/` so Base44 is not repeatedly queried. Each run writes its prompts and reports to `qa/runs/`.
