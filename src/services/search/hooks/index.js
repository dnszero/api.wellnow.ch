'use strict';

const changeHitsIntoDoctors = require('./changeHitsIntoDoctors');

const validateDate = require('./validateDate');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [validateDate()],
  update: [validateDate()],
  patch: [validateDate()],
  remove: []
};

exports.after = {
  all: [changeHitsIntoDoctors(), globalHooks.jsonapiSerialize('search', {attributes: ['nbHits', 'page', 'nbPages','hitsPerPage','processingTimeMS','query','params','phone','hits','doctors'],
    doctors: {
      ref: 'id',
      included: true,
      attributes: ['firstname', 'lastname', 'email']
    }})],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
