'use strict';

describe('Controller: NoticiasAddCtrl', function () {

  // load the controller's module
  beforeEach(module('transnvAdminFrontendApp'));

  var NoticiasAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NoticiasAddCtrl = $controller('NoticiasAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NoticiasAddCtrl.awesomeThings.length).toBe(3);
  });
});
