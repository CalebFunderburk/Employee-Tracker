# Employee Tracker

## About this App

### Description

Employee Tracker is a command line application that uses MySQL to orchestrate an organized database for businesses to use as a way to keep records of their employees, professions, and more.

### User Story

As a business owner looking for a waty to keep track of employee records, I would like an application that allows me to store information regarding the different employees and positions there are in my business. When I run the application, I am presented with a series of prompts that ask me for information regarding my business. After entering information about an employee or position, the newly created record is then stored in my database.

### Features

* The database uses relational data to allow cross referencing between different tables for easier usage.
* All records in the database can be edited and deleted as needed.

## Installation

In order to run this program you will need to:

* Clone this repository to receive all the files.

## Requirements

- Code editor (Visual Studio Code is recommended)
- Command line terminal (GitBash, PowerShell, Terminal, etc.)
- Most recent version of Node.JS
- Most recent version on MySQL
- Node packages used in the project
- Clone the Employee Tracker project file onto your machine

## How to use

After gathering the necessary tools mentioned above, open the Employee Tracker project folder in your code editor. At this time, open your command line and navigate to the root directory for Employee Tracker. You will first want to run the following code in your command line, and sign into MySQL when prompted to do so: mysql -u (your mysql username) -p. After you have signed in, run the following code in order to create and populate the database: source db/schema.sql. Once you have finished signing into MySQL and populating the database, run the following command in a seperate command line window in order to start the app: npm start. This command will initate the server and display a menu asking the user what they would like to do next. From here the user will have free will to manage the databse how they would like.
<br/>
<br/>
Please refer to this video for additional help on getting started:

<a href="https://www.youtube.com/watch?v=ZFG6IDweSKU" target="_blank">Demonstration Video</a>

## Contributions

Caleb Funderburk
