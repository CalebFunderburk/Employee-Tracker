// Dependencies
const mysql = require('mysql2')

// Mysql connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Zubat#41',
        database: 'business_db'
    },
    console.log('Successfully connected to the database')
)

// File exports
module.exports = db