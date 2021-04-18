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

const { generate } = require("../generator/index");
const spawn = require("cross-spawn");
const { sep, join } = require("path");
const { rm } = require("../utils/files");
const express = require("express");
const logger = require("../utils/logger");
const Console = require("./console");

class Spfa {
    constructor(base = process.cwd(), args = {}) {
        this.baseDir = base + sep;
        this.log = logger();
        this.args = args;

        this.publicDir = join(base, "public") + sep;
        this.postDir = join(base, "post") + sep;
        this.themeDir = join(base, "theme") + sep;
        this.configFile = join(base, "config.json");

        this.console = new Console();
    }

    async startup() {
        // Todo: Put it in a specific place
        // Todo: Write more description
        this.console.register("generate", () => {
            this.generate();
        });
        this.console.setAlias("generate", "g");

        this.console.register("init", () => {
            this.init();
        });
        this.console.setAlias("init", "i");

        this.console.register("clean", () => {
            this.clean();
        });
        this.console.setAlias("clean", "c");

        this.console.register("serve", () => {
            this.serve();
        });
        this.console.setAlias("serve", "s");

        this.console.register("version", () => {
            this.version();
        });
        this.console.setAlias("version", "v");

        // Todo: Do it automatically
        if (this.args.hasOwnProperty("_")) {
            let c = this.args._.shift();
            if (c && this.console.get(c)) {
                await this.console.get(c)();
            }
        }
    }

    version() {
        this.log.info("Version:" + require("../package.json").version);
    }

    async generate() {
        this.log.start();

        if (!this.baseDir) {
            this.log.error("Please initialize first!");
            return;
        }

        try {
            await generate(this);
        } catch (err) {
            this.log.error(err);
        }

        this.log.finish();
    }

    async clean() {
        this.log.start();

        if (!this.baseDir) {
            this.log.error("Please initialize first!");
            return;
        }

        try {
            await rm(join(this.baseDir, "public"));
        } catch (err) {
            logger.error(err);
        }

        this.log.finish();
    }
    async init() {
        this.log.start();

        if (this.baseDir) {
            this.log.error("Already exist");
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
            this.log.error(err);
            return;
        }

        this.log.finish();
    }
    async serve() {
        this.log.start();

        // Find the root directory of it
        if (!this.baseDir) {
            this.log.error("Please initialize first!");
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
