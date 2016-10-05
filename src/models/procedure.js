const Sequelize = require('sequelize');

module.exports = function() {
  const app = this;
  const sequelize = app.get('sequelize');

  const procedure = sequelize.define('procedures', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rank: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      validate: {
        notEmpty: true,           // don't allow empty strings
      }
    },
    categoryId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      },
      allowNull: false
    }
  }, {
    freezeTableName: true
  });
  return procedure;
};
