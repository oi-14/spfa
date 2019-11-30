require("should");
var files = require("../../files");
var fs = require("fs");
describe("test files.js", function() {
    describe("test exist", function() {
        it("files.exist('doesntexist') is false", function(done) {
            files.exist("doesntexist").should.be.false();
            done();
        });
        it("files.exist('/') is true", function(done) {
            files.exist("/").should.be.true();
            done();
        });
    });
    describe("test rm", function() {
        it("files.rm('doesntexist') should throw an error", function(done) {
            (function() {
                files.rm("doesntexist");
            }.should.throw());
            done();
        });
        it("files.rm(__dirname+'existdir') should throw an error", function(done) {
            (function() {
                files.rm(__dirname+"existdir");
            }.should.throw());
            done();
        });
        it("files.rm(__dirname+'/rm.txt') is successful", function(done) {
            (function() {
                files.rm(__dirname + "/rm.txt");
            }.should.not.throw());
            fs.existsSync(__dirname + "/rm.txt").should.be.false();
            (function() {
                fs.writeFileSync(__dirname + "/rm.txt", "");
            }.should.not.throw());
            done();
        });
    });
    describe("test rmdir", function() {
        it("files.rmdir('doesntexist') should throw an error", function(done) {
            (function() {
                files.rmdir("doesntexist");
            }.should.throw());
            done();
        });
        it("files.rmdir(__dirname+'/rmdir') is successful", function(done) {
            (function() {
                files.rmdir(__dirname + "/rmdir");
            }.should.not.throw());
            fs.existsSync(__dirname + "/rmdir").should.be.false();
            (function() {
                fs.mkdirSync(__dirname + "/rmdir");
            }.should.not.throw());
            (function() {
                (function copy(from, to) {
                    var paths = fs.readdirSync(from); //read directory

                    paths.forEach(function(path) {
                        //enumerate
                        var _from = from + "/" + path;
                        var _to = to + "/" + path;
                        var st = fs.statSync(_from);
                        if (st.isFile()) {
                            //if _from is a file
                            fs.copyFileSync(_from, _to); //copy file
                        } else if (st.isDirectory()) {
                            //if directory
                            fs.mkdirSync(_to); //make target directory
                            copy(_from, _to); //recursive
                        }
                    });
                })(__dirname + "/rmdir.backup", __dirname + "/rmdir");
            }.should.not.throw());
            done();
        });
    });
    describe("test mkdir", function() {
        it("files.mkdir(__dirname+'/existdir') is null", function(done) {
            should(files.mkdir(__dirname + "/existdir")).null();
            done();
        });
        it("files.mkdir(__dirname+'/newdir') is ok", function(done) {
            (function() {
                files.mkdir(__dirname + "/newdir");
            }.should.not.throw());
            fs.existsSync(__dirname + "/newdir").should.be.true();
            (function() {
                fs.rmdirSync(__dirname + "/newdir");
            }.should.not.throw());
            done();
        });
    });
    describe("test ls",function(){
        it("files.ls('doesntexist') should throw an error",function(){
            (function(){
                files.ls("doesntexist");
            }).should.throw();
        });
        it("files.ls(__dirname+'/lsdir') should return all the files",function(done){
            var tar=["ls0.a","ls1.b","ls2.b","ls3.a","ls4.a","ls5"];
            files.ls(__dirname+"/lsdir").should.eql(tar);
            done();
        });
        it("files.ls(__dirname+'/lsdir','.a') should return the files with .a",function(done){
            var tar=["ls0.a","ls3.a","ls4.a"];
            files.ls(__dirname+"/lsdir",".a").should.eql(tar);
            done();
        });
        it("files.ls(__dirname+'/lsdir','') should return the files with no extname",function(done){
            var tar=["ls5"];
            files.ls(__dirname+"/lsdir","").should.eql(tar);
            done();
        });
    });
});
