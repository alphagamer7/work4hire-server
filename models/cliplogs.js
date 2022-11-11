const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Company = require('./company');

const ClipLogs = sequelize.define('cliplogs', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  companyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  paymentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  noOfClips: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
Company.hasMany(ClipLogs, {
  foreignKey: 'companyId',
});

module.exports = ClipLogs;
