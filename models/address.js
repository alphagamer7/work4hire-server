const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');

// Models Associated to this model

const Address = sequelize.define('address', {
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
  lat: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  lng: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  location: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  postcode: {
    type: Sequelize.STRING(225),
    allowNull: false,
  },
  isDefault: {
    type: Sequelize.INTEGER,
  },
  city: {
    type: Sequelize.STRING(225),
    allowNull: false,
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

User.hasMany(Address, {
  foreignKey: 'uid',
});

module.exports = Address;
