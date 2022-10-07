// Dependencies
const inquirer = require('inquirer')
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
                      'View All Positions', 
                      'View All Employees', 
                      'Add A Department', 
                      'Add A Position', 
                      'Add An Employee', 
                      'Updated An Employee Position']
        }
    ])

    // Run a function based on what menu option was selected
    .then(answer => {
        switch (answer.menu) {

            // View all departments
            case 'View All Departments':
                showDepartments()
                break

            // View all positions
            case 'View All Positions':
            showPositions()
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
    const sql = `SELECT department.id AS ID, 
                 dept_name AS Name 
                 FROM department;`

    // Run the query using mysql
    connection.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        firstPrompt()
    })
}

// Show all positions in the database
showPositions = () => {

    // Header
    console.log(`
    =================
    | ALL POSITIONS |
    =================
    `)

    // SQL query to obtain data
    const sql = `SELECT position.id AS ID, 
                 title AS Title, 
                 salary AS Salary, 
                 dept_name AS Department
                 FROM position 
                 JOIN department 
                 ON position.department_id = department.id;`

    // Run the query using mysql
    connection.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        firstPrompt()
    })
}

// File exports
module.exports = firstPrompt