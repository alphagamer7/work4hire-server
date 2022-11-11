const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

// Models Associated to this model

const ClipPriceList = sequelize.define('clippricelist', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  numOfClips: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  adminId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = ClipPriceList;
