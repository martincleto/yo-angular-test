'use strict';

/**
 * @ngdoc function
 * @name yoAngularTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoAngularTestApp
 */
angular.module('yoAngularTestApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
