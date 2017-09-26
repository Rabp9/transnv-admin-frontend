'use strict';

describe('Service: oauthHttpInterceptor', function () {

  // load the service's module
  beforeEach(module('transnvAdminFrontendApp'));

  // instantiate service
  var oauthHttpInterceptor;
  beforeEach(inject(function (_oauthHttpInterceptor_) {
    oauthHttpInterceptor = _oauthHttpInterceptor_;
  }));

  it('should do something', function () {
    expect(!!oauthHttpInterceptor).toBe(true);
  });

});
