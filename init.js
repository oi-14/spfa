var fs = require("fs");
var version = "0.3.2";
function init() {
    fs.exists(process.cwd() + "/SPFA.tag", function (data) {
        if (data) {
            console.log("Already exist.");
            process.exit(0);
        }

        fs.writeFile(
            process.cwd() + "/SPFA.tag",
            "SPFA v" + version,
            "utf8",
            function (err) {}
        );

        (function cpdir(from, to) {
            fs.readdir(from, function (err, paths) {
                if (err) {
                    return;
                }
                paths.forEach(function (path) {
                    var _from = from + "/" + path;
                    var _to = to + "/" + path;
                    fs.stat(_from, function (err, st) {
                        if (err) {
                            return;
                        }
                        if (st.isFile()) {
                            fs.copyFile(_from, _to, function (err) {});
                        } else if (st.isDirectory()) {
                            fs.mkdir(_to, function (err) {
                                if (err) {
                                    return;
                                }
                                cpdir(_from, _to);
                            });
                        }
                    });
                });
            });
        })(__dirname + "/config", process.cwd());

        fs.mkdir(process.cwd() + "/public", function (err) {
            fs.mkdir(process.cwd() + "/public/post", function (err) {});
            fs.mkdir(process.cwd() + "/public/lib", function (err) {});
        });

        fs.mkdir(process.cwd() + "/theme", function (err) {});
        fs.mkdir(process.cwd() + "/post", function (err) {});
    });
}
module.exports = init;
