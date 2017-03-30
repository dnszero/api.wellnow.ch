'use strict';

const globalHooks = require('../../../hooks');
const geocode = require('../../../hooks/geocode');
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
  }), geocode()],
  update: [globalHooks.addUserIdToQueryParams(), globalHooks.jsonapiDeserialize({
    users: {
      valueForRelationship: function (relationship) {
        return parseInt(relationship.id);
      }
    }
  }), geocode()],
  patch: [globalHooks.addUserIdToQueryParams(), globalHooks.jsonapiDeserialize({
    users: {
      valueForRelationship: function (relationship) {
        return parseInt(relationship.id);
      }
    }
  }), geocode()],
  remove: [globalHooks.addUserIdToQueryParams()]
};

exports.after = {
  all: [
    globalHooks.jsonapiSerialize('patients', {
      attributes: ['title', 'firstname', 'lastname', 'address','address2','zipcode','locality','email','phone','avatar','latitude','longitude','timezone', 'birthday', 'language', 'createdAt', 'updatedAt'],
      language: {
        ref: 'id',
        included: false
      }
    })
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
