const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const News = sequelize.define('news', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING(225),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  group: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});

module.exports = News;
