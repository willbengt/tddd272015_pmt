// var app = angular.module('TimeReportApp', [])


app.directive('helloWorld', function() {

    var margin = 20,
        width = 960,
        height = 500 - .5 - margin,
        color = d3.interpolateRgb("#f77", "#77f");
    return{

    restrict: 'E',
        scope: {
        val: '=',
            grouped: '='
    },
    link: function (scope, element, attrs) {

// set up initial svg object
        var vis = d3.select(element[0])
            .append("svg")
            .attr("width", width)
            .attr("height", height + margin + 100);

        scope.$watch('val', function (newVal, oldVal) {

            // clear the elements inside of the directive
            vis.selectAll('*').remove();

            // if 'val' is undefined, exit
            if (!newVal) {
                return;
            }

    })
    }
    }
});

app.directive('burndownChart', function() {
    function link(scope, el) {
        var data = [1,2,3];
        var height = 80;
        var width = 80;


        var circle = canvas.append("circle")
            .attr("cx", 50)
            .attr("cy", 100)
            .attr("r", 25);

        var circles = canvas.selectAll("circle")
            .data(data)
            .attr("fill", "red")
            .enter()// skapar DOM av den data som ej redan har ett DOM objekt kopplat itll sig.
            .append("circle")
            .attr("cx", 50)
            .attr("cy", 50)
            .attr("fill", "green")
            .attr("r", 25);

        circle.transition()
            .duration(1500)
            .attr("cx", 150)
            .attr("cy", 150)
            .attr("fill", "pink")
            .each("end", function(){ d3.select(this).attr("fill", "blue") } );

    }

    canvas.append("svg")
        .attr("width", width)
        .attr("height", height);


    return {
        link: link,
        restrict: 'E'
    }
});



  /*      var canvas = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);


        var group = canvas.append("g")
            .attr("transform", "translate(300,300)");

       // var data = scope.tableInformation[0].time;
      //  var data = [10, 40, 50]
       //  var data = [1]
        var r = 300;
        var p = Math.PI * 2;

        var arc = d3.svg.arc()
            .innerRadius(r-50)
            .outerRadius(r)
            .startAngle(0)
            .endAngle(p);

        group.append("path")
            .attr("d", arc);
    }
//d3.sum(data)
*/
/*
var canvas = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

        var circle = canvas.append("circle")
            .attr("cx", 50)
            .attr("cy", 100)
            .attr("r", 25);

        var circles = canvas.selectAll("circle")
            .data(data)
            .attr("fill", "red")
            .enter()// skapar DOM av den data som ej redan har ett DOM objekt kopplat itll sig.
            .append("circle")
            .attr("cx", 50)
            .attr("cy", 50)
            .attr("fill", "green")
            .attr("r", 25);

    circle.transition()
        .duration(1500)
        .attr("cx", 150)
        .attr("cy", 150)
        .attr("fill", "pink")
        .each("end", function(){ d3.select(this).attr("fill", "blue") } );

    }
  /*/


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
        var salesDataToPlot=scope[attrs.val];
        alert(salesDataToPlot);
        var padding = 20;
        var pathClass = "path";
        var xScale, yScale, xAxisGen, yAxisGen, lineFun;

        var d3 = $window.d3;
        var rawSvg = elem.find("svg")[0];
        var svg = d3.select(rawSvg);

        function setChartParameters(){
            xScale = d3.scale.linear()
                .domain([salesDataToPlot[0].project, salesDataToPlot[salesDataToPlot.length - 1].project])
                .range([padding + 5, rawSvg.clientWidth - padding]);

            yScale = d3.scale.linear()
                .domain([0, d3.max(salesDataToPlot, function (d) {
                    return d.time;
                })])
                .range([rawSvg.clientHeight - padding, 0]);

            xAxisGen = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(salesDataToPlot.length - 1);

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
                    d: lineFun(salesDataToPlot),
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