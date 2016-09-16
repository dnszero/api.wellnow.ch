'use strict';

const service = require('feathers-sequelize');
//const doctor = require('./doctor-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;
  const models = app.get('models');

  const options = {
    //Model: doctor(app.get('sequelize')),
    Model: models.doctors,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/doctors', service(options));

  // Get our initialize service to that we can bind hooks
  const doctorService = app.service('/doctors');

  // Set up our before hooks
  doctorService.before(hooks.before);

  // Set up our after hooks
  doctorService.after(hooks.after);
};
