import { Client, ClientConfig } from "pg";
export declare class DatabaseClient extends Client {
    filePath: string;
    constructor(config: ClientConfig, queryDirectory: string);
    fileQuery<S, T extends (number | string)[] | undefined>(path: string, values?: T): Promise<import("pg").QueryResult<S>>;
}
