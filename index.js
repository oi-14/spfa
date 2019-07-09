#!/usr/bin/env node
var fs=require("fs");
var connect=require("connect");
var serveStatic=require("serve-static");
var checker=require("./check");
var md2html=require("./md2html");
var mkindex=require("./mkindex");
var files=require("./files");

var argv=process.argv;

if(argv.length<=2){
	console.log("Usage: spfa [command]");
	console.log("spfa i : initialize spfa");
	console.log("spfa g : generate files");
	console.log("spfa s : start server");
	console.log("spfa c : clean cache");
}else{
	console.log("Process started.");
	if(argv[2]==="g"||argv[2]==="generate"){
		if(!checker.check(process.cwd())){
			console.log("Please init first.");
			return;
		}
		files.mkdir(process.cwd()+"/public");
		files.mkdir(process.cwd()+"/public/post");
		files.mkdir(process.cwd()+"/public/lib");

		var postdir=process.cwd()+"/post";
		var list=files.ls(postdir,".md");
		for(var i=0;i<list.length;i++){
			var item=list[i];
			var name=item.replace(".md","");
			md2html.md2html(process.cwd()+"/post/"+item,process.cwd()+"/public/post/"+name+".html",name);
		}
		
		mkindex.mkindex(process.cwd()+"/public/index.html",process.cwd()+"/public/post");
		console.log("generating /public/index.html");
		try {
			files.cpdir(process.cwd()+"/lib",process.cwd()+"/public/lib");
		} catch (error) {
			console.error(error.toString());
		}
		
		console.log("finished!");
		
	}else if(argv[2]==="s"||argv[2]==="server"){
		if(!checker.check(process.cwd())){
			console.log("Please init first.");
			return;
		}
		var app=connect(); 
		app.use("/",serveStatic(process.cwd()+"/public"));
		var server=app.listen(3000);
		console.log("Server is running on http://localhost:3000/");
		console.log("Press ^C to stop.");
	}else if(argv[2]==="i"||argv[2]==="init"){
		if(checker.check(process.cwd())){
			console.log("Already exsist!");
			return;
		}
		files.write(process.cwd()+"/SPFA.tag","SPFA-TAG","utf8");
		
		files.mkdir(process.cwd()+"/public");
		files.mkdir(process.cwd()+"/public/post");
		files.mkdir(process.cwd()+"/public/lib");
		files.mkdir(process.cwd()+"/lib");
		files.mkdir(process.cwd()+"/post");
		try {
			files.cpdir(__dirname+"/lib",process.cwd()+"/lib");
		} catch (error) {
			console.error(error.toString());
		}
		console.log("finished!");
	}else if(argv[2]==="c"||argv[2]==="clean"){
		files.rmdir(process.cwd()+"/public");
		console.log("cleaning /public");
		files.mkdir(process.cwd()+"/public");
		files.mkdir(process.cwd()+"/public/post");
		files.mkdir(process.cwd()+"/public/lib");
		console.log("finished!");
	}
}