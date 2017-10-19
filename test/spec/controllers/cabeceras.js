'use strict';

describe('Controller: CabecerasCtrl', function () {

  // load the controller's module
  beforeEach(module('transnvAdminFrontendApp'));

  var CabecerasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CabecerasCtrl = $controller('CabecerasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CabecerasCtrl.awesomeThings.length).toBe(3);
  });
});
