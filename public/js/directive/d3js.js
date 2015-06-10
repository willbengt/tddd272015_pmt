// var app = angular.module('TimeReportApp', [])


app.directive('helloWorld', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        template: '<h3>Hello World!!</h3>'
    };
});

app.directive('burndownChart', function() {
    function link(scope, el) {

        var width = 1500;
        var height = 1500;
        var canvas = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);


        var group = canvas.append("g")
            .attr("transform", "translate(300,300)");

        var data = [10, 40, 50]
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

    return {
        link: link,
        restrict: 'E'
    }
});


app.directive('barChart', function(){
    function link(scope, el){
        var dataArray=[20, 40, 50];
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
        link: link,
        restrict: 'E'
    }
});