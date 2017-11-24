'use strict';

describe('Controller: NuevapracticasCtrl', function () {

  // load the controller's module
  beforeEach(module('fbxApp'));

  var NuevapracticasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NuevapracticasCtrl = $controller('NuevapracticasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NuevapracticasCtrl.awesomeThings.length).toBe(3);
  });
});
