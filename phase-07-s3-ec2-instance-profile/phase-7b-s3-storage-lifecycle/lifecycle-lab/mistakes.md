# Mistakes

## Treating Directory Buckets Like Normal Buckets

Directory buckets are designed for S3 Express One Zone and performance-focused workloads. They have different naming, zone, endpoint, and access behavior from general purpose buckets.

Safer rule:

```text
Use normal general purpose buckets for beginner S3 labs unless the lab is specifically about directory buckets.
```

## Using One Zone-IA For Important Data

One Zone-IA stores data in a single Availability Zone. It is cheaper, but it is not the right choice for data that must survive an AZ-level event.

Safer rule:

```text
Use One Zone-IA only for data that can be recreated.
```

## Moving Small Or Short-Lived Objects To IA Too Early

Infrequent-access classes can include retrieval charges and minimum storage duration charges.

Safer rule:

```text
Use S3 Standard for temporary test objects unless the lab is specifically about IA classes.
```

## Archiving Objects Before Understanding Restore

Some Glacier storage classes require a restore operation before the object can be read normally.

Safer rule:

```text
Do not move important files to Glacier until restore time, restore cost, and minimum duration are understood.
```

## Applying A Lifecycle Rule To The Whole Bucket

A lifecycle rule without a narrow filter can transition or delete more objects than intended.

Safer rule:

```text
Start with a test prefix such as lifecycle-demo/ and keep the rule disabled until reviewed.
```

## Forgetting Lifecycle Rules Apply Later Too

Lifecycle rules can affect both existing objects and future objects that match the rule.

Safer rule:

```text
After practice, delete the lifecycle configuration or leave the rule disabled.
```

## Expecting Intelligent-Tiering To Show A Different Storage Class For Each Tier

Objects remain in the `INTELLIGENT_TIERING` storage class while AWS manages internal access tiers.

Safer rule:

```text
Think of Intelligent-Tiering as one storage class with automatic internal tiers.
```

