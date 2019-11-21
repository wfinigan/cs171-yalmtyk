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
    smallMult,
    setFilter;


d3.csv('data/StackedAreaChart.csv', function (data) {
    area_chart = new AreaChart('area-chart', data);

});

d3.csv('data/drug_data_cats.csv', function (data) {
    var districts = ['D4', 'E13', 'C11', 'D14', 'A1', 'B2', 'E5', 'B3', 'A7', 'C6', 'E18', 'A15'];
    
    var dataDist = {}

    stackedAreaChart = new StackedAreaChart('stacked-area-chart', data);

    districts.forEach(function (d) {
        dataDist[d] = [];
        d3.select('#small-mults').append('div')
            .attr('id', 'small-mult-' + d)
    });

    data.forEach(function(row) {
        if (dataDist[row.DISTRICT] != undefined) {
            dataDist[row.DISTRICT].push(row)
        }

    });

    districts.forEach(function (d) {
        new SmallMult('small-mult-' + d, dataDist[d], d)
    });

    setFilter = function setFilter(distName) {
        stackedAreaChart.data = data.filter(function (row) {
            return row.DISTRICT == distName
        });

        stackedAreaChart.wrangleData()
    }

});

