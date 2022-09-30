const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Zubat#41',
        database: 'election'
    },
    console.log('Successfully connected to the database')
)

module.exports = db