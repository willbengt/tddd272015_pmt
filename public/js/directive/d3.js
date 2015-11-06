/**
 * Created by rasmus on 2015-08-27.
 */

app.directive('fooChart', function(){
    var directive = { };

    directive.scope = {
        data: '='
    };
    directive.restrict = 'AE';

    directive.link = function(scope, elements, attr) {
        scope.svg = null;
        scope.container = null;

        //Optional. If there is no option set this will be the standard:
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


      //  var svg = d3.select(element[0])
       //     .append("svg");

        scope.initialize = function() {
            scope.svg = d3.select(elements[0])
                .append("svg")
                .attr("class", "chart");

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



            var lineGen = d3.svg.line()
                .x(function (d, i) {
                    return xScale(i);
                })
                .y(function (d) {

                    startTime = startTime - d
                    return yScale(startTime);
                })
                .interpolate("crispEdges");

            for (var x in data) {

                var startTime = 100;
                //reportedTimeForProject = getTimeForProject(uniqueProjects[x]);
                //reportedTimeForProject.unshift(0);

//                var sumOfProjectTime = reportedTimeForProject.reduce(function(pv, cv) { return pv + cv; }, 0);

                scope.svg
                    .append('svg:path')
                    .attr('d', lineGen(x))
                    .attr('stroke-width', 2)
                    .attr('fill', 'none');


//                  .attr("fill", function(d) { return color(d) })
                //     .attr('stroke', function() { return color(sumOfProjectTime) })
                //.attr('stroke', "green")

            }


        };




        scope.initialize();

        //watch isolated scope for changes
        scope.$watch('data', scope.redraw);
        scope.$watch('options', scope.setSvgSize);
    };
    return directive;
});




app.directive('bollChart', function($window){
   function link(scope, elem, attrs){
       scope.padding = 40;
       scope.pathClass = "path";
       var d3 = $window.d3;
       var rawSvg = elem.find("svg")[0];
       var svg = d3.select(rawSvg);

       var totalProjectTime = 100;
       var numberOfInputs = -1;
       var xValues = [1,2,3,4,5,6];

   }


});


app.directive('testChart', function($window){
    function link(scope, elem, attrs) {
        scope.padding = 40;
        scope.pathClass = "path";

        var d3 = $window.d3;
        var rawSvg = elem.find("svg")[0];
        var svg = d3.select(rawSvg);

        var totalProjectTime = 100;
        var numberOfInputs = -1;
        var xValues = getX(), yValues = scope.y;


        console.log(scope.x);


        function getX(){
            var x = null;
            if (scope.x) {
                x = scope.x;
            } else {
                x = _.keys(scope.y);
            }
            return x;
        }


        function setChartParameters() {


            xScale = d3.scale.linear()
                .domain([0, scope.x - 1])
                .range([scope.padding + 5, rawSvg.clientWidth - scope.padding]);

            yScale = d3.scale.linear()
                .domain([0, totalProjectTime])
                .range([rawSvg.clientHeight - scope.padding, 0]);

            xAxisGen = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(xValues.length - 1);

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
                    d: lineFun(xValues),
                    "stroke": "blue",
                    "stroke-width": 2,
                    "fill": "none",
                    "class": scope.pathClass
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



app.directive('myChart', function(){
    var directive = { };

    directive.scope = {
        x: '=?',
        y: '=myChart',
        options: '=?',
        project: '=?'
    };

    directive.restrict = 'AE';


    directive.link = function(scope, elements, attr) {
        scope.svg = null;
        scope.container = null;

        console.log(scope.x)

        scope.getX = function() {
            var x = null;
            if (scope.x) {
                x = scope.x;
            } else {
                x = _.keys(scope.y);
            }
            return x;
        };
        /*
        scope.getX = function() {
            var x = null;
                x = scope.x;
            return x;
        };
*/

        //Optional. If there is no option set this will be the standard:
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

            var dataset, options = scope.getOptions(), xValues = scope.getX(), yValues = scope.y;
            console.log(xValues)
            console.log(yValues)
            //okey, so no I got two arrays with values from X- and Y-Axis

            //get unique projects
            //let's say project number is 1:

            var lol = [];
            var pos = 0;
            var position;
            while (pos < xValues.length){
                position = xValues.indexOf(1, pos);
                if (position != -1){
                    lol.push(position)
                    pos = position + 1;
                }
                else{
                    break;
                }
            }

// This is starting to get messy I can tell....
            dataset = scope.container.selectAll(".bar").data(yValues);
            console.log("dataset:")
            console.log(dataset);


            dataset.enter()
                .append("svg:svg")
                .attr("width", 400)
                .attr("height", 200)

            /*dataset.enter().append("rect").attr("class", "bar");
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
*/






            console.log("output should be: 8,9,10")
            console.log(lol)

            //paint them





        };

        scope.initialize();

        scope.$watch('x', scope.redraw);
        scope.$watch('y', scope.redraw);
        scope.$watch('options', scope.setSvgSize);


    };
        return directive;
});













app.directive('barChart', function(){
 // angular.module("d3.directives", []).directive("barChart", function() {
    var directive = { };

    directive.restrict = 'AE';
    directive.scope = {
        x: '=?',
        y: '=barChart',
        options: '=?',
        project: '=?'
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
                height: 500,
                margins: {
                    top: 20,
                    right: 20,
                    bottom: 20,
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
            scope.container.attr("transform", "translate(" + options.margins.left + ", " + options.margins.right + ")");
            scope.svg.attr('viewBox','0 0 '+ (options.width + options.margins.left + options.margins.right) + ' ' +
            (options.height + options.margins.top + options.margins.bottom))
                .attr('preserveAspectRatio','xMinYMin');
            scope.redraw();
        };

        scope.redraw = function() {
            var x, y, xAxis, yAxis, dataset, options = scope.getOptions(), xValues = scope.getX(), yValues = scope.y;

            console.log(xValues)
            var lineGen = d3.svg.line()
                .x(function (d, i) {
                    return xScale(i);
                })
                .y(function (d) {
                    return yScale(d);
//                    startTime = startTime - d;
 //                   return yScale(startTime);
                })
                .interpolate("crispEdges");

            if (xValues && yValues) {
                x = d3.scale.ordinal().domain(xValues).rangeRoundBands([ 0, options.width ], 0);
                y = d3.scale.linear().domain([0, d3.max(yValues)]).range([ options.height, 0]);
                xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
                yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

                scope.container.selectAll("g.x").attr("transform", "translate(0, " + options.height + ")").call(xAxis);
                scope.container.selectAll("g.y").call(yAxis);

/*
                dataset.append('svg:path')
                    .attr('d', lineGen(x))
                    .attr('stroke', function() { "green"})
                    .attr('stroke-width', 2)
                    .attr('fill', 'none');
*/
                dataset = scope.container.selectAll(".bar").data(yValues);
                console.log(dataset);
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
//                 .attr("fill", function(d) { return color(d) })
                .attr('stroke', function() { return color(sumOfProjectTime) })
                //.attr('stroke', "green")
                .attr('stroke-width', 2)
                .attr('fill', 'none');

        }


        /*


         var bars = canvas.selectAll("rect")
         .data(timeInEachProject)
         .enter()
         .append("rect")
         .attr("width", function(d) {return d * 10})
         .attr("height", 50)
         .attr("y", function(d, i){return i * 100});
         */

        /*

         var linefunction = d3.svg.line()
         .x(function (d) {
         return Math.random() * 400;
         })
         .y(function (d) {
         return Math.random() * 400;
         });
         //            .interpolate("linear");

         for(var x in uniqueProjects) {
         // alert(uniqueProjects[x]);
         tomte = getTimeForProject(uniqueProjects[x]);
         alert(tomte);

         //these are the things I would like to do for each different project!
         canvas.append("path")
         .data(tomte)
         .enter()
         .append("path")
         .attr("d", function() {return linefunction(tomte)})
         .attr("class", "line")
         .style("stroke", "blue" )
         .attr('fill', 'none');
         }

         }
         */
    }
    return {
        restrict: 'EA',
        //    template: "<svg width='850' height='220'></svg>",
        link: link
    }

});
