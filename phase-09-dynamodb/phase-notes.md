# Phase 9 Notes

This phase covers DynamoDB basics, data types, primary keys, and read consistency.

Note source:
- Based on playlist video order/titles, available video metadata, AWS documentation, and hands-on work documented in this repo.
- Paraphrased explanatory notes, not verbatim transcripts.

Progress note:
- Current listed videos 70-73 were completed out of order while the main path remains at Phase 7 video 50.
- Phase 9 remains open for future DynamoDB videos if the ongoing playlist adds more.

## 70. Master AWS DynamoDB

Concept:
- DynamoDB is a managed NoSQL database service.
- Data is stored in tables.
- Each table contains items.
- Each item contains attributes.
- DynamoDB is schemaless outside the primary key, so different items can have different attributes.
- Every table needs a primary key.
- On-demand billing is a safer beginner choice for small learning workloads because it does not require capacity planning.

Video learning:
- Introduces DynamoDB as a NoSQL database instead of a relational SQL database.
- Explains the table, item, and attribute model.
- Sets up the mental model needed for data types, primary keys, and consistency.
- Connects DynamoDB to later serverless use cases with Lambda and API Gateway.

My hands-on:
- Added a beginner table design named `aws-learning-dynamodb-notes`.
- Used `UserId` as the partition key and `NoteId` as the sort key.
- Added safe on-demand table creation commands.
- Added cleanup guidance to delete the test table after practice.

Command pattern:

```bash
aws dynamodb create-table \
  --table-name "$DDB_TABLE" \
  --billing-mode PAY_PER_REQUEST \
  --attribute-definitions AttributeName=UserId,AttributeType=S AttributeName=NoteId,AttributeType=S \
  --key-schema AttributeName=UserId,KeyType=HASH AttributeName=NoteId,KeyType=RANGE
```

Files:
- `README.md`
- `data-model.md`
- `cli-commands.md`
- `cleanup.md`

## 71. DynamoDB Data Types

Concept:
- DynamoDB stores data as items made of attributes.
- Attributes have data types.
- Scalar types hold one value.
- Document types hold nested JSON-like values.
- Set types hold unique values of the same scalar type.
- Apart from key attributes, items in the same table do not need the same attributes.

Video learning:
- Explains String, Number, Set, List, and Map using DynamoDB's item format.
- Shows why DynamoDB JSON looks different from normal JSON because each value includes a type marker.
- Reinforces that numbers are written as strings in CLI JSON but treated as numbers by DynamoDB.

My hands-on:
- Added a typed DynamoDB JSON item with String, Number, Boolean, Null, String Set, Number Set, List, and Map.
- Documented data type categories in `data-model.md`.
- Added CLI `put-item` examples for beginner practice.

Files:
- `data-model.md`
- `cli-commands.md`
- `mistakes.md`

## 72. DynamoDB Primary Key

Concept:
- Every DynamoDB table needs a primary key.
- A simple primary key uses only a partition key.
- A composite primary key uses a partition key and sort key.
- The partition key helps DynamoDB distribute and locate data.
- The sort key groups and orders related items under the same partition key.

Video learning:
- Explains partition key, sort key, and composite primary key.
- Shows why the key design controls how the table can be queried.
- Reinforces that primary key attributes must be scalar values: String, Number, or Binary.

My hands-on:
- Added a beginner table design using `UserId` as partition key and `NoteId` as sort key.
- Added CLI `create-table`, `describe-table`, `get-item`, `query`, and `delete-item` examples.
- Documented why query patterns matter before choosing keys.

Command pattern:

```bash
aws dynamodb create-table \
  --table-name "$DDB_TABLE" \
  --billing-mode PAY_PER_REQUEST \
  --attribute-definitions AttributeName=UserId,AttributeType=S AttributeName=NoteId,AttributeType=S \
  --key-schema AttributeName=UserId,KeyType=HASH AttributeName=NoteId,KeyType=RANGE
```

Files:
- `data-model.md`
- `cli-commands.md`
- `cleanup.md`
- `mistakes.md`

## 73. Strong And Eventual Consistency

Concept:
- DynamoDB eventually consistent reads are the default.
- A very recent write might not appear immediately in an eventually consistent read.
- Strongly consistent reads return the latest successful write before the read.
- Strong reads can be requested with `ConsistentRead`.
- Tables and local secondary indexes support strong reads.
- Global secondary indexes and streams are eventually consistent.

Video learning:
- Explains consistency as a distributed-system tradeoff.
- Shows why not every read needs to be strongly consistent.
- Connects strong consistency to cost and correctness.

My hands-on:
- Added CLI examples for normal reads and `--consistent-read`.
- Documented when to choose eventual consistency versus strong consistency.
- Added mistakes notes for expecting strong reads everywhere.

Command pattern:

```bash
aws dynamodb get-item \
  --table-name "$DDB_TABLE" \
  --consistent-read \
  --key '{"UserId": {"S": "user#1"}, "NoteId": {"S": "note#2026-07-06#001"}}'
```

Files:
- `data-model.md`
- `cli-commands.md`
- `mistakes.md`

## Official References

- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SQLtoNoSQL.CreateTable.html
