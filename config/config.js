require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_SERVER,
    dialect: 'mssql', // Set the correct dialect
    options: {
      trustServerCertificate: true,
      port: 1433 // Ensure the correct port
    }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    options: {
      trustServerCertificate: true,
      port: 1433
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    options: {
      trustServerCertificate: true,
      port: 1433
    }
  }
};

