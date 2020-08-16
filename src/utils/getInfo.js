// Copyright (C) 2020  李嘉嵘
//
// This file is a part of spfa-generator.
//
// spfa-generator is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// spfa-generator is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with spfa-generator.  If not, see <https://www.gnu.org/licenses/>.

////////////////////////////////////////////////////////////////////////

// Import modules
const path = require("path");
const fs = require("fs/promises");
const frontMatter = require("front-matter");

async function getMarkdowns(dir) {
    let files = await fs.readdir(dir);
    let markdowns = files.filter((file) => {
        return path.extname(file) === ".md";
    });
    return markdowns;
}

// Remove the .md extname of the filename
function removeMdExt(fileName) {
    return path.basename(fileName, ".md");
}

async function hasADirectory(dir, subDir) {
    let fullPath = path.join(dir, subDir);
    let stat;
    try {
        stat = await fs.stat(fullPath);
    } catch (err) {
        if (err.code === "ENOENT") {
            return false;
        }
        throw err;
    }
    if (stat.isDirectory()) {
        return true;
    }
    return false;
}

async function readFileAsString(fileName) {
    let buffer = await fs.readFile(fileName);
    return buffer.toString();
}

// Read the info in markdown files in the "post" directory
// First argument: path to "post"
async function getInfo(dir) {
    let markdowns = await getMarkdowns(dir);

    markdowns = markdowns.map((markdown) => {
        return removeMdExt(markdown);
    });

    // Write info into the table
    let promises = [];
    let infoTable = {};
    markdowns.forEach((name) => {
        let promise = (async function () {
            infoTable[name] = {};
            infoTable[name].hasDirectory = await hasADirectory(dir, name);
            let fullName = path.join(dir, name + ".md");
            let str = await readFileAsString(fullName);
            let FM = frontMatter(str);
            infoTable[name].frontMatter = FM.attributes;
            infoTable[name].markdown = FM.body;
        })();
        promises.push(promise);
    });

    await Promise.all(promises);

    return infoTable;
}

module.exports = getInfo;
