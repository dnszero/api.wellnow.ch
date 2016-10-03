'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('openings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      dayOfWeek: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      openingFrom: {
        type: Sequelize.TIME,
        allowNull: false
      },
      openingTo: {
        type: Sequelize.TIME,
        allowNull: false
      },
      doctorId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'doctors',
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
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('openings');
  }
};
