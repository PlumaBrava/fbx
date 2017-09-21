'use strict';

describe('Controller: SpotifycallbackCtrl', function () {

  // load the controller's module
  beforeEach(module('fbxApp'));

  var SpotifycallbackCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpotifycallbackCtrl = $controller('SpotifycallbackCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SpotifycallbackCtrl.awesomeThings.length).toBe(3);
  });
});
