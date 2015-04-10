/*
	Gerald Shaeffer
	SI649|InfoViz|Final Assignment

*/

//store master dataset to global; easier to handle this way than async
function getMasterData() {
	return $.ajax({
		type:"GET",
		url:"js/internship_json.json",
		async: false
	}).responseText;
}
var masterData = $.parseJSON(getMasterData());




//sum number of internships for overal view
function sumData(year) {
	
	var yearly = d3.nest()
				   .key(function(d) {return d.year;}).sortKeys(d3.ascending)
				   .key(function(d) {return d.location;})
				   .rollup(function(interns) {
				   	return {
				   		"location": interns.location,
				   		"count": interns.length,
				   		/*take max of lat and lng; since all values the same for a location, 
				   		  true values always get returned*/
				   		"coordinates": [d3.max(interns, function(g) {return parseFloat(g["lng"])}), 
				   						d3.max(interns, function(g) {return parseFloat(g["lat"])})]
				   	}
				   }).entries(masterData);
	return yearly[year];
}

function industryData(location, year) {
	var siteD = d3.nest()
					 .key(function(d) { return d.year; }).sortKeys(d3.ascending)
					 .key(function(d) { return d.location; })
					 .key(function(d) { return d.industry; })
					 .rollup(function(interns) {
					 	return {
					 		"location": interns.location,
					 		"count": interns.length
					 	}
					 }).entries(masterData);
    //console.log(siteD[0]["values"][0]);
	for(var i in siteD[year]["values"]) {
		if (siteD[year]["values"][i]["key"] == location) {
			return siteD[year]["values"][i]["values"]
				   .sort(function(a,b) { return parseFloat(b.values.count) - parseFloat(a.values.count) });
		}
	}
}



//console.log(JSON.stringify(siteData("Ann Arbor, Michigan", 0)));

