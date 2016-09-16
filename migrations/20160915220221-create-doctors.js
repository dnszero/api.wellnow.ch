'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'doctors',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firstname: Sequelize.STRING,
        lastname: Sequelize.STRING,
        address: Sequelize.STRING,
        address2: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        locality: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        fax: Sequelize.STRING,
        mobile: Sequelize.STRING,
        avatar: Sequelize.STRING,
        background: Sequelize.STRING,
        latitude: Sequelize.FLOAT,
        longitude: Sequelize.FLOAT,
        //coordinates: Sequelize.GEOMETRY,
        timezone: {
          type: Sequelize.STRING,
          defaultValue: 'Bern'
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
    return queryInterface.dropTable('doctors');
  }
};
