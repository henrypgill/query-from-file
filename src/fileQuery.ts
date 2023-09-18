import { readFileSync } from "fs";

export class FileQuery {
  private _path: string;
  private _queryString: string;
  private _valuesCount: number;

  constructor(path: string) {
    this._path = path;
    this._queryString = this.readQueryString(path);
    const queryValues = this._queryString.match(/\$[0-9]*/g);
    const uniqueQueryValues = [...new Set(queryValues)];
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

export class DynamicFileQuery {
  private _path: string;
  private _queryString: string;
  private _valuesCount: number;
  private _startingNumber: number;

  constructor(
    path: string,
    parameters: string[],
    numberOfValues: number,
    startingNumber = 1
  ) {
    this._path = path;
    this._startingNumber = startingNumber;
    this._queryString = this.parametiseQuery(
      this.readQueryString(path),
      parameters,
      numberOfValues,
      this._startingNumber
    );
    const queryValues = this._queryString.match(/\$[0-9]*/g);
    const uniqueQueryValues = [...new Set(queryValues)];
    this._valuesCount =
      uniqueQueryValues.length !== 0 ? uniqueQueryValues.length : 0;
  }

  private readQueryString(path: string) {
    return readFileSync(path).toString();
  }

  private parametiseQuery(
    str: string,
    parameters: string[],
    numberOfValues: number,
    startingNumber: number
  ) {
    const regex = /\*\*\*(\d+)\*\*\*/g;
    const paramRegex = /\$\$/g;
    const parameterArray = [];
    let paramCount = startingNumber;

    for (let i = startingNumber; parameterArray.length < numberOfValues; i++) {
      const iParams = [];
      for (let j = 0; j < parameters.length; j++) {
        iParams.push(
          parameters[j].replace(paramRegex, (match) => {
            if (match === "$$") paramCount++;
            return `$${paramCount}`;
          })
        );
      }
      parameterArray.push(iParams);
    }

    const valArray = parameterArray
      .map((params) => `(${params.join(`, `)})`)
      .join(`,\n`);

    const parametisedQuery = str.replace(regex, (_match) => {
      return valArray;
    });

    return parametisedQuery + ";";
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
