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

var usage = require("./usage");
var generate = require("./generate");
var server = require("./server");
var init = require("./init");
var clean = require("./clean");

var argv = process.argv;
if (argv.length <= 2) {
    usage();
    process.exit(0);
}
console.log("Process started.");
if (argv[2] === "g" || argv[2] === "generate") {
    generate();
} else if (argv[2] === "s" || argv[2] === "server") {
    server();
} else if (argv[2] === "i" || argv[2] === "init") {
    init();
} else if (argv[2] === "c" || argv[2] === "clean") {
    clean();
} else {
    console.log("No such operation!!!");
    usage();
}
