Clock = function(_parentElement) {
  this.parentElement = _parentElement;
  this.initVis();
};

Clock.prototype.initVis = function() {
  var vis = this;
  //(ignore "count")
  //2016 by hour of day
  vis.dataset2 = [{
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
  vis.dataset3 = [{
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
  vis.dataset4 = [{
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

  vis.hours = ["12am", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12pm", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]

  vis.margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  };


  vis.width = 250 - vis.margin.right - vis.margin.left;
  vis.height = 250 - vis.margin.top - vis.margin.bottom;
  vis.radius1 = Math.min(vis.width, vis.height) / 2 - 10;


  vis.colorScale = d3.scaleQuantize()
      .range(['#ffeae8', '#fca5a2', '#fb6961', '#cb181d', '#a50f15', '#67000d'])
      .domain([0, 100])

  vis.divTooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  vis.svg1 = d3.select('#R')
      .append('svg')
      .attr('width', vis.width + vis.margin.right + vis.margin.left)
      .attr('height', vis.height + vis.margin.top + vis.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + vis.margin.left * 4 + "," + vis.margin.top * 5 + ")");


  vis.arc1 = d3.arc()
      .innerRadius(50)
      .outerRadius(vis.radius1);

  vis.pie = d3.pie()
      .value(function (d) {
        return d.count;
      })
      .sort(null);

  vis.path1 = vis.svg1.selectAll('path')
      .data(vis.pie(vis.dataset4))
      .enter()
      .append('path')
      .attr('d', vis.arc1)
      .attr("stroke-width", 2)
      .attr("stroke", "white")
      .attr('fill', function (d, i) {
        return vis.colorScale(vis.dataset4[i].num);
      })
      .on("mouseover", function (d) {
        vis.divTooltip.transition()
            .duration(200)
            .style("opacity", .9);
        vis.divTooltip.html(
            "Year: 2018 " + "<br>" + "Hour: " + vis.hours[i] + "<br>" +
            "# of Drug Violations: " + d.data.num
        )
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        vis.divTooltip.transition()
            .duration(500)
            .style("opacity", 0);
      })

  vis.svg1.append("text")
      .attr("x", (0))
      .attr("y", (5))
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text("2018");


  //labels around edges:

  //evenly spaced number around clock
  vis.nums = [];

  for (i = 0; i < 24; i++) {
    vis.angle = (i / (12)) * Math.PI + 11.1; // Calculate the angle at which the element will be placed.
    // For a semicircle, we would use (i / numNodes) * Math.PI.
    x = (92 * Math.cos(vis.angle)) + (10 / 2); // Calculate the x position of the element.
    y = (92 * Math.sin(vis.angle)) + (10 / 2); // Calculate the y position of the element.
    vis.nums.push({
      'id': i,
      'x': x,
      'y': y
    });
  }

  for (i = 0; i < 24; i++) {
    vis.svg1.append("text")
        .attr("x", vis.nums[i].x - 5)
        .attr("y", vis.nums[i].y)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text(vis.hours[i])
        .style("font-size", "12px")
  }


  //2017 clock
  vis.svg2 = d3.select('#midR')
      .append('svg')
      .attr('width', vis.width + vis.margin.right + vis.margin.left)
      .attr('height', vis.height + vis.margin.top + vis.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + vis.margin.left * 4 + "," + vis.margin.top * 5 + ")");

  vis.path2 = vis.svg2.selectAll('path')
      .data(vis.pie(vis.dataset3))
      .enter()
      .append('path')
      .attr("stroke-width", 2)
      .attr("stroke", "white")
      .attr('d', vis.arc1)
      .attr('fill', function (d, i) {
        return vis.colorScale(vis.dataset3[i].num);
      })
      .on("mouseover", function (d, i) {
        vis.divTooltip.transition()
            .duration(800)
            .style("opacity", .9);
        vis.divTooltip.html("Year: 2017 " + "<br>" + "Hour: " + vis.hours[i] + "<br>" +
            "# of Drug Violations: " + d.data.num)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 45) + "px")
      })
      .on("mouseout", function (d) {
        vis.divTooltip.transition()
            .duration(800)
            .style("opacity", 0);
      })

  vis.svg2.append("text")
      .attr("x", (0))
      .attr("y", (5))
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text("2017");


  //labels around edges:
  vis.nums = [];

  for (i = 0; i < 24; i++) {
    vis.angle = (i / (12)) * Math.PI + 11.1; // Calculate the angle at which the element will be placed.
    // For a semicircle, we would use (i / numNodes) * Math.PI.
    x = (92 * Math.cos(vis.angle)) + (10 / 2); // Calculate the x position of the element.
    y = (92 * Math.sin(vis.angle)) + (10 / 2); // Calculate the y position of the element.
    vis.nums.push({
      'id': i,
      'x': x,
      'y': y
    });
  }

  for (i = 0; i < 24; i++) {
    vis.svg2.append("text")
        .attr("x", vis.nums[i].x - 5)
        .attr("y", vis.nums[i].y)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text(vis.hours[i])
        .style("font-size", "12px")
  }


  //labels around edges:


  //2016 clock
  vis.svg3 = d3.select('#midL')
      .append('svg')
      .attr('width', vis.width + vis.margin.right + vis.margin.left)
      .attr('height', vis.height + vis.margin.top + vis.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + vis.margin.left * 4 + "," + vis.margin.top * 5 + ")");

  vis.path3 = vis.svg3.selectAll('path')
      .data(vis.pie(vis.dataset2))
      .enter()
      .append('path')
      .attr("stroke-width", 2)
      .attr("stroke", "white")
      .attr('d', vis.arc1)
      .attr('fill', function (d, i) {
        return vis.colorScale(vis.dataset2[i].num);
      })
      .on("mouseover", function (d, i) {
        vis.divTooltip.transition()
            .duration(800)
            .style("opacity", .9);
        vis.divTooltip.html("Year: 2016 " + "<br>" + "Hour: " + vis.hours[i] + "<br>" +
            "# of Drug Violations: " + d.data.num)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 45) + "px")
      })
      .on("mouseout", function (d) {
        vis.divTooltip.transition()
            .duration(800)
            .style("opacity", 0);
      })

  vis.svg3.append("text")
      .attr("x", (0))
      .attr("y", (5))
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text("2016");


  //labels around edges:
  vis.nums = [];

  for (i = 0; i < 24; i++) {
    vis.angle = (i / (12)) * Math.PI + 11.1; // Calculate the angle at which the element will be placed.
    // For a semicircle, we would use (i / numNodes) * Math.PI.
    x = (92 * Math.cos(vis.angle)) + (10 / 2); // Calculate the x position of the element.
    y = (92 * Math.sin(vis.angle)) + (10 / 2); // Calculate the y position of the element.
    vis.nums.push({
      'id': i,
      'x': x,
      'y': y
    });
  }
  console.log('oop test');
  for (i = 0; i < 24; i++) {
    vis.svg3.append("text")
        .attr("x", vis.nums[i].x - 5)
        .attr("y", vis.nums[i].y)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text(vis.hours[i])
        .style("font-size", "12px")
  }
}