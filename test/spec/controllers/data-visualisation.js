'use strict';

describe('Controller: DataVisualisationCtrl', function () {

  // load the controller's module
  beforeEach(module('yoAngularTestApp'));

  var DataVisualisationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DataVisualisationCtrl = $controller('DataVisualisationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
