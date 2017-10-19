'use strict';

describe('Service: contactosservice', function () {

  // load the service's module
  beforeEach(module('transnvAdminFrontendApp'));

  // instantiate service
  var contactosservice;
  beforeEach(inject(function (_contactosservice_) {
    contactosservice = _contactosservice_;
  }));

  it('should do something', function () {
    expect(!!contactosservice).toBe(true);
  });

});
