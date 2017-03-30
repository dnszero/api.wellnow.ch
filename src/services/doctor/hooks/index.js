'use strict';

const userToUserId = require('./userToUserId');

const geocode = require('../../../hooks/geocode');

const algolia = require('./algolia');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;


exports.before = {
  all: [auth.authenticate('jwt')],
  find: [globalHooks.addUserIdToQueryParams()],
  get: [],
  create: [globalHooks.addUserIdToQueryParams(), globalHooks.jsonapiDeserialize({
    users: {
      valueForRelationship: function (relationship) {
        return parseInt(relationship.id);
      }
    }
  }), geocode(), userToUserId()],
  update: [globalHooks.addUserIdToQueryParams(), globalHooks.jsonapiDeserialize()],
  patch: [globalHooks.addUserIdToQueryParams(), globalHooks.jsonapiDeserialize({
    categories: {
      valueForRelationship: function (relationship) {
        return parseInt(relationship.id);
      }
    }
  }), geocode()],
  remove: [globalHooks.addUserIdToQueryParams()]
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
  patch: [],
  remove: []
};
