const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        trustServerCertificate: true 
    }
}

const connectDB = async () => {
    try {
        await sql.connect(dbConfig);
        console.log('Database connection established')
    } catch (error) {
        console.error('Error connecting to database: ', error);
    }
}

module.exports = {sql, connectDB}