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

const { join, dirname } = require("path");
const { exists } = require("./files");

// Todo: Get a better name

async function getPath(path) {
    const pkgPath = join(path, "config.json");
    if (!(await exists(pkgPath))) {
        const parent = dirname(path);
        if (parent === path) {
            return false;
        }
        return await getPath(parent);
    }
    return path;
}

module.exports = getPath;
