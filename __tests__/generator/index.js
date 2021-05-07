const generator = require("../../src/generator/index");

describe("set default value", () => {
    const def = generator.def;
    test("use default", () => {
        const result = def(false, "default");
        expect(result).toBe("default");
    });
    test("use input", () => {
        const result = def("input", "default");
        expect(result).toBe("input");
    });
});
