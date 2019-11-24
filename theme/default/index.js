var files = require("./files");
var md2html = require("./md2html");
var mkindex = require("./mkindex");
var yaml = require("./yaml");

module.exports.gen = function DFGenerate(path) {
    if (!files.exist(path + "/SPFA.tag")) {
        console.log("Please init first.");
        return;
    }
    var config = yaml.read(__dirname + "/config.yaml");
    var codeTheme;
    try {
        codeTheme = (config.codeTheme) ? (config.codeTheme) : "vs2015";
    } catch (error) {
        console.log("Detected error in config.yaml");
        console.log("Please check the configuration of config.yaml");
        console.log("Using default code-theme (vs2015)");
        codeTheme = "vs2015";
    }


    files.mkdir(path + "/public");
    files.mkdir(path + "/public/post");
    files.mkdir(path + "/public/lib");

    var postdir = path + "/post";
    var list = files.ls(postdir, ".md");
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var name = item.replace(".md", "");
        md2html.md2html(
            path + "/post/" + item,
            path + "/public/post/" + name + ".html",
            name, codeTheme);
    }

    mkindex.mkindex(
        path + "/public/index.html", path + "/public/post");
    console.log("generating /public/index.html");
    try {
        files.cpdir(path + "/lib", path + "/public/lib");
    } catch (error) {
        console.error(error.toString());
    }
};