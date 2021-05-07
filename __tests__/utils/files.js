const files = require("../../src/utils/files");
const fs = require("fs");
const { join } = require("path");

describe("exists", () => {
    const exists = files.exists;
    test("doesn't exist", async () => {
        const result = await exists("doesn't exist");
        expect(result).toBe(false);
    });
    test("exists", async () => {
        const result = await exists(__filename);
        expect(result).toBe(true);
    });
});

describe("remove", () => {
    const rm = files.rm;
    test("remove single file", async () => {
        const fName = join(__dirname, "a");
        fs.writeFileSync(fName, "");
        await rm(fName);
        expect(fs.existsSync(fName)).toBe(false);
    });
});
