# Commands

Run these from the repository root after activating `.venv`.

## Local boto3 Script

```bash
source .venv/bin/activate
AWS_PROFILE=user1 python phase-08-lambda-serverless/phase-8c-python-file-processing/s3-file-processor/boto3_s3_buckets.py
```

## Create A Test Bucket

Bucket names must be globally unique. This example adds a timestamp.

```bash
export AWS_PROFILE=user1
export AWS_REGION=ap-south-2
export S3_TRIGGER_BUCKET="aws-learning-s3-trigger-$(date +%Y%m%d%H%M%S)"

aws s3api create-bucket \
  --bucket "$S3_TRIGGER_BUCKET" \
  --region "$AWS_REGION" \
  --create-bucket-configuration LocationConstraint="$AWS_REGION"
```

For `us-east-1`, omit `--create-bucket-configuration`.

Keep public access blocked:

```bash
aws s3api put-public-access-block \
  --bucket "$S3_TRIGGER_BUCKET" \
  --public-access-block-configuration \
BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

## Test The Trigger

After creating the Lambda function and S3 trigger in the console, upload a small test file:

```bash
aws s3 cp test.txt "s3://$S3_TRIGGER_BUCKET/incoming/test.txt"
```

View recent logs:

```bash
aws logs tail "/aws/lambda/<function-name>" \
  --since 10m \
  --format short \
  --region "$AWS_REGION"
```

Use an event type such as `s3:ObjectCreated:*`, a prefix such as `incoming/`, and a suffix only when the lab requires a particular file type.
