const getRole = require('./index');
const deptArr = require('./index');

const questionMain = [
    {
        type: 'list',
        name: 'main',
        message: 'What what you like to do?',
        choices: [
            'Add a department', 'Add a role', 'Add an employee', 'View the departments', 'View the roles', 'View the employees',
            'Update an employee role'
        ]



    },



];

const department = [
    {
        type: 'input',
        name: 'name',
        message: 'What department?',
    }
];

// const role = [
//     {
//         type: 'input',
//         name: 'title',
//         message: 'What is the name of this role?',
//     },

//     {
//         type: 'list',
//         name: 'title',
//         message: 'What department will this role be listed under?',
//         choices: ['Sales', 'Engine']
//     }
// ];

const employee = [
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
        name: 'role',
        message: 'What is the employee\'s role?',
        choices: ['Lover', 'Fighter', 'Manager', 'HR Rep']

    },

    {
        type: 'list',
        name: 'manager',
        message: 'Who is the employee\'s manager?',
        choices: ['Jas James', 'Robyn Douglas', 'Kristin Bird', 'Retta Williams'

        ]



    },


];

module.exports = { mainQuestion: questionMain, department: department, employee: employee }