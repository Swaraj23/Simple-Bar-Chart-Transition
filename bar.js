
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .6);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svgBar = d3.select("#charts").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
d3.json("data.json", function(error, data) {
	function type(d) {
  d.Orders = +d.Orders;
}
  x.domain(data.map(function(d) { return d.Days; }));
  y.domain([0, d3.max(data, function(d) { return d.Orders; })]);
  svgBar.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svgBar.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Orders");
	  
  var graphTransition = svgBar.selectAll("bar")
      .data(data)
	  .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Days); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return height; })
      .attr("height",0);
	  
	 
	  
	graphTransition
	.transition()
	.delay(function(d,i){ return i*500;})
	.attr("height", function(d) { return height - y(d.Orders); })
	.attr("y", function(d) { return y(d.Orders); })
	.duration(1000);
	
	

});

