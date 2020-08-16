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
const logger = require("./utils/logger");

program.version(require("../package.json").version);
program.description("A blog generater");
program.name("spfa");

program
    .command("generate")
    .description("generate files")
    .action(require("./commands/generate"))
    .alias("g");
program
    .command("server")
    .description("start server")
    .action(require("./commands/server"))
    .alias("s");
program
    .command("init")
    .description("initialize spfa")
    .action(require("./commands/init"))
    .alias("i");
program
    .command("clean")
    .description("clean cache")
    .action(require("./commands/clean"))
    .alias("c");

logger.info("Process started.");
program.parse(process.argv);

// TODO: Write tests.