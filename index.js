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

var express = require("express");
var files = require("spfa-files");
var generator = require("spfa-generator");

var version = "0.2.4";
var argv = process.argv;

function exist() {
    return files.exist(process.cwd() + "/SPFA.tag");
}

function usage() {
    console.log("Usage: spfa [command]");
    console.log("spfa init : initialize spfa");
    console.log("spfa generate : generate files");
    console.log("spfa server : start server");
    console.log("spfa clean : clean cache");
}

function generate() {
    if (!exist()) {
        console.log("Please init first.");
        return;
    }

    generator.generate(
        process.cwd() + "/post",
        process.cwd() + "/public",
        process.cwd() + "/theme",
        process.cwd() + "/config.yaml"
    );

    console.log("Finished!");
}

function server() {
    if (!exist()) {
        console.log("Please init first.");
        return;
    }
    var app = express();
    app.use(express.static(process.cwd() + "/public"));
    var server = app.listen(3000);
    console.log("Server is running on http://localhost:3000/");
    console.log("Press ^C to stop.");
    process.on("SIGINT", function() {
        console.log("Bye!");
        server.close();
        process.exit();
    });
}

function init() {
    if (exist()) {
        console.log("Repository already exsist!");
        return;
    }
    files.write(process.cwd() + "/SPFA.tag", "SPFA v" + version, "utf8");
    try {
        files.cpdir(__dirname + "/config", process.cwd());
    } catch (error) {
        console.log(error);
    }

    files.mkdir(process.cwd() + "/public");
    files.mkdir(process.cwd() + "/public/post");
    files.mkdir(process.cwd() + "/public/lib");
    files.mkdir(process.cwd() + "/theme");
    files.mkdir(process.cwd() + "/post");
    console.log("Finished!");
}

function clean() {
    if (!exist()) {
        console.log("Please init first.");
        return;
    }
    files.rmdir(process.cwd() + "/public");

    files.mkdir(process.cwd() + "/public");
    files.mkdir(process.cwd() + "/public/post");
    files.mkdir(process.cwd() + "/public/lib");
    console.log("Finished!");
}

function remove() {
    if (!exist()) {
        console.log("Please init first.");
        return;
    }

    console.log("Removing ...");
    files.rm(process.cwd() + "/SPFA.tag");
    console.log("Finished!");
}

if (argv.length <= 2) {
    usage();
    exit(0);
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
} else if (argv[2] === "rm" || argv[2] === "remove") {
    remove();
}
