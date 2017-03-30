'use strict';

const service = require('feathers-sequelize');
const hooks = require('./hooks');
const errors = require('feathers-errors');

module.exports = function(){
  const app = this;
  const models = app.get('models');

  // Initialize our service with any options it requires
  app.use('/api/v1/patients', {
    find(params) {
      console.log('Find patients');
      console.log(params);
      if (params.query.userId) {
        const filter = {
          where: {},
          include: [
            {
              model: models.doctors,
              where: {
                userId: params.query.userId
              }
            }
          ]
        };


        return models.patients.findAll(filter);
      } else {
        return Promise.resolve(
          new errors.BadRequest('userId is missing from query params')
        );
      }
    },
    get(id, params) {
      return models.patients.findById(id, {
        include: [
           { model: models.users }
        ]
      });
    },
    create(data, params) {
      console.log('Create patient');
      console.log(data);
      console.log(params);

      if (params.query.userId) {
        return models.patients.create({
          title: data.title,
          firstname: data.firstname,
          lastname: data.lastname,
          address: data.address,
          address2: data.address2,
          zipcode: data.zipcode,
          locality: data.locality,
          email: data.email,
          phone: data.phone,
          avatar: data.avatar,
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.timezone,
          birthday: data.birthday,
          userId: data.userId,
          languageId: data.languageId,
        }).then(function(patient) {
          //Get the desired doctor
          return models.doctors.find({
            where: {
              userId: params.query.userId
            }
          }).then(function (doctor) {
            return patient.addDoctor(doctor).then(function(newPatient) {
              return patient;
            });
          });
        });
      } else {
        return Promise.resolve(
          new errors.BadRequest('userId is missing from query params')
        );
      }
    },
    patch(id, data, params) {
      console.log('Patch client');
      return models.patients.update((data), {where: { id: id}}).then(function (patient) {
        console.log('Patient updated');
        return models.patients.findById(id, {
          include: [
             { model: models.users }
          ]
        });
      });
    },
    remove(id, params) {
      const _this = this;

      return models.patients.findById(id).then(function (patient) {
        //Get the desired doctor
        return models.doctors.find({
          where: {
            userId: params.query.userId
          }
        }).then(function (doctor) {
          return patient.removeDoctor(doctor).then(function() {
            patient.destroy();
            return patient;
          });
        });
      });
    }
  });

  // Get our initialize service to that we can bind hooks
  const patientService = app.service('/api/v1/patients');

  // Set up our before hooks
  patientService.before(hooks.before);

  // Set up our after hooks
  patientService.after(hooks.after);
};
