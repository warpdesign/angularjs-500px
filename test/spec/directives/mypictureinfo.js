'use strict';

describe('Directive: myPictureInfo', function () {

  // load the directive's module
  beforeEach(module('angularjs500pxAutomateApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-picture-info></my-picture-info>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myPictureInfo directive');
  }));
});
