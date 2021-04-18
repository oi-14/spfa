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
const ejs = require("ejs");
const { join } = require("path");
const fs = require("fs/promises");
const { promisify } = require("util");
const getInfo = require("../utils/getInfo");
const { cp, exists } = require("../utils/files");
const logger = require("../utils/logger")();
const renderFile = promisify(ejs.renderFile);

// Use b as the default value if a is false value
function def(a, b) {
    return a ? a : b;
}

// TODO: Receive a context object as the argument
// Generates post
// First argument: an item of the file table
// Second argument: path to "public"
// Third argument: title of the post
// Forth argument: path to "theme/theme-name"
// Fifth arugment: path to theme config
// Sixth argument: path to "config.json"
async function post(info, output, title, themePath, themeConfig, spfaConfig) {
    // Set the context of ejs
    let ejsContext = {
        title,
        spfaConfig,
        config: themeConfig,
        frontMatter: info.frontMatter,
        markdown: info.markdown,
    };
    // Render the post with the layout file
    let layout = join(themePath, "layout/post.ejs");
    let data = await renderFile(layout, ejsContext);
    // Write the result
    await fs.writeFile(output, data, "utf-8");
    // Show info
    logger.log(output + " is generated.");
}

// TODO: Receive a context object as the argument
// Generates the "index.html" in "public"
// First argument: path to "index.html"
// Second argument: title of the page
// Third argument: the file table
// Forth argument: path to "theme/theme-name"
// Fifth argument: path to theme config
// Sixth argument: path to "config.json"
async function index(output, title, info, themePath, themeConfig, spfaConfig) {
    title = def(title, "Welcome");
    // Set the context of ejs
    let ejsContext = {
        title,
        info,
        spfaConfig,
        config: themeConfig,
    };
    // Render "index.html"
    let layout = join(themePath, "layout/index.ejs");
    let data = await renderFile(layout, ejsContext);

    // Write result
    await fs.writeFile(output, data, "utf-8");
    logger.log(output + " is generated.");
}

// Check the existance of the folders
// If it doesn't exist, create it.
async function checkDirectory(dir) {
    if (!(await exists(dir))) {
        await fs.mkdir(dir);
    }
}

// Generates all the pages
// First argument: path to the repository
// Todo: Make it better.

async function generate(ctx) {
    let input = ctx.postDir;
    let output = ctx.publicDir;
    let themeBase = ctx.themeDir;

    // Todo: move it to class Spfa
    // Todo: Use a default config if no config is found
    // Read config
    let spfaConf;
    try {
        spfaConf = require(ctx.configFile);
    } catch (error) {
        logger.error("Config loading error.");
    }

    let postOut = join(output, "post");
    let libOut = join(output, "lib");
    Promise.all([
        checkDirectory(output),
        checkDirectory(postOut),
        checkDirectory(libOut),
    ]);

    // Default theme
    let themeName = def(spfaConf.theme, "spfa-theme-default");
    // Set the dir to the path of the theme
    let themeDir = join(themeBase, themeName);
    // Read theme config
    let themeConfigFile = join(themeDir, "config.json");
    let themeConf;
    try {
        themeConf = require(themeConfigFile);
    } catch (err) {
        logger.error(err);
        return;
    }

    // Load theme source
    let themeSource = join(themeDir, "source");
    let outputSource = join(output, "lib");
    try {
        await cp(themeSource, outputSource);
    } catch (err) {
        logger.error(err);
        return;
    }

    // Get file info
    let info;
    try {
        info = await getInfo(input);
    } catch (err) {
        logger.error(err);
        return;
    }

    let promises = [];
    // Enumerate the file table
    for (const name in info) {
        // If "name" is its own property
        if (info.hasOwnProperty(name)) {
            // Copy if the post is with a directory
            if (info[name].hasDirectory) {
                let from = join(input, name);
                let to = join(postOut, name);
                try {
                    await cp(from, to);
                } catch (err) {
                    logger.error(err);
                    return;
                }
            }

            // Generate the post
            let promise = post(
                info[name],
                join(output, "post", name + ".html"),
                def(spfaConf.title, "Welcome"),
                themeDir,
                themeConf,
                spfaConf
            );
            promises.push(promise);
        }
    }
    await Promise.all(promises);

    // Generate index.html
    await index(
        join(output, "index.html"),
        spfaConf.title,
        info,
        themeDir,
        themeConf,
        spfaConf
    );
}

module.exports = { generate, index, post, def };
