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
  all: [globalHooks.jsonapiSerialize('procedures', {attributes: ['name', 'slug', 'rank', 'createdAt', 'updatedAt']})],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
