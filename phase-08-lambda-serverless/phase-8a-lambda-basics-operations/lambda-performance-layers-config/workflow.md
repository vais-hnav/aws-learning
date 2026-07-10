# Workflow

## 1. Tune Memory Carefully

Lambda memory is not only RAM.
Increasing memory also increases CPU power and can improve network or disk throughput.

The cost question is not:

```text
Is higher memory always more expensive?
```

The better question is:

```text
Does higher memory reduce execution time enough to be worth it?
```

Use CloudWatch logs to compare:
- `Duration`
- `Billed Duration`
- `Memory Size`
- `Max Memory Used`

## 2. Understand Cold Start

Cold start means Lambda had to prepare a new execution environment before running the handler.

Warm start means Lambda reused an existing environment.

Cold starts can be caused by:
- First invoke.
- Idle function.
- New deployment.
- More concurrent traffic.
- Large package or layer.
- Heavy code outside the handler.
- Runtime or VPC setup.

Beginner rule:

```text
Do not pay for provisioned concurrency unless a real user-facing workload needs low latency.
```

## 3. Use Layers For Shared Code

A layer is useful when multiple functions need the same dependency or helper code.

Python layer structure:

```text
python/
  aws_learning_utils.py
```

After the layer is attached, the function can import:

```python
from aws_learning_utils import build_message
```

Layer tradeoff:
- Cleaner function packages.
- Shared dependency management.
- But too many or too-large layers can increase complexity and cold-start time.

## 4. Separate Config From Code

Good config examples:
- `APP_STAGE`
- `APP_MESSAGE`
- Feature flags
- Table names
- Bucket names

Bad config examples:
- Passwords
- API keys
- Access tokens
- Private credentials

For real secrets, use a managed secret/config service and allow the Lambda role to read only what it needs.

Secrets Manager beginner pattern:
- Store the real secret value in Secrets Manager.
- Store only the secret name or ARN in Lambda config, for example `APP_SECRET_ID`.
- Give the Lambda execution role `secretsmanager:GetSecretValue` only for that specific secret.
- Read the secret at runtime.
- Never print the secret value in logs.

## 5. Cleanup

Layers and logs can remain after function testing.

Cleanup should include:
- Remove layer from function.
- Delete layer version.
- Delete temporary ZIP/build files.
- Delete test function and log group when done.
