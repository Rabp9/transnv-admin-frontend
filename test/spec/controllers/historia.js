'use strict';

describe('Controller: HistoriaCtrl', function () {

  // load the controller's module
  beforeEach(module('transnvAdminFrontendApp'));

  var HistoriaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HistoriaCtrl = $controller('HistoriaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HistoriaCtrl.awesomeThings.length).toBe(3);
  });
});
