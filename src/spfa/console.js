class Console {
    constructor() {
        this.list = {};
        this.alias = {};
    }
    register(name, fn) {
        if (!(typeof fn === "function")) {
            throw new TypeError("Fn must be a function!");
        }
        this.list[name] = fn;
    }
    setAlias(name, alias) {
        if (this.list.hasOwnProperty(name)) {
            this.alias[alias] = name;
        }
    }
    get(name) {
        if (this.list[name]) {
            return this.list[name];
        }
        if (this.alias[name]) {
            return this.list[this.alias[name]];
        }
    }
}

module.exports = Console;