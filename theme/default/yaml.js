var fs = require("fs");
var yaml = require("yamljs");

module.exports.read = function read(filename) {
    var obj = {};
    if (!fs.existsSync(filename)) {
        console.log("file do not exist!");
        return obj;
    }
    obj = yaml.load(filename);
    return obj;
};