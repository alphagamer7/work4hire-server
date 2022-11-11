const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Worker = require('./worker');
const WorkerProfession = require('./workerprofession');

const Profession = sequelize.define('profession', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});

module.exports = Profession;
