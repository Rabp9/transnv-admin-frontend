'use strict';

describe('Service: slidesservice', function () {

  // load the service's module
  beforeEach(module('transnvAdminFrontendApp'));

  // instantiate service
  var slidesservice;
  beforeEach(inject(function (_slidesservice_) {
    slidesservice = _slidesservice_;
  }));

  it('should do something', function () {
    expect(!!slidesservice).toBe(true);
  });

});
