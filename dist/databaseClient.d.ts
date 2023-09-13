import { Client, ClientConfig } from "pg";
export declare class DatabaseClient extends Client {
    filePath: string;
    constructor(config: ClientConfig, queryDirectory: string);
    fileQuery<T extends number | string>(path: string, values?: T[]): Promise<import("pg").QueryResult<any>>;
}
