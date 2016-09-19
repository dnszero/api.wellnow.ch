const doctor = require('./doctor');
const user = require('./user');
const category = require('./category');
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

  app.set('models', sequelize.models);

  Object.keys(sequelize.models).forEach(function(modelName) {
    if ("associate" in sequelize.models[modelName]) {
      sequelize.models[modelName].associate();
    }
  });

  sequelize.sync();
};
