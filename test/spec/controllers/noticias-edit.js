'use strict';

describe('Controller: NoticiasEditCtrl', function () {

  // load the controller's module
  beforeEach(module('transnvAdminFrontendApp'));

  var NoticiasEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NoticiasEditCtrl = $controller('NoticiasEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NoticiasEditCtrl.awesomeThings.length).toBe(3);
  });
});
