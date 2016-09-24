'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addIndex(
      'languages',
      'fallback',
      {
        indexName: 'FallbackIndex'
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeIndex('languages', 'FallbackIndex');
  }
};
