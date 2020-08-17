const chalk = require("chalk");

function log(msg) {
    console.log(chalk.gray("Log ") + msg);
}

function info(msg) {
    console.log(chalk.greenBright("Info ") + msg);
}

function warning(msg) {
    console.log(chalk.keyword("orange")("Warning ") + msg);
}

function error(msg) {
    console.log(chalk.redBright("Error ") + msg);
}

module.exports = { log, info, warning, error };
