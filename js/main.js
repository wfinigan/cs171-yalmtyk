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


var area_chart;

d3.csv('data/StackedAreaChart.csv', function (data) {
    area_chart = new AreaChart('area-chart', data);

});