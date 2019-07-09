var marked = require("marked");
var fs=require("fs");
var files=require("./files");
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
	var f=files.read(from);
	f=f.toString();
	var data=convert(f,title);
	files.write(to,data,"utf8");
	console.log("Generating "+to);
};

