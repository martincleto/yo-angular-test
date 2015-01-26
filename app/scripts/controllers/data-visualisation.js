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
      oboe('http://restcountries.eu/rest/v1/all')
        .node('{name capital area population latlng}',function(countryNode){
          return new Country(
            countryNode.name,
            countryNode.capital,
            countryNode.area,
            countryNode.population,
            countryNode.latlng
          );
        })
        .done(function(parsedJson){
          $scope.countries = parsedJson;
          $localstorage.setObject('countries',$scope.countries);
          dataCountriesLoaded.resolve();

        });
    }
    else {
      $scope.countries = $localstorage.getObject('countries');
      dataCountriesLoaded.resolve();
    }

  	dataCountriesLoaded.promise.then(function(){
  		$scope.filterData();
  	});

    function Country(name, capital, area, population, latlng){
      this.name = name;
      this.capital = capital;
      this.area = area;
      this.population = population;
      this.latlng = latlng;
    }

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
