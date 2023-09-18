import { Client, ClientConfig, QueryResult, QueryResultRow } from "pg";
import { DynamicFileQuery, FileQuery } from "./fileQuery";
import { checkValidFilePath } from "./utils";

export class DatabaseClient extends Client {
  parentDirectory: string;

  constructor(config: ClientConfig, queryDirectory: string) {
    super(config);
    this.parentDirectory = checkValidFilePath(queryDirectory)
      ? queryDirectory
      : "";
  }

  async fileQuery<
    RowType extends QueryResultRow = any,
    ValueType extends any[] = any[]
  >(path: string, values?: ValueType): Promise<QueryResult<RowType>> {
    try {
      const query = new FileQuery(`./${this.parentDirectory}/${path}.sql`);
      if (values) {
        if (values.length !== query.valuesCount)
          throw new Error(
            `incorrect number of values passed to query: ${query.path}, received ${values.length} values but expected ${query.valuesCount} values.`
          );
        const response = await this.query<RowType, ValueType>(
          query.queryString,
          values
        );
        return response;
      }
      const response = await this.query<RowType>(query.queryString);
      return response;
    } catch (error) {
      console.log(error);
      return {} as Promise<QueryResult<RowType>>;
    }
  }

  async dynamicQuery<
    RowType extends QueryResultRow = any,
    ValueType extends any[] = any[]
  >(
    path: string,
    values: ValueType,
    parameters: string[],
    numberOfValues: number,
    startingNumber: number
  ): Promise<QueryResult<RowType>> {
    try {
      const query = new DynamicFileQuery(
        `./${this.parentDirectory}/${path}.sql`,
        parameters,
        numberOfValues,
        startingNumber
      );
      if (values.length !== query.valuesCount)
        throw new Error(
          `incorrect number of values passed to query: ${query.path}, received ${values.length} values but expected ${query.valuesCount} values.`
        );

      const response = await this.query<RowType, ValueType>(
        query.queryString,
        values
      );
      return response;
    } catch (error) {
      console.log(error);
      return {} as Promise<QueryResult<RowType>>;
    }
  }
}
