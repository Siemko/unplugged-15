import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import * as uuid from "uuid";
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDBClient();

import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const data = JSON.parse(event.body ?? "{}");

  const params = {
    TableName: Table.GuestBook.tableName,
    Item: {
      userName: {
        S: data.name,
      },
      userEmail: {
        S: data.email,
      },
      recordId: {
        S: uuid.v4(),
      },
      content: {
        S: data.message,
      },
    },
  };
  await dynamoDb.send(new PutItemCommand(params));

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
};
