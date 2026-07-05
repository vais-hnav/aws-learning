# Data Model

This file explains the beginner DynamoDB model used for videos 71-73.

## Core Terms

| Term | Simple meaning |
|---|---|
| Table | Collection of related items |
| Item | One record in a table |
| Attribute | One field/value inside an item |
| Partition key | Main key used to distribute and locate data |
| Sort key | Optional second key used to order related items under one partition key |
| Composite primary key | Partition key plus sort key |

## Video 70: Master AWS DynamoDB

DynamoDB is a managed NoSQL database service.

Beginner mental model:
- A table stores related data.
- An item is one record inside the table.
- An attribute is one field inside an item.
- DynamoDB does not require every item to have the same non-key attributes.
- Every table must have a primary key.
- The primary key design decides how the application can efficiently read data.

SQL versus DynamoDB:

| SQL idea | DynamoDB idea |
|---|---|
| Table | Table |
| Row | Item |
| Column | Attribute |
| Schema defined up front | Primary key required, other attributes flexible |
| Query with joins common | Design access patterns into keys/indexes |

Safe beginner table:

```text
Table: aws-learning-dynamodb-notes
Partition key: UserId
Sort key: NoteId
Billing mode: PAY_PER_REQUEST
```

## Video 71: DynamoDB Data Types

DynamoDB attribute data types fit into three groups.

| Group | Types | Notes |
|---|---|---|
| Scalar | String, Number, Binary, Boolean, Null | Store one value |
| Document | List, Map | Store nested JSON-like structures |
| Set | String Set, Number Set, Binary Set | Store unique values of the same type |

Important rules:
- Key attributes can only be String, Number, or Binary.
- Numbers are written as strings in DynamoDB CLI JSON, but DynamoDB treats them as numbers.
- Lists are ordered.
- Maps are JSON-like objects.
- Sets are unordered and must contain unique values.
- Empty sets are not allowed.
- Items can have different non-key attributes because DynamoDB is schemaless outside the primary key.

Example item:

```json
{
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
}
```

## Video 72: Primary Key

DynamoDB requires every table to have a primary key.

Simple primary key:

```text
Partition key only
Example: UserId
```

Composite primary key:

```text
Partition key + sort key
Example: UserId + NoteId
```

Beginner table design:

| Attribute | Key role | Type | Example |
|---|---|---|---|
| `UserId` | Partition key | String | `user#1` |
| `NoteId` | Sort key | String | `note#2026-07-06#001` |
| `Title` | Normal attribute | String | `DynamoDB primary keys` |
| `Tags` | Normal attribute | String Set | `aws`, `dynamodb` |

Why this design works:
- All notes for one user share the same `UserId`.
- Each note is unique because `NoteId` is different.
- Querying by `UserId` returns the user's notes.
- Querying with both `UserId` and `NoteId` returns one exact note.

Key design rule:

```text
Design keys around access patterns, not around how the data looks in a spreadsheet.
```

## Video 73: Strong And Eventual Consistency

DynamoDB read consistency controls how fresh a read result must be.

| Read type | Meaning | Common use |
|---|---|---|
| Eventually consistent | Default; a very recent write might not appear immediately | Normal reads where tiny delay is acceptable |
| Strongly consistent | Returns the latest successful write before the read | Critical read-after-write checks |

Important rules:
- Eventually consistent reads are the default.
- Strong reads can be requested with `ConsistentRead`.
- Strong reads are available for tables and local secondary indexes.
- Global secondary indexes and streams are eventually consistent.
- Strong reads cost more read capacity than eventually consistent reads.

Beginner rule:

```text
Use eventual consistency by default. Use strong consistency only when the app must immediately verify the latest write.
```
