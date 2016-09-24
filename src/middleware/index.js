'use strict';

const signup = require('./signup');

const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const logger = require('./logger');
//const i18n = require('./i18n');

module.exports = function() {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;
  //app.use(notFound());
  app.use(logger(app));
  app.use(handler());
  //app.use(i18n());

};
