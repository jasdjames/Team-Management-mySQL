// function updateRole() {
//     const updateEmQuery = 'SELECT * FROM role';
//     connection.query(updateEmQuery, (err, res) => {
//         if (err) throw (err)
//         console.log(res);
//         var roleNames2 = []
//         for (let i = 0; i < res.length; i++) {
//             roleNames2.push(res[i].title)

//         }


//         console.log(roleNames2);
//         console.table(viewEmployee());
       
//         async function askUpdateQ(updateQs){
//         const updateQs = await inquirer.prompt([
//             {
//                 type: 'list',
//                 name: 'roleName',
//                 message: 'What role is the employee\'s new role?',
//                 choices: roleNames2
//             },
//             {
//                     type: 'number',
//                     name: 'askId',
//                     message: 'What is the employee\'s id number?',

//                 }
         
            
            
           
//             ])
//         }

//         })

// askUpdateQ();
// console.log('This is the updateQs', updateQs)
//     }
    
    
    

