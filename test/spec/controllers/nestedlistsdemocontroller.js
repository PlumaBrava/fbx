'use strict';

describe('Controller: NestedlistsdemocontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('fbxApp'));

  var NestedlistsdemocontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NestedlistsdemocontrollerCtrl = $controller('NestedlistsdemocontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NestedlistsdemocontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
