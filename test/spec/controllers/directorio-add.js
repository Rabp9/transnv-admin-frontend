'use strict';

describe('Controller: DirectorioAddCtrl', function () {

  // load the controller's module
  beforeEach(module('transnvAdminFrontendApp'));

  var DirectorioAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DirectorioAddCtrl = $controller('DirectorioAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DirectorioAddCtrl.awesomeThings.length).toBe(3);
  });
});
