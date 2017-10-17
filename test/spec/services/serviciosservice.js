'use strict';

describe('Service: serviciosservice', function () {

  // load the service's module
  beforeEach(module('transnvAdminFrontendApp'));

  // instantiate service
  var serviciosservice;
  beforeEach(inject(function (_serviciosservice_) {
    serviciosservice = _serviciosservice_;
  }));

  it('should do something', function () {
    expect(!!serviciosservice).toBe(true);
  });

});
