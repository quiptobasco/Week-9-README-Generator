const path = require('path');
const fs = require('fs');
const inq = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const axios = require('axios');

const dirPath = path.join(__dirname, 'assets/images');

const licensesArray = [];
const URL = 'https://api.github.com/licenses';
const noneObj = {key: "None", name: "None", spdx_id: "None", url: "None", node_id: "None"};

function generateLicenses() {
    axios.get(URL)
    .then(function (response) {
        response.data.forEach((license) => {
            licensesArray.push(license);
        });
        licensesArray.push(noneObj);
        return licensesArray;
    })
    .catch(function (error) {
        console.log('There was an error with the API call: ' + error);
    });
}

// function getLicenseText(array) {
//     for (let value of Object.values(array)) {
//         if (value.name == license && value.name !== 'None') {
//     axios.get(URL)
//     .then(function () {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.log('There was an error with the API call: ' + error);
//     });
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
    choices: licensesArray,
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
    generateLicenses();
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
    .then((answers) => writeToFile('README.md', generateMarkdown(answers, licensesArray)))
    .then(() => console.log('Successfully wrote to README.md'))
    .catch((err) => console.error('OH NO THERE WAS AN ERROR!!!' + err));

    // console.log(answers.License);
};

// Function call to initialize app
init();