const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Company = require('./company');
const Profession = require('./profession');

const CompanyProfession = sequelize.define('companyprofession', {
  // attributes
  // id: {
  //   type: Sequelize.INTEGER,
  //   autoIncrement: true,
  //   primaryKey: true,
  //   allowNull: false,
  // },
  //   professionId: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //   },
  //   workerId: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //   },
});
Company.belongsToMany(Profession, { through: CompanyProfession });
Profession.belongsToMany(Company, { through: CompanyProfession });

module.exports = CompanyProfession;
