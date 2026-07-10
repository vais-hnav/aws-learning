# Cleanup

Run these steps after the layer/config practice.

## Set Variables

```bash
export AWS_REGION=ap-south-1
export LAMBDA_FUNCTION_NAME=aws-learning-basic-lambda
export LAYER_NAME=aws-learning-utils
```

## Remove Layers From The Function

```bash
aws lambda update-function-configuration \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --layers '[]' \
  --region "$AWS_REGION"
```

## List Layer Versions

```bash
aws lambda list-layer-versions \
  --layer-name "$LAYER_NAME" \
  --region "$AWS_REGION"
```

## Delete A Layer Version

Replace `1` with the actual version number.

```bash
aws lambda delete-layer-version \
  --layer-name "$LAYER_NAME" \
  --version-number 1 \
  --region "$AWS_REGION"
```

## Delete Local Build Files

```bash
rm -rf layer-build function-build
rm -f aws-learning-utils-layer.zip lambda-with-layer.zip response.json
```

## Optional: Schedule Test Secret Deletion

Only run this if you created a temporary Secrets Manager secret for practice.

```bash
export TEST_SECRET_ID=aws-learning/demo-secret
```

```bash
aws secretsmanager delete-secret \
  --secret-id "$TEST_SECRET_ID" \
  --recovery-window-in-days 7 \
  --region "$AWS_REGION"
```

This schedules deletion with a recovery window instead of immediately destroying the secret.

## Optional: Delete The Function And Logs

If Phase 8A practice is fully done, use:

```bash
phase-08-lambda-serverless/phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/cleanup.md
```

That file contains the full function, log group, and IAM role cleanup checklist.
