// var app = angular.module('TimeReportApp', [])

/*
app.directive('donutChart', function(){
    function link(scope, el){
        d3.select(el[0]).append('svg')
    }
    return {
        link: link,
        restrict: 'E'
    }
})


*/
//Not using this file atm
app.directive('helloWorld', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        template: '<h3>Hello World!!</h3>'
    };
});


app.directive('barChart', function(){
    function link(scope, el){
        var dataArray=[20, 40, 50, 60, 70, 100, 110];
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
            .attr("transform", "translate(20, 0)") //flytta, rotera o s�nt

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
})

app.directive('donutChart', function() {
    return {
        scope: { // isolate scope
            'data': '=',
            'onClick': '&',
            'accessor': '='
        },
        restrict: 'E',
        link: link
    };

    function link(scope, element) {
        // the d3 bits
        console.log('scope.data', scope.data);
        var color = d3.scale.category10();
        var el = element[0];
        var width = el.clientWidth;
        var height = el.clientHeight;
        var min = Math.min(width, height);
        var accessor = scope.accessor || Number;
        var pie = d3.layout.pie().sort(null).value(accessor);
        var arc = d3.svg.arc()
            .outerRadius(min / 2 * 0.9)
            .innerRadius(min / 2 * 0.5);

        var svg = d3.select(el).append('svg')
            .attr({width: width, height: height})
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        svg.on('mousedown', function(d) {
            // yo angular, the code in this callback might make a change to the scope!
            // so be sure to apply $watch's and catch errors.
            scope.$apply(function(){
                if(scope.onClick) scope.onClick();
            });
        });

        function arcTween(a) {
            // see: http://bl.ocks.org/mbostock/1346410
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) {
                return arc(i(t));
            };
        }

        // add the <path>s for each arc slice
        var arcs = svg.selectAll('path.arc').data(pie(scope.data))
            .enter().append('path')
            .attr('class', 'arc')
            .style('stroke', 'white')
            .attr('fill', function(d, i) { return color(i) })
            // store the initial angles
            .each(function(d) { return this._current = d });

        // our data changed! update the arcs, adding, updating, or removing
        // elements as needed
        scope.$watch('data', function(newData, oldData){
            console.log('data changed!');
            var data = newData.slice(0); // copy
            var duration = 500;
            var PI = Math.PI;
            while(data.length < oldData.length) data.push(0);
            arcs = svg.selectAll('.arc').data(pie(data));
            arcs.transition().duration(duration).attrTween('d', arcTween);
            // transition in any new slices
            arcs.enter().append('path')
                .style('stroke', 'white')
                .attr('class', 'arc')
                .attr('fill', function(d, i){ return color(i) })
                .each(function(d) {
                    this._current = { startAngle: 2 * PI - 0.001, endAngle: 2 * PI }
                })
                .transition().duration(duration).attrTween('d', arcTween);
            // transition out any slices with size = 0
            arcs.filter(function(d){ return d.data === 0 })
                .transition()
                .duration(duration)
                .each(function(d){ d.startAngle = 2 * PI - 0.001; d.endAngle = 2 * PI; })
                .attrTween('d', arcTween).remove();
            // IMPORTANT! the third argument, `true`, tells angular to watch for
            // changes to array elements.
        }, true);
    }
});
