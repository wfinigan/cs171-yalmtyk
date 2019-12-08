/* main JS file */


// settings for navigation
var myFullpage = new fullpage('#fullpage', {
  anchors: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  sectionsColor: [],
  navigation: true,
  navigationPosition: 'right',
  navigationTooltips: ['Title', 'Intro', 'Background', 'Map', 'Violations by Location', 'Violations by Hour', 'Violations by Class', 'The Drop Off', 'Policing Strategy', 'Intent to Distribute vs Possession', 'So What?', 'About']
});

// Date parser to convert strings to date objects
var parseDate = d3.timeParse("%Y");
var formatTime = d3.timeFormat("%Y");

var parseDateYM = d3.timeParse("%m/%Y")

var area_chart,
  stackedAreaChart,
  setFilter;

var smallMults = [];

$('#show-area-chart').on('click', function() {
  $('#overlay').attr('class', 'overlay-hide')
});

$('#show-hint-area').on('click', function() {
  $('#hint-text').attr("style", 'opacity: 1;')
})

function stackedAreaMults(data) {
  // https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/
  const unique = (value, index, self) => {
    return self.indexOf(value) === index
  };

  var offense_descriptions = ['All Classes'];

  data.forEach(function(d) {
    offense_descriptions.push(d.OFFENSE_DESCRIPTION)
  });

  var classes = offense_descriptions.filter(unique).sort();

  var dataByClass = {};

  stackedAreaChart = new StackedAreaChart('stacked-area-chart', data);

  classes.forEach(function(d, i) {
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

  dataByClass['All Classes'] = data;

  classes.forEach(function(d, i) {
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
    stackedAreaChart.data = data.filter(function(row) {
      return (row.OFFENSE_DESCRIPTION == className) || (className == "All Classes")
    });

    stackedAreaChart.wrangleData()
  };

  var classDData = data.filter(function(row) {
    return (row.OFFENSE_DESCRIPTION == 'CLASS D')
  });

  new StackedAreaChart('area-class-d', classDData);

  return stackedAreaChart


};

queue()
  .defer(d3.json, 'data/Police_Districts.geojson')
  .defer(d3.csv, "data/drug_data_cats.csv")
  .await(function(error, dataGeo, dataDrugs) {
    var areaChart = stackedAreaMults(dataDrugs);
    new MapPlot('map', dataGeo, dataDrugs, areaChart.colorScale);
  });

d3.csv("data/ClassDViolations.csv", function(data) {
  console.log(data)
  linegraph = new LineGraph('linegraph-chart', data)
});

var bigclock = new BigClock();
var clock = new Clock();


$('#show-hint-area').on('click', function() {
  stackedAreaChart.lineTime.attr("style", 'opacity: 1;')
  stackedAreaChart.textTime.attr("style", 'opacity: 1;')

})


