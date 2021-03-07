const chai = require("chai");
const generator = require("../../src/generator/index");
chai.should();

describe("set default value", function () {
    const def = generator.def;
    it("use default", function () {
        const result = def(false, "default");
        result.should.equal("default");
    });
    it("use input", function () {
        const result = def("input", "default");
        result.should.equal("input");
    });
});
