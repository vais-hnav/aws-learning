# Cleanup

Use this checklist after DynamoDB practice.

## Delete Test Items

```bash
aws dynamodb delete-item \
  --table-name "$DDB_TABLE" \
  --region "$AWS_REGION" \
  --key '{
    "UserId": { "S": "user#1" },
    "NoteId": { "S": "note#2026-07-06#001" }
  }'
```

## Delete The Test Table

Only run this for a learning table that does not contain important data.

```bash
aws dynamodb delete-table \
  --table-name "$DDB_TABLE" \
  --region "$AWS_REGION"
```

Wait until it is gone:

```bash
aws dynamodb wait table-not-exists \
  --table-name "$DDB_TABLE" \
  --region "$AWS_REGION"
```

## Verify Cleanup

```bash
aws dynamodb list-tables \
  --region "$AWS_REGION"
```

## Safety Checklist

- Confirm the table name before deleting.
- Do not delete shared or production tables.
- Keep test tables on on-demand billing unless a lab specifically teaches provisioned capacity.
- Do not enable global tables, exports, streams, backups, or point-in-time recovery unless the video/lab explicitly needs them.
- After practice, confirm the table is deleted in the AWS console or with `list-tables`.
