'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('patient service', function() {
  it('registered the patients service', () => {
    assert.ok(app.service('patients'));
  });
});
