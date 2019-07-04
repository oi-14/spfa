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
var hlList=["vs2015"];
var defaultCss="vs2015";
module.exports.md2html=function(from,to,title,style){
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
			var data="";
			data+=header1;
			if(title){
				data+=title;
			}else{
				data+="title";
			}
			data+=header2;
			
			data+=cssfront;
			if(hlList.indexOf(style)!==-1){
				data+="../lib/"+style+".css";
			}else{
				data+="../lib/"+defaultCss+".css";
			}
			data+=cssback;

			data+=header3;
			data+=marked(fdata);
			data+=back;
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

