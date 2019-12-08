//DATA
//2016 by hour of day
var dataset2 = [{
  count: 25,
  num: 15
},
  {
    count: 25,
    num: 10
  },
  {
    count: 25,
    num: 3
  },
  {
    count: 25,
    num: 5
  },
  {
    count: 25,
    num: 6
  },
  {
    count: 25,
    num: 1
  },
  {
    count: 25,
    num: 3
  },
  {
    count: 25,
    num: 3
  },
  {
    count: 25,
    num: 19
  },
  {
    count: 25,
    num: 15
  },
  {
    count: 25,
    num: 29
  },
  {
    count: 25,
    num: 28
  },
  {
    count: 25,
    num: 31
  },
  {
    count: 25,
    num: 48
  },
  {
    count: 25,
    num: 29
  },
  {
    count: 25,
    num: 43
  },
  {
    count: 25,
    num: 54
  },
  {
    count: 25,
    num: 83
  },
  {
    count: 25,
    num: 96
  },
  {
    count: 25,
    num: 81
  },
  {
    count: 25,
    num: 39
  },
  {
    count: 25,
    num: 19
  },
  {
    count: 25,
    num: 11
  },
  {
    count: 25,
    num: 6
  }
];

//2017 by hour of day
var dataset3 = [{
  count: 25,
  num: 4
},
  {
    count: 25,
    num: 9
  },
  {
    count: 25,
    num: 5
  },
  {
    count: 25,
    num: 0
  },
  {
    count: 25,
    num: 2
  },
  {
    count: 25,
    num: 2
  },
  {
    count: 25,
    num: 4
  },
  {
    count: 25,
    num: 3
  },
  {
    count: 25,
    num: 2
  },
  {
    count: 25,
    num: 9
  },
  {
    count: 25,
    num: 15
  },
  {
    count: 25,
    num: 11
  },
  {
    count: 25,
    num: 12
  },
  {
    count: 25,
    num: 30
  },
  {
    count: 25,
    num: 17
  },
  {
    count: 25,
    num: 19
  },
  {
    count: 25,
    num: 29
  },
  {
    count: 25,
    num: 49
  },
  {
    count: 25,
    num: 32
  },
  {
    count: 25,
    num: 33
  },
  {
    count: 25,
    num: 10
  },
  {
    count: 25,
    num: 9
  },
  {
    count: 25,
    num: 6
  },
  {
    count: 25,
    num: 4
  }
];

//2018 by hour of day
var dataset4 = [{
  count: 25,
  num: 6
},
  {
    count: 25,
    num: 11
  },
  {
    count: 25,
    num: 4
  },
  {
    count: 25,
    num: 3
  },
  {
    count: 25,
    num: 5
  },
  {
    count: 25,
    num: 1
  },
  {
    count: 25,
    num: 1
  },
  {
    count: 25,
    num: 3
  },
  {
    count: 25,
    num: 9
  },
  {
    count: 25,
    num: 15
  },
  {
    count: 25,
    num: 13
  },
  {
    count: 25,
    num: 17
  },
  {
    count: 25,
    num: 28
  },
  {
    count: 25,
    num: 18
  },
  {
    count: 25,
    num: 22
  },
  {
    count: 25,
    num: 20
  },
  {
    count: 25,
    num: 30
  },
  {
    count: 25,
    num: 39
  },
  {
    count: 25,
    num: 34
  },
  {
    count: 25,
    num: 30
  },
  {
    count: 25,
    num: 22
  },
  {
    count: 25,
    num: 3
  },
  {
    count: 25,
    num: 6
  },
  {
    count: 25,
    num: 6
  }
];

var hours = ["12am", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12pm", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00"]

var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};


var width = 500 - margin.right - margin.left;
var height = 500 - margin.top - margin.bottom;
var donutWidth = 95;
var radius1 = Math.min(width, height) / 2;
var radius2 = radius1 / 2 + 50;
var radius3 = radius2 / 2 + 20;



var colorScale = d3.scaleQuantize()
    .range(['#ffeae8', '#fca5a2', '#fb6961', '#cb181d', '#a50f15', '#67000d'])
    .domain([0, 100])

var divTooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select('#L')
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var svg1 = svg.append('g')
    .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');
var svg2 = svg.append('g')
    .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');
var svg3 = svg.append('g')
    .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');
var svg4 = svg.append('g')
    .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');

var arc1 = d3.arc()
    .innerRadius(radius1 - donutWidth)
    .outerRadius(radius1);
var arc2 = d3.arc()
    .innerRadius(radius2 - donutWidth)
    .outerRadius(radius2);
var arc3 = d3.arc()
    .innerRadius(radius3 - donutWidth)
    .outerRadius(radius3);

var pie = d3.pie()
    .value(function(d) {
      return d.count;
    })
    .sort(null);

var path1 = svg1.selectAll('path')
    .data(pie(dataset4))
    .enter()
    .append('path')
    .attr('d', arc1)
    .attr("stroke-width", 2)
    .attr("stroke", "white")
    .attr('fill', function(d, i) {
      return colorScale(dataset4[i].num);
    })
    .on("mouseover", function(d, i) {
      divTooltip.transition()
          .duration(800)
          .style("opacity", .9);
      divTooltip.html("Year: 2018 " + "<br>" + "Hour: " + hours[i] + "<br>" +
          "# of Drug Violations: " + d.data.num)
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 45) + "px")
    })
    .on("mouseout", function(d) {
      divTooltip.transition()
          .duration(800)
          .style("opacity", 0);
    })

var path2 = svg2.selectAll('path')
    .data(pie(dataset3))
    .enter()
    .append('path')
    .attr("stroke-width", 2)
    .attr("stroke", "white")
    .attr('d', arc2)
    .attr('fill', function(d, i) {
      return colorScale(dataset3[i].num);
    })
    .on("mouseover", function(d, i) {
      divTooltip.transition()
          .duration(800)
          .style("opacity", .9);
      divTooltip.html("Year: 2017 " + "<br>" + "Hour: " + hours[i] + "<br>" +
          "# of Drug Violations: " + d.data.num)
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 45) + "px")
    })
    .on("mouseout", function(d) {
      divTooltip.transition()
          .duration(800)
          .style("opacity", 0);
    })
var path3 = svg3.selectAll('path')
    .data(pie(dataset2))
    .enter()
    .append('path')
    .attr('d', arc3)
    .attr("stroke-width", 2)
    .attr("stroke", "white")
    .attr('fill', function(d, i) {
      return colorScale(dataset2[i].num);
    })
    .on("mouseover", function(d, i) {
      divTooltip.transition()
          .duration(800)
          .style("opacity", .9);
      divTooltip.html("Year: 2016 " + "<br>" + "Hour: " + hours[i] + "<br>" +
          "# of Drug Violations: " + d.data.num)
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 45) + "px")
    })
    .on("mouseout", function(d) {
      divTooltip.transition()
          .duration(800)
          .style("opacity", 0);
    })


svg.append("text")
    .attr("x", (width / 2))
    .attr("y", (height / 3))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("2016");
svg.append("text")
    .attr("x", (width / 2))
    .attr("y", (height / 5))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("2017");
svg.append("text")
    .attr("x", (width / 2))
    .attr("y", (height / 20))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("2018");

var w = 70,
    h = 140;
var keyTitle = d3.select("#key")
    .append("text")
    .attr("x", 0)
    .attr("y", 5)
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .style("text-decoration", "underline")
    .text("#Violations")


var key = d3.select("#key")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var legend = key.append("defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "100%")
    .attr("y1", "100%")
    .attr("x2", "100%")
    .attr("y2", "0%")
    .attr("spreadMethod", "pad");

legend.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#fff5f0")
    .attr("stop-opacity", 1);


legend.append("stop")
    .attr("offset", "20%")
    .attr("stop-color", "#fca5a2")
    .attr("stop-opacity", 1);

legend.append("stop")
    .attr("offset", "40%")
    .attr("stop-color", "#fb6961")
    .attr("stop-opacity", 1);
legend.append("stop")
    .attr("offset", "60%")
    .attr("stop-color", "#cb181d")
    .attr("stop-opacity", 1);

legend.append("stop")
    .attr("offset", "80%")
    .attr("stop-color", "#a50f15")
    .attr("stop-opacity", 1);

legend.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#67000d")
    .attr("stop-opacity", 1);




key.append("rect")
    .attr("width", 40)
    .attr("height", h)
    .style("fill", "url(#gradient)")
    .attr("transform", "translate(-20,10)");

var y = d3.scaleLinear()
    .range([-20, h - 10])
    .domain([100, 0]);

var yAxis = d3.axisRight()
    .scale(y)
    .ticks(5);

key.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(20,30)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("axis title");


//evenly spaced number around clock
var nums = [];

for (i = 0; i < 24; i++) {
  var angle = (i / (12)) * Math.PI + 11.1; // Calculate the angle at which the element will be placed.
  // For a semicircle, we would use (i / numNodes) * Math.PI.
  x = (225 * Math.cos(angle)) + (10 / 2); // Calculate the x position of the element.
  y = (225 * Math.sin(angle)) + (10 / 2); // Calculate the y position of the element.
  nums.push({
    'id': i,
    'x': x,
    'y': y
  });
}

for (i = 0; i < 24; i++) {
  svg.append("text")
      .attr("x", nums[i].x + 195)
      .attr("y", nums[i].y + 200)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text(hours[i])
}