'use strict';

describe('Controller: UbicacionCtrl', function () {

  // load the controller's module
  beforeEach(module('transnvAdminFrontendApp'));

  var UbicacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UbicacionCtrl = $controller('UbicacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UbicacionCtrl.awesomeThings.length).toBe(3);
  });
});
