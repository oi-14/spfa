const fs = require("fs");
const exists = fs.existsSync;
const { join } = require("path");

// Remove files
function rm(dir, callback) {
    if (!exists(dir)) {
        console.log(dir + " doesn't exist!");
        callback(null);
        return;
    }

    fs.stat(dir, function (err, stat) {
        if (err) {
            callback(err);
            return;
        }
        if (stat.isFile()) {
            fs.unlink(dir, function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null);
            });
            return;
        }
        fs.readdir(dir, function (err, files) {
            if (err) {
                callback(err);
                return;
            }
            if (!files.length) {
                fs.rmdir(dir, function (err) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    callback(null);
                    return;
                });
            } else {
                var promisePool = [];
                files.forEach(function (file) {
                    var name = join(dir, file);
                    var promise = new Promise(function (res, rej) {
                        rm(name, function (err) {
                            if (err) {
                                rej(err);
                            } else {
                                res();
                            }
                        });
                    });
                    promisePool.push(promise);
                });
                Promise.all(promisePool)
                    .then(function () {
                        fs.rmdir(dir, function (err) {
                            if (err) {
                                callback(err);
                                return;
                            }
                            callback(null);
                            return;
                        });
                    })
                    .catch(function (err) {
                        callback(err);
                        return;
                    });
            }
        });
    });
}

// Copy files
function cp(from, to, callback) {
    if (!exists(from)) {
        callback(new Error(from + " doesn't exist!"));
        return;
    }
    if (!exists(to)) {
        fs.mkdir(to, function (err) {
            if (err) {
                callback(err);
                return;
            }
            cp(from, to, function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null);
            });
        });
        return;
    }
    fs.readdir(from, function (err, files) {
        if (err) {
            callback(err);
            return;
        }
        if (!files.length) {
            callback(null);
            return;
        }
        var promisePool = [];
        files.forEach(function (file) {
            var _from = join(from, file);
            var _to = join(to, file);

            var promise = new Promise(function (res, rej) {
                fs.stat(_from, function (err, stat) {
                    if (err) {
                        rej(err);
                        return;
                    }
                    if (stat.isDirectory()) {
                        if (exists(_to)) {
                            rm(_to, function (err) {
                                if (err) {
                                    rej(err);
                                    return;
                                }
                                cp(_from, _to, function (err) {
                                    if (err) {
                                        rej(err);
                                        return;
                                    }
                                    res();
                                });
                            });
                        } else {
                            cp(_from, _to, function (err) {
                                if (err) {
                                    rej(err);
                                    return;
                                }
                                res();
                            });
                        }
                    } else {
                        if (exists(_to)) {
                            rm(_to, function (err) {
                                if (err) {
                                    rej(err);
                                    return;
                                }
                                fs.copyFile(_from, _to, function (err) {
                                    if (err) {
                                        rej(err);
                                        return;
                                    }
                                    res();
                                });
                            });
                        } else {
                            fs.copyFile(_from, _to, function (err) {
                                if (err) {
                                    rej(err);
                                    return;
                                }
                                res();
                            });
                        }
                    }
                });
            });
            promisePool.push(promise);
        });
        Promise.all(promisePool)
            .then(function (val) {
                callback(null);
            })
            .catch(function (err) {
                callback(err);
            });
    });
}

module.exports = { cp, rm };
