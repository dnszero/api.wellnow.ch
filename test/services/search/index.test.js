'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('search service', function() {
  it('registered the searches service', () => {
    assert.ok(app.service('/api/v1/search'));
  });
});
