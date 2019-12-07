MapPlot = function(_parentElement, _dataGeo, _dataDrugs, _colorScale){
    this.parentElement = _parentElement;
    this.dataGeo = _dataGeo;
    this.dataDrugs = _dataDrugs;
    this.colorScale = _colorScale;
    this.dataDrugsFull = _dataDrugs;

    this.initVis();
};


MapPlot.prototype.initVis = function(){
    let vis = this;

    vis.margin = { top: 40, right: 60, bottom: 60, left: 60 };

    vis.scale = (110000/ 953) * ($('#map').width());

    vis.width = $('#map').width() - vis.margin.left - vis.margin.right,
        vis.height = $('#map').width() / 2 - vis.margin.top - vis.margin.bottom;

    console.log($('#map').width())
    console.log(vis.scale)
    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left  + "," + vis.margin.top + ")");


    vis.projection = d3.geoMercator()
        .center([-71.068797,42.342923])
        .translate([vis.width / 2, vis.height / 3])
        .scale(vis.scale);

    vis.path = d3.geoPath()
        .projection(vis.projection);

    vis.legendToolDiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    vis.wrangleData();
};


MapPlot.prototype.wrangleData = function(){
    let vis = this;

    vis.updateVis();
};

MapPlot.prototype.updateVis = function() {
    var vis = this;

    var districts = vis.dataGeo.features;

    // Render the U.S. by using the path generator
    vis.svg.selectAll("path")
        .data(districts)
        .enter().append("path")
        .attr("d", vis.path);

    var dots = vis.svg.selectAll('.crimeDot')
        .data(vis.dataDrugs, function(d) {return d.INCIDENT_NUMBER + d.OFFENSE_CODE});

    var dotsEnter = dots
        .enter()

    dotsEnter
        .append("circle")
        .attr('class', 'crimeDot')
        .attr("cx", function (d) { return vis.projection([d.Long, d.Lat])[0]; })
        .attr("cy", function (d) { return vis.projection([d.Long, d.Lat])[1]; })
        .attr('r', '2px')
        .attr('fill', function (d) {
            return vis.colorScale(d.OFFENSE_DESCRIPTION)
        });

    dots.exit().remove();


    var legendBoxWidth = 20;
    var buffer = 10;

    vis.svg.selectAll('rect')
        .data(vis.colorScale.domain())
        .enter()
        .append('rect')
        .attr('width', legendBoxWidth)
        .attr('height', legendBoxWidth)
        .attr('fill', function (d) {
            return vis.colorScale(d)
        })
        .attr('x', 10)
        .attr('y', function(d, index) { return (legendBoxWidth + buffer) * index })
        .on("mouseover", function(d) {
            vis.legendToolDiv.transition()
                .duration(200)
                .style("opacity", .9);
            vis.legendToolDiv.html(getDescriptions(d))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            vis.legendToolDiv.transition()
                .duration(500)
                .style("opacity", 0);
        })

    vis.svg.selectAll('.legendLabel')
        .data(vis.colorScale.domain())
        .enter()
        .append('text')
        .text(function (d) {
            return toTitleCase(d)
        })
        .attr('x', 35)
        .attr('y', function(d, index) { return 15 + (legendBoxWidth + buffer) * index })
        .attr('class', 'legendLabel')
        .on('click', function (d) {
            filter(d, vis)
        })
        .on("mouseover", function(d) {
            vis.legendToolDiv.transition()
                .duration(200)
                .style("opacity", .9);
            vis.legendToolDiv.html(getDescriptions(d))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            vis.legendToolDiv.transition()
                .duration(500)
                .style("opacity", 0);
        });

    vis.svg.append('text')
        .attr('class', 'legendLabel')
        .text('Hover for description')
        .attr('x', -5)
        .attr('y', -5)
        .attr('style', 'font-weight: bold');

};

// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function filter(crimeType, vis) {
    vis.dataDrugs = vis.dataDrugsFull.filter(function (d) {
        return (d.OFFENSE_DESCRIPTION == crimeType)
    });

    vis.wrangleData()
}


