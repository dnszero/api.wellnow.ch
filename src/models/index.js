const doctor = require('./doctor');
const user = require('./user');
const Sequelize = require('sequelize');

module.exports = function() {
  const app = this;

  const sequelize = new Sequelize(app.get('postgres'), {
    dialect: 'postgres',
    logging: console.log
  });

  app.set('sequelize', sequelize);

  app.configure(user);
  app.configure(doctor);

  app.set('models', sequelize.models);

  Object.keys(sequelize.models).forEach(function(modelName) {
    if ("associate" in sequelize.models[modelName]) {
      sequelize.models[modelName].associate();
    }
  });

  sequelize.sync();
};
