# Phase 8C: Python And File Processing

Status: Complete on 2026-07-11.

Goal:
Practice Python/boto3 and S3-triggered Lambda file processing patterns.

Videos:
- 63. Handle large files in Lambda
- 64. Python coding in AWS with boto3
- 66. S3 and Lambda file processing trigger

Labs:
- `s3-file-processor/`

What I learned:
- Lambda uses temporary `/tmp` storage for files created during an invocation. It starts at 512 MB and can be configured up to 10 GB.
- boto3 is the AWS SDK for Python. A service client sends API requests and returns Python dictionaries containing the response.
- `list_buckets` lists buckets for the account, while `get_bucket_location` finds each bucket's Region.
- S3 Event Notifications can invoke Lambda when an object is created.
- Prefix and suffix filters can restrict the trigger to paths or file types such as `incoming/` and `.csv`.
- S3 object keys in events should be URL-decoded before use.

Safety:
- Delete S3 test buckets/objects, Lambda triggers, Lambda functions, and CloudWatch log groups after practice.
