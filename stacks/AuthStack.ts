import * as iam from "aws-cdk-lib/aws-iam";
import { use, Cognito } from "@serverless-stack/resources";

import type { StackContext } from "@serverless-stack/resources";

import { ApiStack } from "./ApiStack";
import { StorageStack } from "./StorageStack";

export function AuthStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);
  const { bucket } = use(StorageStack);

  const auth = new Cognito(stack, "Auth", {
    login: ["email"]
  });

  auth.attachPermissionsForAuthUsers(stack, [
    api,
    new iam.PolicyStatement({
      actions: ["s3:*"],
      effect: iam.Effect.ALLOW,
      resources: [bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*"]
    })
  ]);

  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId!,
    userPoolClientId: auth.userPoolClientId
  });

  return {
    auth
  };
}
