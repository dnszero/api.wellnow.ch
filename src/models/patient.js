'use strict';

const Sequelize = require('sequelize');

module.exports = function() {
  const app = this;
  const sequelize = app.get('sequelize');

  const patient = sequelize.define('patients', {
    title: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    firstname: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,           // don't allow empty strings
      }
    },
    lastname: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,           // don't allow empty strings
      }
    },
    address: Sequelize.STRING,
    address2: Sequelize.STRING,
    zipcode: Sequelize.STRING,
    locality: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      validate: {
        //notEmpty: false,           // don't allow empty strings
        isEmail: true,
      }
    },
    phone: Sequelize.STRING,
    avatar: Sequelize.STRING,
    latitude: {
      type: Sequelize.FLOAT,
      validate: {
        isFloat: true,
        min: -180,
        max: 180
      }
    },
    longitude: {
      type: Sequelize.FLOAT,
      validate: {
        isFloat: true,
        min: -180,
        max: 180
      }
    },
    birthday: Sequelize.DATE,
    timezone: {
      type: Sequelize.STRING,
      defaultValue: 'Bern'
    },
    languageId: {
      type: Sequelize.STRING,
      references: {
        model: 'languages',
        key: 'id'
      },
      defaultValue: 'en'
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    freezeTableName: true
  });

  return patient;
};
