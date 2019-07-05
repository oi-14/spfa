#!/usr/bin/env node
var fs=require("fs");
var md2html=require("./md2html");
var ls=require("./ls");
var mkindex=require("./mkindex");
var path=require("path");
var connect=require("connect");
var serveStatic=require("serve-static");
var cpdir=require("./cpdir");

var argv=process.argv;

if(argv.length<=2){
	console.log("Usage: spfa [command]");
	console.log("spfa g : generate files");
	console.log("spfa s : start server");
}else{
	if(argv[2]==="g"){
		var postdir=__dirname+"/post";
		var list=ls.ls(postdir,".md");
		for(var i=0;i<list.length;i++){
			var item=list[i];
			var name=item.replace(".md","");
			md2html.md2html("post/"+item,"public/"+name+".html",name);
		}
		fs.mkdir(__dirname+"/public/lib",function(err){
			if(err){
				console.error(err.toString());
			}
		});
		cpdir.cpdir(__dirname+"/lib",__dirname+"/public/lib");
	}else if(argv[2]==="s"){
		var app=connect(); 
		app.use("/",serveStatic(__dirname+"/public"));
		var server=app.listen(3000);
		console.log("Server running on http://localhost:3000/");
	}
}