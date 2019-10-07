#!/usr/bin/env node

var fs = require("fs");
var connect = require("connect");
var serveStatic = require("serve-static");
var files = require("./files");
var yaml = require("./yaml");

var version = "0.1.8";
var argv = process.argv;

function usage() {
	console.log("Usage: spfa [command]");
	console.log("spfa i : initialize spfa");
	console.log("spfa g : generate files");
	console.log("spfa s : start server");
	console.log("spfa c : clean cache");
}

function generate() {
	if (!files.exist(process.cwd() + "/SPFA.tag")) {
		console.log("Please init first.");
		return;
	}
	var config = yaml.read(process.cwd() + "/config.yaml");
	console.log(config);
	var theme;
	try {
		theme = config.theme ? config.theme : "default";
	} catch (error) {
		console.log("Detected error in config.yaml");
		console.log("Please check the configuration of config.yaml");
		console.log("Using default theme");
		theme = "default";
	}
	var theme_gen;
	try {
		theme_gen = require(process.cwd() + "/theme/" + theme + "/index");
	} catch (error) {
		console.log("No such theme named "+theme+"!");
		console.log(error);
		return;
	}
	theme_gen.gen(process.cwd());
	/*var codeTheme;
	try {
		codeTheme = (config.codeTheme) ? (config.codeTheme) : "vs2015";
	} catch (error) {
		console.log("Detected error in config.yaml");
		console.log("Please check the config.yaml again");
		console.log("Use default code theme vs2015");
		codeTheme = "vs2015";
	}


	files.mkdir(process.cwd() + "/public");
	files.mkdir(process.cwd() + "/public/post");
	files.mkdir(process.cwd() + "/public/lib");

	var postdir = process.cwd() + "/post";
	var list = files.ls(postdir, ".md");
	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var name = item.replace(".md", "");
		md2html.md2html(
			process.cwd() + "/post/" + item,
			process.cwd() + "/public/post/" + name + ".html",
			name, codeTheme);
	}

	mkindex.mkindex(
		process.cwd() + "/public/index.html", process.cwd() + "/public/post");
	console.log("generating /public/index.html");
	try {
		files.cpdir(process.cwd() + "/lib", process.cwd() + "/public/lib");
	} catch (error) {
		console.error(error.toString());
	}*/

	console.log("finished!");
}

function server() {
	if (!files.exist(process.cwd() + "/SPFA.tag")) {
		console.log("Please init first.");
		return;
	}
	var app = connect();
	app.use("/", serveStatic(process.cwd() + "/public"));
	var server = app.listen(3000);
	console.log("Server is running on http://localhost:3000/");
	console.log("Press ^C to stop.");
}

function init() {
	if (files.exist(process.cwd() + "/SPFA.tag")) {
		console.log("Repository already exsist!");
		return;
	}
	files.write(process.cwd() + "/SPFA.tag", "SPFA v" + version, "utf8");
	try {
		files.cp(__dirname + "/config/config.yaml", process.cwd() + "/config.yaml");
	} catch (error) {
		console.error(error.toString());
	}

	files.mkdir(process.cwd() + "/public");
	files.mkdir(process.cwd() + "/public/post");
	files.mkdir(process.cwd() + "/public/lib");
	files.mkdir(process.cwd() + "/theme");
	files.mkdir(process.cwd() + "/lib");
	files.mkdir(process.cwd() + "/post");
	try {
		files.cpdir(__dirname + "/lib", process.cwd() + "/lib");
	} catch (error) {
		console.error(error.toString());
	}
	try {
		files.cpdir(__dirname + "/theme", process.cwd() + "/theme");
	} catch (error) {
		console.error(error);
	}
	console.log("finished!");
}

function clean() {
	files.rmdir(process.cwd() + "/public");
	console.log("cleaning /public");
	files.mkdir(process.cwd() + "/public");
	files.mkdir(process.cwd() + "/public/post");
	files.mkdir(process.cwd() + "/public/lib");
	console.log("finished!");
}

if (argv.length <= 2) {
	usage();
	return;
}

console.log("Process started.");
if (argv[2] === "g" || argv[2] === "generate") {
	generate();
} else if (argv[2] === "s" || argv[2] === "server") {
	server();
} else if (argv[2] === "i" || argv[2] === "init") {
	init();
} else if (argv[2] === "c" || argv[2] === "clean") {
	clean();
}