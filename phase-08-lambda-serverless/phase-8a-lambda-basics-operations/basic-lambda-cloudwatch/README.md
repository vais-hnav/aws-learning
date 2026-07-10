# Basic Lambda + CloudWatch

Use this folder to practice the first Lambda function and CloudWatch Logs workflow.

This lab covers playlist videos:
- 58. What is AWS Lambda?
- 61. Write and upload a Lambda function, view CloudWatch logs
- 62. Lambda cost and memory performance
- 67. Lambda cold start

## What Did I Build?

A beginner-safe Python Lambda function that:
- Receives a test event.
- Reads simple non-sensitive configuration from environment variables.
- Writes useful logs.
- Returns a JSON-style response.
- Can be deployed from a ZIP file.

## Which AWS Service Did I Use?

- AWS Lambda
- Amazon CloudWatch Logs
- IAM
- AWS CLI

## What Did I Learn?

- Lambda runs code only when invoked.
- EC2 is better when I need a long-running server, deeper OS control, or persistent compute.
- Lambda is better for event-driven tasks, short jobs, simple APIs, and automation.
- The handler is the function entry point.
- The execution role gives Lambda permission to write logs and access other AWS services.
- `print()` and Python logging output go to CloudWatch Logs.
- Lambda memory controls RAM and also increases CPU proportionally.
- A first request after idle time, deployment, scaling, or runtime setup can be slower because of cold start.

## How Do I Run It?

Use:
- `commands.md` for CLI commands.
- `workflow.md` for the concept walkthrough.
- `lambda_function.py` as the sample function code.

Recommended safe order:
1. Create a temporary Lambda execution role.
2. Package `lambda_function.py`.
3. Create the Lambda function.
4. Invoke it with a small test event.
5. View CloudWatch logs.
6. Change memory and environment variables.
7. Invoke again and compare logs.

## How Do I Delete It?

Use `cleanup.md`.

At minimum:
- Delete the test Lambda function.
- Delete its CloudWatch log group.
- Detach and delete the temporary IAM role.
