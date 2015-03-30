import csv
import urllib2 as u
import json as j
import time

base_request = "http://maps.google.com/maps/api/geocode/json?address="

with open("internship.csv", "rU") as c:
    r = csv.reader(c, delimiter=",", quotechar='"')
    for row in r:
        lat = ""
        lng = ""
        row[1] = row[1].strip()
        location = row[1]
        location = location.replace(" ", "+")
        full_request = base_request + location
        try:
            json = u.urlopen(full_request).read()
            data = j.loads(json)
            lat = str(data['results'][0]['geometry']['location']['lat'])
            lng = str(data['results'][0]['geometry']['location']['lng'])
            print("completed: " + row[1])
            time.sleep(1)
        except:
            lat = "error"
            lng = "error"
            print("error on: " + row[1])

        row.append(lat)
        row.append(lng)
        with(open("internship1.csv", "a")) as o:
            w = csv.writer(o, delimiter='|', quotechar='"')
            w.writerow(row)

