# Explanation

## API Gateway

API Gateway owns the public URL, paths, methods, deployment stage, and Lambda
integration. `/tasks` and `/tasks/{id}` are resources; GET, POST, PUT, PATCH,
and DELETE are methods attached to those resources.

## Lambda

Lambda executes backend code only when invoked. One function per operation made
the project easier to learn and debug because each function has one clear job.

## DynamoDB

DynamoDB stores task items. The `id` string is the partition key and uniquely
identifies a task. Other attributes can vary between items because DynamoDB is
schemaless outside the key definition.

## boto3

boto3 is the Python SDK used by Lambda to call DynamoDB. In Lambda it receives
temporary credentials from the execution role automatically; access keys do not
belong in source code or the Lambda layer.

## Lambda Layer

The layer packages `python/config.py` with `TABLE_NAME = "Tasks"`. All six
functions import the same value, avoiding six hardcoded table-name copies.

## PUT And PATCH In This Lab

The PUT route follows the supplied project contract and updates the required
`status` and `updatedAt` fields. PATCH dynamically updates only fields present
in the request and can add new attributes. In a stricter REST design, PUT often
means replacing the complete resource; this project intentionally uses the
narrower documented behavior.
