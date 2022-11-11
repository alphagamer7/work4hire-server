const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Company = sequelize.define('company', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  uid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  companyName: {
    type: Sequelize.STRING(225),
    allowNull: false,
  },
  distance: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  vatnum: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  aboutus: {
    type: Sequelize.STRING(500),
  },
  professionList: {
    type: Sequelize.STRING(225),
  },
  clips: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Company;
