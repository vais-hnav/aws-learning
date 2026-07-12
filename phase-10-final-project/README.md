# Phase 10: Final Project

Goal:
Combine the completed playlist topics into a beginner-friendly, portfolio-ready
AWS project.

Phase work:
- `serverless-crud-project/`

## Active Project

The Serverless Tasks CRUD API uses:

- API Gateway REST API for HTTP routes.
- Six Lambda functions for separate CRUD operations.
- A Lambda layer for the shared DynamoDB table name.
- DynamoDB to store task items.
- IAM to grant the Lambda functions least-privilege table access.
- CloudWatch Logs for function output and debugging.

Routes:

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/tasks` | Get all tasks |
| `POST` | `/tasks` | Create a task |
| `GET` | `/tasks/{id}` | Get one task |
| `PUT` | `/tasks/{id}` | Update `status` and `updatedAt` |
| `PATCH` | `/tasks/{id}` | Partially update supplied attributes |
| `DELETE` | `/tasks/{id}` | Delete a task |

Status: Complete on 2026-07-12.

The hands-on implementation, explanatory notes, IAM policy documentation, test
commands, cleanup guidance, and GitHub proof files are complete. The cleanup
guide remains the required reference whenever these resources are recreated.

Project documentation and Lambda code are in
`serverless-crud-project/README.md`.

Documentation:

- `serverless-crud-project/project-notes.md`
- `serverless-crud-project/approach.md`
- `serverless-crud-project/project-plan.md`
- `serverless-crud-project/iam/README.md`
