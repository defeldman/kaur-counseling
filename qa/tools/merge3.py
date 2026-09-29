#!/usr/bin/env python3
"""Resolve diff3-style conflict hunks positionally: apply ours' and theirs' edits (each relative to base)
when they don't overlap. Exit 1 and report if any hunk has overlapping edits."""
import re,sys,difflib
pat=re.compile(r'<<<<<<< [^\n]*\n(.*?)\|\|\|\|\|\|\| [^\n]*\n(.*?)=======\n(.*?)>>>>>>> [^\n]*\n',re.S)
def edits(B,X):
    return [(i1,i2,X[j1:j2]) for tag,i1,i2,j1,j2 in difflib.SequenceMatcher(None,B,X,autojunk=False).get_opcodes() if tag!='equal']
def merge(B,O,T):
    eo,et=edits(B,O),edits(B,T)
    for a in eo:
        for b in et:
            if a[0]<b[1] and b[0]<a[1]:
                if a==b: continue
                return None
    allx=sorted([(e,0) for e in eo]+[(e,1) for e in et if e not in eo],key=lambda x:(x[0][0],x[0][1],x[1]))
    out=[];i=0
    for (i1,i2,rep),_ in allx:
        out+=B[i:i1]; out+=rep; i=max(i,i2)
    return out+B[i:]
bad=0
for f in sys.argv[1:]:
    s=open(f).read(); n=[0]
    def res(m):
        global bad; n[0]+=1
        O,B,T=[g.splitlines() for g in (m.group(1),m.group(2),m.group(3))]
        r=merge(B,O,T)
        if r is None:
            bad+=1; print(f'{f}: OVERLAPPING hunk #{n[0]} left in place'); return m.group(0)
        return '\n'.join(r)+('\n' if r else '')
    s=pat.sub(res,s); open(f,'w').write(s); print(f,'hunks',n[0])
sys.exit(1 if bad else 0)
