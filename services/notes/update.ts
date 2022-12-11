import { ApiHandler } from "@serverless-stack/node/api";
import { Table } from "@serverless-stack/node/table";

import dynamoDb from "../util/repo";

export const handler = ApiHandler(async (event) => {
  const data = JSON.parse(event.body ?? "");

  const input = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: {
        S: event.requestContext.authorizer.iam.cognitoIdentity.identityId
      },
      noteId: {
        S: event.pathParameters!.id!
      }
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": {
        S: data.attachment || null
      },
      ":content": {
        S: data.content || null
      }
    },
    ReturnValues: "ALL_NEW"
  };

  const result = await dynamoDb.update(input);

  return result;
});
