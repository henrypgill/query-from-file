import { Client, ClientConfig } from "pg";
export declare class DatabaseClient extends Client {
    parentDirectory: string;
    constructor(config: ClientConfig, queryDirectory: string);
    fileQuery<RowType, ValueType extends unknown[] = unknown[]>(path: string, values?: ValueType): Promise<import("pg").QueryResult<RowType>>;
}
