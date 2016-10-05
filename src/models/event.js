const Sequelize = require('sequelize');

module.exports = function() {
  const app = this;
  const sequelize = app.get('sequelize');

  const event = sequelize.define('events', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING,
    location: Sequelize.STRING,
    allDay: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    eventFrom: Sequelize.DATE,
    eventTo: Sequelize.DATE,
    doctorId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'doctors',
        key: 'id'
      },
      allowNull: false
    }
  }, {
    freezeTableName: true
  });
  return event;
};
