var fs=require("fs");
var ls=require("./ls");

var header1="<!DOCTYPE html><html><head><title>Welcome!</title>";
var header2="<meta charset='utf-8'></head><body><h1>Welcome!</h1>";
var back="</body></html>";

var link1="<p><a href='post/";
var link2="'>";
var link3="</a></p>";

function wrap(front,inner,back){
	return front+inner+back;
}

function index(list){
    console.log(list);
    var css="";
    var data=wrap(header1,css,header2);
    for(var i=0;i<list.length;i++){
        var file=list[i];
        var name=file.replace(".html","");

        var linka=wrap(link1,file,link2);
        linka=wrap(linka,name,link3);

        data+=linka;
    }
    data+=back;
    console.log(data);
    return data;
}

module.exports.mkindex=function(location,src){
    var files=ls.ls(src,".html");
    var page=index(files);
    try{
        fs.writeFileSync(location,page);
    }catch(err){
        console.error(err.toString());
    }
    
};