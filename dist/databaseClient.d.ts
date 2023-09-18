import { Client, ClientConfig, QueryResult, QueryResultRow } from "pg";
export declare class DatabaseClient extends Client {
    parentDirectory: string;
    constructor(config: ClientConfig, queryDirectory: string);
    fileQuery<RowType extends QueryResultRow = any, ValueType extends any[] = any[]>(path: string, values?: ValueType): Promise<QueryResult<RowType>>;
    dynamicQuery<RowType extends QueryResultRow = any, ValueType extends any[] = any[]>(path: string, values: ValueType, parameters: string[], numberOfValues: number, startingNumber: number): Promise<QueryResult<RowType>>;
}
