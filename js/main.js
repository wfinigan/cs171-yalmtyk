/* main JS file */

// settings for navigation
var myFullpage = new fullpage('#fullpage', {
    anchors: ['firstPage', 'secondPage', '3rdPage'],
    sectionsColor: ['#507EB3', '#B31405', '#507EB3', '#B31405', '#507EB3', '#B31405', '#507EB3'],
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['Title', 'Intro', 'Area Chart', 'Visualization 2', 'Visualization 3', 'Visualization 4', 'Conclusion']
});


// Date parser to convert strings to date objects
var parseDate = d3.timeParse("%Y");
var formatTime = d3.timeFormat("%Y");

var parseDateYM = d3.timeParse("%m/%Y")


var area_chart,
    stackedAreaChart,
    setFilter;

var smallMults = [];


d3.csv('data/StackedAreaChart.csv', function (data) {
    area_chart = new AreaChart('area-chart', data);

});

function stackedAreaMults(data) {
    var districts = ['D4', 'E13', 'C11', 'D14', 'A1', 'B2', 'E5', 'B3', 'A7', 'C6', 'E18', 'A15'];

    var dataDist = {};

    stackedAreaChart = new StackedAreaChart('stacked-area-chart', data);

    districts.forEach(function (d) {
        dataDist[d] = [];
        d3.select('#small-mults').append('div')
            .attr('id', 'small-mult-' + d)
    });

    // set data for small multiples
    data.forEach(function(row) {
        if (dataDist[row.DISTRICT] != undefined) {
            dataDist[row.DISTRICT].push(row)
        }

    });

    districts.forEach(function (d) {
        smallMults.push(new SmallMult('small-mult-' + d, dataDist[d], d))
    });

    d3.select('#all-mults')
        .append('p')
        .text('All districts')
        .on('click', function() {
            stackedAreaChart.data = data
            stackedAreaChart.wrangleData()
        });

    // helper function for small multiples
    setFilter = function setFilter(distName) {
        stackedAreaChart.data = data.filter(function (row) {
            return row.DISTRICT == distName
        });

        stackedAreaChart.wrangleData()
    }

    return stackedAreaChart


};

queue()
    .defer(d3.json, 'data/Police_Districts.geojson')
    .defer(d3.csv, "data/drug_data_cats.csv")
    .await(function(error,dataGeo, dataDrugs) {
        var areaChart = stackedAreaMults(dataDrugs);
        new MapPlot('map', dataGeo, dataDrugs, areaChart.colorScale);
        timeline = new Timeline("timeline");

    });

function brushed() {
    // TO-DO: React to 'brushed' event
    // Get the extent of the current brush
    var selectionRange = d3.brushSelection(d3.select(".brush").node());
    // Convert the extent into the corresponding domain values

    var selectionDomain = selectionRange.map(timeline.x.invert);

    bubblechart.x.domain(selectionDomain);


    // areachart.stackedData =

    bubblechart.wrangleData();

}

function filter(crimeType, vis) {
    vis.dataDrugs = vis.dataDrugsFull.filter(function (d) {
        return (d.OFFENSE_DESCRIPTION == crimeType)
    });

    vis.wrangleData()
}