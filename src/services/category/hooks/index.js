'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const translate = require('./translate');


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [translate()],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
