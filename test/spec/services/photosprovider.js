'use strict';

describe('Service: photosProvider', function () {

  // load the service's module
  beforeEach(module('angularjs500pxAutomateApp'));

  // instantiate service
  var photosProvider;
  beforeEach(inject(function (_photosProvider_) {
    photosProvider = _photosProvider_;
  }));

  it('should do something', function () {
    expect(!!photosProvider).toBe(true);
  });

});
