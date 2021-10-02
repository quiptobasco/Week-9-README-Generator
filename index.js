const path = require('path');
const fs = require('fs');
const inq = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

// const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const dirPath = path.join(__dirname, 'assets/images');

// const confirmEmailValid = async (input) => {
//     if (!re.test(input)) {
//         return 'Invalid format.  Try again.';
//     }
//     return true;
// }

// TODO: Create an array of questions for user input
const questions = [{
    type: 'input',
    message: 'Enter the TITLE of the project.',
    name: 'Title',
},
{
    type: 'input',
    message: 'Enter the DESCRIPTION of the project.',
    name: 'Description',
},
{
    type: 'input',
    message: 'Enter the INSTALLATION INSTRUCTIONS for the project.',
    name: 'Installation',
},
{
    type: 'input',
    message: 'Enter the USAGE INFORMATION for the project.',
    name: 'Usage',
},
{
    type: 'input',
    message: 'Enter the CONTRIBUTION GUIDELINES for the project.',
    name: 'Contributions',
},
{
    type: 'input',
    message: 'Enter the TEST INSTRUCTIONS of the project.',
    name: 'Tests',
},
{
    type: 'list',
    message: 'Select the appropriate license for this project: ',
    choices: [
        "AGPL-3.0",
        "Apache-2.0", 
        "BSD-2-Clause", 
        "BSD-3-Clause", 
        "BSL-1.0", 
        "CC0-1.0", 
        "EPL-2.0", 
        "GPL-2.0",
        "GPL-3.0", 
        "LGPL-2.1", 
        "MIT", 
        "MPL-2.0", 
        "Unlicense",
        "None",
    ],
    name: 'License',   
},
{
    type: 'input',
    message: 'Enter your GITHUB USERNAME.',
    name: 'Username',
},
{
    type: 'input',
    message: 'Enter your EMAIL ADDRESS.',
    name: 'Email',
    // validate: confirmEmailValid
},
];

const promptUser = async () => {
    return await inq.prompt(questions);
};

// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {
    return fs.writeFileSync(fileName, data)       
};

function addScreenshots() {
    files = fs.readdirSync(dirPath);
    let filesArray = [];
    if (files) {
        files.forEach(function (file) {
            filesArray.push(file);
        });
        return filesArray;
    }
};

// TODO: Create a function to initialize app
const init = () => {
    let screenshots = addScreenshots();
    if (screenshots.length > 0) {
        const screenshotsQuestion = {
            type: 'checkbox',
            message: 'Select which screenshots you would like to add to the README.',
            choices: screenshots,
            name: 'Screenshots',
        }
        questions.push(screenshotsQuestion);
    }
    promptUser()
    .then((answers) => writeToFile('README.md', generateMarkdown(answers)))
    .then(() => console.log('Successfully wrote to README.md'))
    .catch((err) => console.error('OH NO THERE WAS AN ERROR!!!' + err));
};

// Function call to initialize app
init();