import re,sys
s=sys.stdin.read(); s=re.sub(r'/\*.*?\*/',lambda m:'\n'*m.group(0).count('\n'),s,flags=re.S); d=0;l=1;iss=[]
for ch in s:
  if ch=='\n': l+=1
  elif ch=='{': d+=1
  elif ch=='}':
    d-=1
    if d<0: iss.append(l); d=0
print(iss, 'unclosed',d)
