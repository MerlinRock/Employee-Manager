const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Godisgood!100",
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start()
});

var start = () => {
  inquirer.prompt({
    name: "prompts",
    type: "list",
    message: "Welcome to Employee Manager! What would you like to do today?",
    choices: ["Create New Department", "Create New Employee", "Create New Role",
      "View Departments", "View Employees", "View Roles", "Update Employee Roles", "Exit"]
  })
    .then(function (answer) {
      if (answer.prompts === "Create New Department") {
        newDepartment()
      }

      else if (answer.prompts === "Create New Employee") {
        newEmployee()
      }

      else if (answer.prompts === "Create New Role") {
        newRole()
      }

      else {
        connection.end()
        console.log("Connection Ended");
        process.exit()
      }
    })
}

function newDepartment() {
  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Please enter a department name.",
    }])
    .then(function (answer) {
      connection.query("INSERT INTO department SET ?",
        {
          name: answer.name
        },
        function (err) {
          if (err) throw err;
          start()
        }
      );
    })

};

function newEmployee() {
  inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "Please enter the employee's first name.",
    },
    {
      name: "lastName",
      type: "input",
      message: "Please enter the employee's last name.",
    },
    {
      name: "roleId",
      type: "input",
      message: "Please enter the employee's role id.",
    },
    {
      name: "managerId",
      type: "input",
      message: "Please enter the employee's manager id.",
    }])
    .then(function (answer) {
      connection.query("INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId
        },
        function (err) {
          if (err) throw err;
          console.log("Your employee: " + answer.name + " has been successfully added!");
          start()
        }
      );
    })
};

function newRole() {
  inquirer.prompt([
  {
    name: "title",
    type: "input",
    message: "Please enter role title.",
  },
  {
    name: "salary",
    type: "input",
    message: "Please enter the role salary.",
  },
  {
    name: "departmentId",
    type: "input",
    message: "Please enter the role department id.",
  }])
  .then(function (answer) {
    connection.query("INSERT INTO role SET ?",
      {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.departmentId,
      },
      function (err) {
        if (err) throw err;
        start()
      }
    );
  })
};