app.directive('bdChart', function(/*$window*/){
    // angular.module("d3.directives", []).directive("barChart", function() {
    var directive = {};

    directive.restrict = 'AE';
    directive.scope = {
        x: '=', //?????????????????????????????????????????? Vart används scope.x?
        y: '=',
        time: '=',
        options: '=?'  //??????????????????????????????????????????????????????Behövs detta?
    };

    directive.link = function(scope, elements, attr) {
        scope.svg = null;
        scope.container = null;

        getOptions = function() {
            return _.merge({
                width: 1000,
                height: 500,
                margins: {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 50
                }
            }, scope.options || { }); //??????????????????????????????????????????????????????Behövs detta?
        };

        initialize = function() {
            scope.svg = d3.select(elements[0]).append("svg").attr("class", "chart");
            scope.container = scope.svg.append("g");
            scope.container.append("g").attr("class", "x");
            scope.container.append("g").attr("class", "y");
            setSvgSize();
        };

        setSvgSize = function() {
            var options = getOptions();
            scope.container.attr("transform", "translate(" + options.margins.left + ", " + options.margins.right + ")");
            scope.svg.attr('viewBox','0 0 '+ (options.width + options.margins.left + options.margins.right) + ' ' +
            (options.height + options.margins.top + options.margins.bottom))
                .attr('preserveAspectRatio','xMinYMin');
            //draw();
        };

        draw = function() {
            scope.svg.selectAll('*').remove();

            var x, y, xAxis, yAxis, dataset, options = getOptions(), yValues = scope.y, xScale, yScale, maxTime = scope.time, temp;

            var amountData = yValues.length;



            if (yValues) {
                if (yValues[0] != 0) {
                    yValues.unshift(0)   //??????????????????????Varför detta?
                }

                xScale = d3.scale.linear().range([options.margins.left, options.width - options.margins.right]).domain([0,amountData-1]),
                yScale = d3.scale.linear().range([options.height - options.margins.top, options.margins.bottom]).domain([0, maxTime]),


                xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(amountData);
                yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(10);

                scope.svg.append("svg:g")
                    .attr("transform", "translate(0," + (options.height - options.margins.bottom) + ")")
                    .call(xAxis);
                scope.svg.append("svg:g")
                    .attr("transform", "translate(" + (options.margins.left) + ",0)")
                    .call(yAxis);

                temp = maxTime;
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

        /*
        scope.$watchGroup(['x', 'y', 'data'], function() {
          if (scope.x && scope.y) {
            scope.draw(); 
          }
        });*/

        scope.$watch('x', function() {
          if (scope.x) {
            draw(); 
          }
        }, true); //objectEquality == true

        scope.$watch('y', function() {
          if (scope.y) {
            draw(); 
          }
        }, true); //objectEquality == true


/*
        scope.$watch('options', setSvgSize);

        scope.$watch(function () {
            return angular.element($window)[0].innerWidth;
        }, function () {
            draw();
        });
*/
        initialize();
    };

    return directive;
});
