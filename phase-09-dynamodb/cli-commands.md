# CLI Commands

These commands support the DynamoDB videos 70-73.

The lab uses one small on-demand table with a composite primary key. This is the safe beginner table for the DynamoDB basics and primary-key practice.

## Set Variables

```bash
export AWS_REGION=ap-south-1
export DDB_TABLE=aws-learning-dynamodb-notes
```

## Confirm Identity

```bash
aws sts get-caller-identity
```

## Create A Table With Composite Primary Key

```bash
aws dynamodb create-table \
  --table-name "$DDB_TABLE" \
  --billing-mode PAY_PER_REQUEST \
  --attribute-definitions \
    AttributeName=UserId,AttributeType=S \
    AttributeName=NoteId,AttributeType=S \
  --key-schema \
    AttributeName=UserId,KeyType=HASH \
    AttributeName=NoteId,KeyType=RANGE \
  --region "$AWS_REGION"
```

Wait until the table exists:

```bash
aws dynamodb wait table-exists \
  --table-name "$DDB_TABLE" \
  --region "$AWS_REGION"
```

## Describe The Table

```bash
aws dynamodb describe-table \
  --table-name "$DDB_TABLE" \
  --region "$AWS_REGION" \
  --query 'Table.{TableName:TableName,Status:TableStatus,KeySchema:KeySchema,BillingMode:BillingModeSummary.BillingMode}'
```

## Put An Item With Multiple Data Types

```bash
aws dynamodb put-item \
  --table-name "$DDB_TABLE" \
  --region "$AWS_REGION" \
  --item '{
    "UserId": { "S": "user#1" },
    "NoteId": { "S": "note#2026-07-06#001" },
    "Title": { "S": "DynamoDB data types" },
    "Views": { "N": "3" },
    "IsPinned": { "BOOL": false },
    "Tags": { "SS": ["aws", "dynamodb", "learning"] },
    "Scores": { "NS": ["10", "20"] },
    "Steps": {
      "L": [
        { "S": "watch" },
        { "S": "practice" },
        { "S": "cleanup" }
      ]
    },
    "Profile": {
      "M": {
        "Level": { "S": "beginner" },
        "CompletedVideos": { "NS": ["71", "72", "73"] }
      }
    },
    "OptionalField": { "NULL": true }
  }'
```

## Get One Exact Item

Use the full composite primary key.

```bash
aws dynamodb get-item \
  --table-name "$DDB_TABLE" \
  --region "$AWS_REGION" \
  --key '{
    "UserId": { "S": "user#1" },
    "NoteId": { "S": "note#2026-07-06#001" }
  }'
```

## Query Items By Partition Key

```bash
aws dynamodb query \
  --table-name "$DDB_TABLE" \
  --region "$AWS_REGION" \
  --key-condition-expression 'UserId = :user_id' \
  --expression-attribute-values '{
    ":user_id": { "S": "user#1" }
  }'
```

## Strongly Consistent Read

```bash
aws dynamodb get-item \
  --table-name "$DDB_TABLE" \
  --region "$AWS_REGION" \
  --consistent-read \
  --key '{
    "UserId": { "S": "user#1" },
    "NoteId": { "S": "note#2026-07-06#001" }
  }'
```

## Delete The Test Item

```bash
aws dynamodb delete-item \
  --table-name "$DDB_TABLE" \
  --region "$AWS_REGION" \
  --key '{
    "UserId": { "S": "user#1" },
    "NoteId": { "S": "note#2026-07-06#001" }
  }'
```
