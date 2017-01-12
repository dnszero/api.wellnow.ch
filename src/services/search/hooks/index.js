'use strict';
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
  all: [globalHooks.jsonapiSerialize('search', {
    pluralizeType: false,
    attributes: ['nbHits', 'page', 'nbPages','hitsPerPage','processingTimeMS','query','params','hits'],
      hits: {
        ref: 'objectID',
        included: true,
        attributes: ['date', '_rankingInfo', 'doctor'],
        doctor: {
          ref: 'id',
          included: true,
          attributes: ['firstname', 'lastname', 'address','address2','zipcode','locality','email','phone','fax','mobile','avatar','background','latitude','longitude','timezone', 'createdAt', 'updatedAt', 'categories', 'openings']
        }
      }
  })],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
