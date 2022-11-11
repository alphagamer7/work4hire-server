const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Project = require('./project');

const Rating = sequelize.define('rating', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  comment: {
    type: Sequelize.STRING(500),
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  projectId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  uid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  workerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  companyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Project.hasMany(Rating, {
  foreignKey: 'projectId',
});

module.exports = Rating;
