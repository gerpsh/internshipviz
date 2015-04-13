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

//sum number of internships for overall view
function sumData(year) {
	if(!year) {
		var theData = d3.nest()
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
		return theData;
	} else { 
		var theData = d3.nest()
					   .key(function(d) { return d.year; }).sortKeys(d3.ascending)
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
		return theData[year];
	}
	
}

function industryData(location, year) {
	var siteD = d3.nest()
					 .key(function(d) { return d.year; }).sortKeys(d3.ascending)
					 .key(function(d) { return d.location; })
					 .key(function(d) { return d.industry; })
					 .rollup(function(interns) {
					 	return {
					 		"location": interns.location,
					 		"count": interns.length,
					 		"medWage": d3.median(interns, function(d) { return parseFloat(d.wage) })
					 	}
					 }).entries(masterData);
	return siteD;
}

function industryOverall(industry, year) {
	var theData;

	if(!year) {
			theData = $.grep(masterData, function(n, i) {
			return n.industry == industry;
		});
	} else {
			theData = $.grep(masterData, function(n, i) {
			return ((n.industry == industry) && (n.year == year));
		});
	}
	alert(theData);

	theData = d3.nest()
				.key(function(d) { return d.location; }).sortKeys(d3.ascending)
				.rollup(function(interns) {
					return {
						"count": interns.length,
						"medWage": d3.median(interns, function(d) { return parseFloat(d.wage) }),
						"coordinates": [d3.max(interns, function(g) { return parseFloat(g["lng"]); }), 
				   						d3.max(interns, function(g) { return parseFloat(g["lat"]); })]
					}
				}).entries(theData);
	return theData;
}


function industryLocation(industry, location) {
	var theData;

	if(!location) {
			theData = $.grep(masterData, function(n, i) {
			return n.industry == industry;
			});
	} else {
			theData = $.grep(masterData, function(n, i) {
			return ((n.industry == industry) && (n.location == location));
			});
	}


	theData = d3.nest()
				.key(function(d) { return d.industry })
				.rollup(function(interns) {
					return {
						"count": interns.length,
						"medWage": d3.median(interns, function(d) { return parseFloat(d.wage) }),
						"coordinates": [d3.max(interns, function(g) {return parseFloat(g['lng'])}),
										d3.max(interns, function(g) {return parseFloat(g['lat'])})]
					}
				}).entries(theData);
	return theData;
}




