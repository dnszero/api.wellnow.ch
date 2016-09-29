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
    return queryInterface.bulkInsert('categoriestranslations', [
      {
        name: 'General medicine',
        male: 'General doctor',
        female: 'General doctor',
        slug: 'general-doctor',
        categoryId: 1,
        languageId: 'en',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Médecine générale',
        male: 'Médecin généraliste',
        female: 'Médecin généraliste',
        slug: 'medecin-generaliste',
        categoryId: 1,
        languageId: 'fr',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Dentist',
        male: 'Dentist',
        female: 'Dentist',
        slug: 'dentist',
        categoryId: 2,
        languageId: 'en',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Dentiste',
        male: 'Dentiste',
        female: 'Dentiste',
        slug: 'dentist',
        categoryId: 2,
        languageId: 'fr',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Physiotherapy',
        male: 'Physiotherapist',
        female: 'Physiotherapist',
        slug: 'physiotherapy',
        categoryId: 3,
        languageId: 'en',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Physiothérapeute',
        male: 'Physiothérapiste',
        female: 'Physiothérapiste',
        slug: 'medecin-generaliste',
        categoryId: 3,
        languageId: 'fr',
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
  }
};
