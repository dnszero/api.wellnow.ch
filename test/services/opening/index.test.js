'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('opening service', function() {
  it('registered the openings service', () => {
    assert.ok(app.service('openings'));
  });
});
