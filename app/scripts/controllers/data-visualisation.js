'use strict';

/**
 * @ngdoc function
 * @name yoAngularTestApp.controller:DataVisualisationCtrl
 * @description
 * # DataVisualisationCtrl
 * Controller of the yoAngularTestApp
 */
angular.module('yoAngularTestApp')
  .controller('DataVisualisationCtrl', ['$scope','$http','$localstorage','$q', function ($scope,$http,$localstorage,$q) {

  	var dataCountriesLoaded = $q.defer(),
  		limit = 10; // @TODO set this dynamically (e.g. directive attr or user selection)

  	$scope.countries = [];
  	$scope.graphData = [];
  	$scope.selectedCriteria = 'population';

    if (angular.equals({}, $localstorage.getObject('countries'))) {
  		$http.get('http://restcountries.eu/rest/v1/all').success(function(response){
	        $scope.countries = response;
	        $localstorage.setObject('countries',$scope.countries);
	    });
  	}
  	else {
  		$scope.countries = $localstorage.getObject('countries');
  		dataCountriesLoaded.resolve();
  	}

  	dataCountriesLoaded.promise.then(function(){
  		$scope.filterData();
  	});

  	$scope.filterData = function() {
  		$scope.countries.sort(function(a,b){
  			if (a[$scope.selectedCriteria] < b[$scope.selectedCriteria]) {
		  		return 1;
		  	}
  			if (a[$scope.selectedCriteria] > b[$scope.selectedCriteria]) {
				return -1;
  			}  
			return 0;
  		});
  		$scope.graphData = $scope.countries.slice(0,limit);	
  	};

  	$scope.showChart = function(){

  	};

  }]);
