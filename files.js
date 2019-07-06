var fs=require("fs");
var path=require("path");

module.exports.cpdir=function(from,to){
    fs.readdir(from,function(err,paths){
        if(err){
            throw err;
        }
        paths.forEach(function(path){
            var _from=from+'/'+path;
            var _to=to+'/'+path;
            var readable;
            var writable;
            fs.stat(_from,function(err,st){
                if(err){
                    throw err;
                }
                
                if(st.isFile()){
                    fs.copyFile(_from,_to,"w",function(err){
                        if(err){
                            console.log(err.toString());
                        }
                        console.log("Copying "+_from+" to "+_to);
                    });
                }else if(st.isDirectory()){
                    cpdir(_from,_to);
                }
            });
        });
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

module.exports.write=function(file,data,encoding){
    fs.writeFileSync(file,data,encoding);
};