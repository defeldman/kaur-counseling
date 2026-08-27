# Visual loop

The loop uses three roles only:

1. The orchestrator launches agents, passes reports between them, limits retries, and stops safely.
2. Scout compares the local page with a saved live-site reference and reports the next few differences.
3. Fixer implements those differences, runs its own checks, and—when `--push` is enabled—commits and pushes the change.

Scout creates and verifies a complete site map in `qa/reference/site-map.json`. The current configuration allows Scout to reread the live site each iteration so missing pages and drift are caught; it caches each URL once per iteration and never submits forms. Set `scoutLiveReadEveryIteration` to `false` if you want later iterations to use only saved references.

Generated evidence goes into `qa/current/`, `qa/diffs/`, and `qa/runs/`; those folders are ignored by Git. The reference bundle is kept separate so it can remain local.
