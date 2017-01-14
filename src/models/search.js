const Sequelize = require('sequelize');

module.exports = function() {
  const app = this;
  const sequelize = app.get('sequelize');

  const search = sequelize.define('searches', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    location: Sequelize.STRING,
    lat: Sequelize.FLOAT,
    lng: Sequelize.FLOAT,
    dateFrom: Sequelize.DATE,
    dateTo: Sequelize.DATE,
    categoryId: {
      type: Sequelize.INTEGER,
      references: {
          model: 'categories',
          key: 'id'
      }
    }
  }, {
    freezeTableName: true
  });
  return search;
};
