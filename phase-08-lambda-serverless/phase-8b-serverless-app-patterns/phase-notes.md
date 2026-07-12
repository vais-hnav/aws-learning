# Phase 8B Notes: Serverless Web APIs

These notes are based on playlist videos 59 and 65, their descriptions, the
supplied project walkthrough, and the hands-on Serverless Tasks CRUD API.

## Video 59: Serverless Web API Using Lambda And API Gateway

### Main idea

A Lambda function can run backend code, but it does not automatically provide
an HTTP URL. API Gateway becomes the public entry point. It receives an HTTP
request, converts it into a Lambda event, invokes the function, and converts the
function's returned dictionary into an HTTP response.

```text
Postman or curl -> API Gateway route -> Lambda -> JSON HTTP response
```

The video starts with GET and POST operations so that both sides of the request
flow are visible:

- GET usually reads input from the URL or query string and returns data.
- POST sends a JSON request body to create or process data.
- API Gateway resources define URL paths such as `/users` or `/tasks`.
- API Gateway methods define which HTTP verbs are accepted on each resource.
- A deployment stage such as `dev` creates the callable API URL.

### Lambda proxy integration

With Lambda proxy integration, API Gateway forwards request information in the
`event` object instead of requiring a separate mapping template. Important
fields include:

- `event["body"]`: the request body, normally received as a JSON string.
- `event["pathParameters"]`: values captured from paths such as `/tasks/{id}`.
- `event["queryStringParameters"]`: URL query parameters when supplied.
- HTTP method and request context fields that describe the incoming request.

Because `event["body"]` is a string, Python code uses `json.loads()` before
reading fields from it. The response body works in the opposite direction: it
must normally be converted to a JSON string using `json.dumps()`.

Proxy response shape:

```python
return {
    "statusCode": 200,
    "headers": {"Content-Type": "application/json"},
    "body": json.dumps({"message": "Request completed"}),
}
```

Returning a Python dictionary directly inside `body`, returning malformed JSON,
or omitting the expected proxy fields can produce an API Gateway error even
when the Lambda code itself ran.

### Testing and deployment lessons

- Test the Lambda first with a representative event to isolate code problems.
- Test the deployed endpoint with Postman or curl to verify the full path.
- Deploy or redeploy the API after changing routes or integrations.
- Check the selected stage and invoke URL when an endpoint appears unchanged.
- Use CloudWatch Logs to distinguish Lambda errors from API configuration errors.

## Video 65: Complete Serverless API With DynamoDB

### Adding persistence

Video 65 extends the API Gateway and Lambda flow with DynamoDB. Lambda remains
stateless: data that must survive between invocations is stored in a DynamoDB
table.

```text
Client -> API Gateway -> Lambda -> DynamoDB
                              -> CloudWatch Logs
```

The walkthrough creates a DynamoDB table with a primary key, gives Lambda an
execution role that can access the table, and uses Python boto3 to write an item
with `put_item`.

Core boto3 pattern:

```python
dynamodb = boto3.resource("dynamodb", region_name="ap-south-2")
table = dynamodb.Table("Tasks")
table.put_item(Item=item)
```

The table's partition key is part of the data model, not just a required form
field. For the Tasks table, `id` uniquely identifies each item. Sending the
parsed POST body directly as `Item` allows DynamoDB to store additional task
attributes without rebuilding the dictionary, while validation still ensures
that `id` exists.

### IAM lesson

There are two permission contexts in this project:

- The IAM user creates and configures AWS resources. Its project policy permits
  selected DynamoDB, Lambda, API Gateway, IAM, layer, and log-view operations.
- The Lambda execution role is assumed by the Lambda service while code runs.
  It receives CloudWatch Logs access and table-level DynamoDB permissions.

The user's credentials are never placed inside Lambda code. boto3 automatically
uses the Lambda execution role's temporary credentials in the managed runtime.

## Hands-On Extension: Phase 10 CRUD API

The Phase 10 project expands the two videos into a complete Tasks API:

| Method | Route | Function | DynamoDB operation |
|---|---|---|---|
| `GET` | `/tasks` | `get_tasks` | `Scan` |
| `POST` | `/tasks` | `create_task` | `PutItem` |
| `GET` | `/tasks/{id}` | `get_task` | `GetItem` |
| `PUT` | `/tasks/{id}` | `put_task` | `UpdateItem` |
| `PATCH` | `/tasks/{id}` | `update_task` | `UpdateItem` |
| `DELETE` | `/tasks/{id}` | `delete_task` | `DeleteItem` |

Additional work completed beyond the basic video flow:

- Used a Lambda layer containing `config.py` so all functions import the same
  `TABLE_NAME` value.
- Kept one Lambda function per route to make each operation easy to understand.
- Standardized success and error responses with JSON headers and messages.
- Prevented POST from silently replacing an existing task by using
  `attribute_not_exists(id)`.
- Prevented PUT and PATCH from creating a missing task by using
  `attribute_exists(id)`.
- Added scan pagination so GET all can continue after DynamoDB's 1 MB page.
- Kept PUT and PATCH separate: PUT follows this lab's fixed status/timestamp
  contract, while PATCH updates only the fields supplied and can add attributes.

## Key Understanding

- API Gateway controls the HTTP interface; Lambda contains application logic;
  DynamoDB stores state.
- Lambda proxy integration makes the event and response format part of the API
  contract.
- A successful Lambda console test does not prove API Gateway is configured
  correctly; both layers need testing.
- The human user policy and runtime execution-role policy solve different
  problems and should not be combined.
- Permissions should be removed or reduced after the hands-on project.
