# Serverless Tasks CRUD API

This project stores tasks in DynamoDB and exposes them through six Lambda
functions connected to an API Gateway REST API.

## Architecture

```text
Client -> API Gateway -> Lambda -> DynamoDB Tasks table
                              -> Lambda layer (config.py)
```

## API routes

| Method | Route | Lambda | Purpose |
|---|---|---|---|
| `GET` | `/tasks` | `get_tasks` | Return every task |
| `POST` | `/tasks` | `create_task` | Create a task from the request body |
| `GET` | `/tasks/{id}` | `get_task` | Return one task |
| `PUT` | `/tasks/{id}` | `put_task` | Update the task status and `updatedAt` |
| `PATCH` | `/tasks/{id}` | `update_task` | Update only the supplied fields |
| `DELETE` | `/tasks/{id}` | `delete_task` | Delete one task |

Every response has a JSON body and a `Content-Type: application/json` header.
Successful responses contain a message and either `item` or `items`. Error
responses contain a descriptive `message`.

## Request examples

Create a task:

```json
{
  "id": "1",
  "title": "Learn AWS",
  "status": "IN_PROGRESS"
}
```

Update its status and timestamp with PUT:

```json
{
  "status": "DONE",
  "updatedAt": "2026-07-12"
}
```

Partially update selected attributes with PATCH:

```json
{
  "status": "DONE",
  "updatedAt": "2026-07-12"
}
```

The PUT handler in this lab expects both `status` and `updatedAt`. The PATCH
body may contain any one or more fields: existing fields are changed and new
fields are added. Neither route permits the task `id` to be changed.

## Shared configuration layer

The `tasks_table_layer/python/config.py` file defines `TABLE_NAME`. Zip the
`python` directory and attach the resulting layer to all six functions.

## IAM permissions

The project uses two separate permission identities:

- `TasksCrudLambdaRole` is assumed by the six Lambda functions. It uses
  `AWSLambdaBasicExecutionRole` for CloudWatch Logs and a table-scoped inline
  policy for DynamoDB CRUD operations.
- The IAM user used for the lab has a project/deployment policy that allows the
  required DynamoDB, Lambda, layer, API Gateway, IAM, PassRole, and log-view
  operations.

See `iam/README.md` for the permission explanation and sanitized policy copies.

## API Gateway setup

Use Lambda proxy integration for every route. Deploy the REST API to a stage
such as `dev`, then test it with the commands in `api-test-commands.md`.

## Project documentation

- `project-notes.md`: concepts learned and hands-on decisions.
- `approach.md`: architecture and code design approach.
- `project-plan.md`: build, test, and cleanup sequence.
- `iam/README.md`: execution-role and IAM user policy explanation.

## Cleanup

Delete the API Gateway REST API, all six Lambda functions, the custom Lambda
layer versions, the `Tasks` DynamoDB table, and the project execution role when
the lab is complete.
