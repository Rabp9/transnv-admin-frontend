'use strict';

describe('Service: envservice', function () {

  // load the service's module
  beforeEach(module('transnvAdminFrontendApp'));

  // instantiate service
  var envservice;
  beforeEach(inject(function (_envservice_) {
    envservice = _envservice_;
  }));

  it('should do something', function () {
    expect(!!envservice).toBe(true);
  });

});
