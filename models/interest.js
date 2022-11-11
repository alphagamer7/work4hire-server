const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Project = require('./project');
const Worker = require('./worker');

const Interest = sequelize.define('interest', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  projectId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  workerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
Project.hasMany(Interest, {
  foreignKey: 'projectId',
});
Worker.hasMany(Interest, {
  foreignKey: 'workerId',
});

module.exports = Interest;
