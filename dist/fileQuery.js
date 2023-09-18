"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicFileQuery = exports.FileQuery = void 0;
const fs_1 = require("fs");
class FileQuery {
    constructor(path) {
        this._path = path;
        this._queryString = this.readQueryString(path);
        const queryValues = this._queryString.match(/\$[0-9]*/g);
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
class DynamicFileQuery {
    constructor(path, parameters, numberOfValues, startingNumber = 1) {
        this._path = path;
        this._startingNumber = startingNumber;
        this._queryString = this.parametiseQuery(this.readQueryString(path), parameters, numberOfValues, this._startingNumber);
        const queryValues = this._queryString.match(/\$[0-9]*/g);
        const uniqueQueryValues = [...new Set(queryValues)];
        this._valuesCount =
            uniqueQueryValues.length !== 0 ? uniqueQueryValues.length : 0;
    }
    readQueryString(path) {
        return (0, fs_1.readFileSync)(path).toString();
    }
    parametiseQuery(str, parameters, numberOfValues, startingNumber) {
        const regex = /\*\*\*(\d+)\*\*\*/g;
        const paramRegex = /\$\$/g;
        const parameterArray = [];
        let paramCount = startingNumber;
        for (let i = startingNumber; parameterArray.length < numberOfValues; i++) {
            const iParams = [];
            for (let j = 0; j < parameters.length; j++) {
                iParams.push(parameters[j].replace(paramRegex, (match) => {
                    if (match === "$$")
                        paramCount++;
                    return `$${paramCount}`;
                }));
            }
            parameterArray.push(iParams);
        }
        const valArray = parameterArray.map((params) => `(${params.join(`, `)})`).join(`,\n`);
        const parametisedQuery = str.replace(regex, (_match) => { return valArray; });
        return parametisedQuery + ";";
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
exports.DynamicFileQuery = DynamicFileQuery;
