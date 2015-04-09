import csv
import json

with open("internship2.csv", "rU") as in_file:
  r = csv.reader(in_file, delimiter="|", quotechar='"')
  x = []
  for row in r:
    d = {}
    d['year'] = row[0]
    d['location'] = row[1]
    d['industry'] = row[2]
    d['wage'] = row[3]
    d['lat'] = row[4]
    d['lng'] = row[5]
    x.append(d)
  f = open("internship_json.json", "w")
  j = json.dumps(x, sort_keys=True, indent=4, separators=(',', ': '))
  f.write(j)
  f.close()
