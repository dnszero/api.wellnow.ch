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
  all: [globalHooks.jsonapiSerialize('languages', {attributes: ['defaultLanguage', 'name', 'fallback']})],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
