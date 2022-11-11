const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

// Models Associated to this model
const Worker = require('./worker');

const Certificate = sequelize.define('certificate', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(225),
    allowNull: false,
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  moreDetails: {
    type: Sequelize.STRING(225),
  },
  workerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  certificateImg: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  docId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Worker.hasMany(Certificate, {
  foreignKey: 'workerId',
});

module.exports = Certificate;
