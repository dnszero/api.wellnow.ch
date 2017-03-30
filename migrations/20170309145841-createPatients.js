'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'patients',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: Sequelize.INTEGER,
        firstname: Sequelize.STRING,
        lastname: Sequelize.STRING,
        address: Sequelize.STRING,
        address2: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        locality: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        avatar: Sequelize.STRING,
        latitude: Sequelize.FLOAT,
        longitude: Sequelize.FLOAT,
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
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('patients');
  }
};
