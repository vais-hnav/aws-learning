# AWS Secrets Manager Notes

These notes belong with video 69: sensitive/configuration data in Lambda.

## What Is Secrets Manager?

AWS Secrets Manager is a service for storing and retrieving sensitive values such as:
- Database usernames and passwords
- API keys
- OAuth tokens
- Application credentials

It helps avoid hardcoding secrets in source code, Lambda environment variables, ZIP files, or GitHub.

## Lambda Pattern

Use this pattern:

```text
Secret value lives in Secrets Manager.
Lambda stores only the secret name or ARN in an environment variable.
Lambda execution role gets permission to read only that secret.
Lambda reads the secret at runtime.
Lambda never logs the secret value.
```

Example environment variable:

```text
APP_SECRET_ID=aws-learning/demo-secret
```

## Minimum IAM Idea

For a Lambda function to read one secret, the execution role usually needs:
- `secretsmanager:GetSecretValue`
- `secretsmanager:DescribeSecret`

Example policy shape:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue",
        "secretsmanager:DescribeSecret"
      ],
      "Resource": "arn:aws:secretsmanager:ap-south-1:111122223333:secret:aws-learning/demo-secret-*"
    }
  ]
}
```

If a customer-managed KMS key encrypts the secret, the role may also need `kms:Decrypt` for that key.

## Secrets Manager Vs Environment Variables

| Use case | Better choice |
|---|---|
| App stage, table name, bucket name, feature flag | Environment variable |
| API key, password, token, database credential | Secrets Manager |
| Value must rotate safely | Secrets Manager |
| Value should not be visible in code/config screenshots | Secrets Manager |

## Beginner Safety Rules

- Do not store real secrets in this repo.
- Do not print secret values in Lambda logs.
- Do not give `secretsmanager:*` on `*` for a beginner Lambda.
- Do not create long-lived test secrets unless you need them.
- If you create a test secret, schedule it for deletion during cleanup.

## Cleanup Reminder

For a temporary test secret:

```bash
aws secretsmanager delete-secret \
  --secret-id aws-learning/demo-secret \
  --recovery-window-in-days 7 \
  --region ap-south-1
```

Use a recovery window for learning labs so accidental deletion can be recovered.

References:
- AWS Secrets Manager: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
- Secrets Manager with Lambda: https://docs.aws.amazon.com/secretsmanager/latest/userguide/retrieving-secrets_lambda.html
- Secrets Manager IAM policies: https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_iam-policies.html
