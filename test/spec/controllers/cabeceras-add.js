'use strict';

describe('Controller: CabecerasAddCtrl', function () {

  // load the controller's module
  beforeEach(module('transnvAdminFrontendApp'));

  var CabecerasAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CabecerasAddCtrl = $controller('CabecerasAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CabecerasAddCtrl.awesomeThings.length).toBe(3);
  });
});
