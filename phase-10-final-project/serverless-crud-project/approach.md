# Project Approach

## 1. Start With The Request Flow

The project first established the complete request path before expanding CRUD:

```text
HTTP request -> API Gateway -> Lambda event -> Lambda response -> HTTP response
```

After that worked, DynamoDB was added behind Lambda for persistent task data.

## 2. Keep AWS Responsibilities Separate

- API Gateway owns paths, methods, stage deployment, and the invoke URL.
- Lambda owns validation, application behavior, DynamoDB calls, and responses.
- DynamoDB owns task storage and the `id` key constraint.
- IAM controls who can deploy resources and what Lambda can do at runtime.
- CloudWatch stores function logs for debugging.

## 3. Use One Function Per Operation

Six small functions were used instead of one router function. This creates more
AWS resources, but it keeps the beginner learning path clear: each API method
maps directly to one handler and one DynamoDB operation.

## 4. Centralize Shared Configuration

The table name is stored in a Lambda layer rather than repeated in every source
file. Each function imports `TABLE_NAME` from `config.py`.

The layer is appropriate for shared non-secret configuration in this lab. Real
secrets must not be stored in the layer or committed to Git.

## 5. Define A Consistent API Contract

- Success responses contain a message and `item` or `items`.
- Client input errors return `400`.
- Missing tasks return `404`.
- Duplicate IDs return `409`.
- Every response declares JSON content and serializes the body.

## 6. Apply Safe DynamoDB Behavior

- POST uses a conditional put to protect existing IDs.
- GET one checks whether `Item` exists.
- PUT and PATCH use conditional updates to reject missing IDs.
- DELETE requests old values so the API can distinguish deleted from missing.
- GET all follows scan pagination.

## 7. Separate Human And Runtime Permissions

The IAM user was allowed to create and configure project resources. The Lambda
role received only logging and Tasks-table runtime access. This separation keeps
deployment authority out of the running application.

## 8. Test In Layers

1. Test each Lambda with a console event.
2. Confirm the DynamoDB item or response.
3. Inspect CloudWatch Logs.
4. Connect the API Gateway method.
5. Deploy the `dev` stage.
6. Test the endpoint with Postman or curl.

This order makes it easier to tell whether a failure belongs to the code, IAM,
DynamoDB, API integration, or deployment stage.
