'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('availability service', function() {
  it('registered the availabilities service', () => {
    assert.ok(app.service('/api/v1/doctors/:doctor_id/availabilities'));
  });
});
