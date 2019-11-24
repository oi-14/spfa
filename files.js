var fs = require("fs");
var path = require("path");

module.exports.cp = function (from, to) {
    if (fs.existsSync(from)) {
        fs.copyFileSync(from, to, "w");
        console.log("Copying " + from + " to " + to);
    }
};

module.exports.cpdir = function (from, to) {
    var paths = fs.readdirSync(from);
    paths.forEach(function (path) {
        var _from = from + '/' + path;
        var _to = to + '/' + path;
        var st = fs.statSync(_from);
        if (st.isFile()) {
            module.exports.cp(_from, _to, "w");
            console.log("Copying " + _from + " to " + _to);
        } else if (st.isDirectory()) {
            module.exports.mkdir(_to);
            module.exports.cpdir(_from, _to);
        }
    });
};

module.exports.ls = function (dir, suffix) {
    var match = [];
    var files = fs.readdirSync(dir);
    match = files.filter(function (file) {
        return path.extname(file) === suffix;
    });

    return match;
};

module.exports.exist = function (file) {
    return fs.existsSync(file);
};

module.exports.mkdir = function (dir) {
    if (this.exist(dir)) {
        console.log("DIRECTORY already exist!");
        return;
    }
    fs.mkdirSync(dir);
};


module.exports.write = function (file, data, encoding) {
    fs.writeFileSync(file, data, encoding);
};

module.exports.read = function (file, encoding) {
    return fs.readFileSync(file, encoding);
};

module.exports.stat = function (file) {
    return fs.statSync(file);
};

module.exports.rm = function (file) {
    fs.unlinkSync(file);
};

module.exports.rmdir = function (fpath) {
    var files = [];
    if (this.exist(fpath)) {
        files = fs.readdirSync(fpath);
        files.forEach(function (file, index) {
            var curPath = fpath + "/" + file;
            if (this.stat(curPath).isDirectory()) {
                this.rmdir(curPath);
            } else {
                this.rm(curPath);
            }
        });
        fs.rmdirSync(fpath);
    }
};