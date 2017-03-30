'use strict';

const updateAvailabilities = require('./updateAvailabilities');
const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [globalHooks.jsonapiDeserialize({
    doctors: {
      valueForRelationship: function (relationship) {
        return parseInt(relationship.id);
      }
    }
  })],
  update: [],
  patch: [globalHooks.jsonapiDeserialize()],
  remove: []
};

exports.after = {
  all: [globalHooks.jsonapiSerialize('openings', {attributes: ['dayOfWeek', 'openingFrom', 'openingTo', 'createdAt', 'updatedAt', 'doctor'],
    doctor: {
      ref: 'id',
      included: true
    }
  })],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [updateAvailabilities()],
  remove: []
};
