const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

// Models associated with this models
const User = require('./user');

const Project = sequelize.define('project', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  projectType: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  uid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true,
  },
  status: {
    type: Sequelize.STRING(225),
    allowNull: false,
  },
  moreDetails: {
    type: Sequelize.STRING(225),
  },
  projectTitle: {
    type: Sequelize.STRING(225),
    allowNull: false,
  },

  images: {
    type: Sequelize.STRING(225),
    allowNull: false,
  },

  chosen: {
    type: Sequelize.STRING(225),
  },
  addressId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

User.hasMany(Project, {
  foreignKey: 'uid',
});

module.exports = Project;
