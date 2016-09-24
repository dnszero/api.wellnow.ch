'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('language service', function() {
  it('registered the languages service', () => {
    assert.ok(app.service('languages'));
  });
});
