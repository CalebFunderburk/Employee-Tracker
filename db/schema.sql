DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS position;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE position (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    position_id INTEGER,
    manager_id INTEGER,
    -- FOREIGN KEY (position_id) REFERENCES position(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (dept_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO position (title, salary, department_id)
VALUES
    ('Salesperson', 80000, 1),
    ('Sales Lead', 100000, 1),
    ('Software Engineer', 120000, 2),
    ('Lead Engineer', 160000, 2),
    ('Accountant', 125000, 3),
    ('Account Manager', 160000, 3),
    ('Lawyer', 190000, 4),
    ('Legal Team Lead', 250000, 4);

INSERT INTO employee (first_name, last_name, position_id, manager_id)
VALUES
    ('John', 'Doe', 2, null),
    ('Mike', 'Chan', 1, 1),
    ('Ashley', 'Rodriguez', 4, null),
    ('Kevin', 'Tupik', 3, 3),
    ('Kunal', 'Singh', 6, null),
    ('Malia', 'Brown', 5, 5),
    ('Sarah', 'Lourd', 8, null),
    ('Tom', 'Allen', 7, 7);
