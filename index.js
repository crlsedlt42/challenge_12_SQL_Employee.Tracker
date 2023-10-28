const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'employeeTracker_db'
  },
  console.log('You are now connected to the employeeTracker_db database.')
);

db.connect(function (err) {
  if (err) throw err;
  console.log('Connected to LOCAL SERVER.');
  terminalPrompt();
});

function terminalPrompt() {
  inquirer.createPromptModule({
    name: 'selection',
    type: 'list',
    message: 'Please from the following options:',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee Role',
      'Update an Employee Manager',
      'View All Employess by Manager',
      'View All Employees by Department',
      'Delete a Department',
      'Delete a Role',
      'Delete an Employee',
      'Exit'
    ]
  }).then((answer) => {
    switch (answer.selection) {
      case 'View All Departments':
        viewAllDepartments();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case 'Update an Employee Role':
        updateEmployeeRole();
        break;
      case 'Update an Employee Manager':
        updateEmployeeManager();
        break;
      case 'View All Employees by Manager':
        viewAllEmployeesByManager();
        break;
      case 'View All Employees by Department':
        viewAllEmployeesByDepartment();
        break;
      case 'Delete a Department':
        deleteDepartment();
        break;
      case 'Delete a Role':
        deleteRole();
        break;
      case 'Delete an Employee':
        deleteEmployee();
        break;
      case 'Exit':
        db.end();
        break;
    }
  })
};

// View All Departments
function viewAllDepartments() {
  console.log('Viewing all departments...\n');
  db.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    terminalPrompt();
  })
};

// View All Roles
function viewAllRoles() {
  console.log('Viewing all roles...\n');
  db.query('SELECT * FROM role', function (err, res) {
    if (err) throw err;
    console.table(res);
    terminalPrompt();
  })
};

// View All Employees
function viewAllEmployees() {
  console.log('Viewing all employees...\n');
  db.query('SELECT * FROM employee', function (err, res) {
    if (err) throw err;
    console.table(res);
    terminalPrompt();
  })
};

// Add a Department
function addDepartment() {
  inquirer.prompt([
    {
      name: 'department',
      type: 'input',
      message: 'What is the name of the department you would like to add?'
    }
  ]).then((answer) => {
    db.query('INSERT INTO department SET ?',
      {
        name: answer.department
      },
      function (err, res) {
        if (err) throw err;
        console.log('Department added!\n');
        terminalPrompt();
      })
  })
};

// Add a Role
function addRole() {
  inquirer.prompt([
    {
      name: 'role',
      type: 'input',
      message: 'What is the name of the role you would like to add?'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the salary for this role?'
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'What is the department ID for this role?'
    }
  ]).then((answer) => {
    db.query('INSERT INTO role SET ?',
      {
        title: answer.role,
        salary: answer.salary,
        department_id: answer.department_id
      },
      function (err, res) {
        if (err) throw err;
        console.log('Role added!\n');
        terminalPrompt();
      })
  })
};

// Add an Employee
function addEmployee() {
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'What is the first name of the employee you would like to add?'
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'What is the last name of the employee you would like to add?'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'What is the role ID for this employee?'
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'What is the manager ID for this employee?'
    }
  ]).then((answer) => {
    db.query('INSERT INTO employee SET ?',
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.role_id,
        manager_id: answer.manager_id
      },
      function (err, res) {
        if (err) throw err;
        console.log('Employee added!\n');
        terminalPrompt();
      })
  })
};

// Update an Employee Role
function updateEmployeeRole() {
  inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: 'What is the ID of the employee you would like to update?'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'What is the new role ID for this employee?'
    }
  ]).then((answer) => {
    db.query('UPDATE employee SET ? WHERE ?',
      [
        {
          role_id: answer.role_id
        },
        {
          id: answer.employee_id
        }
      ],
      function (err, res) {
        if (err) throw err;
        console.log('Employee role updated!\n');
        terminalPrompt();
      })
  })
};

// Update an Employee Manager
function updateEmployeeManager() {
  inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: 'What is the ID of the employee you would like to update?'
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'What is the new manager ID for this employee?'
    }
  ]).then((answer) => {
    db.query('UPDATE employee SET ? WHERE ?',
      [
        {
          manager_id: answer.manager_id
        },
        {
          id: answer.employee_id
        }
      ],
      function (err, res) {
        if (err) throw err;
        console.log('Employee manager updated!\n');
        terminalPrompt();
      })
  })
};

// View All Employess by Manager
function viewAllEmployeesByManager() {
  inquirer.prompt([
    {
      name: 'manager_id',
      type: 'input',
      message: 'What is the ID of the manager you would like to view?'
    }
  ]).then((answer) => {
    db.query('SELECT * FROM employee WHERE ?',
      {
        manager_id: answer.manager_id
      },
      function (err, res) {
        if (err) throw err;
        console.table(res);
        terminalPrompt();
      })
  })
};

// View All Employees by Department
function viewAllEmployeesByDepartment() {
  inquirer.prompt([
    {
      name: 'department_id',
      type: 'input',
      message: 'What is the ID of the department you would like to view?'
    }
  ]).then((answer) => {
    db.query('SELECT * FROM employee WHERE ?',
      {
        department_id: answer.department_id
      },
      function (err, res) {
        if (err) throw err;
        console.table(res);
        terminalPrompt();
      })
  })
};

// Delete a Department
function deleteDepartment() {
  inquirer.prompt([
    {
      name: 'department_id',
      type: 'input',
      message: 'What is the ID of the department you would like to delete?'
    }
  ]).then((answer) => {
    db.query('DELETE FROM department WHERE ?',
      {
        id: answer.department_id
      },
      function (err, res) {
        if (err) throw err;
        console.log('Department deleted!\n');
        terminalPrompt();
      })
  })
};

// Delete a Role
function deleteRole() {
  inquirer.prompt([
    {
      name: 'role_id',
      type: 'input',
      message: 'What is the ID of the role you would like to delete?'
    }
  ]).then((answer) => {
    db.query('DELETE FROM role WHERE ?',
      {
        id: answer.role_id
      },
      function (err, res) {
        if (err) throw err;
        console.log('Role deleted!\n');
        terminalPrompt();
      })
  })
};

// Delete an Employee
function deleteEmployee() {
  inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: 'What is the ID of the employee you would like to delete?'
    }
  ]).then((answer) => {
    db.query('DELETE FROM employee WHERE ?',
      {
        id: answer.employee_id
      },
      function (err, res) {
        if (err) throw err;
        console.log('Employee deleted!\n');
        terminalPrompt();
      })
  })
};