const inquirer = require("inquirer");
const mysql = require("mysql");
const { type } = require("os");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Godisgood!100",
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err.stack;
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

      else if (answer.prompts === "View Departments") {
        viewAllDepartments()
      }

      else if (answer.prompts === "View Employees") {
        viewEmployees()
      }

      else if (answer.prompts === "View Roles") {
        viewRoles()
      }
      
      else if (answer.prompts === "Update Employee Roles") {
        updateRoles()
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
          if (err) throw err.stack;
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
          if (err) throw err.stack;
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
        if (err) throw err.stack;
        start()
      }
    );
  })
};

function viewAllDepartments() {
  console.log("Viewing all Departments");
  connection.query("SELECT * FROM department", function (err, res) {
      if (err) throw err.stack;
      console.table(res);
      start();
  });
}

function viewEmployees() {
  console.log("Viewing Employees");
  connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err.stack;
      console.table(res);
      start();
  });
}

function viewRoles() {
  console.log("Viewing Roles");
  connection.query("SELECT * FROM role", function (err, res) {
      if (err) throw err.stack;
      console.table(res);
      start();
  });
}



// function updateRoles() {
//   connection.query("SELECT * FROM role", function(err,res){
//     console.table(res)
//     inquirer.prompt({
//       name: "roleTitle",
//       type: "rawlist",
//       choices: function(value){
//         var rolesArray = [];
//         for(var i=0; i<res.length; i++){
//           rolesArray.push(res[i].title)
//         }
//         return rolesArray;
//       },
//       message: "Which role would you like to update?"
//     })
//     .then(function(answer){
//       for(var i=0; i<res.length; i++) {
//         if(res[i].title == answer.choices){
//           var chosenRole = res[i];
        
//           console.log(chosenRole);
//           inquirer.prompt({
//             name: "role",
//             type: "input",
//             message: "What would you like to rename this role?"
//           })
//           .then(function(answer){
//             if(chosenRole.title = answer.choices){
//               connection.query("UPDATE role SET ? WHERE ?",
//               [
//                 {
//                   title: answer.role
//                 },
//                 {
//                   id: chosenRole.id
//                 }
            
//               ],
//               function(err,res){
//                 console.log("Role updated succesfully!");
//               }
//               )
//             }
//           })
//         }
//       }


    })
  })
}