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
  all: [globalHooks.jsonapiSerialize('doctors', {attributes: ['firstname', 'lastname', 'address','address2','zipcode','locality','email','phone','fax','mobile','avatar','background','latitude','longitude','timezone', 'createdAt', 'updatedAt', 'categories', 'openings'],
    categories: {
      ref: 'id',
      included: false
    },
    openings: {
      ref: 'id',
      included: true,
      attributes: ['dayOfWeek', 'openingFrom', 'openingTo']
    }})],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
