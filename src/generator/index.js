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
const fs = require("fs");
const { join } = require("path");
const scan = require("../utils/scan");
const { cp } = require("../utils/files");

// Use b as the default value if a is false value
function def(a, b) {
    return a ? a : b;
}

// Generates post
// First argument: an item of the file table
// Second argument: path to "public"
// Third argument: title of the post
// Forth argument: path to "theme/theme-name"
// Fifth arugment: path to theme config
// Sixth argument: path to "config.json"
function post(info, output, title, themePath, themeConfig, spfaConfig) {
    // Set the context of ejs
    var ejsContext = {
        title,
        spfaConfig,
        config: themeConfig,
        frontMatter: info.frontMatter,
        markdown: info.markdown,
    };
    // Render the post with the layout file
    var layout = join(themePath, "layout/post.ejs");
    ejs.renderFile(layout, ejsContext, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        // Write the result
        fs.writeFile(output, data, "utf-8", function (err) {
            if (err) {
                console.log(err);
                return;
            }
            // Show info
            console.log(output + " is generated.");
        });
    });
}

// Generates the "index.html" in "public"
// First argument: path to "index.html"
// Second argument: title of the page
// Third argument: the file table
// Forth argument: path to "theme/theme-name"
// Fifth argument: path to theme config
// Sixth argument: path to "config.json"
function index(output, title, info, themePath, themeConfig, spfaConfig) {
    // Set the context of ejs
    var ejsContext = {
        title,
        info,
        spfaConfig,
        config: themeConfig,
    };
    // Render "index.html"
    var layout = join(themePath, "layout/index.ejs");
    ejs.renderFile(layout, ejsContext, function (err, data) {
        if (err) {
            console.log(err);
        }
        // Put it to
        fs.writeFile(output, data, "utf-8", function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(output + " is generated.");
        });
    });
}

// Generates the index and the posts
// First argument: path to "post"
// Second argument: path to "public"
// Third argument: path to "theme"
// Forth argument: path to "config.json"
function generate(input, output, themeBase, spfaConfigFile) {
    // Read "config.json"
    var spfaConf;
    try {
        spfaConf = require(spfaConfigFile);
    } catch (error) {
        console.log("Theme loading error.");
        console.log("Do you really have a theme?");
    }

    if (!fs.existsSync(output)) {
        fs.mkdirSync(output);
    }

    var postOut = join(output, "post");
    if (!fs.existsSync(postOut)) {
        fs.mkdirSync(postOut);
    }
    // Default theme
    var themeName = def(spfaConf.theme, "spfa-theme-default");
    // Set the dir to the path of the theme
    var themeDir = join(themeBase, themeName);
    // Read theme config
    var themeConfigFile = join(themeDir, "config.json");
    var themeConf;
    try {
        themeConf = require(themeConfigFile);
    } catch (err) {
        console.log(err);
        return;
    }
    // Load theme source
    var themeSource = join(themeDir, "source");
    var outputSource = join(output, "lib");
    cp(themeSource, outputSource, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        // Scan "post"
        scan(input, function (err, table) {
            if (err) {
                console.log(err);
                return;
            }
            // Enumerate the file table
            for (const name in table) {
                // If "name" is its own property
                if (table.hasOwnProperty(name)) {
                    // Copy if the post is with a directory
                    if (table[name].hasDirectory) {
                        let from = join(input, name);
                        let to = join(output, "post", name);
                        cp(from, to, function (err) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            // Generate the post
                            post(
                                table[name],
                                join(output, "post", name + ".html"),
                                def(spfaConf.title, "Welcome"),
                                themeDir,
                                themeConf,
                                spfaConf
                            );
                        });
                    } else {
                        // Generate the post
                        post(
                            table[name],
                            join(output, "post", name + ".html"),
                            def(spfaConf.title, "Welcome"),
                            themeDir,
                            themeConf,
                            spfaConf
                        );
                    }
                }
            }

            // Generate index
            index(
                join(output, "index.html"),
                def(spfaConf.title, "Welcome"),
                table,
                themeDir,
                themeConf,
                spfaConf
            );
        });
    });
}

// Export "generate"
module.exports = generate;
