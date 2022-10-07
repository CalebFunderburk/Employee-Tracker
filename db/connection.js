// Dependencies
const mysql = require('mysql2')
require('dotenv').config()

// Mysql connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'business_db'
    },
    console.log('Successfully connected to the database')
)

// File exports
module.exports = db