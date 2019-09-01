var fs=require("fs");
var path=require("path");

module.exports.cpdir=function(from,to){
    var paths=fs.readdirSync(from);
    paths.forEach(function(path){
        var _from=from+'/'+path;
        var _to=to+'/'+path;
        var readable;
        var writable;
        var st=fs.statSync(_from);
        if(st.isFile()){
            fs.copyFileSync(_from,_to,"w");
            console.log("Copying "+_from+" to "+_to);
        }else if(st.isDirectory()){
            cpdir(_from,_to);
        }
    });
};

module.exports.ls=function(dir,suffix){
	var match=[];
	var files=fs.readdirSync(dir);
	match=files.filter(function(file){
        return path.extname(file)===suffix;
	});
	
	return match;
};

module.exports.exist=function(file){
    return fs.existsSync(file);
};

module.exports.mkdir=function(dir){
    if(this.exist(dir)){
        console.log("DIRECTORY already exist!");
        return;
    }
    fs.mkdirSync(dir);
};


module.exports.read=function(file,data,encoding){
    return fs.readFileSync(file,data,encoding);
};

module.exports.write=function(file,encoding){
    fs.writeFileSync(file,encoding);
};

module.exports.stat=function(file){
    return fs.statSync(file);
};

module.exports.rm=function(file){
    fs.unlinkSync(file);
};

module.exports.rmdir=function(fpath){
    var files=[];
    if(this.exist(fpath)){
        files=fs.readdirSync(fpath);
        files.forEach((file,index)=>{
            var curPath=fpath+"/"+file;
            if(this.stat(curPath).isDirectory()){
                this.rmdir(curPath);
            }else{
                this.rm(curPath);
            }
        });
        fs.rmdirSync(fpath);
    }
};