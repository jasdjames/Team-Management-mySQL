const getRole = require('./index')

const questionMain = [
    {
        type: 'list',
        name: 'main',
        message: 'What what you like to do?',
        choices: [
            'Add a department', 'Add a role', 'Add an employee', 'View a department', 'View a role', 'View an employee',
            'Update employee role'
        ]



    },



];

const department = [
    {
        type: 'input',
        name: 'name',
        message: 'What department?',
    }
]

const role = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the role?',
    }
]

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
        type: 'input',
        name: 'role',
        message: 'What is the employee\'s role?',
        choices: [
            'Manager', 'Intern', 'Engineer', 'HR', 'Sales'
        ]

    },

{
        type: 'input',
        name: 'manager',
        message: 'Who is the employee\'s manager?',
        choices: ['Jas James', 'Robyn Douglas', 'Kristin Bird', 'Retta Williams'

        ]



    },


];

module.exports = { mainQuestion: questionMain, department: department, role: role, employee:employee }