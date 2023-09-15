import { ClientConfig, Pool } from "pg";
export declare class DatabasePool extends Pool {
    parentDirectory: string;
    constructor(config: ClientConfig, queryDirectory: string);
    fileQuery<RowType, ValueType extends unknown[] = unknown[]>(path: string, values?: ValueType): Promise<import("pg").QueryResult<RowType>>;
}
