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
    })
    // const deptArr = []
    // const departmentIdQuery = 'SELECT * FROM department'
    // connection.query(departmentIdQuery,(err,res) => {
    // if (err) throw (err);
    // deptArr.push(res)
    // console.log ('This is your department',deptArr)
    // // Could also write to fs .sql file?

    // })

}

// Department ID - in params  - Get Department array - pass to user to select - Function to get roles 
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
            })


        })



    })
    //     const roleQuery = 'INSERT INTO role SET ?';
    // connection.query(roleQuery, {title:nameRole.title}, (err, res) => {
    //     if (err) throw err;
    // console.log(res);
    // })

    //     const nameRole = await inquirer.prompt(role);
    // console.log(nameRole);
    // const roleQuery = 'INSERT INTO role SET ?';
    // connection.query(roleQuery, {title:nameRole.title}, (err, res) => {
    //     if (err) throw err;
    //  console.log(res);

    // //  What is the name of the role and salary 
    // })

}

// function getRole() {
//     const getRoleQuery = 'SELECT title FROM role '
//     connection.query(getRoleQuery,(err, res) => {
//         if (err) throw (err);
//      console.log(res);
//     })
// }

// Need Role for employee
async function addEmployee() {
    const viewEmQuery = 'SELECT * FROM role';
    connection.query(viewEmQuery, (err, res) => {
        if (err) throw (err)
        console.log(res);
        var roleNames = []
        for (let i = 0; i < res.length; i++) {
            roleNames.push(res[i].title)

        }

        console.log(roleNames);
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the employee\'s first name?',
            },
            {
                type: 'input',
                name: 'last_name',
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
            connection.query(employeeQuery, [answer.first_name, answer.last_name, roleIdToSave], (err, res) => {
                if (err) throw err;
                console.log(res);
            })


        })


    })

}





// )











//     const employeeInfo = await inquirer.prompt(employee);
// console.log(employeeInfo);
// const employQuery = 'INSERT INTO employee (first_name,last_name) VALUES (?,?)';
// connection.query(employQuery, [employeeInfo.first_name,employeeInfo.last_name], (err, res) => {
// //    if ()
//     if (err) throw (err);
//  console.table(res);
// })


// }

// function viewDepartment() {
//     const dptTableQuery = 'Select * FROM department '
//     connection.query(dptTableQuery, (err,res) => {
//         if (err) throw (err);
//         console.table(res);
//     })

// }

function viewDepartment() {
    const dptTableQuery = 'Select * FROM department '
    connection.query(dptTableQuery, (err, res) => {
        if (err) throw (err);
        console.table(res);
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
    })

}

function updateRole() {
    const updateEmQuery = 'SELECT * FROM role';
    connection.query(updateEmQuery, (err, res) => {
        if (err) throw (err)
        console.log(res);
        var roleNames2 = []
        for (let i = 0; i < res.length; i++) {
            roleNames2.push(res[i].title)

        }


        console.log(roleNames2);
        console.table(viewEmployee());
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