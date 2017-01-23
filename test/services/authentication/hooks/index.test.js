'use strict';

const assert = require('assert');
const index = require('../../../../src/services/authentication/hooks/index.js');

describe('authentication index hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    index()(mockHook);

    assert.ok(mockHook.index);
  });
});
