"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabasePool = void 0;
const pg_1 = require("pg");
const fileQuery_1 = require("./fileQuery");
const utils_1 = require("./utils");
class DatabasePool extends pg_1.Pool {
    constructor(config, queryDirectory) {
        super(config);
        this.filePath = (0, utils_1.checkValidFilePath)(queryDirectory) ? queryDirectory : "";
    }
    async fileQuery(path, values) {
        try {
            const query = new fileQuery_1.FileQuery(`${this.filePath}/${path}.sql`);
            if (values) {
                if (values.length !== query.valuesCount)
                    throw new Error(`incorrect number of values passed to query: ${query.path}, received ${values.length} values but expected ${query.valuesCount} values.`);
                const response = await this.query(query.queryString, values);
                return response;
            }
            else {
                const response = await this.query(query.queryString);
                return response;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.DatabasePool = DatabasePool;
