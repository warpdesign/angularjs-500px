'use strict';

describe('Directive: myPictureList', function () {

  // load the directive's module
  beforeEach(module('angularjs500pxAutomateApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-picture-list></my-picture-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myPictureList directive');
  }));
});
