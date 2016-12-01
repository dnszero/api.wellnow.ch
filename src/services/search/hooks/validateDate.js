'use strict';

// src/services/search/hooks/validateDate.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const moment = require('moment');

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    //Check dates parameters and set to tomorrow by default if empty
    if (!hook.data.datefrom) {
        console.log('Default datefrom');
        hook.data.datefrom = moment().add(1, 'days').startOf('day').unix();
    } else {
      if (!hook.data.dateto) {
        hook.data.dateto = moment(hook.data.datefrom).add(1, 'days').startOf('day').unix();
      } else {
        hook.data.dateto = moment(hook.data.dateto).add(1, 'days').startOf('day').unix();
      }
      hook.data.datefrom = moment(hook.data.datefrom).unix();
    }

    if (!hook.data.dateto) {
        hook.data.dateto = moment().add(1, 'days').startOf('day').unix();
    }

    hook.validateDate = true;
  };
};
