# Working on Kaur Counseling

- This is a static site deployed from `main` on GitHub Pages. Preserve the established design and content unless the requested change calls for a difference.
- The home page lives in `index.html`. Other routes have HTML shells and render shared page content from `page.js`; `styles.css`, `script.js`, and `icons.js` are shared. Check both home and inner pages when changing shared elements.
- Display the therapist's name as **SOHAVANI MAND** in visible text. Use normal capitalization, **Sohavani Mand**, in page titles, metadata, and image alt text. Leave email addresses, URLs, and filenames intact.
- When changing a shared asset, update its version query string in all HTML files that load it so browsers receive the change. Keep relative paths correct for nested routes.
- Preview with `python3 -m http.server 4173`. Check affected routes and screen sizes, and run relevant syntax or visual checks. Visual audit tools and caveats are in `qa/tools/README.md`.
- Group related changes in one commit and one push when publishing, to avoid a queue of GitHub Pages deployments. Check deployment status before diagnosing stale live content.
- The visual-fix loop can launch agents and optionally push. Do not run it as an automatic background process or enable `--push` unless requested. Its dry-run command is in the README.
