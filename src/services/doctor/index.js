'use strict';

const service = require('feathers-sequelize');
//const doctor = require('./doctor-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;
  const models = app.get('models');

  // Initialize our service with any options it requires
  app.use('/api/v1/doctors', {
    find(params) {

      if (params.query.categoryId) {
        return models.doctors.findAll({
          include: [
             {
               model: models.categories,
               where: { id: params.query.categoryId }
             }
          ]
        });
      } else {
        return models.doctors.findAll({
          include: [
             { model: models.categories }
          ]
        });
      }
    },
  });

  // Get our initialize service to that we can bind hooks
  const doctorService = app.service('/api/v1/doctors');

  // Set up our before hooks
  doctorService.before(hooks.before);

  // Set up our after hooks
  doctorService.after(hooks.after);
};
