'use strict';

describe('Service: noticiasservice', function () {

  // load the service's module
  beforeEach(module('transnvAdminFrontendApp'));

  // instantiate service
  var noticiasservice;
  beforeEach(inject(function (_noticiasservice_) {
    noticiasservice = _noticiasservice_;
  }));

  it('should do something', function () {
    expect(!!noticiasservice).toBe(true);
  });

});
