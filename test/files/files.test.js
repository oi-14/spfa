require("should");
var files = require("../../files");
var fs = require("fs");
describe("test files.js", function() {
    describe("test exist", function() {
        it("files.exist('doesnotexistabcdefghijklmnopqrst') is false", function(done) {
            files.exist("doesnotexistabcdefghijklmnopqrst").should.be.false();
            done();
        });
        it("files.exist('/') is true", function(done) {
            files.exist("/").should.be.true();
            done();
        });
    });
    describe("test rm", function() {
        it("files.rm('doesnotexistabcdefghijklmnopqrst') should throw an error", function(done) {
            (function() {
                files.rm("doesnotexistabcdefghijklmnopqrst");
            }.should.throw());
            done();
        });
        it("files.rm(__dirname+'/rm.txt') removed successfully", function(done) {
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
});
