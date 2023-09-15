"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileQuery = void 0;
const fs_1 = require("fs");
class FileQuery {
    constructor(path) {
        this._path = path;
        this._queryString = this.readQueryString(path);
        const queryValues = this._queryString.match(/\$[0-9]*/gi);
        const uniqueQueryValues = [...new Set(queryValues)];
        this._valuesCount = queryValues ? uniqueQueryValues.length : 0;
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
