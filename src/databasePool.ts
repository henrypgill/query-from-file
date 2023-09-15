import { ClientConfig, Pool } from "pg";
import { FileQuery } from "./fileQuery";
import { checkValidFilePath } from "./utils";



export class DatabaseClient extends Pool {
  parentDirectory: string;

  constructor(config: ClientConfig, queryDirectory: string) {
    super(config);
    this.parentDirectory = checkValidFilePath(queryDirectory) ? queryDirectory : "";
  }

  async fileQuery<RowType, ValueType extends unknown[] = unknown[]>(path: string, values?: ValueType) {
    try {
      const query = new FileQuery(`./${this.parentDirectory}/${path}.sql`);
      if (values) {
        if (values.length !== query.valuesCount)
          throw new Error(
            `incorrect number of values passed to query: ${query.path}, received ${values.length} values but expected ${query.valuesCount} values.`
          );
        const response = await this.query<RowType, ValueType>(query.queryString, values);
        return response
      } else {
        const response = await this.query<RowType>(query.queryString);
        return response
      }
    } catch (error) {
      console.log(error);
    }
  }
}
