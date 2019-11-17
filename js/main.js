/* main JS file */

// Date parser to convert strings to date objects
var parseDate = d3.timeParse("%Y");
var formatTime = d3.timeFormat("%Y");


var area_chart;

d3.csv('data/StackedAreaChart.csv', function (data) {
    area_chart = new AreaChart('area-chart', data);

});