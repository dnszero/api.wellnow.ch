const Sequelize = require('sequelize');

module.exports = function() {
  const app = this;
  const sequelize = app.get('sequelize');

  const category = sequelize.define('categories', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name : {
      type: Sequelize.STRING,
      i18n: true
    },
    slug : {
      type: Sequelize.STRING,
      i18n: true
    },
    rank: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      validate: {
        notEmpty: true,           // don't allow empty strings
      }
    }
  }, {
    freezeTableName: true
  });

  return category;
};
