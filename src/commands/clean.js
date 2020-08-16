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

// The clean module of spfa
// Clean the cache

const { join } = require("path");
const fs = require("fs/promises");
const { rm } = require("../utils/files");
const logger = require("../utils/logger");
const getPath = require("../utils/getPath");

async function clean() {
    let path = await getPath(process.cwd());
    if (!path) {
        logger.error("Please initialize first!");
        return;
    }

    process.chdir(path);
    try {
        await rm(join(process.cwd(), "public"));
    } catch(err) {
        logger.error(err);
    }

    logger.info("Finished!");
}

// Export the function
module.exports = clean;
