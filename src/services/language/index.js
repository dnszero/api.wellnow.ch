'use strict';

const service = require('feathers-sequelize');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;
  const models = app.get('models');

  const options = {
    Model: models.languages,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/languages', service(options));

  // Get our initialize service to that we can bind hooks
  const languageService = app.service('/api/v1/languages');

  // Set up our before hooks
  languageService.before(hooks.before);

  // Set up our after hooks
  languageService.after(hooks.after);
};
