// Dependencies
const inquirer = require('inquirer')
const mysql = require('mysql2')
const cTable = require('console.table')

// Modular code
const connection = require('../config/connection')

// Test
const firstPrompt = () => {

    // Welcome
    console.log(`
    ====================
    |    WELCOME TO    |
    | EMPLOYEE TRACKER |
    ====================
    `)

    // Prompt for user to answer
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View All Departments', 
                      'View All Roles', 
                      'View All Employees', 
                      'Add A Department', 
                      'Add A Role', 
                      'Add An Employee', 
                      'Updated An Employee Role']
        }
    ])

    // Run a function based on what menu option was selected
    .then(answer => {
        switch (answer.menu) {

            // View all departments
            case "View All Departments":
                showDepartments()
                break
        }
    })
}

// Show all departments in the database
showDepartments = () => {

    // Header
    console.log(`
    ===================
    | ALL DEPARTMENTS |
    ===================
    `)

    // SQL query to obtain data
    const sql = `SELECT * FROM department;`

    connection.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        firstPrompt()
    })
}

// File exports
module.exports = firstPrompt