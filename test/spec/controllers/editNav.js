'use strict';

describe('Controller: EditNavCtrl', function () {

  // load the controller's module
  beforeEach(module('yoAngularTestApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('EditNavCtrl', {
      $scope: scope
    });
  }));

  it('navItems should be defined', function () {
    expect(scope.navItems).toBeDefined();
  });

  it('navItems should be an array', function () {
    expect(scope.navItems instanceof Array).toBeTruthy();
  });

  it('navItems should be an empty array', function () {
    expect(scope.navItems.length).toEqual(0);
  });

  it('addItem shoudl add only new items', function () {
    var itemA = {name: 'Test Item A',url: '/test-item-a'},
        itemB = {name: 'Test Item B',url: '/test-item-b'};

    scope.editNavForm = {$error: false};
    scope.navItems = [itemA];
    scope.newNavItem = itemA;
    scope.addItem();
    expect(scope.navItems.length).toEqual(1);
    scope.newNavItem = itemB;
    scope.addItem();
    expect(scope.navItems.length).toEqual(2);
  });

  it('removeItem should remove target item', function(){
    var itemA = {name: 'Test Item A',url: '/test-item-a'},
        itemB = {name: 'Test Item B',url: '/test-item-b'};
    scope.navItems = [itemA,itemB];
    scope.removeItem(1);
    expect(scope.navItems.length).toEqual(1);
  });

});