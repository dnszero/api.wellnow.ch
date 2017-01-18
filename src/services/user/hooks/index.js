'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [],
  find: [
    auth.authenticate('jwt')
    // auth.verifyToken(),
    // auth.populateUser(),
    // auth.restrictToAuthenticated()
  ],
  get: [
    // auth.verifyToken(),
    // auth.populateUser(),
    // auth.restrictToAuthenticated(),
    // auth.restrictToOwner({ ownerField: 'id' })
  ],
  create: [
    globalHooks.jsonapiDeserialize(),
    //auth.hashPassword()
  ],
  update: [
    // auth.verifyToken(),
    // auth.populateUser(),
    // auth.restrictToAuthenticated(),
    // auth.restrictToOwner({ ownerField: 'id' })
  ],
  patch: [
    // auth.verifyToken(),
    // auth.populateUser(),
    // auth.restrictToAuthenticated(),
    // auth.restrictToOwner({ ownerField: 'id' })
  ],
  remove: [
    // auth.verifyToken(),
    // auth.populateUser(),
    // auth.restrictToAuthenticated(),
    // auth.restrictToOwner({ ownerField: 'id' })
  ]
};

exports.after = {
  all: [hooks.remove('password')],
  find: [globalHooks.jsonapiSerialize('users', {attributes: ['email', 'password','facebookId', 'googleId','linkedinId','createdAt', 'updatedAt']})],
  get: [],
  create: [globalHooks.jsonapiSerialize('users', {attributes: ['email', 'password','facebookId', 'googleId','linkedinId','createdAt', 'updatedAt']})],
  update: [globalHooks.jsonapiSerialize('users', {attributes: ['email', 'password','facebookId', 'googleId','linkedinId','createdAt', 'updatedAt']})],
  patch: [globalHooks.jsonapiSerialize('users', {attributes: ['email', 'password','facebookId', 'googleId','linkedinId','createdAt', 'updatedAt']})],
  remove: []
};
