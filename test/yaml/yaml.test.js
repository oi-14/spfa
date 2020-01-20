require("should");
var yaml = require("../../yaml.js");
describe("test yaml.js", function() {
    describe("test read", function() {
        it("yaml.read('doesntexist') is null", function(done) {
            should(yaml.read("doesntexist")).null();
            done();
        });
        it("yaml.read(__dirname+'/example1.yaml') is correct", function(done) {
            var obj = { info: "test" };
            yaml.read(__dirname + "/example1.yaml").should.be.eql(obj);
            done();
        });

        it("yaml.read(__dirname+'/example2.yaml') is unable to parse", function(done) {
            (function() {
                yaml.read(__dirname + "/example2.yaml");
            }.should.throw());
            done();
        });
    });
});
