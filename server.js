const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Godisgood!100",
    database: "employee_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start()
  });

  var start = () => {
    inquirer.prompt({
        type: "list",
        name: "choices",
        message: "Welcome to Employee Manager! What would you like to do today?",
        choices: ["Create New Department", "Create New Employee", "Create New Role",
    "View Departments", "View Employees", "View Roles", "Update Employee Roles", "Exit"]
    })
  }

  connection.end