#!/usr/bin/env node

// Copyright (C) 2020  李嘉嵘
//
// This file is a part of spfa.
//
// spfa is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// spfa is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with spfa.  If not, see <https://www.gnu.org/licenses/>.

////////////////////////////////////////////////////////////////////////

// The main file
// The entry of spfa

// Import modules
const { program } = require("commander");
const logger = require("./utils/logger")();
const getPath = require("./utils/getPath");
const Spfa = require("./spfa/index");

getPath(process.cwd()).then((baseDir) => {
    let spfa = new Spfa(baseDir, null);

    program.version(require("../package.json").version);
    program.description("A blog generater");
    program.name("spfa");

    program
        .command("generate")
        .description("generate files")
        .action(() => {
            spfa.generate();
        })
        .alias("g");
    program
        .command("serve")
        .description("start server")
        .action(() => {
            spfa.serve();
        })
        .alias("s");
    program
        .command("init")
        .description("initialize spfa")
        .action(() => {
            spfa.init();
        })
        .alias("i");
    program
        .command("clean")
        .description("clean cache")
        .action(() => {
            spfa.clean();
        })
        .alias("c");

    logger.info("Process started.");
    program.parse(process.argv);
});

// Exit when ^C is pressed
process.on("SIGINT", function () {
    logger.info("\nBye!");
    process.exit();
});

// TODO: Write tests.
