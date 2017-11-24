'use strict';

describe('Controller: MispracticasCtrl', function () {

  // load the controller's module
  beforeEach(module('fbxApp'));

  var MispracticasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MispracticasCtrl = $controller('MispracticasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MispracticasCtrl.awesomeThings.length).toBe(3);
  });
});
