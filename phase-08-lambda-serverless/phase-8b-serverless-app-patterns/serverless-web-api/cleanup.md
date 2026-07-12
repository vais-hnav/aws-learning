# Cleanup

Use this order so integrations do not hide resources that still exist:

- Delete the API Gateway `TasksApi`, including the deployed `dev` stage.
- Delete `get_tasks`, `create_task`, `get_task`, `put_task`, `update_task`, and
  `delete_task` Lambda functions.
- Delete every version of the custom `tasks-layer` Lambda layer.
- Delete the six `/aws/lambda/FUNCTION_NAME` CloudWatch log groups.
- Inspect and then delete the `Tasks` DynamoDB table.
- Detach the project policy from the IAM user if it was only needed for the lab.
- Remove the inline DynamoDB policy from `TasksCrudLambdaRole`.
- Detach `AWSLambdaBasicExecutionRole` and delete `TasksCrudLambdaRole` if no
  other function uses it.
- Delete local ZIP build artifacts that are no longer needed.

Final checks:

```bash
aws lambda list-functions --region ap-south-2
aws lambda list-layers --region ap-south-2
aws apigateway get-rest-apis --region ap-south-2
aws dynamodb list-tables --region ap-south-2
```

Also check Billing and Cost Explorer after cleanup.
