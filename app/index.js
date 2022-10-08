// Dependencies
const inquirer = require('inquirer')
const cTable = require('console.table')

// Modular code
const connection = require('../config/connection')

// First prompt
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

            // View all employees
            case 'View All Employees':
                showEmployees()
                break

            // Add a department
            case 'Add A Department':
                addDepartment()
                break

            // Add a position
            case 'Add A Position':
                addPosition()
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
                 dept_name AS Department,
                 salary AS Salary
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

// Show all employees in the database
showEmployees = () => {

    // Header
    console.log(`
    =================
    | ALL EMPLOYEES |
    =================
    `)

    // SQL query to obtain data ====> NEED TO ADD SALARY, DEPARTMENT. AND POSITION TO THIS QUERY BUT THE DAMN THING WONT WORK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const sql = `SELECT e.id AS ID,
                 e.first_name AS First_Name,
                 e.last_name AS Last_Name,
                 position.title AS Position,
                 department.dept_name AS Department,
                 position.salary AS Salary,
                 CONCAT(m.first_name, " ", m.last_name) AS Manager
                 FROM employee e
                 LEFT JOIN employee m
                 ON e.manager_id = m.id
                 LEFT JOIN position 
                 ON e.position_id = position.id
                 LEFT JOIN department
                 ON position.department_id = department.id;`

    // Run the query using mysql
    connection.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        firstPrompt()
    })
}

// Add a department to the database
addDepartment = () => {
   
    // Header
    console.log(`
    ====================
    | ADD A DEPARTMENT |
    ====================
    `)

    // Prompt for user to answer
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'What is the name of the new department?',
            validate: addDept => {
                if (addDept) {
                    return true
                } else {
                    console.log('Please enter the name of the department!')
                    return false
                }
            }
        }
    ])

    // Use the answer to add a department
    .then(answer => {

        // SQL query to add a department
        const sql = `INSERT INTO department (dept_name)
                     VALUES 
                        (?);`
        
        // Run the query using mysql
        connection.query(sql, answer.addDept, (err, res) => {
            if (err) throw err
            console.table(`${answer.addDept} has been added as a department!`)
            firstPrompt()
        })
    })
}

// Add a position to the database ====> STILL NEED TO FIX THIS FUNCTION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
addPosition = () => {

    // Header
    console.log(`
    ==================
    | ADD A POSITION |
    ==================
    `)

    // SQL query to obtain list of departments
    const sql = `SELECT * FROM department;`

    // Run the query using mysql
    connection.query(sql, (err, res) => {
        if (err) throw err

        // Store the list of departments into a new array
        const dept = res.map(({ id, dept_name }) => ({ name: dept_name, value: id }))

        // Prompts for user to answer
        inquirer.prompt([
            {
                type: 'input',
                name: 'addPos',
                message: 'What is the name of the position you would like to add?',
                validate: addPos => {
                    if (addPos) {
                        return true
                    } else {
                        console.log('Please enter the name of the position you would like to add!')
                        return false
                    }
                }
            },
            {
                type: 'number',
                name: 'addSalary',
                message: 'What is the salary for this position?',
                validate: addSalary => {
                    if (addSalary) {
                        return true
                    } else {
                        console.log('Please enter a valid salary for this position!')
                        return false
                    }
                }
            },
            {
                type: 'list',
                name: 'addDept',
                message: 'What department does this role belong to?',
                choices: dept
            }
        ])
        .then(answer => {

            // Store the answers into an array
            const answerArr = [answer.addPos, answer.addSalary, answer.addDept]

            // SQL query to add a position
            const posSql = `INSERT INTO position (title, salary, department_id)
                             VALUES
                                (?, ?, ?);`

            // Run the query using mysql
            connection.query(posSql, answerArr, (err, res) => {
                if (err) throw err
                console.log(`${answer.addPos} has been added as a position!`)
                firstPrompt()
            })
        })
    })
}

// File exports
module.exports = firstPrompt