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
var yaml = require("spfa-yaml");
var ejs = require("ejs");
var marked = require("marked");
var highlight = require("highlight.js");
var frontMatter = require("front-matter");
marked.setOptions({
    highlight: function(code) {
        return highlight.highlightAuto(code).value;
    }
});

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
    var config = yaml.read(process.cwd() + "/config.yaml");
    var theme;
    try {
        theme = config.theme ? config.theme : "spfa-theme-default";
    } catch (error) {
        console.log("Detected error in config.yaml");
        console.log("Please check the configuration of config.yaml");
        console.log("Using default theme");
        theme = "spfa-theme-default";
    }

    var themePath = process.cwd() + "/theme/" + theme;
    var layout = themePath + "/layout";
    var source = themePath + "/source";
    var postdir = process.cwd() + "/post";

    files.cpdir(source, process.cwd() + "/public/lib");

    var list = files.ls(postdir, ".md");
    var dirList_ = files.ls(postdir, "");
    var dirList = [];
    for (let i = 0; i < dirList_.length; i++) {
        var dirPath = postdir + "/" + dirList_[i];
        if (files.isDirectory(dirPath)) {
            dirList.push(dirList_[i]);
        }
    }

    for (let i = 0; i < list.length; i++) {
        var item = list[i];
        var name = item.replace(".md", "");
        files.mkdir(process.cwd() + "/public/post/" + name);
        if (dirList.includes(name)) {
            files.cpdir(
                postdir + "/" + name,
                process.cwd() + "/public/post/" + name
            );
        }
        var markdown = files.read(postdir + "/" + item).toString();
        var fileInfo = frontMatter(markdown);
        markdown = fileInfo.body;
        var mdData = fileInfo.attributes;
        mdData.html = marked(markdown);
        mdData.codeTheme = "vs2015";
        try {
            ejs.renderFile(layout + "/post.ejs", mdData, function(err, data) {
                files.write(
                    process.cwd() + "/public/post/" + name + ".html",
                    data
                );
            });
        } catch (error) {
            console.log(error);
        }
    }
    var indexData = {
        title: "Welcome!",
        html: "<p>Welcome!</p>"
    };
    try {
        ejs.renderFile(layout + "/index.ejs", indexData, function(err, page) {
            files.write(process.cwd() + "/public/index.html", page);
        });
    } catch (error) {
        console.log(error);
    }
    console.log("Finished!");
}

function server() {
    if (!exist()) {
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
    console.log("cleaning /public");
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
    try {
        files.rmdir(process.cwd());
    } catch (error) {
        console.log("Removed!");
    }
    files.mkdir(process.cwd());
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
