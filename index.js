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
var usage = require("./usage");
var generate = require("./generate");
var server = require("./server");
var init = require("./init");
var clean = require("./clean");

// Read argument vector
var argv = process.argv;
// Show usage if the length of argv is less than 3
if (argv.length <= 2) {
    usage();
    process.exit(0);
}
// Show message
console.log("Process started.");
// TODO: Jump to the parent directory to find the nearest spfa directory
// TODO: Add an option to show version
if (argv[2] === "g" || argv[2] === "generate") { // Generate
    generate();
} else if (argv[2] === "s" || argv[2] === "server") { // Serve
    server();
} else if (argv[2] === "i" || argv[2] === "init") { // Initialize
    init();
} else if (argv[2] === "c" || argv[2] === "clean") { // Clean
    clean();
} else { // ELse, show usage
    console.log("No such operation!!!");
    usage();
}
