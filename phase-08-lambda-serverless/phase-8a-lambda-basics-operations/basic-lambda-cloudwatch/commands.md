# Commands

These commands support the basic Lambda, CloudWatch, cost, memory, and cold-start practice.

Run from the repository root.

## Set Variables

```bash
export AWS_REGION=ap-south-1
export LAMBDA_FUNCTION_NAME=aws-learning-basic-lambda
export LAMBDA_ROLE_NAME=aws-learning-lambda-basic-role
```

Use a profile if needed:

```bash
export AWS_PROFILE=vaishnav
```

## Create A Lambda Execution Role

Create the role:

```bash
aws iam create-role \
  --role-name "$LAMBDA_ROLE_NAME" \
  --assume-role-policy-document file://phase-08-lambda-serverless/phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/trust-policy.json
```

Attach basic CloudWatch Logs permissions:

```bash
aws iam attach-role-policy \
  --role-name "$LAMBDA_ROLE_NAME" \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

Get the role ARN:

```bash
export LAMBDA_ROLE_ARN=$(aws iam get-role \
  --role-name "$LAMBDA_ROLE_NAME" \
  --query 'Role.Arn' \
  --output text)
```

Wait a short time for IAM propagation before creating the function.

## Package The Function

```bash
cd phase-08-lambda-serverless/phase-8a-lambda-basics-operations/basic-lambda-cloudwatch
zip function.zip lambda_function.py
cd -
```

## Create The Lambda Function

```bash
aws lambda create-function \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --runtime python3.12 \
  --handler lambda_function.lambda_handler \
  --role "$LAMBDA_ROLE_ARN" \
  --zip-file fileb://phase-08-lambda-serverless/phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/function.zip \
  --region "$AWS_REGION"
```

## Invoke The Function

```bash
aws lambda invoke \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --payload '{"source":"aws-learning","message":"hello"}' \
  --cli-binary-format raw-in-base64-out \
  response.json \
  --region "$AWS_REGION"
```

View the response:

```bash
cat response.json
```

## View CloudWatch Logs

```bash
aws logs tail "/aws/lambda/$LAMBDA_FUNCTION_NAME" \
  --since 10m \
  --format short \
  --region "$AWS_REGION"
```

If logs are not visible immediately, wait a few minutes and run the command again.

## Update Environment Variables

Use environment variables for non-sensitive config:

```bash
aws lambda update-function-configuration \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --environment 'Variables={APP_STAGE=learning,APP_MESSAGE=hello-from-env}' \
  --region "$AWS_REGION"
```

Invoke again:

```bash
aws lambda invoke \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --payload '{"source":"aws-learning","message":"env-test"}' \
  --cli-binary-format raw-in-base64-out \
  response.json \
  --region "$AWS_REGION"
```

## Change Memory For Performance Testing

Set memory to `256 MB`:

```bash
aws lambda update-function-configuration \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --memory-size 256 \
  --region "$AWS_REGION"
```

Invoke and compare the CloudWatch `REPORT` line:

```bash
aws lambda invoke \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --payload '{"source":"aws-learning","message":"memory-test"}' \
  --cli-binary-format raw-in-base64-out \
  response.json \
  --region "$AWS_REGION"
```

Check function configuration:

```bash
aws lambda get-function-configuration \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --query '{Runtime:Runtime,MemorySize:MemorySize,Timeout:Timeout,Role:Role,Environment:Environment}' \
  --region "$AWS_REGION"
```
