import { ApiHandler } from "@serverless-stack/node/api";
import { Table } from "@serverless-stack/node/table";

import dynamoDb from "../util/repo";

export const handler = ApiHandler(async (event) => {
  const input = {
    TableName: Table.Notes.tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": {
        S: "123"
      }
    }
  };

  const result = await dynamoDb.query(input);

  if (!result.Items) {
    throw new Error("No items found.");
  }

  return result.Items;
});
