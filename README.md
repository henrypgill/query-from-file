# Query From File

The purpose of this package is to create a wrapper around the existing node postgres' Client and Pool classes to provide extra functionality.

## Quick Start

### Installation

using npm:
```BASH
npm install query-from-file
```

using yarm:
```BASH
yarn add query-from-file
```

### Usage

simply use the DatabaseClient or DatabasePool classes in place of pg's Client and Pool classes respectively.
Client:
```JavaScript
import { DatabaseClient } from "query-from-file"

const dbClientConfig = {
    /* the config you would use for a pg Client */
    };

const queryDirectory = "./src/queries";
const dbClient = new DatabaseClient(dbClientConfig, queryDirectory);
```
Pool:
```JavaScript
import { DatabasePool } from "query-from-file"

const dbClientConfig = {
    /* the config you would use for a pg Client */
    };
const queryDirectory = "./src/queries";
const dbPool = new DatabasePool(dbClientConfig, queryDirectory);
```

Once you have created your client, use it to query as you would normally, or query from a file.


## Functionality
When specifying the filename to query from, do not include:
- file endings such as .sql (such as select_users.sql).
- path parameters before the query directory provided when creating the class (such as src/select_users).

```JavaScript
const response = dbClient.fileQuery("select_users")
```

### Parametised Queries
For queries that utilise parametised values, pass them to the query or fileQuery methods as normal.

There are some conditions around using parametised queries with the fileQuery method:
- the query file should have the parametised values within it.
- the values passed should either be of type number, or string.

```SQL
SELECT * FROM users WHERE id=$1 OR name=$2;
```

```JavaScript
const response = dbClient.fileQuery("select_users", [1, "john"]);
```