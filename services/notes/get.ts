import { ApiHandler } from "@serverless-stack/node/api";
import { Table } from "@serverless-stack/node/table";

import dynamoDb from "../util/repo";

export const handler = ApiHandler(async (event) => {
  const inputs = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: {
        S: event.requestContext.authorizer.iam.cognitoIdentity.identityId
      },
      noteId: {
        S: event.pathParameters!.id!
      }
    }
  };

  const result = await dynamoDb.get(inputs);

  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return result.Item;
});
