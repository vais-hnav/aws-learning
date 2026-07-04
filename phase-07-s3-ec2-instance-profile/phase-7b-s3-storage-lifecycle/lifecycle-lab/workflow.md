# Workflow

## Video 42: S3 Storage Classes

Concept:
- S3 storage classes let you choose different cost, access, latency, availability, and resiliency tradeoffs.
- Storage class is an object-level setting.
- The right class depends on how often the data is accessed and how quickly it must be retrieved.
- Cost optimization should include storage price, request price, retrieval price, monitoring charges, minimum object size, minimum storage duration, and data-transfer behavior.

Common storage-class decision pattern:

| Storage class | Beginner mental model |
|---|---|
| S3 Standard | Default for frequently accessed data |
| S3 Intelligent-Tiering | Useful when access pattern is unknown or changing |
| S3 Standard-IA | Infrequently accessed data that still needs quick retrieval |
| S3 One Zone-IA | Infrequent data that can be recreated if one Availability Zone is lost |
| S3 Glacier Instant Retrieval | Archive data that still needs millisecond retrieval |
| S3 Glacier Flexible Retrieval | Low-cost archive with slower retrieval options |
| S3 Glacier Deep Archive | Lowest-cost long-term archive with longest retrieval time |
| S3 Express One Zone | Very low-latency frequently accessed data in one Availability Zone |

Beginner rule:

```text
Start with S3 Standard. Move to other classes only when the access pattern and cost tradeoffs are clear.
```

## Video 43: S3 Standard Storage Class

Concept:
- S3 Standard is the default storage class for general purpose buckets.
- It is designed for frequently accessed data.
- It is a good fit for beginner uploads, active application files, logs being read often, static assets, and normal test objects.
- It avoids the retrieval-fee confusion that appears in some infrequent-access and archive classes.

Hands-on check:

```bash
aws s3api head-object \
  --bucket "$S3_BUCKET" \
  --key "storage-class-demo/standard.txt" \
  --query '{StorageClass: StorageClass, Size: ContentLength, Encryption: ServerSideEncryption}'
```

Note:

```text
For many S3 Standard objects, the StorageClass field might be absent in some list/head views because STANDARD is the default.
```

Why it matters:
- S3 Standard is the safe learning default.
- It is easier to reason about because objects are immediately accessible.
- It is not always the cheapest long-term option, but it avoids surprise retrieval and early-deletion patterns while learning.

## Video 44: S3 Express One Zone

Concept:
- S3 Express One Zone is a high-performance S3 storage class for frequently accessed, latency-sensitive data.
- It stores data redundantly within a single Availability Zone.
- It is connected with directory buckets, which have a different workflow from general purpose buckets.
- It can improve latency and request-cost behavior for the right workload, but it is not the default place for beginner files.

Good use cases:
- Performance-critical analytics.
- Temporary high-speed processing data.
- Workloads where compute and storage are intentionally placed close together.
- Frequently accessed datasets that need very low latency.

Beginner safety rule:

```text
Learn the concept now. Wait for the directory bucket video before doing hands-on S3 Express One Zone work.
```

Why not rush this lab:
- It uses directory buckets instead of normal general purpose buckets.
- It is Availability-Zone scoped.
- It has different naming and endpoint behavior.
- It is meant for a specific performance problem, not casual file storage.

## Video 45: S3 Directory Buckets

Concept:
- Directory buckets are the bucket type used with S3 Express One Zone.
- General purpose buckets organize objects with a flat key namespace and prefix views.
- Directory buckets organize data hierarchically into directories.
- Directory bucket names include the zone ID and end with the `--x-s3` suffix.
- Directory buckets are scoped to a selected Availability Zone or Local Zone, depending on the bucket type.
- Block Public Access is enabled by default for directory buckets, Object Ownership is bucket-owner-enforced, and ACLs are disabled.

Naming pattern:

```text
bucket-base-name--zone-id--x-s3
```

Important behavior:
- Directory bucket list results are not sorted like normal bucket listings.
- The `/` delimiter matters because directories are determined by delimiter boundaries.
- A directory bucket with no request activity for a long period can become inactive, but storage charges still apply.
- Directory buckets are for performance-focused workloads, not casual beginner object storage.

Beginner rule:

```text
Use general purpose buckets for normal learning labs. Create directory buckets only when intentionally practicing S3 Express One Zone.
```

## Video 46: S3 Standard-IA And One Zone-IA

Concept:
- `STANDARD_IA` means Standard-Infrequent Access.
- `ONEZONE_IA` means One Zone-Infrequent Access.
- Both are for data that is accessed less often but still needs quick retrieval when requested.
- Standard-IA stores data across multiple Availability Zones.
- One Zone-IA stores data in a single Availability Zone, so it is cheaper but less resilient to AZ-level loss.

Good fit:
- Backups that are not constantly read.
- Reports or documents kept for occasional access.
- Re-creatable data for One Zone-IA.
- Data that should stay quickly retrievable but does not need S3 Standard pricing.

Cost cautions:
- Infrequent-access classes can have retrieval charges.
- Minimum storage duration charges can apply.
- Tiny or short-lived objects often do not save money after request and minimum-duration costs.

Beginner rule:

```text
Use Standard-IA for important infrequent data. Use One Zone-IA only when the data can be recreated.
```

## Video 47: S3 Glacier Storage Class

Concept:
- S3 Glacier storage classes are for archive and long-term retention.
- Glacier Instant Retrieval is for archive data that still needs millisecond retrieval.
- Glacier Flexible Retrieval is for archive data that can wait minutes to hours.
- Glacier Deep Archive is for the lowest-cost long-term archive where retrieval can take longer.

Good fit:
- Long-term backups.
- Compliance archives.
- Old logs that are rarely read.
- Historical data kept for records, not daily application access.

Restore mindset:
- Some Glacier classes require a restore operation before normal access.
- Restore time and retrieval cost should be planned before moving data into archive classes.
- Lifecycle rules can move objects to Glacier classes automatically, but the rule should be narrow and intentional.

Beginner rule:

```text
Do not archive important learning files unless you understand restore time, retrieval cost, and minimum storage duration.
```

## Video 48: S3 Lifecycle Policies

Concept:
- S3 Lifecycle rules automate object transitions and expirations.
- A transition moves objects to another storage class.
- An expiration deletes objects after a rule-defined age.
- Rules can target a whole bucket, a prefix, object tags, or object-size filters.
- Lifecycle rules can apply to existing objects and future objects.

Safe example pattern:
- Scope the rule to a test prefix such as `lifecycle-demo/`.
- Keep the rule disabled while learning the JSON shape.
- Enable only after checking the bucket, prefix, object age, and cost impact.

Lifecycle actions in the sample JSON:
- Transition after 30 days to `STANDARD_IA`.
- Transition after 90 days to `GLACIER_IR`.
- Transition after 180 days to `DEEP_ARCHIVE`.
- Expire after 365 days.

Important:
- Lifecycle processing is asynchronous and can take time.
- Billing can change when an object becomes eligible for a lifecycle action.
- Objects smaller than 128 KB do not transition by default under current S3 Lifecycle behavior.
- A broad lifecycle rule can accidentally transition or delete more than intended.

Beginner rule:

```text
Never apply a lifecycle rule to an important bucket until you test it with a narrow prefix.
```

## Video 49: S3 Intelligent-Tiering

Concept:
- S3 Intelligent-Tiering is for unknown, changing, or unpredictable access patterns.
- Objects start in the Frequent Access tier.
- If objects are not accessed for 30 consecutive days, they can move to the Infrequent Access tier.
- If objects are not accessed for 90 consecutive days, they can move to the Archive Instant Access tier.
- Optional Archive Access and Deep Archive Access tiers can be enabled for asynchronous archive retrieval.
- The storage class remains `INTELLIGENT_TIERING`; the object moves between internal access tiers.

Why it is useful:
- You do not have to manually guess the access pattern.
- Frequently accessed objects stay fast.
- Infrequently accessed objects can move to lower-cost tiers automatically.
- There are no retrieval charges for S3 Intelligent-Tiering, but monitoring and automation charges can apply.

Beginner rule:

```text
Use Intelligent-Tiering when access is unpredictable and the object count/size makes monitoring cost worthwhile.
```

## Safe Hands-On For Videos 42-49

Use only the normal S3 lab bucket for now:

```bash
aws s3 cp s3-lab-test.txt "s3://$S3_BUCKET/storage-class-demo/standard.txt" --storage-class STANDARD
```

Optional storage-class upload examples:

```bash
aws s3 cp s3-lab-test.txt "s3://$S3_BUCKET/storage-class-demo/intelligent-tiering.txt" --storage-class INTELLIGENT_TIERING
```

```bash
aws s3 cp s3-lab-test.txt "s3://$S3_BUCKET/storage-class-demo/standard-ia.txt" --storage-class STANDARD_IA
```

Use the IA examples only when you accept the cost/minimum-duration tradeoffs for test objects.

Then inspect it:

```bash
aws s3api head-object \
  --bucket "$S3_BUCKET" \
  --key "storage-class-demo/standard.txt"
```

Cleanup:

```bash
aws s3 rm "s3://$S3_BUCKET/storage-class-demo/" --recursive
```

Lifecycle policy review:

```bash
aws s3api get-bucket-lifecycle-configuration \
  --bucket "$S3_BUCKET"
```

The included `lifecycle-policy.json` uses `Status: "Disabled"` so it is safe to review before enabling.

## Official References

- https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/sc-howtoset.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/directory-buckets-overview.html
- https://aws.amazon.com/s3/storage-classes/
- https://aws.amazon.com/s3/storage-classes/express-one-zone/
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-express-Endpoints.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/how-to-set-lifecycle-configuration-intro.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering-overview.html
