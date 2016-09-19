'use strict';

const service = require('feathers-sequelize');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;
  const models = app.get('models');

  const options = {
    Model: models.categories,
    paginate: {
      default: 100,
      max: 100
    }
  };

  // Initialize our service with any options it requires
  app.use('/categories', service(options));

  // Get our initialize service to that we can bind hooks
  const categoryService = app.service('/categories');

  // Set up our before hooks
  categoryService.before(hooks.before);

  // Set up our after hooks
  categoryService.after(hooks.after);
};
