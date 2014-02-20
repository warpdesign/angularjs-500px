'use strict';

describe('Service: viewer', function () {

  // load the service's module
  beforeEach(module('angularjs500pxAutomateApp'));

  // instantiate service
  var viewer;
  beforeEach(inject(function (_viewer_) {
    viewer = _viewer_;
  }));

  it('should do something', function () {
    expect(!!viewer).toBe(true);
  });

});
