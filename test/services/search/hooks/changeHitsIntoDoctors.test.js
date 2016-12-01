'use strict';

const assert = require('assert');
const changeHitsIntoDoctors = require('../../../../src/services/search/hooks/changeHitsIntoDoctors.js');

describe('search changeHitsIntoDoctors hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    changeHitsIntoDoctors()(mockHook);

    assert.ok(mockHook.changeHitsIntoDoctors);
  });
});
