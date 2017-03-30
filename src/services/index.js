'use strict';
const patient = require('./patient');
const opening = require('./opening');
const search = require('./search');
const availability = require('./availability');
const event = require('./event');
const procedure = require('./procedure');
const language = require('./language');
const category = require('./category');
const doctor = require('./doctor');
const user = require('./user');
const Sequelize = require('sequelize');

module.exports = function() {
  const app = this;

  const sequelize = new Sequelize(app.get('postgres'), {
    dialect: 'postgres',
    logging: false
  });
  app.set('sequelize', sequelize);

  //app.configure(authentication);
  app.configure(user);
  app.configure(doctor);
  app.configure(category);
  app.configure(language);
  app.configure(procedure);
  app.configure(event);
  app.configure(availability);
  app.configure(search);
  app.configure(opening);
  app.configure(patient);
};
