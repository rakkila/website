

function rndColor() {
    function c() {
        return ('0' + Math.floor(Math.random() * 256).toString(16)).substr(-2);
    }
    return '#' + c() + c() + c();
}


function graf(data){

    this.data = data;
    var div = '#chart';
	
	var keys = Object.keys(data[0]); //datans dimensioner

	console.log(d3.values(data[3])[0]);
	

    var height = 500;
    var parentWidth = $(div).parent().width();
    var margin = {top: 20, right: 20, bottom: 60, left: 40},
        width = parentWidth - margin.right - margin.left,
        height = height - margin.top - margin.bottom;

    var svg = d3.select(div).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

		
		  var tooltip = d3.select(div).append("div")
       .attr("class", "tooltip")
       .style("opacity", 0);

		
	// 5. X scale will use the index of our data
	var xScale = d3.scaleLinear()
		.domain([1998, 2013]) // input
		.range([0, width]); // output

	// 6. Y scale will use the randomly generate number 
	var yScale = d3.scaleLinear()
		.domain([0, 2000]) // input 
		.range([height, 0]); // output 
						  
						  
		console.log(xScale(1999));				  
		// 7. d3's line generator

	
	var x_axis = d3.axisBottom().scale(xScale).tickValues(d3.range(1998, 2013, 1));
	var y_axis = d3.axisLeft().scale(yScale);
	
	svg.append("g").attr("transform","translate(0" + "," + height+ ")").call(x_axis);
	svg.append("g").call(y_axis);
	
	
	var colors = [];
	var selected = [];
	var paths = [];
	
	for(var j = 0;j<data.length; j++)
	{
		colors[j] = rndColor();
		selected[j] = true;
		
		
		var data2 = [ {"value": d3.values(data[j])[1],
					   "year": 1998},
					   {"value": d3.values(data[j])[2],
					   "year": 1999},
					   {"value": d3.values(data[j])[3],
					   "year": 2000},
					   {"value": d3.values(data[j])[4],
					   "year": 2001},
					   {"value": d3.values(data[j])[5],
					   "year": 2002},
					   {"value": d3.values(data[j])[6],
					   "year": 2003},
					   {"value": d3.values(data[j])[7],
					   "year": 2004},
					   {"value": d3.values(data[j])[8],
					   "year": 2005},
					   {"value": d3.values(data[j])[9],
					   "year": 2006},
					   {"value": d3.values(data[j])[10],
					   "year": 2007},
					   {"value": d3.values(data[j])[11],
					   "year": 2008},
					   {"value": d3.values(data[j])[12],
					   "year": 2009},
					   {"value": d3.values(data[j])[13],
					   "year": 2010},
					   {"value": d3.values(data[j])[14],
					   "year": 2011},
					   {"value": d3.values(data[j])[15],
					   "year": 2012},
					   {"value": d3.values(data[j])[16],
					   "year": 2013},
					   ];
			
	//create line
	var line = d3.line()
    .x(function(d) { //console.log(d.year);
		return xScale(d.year); }) 
    .y(function(d) {//console.log((d.value));	
		return (yScale(d.value)); }) 
    .curve(d3.curveLinear); 
	
	//create path
	var thePath = svg.append("path")
    .datum(data2) 
    .attr("class", "line")
    .attr("d", line)
	.attr("id", d3.values(data[j])[0])
	.style("stroke", colors[j])
	.style("fill","none");		
	//console.log(d3.values(data[j])[0]);
	
	paths[j] = thePath;
	}

	    var projection = svg.selectAll(".line")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);
		
		
		function mouseover(d) 
		{
		console.log(paths.indexOf(d));

		  //Only show then active..
		  tooltip.transition().duration(100).style("opacity", .9);
		  var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
		  tooltip.attr(
			"style",
			"left:"+(mouse[0]+30)+
			"px;top:"+(mouse[1]+40)+"px")
			.html(d.name);
			
			//console.log(d.name);
		}
		
		function mouseout(d) 
		{
		  tooltip.transition()
			  .duration(100)
			  .style("opacity", 0);
		}
	
	
	this.selectLine = function(index)
	{
		//console.log("Select line, index= " + index);
	
		if(selected[index] == false)
		{
			selected[index] = true;
		}
		else
		{
			selected[index] = false;
		}
		console.log(selected.length);
		
		for(var k=0;k<selected.length;k++)
		{
			var currID = "#" + d3.values(data[k])[0];
			
			//console.log("currID = " + currID);
			
			if(selected[k] == true)
			{
				d3.select(currID).style("opacity", 1);
			}
			else
				d3.select(currID).style("opacity", 0);
		}
		
		
	};

	this.removeLines = function()
	{
		for(var i=0;i<selected.length;i++)
		{
			selected[i] = false;
			
			var currID = "#" + d3.values(data[i])[0];
			
			d3.select(currID).style("opacity", 0);
		}
	};
	
	this.getColors = function(i){
		//console.log(colors[i].toString());
		return colors[i].toString();
	};

}//End

