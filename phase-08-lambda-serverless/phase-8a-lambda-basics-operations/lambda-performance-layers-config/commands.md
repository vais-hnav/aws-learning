# Commands

These commands support Lambda memory, cold-start, layer, and configuration practice.

Run from the repository root.

## Set Variables

```bash
export AWS_REGION=ap-south-1
export LAMBDA_FUNCTION_NAME=aws-learning-basic-lambda
export LAYER_NAME=aws-learning-utils
```

Use a profile if needed:

```bash
export AWS_PROFILE=vaishnav
```

## Compare Memory Settings

Check current memory:

```bash
aws lambda get-function-configuration \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --query '{MemorySize:MemorySize,Timeout:Timeout,Runtime:Runtime}' \
  --region "$AWS_REGION"
```

Update memory:

```bash
aws lambda update-function-configuration \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --memory-size 512 \
  --region "$AWS_REGION"
```

Invoke and compare the CloudWatch `REPORT` line:

```bash
aws lambda invoke \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --payload '{"source":"aws-learning","message":"memory-512-test"}' \
  --cli-binary-format raw-in-base64-out \
  response.json \
  --region "$AWS_REGION"
```

## Observe Cold Start Logs

Tail logs:

```bash
aws logs tail "/aws/lambda/$LAMBDA_FUNCTION_NAME" \
  --since 30m \
  --format short \
  --region "$AWS_REGION"
```

Look for:

```text
Init Duration
Duration
Billed Duration
Memory Size
Max Memory Used
```

## Build A Simple Python Layer

Create a temporary build folder:

```bash
rm -rf layer-build aws-learning-utils-layer.zip
mkdir -p layer-build/python
cp phase-08-lambda-serverless/phase-8a-lambda-basics-operations/lambda-performance-layers-config/layer-example/python/aws_learning_utils.py layer-build/python/
```

Package the layer:

```bash
cd layer-build
zip -r ../aws-learning-utils-layer.zip python
cd -
```

Publish the layer:

```bash
export LAYER_VERSION_ARN=$(aws lambda publish-layer-version \
  --layer-name "$LAYER_NAME" \
  --description "Shared helper code for AWS learning Lambda lab" \
  --zip-file fileb://aws-learning-utils-layer.zip \
  --compatible-runtimes python3.12 \
  --query 'LayerVersionArn' \
  --output text \
  --region "$AWS_REGION")
```

Attach the layer to the test function:

```bash
aws lambda update-function-configuration \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --layers "$LAYER_VERSION_ARN" \
  --region "$AWS_REGION"
```

## Upload Function Code That Uses The Layer

```bash
rm -rf function-build lambda-with-layer.zip
mkdir -p function-build
cp phase-08-lambda-serverless/phase-8a-lambda-basics-operations/lambda-performance-layers-config/lambda_with_layer.py function-build/lambda_function.py
```

```bash
cd function-build
zip ../lambda-with-layer.zip lambda_function.py
cd -
```

```bash
aws lambda update-function-code \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --zip-file fileb://lambda-with-layer.zip \
  --region "$AWS_REGION"
```

Invoke:

```bash
aws lambda invoke \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --payload '{"source":"aws-learning","message":"layer-test"}' \
  --cli-binary-format raw-in-base64-out \
  response.json \
  --region "$AWS_REGION"
```

View response:

```bash
cat response.json
```

## Non-Sensitive Config With Environment Variables

```bash
aws lambda update-function-configuration \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --environment 'Variables={APP_STAGE=learning,APP_MESSAGE=layer-config-demo}' \
  --region "$AWS_REGION"
```

Do not put real API keys, passwords, or tokens in these example commands.

## Secrets Pattern To Study Later

The safe pattern is:

```text
Lambda code reads secret name/ARN from config.
Lambda execution role gets permission to read only that secret or parameter.
Lambda retrieves the secret at runtime.
Lambda never prints the secret.
```

Do not create paid or long-lived secret resources for this phase unless you intentionally want a separate security lab.

Least-privilege IAM policy shape for one secret:

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

If the secret uses a customer-managed KMS key, the role may also need `kms:Decrypt` for that key.
