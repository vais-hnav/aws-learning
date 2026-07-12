# Phase 8B: Serverless App Patterns

Goal:
Build API-style serverless patterns using Lambda, API Gateway, and DynamoDB.

Status: Complete on 2026-07-12.

Videos:

- 59. Serverless Web API using Lambda and API Gateway.
- 65. Complete serverless API with API Gateway, Lambda, and DynamoDB.

What these videos established:

- API Gateway provides HTTP routes and forwards requests to Lambda.
- Lambda proxy integration passes request details in the `event` dictionary.
- Lambda must return a proxy-compatible response with `statusCode`, `headers`,
  and a string `body`.
- DynamoDB adds persistent storage to an otherwise stateless API.
- boto3 lets Lambda call DynamoDB operations such as `put_item`.
- The Lambda execution role needs both CloudWatch logging and DynamoDB access.

Labs:

- `serverless-web-api/`
- Extended project: `../../phase-10-final-project/serverless-crud-project/`

Phase proof:

- Watched both videos.
- Built the concepts into the Phase 10 Serverless Tasks CRUD API.
- Used six Lambda functions, API Gateway routes, DynamoDB, a Lambda layer,
  CloudWatch Logs, and separate IAM permissions for execution and deployment.
- Added direct Lambda tests and HTTP endpoint test commands.

Notes:

- `phase-notes.md`
- `serverless-web-api/explanation.md`
- `serverless-web-api/workflow.md`
- `serverless-web-api/mistakes.md`

Safety:

- Delete public APIs, Lambda functions, log groups, and DynamoDB test tables after practice.
