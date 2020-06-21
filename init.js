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

const fs = require("fs");
// TODO: Use git to initialize it
function init() {
    console.log("Initializing...");
    // Check if it is empty
    if (fs.readdirSync(process.cwd()).length > 0) {
        console.log("NOT EMPTY!!!");
        console.log("Please run it in an empty directory.");
        return;
    }

    // Copy configs
    console.log("Copying config...");
    (function cpdir(from, to) {
        // List the "from" directory
        fs.readdir(from, function (err, paths) {
            if (err) {
                return;
            }
            // Enumerate the files
            paths.forEach(function (path) {
                // The source and the target
                var _from = from + "/" + path;
                var _to = to + "/" + path;
                fs.stat(_from, function (err, st) {
                    if (err) {
                        return;
                    }
                    if (st.isFile()) {
                        // If it's not a directory
                        // Copy file
                        fs.copyFile(_from, _to, function (err) {});
                    } else if (st.isDirectory()) {
                        // Else
                        fs.mkdir(_to, function (err) {
                            // Make a directory and copy
                            if (err) {
                                return;
                            }
                            cpdir(_from, _to);
                        });
                    }
                });
            });
        });
    })(__dirname + "/config", process.cwd());

    // Make some empty directories for user
    console.log("Building directories...");
    fs.mkdir(process.cwd() + "/public", function (err) {
        fs.mkdir(process.cwd() + "/public/post", function (err) {});
        fs.mkdir(process.cwd() + "/public/lib", function (err) {});
    });

    fs.mkdir(process.cwd() + "/theme", function (err) {});
    fs.mkdir(process.cwd() + "/post", function (err) {});
}
module.exports = init;
