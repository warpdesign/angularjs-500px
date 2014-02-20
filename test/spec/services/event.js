'use strict';

describe('Service: event', function () {

  // load the service's module
  beforeEach(module('angularjs500pxAutomateApp'));

  // instantiate service
  var event;
  beforeEach(inject(function (_event_) {
    event = _event_;
  }));

  it('should do something', function () {
    expect(!!event).toBe(true);
  });

});
