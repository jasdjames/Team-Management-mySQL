const mainQuestion = require('./mainqs')
const inquirer = require('inquirer')

async function init() {
    try {
        const mainQ= await inquirer.prompt(mainQuestion);
       console.log('This is the main Q', mainQ);
       if(mainQ.main === '')

    
      

    }
    // }
    catch (error) {
        console.log(error);
    }


} 

// Add a role func

init();