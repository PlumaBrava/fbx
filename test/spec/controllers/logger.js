'use strict';

describe('Controller: LoggerCtrl', function () {

  // load the controller's module
  beforeEach(module('fbxApp'));

  var LoggerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoggerCtrl = $controller('LoggerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoggerCtrl.awesomeThings.length).toBe(3);
  });
});
