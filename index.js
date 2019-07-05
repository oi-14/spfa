#!/usr/bin/env node
var fs=require("fs");
var md2html=require("./md2html");
var ls=require("./ls");
var mkindex=require("./mkindex");
var connect=require("connect");
var serveStatic=require("serve-static");
var cpdir=require("./cpdir");
var checker=require("./check");

var argv=process.argv;

if(argv.length<=2){
	console.log("Usage: spfa [command]");
	console.log("spfa i : initialize spfa");
	console.log("spfa g : generate files");
	console.log("spfa s : start server");
}else{
	if(argv[2]==="g"||argv[2]==="generate"){
		if(!checker.check(__dirname)){
			console.log("Please init first");
			return;
		}
		var postdir=__dirname+"/post";
		var list=ls.ls(postdir,".md");
		for(var i=0;i<list.length;i++){
			var item=list[i];
			var name=item.replace(".md","");
			md2html.md2html(__dirname+"/post/"+item,__dirname+"/public/post/"+name+".html",name);
		}
		mkindex.mkindex(__dirname+"/public/index.html",__dirname+"/public/post");
		cpdir.cpdir(__dirname+"/lib",__dirname+"/public/lib");
	}else if(argv[2]==="s"||argv[2]==="server"){
		if(!checker.check(__dirname)){
			console.log("Please init first");
			return;
		}
		var app=connect(); 
		app.use("/",serveStatic(__dirname+"/public"));
		var server=app.listen(3000);
		console.log("Server is running on http://localhost:3000/");
	}else if(argv[2]==="i"||argv[2]==="init"){
		if(checker.check(__dirname)){
			console.log("Already exsist!");
			return;
		}
		fs.writeFileSync(__dirname+"/SPFA.tag","SPFA-TAG","utf8");
		try{
			fs.mkdirSync(__dirname+"/public");
			fs.mkdirSync(__dirname+"/public/post");
			fs.mkdirSync(__dirname+"/public/lib");
			fs.mkdirSync(__dirname+"/lib");
			fs.mkdirSync(__dirname+"/post");
		}catch(err){
			console.error(err.toString());
		}
		
		cpdir.cpdir("lib",__dirname+"/lib");
	}
}