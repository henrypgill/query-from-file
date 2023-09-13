import { ClientConfig, Pool } from "pg";
export declare class DatabasePool extends Pool {
    filePath: string;
    constructor(config: ClientConfig, queryDirectory: string);
    fileQuery<T extends number | string>(path: string, values?: T[]): Promise<import("pg").QueryResult<any>>;
}
