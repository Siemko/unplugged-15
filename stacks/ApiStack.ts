import { Api, StackContext, Table } from "sst/constructs";

export function ApiStack({ stack }: StackContext) {
  // Create the table
  const table = new Table(stack, "GuestBook", {
    fields: {
      userEmail: "string",
      recordId: "string",
    },
    primaryIndex: { partitionKey: "userEmail", sortKey: "recordId" },
  });

  // Create the HTTP API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        // Bind the table name to our API
        bind: [table],
      },
    },
    routes: {
      "GET    /guestbook": "packages/functions/src/list.main",
      "POST   /guestbook": "packages/functions/src/create.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  return { table, api };
}
