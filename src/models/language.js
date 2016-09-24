const Sequelize = require('sequelize');

module.exports = function() {
  const app = this;
  const sequelize = app.get('sequelize');

  const language = sequelize.define('languages', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    fallback: Sequelize.STRING,
    name: Sequelize.STRING,
    defaultLanguage: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  }, {
    freezeTableName: true
  });

  return language;
};
