# Cleanup

Run these cleanup steps after the Lambda practice.

## Set Variables

```bash
export AWS_REGION=ap-south-1
export LAMBDA_FUNCTION_NAME=aws-learning-basic-lambda
export LAMBDA_ROLE_NAME=aws-learning-lambda-basic-role
```

## Delete The Lambda Function

```bash
aws lambda delete-function \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --region "$AWS_REGION"
```

## Delete The CloudWatch Log Group

Lambda log groups can remain after the function is deleted.

```bash
aws logs delete-log-group \
  --log-group-name "/aws/lambda/$LAMBDA_FUNCTION_NAME" \
  --region "$AWS_REGION"
```

## Detach And Delete The IAM Role

Only do this if the role was created just for this lab.

```bash
aws iam detach-role-policy \
  --role-name "$LAMBDA_ROLE_NAME" \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

```bash
aws iam delete-role \
  --role-name "$LAMBDA_ROLE_NAME"
```

## Delete Local ZIP/Response Files

```bash
rm -f phase-08-lambda-serverless/phase-8a-lambda-basics-operations/basic-lambda-cloudwatch/function.zip
rm -f response.json
```

## Verify Cleanup

```bash
aws lambda get-function \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --region "$AWS_REGION"
```

Expected result after cleanup:

```text
ResourceNotFoundException
```
