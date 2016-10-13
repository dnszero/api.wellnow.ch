'use strict';

const service = require('feathers-sequelize');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;
  const models = app.get('models');

  //Function to include translations in main attributes and move dates at the end of the response
  function cleanCategory(category) {
    for (const property in category.dataValues.categoriestranslations[0].dataValues) {
        if ((property !== 'id' && property !== 'categoryId') && category.dataValues.categoriestranslations[0].dataValues.hasOwnProperty(property)) {
            // do stuff
            category.dataValues[property] = category.dataValues.categoriestranslations[0].dataValues[property];
        }
    }
  }

  app.use('/api/v1/categories', {
    find(params) {
      let languageId = 'en';
      if (params.query.languageId) {
        languageId = params.query.languageId;
      }

      return models.categories.findAll({
        include: [
           { model: models.categoriestranslations, where: { languageId: languageId }},
           { model: models.procedures },
        ]
      }).then(function(categories) {

        // Add translations to attribute
        categories.map(function(category, index) {
          cleanCategory(category);
        });

        categories = categories.map(function(a) {return a.dataValues;});

        return {
          total: categories.count,
          limit: 0,
          //skip: filters.$skip || 0,
          data: categories
        };
      });
    },
    create(data, params) {
      const _data = data;
      return models.categories.create({rank: _data.rank}).then(function(category) {
          return models.categoriestranslations.create({name: _data.name, slug: _data.slug, categoryId: category.id, languageId: _data.languageId});
        });
    },
    get(id, params) {
      let languageId = 'en';
      if (params.query.languageId) {
        languageId = params.query.languageId;
      }

      return models.categories.findById(id, {
        include: [
           { model: models.categoriestranslations, where: { languageId: languageId }}
        ]
      }).then(function(category) {
          // Add translations to attribute
          cleanCategory(category);
          category = category.dataValues;
          return category;
      });
    }
  });

  // Get our initialize service to that we can bind hooks
  const categoryService = app.service('/api/v1/categories');

  // Set up our before hooks
  categoryService.before(hooks.before);

  // Set up our after hooks
  categoryService.after(hooks.after);
};
