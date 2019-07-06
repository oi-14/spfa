var files=require("./files");
module.exports.check=function(dir){
    return files.exist(dir+"/SPFA.tag");
};