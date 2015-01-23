'use strict';

/**
 * @ngdoc overview
 * @name yoAngularTestApp
 * @description
 * # yoAngularTestApp
 *
 * Main module of the application.
 */
angular
  .module('yoAngularTestApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMap',
    '$localstorage',
    'd3',
    'yoAngularTestApp.directives'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/edit-nav', {
        templateUrl: 'views/edit-nav.html',
        controller: 'EditNavCtrl'
      })
      .when('/countries', {
        templateUrl: 'views/countries.html',
        controller: 'CountriesCtrl'
      })
      .when('/data-visualisation', {
        templateUrl: 'views/data-visualisation.html',
        controller: 'DataVisualisationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
