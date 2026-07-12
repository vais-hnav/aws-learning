# Project Notes

## What I Built

I built a serverless Tasks CRUD API based on the API Gateway, Lambda, boto3,
IAM, and DynamoDB workflows from playlist videos 59 and 65.

```text
Postman or curl
      |
      v
API Gateway REST API (TasksApi, dev stage)
      |
      v
Six Lambda functions ----> CloudWatch Logs
      |
      v
DynamoDB Tasks table
```

A shared Lambda layer contains `python/config.py` and exposes
`TABLE_NAME = "Tasks"` to every function.

## Resources Used

- DynamoDB table: `Tasks` with string partition key `id`.
- REST API: `TasksApi` with `/tasks` and `/tasks/{id}` resources.
- Lambda layer: `tasks-layer` for shared table configuration.
- Lambda execution role: `TasksCrudLambdaRole`.
- Six Lambda functions: `get_tasks`, `create_task`, `get_task`, `put_task`,
  `update_task`, and `delete_task`.
- CloudWatch log groups created for Lambda execution logs.

## Route Behavior

| Method | Route | Behavior |
|---|---|---|
| `GET` | `/tasks` | Scan and return all tasks with pagination |
| `POST` | `/tasks` | Store the request body as a new task |
| `GET` | `/tasks/{id}` | Retrieve one task by partition key |
| `PUT` | `/tasks/{id}` | Require and update `status` and `updatedAt` |
| `PATCH` | `/tasks/{id}` | Update only supplied fields or add attributes |
| `DELETE` | `/tasks/{id}` | Delete and return the previous task |

## Important Code Decisions

### POST body as the DynamoDB item

The POST handler parses the API Gateway body and passes the resulting dictionary
directly to `put_item`. This means extra valid attributes are stored without
changing the Lambda code. The handler still verifies that an `id` exists.

`ConditionExpression="attribute_not_exists(id)"` prevents a duplicate ID from
silently overwriting an existing task. A duplicate returns HTTP `409`.

### PUT and PATCH are separate

PUT follows this project's supplied contract: both `status` and `updatedAt` are
required. PATCH accepts any non-empty set of fields, removes `id` from the body,
and dynamically builds an update expression.

Expression attribute-name placeholders such as `#field0` prevent attribute
names from colliding with DynamoDB reserved words. Value placeholders such as
`:value0` keep values separate from the expression text.

Both handlers use `attribute_exists(id)` so an update to an unknown ID returns
`404` instead of creating an incomplete item.

### Formatted API responses

Every function returns the same basic proxy response:

```python
{
    "statusCode": status_code,
    "headers": {"Content-Type": "application/json"},
    "body": json.dumps(payload, indent=2, default=str),
}
```

The body is a JSON string because API Gateway proxy integration expects it.
`default=str` handles DynamoDB values that the standard JSON encoder cannot
serialize directly.

### GET all pagination

DynamoDB `Scan` returns at most 1 MB per call. The handler checks
`LastEvaluatedKey` and passes it back as `ExclusiveStartKey` until no page
remains.

## IAM Understanding

The project did not use IAM user access keys inside Lambda code.

- The IAM user policy allowed the human user to build and manage the project.
- The Lambda execution role allowed running functions to write logs and access
  only the Tasks table and its indexes.
- `iam:PassRole` was required so the user could assign
  `TasksCrudLambdaRole` to Lambda, with a condition limiting the destination
  service to `lambda.amazonaws.com`.

The IAM user project policy is intentionally broader than the runtime role. It
should be detached after the lab or narrowed before long-term use.

## What I Learned

- Serverless removes server management, not application design or permissions.
- API Gateway route configuration and Lambda code are separate failure points.
- DynamoDB key design determines how items are addressed.
- Lambda roles use temporary credentials automatically through boto3.
- IAM user permissions for deployment must not be confused with runtime role
  permissions.
- Conditions make create and update behavior safer and more predictable.
- CloudWatch Logs are the first place to inspect backend failures.
