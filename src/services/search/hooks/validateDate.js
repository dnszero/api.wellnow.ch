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
    console.log('Validate date');
    console.log(hook.data.datefrom);
    //Check dates parameters and set to tomorrow by default if empty
    if (!hook.data.datefrom) {
        hook.data.datefrom = moment().utc().add(1, 'days').startOf('day').unix();
        hook.data.dateto = moment().utc().add(2, 'days').startOf('day').unix();
    } else {
      if (!hook.data.dateto) {
        hook.data.dateto = moment(hook.data.datefrom).utc().add(1, 'days').startOf('day').unix();
      } else {
        hook.data.dateto = moment(hook.data.dateto).utc().add(1, 'days').startOf('day').unix();
      }
      hook.data.datefrom = moment(hook.data.datefrom).utc().unix();
    }

    if (!hook.data.dateto) {
        hook.data.dateto = moment().utc().add(1, 'days').startOf('day').unix();
    }

    console.log("After validation");
    console.log(hook.data.datefrom);

    hook.validateDate = true;
  };
};
