const chai = require("chai");
const files = require("../../src/utils/files");
const fs = require("fs");
const { join } = require("path");
chai.should();

describe("exists", function () {
    const exists = files.exists;
    it("doesn't exist", async function () {
        const result = await exists("doesn't exist");
        result.should.be.false;
    });
    it("exists", async function () {
        const result = await exists(__filename);
        result.should.be.true;
    });
});

describe("remove", function () {
    const rm = files.rm;
    it("remove single file", async function () {
        const fName = join(__dirname,"a");
        fs.writeFileSync(fName, "");
        await rm(fName);
        fs.existsSync(fName).should.be.false;
    });
});
