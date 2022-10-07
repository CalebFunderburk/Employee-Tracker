// Dependencies
const inquirer = require('inquirer')
const mysql = require('mysql2')

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
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Updated An Employee Role']
        }
    ])
}

// File exports
module.exports = firstPrompt