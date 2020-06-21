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
const fs = require("fs");
const usage = require("./usage");
const generate = require("./generate");
const server = require("./server");
const init = require("./init");
const clean = require("./clean");
const check = require("./check");
const version = require("./version");

// Read argument vector
var argv = process.argv;
// Show usage if the length of argv is less than 3
if (argv.length <= 2) {
    usage();
    process.exit(0);
}
var op = argv[2];

// Show message
// TODO: Use chalk to show log
console.log("Process started.");

if (op === "v" || op === "version") {
    // Show version
    version();
    process.exit(0);
} else if (op === "h" || op === "help") {
    // Show help
    usage();
    process.exit(0);
}

check(process.cwd())
    .then(function (path) {
        if (!path) {
            if (op === "i" || op === "init") {
                // Initialize
                init();
                return;
            }
            usage();
            return;
        }
        process.chdir(path);
        if (op === "g" || op === "generate") {
            // Generate
            generate();
        } else if (op === "s" || op === "server") {
            // Serve
            server();
        } else if (op === "c" || op === "clean") {
            // Clean
            clean();
        } else if (op === "i" || op === "init") {
            // Initialize
            init();
        } else {
            // ELse, show usage
            console.log("No such operation!!!");
            usage();
        }
    })
    .catch(function (err) {
        console.log(err);
        process.exit(0);
    });
