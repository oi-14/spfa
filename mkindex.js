var fs=require("fs");
var files=require("./files");

var header1="<!DOCTYPE html><html><head><title>Welcome!</title>";
var header2="<meta charset='utf-8'></head><body><h1>Welcome!</h1>";
var back="</body></html>";

var link1="<p><a href='post/";
var link2="'>";
var link3="</a></p>";

function wrap(front,inner,back){
	return front+inner+back;
}

function index(flist){
    var css="<link rel='stylesheet' type='text/css' href='lib/spfa.css'>";
    var data=wrap(header1,css,header2);
    data+="<input id='search-name' type='text'>";
    data+="<button id='search-btn'>go!</button>";
    for(var i=0;i<flist.length;i++){
        var file=flist[i];
        var name=file.replace(".html","");

        var linka=wrap(link1,file,link2);
        linka=wrap(linka,name,link3);
        
        data+=linka;
    }
    data+="<script src='lib/jquery-3.4.1.js'></script>";
    data+="<script src='lib/search.js'></script>";
    data+=back;
    return data;
}

module.exports.mkindex=function(location,src){
    var f=files.ls(src,".html");
    var page=index(f);
    try{
        fs.writeFileSync(location,page);
    }catch(err){
        console.error(err.toString());
    }
    
};