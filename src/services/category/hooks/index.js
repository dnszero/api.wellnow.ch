'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
//const translate = require('./translate');


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [],
  //create: [translate()],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [globalHooks.jsonapiSerialize('categories', {attributes: ['name', 'male', 'female', 'slug', 'rank', 'createdAt', 'updatedAt']})],
  //all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
