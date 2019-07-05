var fs=require("fs");

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
                            throw err;
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