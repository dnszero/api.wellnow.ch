'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('event service', function() {
  it('registered the events service', () => {
    assert.ok(app.service('/api/v1/events'));
  });
});
