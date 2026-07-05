# Mistakes

## Thinking DynamoDB Is Just SQL Without Joins

DynamoDB is a NoSQL database. You design tables around access patterns instead of designing normalized relational tables first.

Safer rule:

```text
Start with the questions your app must answer, then design the keys.
```

## Choosing A Bad Partition Key

A partition key with too few unique values can create uneven access patterns.

Safer rule:

```text
Choose a partition key with enough variety for the workload.
```

## Forgetting The Sort Key Is Part Of Item Uniqueness

In a composite primary key table, multiple items can share the same partition key only if their sort key values are different.

Safer rule:

```text
Use the full partition key plus sort key when getting or deleting one exact item.
```

## Using Empty Sets

DynamoDB supports string, number, and binary sets, but empty sets are not allowed.

Safer rule:

```text
Omit the set attribute or use an empty list when an empty collection is needed.
```

## Expecting Every Read To Be Strongly Consistent

Eventually consistent reads are the default.

Safer rule:

```text
Use --consistent-read only when you need immediate read-after-write correctness.
```

## Using Strong Reads On A GSI

Global secondary indexes do not support strongly consistent reads.

Safer rule:

```text
Use strong reads only on tables or local secondary indexes.
```

## Forgetting To Delete Test Tables

DynamoDB can keep charging for active tables and optional features.

Safer rule:

```text
Delete learning tables after the lab unless you intentionally need them later.
```
