'use strict';

/**
 * @ngdoc function
 * @name yoAngularTestApp.controller:CountriesCtrl
 * @description
 * # CountriesCtrl
 * Controller of the yoAngularTestApp
 */
angular.module('yoAngularTestApp')
  .controller('CountriesCtrl', ['$scope','$http','$localstorage','$q', function ($scope,$http,$localstorage,$q) {

  	var dataCountriesLoaded = $q.defer(),
  		  mapInitialized = $q.defer(),
        markers = [];

  	$scope.map = null;
  	$scope.countries = [];
  	$scope.loading = true;


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

    $scope.$on('mapInitialized', function(event, map) {
    	$scope.map = map;
    	mapInitialized.resolve();
    });

    $q.all([dataCountriesLoaded.promise,mapInitialized.promise]).then(function(){
    	$scope.selectedCountry = $scope.countries[0];
    	$scope.loading = false;
    	$scope.showCountry();
    });

    function Country(name, capital, area, population, latlng){
      this.name = name;
      this.capital = capital;
      this.area = area;
      this.population = population;
      this.latlng = latlng;
    }

    $scope.showCountry = function(){

    	var objLatLng = new google.maps.LatLng(
	    		$scope.selectedCountry.latlng[0],
	    		$scope.selectedCountry.latlng[1]
	    	),
    		marker,
    		infoWindow,
    		infoWindowContent;
    	
    	$scope.map.setCenter(objLatLng);
    	$scope.map.setZoom(5);

      // Clear existent marker
      if ( markers.length > 0 ) {
        for (var i=0;i<markers.length; i++){
          markers[i].setMap(null);
        }
      }

    	marker = new google.maps.Marker({
  			position: objLatLng,
  			map: $scope.map,
  			title: $scope.selectedCountry.name,
  			animation: google.maps.Animation.DROP
  		});

      markers.push(marker);

    	infoWindowContent = '<h3>'+$scope.selectedCountry.name +'</h3>';
    	infoWindowContent += '<ul>';
    	infoWindowContent += '<li>Capital: '+ $scope.selectedCountry.capital +'</li><li>Population: '+ $scope.selectedCountry.population +'</li>';
    	infoWindowContent += '</ul>';

  		infoWindow = new google.maps.InfoWindow({
  			content: infoWindowContent
  		});

  		google.maps.event.addListener(marker, 'click', function() {
  			infoWindow.open($scope.map,marker);
  		});

    };

  }]);
