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

var connect = require("connect");
var serveStatic = require("serve-static");
var files = require("spfa-files");
var yaml = require("./yaml");

var version = "0.1.8";
var argv = process.argv;

function usage() {
    console.log("Usage: spfa [command]");
    console.log("spfa init : initialize spfa");
    console.log("spfa generate : generate files");
    console.log("spfa server : start server");
    console.log("spfa clean : clean cache");
}

function generate() {
    if (!files.exist(process.cwd() + "/SPFA.tag")) {
        console.log("Please init first.");
        return;
    }
    var config = yaml.read(process.cwd() + "/config.yaml");
    console.log(config);
    var theme;
    try {
        theme = config.theme ? config.theme : "spfa-theme-default";
    } catch (error) {
        console.log("Detected error in config.yaml");
        console.log("Please check the configuration of config.yaml");
        console.log("Using default theme");
        theme = "spfa-theme-default";
    }
    var theme_gen;
    try {
        theme_gen = require(process.cwd() + "/node_modules/" + theme);
    } catch (error) {
        console.log("Theme doesn't exist or not installed !");
        return;
    }
    try {
        theme_gen.gen(process.cwd());
    } catch (error) {
        console.log(error);
        console.log("Invalid theme!");
        return;
    }
    console.log("Finished!");
}

function server() {
    if (!files.exist(process.cwd() + "/SPFA.tag")) {
        console.log("Please init first.");
        return;
    }
    var app = connect();
    app.use("/", serveStatic(process.cwd() + "/public"));
    var server = app.listen(3000);
    server.on();
    console.log("Server is running on http://localhost:3000/");
    console.log("Press ^C to stop.");
    process.on("SIGINT", function() {
        console.log("Bye!");
        server.off();
        process.exit();
    });
}

function init() {
    if (files.exist(process.cwd() + "/SPFA.tag")) {
        console.log("Repository already exsist!");
        return;
    }
    files.write(process.cwd() + "/SPFA.tag", "SPFA v" + version, "utf8");
    try {
        files.cpdir(__dirname + "/config", process.cwd());
    } catch (error) {
        console.error(error.toString());
    }

    files.mkdir(process.cwd() + "/public");
    files.mkdir(process.cwd() + "/public/post");
    files.mkdir(process.cwd() + "/public/lib");
    files.mkdir(process.cwd() + "/theme");
    files.mkdir(process.cwd() + "/lib");
    files.mkdir(process.cwd() + "/post");
    console.log("finished!");
    console.log("Please run 'npm install' to install requirements");
}

function clean() {
    files.rmdir(process.cwd() + "/public");
    console.log("cleaning /public");
    files.mkdir(process.cwd() + "/public");
    files.mkdir(process.cwd() + "/public/post");
    files.mkdir(process.cwd() + "/public/lib");
    console.log("finished!");
}

function remove() {
    if (!files.exist(process.cwd() + "/SPFA.tag")) {
        console.log("Please init first.");
        return;
    }
    console.log("removing / ...");
    try {
        files.rmdir(process.cwd());
        files.mkdir(process.cwd());
    } catch (error) {
        console.log("removed!");
    }
    console.log("finished!");
}

if (argv.length <= 2) {
    usage();
    return;
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