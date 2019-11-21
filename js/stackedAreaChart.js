StackedAreaChart = function(_parentElement, _data){
    this.parentElement = _parentElement;
    this.data = _data;

    this.initVis();
};


StackedAreaChart.prototype.initVis = function(){
    let vis = this;

    vis.margin = { top: 40, right: 60, bottom: 60, left: 60 };

    vis.width = 700 - vis.margin.left - vis.margin.right,
        vis.height = 400 - vis.margin.top - vis.margin.bottom;



    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    // Scales and axes
    vis.x = d3.scaleTime()
        .range([0, vis.width])
        .domain(d3.extent(vis.data, function(d) { return parseDateYM(d.date); }));

    vis.y = d3.scaleLinear()
        .range([vis.height, 0]);

    vis.xAxis = d3.axisBottom()
        .scale(vis.x);

    vis.yAxis = d3.axisLeft()
        .scale(vis.y);

    vis.svg.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + vis.height + ")");

    vis.svg.append("g")
        .attr("class", "y-axis axis");

// Define the div for the tooltip
    vis.toolDiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    vis.area = d3.area()
    .curve(d3.curveCardinal)
        .x(function(d) { return vis.x(parseDateYM(d.data.key)); })
        .y0(function(d) { return vis.y(d[0]); })
        .y1(function(d) { return vis.y(d[1]); });

    vis.colorScale = d3.scaleOrdinal().range(['#fff5f0','#fee0d2','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#a50f15','#67000d'])

    vis.wrangleData();
};


StackedAreaChart.prototype.wrangleData = function(){
    let vis = this;

    var nestedData = d3.nest()
        .key(function(d) { return d.date;})
        .key(function(d) { return d.OFFENSE_DESCRIPTION;})
        .rollup(function (d) {
            return d.length
        })
        .entries(vis.data);


    vis.dataCategories = []
    nestedData[0].values.forEach(function (d) {
        vis.dataCategories.push(d.key)
    });

    vis.colorScale.domain(vis.dataCategories)

    nestedData = nestedData.sort(function (a, b) {
        return parseDateYM(a.key) - parseDateYM(b.key)
    });

    vis.stack = d3.stack()
        .keys(vis.dataCategories)
        .value(function (d, key) {

            var values = d.values.filter(function (obj) {
                return obj.key == key
            })

            if (values.length ==  0) {
                return 0
            }
            else {
                return values[0].value
            }
        });

    vis.stackedData = vis.stack(nestedData);

    vis.displayData = vis.stackedData;

    vis.updateVis();
};

StackedAreaChart.prototype.updateVis = function() {
    var vis = this;


    vis.y.domain([0, d3.max(vis.displayData, function(d) {
        return d3.max(d, function(e) {
            return e[1];
        });
    })
    ]);


// Draw the layers
    var categories = vis.svg.selectAll(".area")
        .data(vis.displayData);

    categories.enter().append("path")
        .attr("class", "area")
        .on("mouseover", function(d) {
            vis.toolDiv.transition()
                .duration(200)
                .style("opacity", .9);
            vis.toolDiv.html(d.key)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            vis.toolDiv.transition()
                .duration(500)
                .style("opacity", 0);
        })


.merge(categories)
        .transition()
        .style("fill", function(d, i) {
            return vis.colorScale(vis.dataCategories[i]);
        })
        .attr("d", function(d) {
            return vis.area(d);
        })




    // TO-DO: Update tooltip text

    categories.exit().remove();


    // Call axis functions with the new domain
    vis.svg.select(".x-axis").call(vis.xAxis);
    vis.svg.select(".y-axis").call(vis.yAxis);

}
