const Sequelize = require('sequelize');

module.exports = function() {
  const app = this;
  const sequelize = app.get('sequelize');

  const doctor = sequelize.define('doctors', {
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
        notEmpty: true,           // don't allow empty strings
        isEmail: true,
      }
    },
    phone: Sequelize.STRING,
    fax: Sequelize.STRING,
    mobile: Sequelize.STRING,
    avatar: Sequelize.STRING,
    background: Sequelize.STRING,
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
    //coordinates: Sequelize.GEOMETRY,
    timezone: {
      type: Sequelize.STRING,
      defaultValue: 'Bern'
    }
  }, {
    freezeTableName: true
  });

  return doctor;
};
