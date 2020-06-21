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

const fs = require("fs");
const path = require("path");
function clean() {
    // Remove the "public" directory
    (function rmdir(dir, callback) {
        // Read a list of files
        fs.readdir(dir, (err, files) => {
            // Read next file
            function next(index) {
                // If it is the last file
                if (index === files.length) {
                    return fs.rmdir(dir, callback);
                }
                // Get full path
                let newPath = path.join(dir, files[index]);
                // Show stat
                fs.stat(newPath, (err, stat) => {
                    if (stat.isDirectory()) {
                        // If it is a directory
                        rmdir(newPath, () => next(index + 1));
                    } else {
                        // If not
                        fs.unlink(newPath, () => next(index + 1));
                    }
                    // Call next
                });
            }
            // Start from 0
            next(0);
        });
    })(process.cwd() + "/public", function () {
        console.log("Cleaned!");
        fs.mkdir(process.cwd() + "/public", function (err) {
            fs.mkdir(process.cwd() + "/public/post", function (err) {});
            fs.mkdir(process.cwd() + "/public/lib", function (err) {});
        });
    });
}

// Export the function
module.exports = clean;
