'use strict';

const assert = require('assert');
const validateDate = require('../../../../src/services/search/hooks/validateDate.js');

describe('search validateDate hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    validateDate()(mockHook);

    assert.ok(mockHook.validateDate);
  });
});
