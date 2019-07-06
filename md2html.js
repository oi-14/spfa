var marked = require("marked");
var fs=require("fs");
var highlight = require("highlight.js");
marked.setOptions({
    highlight: function (code) {
    	return highlight.highlightAuto(code).value;
  	}
});

var header1="<!DOCTYPE html><html><head><title>";
var header2="</title>";
var header3="<meta charset='utf-8'></head><body>";
var back="</body></html>";

var cssfront="<link rel='stylesheet' type='text/css' href='";
var cssback="'>";

function wrap(front,inner,back){
	return front+inner+back;
}

function convert(string,title){
	var data=wrap(header1,title,header2);
	
	data+=wrap(cssfront,"../lib/"+"spfa"+".css",cssback);
	data+=wrap(cssfront,"../lib/"+"vs2015"+".css",cssback);
	data+=wrap(header3,marked(string),back);
	
	return data;
}

module.exports.md2html=function(from,to,title){
	var f=fs.createReadStream(from);
	var chunks=[];
	var size=0;
	f.on("data",function(chunk){
		chunks.push(chunk);
		size+=chunk.length;
	});
	var fdata;
	f.on("end",function(){
		var buff=Buffer.concat(chunks,size);
		fdata=buff.toString();
		fs.open(to,"w",(err,fd)=>{
			if(err){
				throw err;
			}
			var data=convert(fdata,title);
			fs.appendFile(fd,data,"utf-8",(err)=>{
				fs.close(fd,(err)=>{
					if(err){
						throw err;
					}
				});
				if(err){
					throw err;
				}
			});
		});
	});
	
	
	console.log("Generating "+to);
};

