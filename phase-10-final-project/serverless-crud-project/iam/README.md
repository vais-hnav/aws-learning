# IAM Policies Used

The project used separate permissions for the person building the resources and
for the Lambda functions running the API.

## 1. Lambda Execution Role

Role name: `TasksCrudLambdaRole`

Trust policy: `lambda-trust-policy.json`

The trust policy allows the Lambda service to assume the role. It does not grant
access to DynamoDB by itself.

Attached AWS managed policy:

- `AWSLambdaBasicExecutionRole` grants the standard CloudWatch Logs permissions
  needed to create log groups/streams and write log events.

Inline policy: `lambda-dynamodb-policy.json`

This policy grants the six functions `Scan`, `Query`, `GetItem`, `PutItem`,
`UpdateItem`, and `DeleteItem` on the `Tasks` table and its indexes. It does not
grant permission to create or delete tables, APIs, functions, roles, or policies.

At runtime, boto3 automatically uses temporary credentials from this role.
There are no IAM user access keys in the Lambda code.

## 2. IAM User Project Policy

Policy template: `project-user-policy.json`

This is the policy used by the IAM user to build the project in the AWS Console.
It includes permissions to:

- Create and manage the `Tasks` DynamoDB table.
- Create and manage project Lambda functions matching `*_tasks` or `*_task`.
- Publish and manage Lambda layers.
- Create and configure the API Gateway REST API.
- Create/manage the project Lambda role and related basic execution policies.
- Pass the role to Lambda using `iam:PassRole`.
- View CloudWatch log groups, streams, and events.
- Use the code recommendation action included during the lab.

`iam:PassRole` is restricted with `iam:PassedToService = lambda.amazonaws.com`,
which prevents passing the role to an unrelated AWS service.

## Security Review

The execution role is the narrower runtime identity. The IAM user policy is a
temporary project/deployment policy and is more powerful because it can create
roles and policies, pass roles, and manage API Gateway resources.

The broadest parts are:

- `iam:CreateRole`, `iam:CreatePolicy`, and related policy-management actions.
- `iam:PassRole` for `service-role/*`.
- API Gateway management with `Resource: "*"`.
- Lambda layer and list/create operations that require `Resource: "*"`.

For this learning account, attach the user policy only while building or
cleaning up the project. Detach it afterward. In a long-lived environment,
replace the service-role wildcard with named project roles and add tag/name
conditions where AWS supports them.

## Template Values

The JSON files use `ACCOUNT_ID` instead of publishing the real AWS account ID.
Before using them, replace `ACCOUNT_ID` with the 12-digit account ID and confirm
that the Region, table name, function names, and role names match the account.
