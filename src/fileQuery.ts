import { readFileSync } from "fs";



export class FileQuery {
    private _path: string;
    private _queryString: string;
    private _valuesCount: number;
  
    constructor(path: string) {
      this._path = path;
      this._queryString = this.readQueryString(path);
      const queryValues = this._queryString.match(/\$[0-9]*/gi);
      const uniqueQueryValues = [...new Set(queryValues)]
      this._valuesCount = queryValues ? uniqueQueryValues.length : 0;
    }
  
    private readQueryString(path: string) {
      return readFileSync(path).toString();
    }
  
    public get path() {
      return this._path;
    }
  
    public get queryString() {
      return this._queryString;
    }
  
    public get valuesCount() {
      return this._valuesCount;
    }
  }
  