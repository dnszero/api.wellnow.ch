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
    return queryInterface.bulkInsert('languages', [
      {
        id: 'en',
        name: 'English',
        defaultLanguage: true,
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        id: 'fr',
        fallback: 'en',
        name: 'Français',
        defaultLanguage: false,
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        id: 'de',
        fallback: 'en',
        name: 'Deutsch',
        defaultLanguage: false,
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        id: 'it',
        fallback: 'en',
        name: 'Italiano',
        defaultLanguage: false,
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
    return queryInterface.bulkDelete('languages', null, {});
  }
};
