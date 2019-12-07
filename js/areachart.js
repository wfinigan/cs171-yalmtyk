AreaChart = function(_parentElement, _data) {
  this.parentElement = _parentElement;
  this.data = _data;
  this.listData = [];

  this.initVis();
};


AreaChart.prototype.initVis = function() {
  let vis = this;

  vis.margin = {
    top: 40,
    right: 60,
    bottom: 60,
    left: 60
  };

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
    .range([0, vis.width]);

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
    // .curve(d3.curveCardinal)
    .x(function(d) {
      return vis.x(d.data.year);
    })
    .y0(function(d) {
      return vis.y(d[0]);
    })
    .y1(function(d) {
      return vis.y(d[1]);
    });


  vis.wrangleData();
};


AreaChart.prototype.wrangleData = function() {
  let vis = this;

  vis.yearData = [];

  vis.data.forEach(function(d) {
    Object.keys(d).forEach(function(key) {
      if (key.length == 4) {
        vis.yearData.push({
          year: parseDate(key),
          offense_type: d.Offense_Group,
          value: +d[key]
        })
      }
    })
  });

  vis.dataDict = {};

  vis.yearData.forEach(function(d) {
    if (vis.dataDict[formatTime(d.year)] == undefined) {
      vis.dataDict[formatTime(d.year)] = {};
    }
    vis.dataDict[formatTime(d.year)][d.offense_type] = d.value;
  });

  d3.keys(vis.dataDict).forEach(function(key) {
    var tempData = {};
    tempData = vis.dataDict[key];
    tempData['year'] = parseDate(key)
    vis.listData.push(tempData)
  });


  vis.dataCategories = d3.keys(vis.listData[0]).filter(function(d) {
    return d != "year";
  });

  vis.x.domain(d3.extent(vis.listData, function(d) {
    return d.year
  }));

  vis.stack = d3.stack()
    .keys(vis.dataCategories);

  vis.displayData = vis.stack(vis.listData);


  vis.updateVis();
};

AreaChart.prototype.updateVis = function() {
  var vis = this;

  // Update domain
  // Get the maximum of the multi-dimensional array or in other words, get the highest peak of the uppermost layer
  vis.y.domain([0, d3.max(vis.displayData, function(d) {
    return d3.max(d, function(e) {
      return e[1];
    });
  })]);

  // Draw the layers
  var categories = vis.svg.selectAll(".area")
    .data(vis.displayData);

  categories.enter().append("path")
    .attr("class", "area")
    .merge(categories)
    .style("fill", function(d) {
      if (d.key == "Drug Violation") {
        return '#992423'
      } else {
        return '#ccc'
      }


    })
    .attr("stroke", '#bbb')
    .attr("d", function(d) {
      return vis.area(d);
    })
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
    });


  // Call axis functions with the new domain
  vis.svg.select(".x-axis").call(vis.xAxis);
  vis.svg.select(".y-axis").call(vis.yAxis);

}