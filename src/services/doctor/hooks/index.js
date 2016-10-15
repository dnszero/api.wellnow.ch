'use strict';

const geocode = require('./geocode');

const algolia = require('./algolia');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [geocode()],
  update: [],
  patch: [geocode()],
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
  create: [algolia()],
  update: [],
  patch: [],
  remove: []
};
