import * as uuid from "uuid";
import { ApiHandler } from "@serverless-stack/node/api";
import { Table } from "@serverless-stack/node/table";
import { APIGatewayProxyEventV2WithLambdaAuthorizer } from "aws-lambda";
import dynamoDb from "../util/repo";

export const handler = ApiHandler(async (event) => {
  const data = JSON.parse(event.body ?? "");
  console.log("🚀 ~ file: create.ts:11 ~ handler ~ session", event.requestContext.authorizer);

  const input = {
    TableName: Table.Notes.tableName,
    Item: {
      userId: {
        S: event.requestContext.authorizer.iam.cognitoIdentity.identityId
      },
      noteId: {
        S: uuid.v1()
      },
      content: {
        S: data.content
      },
      attachment: {
        S: data.attachment
      },
      createdAt: {
        N: Date.now().toString()
      }
    }
  };

  try {
    await dynamoDb.put(input);

    return {
      statusCode: 200,
      body: JSON.stringify(input.Item)
    };
  } catch (e: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
});
