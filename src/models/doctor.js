'use strict';

const Sequelize = require('sequelize');
const NodeGeocoder = require('node-geocoder');

module.exports = function() {
  const app = this;
  const sequelize = app.get('sequelize');
  const geocoder = NodeGeocoder(app.get('geocode_options'));

  const defaultOpenings = [
  {
    dayOfWeek: 1,
    openingFrom: '08:00',
    openingTo: '12:00'
  },
  {
    dayOfWeek: 1,
    openingFrom: '13:00',
    openingTo: '17:00'
  },
  {
    dayOfWeek: 2,
    openingFrom: '08:00',
    openingTo: '12:00'
  },
  {
    dayOfWeek: 2,
    openingFrom: '13:00',
    openingTo: '17:00'
  },
  {
    dayOfWeek: 3,
    openingFrom: '08:00',
    openingTo: '12:00'
  },
  {
    dayOfWeek: 3,
    openingFrom: '13:00',
    openingTo: '17:00'
  },
  {
    dayOfWeek: 4,
    openingFrom: '08:00',
    openingTo: '12:00'
  },
  {
    dayOfWeek: 4,
    openingFrom: '13:00',
    openingTo: '17:00'
  },
  {
    dayOfWeek: 5,
    openingFrom: '08:00',
    openingTo: '12:00'
  },
  {
    dayOfWeek: 5,
    openingFrom: '13:00',
    openingTo: '17:00'
  }];

  const doctor = sequelize.define('doctors', {
    title: {
      type: Sequelize.INTEGER
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
    freezeTableName: true,
    hooks: {
      afterCreate: function(doctor, options) {
        //Create default openings for the doctor
        for (let i in defaultOpenings) {
          defaultOpenings[i].doctorId = doctor.id;
        }

        sequelize.models.openings.bulkCreate(defaultOpenings);
      }
    }
  });

  return doctor;
};
