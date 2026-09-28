#!/bin/zsh
norm(){ sed -E 's/^\[[A-Z0-9]+\] //' "$1" | sed -E 's/[[:space:]]+/ /g; s/^ +| +$//g' | grep -v '^$' | sort -u; }
for r in "$@"; do
  echo "############################################################"
  echo "## $r"
  echo "############################################################"
  echo
  echo "--- ON LIVE, MISSING FROM OURS ---"
  comm -23 <(norm copy/live/$r.txt) <(norm copy/gh/$r.txt)
  echo
  echo "--- ON OURS, NOT ON LIVE (likely invented / to remove or replace) ---"
  comm -13 <(norm copy/live/$r.txt) <(norm copy/gh/$r.txt)
  echo
done
