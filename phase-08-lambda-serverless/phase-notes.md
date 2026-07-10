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
