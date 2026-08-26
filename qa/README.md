# Visual loop

The loop uses three roles only:

1. The orchestrator launches agents, passes reports between them, limits retries, and stops safely.
2. Scout compares the local page with a saved live-site reference and reports the next few differences.
3. Fixer implements those differences, runs its own checks, and—when `--push` is enabled—commits and pushes the change.

Scout creates the reference bundle in `qa/reference/` only on the first run or when explicitly asked to refresh it. Normal iterations do not revisit Base44.

Generated evidence goes into `qa/current/`, `qa/diffs/`, and `qa/runs/`; those folders are ignored by Git. The reference bundle is kept separate so it can remain local.

