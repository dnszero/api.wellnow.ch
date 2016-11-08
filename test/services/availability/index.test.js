'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('availability service', function() {
  it('registered the availabilities service', () => {
    assert.ok(app.service('availabilities'));
  });
});
