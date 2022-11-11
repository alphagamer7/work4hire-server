const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

// Models associated with this model

const User = sequelize.define('user', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING(225),
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING(225),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(225),
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3, 50],
        msg: 'account_email need to be 3 to 50 characters.',
      },
      isEmail: {
        args: true,
        msg: 'account_email has an invalid email.',
      },
    },
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
  },
  locationName: {
    type: Sequelize.STRING(225),
    allowNull: false,
  },
  fcm_token: {
    type: Sequelize.STRING(225),
  },
  lat: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  lng: {
    type: Sequelize.INTEGER,
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  profilePic: {
    type: Sequelize.STRING(225),
  },
});

module.exports = User;
