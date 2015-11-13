// var app = angular.module('TimeReportApp', [])

app.directive('barChart', function(){
    function link(scope, el){

        var dataArray = [];
        dataArray[0]= scope.val;
      //  var dataArray=[1,2,3];
        var width = 500;
        var height = 800;

        var widthScale = d3.scale.linear()
            .domain([0, 60])
            .range([0, width]);

        var heighScale = d3.scale.linear()
            .domain([0,60])
            .range([0, height]);

        var color = d3.scale.linear()
            .domain([0, 60])
            .range(["red", "blue"]);

        var axis = d3.svg.axis()
            .ticks(5)
            .scale(widthScale);

        var canvas = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(20, 0)"); //flytta, rotera o sånt

        var bars = canvas.selectAll("rect")
            .data(dataArray)
            .enter()
            .append("rect")
            .attr("width", function(d) { return widthScale(d); })
            .attr("height", 50)
            .attr("fill", function(d) { return color(d) })
            .attr("y", function(d, i) { return i * 100 });

        canvas.append("g")
            .attr("transform", "translate(0, 700)")
            .call(axis);

    }
    return {
        restrict: 'E',
        scope: {
            val: '=',
            grouped: '='
        },
        link: link

    }
});



app.directive('testChart', function($window){
    function link(scope, elem, attrs) {
        var dataToPlot=scope[attrs.val];
        var padding = 20;
        var pathClass = "path";
        var xScale, yScale, xAxisGen, yAxisGen, lineFun;

        var d3 = $window.d3;
        var rawSvg = elem.find("svg")[0];
        var svg = d3.select(rawSvg);


        function setChartParameters(){
            xScale = d3.scale.linear()
                .domain([dataToPlot[0].project, dataToPlot[dataToPlot.length - 1].project])
                .range([padding + 5, rawSvg.clientWidth - padding]);

            yScale = d3.scale.linear()
                .domain([0, d3.max(dataToPlot, function (d) {
                    return d.time;
                })])
                .range([rawSvg.clientHeight - padding, 0]);

            xAxisGen = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(dataToPlot.length - 1);

            yAxisGen = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(5);

            lineFun = d3.svg.line()
                .x(function (d) {
                    return xScale(d.project);
                })
                .y(function (d) {
                    return yScale(d.time);
                })
                .interpolate("basis");
        }

        function drawLineChart() {

            setChartParameters();

            svg.append("svg:g")
                .attr("class", "x axis")
                .attr("transform", "translate(0,180)")
                .call(xAxisGen);

            svg.append("svg:g")
                .attr("class", "y axis")
                .attr("transform", "translate(20,0)")
                .call(yAxisGen);

            svg.append("svg:path")
                .attr({
                    d: lineFun(dataToPlot),
                    "stroke": "blue",
                    "stroke-width": 2,
                    "fill": "none",
                    "class": pathClass
                });
        }



        drawLineChart();
    }
    return {
        restrict: 'EA',
        template: "<svg width='850' height='200'></svg>",
        link: link


        }
});

app.directive('burndownChart', function($window){
    var canvas = d3.select("body")
        .append("svg")
        .attr("width", 500)
        .attr("height", 800);

    function link(scope, elem, attrs) {

        console.log("running directive with myChart")
        //making data into arrays. Seperated different tupples in database.
        var rawData = scope[attrs.val]; //data from our database
        var dataTime = [];
        var dataProject = [];
        var testArray = [];
        var filtered = rawData.filter(function (item) {
            return item.project == 1;
        });
        for (var x in filtered) {
            testArray.push(filtered[x].time);
        }

        for (var x in rawData) {
            dataTime.push(rawData[x].time);
        }
        for (var x in rawData) {
            dataProject.push(rawData[x].project);
        }

        //getting all the unique projects in an array
        var uniqueProjects = dataProject.filter(function (item, i, ar) {
            return ar.indexOf(item) === i;
        });

        //get an array with all time for a specific project
        function getTimeForProject(projectnumber) {
            var projectTime = [];
            for (i = 0; i < rawData.length; i++) {
                if (rawData[i].project == projectnumber) {
                    projectTime.push(rawData[i].time)
                }
            }
            return projectTime;
        }
/*
        var canvas = d3.select("body")
            .append("svg")
            .attr("width", 500)
            .attr("height", 800);
*/
        var width = 1000;
        var height = 500;
        var margins = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        };

        var color = d3.scale.linear()
            .domain([-1, 101])
            .range(["blue", "red"]);


        xScale = d3.scale.linear().range([margins.left, width - margins.right]).domain([0, 20]),
            yScale = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([0, 100]),
            xAxis = d3.svg.axis()
                .scale(xScale),

            yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");

        canvas.append("svg:g")
            .attr("transform", "translate(0," + (height - margins.bottom) + ")")
            .call(xAxis);
        canvas.append("svg:g")
            .attr("transform", "translate(" + (margins.left) + ",0)")
            .call(yAxis);

        var lineGen = d3.svg.line()
            .x(function (d, i) {
                return xScale(i);
            })
            .y(function (d) {

                startTime = startTime - d
                return yScale(startTime);
            })
            .interpolate("crispEdges");

         for (var x in uniqueProjects) {
              //alert(uniqueProjects[x]);
             var startTime = 100;
             reportedTimeForProject = getTimeForProject(uniqueProjects[x]);
             reportedTimeForProject.unshift(0);

             var sumOfProjectTime = reportedTimeForProject.reduce(function(pv, cv) { return pv + cv; }, 0);
             canvas.append('svg:path')
                 .attr('d', lineGen(reportedTimeForProject))
                 .attr('stroke', function() { return color(sumOfProjectTime) })
                 .attr('stroke-width', 2)
                 .attr('fill', 'none');
         }

    }
        return {
            restrict: 'EA',
            replace: true,
            link: link
        }

});


//this chart is inactive at the moment
app.directive('oldChart', function($window){
    function link(scope, elem, attrs) {
        var dataToPlot=scope[attrs.val]; //data from our database
        var padding = 40;
        var pathClass = "path";
        var xScale, yScale, xAxisGen, yAxisGen, lineFun;
        //give the project 100 hours for work. For the moment
        var totalProjectTime = 100;
        var newProjectTime = 0;
        var d3 = $window.d3;
        var rawSvg = elem.find("svg")[0];
        var svg = d3.select(rawSvg);
        var numberOfInputs = -1;


        function setChartParameters(){
            xScale = d3.scale.linear()
                .domain([0, dataToPlot.length-1])
                .range([padding + 5, rawSvg.clientWidth - padding]);


            yScale = d3.scale.linear()
                .domain([0, totalProjectTime])
                .range([rawSvg.clientHeight - padding, 0]);

            yScale = d3.scale.linear()
                .domain([0, totalProjectTime])
                .range([rawSvg.clientHeight - padding, 0]);

            xAxisGen = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(dataToPlot.length - 1);

            yAxisGen = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(5);

            newProjectTime = totalProjectTime;
            lineFun = d3.svg.line()
                .x(function (d) {
                    numberOfInputs = numberOfInputs + 1;
                    return xScale(numberOfInputs);
                })
                .y(function (d) {
                    newProjectTime = newProjectTime - d.time;
                    return yScale(newProjectTime);
                })
                .interpolate("basis");
        }

        function drawLineChart() {

            setChartParameters();

            svg.append("svg:g")
                .attr("class", "x axis")
                .attr("transform", "translate(0,180)")
                .call(xAxisGen);


            svg.append("svg:g")
                .attr("class", "y axis")
                .attr("transform", "translate(40,0)")
                .call(yAxisGen);

            svg.append("svg:path")
                .attr({
                    d: lineFun(dataToPlot),
                    "stroke": "blue",
                    "stroke-width": 2,
                    "fill": "none",
                    "class": pathClass
                });
        }

        function redrawLineChart() {

            setChartParameters();
            svg.selectAll("g.y.axis").call(yAxisGen);
            svg.selectAll("g.x.axis").call(xAxisGen);

            svg.selectAll("." + pathClass)
                .attr({
                    d: lineFun(dataToPlot)
                });
        }
        drawLineChart();
    }
    return {
        restrict: 'EA',
        template: "<svg width='850' height='220'></svg>",
        link: link
    }
});


// My newest test-chart
app.directive('rasmusChart', function($window){
    var directive = { };
    directive.restrict = 'AE';

    directive.scope = {
        x: '=?',
        y: '=barChart',
        options: '=?'
    };

    directive.link = function(scope, elements, attr) {
        scope.svg = null;
        scope.container = null;

        scope.getX = function() {
            var x = null;
            if (scope.x) {
                x = scope.x;
            } else {
                x = _.keys(scope.y);
            }
            return x;
        };

        scope.getOptions = function() {
            return _.merge({
                width: 1000,
                height: 400,
                margin: {
                    top: 10,
                    right: 10,
                    bottom: 30,
                    left: 50
                }
            }, scope.options || { });
        };

        scope.initialize = function() {
            scope.svg = d3.select(elements[0]).append("svg").attr("class", "chart");
            scope.container = scope.svg.append("g");
            scope.container.append("g").attr("class", "x");
            scope.container.append("g").attr("class", "y");
            scope.setSvgSize();
        };

        scope.setSvgSize = function() {
            var options = scope.getOptions();
            scope.container.attr("transform", "translate(" + options.margin.left + ", " + options.margin.right + ")");
            scope.svg.attr('viewBox','0 0 '+ (options.width + options.margin.left + options.margin.right) + ' ' +
            (options.height + options.margin.top + options.margin.bottom))
                .attr('preserveAspectRatio','xMinYMin');
            scope.redraw();
        };

        scope.redraw = function() {
            var x, y, xAxis, yAxis, dataset, options = scope.getOptions(), xValues = scope.getX(), yValues = scope.y;
            if (xValues && yValues) {
                x = d3.scale.ordinal().domain(xValues).rangeRoundBands([ 0, options.width ], 0);
                y = d3.scale.linear().domain([0, d3.max(yValues)]).range([ options.height, 0]);
                xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
                yAxis = d3.svg.axis().scale(y).orient("left").ticks(2);

                scope.container.selectAll("g.x").attr("transform", "translate(0, " + options.height + ")").call(xAxis);
                scope.container.selectAll("g.y").call(yAxis);
                dataset = scope.container.selectAll(".bar").data(yValues);
                dataset.enter().append("rect").attr("class", "bar");
                dataset.transition().attr("x", function(d, i) {
                    return i * x.rangeBand();
                }).attr("width", function() {
                    return x.rangeBand() - 5;
                }).attr("height", function(d) {
                    return options.height - y(d);
                }).attr("y", function(d) {
                    return y(d);
                });
                dataset.exit().remove();
            }
        };

        scope.$watch('x', scope.redraw);
        scope.$watch('y', scope.redraw);
        scope.$watch('options', scope.setSvgSize);

        scope.initialize();
    };

    return directive;
});
