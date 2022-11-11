const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Profession = require('./profession');
const Worker = require('./worker');

const WorkerProfession = sequelize.define('workerprofession', {
  //   attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  //   professionId: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //   },
  //   workerId: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //   },
});
Worker.belongsToMany(Profession, { through: WorkerProfession });
Profession.belongsToMany(Worker, { through: WorkerProfession });

module.exports = WorkerProfession;
