'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [globalHooks.jsonapiSerialize('events', {attributes: ['name', 'location', 'allDay','eventFrom','eventTo', 'createdAt', 'updatedAt', 'doctor'],
    doctor: {
      ref: 'id',
      included: false
    }
  })],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
