LineGraph = function(_parentElement, _data){
    this.parentElement = _parentElement;
    this.data = _data;

    this.initVis();
};

LineGraph.prototype.initVis = function(){
    var vis = this;

    vis.margin = {top: 20, right: 20, bottom: 80, left: 50},
        vis.width = 960 - vis.margin.left - vis.margin.right,
        vis.height = 500 - vis.margin.top - vis.margin.bottom;

// parse the date / time
    vis.parseTime = d3.timeParse("%m/%d/%y");

// set the ranges
    vis.x = d3.scaleTime().range([0, vis.width]);
    vis.y = d3.scaleLinear().range([vis.height, 0]);

// define the line
    vis.possline = d3.line()
        .x(function(d) { return vis.x(d.date); })
        .y(function(d) { return vis.y(d.PossViolations); });

    vis.distline = d3.line()
        .x(function(d) { return vis.x(d.date); })
        .y(function(d) { return vis.y(d.DistViolations); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    vis.svg = d3.select("#line-graph-area").append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + vis.margin.left + "," + vis.margin.top + ")");

// Get the data
    vis.data.forEach(function(d) {
        d.date = vis.parseTime(d.date);
        d.PossViolations = +d.PossViolations;
        d.DistViolations = +d.DistViolations;
    });

    // Scale the range of the data
    vis.x.domain(d3.extent(vis.data, function(d) { return d.date; }));
    vis.y.domain([0, d3.max(vis.data, function(d) { return d.PossViolations; })]);

    console.log(d3.max(vis.data, function(d) { return d3.max(d.PossViolations, d.DistViolations); }))
    vis.svg.append("path")
        .datum(vis.data)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", '#fcbba1')
        .attr("stroke-width", 4)
        .attr("d", d3.line()
            .x(function(d) { return vis.x(d.date) })
            .y(function(d) { return vis.y(d.PossViolations) }));

    // Add the valueline path.
    vis.svg.append("path")
        .datum(vis.data)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", '#a50f15')
        .attr("stroke-width", 4)
        .attr("d", vis.distline);

    vis.svg.append("text")
        .attr("x", vis.width - 160)
        .attr("y", 50)
        .attr('font-weight', 'bold')
        .attr("dy", ".35em")
        .text('Legend');

    vis.svg.append('rect')
        .attr('x', vis.width - 250)
        .attr('y', 85)
        .attr('width', 30)
        .attr('height', 4)
        .attr('fill', '#a50f15')

    vis.svg.append("text")
        .attr("x", vis.width -210)
        .attr("y", 85)
        .attr("dy", ".35em")
        .text('Intent to Distribute Violations');

    vis.svg.append('rect')
        .attr('x', vis.width - 250)
        .attr('y', 120)
        .attr('width', 30)
        .attr('height', 4)
        .attr('fill', '#fcbba1')

    vis.svg.append("text")
        .attr("x", vis.width - 210)
        .attr("y", 120)
        .attr("dy", ".35em")
        .text('Possession Violations');


    vis.svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + vis.height + ")")
        .call(d3.axisBottom(vis.x)
            .tickFormat(d3.timeFormat("%B %Y")))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    // Add the Y Axis
    vis.svg.append("g")
        .call(d3.axisLeft(vis.y));

};
