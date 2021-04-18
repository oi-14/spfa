#!/usr/bin/env node

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

// The main file
// The entry of spfa

// Import modules
const minimist = require("minimist");
const getPath = require("./utils/getPath");
const Spfa = require("./spfa/index");

getPath(process.cwd()).then((baseDir) => {
    let args = minimist(process.argv.slice(2));
    let spfa = new Spfa(baseDir, args);

    spfa.startup();
});

// TODO: Write tests.
// TODO: Use jsdoc.