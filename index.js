#!/usr/bin/env node

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
		theme = config.theme ? config.theme : "spfa-theme-default";
	} catch (error) {
		console.log("Detected error in config.yaml");
		console.log("Please check the configuration of config.yaml");
		console.log("Using default theme");
		theme = "spfa-theme-default";
	}
	var theme_gen;
	try {
		theme_gen = require(process.cwd()+"/node_modules/"+theme);
	} catch (error) {
		console.log("Theme doesn't exist or not installed !");
		return;
	}
	try {
		theme_gen.gen(process.cwd());
	} catch (error) {
		console.log("Invalid theme!");
		return;
	}
	console.log("Finished!");
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
		files.cpdir(__dirname + "/config", process.cwd());
	} catch (error) {
		console.error(error.toString());
	}

	files.mkdir(process.cwd() + "/public");
	files.mkdir(process.cwd() + "/public/post");
	files.mkdir(process.cwd() + "/public/lib");
	files.mkdir(process.cwd() + "/theme");
	files.mkdir(process.cwd() + "/lib");
	files.mkdir(process.cwd() + "/post");
	console.log("finished!");
	console.log("Please run 'npm install' to install requirements");
}

function clean() {
	files.rmdir(process.cwd() + "/public");
	console.log("cleaning /public");
	files.mkdir(process.cwd() + "/public");
	files.mkdir(process.cwd() + "/public/post");
	files.mkdir(process.cwd() + "/public/lib");
	console.log("finished!");
}

function remove() {
	console.log("removing / ...");
	try {
		files.rmdir(process.cwd());
		files.mkdir(process.cwd());
	} catch (error) {
		console.log("removed!");
	}
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
} else if (argv[2] === "rm" || argv[2] === "remove") {
	remove();
}