var fs=require("fs");
var path=require("path");

module.exports.ls=function(dir,suffix){
	var match=[];
	
	var files=fs.readdirSync(dir);
	match=files.filter(function(file){
		return path.extname(file)===suffix;
	});
	// fs.readdir(dir,function(err,files){
	// 	if(err){
	// 		throw err;
	// 	}
		
	// 	match=files.filter(function(file){
	// 		return path.extname(file)===suffix;
	// 	});
	// });
	
	return match;
};