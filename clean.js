var fs = require("fs");
var path = require("path");
function clean() {
    fs.exists(process.cwd() + "/SPFA.tag", function (data) {
        if (!data) {
            console.log("Please init first.");
            process.exit(0);
        }

        (function rmdir(dir, callback) {
            fs.readdir(dir, (err, files) => {
                function next(index) {
                    if (index === files.length) {
                        return fs.rmdir(dir, callback);
                    }
                    let newPath = path.join(dir, files[index]);
                    fs.stat(newPath, (err, stat) => {
                        if (stat.isDirectory()) {
                            rmdir(newPath, () => next(index + 1));
                        } else {
                            fs.unlink(newPath, () => next(index + 1));
                        }
                    });
                }
                next(0);
            });
        })(process.cwd() + "/public", function () {
            fs.mkdir(process.cwd() + "/public", function (err) {
                fs.mkdir(process.cwd() + "/public/post", function (err) {});
                fs.mkdir(process.cwd() + "/public/lib", function (err) {});
            });
        });
    });
}
module.exports = clean;
