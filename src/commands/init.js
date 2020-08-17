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

// The init module of spfa
// Initialize a directory for spfa

const spawn = require("cross-spawn");
const check = require("../utils/check");
const logger = require("../utils/logger");
function init() {
    check(process.cwd())
        .then(function (path) {
            if (!path) {
                const git = spawn.sync(
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
            } else {
                logger.error("Already exist");
            }
        })
        .catch(function (err) {
            logger.error(err);
            process.exit(0);
        });
}
module.exports = init;
