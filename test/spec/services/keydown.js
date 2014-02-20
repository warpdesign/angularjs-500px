'use strict';

describe('Service: keydown', function () {

  // load the service's module
  beforeEach(module('angularjs500pxAutomateApp'));

  // instantiate service
  var keydown;
  beforeEach(inject(function (_keydown_) {
    keydown = _keydown_;
  }));

  it('should do something', function () {
    expect(!!keydown).toBe(true);
  });

});
