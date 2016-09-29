const Sequelize = require('sequelize');
const urlSlug = require('url-slug');

module.exports = function() {
  const app = this;
  const sequelize = app.get('sequelize');

  const categoryTranslation = sequelize.define('categoriestranslations', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name : {
      type: Sequelize.STRING,
    },
    male : {
      type: Sequelize.STRING,
    },
    female : {
      type: Sequelize.STRING,
    },
    slug : {
      type: Sequelize.STRING,
    },
    // It is possible to create foreign keys:
    categoryId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      },
      allowNull: false
    },
    languageId: {
      type: Sequelize.STRING,
      references: {
        model: 'languages',
        key: 'id'
      },
      allowNull: false
    }
  }, {
    freezeTableName: true,
    hooks: {
      beforeCreate: function(translation, options) {
        if (!translation.slug || translation.slug === '') {
          translation.slug = urlSlug(translation.name);
        }
      }
    }
  });

  return categoryTranslation;
};
