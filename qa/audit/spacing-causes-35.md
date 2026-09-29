# Brief 35 spacing cause report

Regression gates were run with `node --check page.js script.js icons.js` and
`qa/tools/regress.sh http://localhost:4173/` before each commit.

## Task 1 — shared footer gap

Before: desktop `styleDeltas=30 heightErr=672px`; tablet `82 / 721px`; phone `170 / 1260px`.

After: desktop `30 / 480px`; tablet `82 / 631px`; phone `170 / 1266px`.

Cause fixed: the shared `.site-footer` had a 25px top margin, while the live detail
route places the footer directly after `<main>`. Removing that margin reduced the
desktop error by 192px across the route set. The tablet error fell by 90px. Phone
increased by 6px in aggregate, so its route-specific footer gap remains unresolved.
Task 3's tablet footer row measurement is recorded below.

Commit: `0e5547c` (`Fix shared detail footer spacing`), pushed to `main`.

## Task 2 — desktop route jumps

Before Task 2: desktop `styleDeltas=30 heightErr=480px`.

After: desktop `30 / 333px`; tablet remained `82 / 631px`; phone remained `170 / 1266px`.

Causes fixed: the transitions service-card section had excess ending space before
“Therapy can help you”; removing its 89px grid bottom margin and matching its section
bottom padding reduced the accumulated desktop jump. The modalities closing-card gap
was 180px while the measured correction was 288px; this brought its footer text from
112px early to 4px early. The resources final section's 32px bottom padding was
removed, reducing its footer drift from 70px to 38px. The get-started content gap was
79px and is now 80px.

Remaining desktop height offsets after this task: About 26px short, cost 87px tall,
resources 38px tall, get-started 20px tall, multiculturalism 15px tall, burnout 24px
tall, anxiety 36px tall, transitions 48px tall, and teens 28px tall. Modality, ADHD,
and privacy height errors are within 4px. These remaining differences start within
their route content sections; they need further live box measurements before any
spacing value can be called real.

Commit: `fc7b170` (`Correct measured desktop route spacing`), pushed to `main`.

## Task 3 — tablet route jumps

Before Task 3: tablet `styleDeltas=82 heightErr=631px`.

After: desktop remained `30 / 333px`; tablet `82 / 653px`; phone `170 / 1266px`.

Causes fixed: live tablet footer meta measurements are 77px for the name, 80px for
the license, 122px for the business name, and 52px for the phone. The local footer
used desktop widths that forced those items onto separate rows. The tablet footer
now uses the measured widths and places the four items at the live x/y positions. The
modalities closing heading was 23px below live; its measured 108px tablet gap brings
it to within 1px.

Remaining tablet page-end drift (local text position minus live): About +19px, cost
+47px, resources -91px, modalities -120px at the final footer text, get-started +32px,
ADHD -17px, multiculturalism -77px, burnout -103px, anxiety -45px, transitions +32px,
teens +12px, and privacy +12px. These are route-specific accumulated differences at
the last matched footer text; the drift reports show the first content jumps (for
example, cost's Session rates -85px, transitions' “Therapy can help you” +101px, and
teens' “What you get here” +84px). They originate in the preceding content sections,
not in the now-matched tablet footer meta row. Phone spacing remains for the next brief.

Commit: included in the Task 3 commit; see git history for its hash.
