"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabasePool = void 0;
const pg_1 = require("pg");
const fileQuery_1 = require("./fileQuery");
const utils_1 = require("./utils");
class DatabasePool extends pg_1.Pool {
    constructor(config, queryDirectory) {
        super(config);
        this.parentDirectory = (0, utils_1.checkValidFilePath)(queryDirectory)
            ? queryDirectory
            : "";
    }
    async fileQuery(path, values) {
        try {
            const query = new fileQuery_1.FileQuery(`./${this.parentDirectory}/${path}.sql`);
            if (values) {
                if (values.length !== query.valuesCount)
                    throw new Error(`incorrect number of values passed to query: ${query.path}, received ${values.length} values but expected ${query.valuesCount} values.`);
                const response = await this.query(query.queryString, values);
                return response;
            }
            const response = await this.query(query.queryString);
            return response;
        }
        catch (error) {
            console.log(error);
            return {};
        }
    }
    async dynamicQuery(path, values, parameters, numberOfValues, startingNumber) {
        try {
            const query = new fileQuery_1.DynamicFileQuery(`./${this.parentDirectory}/${path}.sql`, parameters, numberOfValues, startingNumber);
            if (values.length !== query.valuesCount)
                throw new Error(`incorrect number of values passed to query: ${query.path}, received ${values.length} values but expected ${query.valuesCount} values.`);
            const response = await this.query(query.queryString, values);
            return response;
        }
        catch (error) {
            console.log(error);
            return {};
        }
    }
}
exports.DatabasePool = DatabasePool;
