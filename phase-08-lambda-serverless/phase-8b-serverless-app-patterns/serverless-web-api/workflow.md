# Workflow

## Request Flow

```text
1. Client sends an HTTP request.
2. API Gateway matches the resource and method.
3. Lambda proxy integration builds the event object.
4. Lambda parses the request and runs the operation.
5. boto3 calls DynamoDB when persistence is required.
6. Lambda returns statusCode, headers, and a JSON-string body.
7. API Gateway returns the HTTP response to the client.
8. Lambda execution details are available in CloudWatch Logs.
```

## Build Order Followed

1. Understand the basic GET/POST API from video 59.
2. Test the Lambda event and proxy response format.
3. Add the DynamoDB table and primary key from video 65.
4. Create the Lambda execution role and table permissions.
5. Use boto3 to write and read task items.
6. Expand the design into six single-purpose Lambda functions.
7. Add `/tasks` and `/tasks/{id}` API Gateway resources.
8. Connect GET, POST, PUT, PATCH, and DELETE methods.
9. Deploy the API to a `dev` stage.
10. Test Lambda events first, then test the public API.
11. Inspect CloudWatch Logs for failures.
12. Clean up every resource after recording proof.

## Lambda Proxy Event Examples

POST:

```json
{
  "body": "{\"id\":\"1\",\"title\":\"Learn AWS\",\"status\":\"IN_PROGRESS\"}"
}
```

Path-based operation:

```json
{
  "pathParameters": {
    "id": "1"
  }
}
```

PATCH:

```json
{
  "pathParameters": {
    "id": "1"
  },
  "body": "{\"priority\":\"HIGH\"}"
}
```
