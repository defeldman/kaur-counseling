#!/bin/zsh
# Regression gate. Run BEFORE and AFTER every commit; totals must not get worse.
# Compares a local server (default http://localhost:4173/) against the live captures.
# Usage: qa/tools/regress.sh [base-url]
V=/private/tmp/claude-502/-Users-danielfeldman-software-kaurcounseling-rewrite-kaur-landing/f16b7cbc-e200-4ce4-a75e-db973c6e959b/scratchpad/vdiff
BASE=${1:-http://localhost:4173/}
cd $V
sed "s#GH='[^']*'#GH='${BASE%/}'#" extract.mjs > extract-local.mjs
ROUTES=(home about cost resources modalities get-started adhd multiculturalism burnout anxiety transitions teens privacy)
for vp in desktop tablet mobile; do
  node extract-local.mjs gh $vp >/dev/null 2>&1
  S=0; T=0; off=""
  for r in $ROUTES; do
    out=$(node cmp.mjs $vp $r style 2>&1)
    n=$(echo "$out" | sed -n '/STYLE\/GEOMETRY/,$p' | grep -cE '^      ')
    h=$(echo "$out" | grep -oE '\([+-]?[0-9]+\)$' | tr -d '()+-'); h=${h:-0}
    S=$((S+n)); T=$((T+h)); [ "$h" != "0" ] && off="$off $r:$h"
  done
  echo "$vp: styleDeltas=$S heightErr=${T}px  off:${off:- none}"
done
node stuck.mjs $BASE | grep -v ': 0$'
echo "(regress.sh done — any route listed just above has stuck-invisible content)"
