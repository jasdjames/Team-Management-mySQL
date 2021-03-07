const { mainQuestion, department, role, employee } = require('./mainqs')
const inquirer = require('inquirer')
const mysql = require('mysql2')
require('dotenv').config();
const fs = require('fs')



const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'team_db',
    multipleStatements:true
    
});
async function init() {
    try {
        const mainQ = await inquirer.prompt(mainQuestion);
        console.log('This is the main Q', mainQ);
        if (mainQ.main === 'Add a department') {
            //    Run the function add a department - Create
            addDepartment()
        }
        else if (mainQ.main === 'Add a role') {

            addRole()
        }
        else if (mainQ.main === 'Add an employee') {

            addEmployee()

        }
        else if (mainQ.main === 'View the departments') {

            viewDepartment()

        }
        else if (mainQ.main === 'View the roles') {

            viewRole()

        }
        else if (mainQ.main === 'View the employees') {

            viewEmployee()

        }
        else if (mainQ.main === 'Update an employee role') {

            updateRole()

        }else if (mainQ.main === 'Exit') {
            console.log ('Thank you! Goodbye!')
            connection.end()
        }

    }
    catch (error) {
        console.log(error);
    }


}

async function addDepartment() {
    const nameDpt = await inquirer.prompt(department);
    console.log(nameDpt);
    const departmentQuery = 'INSERT INTO department SET ?';
    connection.query(departmentQuery, { name: nameDpt.name }, (err, res) => {
        if (err) throw err;
        console.log(res);
        init();
    })


}


 function addRole() {
    const selectDept = 'SELECT * FROM department'
    connection.query(selectDept, (err, res) => {
        if (err) throw (err)
        console.log(res);
        var deptNames = []
        for (let i = 0; i < res.length; i++) {
            deptNames.push(res[i].name)

        }
        console.log(deptNames);
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of this role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of this role?',
            },
            {
                type: 'list',
                name: 'departmentName',
                message: 'What department will this role be listed under?',
                choices: deptNames
            }
        ]).then(function (answer) {
            console.log('This is the answer', answer);

            var deptIdToSave;
            for (let i = 0; i < res.length; i++) {
                if (answer.departmentName === res[i].name) {
                    deptIdToSave = res[i].id
                }

            }

            console.log(deptIdToSave);
            const roleQuery = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
            connection.query(roleQuery, [answer.title, answer.salary, deptIdToSave], (err, res) => {
                if (err) throw err;
                console.log(res);
                init();
            })


        })
        

    })


}



async function addEmployee() {
    const viewEmQuery = 'SELECT * FROM role';
    connection.query(viewEmQuery, (err, res) => {
        if (err) throw (err)
        console.log(res);
        // Tutor assisted with how this loop works to create the array 
        var roleNames = []
        for (let i = 0; i < res.length; i++) {
            roleNames.push(res[i].title)

        }

        console.log(roleNames);
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_names',
                message: 'What is the employee\'s first name?',
            },
            {
                type: 'input',
                name: 'last_names',
                message: 'What is the employee\'s last name?',
            },
            {
                type: 'list',
                name: 'roleName',
                message: 'What role will this employee serve?',
                choices: roleNames
            }
        ]).then(function (answer) {
            console.log('This is the answer', answer);

            var roleIdToSave;
            for (let i = 0; i < res.length; i++) {
                if (answer.roleName === res[i].title) {
                    roleIdToSave = res[i].id
                }

            }

            console.log(roleIdToSave);
            const employeeQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, 1)';
            connection.query(employeeQuery, [answer.first_names, answer.last_names, roleIdToSave], (err, res) => {
                if (err) throw err;
                console.log(res);
                  init();
            })


        })


    })
  ;
}


function viewDepartment() {
    const dptTableQuery = 'Select * FROM department '
    connection.query(dptTableQuery, (err, res) => {
        if (err) throw (err);
        console.table(res);
        init();
    })

}

function viewRole() {
    const roleTableQuery = 'Select * FROM role '
    connection.query(roleTableQuery, (err, res) => {
        if (err) throw (err);
        console.table(res);
        init();
    })

}

function viewEmployee() {
    const empTableQuery = 'Select * FROM employee '
    connection.query(empTableQuery, (err, res) => {
        if (err) throw (err);
        console.table(res);
        init();
    })

}

function updateRole() {
    console.table(viewEmployee());
    const updateEmQuery = 'SELECT CONCAT(employee.first_name,"", employee.last_name), title FROM employee inner JOIN role on employee.role_id = role.id; '
    connection.query(updateEmQuery, (err, res) => {
        if (err) throw (err)

        console.table('This is res1', res[1]);
        console.table('This is RES 2', res[2]);
        var roleNames2 = []
        var empNames2 = []
        for (let i = 0; i < res.length; i++) {
            roleNames2.push(res[i].title)

        }
        for (let i = 0; i < res.length; i++) {
            empNames2.push(res[i].first_name, res[i].last_name)
            
            
        }


        console.log(roleNames2);
        console.log(empNames2);
        inquirer.prompt([
            {
                type: 'list',
                name: 'roleName',
                message: 'What role is the employee\'s new role?',
                choices: roleNames2
            },
            {
                    type: 'number',
                    name: 'askId',
                    message: 'What is the employee\'s id number?',

                },
                {
                    type: 'list',
                    name: 'askName',
                    message: 'Which employee?',
                    choices:empNames2

                }


        ]).then(function (answer) {
            console.log('This is the answer', answer);
            
            
            //     var roleIdCompare;
            //     for (let i = 0; i < res.length; i++) {
            //         if (answer.roleName2 === res[i].title){

            //         }

            //     }

            // console.log(roleIdToSave);
            //     const employeeQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, 1)';
            // connection.query(employeeQuery, [answer.first_name, answer.last_name, roleIdToSave], (err, res) => {
            //     if (err) throw err;
            // console.log(res);
            // })


        })


    })

}



init();

// module.exports = getRole;