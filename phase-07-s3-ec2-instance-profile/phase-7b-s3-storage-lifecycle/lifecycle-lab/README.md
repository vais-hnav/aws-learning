# S3 Storage Classes And Lifecycle Lab

## What Did I Build?

A beginner-safe S3 storage-class study lab.

At this stage, the lab focuses on:
- Comparing S3 storage classes conceptually.
- Understanding why S3 Standard is the default.
- Understanding when S3 Express One Zone is useful.
- Understanding what directory buckets change.
- Comparing Standard-IA, One Zone-IA, Glacier classes, and Intelligent-Tiering.
- Inspecting an object's storage class with the CLI.
- Preparing and reviewing a safe disabled lifecycle policy example.

## Which AWS Service Did I Use?

- Amazon S3
- AWS CLI for object inspection

## What Did I Learn?

- Storage classes are chosen per object.
- S3 Standard is the normal default for frequently accessed objects.
- Cheaper storage classes can include tradeoffs such as retrieval fees, minimum storage duration, lower availability, or special access patterns.
- S3 Express One Zone is built for high-performance, latency-sensitive workloads in a single Availability Zone.
- Directory buckets are part of the S3 Express One Zone workflow and behave differently from general purpose buckets.
- Standard-IA keeps multi-AZ resiliency for infrequently accessed data, while One Zone-IA is single-AZ and should only hold re-creatable or less critical data.
- Glacier classes are for archive data; some archive objects must be restored before normal access.
- Lifecycle rules can transition or expire objects automatically, so a wrong rule can move or delete more data than intended.
- Intelligent-Tiering is useful when access patterns are unknown or changing.
- Cost optimization means comparing the full workload, not only the per-GB storage price.

## How Do I Run It?

For now, keep the hands-on part simple:

1. Use the basic S3 lab bucket.
2. Upload a small test object using the default S3 Standard storage class.
3. Use `head-object` to inspect the object's storage class.
4. Review the disabled `lifecycle-policy.json` example.
5. Read the workflow notes in `workflow.md`.
6. Use `commands.md` only when you intentionally want to test storage-class or lifecycle commands.

## How Do I Delete It?

Use `cleanup.md`.

At minimum:
- Delete any test objects under `storage-class-demo/`.
- Delete any test objects under `lifecycle-demo/`.
- Delete lifecycle rules only after the lifecycle policy lab is complete.
- Empty and delete any temporary lab bucket when finished.
