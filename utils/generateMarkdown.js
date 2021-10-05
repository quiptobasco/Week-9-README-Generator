const axios = require('axios');
const fs = require('fs');

var licenseSection = '';
var id = '';

function getLicenseText(license, array) {
        for (let value of Object.values(array)) {
            if (value.name == license && value.name !== 'None') {
                console.log(value);
                axios.get(value.url)
                .then(function (response) {
                    fs.writeFileSync('LICENSE.txt', response.data.body);
                })
                .catch(function (error) {
                    console.log('There was an error with the API call: ' + error);
                });
            }
        }
}
// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge() {
    if (!id || id == "None") {
        return '';
    } else {
        return `![Badge](https://img.shields.io/badge/License-${id.replace(/-/g, '%20')}-orange)`;
    }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string

function generateLinks(license, array) {
    if (license == 'None') {
        return;
    }
    for (let value of Object.values(array)) {
        if (value.name == license && value.name !== 'None') {
            console.log(value)
            id = value.spdx_id;
            licenseSection = `## License 
Licensed under the [${license}](https://choosealicense.com/licenses/${value.key}/) license.`;
        }
    }
}

function renderScreenshot(screenshot) {
    if (!screenshot || screenshot.length <= 0) {
        return '';
    } else {
    let screenshotArray = [];
    screenshot.forEach(file => screenshotArray.push(`![screenshot](./assets/images/${file})`));
    return `## Screenshots` + '\n' + screenshotArray.join('\n');
    }
}

function unpackTOC(data) {
    let tocArray = [];
    const allowed = ['Description', 'Installation', 'Usage', 'License', 'Contributions', 'Test'];
    const filtered = Object.keys(data)
                    .filter(key => allowed.includes(key))
                    .reduce((obj, key) => {
                        obj[key] = data[key];
                    return obj;
                    }, {});

    Object.entries(filtered).forEach(([key, value]) => {
        tocArray.push(`- [${key}](#${key.toLowerCase()})`);
    });
    return tocArray.join('\n');
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data, array) {
    getLicenseText(data.License, array);
    generateLinks(data.License, array);
        return `# ${data.Title}

${renderLicenseBadge()}

## Table of Contents
${unpackTOC(data)}

## Description
${data.Description}

${renderScreenshot(data.Screenshots)}

## Installation
${data.Installation}

## Usage
${data.Usage}

${licenseSection}

## Questions
Any questions?
* [GitHub](https://github.com/${data.Username})
* [${data.Email}](mailto:${data.Email})

## Contributions
${data.Contributions}

## Tests
${data.Tests}
`;
} 

module.exports = generateMarkdown;