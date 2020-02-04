// Copyright (C) 2020  oi-14
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

////////////////////////////////////////////////////////////////////////

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
