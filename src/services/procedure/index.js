'use strict';

const service = require('feathers-sequelize');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;
  const models = app.get('models');

  //Function to include translations in main attributes and move dates at the end of the response
  function cleanProcedure(procedure) {
    for (const property in procedure.dataValues.procedurestranslations[0].dataValues) {
        if ((property !== 'id' && property !== 'procedureId') && procedure.dataValues.procedurestranslations[0].dataValues.hasOwnProperty(property)) {
            // do stuff
            procedure.dataValues[property] = procedure.dataValues.procedurestranslations[0].dataValues[property];
        }
    }
  }

  // Initialize our service with any options it requires
  app.use('/api/v1/procedures', {
    find(params) {
      let languageId = 'en';
      if (params.query.languageId) {
        languageId = params.query.languageId;
      }

      return models.procedures.findAll({
        include: [
           { model: models.procedurestranslations, where: { languageId: languageId }}
        ]
      }).then(function(procedures) {

        // Add translations to attribute
        procedures.map(function(procedure, index) {
          cleanProcedure(procedure);
        });

        return procedures.map(function(a) {return a.dataValues;});

        //return procedures;
      });
    },
    create(data, params) {
      const _data = data;
      return models.procedures.create({rank: data.rank, categoryId: data.categoryId}).then(function(procedure) {
          return models.procedurestranslations.create({name: _data.name, slug: _data.slug, procedureId: procedure.id, languageId: _data.languageId});
        });
    },
    get(id, params) {

      let languageId = 'en';
      if (params.query.languageId) {
        languageId = params.query.languageId;
      }

      return models.procedures.findById(id, {
        include: [
           { model: models.procedurestranslations, where: { languageId: languageId }}
        ]
      }).then(function(procedure) {
          // Add translations to attribute
          cleanProcedure(procedure);

          return procedure.dataValues;
      });
    }
  });

  // Get our initialize service to that we can bind hooks
  const procedureService = app.service('/api/v1/procedures');

  // Set up our before hooks
  procedureService.before(hooks.before);

  // Set up our after hooks
  procedureService.after(hooks.after);
};
