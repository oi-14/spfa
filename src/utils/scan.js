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
var fs = require("fs");
var path = require("path");
var frontMatter = require("front-matter");

// Scan the "post" directory
// First argument: path to "post"
// Second argument: callback function
function scan(dir, callback) {
    // Read a list of the files
    fs.readdir(dir, function (err, files) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        // Find the markdown files
        var mds = files.filter(function (file) {
            return path.extname(file) === ".md";
        });
        // Remove the extname of markdown files
        for (let i = 0; i < mds.length; i++) {
            mds[i] = path.basename(mds[i], ".md");
        }
        // Build an info table
        var infoTable = {};
        // Add items
        for (let i = 0; i < mds.length; i++) {
            infoTable[mds[i]] = {};
            // Add property "hasDirectory" to the item
            if (
                files.includes(mds[i]) &&
                fs.statSync(dir + "/" + mds[i]).isDirectory(mds[i])
            ) {
                infoTable[mds[i]].hasDirectory = true;
            } else {
                infoTable[mds[i]].hasDirectory = false;
            }
        }
        // Async reading
        var promisePool = [];
        for (let i = 0; i < mds.length; i++) {
            // Get full path
            let fileName = dir + "/" + mds[i] + ".md";
            // Read file
            let promise = new Promise(function (res, rej) {
                fs.readFile(fileName, function (err, buffer) {
                    if (err) {
                        rej(err);
                    } else {
                        res(buffer.toString());
                    }
                });
            });
            // Throw it into pool
            promisePool.push(promise);
        }
        // Read all
        Promise.all(promisePool)
            .then(function (vals) {
                // If success
                // Set propertie in the table
                for (let i = 0; i < vals.length; i++) {
                    let val = vals[i];
                    let FM = frontMatter(val);
                    infoTable[mds[i]].frontMatter = FM.attributes;
                    infoTable[mds[i]].markdown = FM.body;
                }
                return callback(null, infoTable);
            })
            .catch(function (err) {
                // If failed
                // Handle it
                console.log(err);
                return callback(err, null);
            });
    });
}

module.exports = scan;
