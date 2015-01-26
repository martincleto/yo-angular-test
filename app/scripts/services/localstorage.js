'use strict';

/**
 * @ngdoc function
 * @name yoAngularTestApp.service:$localstorage
 * @description
 * # $localstorage
 * Service to expose browser localStorage methods for the yoAngularTestApp
 */

angular.module('$localstorage', [])
  .factory('$localstorage', ['$window', function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    };
  }]);