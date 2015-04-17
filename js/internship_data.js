/*A collection of data slicing functions*/

//store master dataset to global; easier to handle this way than async
function getMasterData() {
	return $.ajax({
		type:"GET",
		url:"js/internship_json.json",
		async: false
	}).responseText;
}
var masterData = $.parseJSON(getMasterData());



function allData() {
	var returnData = d3.nest()
					 .key(function(d) { return d.location; })
					 .rollup(function(interns) {
					 	return {
					 		"location": interns.location,
					 		"count": interns.length,
					 		"coordinates": [d3.max(interns, function(g) { return parseFloat(g["lng"]); }), 
						   					d3.max(interns, function(g) { return parseFloat(g["lat"]); })],
						   	"medWage": d3.median(interns, function(d) { return parseFloat(d.wage) })
					 	}
					 }).entries(masterData);
	return returnData;
}

function filterYear(year, industry) {
	var theData;

	if(!industry) {
		theData = $.grep(masterData, function(n, i) {
			return(n.year == year);
		});
	} else {
		theData = $.grep(masterData, function(n, i) {
			//$("industry-buffer").html("all industries");
			return((n.year == year) && (n.industry == industry));
		});
	}

	var returnData = d3.nest()
					.key(function(d) { return d.location; })
					.rollup(function(interns) {
						return {
							"location": interns.location,
							"count": interns.length,
							"coordinates": [d3.max(interns, function(g) { return parseFloat(g["lng"]); }), 
						   					d3.max(interns, function(g) { return parseFloat(g["lat"]); })],
						   	"medWage": d3.median(interns, function(d) { return parseFloat(d.wage) })
						}
					}).entries(theData);
	return returnData;
}

function filterIndustry(industry, year) {
	var theData;
	if((!year) || (year=='all years')) {
		theData = $.grep(masterData, function(n, i) {
			return(n.industry == industry)
		});
	} else {
		theData = $.grep(masterData, function(n, i) {
			return((n.industry == industry) && n.year == year);
		});
	}

	returnData = d3.nest()
					.key(function(d) {return d.location; })
					.rollup(function(interns) {
						return {
							"location": interns.location,
							"count": interns.length,
							"coordinates": [d3.max(interns, function(g) { return parseFloat(g["lng"]); }), 
						   					d3.max(interns, function(g) { return parseFloat(g["lat"]); })],
							"medWage": d3.median(interns, function(d) { return parseFloat(d.wage) })
						}
					}).entries(theData);

	return returnData;
}

function stateFilter(industry, year) {
	var theData;
	if((industry == "all industries") && (year == "all years")) {
		theData = masterData;
	} else if(industry != "all industries" && (year == "all years")) {
		theData = $.grep(masterData, function(n, i) {
			return(n.industry == industry)
		});
	} else if(industry == "all industries" && (year != "all years")) {
		theData = $.grep(masterData, function(n, i) {
			return(n.year == year)
		});
	} else if(industry != "all industries" && (year != "all years")) {
		theData = $.grep(masterData, function(n, i) {
			return((n.year == year) && (n.industry == industry));
		});
	}
	x = d3.scale.ordinal().domain(d3.range(1)).rangePoints([0, 300], 1)
	returnData = d3.nest()
					.key(function(d) { return d.location; })
					.rollup(function(interns) {
						return {
							location: interns.location,
							count: interns.length,
							coordinates: [d3.max(interns, function(g) { return parseFloat(g["lng"]); }), 
						   					d3.max(interns, function(g) { return parseFloat(g["lat"]); })],
							medWage: d3.median(interns, function(d) { return parseFloat(d.wage) }),
							cx: x(Math.floor(Math.random())),
							cy: 150
						};
					}).entries(theData);
	return returnData;
}



function barData(location, year) {
	var theData;

	if((!year) || (year=='all years')) {
		theData = $.grep(masterData, function(n, i) {
			return(n.location == location)
		});
	} else {
		theData = $.grep(masterData, function(n, i) {
			return((n.location == location) && n.year == year);
		});
	}

	returnData = d3.nest()
					.key(function(d) { return d.industry })
					.rollup(function(interns) {
						return {
							"count": interns.length,
							"medWage": d3.median(interns, function(d) { return parseFloat(d.wage) })
						}
					}).entries(theData);

	returnData.sort(function(a, b) {
		return a.count - b.count;
	});
	return returnData;
}

function jah() {
	
	returnData = d3.nest()
					.key(function(d) { return d.industry })
					.rollup(function(interns) {
						return {
							"count": interns.length,
							"medWage": d3.median(interns, function(d) { return parseFloat(d.wage) })
						}
					}).entries(masterData);

	returnData.sort(function(a, b) {
		return a.count - b.count;
	});
	for(var i in returnData) {
		var x = returnData[i].key;
		console.log("<option value='" + x + "'>" + x + "</option>");
	}
}






