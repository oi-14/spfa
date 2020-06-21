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

// The server module of spfa
// Serve web pages

var fs = require("fs");
var express = require("express");
function server() {
    // Build a server with express
    var app = express();
    app.use(express.static(process.cwd() + "/public"));
    var server = app.listen(3000);
    console.log("Server is running on http://localhost:3000/");
    console.log("Press ^C to stop.");
    // Exit when ^C is pressed
    process.on("SIGINT", function () {
        console.log("Bye!");
        server.close();
        process.exit();
    });
}
module.exports = server;
