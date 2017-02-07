'use strict';

const assert = require('assert');
const userToUserId = require('../../../../src/services/doctor/hooks/userToUserId.js');

describe('doctor userToUserId hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    userToUserId()(mockHook);

    assert.ok(mockHook.userToUserId);
  });
});
