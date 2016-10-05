'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const now = new Date(Date.now());
    const nowString = now.getUTCFullYear() + '-' + now.getUTCMonth() + '-' + now.getUTCDate() + ' ' + now.getUTCHours() + ':' + now.getUTCMinutes();
    return queryInterface.bulkInsert('procedurestranslations', [
      {
        name: 'Check up',
        slug: 'check-up',
        procedureId: 1,
        languageId: 'en',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Check up',
        slug: 'check-up',
        procedureId: 1,
        languageId: 'fr',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Cold',
        slug: 'cold',
        procedureId: 1,
        languageId: 'en',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Refroidissement',
        slug: 'refroissement',
        procedureId: 1,
        languageId: 'fr',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Yearly control',
        slug: 'yearly-control',
        procedureId: 2,
        languageId: 'en',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Contrôle annuel',
        slug: 'controle-annuel',
        procedureId: 2,
        languageId: 'fr',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Dental carie',
        slug: 'dental-carie',
        procedureId: 2,
        languageId: 'en',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Carie',
        slug: 'carie',
        procedureId: 2,
        languageId: 'fr',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Backaches',
        slug: 'backaches',
        procedureId: 3,
        languageId: 'en',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Maux de dos',
        slug: 'maux-de-dos',
        procedureId: 3,
        languageId: 'fr',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Thigh pains',
        slug: 'thigh-pains',
        procedureId: 3,
        languageId: 'en',
        createdAt: nowString,
        updatedAt: nowString
      },
      {
        name: 'Douleurs à la cuisse',
        slug: 'Douleurs à la cuisse',
        procedureId: 3,
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
    return queryInterface.bulkDelete('procedurestranslations', null, {});
  }
};
