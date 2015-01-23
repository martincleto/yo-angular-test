
	'use strict';

	angular.module('yoAngularTestApp.directives',['d3'])
	  .directive('d3Bars', ['d3', function(d3) {

	    return {
	    	restrict: 'A',
	    	scope: {
	    		data: '=',
	    		selectedCriteria: '@'
	    	},
	    	link: function(scope, element, attrs) {

	    		console.log(scope);
	    		console.log(scope.data);

	    		var data = [],
	    			selectedCriteria,
	    			width = 600,
	    			height = 400,
	    			x,
	    			y,
	    			max,
	    			color = d3.scale.category20(),
	    			svg = d3.select(element[0])
		              .append('svg')
		              .attr('viewBox', '0 0 ' + width + ' ' + height )
	            	  .attr('preserveAspectRatio', 'xMidYMid meet'),
	            	xAxis = d3.svg.axis().scale(x);

		          // watch for data changes and re-render
		          scope.$watch('graphData', function() {
		            // set vars when parent scope data is populated
		            data = scope.data;
		            selectedCriteria = scope.selectedCriteria;
		            max = d3.max(data, function(d) { return +d[selectedCriteria];} );
		            x = d3.scale.ordinal()
				    		.domain(d3.range(data.length))
				    		.rangeRoundBands([0, width],0.2);
				    y = d3.scale.linear()
						    .domain([0, max])
						    .range([0, height]);
					xAxis.tickValues(function(d){ return d.name; });

		            return scope.render(data);
		          }, true);

		          // define render function
		          scope.render = function(data){

		          	// remove all previous items before render
				    svg.selectAll('*').remove();

		            svg.selectAll('rect')
		              .data(data)
		              .enter()
		                .append('rect')
		                .attr('x',function(d,i) { return x(i); })
		                .attr('y',height)
		                .attr('width', x.rangeBand())
    					.attr('height', 0)
    					.attr('fill', function(d) { return color(d.name); })
    					.transition()
    					  .delay(function (d,i){ return i * 200; })
		                  .duration(400)
		                  .attr('y', function(d){ return height - y(d[selectedCriteria]); })
		                  .attr('height', function(d){ return y(d[selectedCriteria]); });
/*
		            svg.append('g')
					    .attr('class', 'x axis')
					    .attr('transform', 'translate(0,' + height + ')')
					    .call(xAxis)
					  .selectAll('text')
					    .attr('y', 0)
					    .attr('x', 9)
					    .attr('dy', '.35em')
					    .attr('transform', 'rotate(90)')
					    .style('text-anchor', 'start');
*/
		         };
	        }
	    };
	}]);
