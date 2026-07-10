# Phase 8A: Lambda Basics And Operations

Goal:
Learn Lambda fundamentals, CloudWatch logs, cost/memory behavior, cold starts, layers, and sensitive configuration.

Videos:
- 58. What is AWS Lambda?
- 61. Write and upload a Lambda function, view CloudWatch logs
- 62. Lambda cost and memory performance
- 67. Lambda cold start
- 68. Lambda layers
- 69. Sensitive/configuration data in Lambda

Labs:
- `basic-lambda-cloudwatch/`
- `lambda-performance-layers-config/`

Status:
- Complete on `2026-07-11`.

What I learned:
- Lambda is compute without managing EC2 servers.
- Lambda is best for short-lived, event-driven work such as APIs, file processing, automation, and scheduled jobs.
- A Lambda function needs a handler, runtime, execution role, trigger or manual invoke path, and logs.
- CloudWatch Logs is the first place to debug Lambda output and errors.
- Lambda cost depends mainly on request count and duration, with duration tied to configured memory.
- More memory also gives proportionally more CPU and can make a function faster.
- Cold starts happen when Lambda creates a new execution environment.
- Layers help share dependencies or common code across functions.
- Environment variables are useful for non-sensitive config, but real secrets should use a secret/config service with IAM permissions.

Safety:
- Delete test Lambda functions, layer versions, CloudWatch log groups, and any test secrets/config values after practice.
