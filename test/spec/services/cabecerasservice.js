'use strict';

describe('Service: cabecerasservice', function () {

  // load the service's module
  beforeEach(module('transnvAdminFrontendApp'));

  // instantiate service
  var cabecerasservice;
  beforeEach(inject(function (_cabecerasservice_) {
    cabecerasservice = _cabecerasservice_;
  }));

  it('should do something', function () {
    expect(!!cabecerasservice).toBe(true);
  });

});
