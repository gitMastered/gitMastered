const { promises: fs} = require("fs");
const readme = require("./readme");

const today = new Date();

function createNewReadme()
{
    const readmeRow = readme.split("\n");
    
    function updateIdentifier(identifier, replaceText) {
        const identifierIndex = findIdentifierIndex(readmeRow, identifier);
        if (!readmeRow[identifierIndex]) return;
        readmeRow[identifierIndex] = readmeRow[identifierIndex].replace(
        `<#${identifier}>`,
        replaceText
        );
    }
    
    const identifierToUpdate = {
        days: daysBeforeNewYear(),
        botSignature: botSignature(),
    };

    Object.entries(identifierToUpdate).forEach(([key, value]) => {
        updateIdentifier(key, value);
    });

    return readmeRow.join('\n');
}

function botSignature() {
    return `README.md Successfully updated on ${today.toDateString()} by gitMasteredBot`;
}

const msInOneDay = 1000 * 60 * 60 * 24;
function daysBeforeNewYear() {
    const nextYear = today.getFullYear() + 1;
    const nextYearDate = new Date(String(nextYear));
  
    const timeUntilNewYear = nextYearDate.getTime() - today.getTime();
    const dayUntilNewYear = Math.round(timeUntilNewYear / msInOneDay);
  
    return `${dayUntilNewYear}`;
}

const findIdentifierIndex = (rows, identifier) =>
    rows.findIndex((r) => Boolean(r.match(new RegExp(`<#${identifier}>`, 'i'))));

const updateREADMEFile = (text) => fs.writeFile('./README.md', text);

function main() {
    const newREADME = createNewReadme();
    console.log(newREADME);
    updateREADMEFile(newREADME);
}
main();