# Mistakes

## Thinking Lambda Replaces EC2 Everywhere

Lambda is excellent for event-driven functions, but EC2 is still useful for long-running servers, custom OS-level control, and workloads that do not fit Lambda limits.

Safer rule:

```text
Choose based on workload shape, not service popularity.
```

## Forgetting The Execution Role

Lambda needs an execution role to write logs and access AWS services.

Safer rule:

```text
Start with log permissions, then add only the exact service permissions the function needs.
```

## Expecting Logs Instantly

CloudWatch Logs can take a few minutes to appear.

Safer rule:

```text
Invoke once, wait briefly, then check the log group and execution role permissions.
```

## Logging Secrets

Anything printed by Lambda can appear in CloudWatch Logs.

Safer rule:

```text
Never print API keys, passwords, tokens, or full secret payloads.
```

## Hardcoding Secrets In Code

Hardcoded secrets can leak through Git commits, screenshots, shared ZIP files, or copied examples.

Safer rule:

```text
Use environment variables only for non-sensitive config. Use a secret/config service for real secrets.
```

## Assuming Environment Variables Are A Full Secrets Solution

Environment variables are convenient, but users with function configuration access may be able to view them.

Safer rule:

```text
Store real secrets in a managed secret/config service and restrict IAM access.
```

## Increasing Memory Without Measuring

More memory can improve performance, but the right setting depends on workload behavior.

Safer rule:

```text
Compare duration, billed duration, and max memory used before deciding.
```

## Leaving Provisioned Concurrency On

Provisioned concurrency can reduce cold starts but can add cost.

Safer rule:

```text
Use it only for latency-sensitive functions that justify the cost.
```

## Creating Huge Layers

Layers reduce duplicate packaging, but large layers can increase deployment complexity and cold-start time.

Safer rule:

```text
Keep layers focused and include only dependencies that are actually shared.
```

## Forgetting To Delete Log Groups

Deleting a Lambda function does not always remove its CloudWatch log group.

Safer rule:

```text
Delete test log groups during cleanup.
```
