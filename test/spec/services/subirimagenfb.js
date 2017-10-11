'use strict';

describe('Service: subirImagenFb', function () {

  // load the service's module
  beforeEach(module('fbxApp'));

  // instantiate service
  var subirImagenFb;
  beforeEach(inject(function (_subirImagenFb_) {
    subirImagenFb = _subirImagenFb_;
  }));

  it('should do something', function () {
    expect(!!subirImagenFb).toBe(true);
  });

});
