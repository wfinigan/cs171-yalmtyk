
/*
 * Timeline - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the
 */

var items = [{"date": "2016-11-8", "event": "Massachusetts voters approve Ballot Question 4", "graphic": 0, "url": 0, "color": 0},
    {"date": "2016-12-15", "event": "Regulation and Taxation of Marijuana Act goes into effect", "graphic": 0, "url": 0, "color": 0},
    {"date": "2016-12-30", "event": "Governor Charlie Baker delays implementation of key parts of the marijuana bill, essentially delaying retail of cannabis for 6 months", "graphic": 0, "url": 0, "color": 0},
    {"date": "2017-08-01", "event": "Twenty-five member Cannabis Advisory Board established", "graphic": 0, "url": 0, "color": 0},
    {"date": "2017-09-01", "event": "Cannabis Control Commission formed", "graphic": 0, "url": 0, "color": 0},
    {"date": "2017-12-21", "event": "The Cannabis Control Commission proposes draft regulations", "graphic": 0, "url": 0, "color": 0},
    {"date": "2018-02-26", "event": "The Cannabis Control Commission's draft rules put on hold until following year", "graphic": 0, "url": 0, "color": 0},
    {"date": "2018-03-06", "event": "The Cannabis Control Commission's approves key adult-use regulations, such as inventory quotas, licensing and fee structure, and more", "graphic": 0, "url": 0, "color": 0},
    {"date": "2018-06-28", "event": "The Cannabis Control Commission launches social equity program, aimed to give entrepreneurship and work opportunities in the cannabis industry to those who had been disproportionately impacted by its prohibition", "graphic": 0, "url": 0, "color": 0},
    {"date": "2018-04-02", "event": "Applications open for marijauna establishment licenses", "graphic": 0, "url": 0, "color": 0},
    {"date": "2018-10-04", "event": "The Cannabis Control COmmission approves four marijuana shops' licenses", "graphic": 0, "url": 0, "color": 0},
    {"date": "2018-11-20", "event": "Two retail cannabis stores open to public", "graphic": 0, "url": 0, "color": 0},
    {"date": "2019-06-28", "event": "The Cannabis Control Commission approves new draft regulations that would provide a framework for cannabis cafes and delivery services", "graphic": 0, "url": 0, "color": 0}
];
console.log(items);

Timeline = function(_parentElement){
    this.parentElement = _parentElement;

    this.initVis();
}

Timeline.prototype.initVis = function(){
    var vis = this; // read about the this

    vis.margin = {top: 0, right: 0, bottom: 30, left: 100};

    vis.width = 800 - vis.margin.left - vis.margin.right,
        vis.height = 500 - vis.margin.top - vis.margin.bottom;

    var padding = 100;

    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right + padding)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    // Date parser to convert strings to date objects
    var parseDate = d3.timeParse("%Y-%m-%d");

    items.forEach(function(item) {
      item.date = parseDate(item.date);
    });
    console.log(items);

// Scales and axes
    vis.x = d3.scaleTime()
        .range([0, vis.width])
        .domain(d3.extent(items, function(d) { return d.date; }));

    vis.xAxis = d3.axisBottom()
        .scale(vis.x);

    vis.svg.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + vis.height + ")")
        .call(vis.xAxis
            .tickFormat(d3.timeFormat("%Y-%b-%d")));

    // Tool tip
    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) { return "Date: " + d.date + " Event: " + d.event});
    vis.svg.call(tool_tip);

    var circles = vis.svg.selectAll(".circle")
        .data(items);

    circles.enter()
        .append("circle")
        .attr("class", "circle")
        .on("mouseover", tool_tip.show)
        .on("mouseout", tool_tip.hide)
        .attr("r", 5)
        .attr("cx", function(d) { return vis.x(d.date); })
        .attr("cy",function(d, index) {
            if(index % 2 == 0) {
                return 300;
            }
            else {
                return 400;
            }
        });

    // TO-DO: Initialize brush component

    // Initialize brush component
    vis.brush = d3.brushX()
        .extent([[0, 0], [vis.width, vis.height]])
        .on("brush", brushed);

    // TO-DO: Append brush component here
    vis.svg.append("g")
        .attr("class", "x brush")
        .call(vis.brush)
        .selectAll("rect")
        .attr("y", -6)
        .attr("height", vis.height + 7);

}