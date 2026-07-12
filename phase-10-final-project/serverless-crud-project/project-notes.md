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

## Understanding Function Parameters And Structures

### Lambda handler parameters

Every Lambda starts from a handler with this structure:

```python
def lambda_handler(event, context):
```

- `event` is a Python dictionary containing input from the service that invoked
  Lambda. With API Gateway proxy integration, it can contain `body`,
  `pathParameters`, `queryStringParameters`, headers, request information, and
  other HTTP details.
- `context` is an object supplied by Lambda. It contains runtime information
  such as the function name, request ID, memory limit, and remaining execution
  time. This project does not need to read it, but Lambda still passes it.

Example event for `PATCH /tasks/1`:

```json
{
  "pathParameters": {
    "id": "1"
  },
  "body": "{\"status\":\"DONE\",\"priority\":\"HIGH\"}"
}
```

`event["body"]` is a JSON string, not yet a Python dictionary. The handler uses
`json.loads()` to convert it before reading or iterating over its attributes.

### Anatomy of the PATCH `update_item` call

```python
result = table.update_item(
    Key={"id": task_id},
    UpdateExpression="SET " + ", ".join(update_parts),
    ExpressionAttributeNames=attribute_names,
    ExpressionAttributeValues=attribute_values,
    ConditionExpression="attribute_exists(id)",
    ReturnValues="ALL_NEW",
)
```

`table.update_item(...)` calls DynamoDB's UpdateItem operation through the boto3
Table resource. The values inside the parentheses are named, or keyword,
arguments. Writing `Key=...` makes it clear which DynamoDB parameter receives
each Python value, and the arguments can be kept on separate lines.

The trailing comma after the last argument is valid Python and makes future
arguments or formatting changes easier.

#### `Key={"id": task_id}`

`Key` identifies exactly which DynamoDB item should be updated.

```python
Key={
    "id": task_id
}
```

- `id` is the partition-key attribute defined when the `Tasks` table was created.
- `task_id` is the value extracted from `event["pathParameters"]["id"]`.
- Because this table has only a partition key, only `id` is required.
- A table with a composite primary key would require both its partition key and
  sort key in this dictionary.
- The key value's type must match the table key type. Here, `id` is a string.

#### `UpdateExpression`

`UpdateExpression` tells DynamoDB what change to make. The PATCH handler builds
it dynamically because the request may contain any set of attributes.

```python
UpdateExpression="SET " + ", ".join(update_parts)
```

`SET` means create an attribute if it does not exist or replace its value if it
already exists. Other DynamoDB update actions include `REMOVE`, `ADD`, and
`DELETE`, but this handler only needs `SET`.

If `update_parts` contains:

```python
[
    "#field0 = :value0",
    "#field1 = :value1",
]
```

then `", ".join(update_parts)` produces:

```text
#field0 = :value0, #field1 = :value1
```

and the final expression becomes:

```text
SET #field0 = :value0, #field1 = :value1
```

#### `ExpressionAttributeNames`

```python
ExpressionAttributeNames=attribute_names
```

This dictionary maps name placeholders beginning with `#` to real DynamoDB
attribute names.

```python
{
    "#field0": "status",
    "#field1": "priority",
}
```

Placeholders protect the expression when a real attribute name is a DynamoDB
reserved word or contains characters that are awkward in an expression. The
expression uses `#field0`, but DynamoDB understands that it means `status`.

#### `ExpressionAttributeValues`

```python
ExpressionAttributeValues=attribute_values
```

This dictionary maps value placeholders beginning with `:` to the real values
that should be stored.

```python
{
    ":value0": "DONE",
    ":value1": "HIGH",
}
```

Values are passed separately instead of being inserted directly into the update
expression. boto3 converts supported Python values into DynamoDB attribute-value
types.

The names and values work together like this:

```text
#field0 = :value0  ->  status = "DONE"
#field1 = :value1  ->  priority = "HIGH"
```

#### `ConditionExpression="attribute_exists(id)"`

The condition must be true before DynamoDB performs the update.

`attribute_exists(id)` checks that the target item already has the `id`
attribute. Because `id` is the primary key, this is effectively a check that the
task exists.

Without this condition, `UpdateItem` can create a new item when the supplied key
does not already exist. That could produce an incomplete task containing only
`id` and the patched fields.

When the condition is false, DynamoDB raises
`ConditionalCheckFailedException`. The handler catches that exception and
returns HTTP `404` with `Task not found`.

#### `ReturnValues="ALL_NEW"`

`ReturnValues` controls which item attributes DynamoDB includes in its response.

- `NONE` is the default and returns no item attributes.
- `ALL_OLD` returns the complete item before the update.
- `UPDATED_OLD` returns the old values of only the changed attributes.
- `ALL_NEW` returns the complete item after the update.
- `UPDATED_NEW` returns the new values of only the changed attributes.

This project uses `ALL_NEW` so the API can return the complete updated task.

### Structure of the returned `result`

The value assigned to `result` is a Python dictionary returned by boto3. With
`ReturnValues="ALL_NEW"`, its important structure is:

```python
{
    "Attributes": {
        "id": "1",
        "title": "Learn AWS",
        "status": "DONE",
        "priority": "HIGH",
    },
    "ResponseMetadata": {
        # Request ID, HTTP status, and SDK retry metadata.
    },
}
```

The handler reads `result["Attributes"]` to obtain the updated item. The
`ResponseMetadata` section is normally useful for diagnostics rather than the
public API response.

### How the placeholder dictionaries are built

For this PATCH body:

```json
{
  "status": "DONE",
  "priority": "HIGH"
}
```

the loop processes each name/value pair:

```python
for index, (attribute, value) in enumerate(body.items()):
    name_placeholder = f"#field{index}"
    value_placeholder = f":value{index}"

    update_parts.append(f"{name_placeholder} = {value_placeholder}")
    attribute_names[name_placeholder] = attribute
    attribute_values[value_placeholder] = value
```

Iteration 0 creates the placeholders for `status`; iteration 1 creates the
placeholders for `priority`. The resulting expression and dictionaries are sent
together, allowing DynamoDB to substitute every placeholder safely.

### Parameters used by the other table operations

`put_item`:

```python
table.put_item(
    Item=item,
    ConditionExpression="attribute_not_exists(id)",
)
```

- `Item` is the complete Python dictionary to store.
- The condition prevents replacing a task that already uses the same `id`.

`get_item`:

```python
table.get_item(Key={"id": task_id})
```

- `Key` identifies one item.
- A found item appears under `result["Item"]`; a missing item has no `Item` key.

`delete_item`:

```python
table.delete_item(
    Key={"id": task_id},
    ReturnValues="ALL_OLD",
)
```

- `Key` identifies the item to delete.
- `ALL_OLD` returns the deleted item, allowing the handler to detect whether it
  existed and include it in the response.

`scan`:

```python
table.scan(ExclusiveStartKey=last_key)
```

- `Scan` reads items across the table rather than selecting one primary key.
- `ExclusiveStartKey` tells DynamoDB where the next page should begin.
- The returned `LastEvaluatedKey` means another page is available.

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
