"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileQuery = void 0;
const fs_1 = require("fs");
const utils_1 = require("./utils");
class FileQuery {
    constructor(path) {
        (0, utils_1.checkValidFilePath)(path);
        this._path = path;
        this._queryString = this.readQueryString(path);
        this._valuesCount = this._queryString
            .split("")
            .map((query) => query.match(/\$[0-9]*/gi)).length;
    }
    readQueryString(path) {
        return (0, fs_1.readFileSync)(path).toString();
    }
    get path() {
        return this._path;
    }
    get queryString() {
        return this._queryString;
    }
    get valuesCount() {
        return this._valuesCount;
    }
}
exports.FileQuery = FileQuery;
//# sourceMappingURL=fileQuery.js.map