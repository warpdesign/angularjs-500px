'use strict';

describe('Controller: ControlsCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjs500pxAutomateApp'));

  var ControlsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ControlsCtrl = $controller('ControlsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
