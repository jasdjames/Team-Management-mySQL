const {mainQuestion, department,role} = require('./mainqs')
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
        //    Run the function add a department - Create
        addRole()
       }
       else if(mainQ.main === 'Add an employee'){
        //    Run the function add a department - Create
        addEmployee()

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

async function getRole() {
    const roleArr = []
    const getRoleQuery= 'SELECT title FROM role;'
    connection.query(getRoleQuery,title, (err, res) => {
        roleArr.push(res)
        if (err) throw err;
     console.log(res);
    })
}


async function addEmployee() {
    const nameRole = await inquirer.prompt(employee);
console.log(nameRole);
const roleQuery = 'INSERT INTO role SET ?';
connection.query(roleQuery, {title:nameRole.title}, (err, res) => {
    if (err) throw err;
 console.log(res);
})

}

init();

module.exports = getRole