'use strict';

describe('Controller: CabecerasEditCtrl', function () {

  // load the controller's module
  beforeEach(module('transnvAdminFrontendApp'));

  var CabecerasEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CabecerasEditCtrl = $controller('CabecerasEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CabecerasEditCtrl.awesomeThings.length).toBe(3);
  });
});
