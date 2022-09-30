// Dependencies
const express = require('express')
const inquirer = require('inquirer')

// Modular code
const db = require('./db/connection')

// Format express
const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Server ignition
app.listen(PORT, () => {
    console.log(`You are currently tuned into port ${PORT}`)
})
