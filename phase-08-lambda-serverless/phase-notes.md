# Phase 8 Notes

This phase covers AWS Lambda and serverless application patterns.

Note source:
- Based on playlist video order/titles, video descriptions, AWS documentation, and hands-on work documented in this repo.
- Paraphrased explanatory notes, not verbatim transcripts.

## 58. What Is AWS Lambda?

Concept:
- Lambda is serverless compute.
- Compute means running code.
- EC2 and Lambda both run code, but they use different operating models.
- EC2 gives a server that keeps running until stopped or terminated.
- Lambda runs a function only when something invokes it.
- Lambda is event-driven, which means it responds to events such as API calls, file uploads, queue messages, schedules, or manual test events.

Video learning:
- Compares Lambda with EC2 using a simple real-life analogy.
- Explains why Lambda exists even though EC2 already provides compute.
- Highlights Lambda advantages: no server management, automatic scaling, event-driven execution, and pay-per-use billing.
- Also explains that EC2 is still better for long-running servers, full OS control, persistent workloads, or workloads that do not fit Lambda limits.
- Includes a first Lambda function demo.

My hands-on:
- Prepared a basic Python Lambda lab.
- Documented function creation, test events, handler behavior, environment variables, logs, and cleanup.
- Kept the function small and safe for beginner practice.

Files:
- `phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/README.md`
- `phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/lambda_function.py`
- `phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/commands.md`
- `phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/workflow.md`
- `phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/cleanup.md`

## 61. Write And Upload Lambda Function With CloudWatch Logs

Concept:
- The Lambda handler is the entry point.
- Python Lambda handlers commonly receive `event` and `context`.
- `event` contains input data.
- `context` contains runtime metadata such as function name, request ID, timeout, and memory.
- Lambda logs are sent to CloudWatch Logs when the execution role has log permissions.

Video learning:
- Shows writing a simple Python Lambda function.
- Demonstrates inline editing and ZIP upload as two ways to update function code.
- Uses logging/printing to generate CloudWatch logs.
- Explains log groups and log streams.
- Shows how Lambda execution details appear in CloudWatch.
- Mentions the console code assistant workflow, but the code still needs to be reviewed and understood manually.

My hands-on:
- Added a Python function that logs the event, function name, and configured memory.
- Added CLI deployment commands using a ZIP package.
- Added CloudWatch log tail commands.
- Added a temporary Lambda execution role trust policy.
- Documented cleanup for the function, log group, role, local ZIP file, and local response file.

Command pattern:

```bash
aws logs tail "/aws/lambda/$LAMBDA_FUNCTION_NAME" \
  --since 10m \
  --format short \
  --region "$AWS_REGION"
```

Files:
- `phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/trust-policy.json`
- `phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/commands.md`
- `phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/workflow.md`

## 62. Lambda Cost And Memory Performance

Concept:
- Lambda cost depends mainly on requests and execution duration.
- Duration cost is measured using configured memory and runtime duration.
- Memory is also the main performance control.
- Increasing memory also increases CPU and other resources proportionally.
- A higher memory setting can be faster and can sometimes reduce total cost if it reduces duration enough.

Video learning:
- Shows where to change Lambda memory in the AWS Console.
- Explains why CPU is not configured directly like EC2.
- Connects memory, CPU, execution time, and cost.
- Uses a simple RAM-based cost explanation to build the pricing mental model.
- Reinforces that optimization should be measured, not guessed.

My hands-on:
- Added CLI commands to change Lambda memory to `256 MB`.
- Documented how to compare `Duration`, `Billed Duration`, `Memory Size`, and `Max Memory Used` in CloudWatch logs.
- Kept the cost lab limited to tiny manual invocations.

Command pattern:

```bash
aws lambda update-function-configuration \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --memory-size 256 \
  --region "$AWS_REGION"
```

Files:
- `phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/commands.md`
- `phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/workflow.md`

## 67. Lambda Cold Start

Concept:
- A cold start happens when Lambda needs to create a new execution environment before running the handler.
- A warm start happens when Lambda reuses an existing execution environment.
- Cold starts can add latency to the first request.
- Cold starts matter most for user-facing APIs and latency-sensitive workloads.

Video learning:
- Explains cold start vs warm start.
- Demonstrates cold start behavior with a Lambda function.
- Discusses common cold-start causes: runtime choice, package size, initialization code, VPC configuration, and scaling.
- Explains that provisioned concurrency can reduce cold-start latency, but it can add cost.

My hands-on:
- Added a module-level `INIT_TIME` value to make execution environment reuse easier to reason about.
- Documented how to look for `Init Duration` in the CloudWatch `REPORT` line.
- Added a beginner rule to avoid provisioned concurrency unless there is a real latency need.

Files:
- `phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/lambda_function.py`
- `phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/workflow.md`
- `phase-8a-lambda-basics-operations/lambda-performance-layers-config/mistakes.md`

## 68. Lambda Layers

Concept:
- A Lambda layer is a ZIP package that contains shared code, libraries, or data.
- Layers help avoid uploading the same dependencies with every function.
- For Python, layer code commonly goes inside a `python/` directory.
- Lambda extracts layer content under `/opt`, and Python can import from the layer path.
- Layer versions are immutable, so updates create new versions.

Video learning:
- Explains why repeated dependency uploads become messy.
- Demonstrates packaging reusable Python code or external libraries into a layer.
- Shows attaching the layer to a Lambda function.
- Emphasizes cleaner function code and smaller deployment packages.

My hands-on:
- Added a sample Python layer utility.
- Added a Lambda function that imports code from the layer.
- Added CLI commands to publish a layer version and attach it to the test function.
- Added cleanup for layer versions and local build artifacts.

Files:
- `phase-8a-lambda-basics-operations/lambda-performance-layers-config/README.md`
- `phase-8a-lambda-basics-operations/lambda-performance-layers-config/commands.md`
- `phase-8a-lambda-basics-operations/lambda-performance-layers-config/layer-example/python/aws_learning_utils.py`
- `phase-8a-lambda-basics-operations/lambda-performance-layers-config/lambda_with_layer.py`

## 69. Sensitive Or Configuration Data In Lambda

Concept:
- Hardcoding API keys, passwords, tokens, or database credentials in code is unsafe.
- Environment variables are useful for non-sensitive configuration such as stage, feature flags, names, and small settings.
- Sensitive values should be stored in a secret/config service and read at runtime with IAM permission.
- Secrets should never be printed to logs.

Short AWS Secrets Manager notes:
- Secrets Manager is used to store and retrieve sensitive values such as database passwords, API keys, OAuth tokens, and application credentials.
- Instead of putting the secret value in Lambda code or environment variables, store the secret in Secrets Manager and give the Lambda execution role permission to read only that secret.
- In Lambda, keep only the secret name or ARN in an environment variable such as `APP_SECRET_ID`.
- The function retrieves the secret at runtime with `secretsmanager:GetSecretValue`.
- Secrets Manager can support secret rotation, but rotation can create extra resources and cost, so keep it for later labs.
- For beginner practice, do not create long-lived test secrets. If a test secret is created, schedule it for deletion during cleanup.

Video learning:
- Explains why hardcoded secrets can leak through GitHub or shared code.
- Shows moving configuration outside the function code.
- Covers environment variables and a safer pattern using a managed secret service.
- Highlights that the Lambda execution role needs permission to read secrets or parameters.

My hands-on:
- Added environment variable examples for non-sensitive values.
- Added a safe code example that reads config from environment variables.
- Added a Secrets Manager example pattern without storing a real secret in the repo.
- Documented IAM and logging safety rules.
- Added short Secrets Manager notes with a least-privilege IAM example and cleanup reminder.

Files:
- `phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/lambda_function.py`
- `phase-8a-lambda-basics-operations/lambda-performance-layers-config/config_reader_example.py`
- `phase-8a-lambda-basics-operations/lambda-performance-layers-config/secrets-manager-notes.md`
- `phase-8a-lambda-basics-operations/lambda-performance-layers-config/mistakes.md`

## 59. Serverless Web API Using Lambda And API Gateway

Concept:
- API Gateway gives Lambda an HTTP interface with resources, methods, stages,
  and a public invoke URL.
- Lambda proxy integration sends request data in `event` and expects a response
  containing `statusCode`, `headers`, and a string `body`.
- GET and POST demonstrate reading requests and returning proper JSON responses.

Video learning:
- Builds a serverless web API from scratch with Lambda and API Gateway.
- Creates GET and POST operations and connects them to Lambda.
- Explains the Lambda event and proxy response format.
- Tests the API with Postman and deploys the REST API.
- Covers common integration and response-format mistakes.

My hands-on:
- Used the pattern as the HTTP foundation for the Phase 10 Tasks API.
- Built `/tasks` and `/tasks/{id}` resources with six methods/functions.
- Standardized JSON response headers, messages, and status codes.
- Added direct Lambda test events and curl endpoint tests.

Files:
- `phase-8b-serverless-app-patterns/phase-notes.md`
- `phase-8b-serverless-app-patterns/serverless-web-api/workflow.md`
- `../phase-10-final-project/serverless-crud-project/`

## 65. Complete Serverless API With API Gateway, Lambda, And DynamoDB

Concept:
- DynamoDB stores data between Lambda invocations.
- boto3 maps Python calls such as `put_item` to DynamoDB API operations.
- The Lambda execution role supplies temporary runtime credentials and must be
  allowed to access the target table.

Video learning:
- Creates a DynamoDB table and defines its primary key.
- Configures the IAM role needed for Lambda-to-DynamoDB access.
- Writes Python boto3 code to store an item with `put_item`.
- Connects API Gateway, Lambda, and DynamoDB into one request flow.

My hands-on:
- Created the `Tasks` table with string partition key `id`.
- Expanded the write example into GET, POST, PUT, PATCH, and DELETE operations.
- Added a shared Lambda layer for `TABLE_NAME`.
- Used a Lambda role with CloudWatch Logs and table-level DynamoDB permissions.
- Used a separate IAM user project policy to create and configure the resources.

Files:
- `phase-8b-serverless-app-patterns/phase-notes.md`
- `../phase-10-final-project/serverless-crud-project/project-notes.md`
- `../phase-10-final-project/serverless-crud-project/iam/README.md`

## 63. Handle Large Files In Lambda

Concept:
- Lambda provides temporary disk space at `/tmp` for files needed during an invocation.
- Ephemeral storage is 512 MB by default and can be configured up to 10 GB.
- Data in `/tmp` is not durable storage. It may remain available when an execution environment is reused, but the function must not depend on it surviving.
- Increasing ephemeral storage can add cost, so it should be sized for the workload instead of set to the maximum automatically.

Video learning:
- Shows where ephemeral storage is configured in a Lambda function.
- Connects larger temporary storage with ZIP extraction, image/video processing, data processing, machine-learning models, and local caching.
- Explains that large objects should normally remain in S3 and only the required data should be downloaded or streamed.
- Reinforces the difference between Lambda memory, deployment package size, and `/tmp` disk space.

My hands-on:
- Documented a safe S3 file-processing flow that passes the bucket and object key through an event instead of passing the file itself.
- Kept the sample handler focused on object metadata and CloudWatch logging.
- Added warnings about loading an entire large file into memory and about relying on `/tmp` as permanent storage.

## 64. Python Coding In AWS With boto3

Concept:
- boto3 is the official AWS SDK for Python.
- A boto3 client maps Python method calls to AWS service API operations.
- API responses are returned as Python dictionaries and lists, so scripts need to read the documented response structure.
- boto3 uses the normal AWS credential chain, including environment variables, shared AWS CLI profiles, IAM roles, and other supported providers.

Video learning:
- Shows installing boto3 with `pip`, importing it, and creating a service client.
- Demonstrates calling an AWS API and reading fields from its response.
- Uses boto3 documentation to understand method arguments and response keys.
- Explains that local code needs boto3 installed, while the managed Python Lambda runtime includes the SDK.

My hands-on:
- Created a repository virtual environment and tracked boto3 in `requirements.txt`.
- Used `boto3.client("s3")` and `list_buckets()` to list account buckets.
- Used `get_bucket_location()` to print each bucket's Region.
- Learned that `LocationConstraint` is `None` for `us-east-1` and normalized that value in the script.
- Used `AWS_PROFILE` so the script selects credentials without putting access keys in source code.

Command pattern:

```bash
AWS_PROFILE=user1 python phase-08-lambda-serverless/phase-8c-python-file-processing/s3-file-processor/boto3_s3_buckets.py
```

## 66. Automate File Processing With S3 And Lambda

Concept:
- S3 Event Notifications can invoke Lambda when matching events happen in a bucket.
- Object-created events can include uploads performed with PUT, POST, COPY, or multipart upload completion.
- The event contains details such as the bucket name, encoded object key, event name, size, and time.
- Prefix and suffix filters reduce unnecessary invocations by selecting paths or file types.

Video learning:
- Creates an S3-to-Lambda trigger for uploaded objects.
- Reads the bucket name and object key from the event's `Records` list.
- Prints processing information and verifies it in CloudWatch Logs.
- Demonstrates event-type selection and prefix/suffix filtering.

My hands-on:
- Added a Python handler that loops over S3 records, URL-decodes each key, and logs the source object.
- Added least-privilege starter permissions for CloudWatch Logs and `s3:GetObject`.
- Documented the flow from upload to S3 event, Lambda invocation, and CloudWatch log entry.
- Added cleanup steps for notifications, Lambda permissions, the function, log group, IAM role, and S3 test data.

Safety note:
- Avoid writing generated files back into the same watched prefix. That can trigger the function repeatedly and create unexpected cost.

## References

- AWS Lambda Developer Guide: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
- Lambda CloudWatch logs: https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs.html
- Lambda pricing: https://aws.amazon.com/lambda/pricing/
- Lambda memory configuration: https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html
- Lambda layers: https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html
- Lambda environment variables: https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html
- Provisioned concurrency: https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html
- AWS Secrets Manager: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
- Secrets Manager with Lambda: https://docs.aws.amazon.com/secretsmanager/latest/userguide/retrieving-secrets_lambda.html
- Lambda ephemeral storage: https://docs.aws.amazon.com/lambda/latest/dg/configuration-ephemeral-storage.html
- boto3 S3 `list_buckets`: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/list_buckets.html
- Lambda with S3: https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html
