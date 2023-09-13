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
