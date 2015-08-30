/**
 * Created by rasmus on 2015-08-27.
 */

app.directive('myChart', function(){
    var directive = { };
    directive.restrict = 'AE';

    directive.scope = {
        time: '=?',
        project: '=?',
        options: '=?'
    };

    directive.link = function(scope, elements, attr) {
        scope.svg = null;
        scope.container = null;

        scope.getX = function() {
            var x = null;
                x = scope.time;
            return x;
        };

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
        scope.initialize();
    };

    scope.redraw = function() {
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
