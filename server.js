var fs = require("fs");
var express = require("express");
function server() {
    fs.exists(process.cwd() + "/SPFA.tag", function (data) {
        if (!data) {
            console.log("Please init first.");
            process.exit(0);
        }
        var app = express();
        app.use(express.static(process.cwd() + "/public"));
        var server = app.listen(3000);
        console.log("Server is running on http://localhost:3000/");
        console.log("Press ^C to stop.");
        process.on("SIGINT", function () {
            console.log("Bye!");
            server.close();
            process.exit();
        });
    });
}
module.exports = server;
