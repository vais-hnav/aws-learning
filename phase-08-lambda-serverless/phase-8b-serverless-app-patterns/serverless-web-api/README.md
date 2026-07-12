# Serverless Web API

## What Did I Build?

I learned the Lambda and API Gateway request/response pattern from video 59 and
extended it after video 65 into the Phase 10 Serverless Tasks CRUD API.

## Which AWS Services Did I Use?

- API Gateway REST API for routes and deployment stages.
- Lambda for backend request handling.
- DynamoDB for persistent task data.
- IAM for user and Lambda execution permissions.
- CloudWatch Logs for execution logs and debugging.
- Lambda Layers for shared table configuration.

## What Did I Learn?

- How HTTP methods and resources map to Lambda functions.
- How Lambda proxy integration shapes `event` and the returned response.
- Why `event["body"]` must be parsed and the response `body` must be serialized.
- How boto3 uses the Lambda execution role to access DynamoDB.
- How to test Lambda independently before testing the deployed endpoint.

## How Do I Run It?

Use the implementation and setup notes in
`../../../phase-10-final-project/serverless-crud-project/`. Attach the shared
layer and execution role to each function, connect the six API methods with
Lambda proxy integration, deploy a `dev` stage, and run the curl commands in
that project's `api-test-commands.md`.

## How Do I Delete It?

Follow `cleanup.md`. Remove the API first, followed by Lambda functions, layer
versions, log groups, DynamoDB table, and temporary IAM permissions.
