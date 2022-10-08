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
                      'View All Professions', 
                      'View All Employees', 
                      'Add A Department', 
                      'Add A Profession', 
                      'Add An Employee', 
                      'Update An Employee Profession']
        }
    ])

    // Run a function based on what menu option was selected
    .then(answer => {
        switch (answer.menu) {

            // View all departments
            case 'View All Departments':
                showDepartments()
                break

            // View all professions
            case 'View All Professions':
                showProfessions()
                break

            // View all employees
            case 'View All Employees':
                showEmployees()
                break

            // Add a department
            case 'Add A Department':
                addDepartment()
                break

            // Add a profession
            case 'Add A Profession':
                addProfession()
                break
            
            // Add an employee
            case 'Add An Employee':
                addEmployee()
                break

            // Updated an employee profession
            case 'Update An Employee Profession':
                updateEmployee()
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

// Show all professions in the database
showProfessions = () => {

    // Header
    console.log(`
    ===================
    | ALL PROFESSIONS |
    ===================
    `)

    // SQL query to obtain data
    const sql = `SELECT profession.id AS ID, 
                        title AS Title,  
                        dept_name AS Department,
                        salary AS Salary
                 FROM profession 
                 JOIN department ON profession.department_id = department.id;`

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

    // SQL query to obtain data ====> NEED TO ADD SALARY, DEPARTMENT. AND PROFESSION TO THIS QUERY BUT THE DAMN THING WONT WORK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const sql = `SELECT e.id AS ID,
                        e.first_name AS First_Name,
                        e.last_name AS Last_Name,
                        profession.title AS Profession,
                        department.dept_name AS Department,
                        profession.salary AS Salary,
                        CONCAT(m.first_name, " ", m.last_name) AS Manager
                FROM employee e
                LEFT JOIN employee m ON e.manager_id = m.id
                LEFT JOIN profession ON e.profession_id = profession.id
                LEFT JOIN department ON profession.department_id = department.id;`

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
            validate: input => {
                if (input) {
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
            console.log(`${answer.addDept} has been added as a department!`)
            firstPrompt()
        })
    })
}

// Add a profession to the database 
addProfession = () => {

    // Header
    console.log(`
    ====================
    | ADD A PROFESSION |
    ====================
    `)

    // SQL query to obtain list of departments
    const sql = `SELECT * FROM department;`

    // Run the query using mysql
    connection.query(sql, (err, res) => {
        if (err) throw err

        // Store the list of departments into a new array
        const deptArr = res.map(({ id, dept_name }) => ({ name: dept_name, value: id }))

        // Prompts for user to answer
        inquirer.prompt([
            {
                type: 'input',
                name: 'profession',
                message: 'What is the name of the profession you would like to add?',
                validate: input => {
                    if (input) {
                        return true
                    } else {
                        console.log('Please enter the name of the profession you would like to add!')
                        return false
                    }
                }
            },
            {
                type: 'number',
                name: 'salary',
                message: 'What is the salary for this profession?',
                validate: input => {
                    if (input) {
                        return true
                    } else {
                        console.log('Please enter a valid salary for this profession!')
                        return false
                    }
                }
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department does this role belong to?',
                choices: deptArr
            }
        ])
        .then(answer => {

            // Store the answers into an array
            const answerArr = [answer.profession, answer.salary, answer.department]
            
            // SQL query to add a profession
            const sql = `INSERT INTO profession (title, salary, department_id)
                                VALUES
                                    (?, ?, ?);`
            
            // Run the query using mysql
            connection.query(sql, answerArr, (err, res) => {
                if (err) throw err
                console.log(`${answerArr[0]} has been added as a profession!`)
                firstPrompt()
            })
        })
    })
}

// Add an employee to the database
addEmployee = () => {

    // Header
    console.log(`
    ===================
    | ADD AN EMPLOYEE |
    ===================
    `)

    // SQL quesries to obtain all professions and managers
    const posSql = `SELECT id, title FROM profession;`
    const manSql = `SELECT id, first_name, last_name FROM employee;`

    // Run the first query
    connection.query(posSql, (err, res) => {
        if (err) throw err

        // Store data from first query into new array
        const posArr = res.map(({ id, title }) => ({ name: title, value: id }))

        // Run the second query
        connection.query(manSql, (err, res) => {
            if (err) throw err

            // Store data from second query into a new array
            const manArr = res.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }))

            // Prompts for user to answer
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the employees first name?',
                    validate: input => {
                        if (input) {
                            return true
                        } else {
                            console.log('Please enter the employees first name!')
                            return false
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the employees last name?',
                    validate: input => {
                        if (input) {
                            return true
                        } else {
                            console.log('Please enter the employees last name!')
                            return false
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'profession',
                    message: 'What is the employees profession?',
                    choices: posArr
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is the employees manager?',
                    choices: manArr
                }
            ])
            .then(answers => {

                // Store answers into an array
                const answerArr = [answers.firstName, answers.lastName, answers.profession, answers.manager]
                
                // SQL query to add an employee
                const sql = `INSERT INTO employee (first_name, last_name, profession_id, manager_id)
                                        VALUES
                                            (?, ?, ?, ?);`
                
                // Run the query using mysql
                connection.query(sql, answerArr, (err, res) => {
                    if (err) throw err
                    console.log(`${answerArr[0]} ${answerArr[1]} has been added as an employee!`)
                    firstPrompt()
                })
            })
        })

    })
}

// Update an employees profession in the database
updateEmployee = () => {
    
    // Header
    console.log(`
    ======================
    | UPDATE AN EMPLOYEE |
    ======================
    `)

    // SQL quesries to obtain all professions and managers
    const empSql = `SELECT * FROM employee;`
    const posSql = `SELECT * FROM profession;`

    // Run the first query
    connection.query(empSql, (err, res) => {
        if (err) throw err

        // Store data from first query into new array
        const empArr = res.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }))

        // Run the second query
        connection.query(posSql, (err, res) => {
            if (err) throw err

            // Store data from second query into a new array
            const posArr = res.map(({ id, title }) => ({ name: title, value: id }))

            // Prompts for user to answer
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Pick an employee whose profession you would like to change:',
                    choices: empArr
                },
                {
                    type: 'list',
                    name: 'profession',
                    message: 'What profession would you like to assign this employee to?',
                    choices: posArr
                }
            ])
            .then(answers => {

                // Store answers into an array
                const answerArr = [answers.profession, answers.employee]
                
                // SQL query to update an employee
                const sql = `UPDATE employee SET profession_id = ? WHERE id = ?;`

                // Run the query using mysql
                connection.query(sql, answerArr, (err, res) => {
                    if (err) throw err
                    console.log('The employees profession has been updated!')
                    firstPrompt()
                })
            })
        })
    })    
}

// File exports
module.exports = firstPrompt