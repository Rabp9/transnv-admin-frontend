'use strict';

describe('Service: infosservice', function () {

  // load the service's module
  beforeEach(module('transnvAdminFrontendApp'));

  // instantiate service
  var infosservice;
  beforeEach(inject(function (_infosservice_) {
    infosservice = _infosservice_;
  }));

  it('should do something', function () {
    expect(!!infosservice).toBe(true);
  });

});
