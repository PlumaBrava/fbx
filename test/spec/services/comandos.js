'use strict';

describe('Service: comandos', function () {

  // load the service's module
  beforeEach(module('fbxApp'));

  // instantiate service
  var comandos;
  beforeEach(inject(function (_comandos_) {
    comandos = _comandos_;
  }));

  it('should do something', function () {
    expect(!!comandos).toBe(true);
  });

});
