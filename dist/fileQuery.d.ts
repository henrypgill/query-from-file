export declare class FileQuery {
    private _path;
    private _queryString;
    private _valuesCount;
    constructor(path: string);
    private readQueryString;
    get path(): string;
    get queryString(): string;
    get valuesCount(): number;
}
export declare class DynamicFileQuery {
    private _path;
    private _queryString;
    private _valuesCount;
    private _startingNumber;
    constructor(path: string, parameters: string[], numberOfValues: number, startingNumber?: number);
    private readQueryString;
    private parametiseQuery;
    get path(): string;
    get queryString(): string;
    get valuesCount(): number;
}
