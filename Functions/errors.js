const chalk = require("chalk");
const fs = require("fs");

const time = () => (`${chalk.grey(new Date().toLocaleString('en-AU', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: "Australia/Brisbane",
    hour12: true
}))}`);

module.exports = async (client, error, sendable, interaction) => {
    let incidentID = Math.random().toString(36).substr(2);
    if (error !== null && sendable === true && interaction !== null) {
        fs.appendFileSync(`./Logs/errors.log`, `Date: ${new Date().toLocaleDateString()}\nTime: ${time()} (Australia/Brisbane Timezone)\nIncident: ${incidentID}\n${error}\n`);
        incidentID++;
    } else {
        if (error !== null && interaction !== null) {
            fs.appendFileSync(`./Logs/errors.log`, `Date: ${new Date().toLocaleDateString()}\nTime: ${time()} (Australia/Brisbane Timezone)\nIncident: ${incidentID}\n${error}\n`);
            incidentID++;
        }
    }
}