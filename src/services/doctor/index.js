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
             },
             { model: models.openings }
          ]
        });
      } else {
        return models.doctors.findAll({
          include: [
             { model: models.categories },
             { model: models.openings }
          ]
        });
      }
    },
    create(data, params) {
      return models.doctors.create({
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        address2: data.address2,
        zipcode: data.zipcode,
        locality: data.locality,
        email: data.email,
        phone: data.phone,
        fax: data.fax,
        mobile: data.mobile,
        avatar: data.avatar,
        background: data.background,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone
      });
    },
    patch(id, data, params) {
      return models.doctors.update((data), {where: { id: id}}).then(function () {
        return models.doctors.findById(id, {
          include: [
            { model: models.categories },
            { model: models.openings },
          ]
        });
      });
    },
    get(id, params) {
      return models.doctors.findById(id, {
        include: [
           { model: models.categories },
           { model: models.openings },
        ]
      });
    }
  });

  // Get our initialize service to that we can bind hooks
  const doctorService = app.service('/api/v1/doctors');

  // Set up our before hooks
  doctorService.before(hooks.before);

  // Set up our after hooks
  doctorService.after(hooks.after);
};
