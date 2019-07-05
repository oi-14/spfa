var fs=require("fs");
module.exports.check=function(dir){
    return fs.existsSync(dir+"/SPFA.tag");
};