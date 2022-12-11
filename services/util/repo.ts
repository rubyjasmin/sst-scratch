import { DynamoDBClient, DeleteItemCommand, GetItemCommand, PutItemCommand, QueryCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

import type { DeleteItemInput, GetItemInput, PutItemInput, QueryCommandInput, UpdateItemInput } from "@aws-sdk/client-dynamodb";

const db = new DynamoDBClient({});

export default {
  get: (input: GetItemInput) => db.send(new GetItemCommand(input)),
  put: (input: PutItemInput) => db.send(new PutItemCommand(input)),
  query: (input: QueryCommandInput) => db.send(new QueryCommand(input)),
  update: (input: UpdateItemInput) => db.send(new UpdateItemCommand(input)),
  delete: (input: DeleteItemInput) => db.send(new DeleteItemCommand(input))
};
