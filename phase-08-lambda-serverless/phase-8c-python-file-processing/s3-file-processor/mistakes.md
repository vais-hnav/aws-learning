# Mistakes And Fixes

## `NoCredentialsError`

boto3 could not find usable AWS credentials. Run with a configured profile, for example `AWS_PROFILE=user1 python ...`, or use an IAM role when the code runs in Lambda.

## All Buckets Appear After Changing Region

This is expected. `list_buckets` is an account-level listing operation. Use `get_bucket_location` to identify each bucket's Region.

## `LocationConstraint` Is `None`

For an S3 bucket in `us-east-1`, the API returns `None`. Normalize it to `us-east-1` when displaying the Region.

## Owner Display Name Is Missing

Some responses do not include `Owner.DisplayName`. Use `.get()` and treat it as optional. The canonical owner ID may still be present.

## VS Code Cannot Resolve boto3

Select the repository interpreter at `.venv/bin/python`, then reload the Python language server or VS Code window.

## Repeated Lambda Invocations

The function may be writing output into the same prefix that triggers it. Separate input and output prefixes and filter the S3 notification.

## Large File Failure

Do not assume the entire object fits in function memory or `/tmp`. Check object size, process in chunks when possible, and increase memory or ephemeral storage only after measuring the need.

## Access Denied Reading The Object

The Lambda execution role needs `s3:GetObject` for the exact bucket/object ARN. Replace `YOUR_BUCKET_NAME` in `iam-policy.json` before using it.
