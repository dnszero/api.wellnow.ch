'use strict';

const service = require('feathers-sequelize');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;
  const models = app.get('models');

  // Initialize our service with any options it requires
  app.use('/api/v1/events', {
    find(params) {
      return models.events.findAll();
    },
    create(data, params) {
      return models.events.create(data);
    },
    get(id, params) {
      return models.events.findById(id);
    }
  });

  // Get our initialize service to that we can bind hooks
  const eventService = app.service('/api/v1/events');

  // Set up our before hooks
  eventService.before(hooks.before);

  // Set up our after hooks
  eventService.after(hooks.after);
};
