const fs = require("fs/promises");
const { join } = require("path");

// Check the existance of file
async function exists(file) {
    return await fs
        .access(file)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
}

// Remove files
async function rm(path) {
    if (!(await exists(path))) {
        console.error(path + " doesn't exist!");
        return;
    }

    let stat = await fs.stat(path);

    if (stat.isFile()) {
        await fs.unlink(path);
        return;
    }

    let files = await fs.readdir(path);
    if (!files.length) {
        await fs.rmdir(path);
        return;
    }

    let promises = [];
    files.forEach((file) => {
        let name = join(path, file);
        let promise = rm(name);
        promises.push(promise);
    });

    await Promise.all(promises);
    await fs.rmdir(path);
}

// Copy files
async function cp(from, to) {
    if (!(await exists(from))) {
        console.error(from + " doesn't exist!");
        return;
    }
    if (!(await exists(to))) {
        await fs.mkdir(to);
        await cp(from, to);
        return;
    }

    let files = await fs.readdir(from);
    if (!files.length) {
        return;
    }
    let promises = [];
    files.forEach((file) => {
        let _from = join(from, file);
        let _to = join(to, file);
        let promise = (async function () {
            let stat = await fs.stat(_from);

            if (stat.isDirectory()) {
                if (await exists(_to)) {
                    await rm(_to);
                }
                await cp(_from, _to);
                return;
            }

            if (await exists(_to)) {
                await rm(_to);
            }

            await fs.copyFile(_from, _to);
        })();
        promises.push(promise);
    });
    await Promise.all(promises);
}

module.exports = { cp, rm, exists };
