// Dependencies
const express = require('express')

// Modular code
const index = require('./app/index')

// Format express
const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Server ignition
app.listen(PORT, () => {
    console.log(`You are currently tuned into port ${PORT}`)
    index()
})