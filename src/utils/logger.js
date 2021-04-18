const chalk = require("chalk");

class Logger {
    constructor(options) {
        this.options = options;
    }

    log(msg) {
        console.log(chalk.gray("Log ") + msg);
    }

    info(msg) {
        console.log(chalk.greenBright("Info ") + msg);
    }

    warning(msg) {
        console.log(chalk.keyword("orange")("Warning ") + msg);
    }

    error(msg) {
        if (msg instanceof Error) {
            console.log(chalk.redBright("Error ") + msg.stack);
            return;
        }
        console.log(chalk.redBright("Error ") + msg);
    }

    start() {
        this.info("Process started.");
    }

    finish() {
        this.info("Finished!");
    }
}

function loggerFactory(options){
    return new Logger(options);
}

module.exports = loggerFactory;
