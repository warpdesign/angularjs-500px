'use strict';

describe('Service: loader', function () {

  // load the service's module
  beforeEach(module('angularjs500pxAutomateApp'));

  // instantiate service
  var loader;
  beforeEach(inject(function (_loader_) {
    loader = _loader_;
  }));

  it('should do something', function () {
    expect(!!loader).toBe(true);
  });

});
