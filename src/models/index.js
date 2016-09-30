const doctor = require('./doctor');
const user = require('./user');
const category = require('./category');
const categoryTranslation = require('./category-translation');
const language = require('./language');
const Sequelize = require('sequelize');
const SequelizeI18N = require('sequelize-i18n');

const languages = {
    list : ['EN', 'FR', 'DE', 'IT'] ,
    default : 'EN'
};

module.exports = function() {
  const app = this;

  const sequelize = new Sequelize(app.get('postgres'), {
    dialect: 'postgres',
    logging: console.log
  });

  // Init i18n
  const i18n = new SequelizeI18N( sequelize, { languages: languages.list, default_language: languages.default } );
  i18n.init();

  app.set('sequelize', sequelize);
  app.set('sequelizeI18N', i18n);

  app.configure(user);
  app.configure(doctor);
  app.configure(category);
  app.configure(categoryTranslation);
  app.configure(language);

  const models = sequelize.models;

  app.set('models', sequelize.models);

  console.log(models);

  models.categories.belongsToMany(models.languages, {through: models.categoriestranslations});
  models.categories.hasMany(models.categoriestranslations);
  models.languages.belongsToMany(models.categories, {through: models.categoriestranslations});

  models.categories.belongsToMany(models.doctors, {through: 'doctorscategories'});
  models.doctors.belongsToMany(models.categories, {through: 'doctorscategories'});

  /*Object.keys(sequelize.models).forEach(function(modelName) {
    if ("associate" in sequelize.models[modelName]) {
      sequelize.models[modelName].associate();
    }
  });*/

  //console.log(sequelize);

  sequelize.sync();
};
