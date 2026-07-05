# Phase 9: DynamoDB

Goal:
Learn DynamoDB basics and CRUD operations.

Current progress:
- Video 70 complete: DynamoDB basics and table concepts.
- Video 71 complete: DynamoDB data types.
- Video 72 complete: primary key, partition key, sort key, and composite key.
- Video 73 complete: strong and eventual consistency.
- Current listed Phase 9 videos are complete out of order while the main path remains at Phase 7 video 50.
- Phase 9 remains open for future DynamoDB videos if the ongoing playlist adds more.

Phase work:
- `boto3-crud.py`
- `cli-commands.md`
- `data-model.md`
- `cleanup.md`
- `mistakes.md`
- `phase-notes.md`

What I learned from videos 70-73:
- DynamoDB is a managed NoSQL database.
- DynamoDB stores data in tables as items made of attributes.
- Apart from the primary key, DynamoDB is schemaless, so different items can have different attributes.
- Tables need a primary key.
- On-demand billing is the safest beginner mode for small unpredictable practice traffic.
- DynamoDB data types include scalar, document, and set types.
- Primary key design controls how items are uniquely identified and queried.
- A partition key alone creates a simple primary key.
- A partition key plus sort key creates a composite primary key.
- Eventually consistent reads are the default.
- Strongly consistent reads are available for tables and local secondary indexes, but not for global secondary indexes or streams.

Safety:
- Use on-demand billing for beginner tables.
- Use only test data.
- Keep table names clearly marked as learning resources.
- Delete test tables after practice.
