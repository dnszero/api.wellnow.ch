'use strict';

const userToUserId = require('./userToUserId');

const geocode = require('./geocode');

const algolia = require('./algolia');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [globalHooks.jsonapiDeserialize({
    users: {
      valueForRelationship: function (relationship) {
        console.log(relationship);
        return parseInt(relationship.id);
      }
    }
  }), userToUserId()],
  update: [globalHooks.jsonapiDeserialize()],
  patch: [globalHooks.jsonapiDeserialize()],
  remove: []
};

exports.after = {
  all: [globalHooks.jsonapiSerialize('doctors', {attributes: ['firstname', 'lastname', 'address','address2','zipcode','locality','email','phone','fax','mobile','avatar','background','latitude','longitude','timezone', 'createdAt', 'updatedAt', 'categories', 'openings', 'user'],
    categories: {
      ref: 'id',
      included: false
    },
    user: {
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
  create: [algolia(), geocode()],
  update: [],
  patch: [geocode()],
  remove: []
};
