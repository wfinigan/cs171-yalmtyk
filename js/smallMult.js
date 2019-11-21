SmallMult = function(_parentElement, _data, _distName){
    this.parentElement = _parentElement;
    this.data = _data;
    this.distName = _distName

    this.initVis();
};


SmallMult.prototype.initVis = function(){
    let vis = this;

    vis.margin = { top: 0, right: 0, bottom: 0, left: 0 };

    vis.width = 150 - vis.margin.left - vis.margin.right,
        vis.height = 150 - vis.margin.top - vis.margin.bottom;



    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")")

    d3.select("#" + vis.parentElement)
        .on('click', function (d) {
            setFilter(vis.distName)
        });


    vis.svg.append('text')
        .attr('x', -20 + vis.width / 2)
        .attr('y', 10)
        .attr('class', 'small-mult-title')
        .text('District: ' + vis.distName)

    // Scales and axes
    vis.x = d3.scaleTime()
        .range([0, vis.width]);

    vis.y = d3.scaleLinear()
        .range([vis.height, 0]);

    vis.valueline = d3.line()
        .curve(d3.curveCardinal)
        .x(function(d) { return vis.x(parseDateYM(d.key)); })
        .y(function(d) { return vis.y(d.value); });

    vis.wrangleData();
};


SmallMult.prototype.wrangleData = function(){
    let vis = this;

    vis.nestedData = d3.nest()
        .key(function(d) { return d.date;})
        .rollup(function (d) {
            return d.length
        })
        .entries(vis.data);


    vis.nestedData = vis.nestedData.sort(function (a, b) {
        return parseDateYM(a.key) - parseDateYM(b.key)
    });


    vis.displayData = vis.nestedData;

    vis.updateVis();
};

SmallMult.prototype.updateVis = function() {
    var vis = this;

    vis.x.domain(d3.extent(vis.displayData, function(d) { return parseDateYM(d.key); }));
    vis.y.domain([0, d3.max(vis.displayData, function(d) { return d.value; })]);

    // Add the valueline path.
    vis.svg.append("path")
        .data([vis.displayData])
        .attr("stroke", "#ef3b2c")
        .attr("fill", "transparent")
        .attr("d", vis.valueline);

}
