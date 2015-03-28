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
        location = row[1]
        location = location.replace(" ", "+")
        full_request = base_request + location
        try:
            json = u.urlopen(full_request).read()
            data = j.loads(json)
            lat = str(data['results'][0]['geometry']['location']['lat'])
            lng = str(data['results'][0]['geometry']['location']['lng'])
            print("completed: " + row[1])
            time.sleep(10)
        except:
            lat = "error"
            lng = "error"
        
        row.append(lat)
        row.append(lng)
        with(open("internship1.csv", "wb")) as o:
            w = csv.writer(o, delimiter='|', quotechar='"')
            w.writerow(row)
        
