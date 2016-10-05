'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('procedure service', function() {
  it('registered the procedures service', () => {
    assert.ok(app.service('/api/v1/procedures'));
  });
});
