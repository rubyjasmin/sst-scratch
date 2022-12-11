import { use, Api } from "@serverless-stack/resources";

import type { StackContext } from "@serverless-stack/resources";

import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }: StackContext) {
  const { table } = use(StorageStack);

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [table]
      }
    },
    routes: {
      "GET /notes": "notes/list.handler",
      "POST /notes": "notes/create.handler",
      "GET /notes/{id}": "notes/get.handler",
      "PUT /notes/{id}": "notes/update.handler",
      "DELETE /notes/{id}": "notes/delete.handler"
    }
  });

  stack.addOutputs({
    ApiEndpoint: api.url
  });

  return {
    api
  };
}
