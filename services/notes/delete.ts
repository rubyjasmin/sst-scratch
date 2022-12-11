import { ApiHandler } from "@serverless-stack/node/api";
import { Table } from "@serverless-stack/node/table";

import dynamoDb from "../util/repo";

export const handler = ApiHandler(async (event) => {
  const input = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: {
        S: "123"
      },
      noteId: {
        S: event.pathParameters!.id!
      }
    }
  };

  await dynamoDb.delete(input);

  return { statusCode: 200, body: { status: true } };
});
