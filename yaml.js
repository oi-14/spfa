var fs = require("fs");
var yaml = require("yamljs");

module.exports.read = function read(filename) {
    if (!fs.existsSync(filename)) {
        return null;
    }
    var obj = yaml.load(filename);
    return obj;
};