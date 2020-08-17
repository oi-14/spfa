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

// The generate module of spfa
// Generate pages

const generator = require("../generator/index");
const { join } = require("path");
const check = require("../utils/check");
const logger = require("../utils/logger");

function generate() {
    check(process.cwd())
        .then(function (path) {
            if (!path) {
                logger.error("Please initialize first!");
                return;
            }
            process.chdir(path);
            generator(
                join(process.cwd(), "post"),
                join(process.cwd(), "public"),
                join(process.cwd(), "theme"),
                join(process.cwd(), "config.json")
            );
        })
        .catch(function (err) {
            logger.error(err);
            process.exit(0);
        });
}
module.exports = generate;
