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

const logger = require("../utils/logger")();
const { generate } = require("../generator/index");
const spawn = require("cross-spawn");
const { join } = require("path");
const { rm } = require("../utils/files");
const express = require("express");

class Spfa {
    constructor(baseDir, args) {
        this.baseDir = baseDir;
    }

    finish() {
        logger.info("Finished!");
    }

    async generate() {
        if (!this.baseDir) {
            logger.error("Please initialize first!");
            return;
        }

        try {
            await generate(this.baseDir);
        } catch (err) {
            logger.error(err);
        }

        this.finish();
    }

    async clean() {
        if (!this.baseDir) {
            logger.error("Please initialize first!");
            return;
        }

        try {
            await rm(join(this.baseDir, "public"));
        } catch (err) {
            logger.error(err);
        }

        this.finish();
    }
    async init() {
        if (this.baseDir) {
            logger.error("Already exist");
            return;
        }

        // Clone git repository from GitHub
        try {
            spawn.sync(
                "git",
                [
                    "clone",
                    "--recursive",
                    "https://github.com/luisleee/spfa-base.git",
                    ".",
                ],
                {
                    stdio: "inherit",
                }
            );
        } catch (err) {
            logger.error(err);
            return;
        }

        this.finish();
    }
    async serve() {
        // Find the root directory of it
        if (!this.baseDir) {
            logger.error("Please initialize first!");
            return;
        }
        // Build a server with express
        let app = express();
        app.use(express.static(join(this.baseDir, "public")));
        app.listen(3000, function () {
            logger.info("Server is running on http://localhost:3000/");
            logger.info("Press ^C to stop.");
        });
    }
}

class Post {
    constructor(info, content) {
        this.info = info;
        this.content = content;
    }
}

module.exports = Spfa;
