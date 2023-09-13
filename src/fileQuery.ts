import { readFileSync } from "fs";
import { checkValidFilePath } from "./utils";



export class FileQuery {
    private _path: string;
    private _queryString: string;
    private _valuesCount: number;
  
    constructor(path: string) {
      checkValidFilePath(path);
      this._path = path;
      this._queryString = this.readQueryString(path);
      this._valuesCount = this._queryString
        .split("")
        .map((query) => query.match(/\$[0-9]*/gi)).length;
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
  