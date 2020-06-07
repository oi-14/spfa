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

var generator = require("spfa-generator");
var fs = require("fs");
function generate() {
    // Check if it exists
    fs.exists(process.cwd() + "/SPFA.tag", function (data) {
        // If not
        if (!data) {
            console.log("Please init first.");
            process.exit(0);
        }
        // Else, generate with spfa-generator
        generator(
            process.cwd() + "/post",
            process.cwd() + "/public",
            process.cwd() + "/theme",
            process.cwd() + "/config.json"
        );
    });
}
module.exports = generate;
