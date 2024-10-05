const { Sequelize } = require('sequelize');
const config = require('./config');

// Initialize Sequelize with the correct environment (development, production, test)
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    dialectOptions: {
      options: {
        trustServerCertificate: config.development.options.trustServerCertificate,
      },
    },
    port: config.development.options.port,
  }
);

module.exports = sequelize;
