'use strict';

describe('Controller: PracticaCtrl', function () {

  // load the controller's module
  beforeEach(module('fbxApp'));

  var PracticaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PracticaCtrl = $controller('PracticaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PracticaCtrl.awesomeThings.length).toBe(3);
  });
});
