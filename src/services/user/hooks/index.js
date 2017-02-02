'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const authLocal = require('feathers-authentication-local').hooks;

exports.before = {
  all: [],
  find: [
    auth.authenticate('jwt')
    // auth.verifyToken(),
    // auth.populateUser(),
    // auth.restrictToAuthenticated()
  ],
  get: [
    auth.authenticate('jwt'),
    // auth.populateUser(),
    // auth.restrictToAuthenticated(),
    // auth.restrictToOwner({ ownerField: 'id' })
  ],
  create: [
    globalHooks.jsonapiDeserialize(),
    authLocal.hashPassword()
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
  all: [hooks.remove('password'), globalHooks.jsonapiSerialize('users', {attributes: ['email', 'password','facebookId', 'googleId','linkedinId','createdAt', 'updatedAt']})],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
