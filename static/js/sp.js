/*
  Created: Jan 14 2018
  Author: Kahin Akram Hassan
*/

function sp(data){

    this.data = data;
    var div = '#scatter-plot';

    var height = 500;
    var parentWidth = $(div).parent().width();
    var margin = {top: 20, right: 20, bottom: 60, left: 40},
        width = parentWidth - margin.right - margin.left,
        height = height - margin.top - margin.bottom;

    var cc =[];
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    data.forEach(function(d) { cc[d["Country"]] = color(d["Country"]); });

    var tooltip = d3.select(div).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var x = d3.scaleLinear()
    				.domain(d3.extent(this.data, function(d) { return d['Household_income']; }))
    				.range([0, width]);
    var y = d3.scaleLinear()
    				.domain(d3.extent(this.data, function(d) { return d['Employment_rate']; }))
    				.range([height, 0]);
    //console.log(data["Country"]);
    //console.log(x);
    
    /* Task 2
      Initialize 4 (x,y,country,circle-size)
      variables and assign different data attributes from the data filter
      Then use domain() and extent to scale the axes

      x and y domain code here*/
    
    var svg = d3.select(div).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

        /* ~~ Task 3 Add the x and y Axis and title  ~~ */
    
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .append("text")
    .attr("class", "label")
    .attr("x", width-90)
    .attr('y', -6)
    .text("X-axis");
    
    svg.append("text")             
    .attr("transform",
          "translate(" + (width/2) + " ," + 
                         (height + margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .text("Household Income");
    
    svg.append("g")
    .attr("class", "y axis")
    //.attr("transform", "translate(0," + height + ")")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("class", "label")
    .attr("x", width-90)
    .attr('y', -6)
    .text("Y-axis");
    
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Employment Rate");
    
    var xAxis = d3.axisBottom()
    				.scale(x);
    
    var yAxis = d3.axisLeft()
    				.scale(y);
    
    typeof(xAxis);
    
        /* ~~ Task 4 Add the scatter dots. ~~ */
    // Add the scatterplot
    var circles = svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d['Household_income']); })
        .attr("cy", function(d) { return y(d['Employment_rate']); })
        .attr("class", "non_brushed")
        .style("fill", function(d) { return cc[d["Country"]]});

        /* ~~ Task 5 create the brush variable and call highlightBrushedCircles() ~~ */

    var brush=d3.brush()
        		.extent([[0, 0], [width, height]])
        		.on("start brush end", highlightBrushedCircles);

    var gBrush =svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")").append("g")
    .attr("class", "brush")
    .call(brush);

         //highlightBrushedCircles function
         function highlightBrushedCircles() {
             if (d3.event.selection != null) {
                 // revert circles to initial style
                 circles.attr("class", "non_brushed");
                 var brush_coords = d3.brushSelection(this);
                 // style brushed circles
                   circles.filter(function (){
                            var cx = d3.select(this).attr("cx");
                            var cy = d3.select(this).attr("cy");
                            return isBrushed(brush_coords, cx, cy);
                  })
                  .attr("class", "brushed");
                   var d_brushed =  d3.selectAll(".brushed").data();


                   /* ~~~ Call pc or/and map function to filter ~~~ */
                   pc.selectLine(d_brushed);
                   	
             }
         }//highlightBrushedCircles
         function isBrushed(brush_coords, cx, cy) {
              var x0 = brush_coords[0][0],
                  x1 = brush_coords[1][0],
                  y0 = brush_coords[0][1],
                  y1 = brush_coords[1][1];
             return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
         }//isBrushed



         //Select all the dots filtered
         this.selectDots = function(value){
             var dots= d3.selectAll('.non_brushed');
             
             dots.style('stroke',function(dot){
            	 return value.every(function(c){
            		 return c.Country != dot.Country?
            				 'black':null;
            	 })? null: 'black';
             }).style('stroke-width','3px')

         };
         

}//End
