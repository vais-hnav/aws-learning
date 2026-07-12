# Project Plan Followed

## Phase 1: Data Layer

- Create DynamoDB table `Tasks`.
- Use string partition key `id`.
- Keep default/on-demand settings appropriate for the learning workload.
- Insert only test task data.

## Phase 2: Shared Configuration

- Create `tasks_table_layer/python/config.py`.
- Set `TABLE_NAME = "Tasks"`.
- Zip the `python/` directory and publish `tasks-layer`.

## Phase 3: Runtime IAM Role

- Create `TasksCrudLambdaRole` with a Lambda trust policy.
- Attach AWS managed policy `AWSLambdaBasicExecutionRole` for logs.
- Add an inline policy for CRUD operations on the Tasks table and indexes.

## Phase 4: Lambda Functions

- Create six Python functions using the existing execution role.
- Attach `tasks-layer` to every function.
- Implement GET all, POST, GET one, PUT, PATCH, and DELETE.
- Use consistent status codes, headers, and JSON bodies.
- Test every handler with a Lambda test event.

## Phase 5: API Gateway

- Create REST API `TasksApi`.
- Create `/tasks` with GET and POST.
- Create `/tasks/{id}` with GET, PUT, PATCH, and DELETE.
- Enable Lambda proxy integration for every method.
- Deploy to the `dev` stage.

## Phase 6: End-To-End Testing

- Create a task with POST.
- List tasks with GET `/tasks`.
- Read one task with GET `/tasks/{id}`.
- Update required fields with PUT.
- Add or change selected fields with PATCH.
- Delete the task and verify a later GET returns `404`.
- Review CloudWatch logs when any request fails.

## Phase 7: Documentation And Proof

- Store Lambda source code and the shared layer structure in GitHub.
- Document API test commands and response contracts.
- Document the IAM user policy and Lambda execution role separately.
- Record mistakes and fixes without committing credentials or tokens.

## Phase 8: Cleanup

- Delete API Gateway resources and stages.
- Delete six Lambda functions and their log groups.
- Delete Lambda layer versions.
- Delete the Tasks table after verifying no needed data remains.
- Remove the temporary project policy from the IAM user.
- Delete the execution role if no other function uses it.
- Check Billing and Cost Explorer.

## Completion Checklist

- [ ] All six routes tested through the deployed endpoint.
- [ ] Expected `200`, `201`, `400`, `404`, and `409` cases verified.
- [ ] CloudWatch logs reviewed.
- [ ] No credentials or real secrets in the repository.
- [ ] Architecture and IAM notes complete.
- [ ] AWS resources cleaned up.
- [ ] Final GitHub commit created after review.
