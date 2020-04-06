var generator = require("spfa-generator");
var fs = require("fs");
function generate() {
    fs.exists(process.cwd() + "/SPFA.tag", function (data) {
        if (!data) {
            console.log("Please init first.");
            process.exit(0);
        }

        generator(
            process.cwd() + "/post",
            process.cwd() + "/public",
            process.cwd() + "/theme",
            process.cwd() + "/config.json"
        );
    });
}
module.exports = generate;
