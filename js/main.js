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


function stackedAreaMults(data) {
    // https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/
    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    };

    var offense_descriptions = [];

    data.forEach(function (d) {
        offense_descriptions.push(d.OFFENSE_DESCRIPTION)
    });

    var classes = offense_descriptions.filter(unique).sort();

    var dataByClass = {};

    stackedAreaChart = new StackedAreaChart('stacked-area-chart', data);

    classes.forEach(function (d, i) {
        dataByClass[d] = [];
        d3.select('#small-mults').append('div')
            .attr('id', 'small-mult-' + i)
    });

    // set data for small multiples
    data.forEach(function(row) {
        if (dataByClass[row.OFFENSE_DESCRIPTION] != undefined) {
            dataByClass[row.OFFENSE_DESCRIPTION].push(row)
        }

    });

    classes.forEach(function (d, i) {
        smallMults.push(new SmallMult('small-mult-' + i, dataByClass[d], d))
    });

    d3.select('#all-mults')
        .append('p')
        .text('All classes')
        .on('click', function() {
            stackedAreaChart.data = data
            stackedAreaChart.wrangleData()
        });

    // helper function for small multiples
    setFilter = function setFilter(className) {
        stackedAreaChart.data = data.filter(function (row) {
            return (row.OFFENSE_DESCRIPTION == className)
        });

        stackedAreaChart.wrangleData()
    };

    return stackedAreaChart


};

queue()
    .defer(d3.json, 'data/Police_Districts.geojson')
    .defer(d3.csv, "data/drug_data_cats.csv")
    .await(function(error,dataGeo, dataDrugs) {
        var areaChart = stackedAreaMults(dataDrugs);
        new MapPlot('map', dataGeo, dataDrugs, areaChart.colorScale);
        // (5) Bind event handler
// when 'selectionChanged' is triggered, specified function is called


    });



