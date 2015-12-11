app.directive('bdChart', function($window){
    // angular.module("d3.directives", []).directive("barChart", function() {
    var directive = { };

    directive.restrict = 'AE';
    directive.scope = {
        x: '=?',
        y: '=bdChart',
        startTime: '=projecttime',
        options: '=?'
    };

    directive.link = function(scope, elements, attr) {
        scope.svg = null;
        scope.container = null;

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
            scope.svg.selectAll('*').remove();
            
            var x, y, xAxis, yAxis, dataset, options = scope.getOptions(), yValues = scope.y, xScale, yScale, startTime = scope.startTime, temp;

            var amountData = yValues.length
            console.log(yValues)



            if (yValues) {
                if (yValues[0] != 0) {
                    yValues.unshift(0)
                }

                xScale = d3.scale.linear().range([options.margins.left, options.width - options.margins.right]).domain([0,amountData-1]),
                yScale = d3.scale.linear().range([options.height - options.margins.top, options.margins.bottom]).domain([0, startTime]),


                xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(amountData);
                yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(10);

                scope.svg.append("svg:g")
                    .attr("transform", "translate(0," + (options.height - options.margins.bottom) + ")")
                    .call(xAxis);
                scope.svg.append("svg:g")
                    .attr("transform", "translate(" + (options.margins.left) + ",0)")
                    .call(yAxis);

                temp = startTime;
                var lineGen = d3.svg.line()
                    .x(function (d, i) {
                        return xScale(i);
                    })
                    .y(function (d) {
                        temp = temp - d
                        return yScale(temp);
                    })
                    .interpolate("crispEdges");

                scope.svg.append('svg:path')
                    .attr('d', lineGen(yValues))
                    .attr('stroke', 'red')
                    .attr('stroke-width', 2)
                    .attr('fill', 'none');
            }
        };

        scope.$watch('x', scope.redraw);
        scope.$watch('y', scope.redraw);
        scope.$watch('options', scope.setSvgSize);

        scope.$watch(function () {
            return angular.element($window)[0].innerWidth;
        }, function () {
            scope.redraw();
        });

        scope.initialize();
    };

    return directive;
});
