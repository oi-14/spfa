#!/usr/bin/env node
var fs=require("fs");
var md2html=require("./md2html");
var ls=require("./ls");
var mkindex=require("./mkindex");

var argv=process.argv;

if(argv.length<2){
	console.log("Usage: spfa [command]");
	console.log("spfa g : generate files");
	console.log("spfa s : start server");
}else if(argv.length==2){
	if(argv[1]=="g"){

	}
}