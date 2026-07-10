# S3 File Processor

## What Did I Build?

- A local boto3 script that lists S3 buckets and their Regions.
- A Lambda handler that reads S3 object-created events and logs the uploaded object's bucket, key, and event type.

## Which AWS Services Did I Use?

- Amazon S3 for objects and event notifications.
- AWS Lambda for event-driven processing.
- Amazon CloudWatch Logs for function output.
- IAM for the Lambda execution role and least-privilege permissions.

## What Did I Learn?

- boto3 clients call AWS service APIs and return Python dictionaries.
- S3 bucket listing is account-wide, while every bucket is created in one Region.
- Lambda can use configurable temporary storage under `/tmp` for file-processing work.
- S3 can invoke Lambda after an upload, and filters can limit which objects trigger it.
- Credentials stay in AWS CLI profiles or IAM roles, never in Python source files.

## Local Python Setup

Run these commands yourself from the repo root.

```bash
cd /Users/vaishnav/Documents/Workspace/AWS/aws-learning
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it:

```bash
source .venv/bin/activate
```

Upgrade pip:

```bash
python -m pip install --upgrade pip
```

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

Confirm boto3 is installed:

```bash
python -m pip show boto3
```

Confirm the virtual environment Python is being used:

```bash
which python
python --version
```

Expected `which python` shape:

```text
/Users/vaishnav/Documents/Workspace/AWS/aws-learning/.venv/bin/python
```

## Run The S3 Bucket Script

Use an AWS profile so boto3 knows which credentials to use.

```bash
AWS_PROFILE=user1 python phase-08-lambda-serverless/phase-8c-python-file-processing/s3-file-processor/boto3_s3_buckets.py
```

Or use another configured profile:

```bash
AWS_PROFILE=vaishnav python phase-08-lambda-serverless/phase-8c-python-file-processing/s3-file-processor/boto3_s3_buckets.py
```

For the full command sequence and Lambda deployment outline, see `commands.md`.

## How Do I Delete It?

Follow `cleanup.md`. Remove the S3 event notification first, then delete the Lambda resources, test objects, and bucket.

## Deactivate The Virtual Environment

When done:

```bash
deactivate
```

## Notes

- `.venv/` is ignored by Git.
- Dependencies are tracked in `requirements.txt`.
- Do not use `/usr/bin/python3` for this repo because that is Apple's system Python.
- Prefer the repo virtual environment for AWS Python practice.
