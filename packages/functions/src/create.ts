import { APIGatewayEvent } from "aws-lambda";
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { Table } from "sst/node/table";
import { v4 as uuidV4 } from "uuid";

import { APIGatewayProxyHandlerV2 } from "aws-lambda";


const client = new DynamoDBClient({});

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  console.log({ event });
  const data = JSON.parse(event.body ?? "{}");

  const params: PutItemCommandInput = {
    TableName: Table.GuestBook.tableName,
    Item: {
      userEmail: {
        S: data.email,
      },
      recordId: {
        S: uuidV4(),
      },
      content: {
        S: data.message,
      },
      userName: {
        S: data.name,
      },
    },
  };

  const command = new PutItemCommand(params);

  const results = await client.send(command);

  console.log({results})

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Success!",
    }),
  };
}
