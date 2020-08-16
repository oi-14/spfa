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

const { join } = require("path");
const express = require("express");
const logger = require("../utils/logger");
const getPath = require("../utils/getPath");
async function server() {
    // Find the root directory of it
    let path = await getPath(process.cwd());
    if (!path) {
        logger.error("Please initialize first!");
        return;
    }
    process.chdir(path);

    // Build a server with express
    let app = express();
    app.use(express.static(join(process.cwd(), "public")));
    let server = app.listen(3000, function () {
        logger.info("Server is running on http://localhost:3000/");
        logger.info("Press ^C to stop.");
    });

    // Exit when ^C is pressed
    process.on("SIGINT", function () {
        logger.info("\nBye!");
        server.close();
        process.exit();
    });
}

module.exports = server;
