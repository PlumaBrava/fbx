'use strict';

describe('Controller: PerfilesCtrl', function () {

  // load the controller's module
  beforeEach(module('fbxApp'));

  var PerfilesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerfilesCtrl = $controller('PerfilesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerfilesCtrl.awesomeThings.length).toBe(3);
  });
});
