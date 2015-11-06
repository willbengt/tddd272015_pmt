// var app = angular.module('TimeReportApp', [])
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
