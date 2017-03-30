'use strict';

const service = require('feathers-sequelize');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;
  const models = app.get('models');
  const errors = require('feathers-errors');

  // Initialize our service with any options it requires
  app.use('/api/v1/openings', {
    find(params) {
      console.log(params);
      if (params.query.doctorId) {
        return models.openings.findAll({
          where: {
            doctorId: params.query.doctorId,
          },
          include: [
            { model: models.doctors }
          ]
        });
      } else {
        return Promise.resolve(
          new errors.BadRequest('doctorId is missing from query params')
        );
      }
    },
    create(data, params) {
      return models.openings.create({
        dayOfWeek: data['day-of-week'],
        openingFrom: data['opening-from'],
        openingTo: data['opening-to'],
        doctorId: data.doctor
      });
    },
    get(id, params) {
      return models.openings.findById(id, {
        include: [
          { model: models.doctors },
        ]
      });
    },
    patch(id, data) {
      console.log(data);
      return models.openings.update({
        dayOfWeek: data['day-of-week'],
        openingFrom: data['opening-from'],
        openingTo: data['opening-to']
      }, {where: { id: id}}).then(function (opening) {
        return models.openings.findById(id, {
          include: [
            { model: models.doctors }
          ]
        });
      });
    },
    remove(id) {
      const _this = this;

      return models.openings.findById(id).then(function (opening) {
        return models.openings.destroy({ where: {'id': id} }).then(function () {
          return opening;
        });
      });
    }
  });

  // Get our initialize service to that we can bind hooks
  const openingService = app.service('/api/v1/openings');

  // Set up our before hooks
  openingService.before(hooks.before);

  // Set up our after hooks
  openingService.after(hooks.after);
};
