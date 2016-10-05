'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const now = new Date(Date.now());
    const nowString = now.getUTCFullYear() + '-' + now.getUTCMonth() + '-' + now.getUTCDate() + ' ' + now.getUTCHours() + ':' + now.getUTCMinutes();
    return queryInterface.bulkInsert('procedures', [
      {
        id: 1,
        categoryId: 1,
        rank: 0,
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        id: 2,
        categoryId: 1,
        rank: 0,
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        id: 3,
        categoryId: 2,
        rank: 0,
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        id: 4,
        categoryId: 2,
        rank: 0,
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        id: 5,
        categoryId: 3,
        rank: 0,
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        id: 6,
        categoryId: 3,
        rank: 0,
        createdAt: nowString,
        updatedAt: nowString
      },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('procedures', null, {});
  }
};
