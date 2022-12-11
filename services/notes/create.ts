import * as uuid from "uuid";
import { ApiHandler } from "@serverless-stack/node/api";
import { Table } from "@serverless-stack/node/table";

import dynamoDb from "../util/repo";

export const handler = ApiHandler(async (event) => {
  const data = JSON.parse(event.body ?? "");

  const input = {
    TableName: Table.Notes.tableName,
    Item: {
      userId: {
        S: "123"
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
