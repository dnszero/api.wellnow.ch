'use strict';

const Sequelize = require('sequelize');
const app = require('../../src/app');
const models = app.get('models');
const sequelize = app.get('sequelize');

// The db object must be a dictionary of model names to models
// It must also include sequelize (instance) and Sequelize (ctor) properties
const db = Object.assign({
	Sequelize,
	sequelize
}, models);

module.exports = db;
