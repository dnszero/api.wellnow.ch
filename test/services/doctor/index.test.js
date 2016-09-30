'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('doctor service', function() {
  it('registered the doctors service', () => {
    assert.ok(app.service('/api/v1/doctors'));
  });
});
