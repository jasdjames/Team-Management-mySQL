const {mainQuestion, department,role, employee} = require('./mainqs')
const inquirer = require('inquirer')
const mysql = require('mysql2')
require('dotenv').config();


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'team_db',
});
async function init() {
    try {
    const mainQ= await inquirer.prompt(mainQuestion);
       console.log('This is the main Q', mainQ);
       if(mainQ.main === 'Add a department'){
        //    Run the function add a department - Create
        addDepartment()
       }
       else if(mainQ.main === 'Add a role'){
        
        addRole()
       }
       else if(mainQ.main === 'Add an employee'){
        
        addEmployee()

    }
    else if(mainQ.main === 'View the departments'){
        
        viewDepartment()

    }
    else if(mainQ.main === 'View the roles'){
        
        viewRole()

    }
    else if(mainQ.main === 'View the employees'){
        
        viewEmployee()

    }
    // else if(mainQ.main === 'Update an employee role'){
        
    //     updateEmployee()

    // }

    }
    catch (error) {
        console.log(error);
    }


} 

async function addDepartment() {
    const nameDpt = await inquirer.prompt(department);
console.log(nameDpt);
const departmentQuery = 'INSERT INTO department SET ?';
connection.query(departmentQuery, {name:nameDpt.name}, (err, res) => {
    if (err) throw err;
 console.log(res);
})

}

async function addRole() {
    const nameRole = await inquirer.prompt(role);
console.log(nameRole);
const roleQuery = 'INSERT INTO role SET ?';
connection.query(roleQuery, {title:nameRole.title}, (err, res) => {
    if (err) throw err;
 console.log(res);
})

}
//  TODO: Pause 
// async function getRole() {
//     const getRoleQuery= 'SELECT title FROM role;'
//     connection.query(getRoleQuery,(err, res) => {
//         if (err) throw err;
//      console.log(res);
//     })
// }


async function addEmployee() {
    const employeeInfo = await inquirer.prompt(employee);
console.log(employeeInfo);
const employQuery = 'INSERT INTO employee (first_name,last_name) VALUES (?,?)';
connection.query(employQuery, [employeeInfo.first_name,employeeInfo.last_name], (err, res) => {
//    if ()
    if (err) throw (err);
 console.table(res);
})

}

function viewDepartment() {
    const dptTableQuery = 'Select * FROM department '
    connection.query(dptTableQuery, (err,res) => {
        if (err) throw (err);
        console.table(res);
    })

}

function viewDepartment() {
    const dptTableQuery = 'Select * FROM department '
    connection.query(dptTableQuery, (err,res) => {
        if (err) throw (err);
        console.table(res);
    })

}

function viewRole() {
    const roleTableQuery = 'Select * FROM role '
    connection.query(roleTableQuery, (err,res) => {
        if (err) throw (err);
        console.table(res);
    })

}

function viewEmployee() {
    const empTableQuery = 'Select * FROM employee '
    connection.query(empTableQuery, (err,res) => {
        if (err) throw (err);
        console.table(res);
    })

}


init();

// module.exports = getRole