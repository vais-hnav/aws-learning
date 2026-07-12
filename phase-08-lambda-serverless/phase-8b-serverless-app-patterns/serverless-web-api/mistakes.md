# Mistakes And Debugging Notes

- Treating `event["body"]` as a dictionary: proxy integration normally supplies
  it as a string, so parse it with `json.loads()`.
- Returning a dictionary as the response body: serialize it with `json.dumps()`.
- Forgetting `Content-Type: application/json`: clients may not interpret the
  body as JSON.
- Testing only Lambda: a passing function test does not verify API resources,
  methods, integration, stage deployment, or URL.
- Forgetting to redeploy API Gateway after a route change.
- Using the IAM user's credentials in Lambda code instead of an execution role.
- Giving the Lambda role deployment permissions it does not need.
- Omitting the DynamoDB table ARN or using the wrong Region/account in policy.
- Allowing `UpdateItem` to create a missing item unintentionally; use an
  `attribute_exists(id)` condition when the API should return `404`.
- Using `Scan` without pagination; one response contains at most 1 MB.
- Using the same implementation for PUT and PATCH without documenting their
  different request contracts.
