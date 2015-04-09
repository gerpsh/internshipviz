import csv

with open("internship1.csv", "rU") as in_file:
  r = csv.reader(in_file, delimiter="|")
  for row in r:
    if "United States" in row[1]:
      row[1] = row[1].replace("United States", "").strip()
    with open("internship2", "a") as out_file:
      w = csv.writer(out_file, delimiter="|", quotechar='"')
      w.writerow(row)