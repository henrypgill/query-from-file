import { ClientConfig, Pool } from "pg";
import { FileQuery } from "./fileQuery";
import { checkValidFilePath } from "./utils";


export class DatabasePool extends Pool {
    filePath: string;
  
    constructor(config: ClientConfig, queryDirectory: string) {
      super(config);
      this.filePath = checkValidFilePath(queryDirectory) ? queryDirectory : "";
    }
  
    async fileQuery<S, T extends (number | string)[]>(path: string, values?: T) {
      try {
        const query = new FileQuery(`./${this.filePath}/${path}.sql`);
        if (values) {
          if (values.length !== query.valuesCount)
            throw new Error(
              `incorrect number of values passed to query: ${query.path}, received ${values.length} values but expected ${query.valuesCount} values.`
            );
          const response = await this.query<S, T>(query.queryString, values);
          return response
        } else {
          const response = await this.query(query.queryString);
          return response
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  