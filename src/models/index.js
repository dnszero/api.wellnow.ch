const doctor = require('./doctor');
const user = require('./user');
const category = require('./category');
const categoryTranslation = require('./category-translation');
const procedure = require('./procedure');
const procedureTranslation = require('./procedure-translation');
const language = require('./language');
const opening = require('./opening');
const event = require('./event');
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

  app.configure(language);
  app.configure(user);
  app.configure(doctor);
  app.configure(category);
  app.configure(categoryTranslation);
  app.configure(procedure);
  app.configure(procedureTranslation);
  app.configure(opening);
  app.configure(event);

  const models = sequelize.models;

  app.set('models', sequelize.models);

  console.log(models);

  models.categories.belongsToMany(models.languages, {through: models.categoriestranslations});
  models.categories.hasMany(models.categoriestranslations);
  models.languages.belongsToMany(models.categories, {through: models.categoriestranslations});

  models.procedures.belongsTo(models.categories);
  models.categories.hasMany(models.procedures);
  models.procedures.belongsToMany(models.languages, {through: models.procedurestranslations});
  models.procedures.hasMany(models.procedurestranslations);
  models.languages.belongsToMany(models.procedures, {through: models.procedurestranslations});

  models.categories.belongsToMany(models.doctors, {through: 'doctorscategories'});
  models.doctors.belongsToMany(models.categories, {through: 'doctorscategories'});

  models.doctors.hasMany(models.openings);
  models.openings.belongsTo(models.doctors);

  models.doctors.hasMany(models.events);
  models.events.belongsTo(models.doctors);

  sequelize.sync();
};
