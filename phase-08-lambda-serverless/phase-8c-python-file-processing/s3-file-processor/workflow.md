# Workflow

```text
Upload object to S3
        |
        v
S3 checks event type and prefix/suffix filters
        |
        v
S3 invokes Lambda with an event document
        |
        v
Lambda reads Records[].s3.bucket.name and Records[].s3.object.key
        |
        v
Lambda logs the result to CloudWatch Logs
```

## boto3 Practice

The local `boto3_s3_buckets.py` script creates an S3 client and calls `list_buckets`. This operation lists buckets for the AWS account, not only buckets in the client's configured Region.

The script then calls `get_bucket_location` for each bucket. A missing `LocationConstraint` means the bucket is in `us-east-1`; it does not mean that the bucket has no Region.

## Lambda Temporary Storage

Lambda functions can use `/tmp` while processing a file. The default size is 512 MB and it can be configured up to 10 GB. This storage is temporary, so final output should be written to durable storage such as S3.

For large objects, avoid reading the complete object into memory unless the function has enough memory. Prefer streaming, processing in chunks, or using another AWS service when the job is too large or long-running for Lambda.

## Trigger Filters

Use a prefix such as `incoming/` or a suffix such as `.csv` to limit invocations. If the function writes results to the same bucket, use a different output prefix such as `processed/` and ensure that prefix does not trigger the function.

## Permissions

S3 needs permission to invoke the Lambda function. The Lambda execution role needs CloudWatch Logs permissions and only the S3 permissions required by the code, such as `s3:GetObject` for the chosen bucket.
