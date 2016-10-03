const Sequelize = require('sequelize');

module.exports = function() {
  const app = this;
  const sequelize = app.get('sequelize');

  const opening = sequelize.define('openings', {
    dayOfWeek: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    openingFrom: {
      type: Sequelize.TIME,
      allowNull: false
    },
    openingTo: {
      type: Sequelize.TIME,
      allowNull: false
    },
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

  return opening;
};
