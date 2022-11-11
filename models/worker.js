const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Company = require('./company');

const Worker = sequelize.define('worker', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uid: {
    type: Sequelize.INTEGER,
  },
  companyId: {
    type: Sequelize.INTEGER,
  },
});

Company.hasMany(Worker, {
  foreignKey: 'companyId',
});

module.exports = Worker;
