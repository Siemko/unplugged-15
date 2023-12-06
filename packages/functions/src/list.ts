import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb"
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDBClient({});

export async function main() {
  const params = {
    TableName: Table.GuestBook.tableName,
  };
  const body = new ScanCommand(params);
  const results = await dynamoDb.send(body);

  return {
    statusCode: 200,
    body: JSON.stringify(results.Items),
  };
}
