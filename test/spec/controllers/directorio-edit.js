'use strict';

describe('Controller: DirectorioEditCtrl', function () {

  // load the controller's module
  beforeEach(module('transnvAdminFrontendApp'));

  var DirectorioEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DirectorioEditCtrl = $controller('DirectorioEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DirectorioEditCtrl.awesomeThings.length).toBe(3);
  });
});
