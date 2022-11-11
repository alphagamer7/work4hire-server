const Sequelize = require('sequelize');
const logger = require('./logger');

// Logging Function
const databaseLogger = (msg) => {
    logger.info({
        label: 'sequelize',
        message: msg
    });
};

// Start MySQL Server
// const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER || "root", process.env.MYSQL_PASSWORD, {
//     host: process.env.MYSQL_HOST,
//     port: process.env.MYSQL_PORT || 3306,
//     dialect: 'mysql',
//     logging:( process.env.DB_LOGGING === 'true' ) ? databaseLogger : false // This will save the database logs into a file
// });
const sequelize = new Sequelize("fagfoejr_fagfolkdb", "fagfoejr_root", "intel@321", {
    host: "46.250.221.13",
    port:  3306,
    dialect: 'mysql',
    logging: databaseLogger  // This will save the database logs into a file
});
// const sequelize = new Sequelize('cp1288777p05_amco', 'cp1288777p05_admin', 'lteglpfez2', {
//     host: '91.234.194.113',
//     port: 3306,
//     dialect: 'mysql',
//     define: {
//         timestamps: false
//     },
//     logging: true // Comment it out when a problem arise with mysql
// });
// CREATE USER 'sudo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';FLUSH PRIVILEGES;


sequelize.authenticate();
module.exports = sequelize;