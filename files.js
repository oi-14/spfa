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
module.exports.ls = function(dir, suffix) {
    var match = [];
    var files = fs.readdirSync(dir);
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
    if (module.exports.exist(fpath)) {
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
    }
};
