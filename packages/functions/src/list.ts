import { APIGatewayEvent } from "aws-lambda";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb"
import { Table } from "sst/node/table";

const client = new DynamoDBClient({});

export async function main(event: APIGatewayEvent) {

  const params = {
    TableName: Table.GuestBook.tableName,
  }

  const command = new ScanCommand(params);

  const results = await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: results.Items,
    }),
  };
}
