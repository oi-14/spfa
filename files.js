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

var fs = require("fs");
var path = require("path");
/*
files.js
All of the methods in this file is synced method.
*/

//Copy file
module.exports.cp = function(from, to) {
    if (fs.existsSync(from)) {
        fs.copyFileSync(from, to, "w");
    }
};

//Copy directory
module.exports.cpdir = function(from, to) {
    var paths = fs.readdirSync(from); //read directory
    paths.forEach(function(path) {
        //enumerate
        var _from = from + "/" + path;
        var _to = to + "/" + path;
        var st = fs.statSync(_from);
        if (st.isFile()) {
            //if _from is a file
            module.exports.cp(_from, _to); //copy file
        } else if (st.isDirectory()) {
            //if directory
            module.exports.mkdir(_to); //make target directory
            module.exports.cpdir(_from, _to); //recursive
        }
    });
};

//List files with extname
//PS: suffix is ".js" , not "js"
module.exports.ls = function(dir, suffix) {
    var match = [];
    var files = fs.readdirSync(dir);
    if (!suffix && suffix != "") {
        return files;
    }
    match = files.filter(function(file) {
        return path.extname(file) === suffix;
    });

    return match;
};

//Check exist
//!!!Use absolute location!!!
module.exports.exist = function(file) {
    return fs.existsSync(file);
};

//Make directory
module.exports.mkdir = function(dir) {
    if (module.exports.exist(dir)) {
        return null;
    }
    fs.mkdirSync(dir);
};

//Write file
module.exports.write = function(file, data, encoding) {
    fs.writeFileSync(file, data, encoding);
};

//Read file
//!Returns a buffer
module.exports.read = function(file, encoding) {
    return fs.readFileSync(file, encoding);
};

//Get file state
module.exports.stat = function(file) {
    return fs.statSync(file);
};

//Remove file
module.exports.rm = function(file) {
    fs.unlinkSync(file);
};

//Remove directory
module.exports.rmdir = function(fpath) {
    var files = [];

    files = fs.readdirSync(fpath);
    files.forEach(function(file, _index) {
        var curPath = fpath + "/" + file;
        if (module.exports.stat(curPath).isDirectory()) {
            module.exports.rmdir(curPath);
        } else {
            module.exports.rm(curPath);
        }
    });
    fs.rmdirSync(fpath);
};