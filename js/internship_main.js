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
function countSum(year) {
	
	var yearly = d3.nest()
				   .key(function(d) {return d.year;}).sortKeys(d3.ascending)
				   .key(function(d) {return d.location;})
				   .rollup(function(interns) {
				   	return {
				   		"location": interns.location,
				   		"count": interns.length,
				   		"avgWage": d3.mean(interns, function(g) { 
				   			if (g["wage"] != 'unpaid') {
				   				//console.log(g["wage"]);
				   				return g["wage"];
				   			} else {
				   				return null;
				   			}
				   		}),
				   		/*take max of lat and lng; since all values the same for a location, 
				   		  true values always get returned*/
				   		"lat": d3.max(interns, function(g) {return g["lat"]}),
				   		"lng": d3.max(interns, function(g) {return g["lng"]})
				   	}
				   }).entries(masterData);
	return yearly;
}
console.log(JSON.stringify(countSum()));

