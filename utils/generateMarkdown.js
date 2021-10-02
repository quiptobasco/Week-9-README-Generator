// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
    if (!license || license == "None") {
        return '';
    } else {
        return '![Badge](https://img.shields.io/badge/License-' + license.replace(/-/g, '%20') + '-orange)';
    }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
    if (!license || license == "None") {
        return '';
    } else {
        return 'https://choosealicense.com/licenses/' + license.toLowerCase() + '/';
    }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
    if (!license || license == "None") {
        return '';
    } else {
        return `## License 
Licensed under the [` + license + `](` + renderLicenseLink(license) + `) license.` 
    }
}

function renderScreenshot(screenshot) {
    if (!screenshot || screenshot.length <= 0) {
        return '';
    } else {
    let screenshotArray = [];
    screenshot.forEach(file => screenshotArray.push('![screenshot](assets/images/' + file + '/)'));
    return `## Screenshots` + '\n' + screenshotArray.join('\n');
    }
}

function unpackTOC(data) {
    delete data['Title'];
    delete data['Username'];
    delete data['Email'];
    let tocArray = [];
    Object.keys(data).forEach(key => tocArray.push('- [' + key + '](#' + key.toLowerCase() + ')'));
    return tocArray.join('\n');
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
        return `# ${data.Title}

${renderLicenseBadge(data.License)}

## Table of Contents
${unpackTOC(data)}

## Description
${data.Description}

## Installation
${data.Installation}

## Usage
${data.Usage}

${renderScreenshot(data.Screenshots)}

## Credits
${data.Contribution}

${renderLicenseSection(data.License)}

## Questions
Any questions?
* [GitHub](https://github.com/${data.Username})
* [${data.Email}](mailto:${data.Email})

## Tests
${data.Tests}
`;
} 

module.exports = generateMarkdown;