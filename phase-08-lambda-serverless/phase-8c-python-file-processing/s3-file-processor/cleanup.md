# Cleanup

Use the actual names and Region from your lab.

1. Delete the S3 event notification or trigger first so new uploads cannot invoke Lambda.
2. Delete test objects from the input and output prefixes.
3. Delete the test S3 bucket if it was created only for this lab.
4. Delete the Lambda function.
5. Delete the CloudWatch log group named `/aws/lambda/<function-name>`.
6. Detach/delete the lab IAM policy and delete the Lambda execution role.
7. Remove local deployment ZIP files if any were created.
8. Confirm the S3 bucket, Lambda function, log group, and IAM role no longer appear in the console.

Example checks:

```bash
aws lambda list-functions --region "$AWS_REGION"
aws s3api list-buckets --query 'Buckets[].Name'
aws logs describe-log-groups \
  --log-group-name-prefix "/aws/lambda/" \
  --region "$AWS_REGION"
```

The local `.venv` is not an AWS resource and does not create AWS charges. Keep it for later Python labs or remove it locally with `rm -rf .venv` when it is no longer needed.
