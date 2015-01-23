'use strict';

/**
 * @ngdoc function
 * @name yoAngularTestApp.controller:editNavCtrl
 * @description
 * # editNavCtrl
 * Controller of the yoAngularTestApp
 */
angular.module('yoAngularTestApp')
  .controller('EditNavCtrl', ['$scope','$localstorage',function ($scope,$localstorage) {

    $scope.navItems = [];
  	$scope.showErrors = {
      required : false,
      duplicated : false
    };

    if ( !angular.equals({}, $localstorage.getObject('navItems')) ) {
      $scope.navItems = $localstorage.getObject('navItems');
    }

  	$scope.addItem = function(){

  		if ($scope.editNavForm.$error.required) {
  			$scope.showErrors.required = true;
  			return;
  		}
      if (!$scope.itemExists($scope.newNavItem,$scope.navItems)) {
        $scope.navItems.push($scope.newNavItem);
        $scope.showErrors.duplicated = false;
      }
      else {
        $scope.showErrors.duplicated = true;
      }
      $scope.newNavItem = '';
  	};

  	$scope.removeItem = function(index){
  		$scope.navItems.splice(index,1);
  	};

    $scope.itemExists = function(newItem,curItems) {
      for (var i = 0; i < curItems.length; i++) {
        if (angular.equals(curItems[i], newItem)) {
            return true;
        }
      }
      return false;
    };

    $scope.save = function () {
      $localstorage.setObject('navItems',$scope.navItems);
    };

  }]);