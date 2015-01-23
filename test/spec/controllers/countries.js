'use strict';

describe('Controller: CountriesCtrl', function () {

  // load the controller's module
  beforeEach(module('yoAngularTestApp'));

  var CountriesCtrl,
    scope,
    httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    CountriesCtrl = $controller('CountriesCtrl', {
      $scope: scope
    });
    
  }));

  it('Countries should be populated', function () {

    var fakeResponseObj = {
      'name': 'Afghanistan',
      'capital': 'Kabul',
      'population': 26023100,
      'latlng': [33,65]
    };

    scope.map = new google.maps.Map();

    httpBackend.expectGET('http://restcountries.eu/rest/v1/all').respond([fakeResponseObj]);
    httpBackend.flush();
    
    scope.$apply();
    expect(scope.countries.length).toBeGreaterThan(0);
  });

});
