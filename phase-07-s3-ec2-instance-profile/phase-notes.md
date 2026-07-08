# Phase 7 Notes

This phase covers S3 storage and safe EC2-to-S3 access using IAM instance profiles.

Note source:
- Based on playlist video order/titles, video descriptions, AWS documentation, and hands-on work documented in this repo.
- Paraphrased explanatory notes, not verbatim transcripts.

## 34. S3 Cloud Storage Hands-On Lab

Concept:
- Amazon S3 is object storage.
- Buckets are containers for objects.
- Objects are files plus metadata.
- S3 is useful for files, backups, static assets, logs, and application data.
- S3 buckets are Region-specific and bucket names are globally unique.

Video learning:
- Introduces S3 from the console.
- Shows the bucket/object workflow.
- Demonstrates creating a bucket, uploading a file, opening/downloading it, and deleting resources.
- Reinforces that S3 is not a local disk like EBS.

My hands-on:
- Prepared the basic S3 lab.
- Documented console and CLI workflows for bucket creation, object upload, object listing, object download, object copy, object deletion, and bucket deletion.
- Kept Block Public Access enabled for beginner safety.

Files:
- `phase-7a-s3-basics/basic-s3-lab/README.md`
- `phase-7a-s3-basics/basic-s3-lab/commands.md`
- `phase-7a-s3-basics/basic-s3-lab/workflow.md`
- `phase-7a-s3-basics/basic-s3-lab/cleanup.md`
- `phase-7a-s3-basics/basic-s3-lab/mistakes.md`

## 35. EC2 Instance Profile Hands-On

Concept:
- EC2 should use IAM roles instead of long-term access keys.
- An IAM role contains permissions.
- An instance profile passes the role to EC2.
- The EC2 instance receives temporary credentials automatically.
- Applications and AWS CLI commands on EC2 can use those temporary credentials.

Video learning:
- Shows the safer pattern for EC2-to-S3 access.
- Connects IAM roles with EC2 instances.
- Demonstrates that EC2 can access S3 without storing access keys on the instance.
- Reinforces least privilege and role-based access.

My hands-on:
- Prepared the EC2 instance profile S3 lab.
- Added an EC2 trust policy.
- Added a read-only S3 IAM policy for learning buckets.
- Documented role, instance profile, association, EC2 test commands, and cleanup.

Files:
- `phase-7d-ec2-instance-profile-s3/ec2-instance-profile-s3/README.md`
- `phase-7d-ec2-instance-profile-s3/ec2-instance-profile-s3/trust-policy.json`
- `phase-7d-ec2-instance-profile-s3/ec2-instance-profile-s3/iam-policy.json`
- `phase-7d-ec2-instance-profile-s3/ec2-instance-profile-s3/commands.md`
- `phase-7d-ec2-instance-profile-s3/ec2-instance-profile-s3/workflow.md`
- `phase-7d-ec2-instance-profile-s3/ec2-instance-profile-s3/cleanup.md`
- `phase-7d-ec2-instance-profile-s3/ec2-instance-profile-s3/mistakes.md`

## 39. S3 Buckets

Concept:
- Buckets are the top-level containers in S3.
- Bucket names are globally unique.
- Buckets are created in a specific AWS Region.
- Bucket-level settings control public access, encryption, versioning, policies, and other features.
- S3 uses prefixes to organize object keys in a folder-like way.

Video learning:
- Focuses on bucket concepts and bucket-level settings.
- Reinforces that a bucket is not a folder and an object is not a block device.
- Shows why Region, naming, and public access settings matter.

My hands-on:
- Continued the private S3 bucket lab.
- Documented bucket creation, bucket settings, object prefixes, and cleanup.
- Kept Block Public Access enabled.

Files:
- `phase-7a-s3-basics/README.md`
- `phase-7a-s3-basics/basic-s3-lab/README.md`
- `phase-7a-s3-basics/basic-s3-lab/workflow.md`
- `phase-7a-s3-basics/basic-s3-lab/mistakes.md`

## 40. S3 CLI Upload, Copy, And Manage Buckets

Concept:
- `aws s3` provides high-level S3 commands for everyday object operations.
- `aws s3api` exposes lower-level S3 API-style commands.
- `--recursive` lets copy/remove/list operations walk through prefixes or local directories.
- `sync` compares source and destination and copies only missing or changed files.

Video learning:
- Practices S3 operations through the CLI.
- Connects console bucket/object concepts to repeatable commands.
- Shows how CLI commands make upload, copy, list, and delete workflows faster and easier to document.

My hands-on:
- Ran `s3api list-objects-v2` with a prefix to list objects under `lost/`.
- Used `--fetch-owner` to include owner data.
- Used a JMESPath `--query` to display only object key and owner ID.
- Practiced `cp --recursive`.
- Compared `cp --recursive` with `sync` and documented the difference.

Command pattern:

```bash
aws s3api list-objects-v2 \
  --bucket "$S3_BUCKET" \
  --prefix "lost/" \
  --fetch-owner \
  --query 'Contents[].{Key: Key, OwnerID: Owner.ID}'
```

Files:
- `phase-7a-s3-basics/basic-s3-lab/commands.md`
- `phase-7a-s3-basics/basic-s3-lab/workflow.md`
- `phase-7a-s3-basics/basic-s3-lab/cleanup.md`

## 41. S3 Objects

Concept:
- An S3 object is the data stored in S3 plus metadata about that data.
- The object key is the full identifier used to retrieve the object from a bucket.
- A prefix is the beginning part of an object key that makes the console look folder-like.
- Object properties help explain what S3 knows about an uploaded file: size, storage class, timestamps, encryption, metadata, tags, and version information.
- Storage class belongs to the object, so different objects in the same bucket can use different storage classes.

Video learning:
- Builds on the earlier bucket lesson by zooming in from bucket-level storage to object-level storage.
- Explains that S3 does not store files in a traditional folder hierarchy.
- Shows how object keys and prefixes organize data in a bucket.
- Connects object properties with later S3 topics such as storage classes, lifecycle rules, versioning, encryption, and security.

My hands-on:
- Extended the basic S3 lab with object inspection commands.
- Added `head-object` examples to inspect object properties without downloading content.
- Added `put-object` with user-defined metadata.
- Added listing examples that show key, size, storage class, and last modified time.
- Added mistakes notes for full object keys, metadata safety, copy-then-delete rename behavior, and ETag assumptions.

Command pattern:

```bash
aws s3api head-object \
  --bucket "$S3_BUCKET" \
  --key "s3-lab-test.txt"
```

Files:
- `phase-7a-s3-basics/README.md`
- `phase-7a-s3-basics/basic-s3-lab/README.md`
- `phase-7a-s3-basics/basic-s3-lab/commands.md`
- `phase-7a-s3-basics/basic-s3-lab/workflow.md`
- `phase-7a-s3-basics/basic-s3-lab/mistakes.md`

## 42. S3 Storage Classes

Concept:
- S3 storage classes are different ways to store objects depending on access pattern, latency requirement, resiliency need, and cost goal.
- The cheapest per-GB storage class is not always the cheapest overall choice.
- Total cost can include storage, requests, retrieval, monitoring, minimum object size, minimum storage duration, and data transfer.
- Cost optimization works best when the storage class matches the real usage pattern.

Video learning:
- Introduces the storage-class family instead of treating S3 as one fixed price/performance option.
- Frames storage classes as a cost-optimization tool.
- Shows why frequently accessed, infrequently accessed, rarely accessed, and performance-sensitive data should not always be stored the same way.
- Prepares for the later lifecycle policy video where objects can be transitioned automatically.

Storage-class mental model:

| Storage class | Use-case idea |
|---|---|
| S3 Standard | Frequently accessed general-purpose data |
| S3 Intelligent-Tiering | Unknown or changing access patterns |
| S3 Standard-IA | Infrequent access with multi-AZ resiliency |
| S3 One Zone-IA | Re-creatable infrequent data in one AZ |
| S3 Glacier classes | Archive and long-term retention |
| S3 Express One Zone | Low-latency frequent access in one AZ |

My hands-on:
- Prepared the storage-class/lifecycle lab folder.
- Documented the safe beginner decision rule: start with S3 Standard, then move only when the access pattern is known.
- Added CLI inspection examples for object storage class.
- Deferred risky or special-purpose storage class labs until the related videos are covered.

Files:
- `phase-7b-s3-storage-lifecycle/README.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/README.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/workflow.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/cleanup.md`

## 43. S3 Standard Storage Class

Concept:
- S3 Standard is the default storage class for objects in general purpose buckets.
- It is designed for frequently accessed data.
- It is the simplest beginner choice because objects are immediately accessible and do not require archive restore workflows.
- It is a strong default for active files, website assets, logs that are read often, and normal learning objects.

Video learning:
- Focuses on S3 Standard as the baseline storage class.
- Explains why Standard is commonly used before optimizing into other classes.
- Connects storage-class selection with cost optimization: optimize later based on real access patterns, not guessing too early.

My hands-on:
- Added a safe `--storage-class STANDARD` upload example.
- Added `head-object` examples to verify object properties.
- Documented that S3 Standard can appear as the default even when a listing does not explicitly show a storage class field.

Command pattern:

```bash
aws s3 cp s3-lab-test.txt "s3://$S3_BUCKET/storage-class-demo/standard.txt" --storage-class STANDARD
```

Beginner rule:

```text
Use S3 Standard while learning unless a lab intentionally compares another storage class.
```

Files:
- `phase-7a-s3-basics/basic-s3-lab/commands.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/workflow.md`

## 44. S3 Express One Zone

Concept:
- S3 Express One Zone is a high-performance storage class for frequently accessed, latency-sensitive data.
- It stores data redundantly within a single Availability Zone.
- It is tied to directory buckets, which have different bucket behavior from normal general purpose buckets.
- It is not a casual replacement for S3 Standard; it solves a specific performance problem.

Video learning:
- Introduces the performance-focused side of S3 storage classes.
- Explains the tradeoff between very low latency and single-AZ scope.
- Prepares for the next topic: directory buckets.
- Reinforces that storage-class decisions should consider architecture, not just price.

Good-fit examples:
- High-speed analytics workloads.
- Temporary processing data close to compute.
- Very frequently accessed data where request latency is important.

Safety:
- Do not create Express One Zone resources casually before understanding directory buckets.
- Keep beginner storage-class practice inside normal general purpose buckets with S3 Standard.
- Delete all test objects after storage-class experiments.

Files:
- `phase-7b-s3-storage-lifecycle/README.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/README.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/workflow.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/cleanup.md`

## 45. S3 Directory Buckets

Concept:
- Directory buckets are the S3 bucket type used with S3 Express One Zone.
- They organize data hierarchically into directories instead of using only the flat key/prefix model of general purpose buckets.
- Directory bucket names include the zone ID and use the `--x-s3` suffix.
- Directory buckets are designed for very high request performance and low-latency access close to compute.
- Their access and endpoint behavior is different from normal S3 bucket practice.

Video learning:
- Connects the previous S3 Express One Zone lesson to the bucket type needed to use it.
- Explains why this is not just a normal S3 bucket with a different storage class.
- Reinforces the idea that S3 has different storage patterns for different workload needs.

My hands-on:
- Updated the storage-class workflow with directory bucket concepts.
- Documented the directory bucket naming pattern.
- Added beginner safety guidance to avoid creating directory buckets casually.
- Kept the lab focused on general purpose buckets until a specific Express One Zone/directory-bucket exercise is needed.

Beginner rule:

```text
Use general purpose buckets for normal S3 learning. Use directory buckets only for intentional S3 Express One Zone practice.
```

Files:
- `phase-7b-s3-storage-lifecycle/README.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/workflow.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/mistakes.md`

## 46. S3 Standard-IA And One Zone-IA

Concept:
- Standard-IA and One Zone-IA are for infrequently accessed data that still needs quick retrieval.
- Standard-IA stores object data across multiple Availability Zones.
- One Zone-IA stores data in a single Availability Zone.
- One Zone-IA is cheaper, but it should be used only when the data is re-creatable or less critical.
- IA classes can include retrieval charges and minimum storage duration charges.

Video learning:
- Compares two infrequent-access options.
- Shows how the lower price comes with access-pattern and resiliency tradeoffs.
- Reinforces that storage-class choice is an architecture decision, not just a price decision.

My hands-on:
- Added optional CLI examples for `STANDARD_IA` and `ONEZONE_IA`.
- Documented why IA examples are optional in a beginner repo.
- Added mistakes notes for using One Zone-IA with important data and moving small/short-lived files too early.

Command pattern:

```bash
aws s3 cp lifecycle-demo/storage-class-demo.txt "s3://$S3_BUCKET/storage-class-demo/standard-ia.txt" --storage-class STANDARD_IA
```

Files:
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/commands.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/workflow.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/mistakes.md`

## 47. S3 Glacier Storage Class

Concept:
- S3 Glacier storage classes are for archive and long-term retention.
- Glacier Instant Retrieval is for archive data that still needs fast access.
- Glacier Flexible Retrieval is for archive data that can wait minutes to hours.
- Glacier Deep Archive is for very low-cost long-term archive data with slower retrieval.
- Archive storage should be planned with restore time, retrieval cost, and minimum storage duration in mind.

Video learning:
- Shows where Glacier fits in the S3 storage-class family.
- Connects archive storage to cost optimization.
- Highlights that cold storage is not the same as frequently accessed object storage.
- Prepares for lifecycle policies that can transition old data into archive classes.

My hands-on:
- Added Glacier notes into the lifecycle workflow.
- Used lifecycle JSON to show future transitions to `GLACIER_IR` and `DEEP_ARCHIVE`.
- Added safety guidance to avoid archiving important files before understanding restore behavior.

Files:
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/lifecycle-policy.json`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/workflow.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/mistakes.md`

## 48. S3 Lifecycle Policies

Concept:
- S3 Lifecycle policies automate storage-class transitions and object expiration.
- Transition actions move objects to another storage class after a defined age.
- Expiration actions delete objects after a defined age.
- Rules can target a bucket, prefix, tags, and size filters.
- Lifecycle rules can affect existing matching objects and future matching objects.

Video learning:
- Demonstrates how storage cost optimization can be automated.
- Shows why lifecycle rules must be scoped carefully.
- Connects previous storage-class lessons into one workflow: Standard to IA to Glacier to expiration.

My hands-on:
- Replaced the empty lifecycle JSON with a disabled example rule.
- Scoped the sample rule to `lifecycle-demo/`.
- Added commands to apply, view, and delete a lifecycle configuration.
- Kept the example disabled by default to avoid accidental object transitions or deletions.

Lifecycle example:

```json
{
  "ID": "aws-learning-disabled-lifecycle-demo",
  "Status": "Disabled",
  "Filter": {
    "Prefix": "lifecycle-demo/"
  }
}
```

Safety:
- Never apply lifecycle rules to an important bucket without a narrow filter.
- Review object age, prefix, and storage-class costs first.
- Delete or disable lifecycle rules after practice.

Files:
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/lifecycle-policy.json`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/commands.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/cleanup.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/mistakes.md`

## 49. S3 Intelligent-Tiering

Concept:
- S3 Intelligent-Tiering is for data with unknown, changing, or unpredictable access patterns.
- Objects start in a Frequent Access tier.
- Objects can move to an Infrequent Access tier after no access for 30 consecutive days.
- Objects can move to an Archive Instant Access tier after no access for 90 consecutive days.
- Optional Archive Access and Deep Archive Access tiers can be enabled for data that can be restored asynchronously.
- The object remains in the `INTELLIGENT_TIERING` storage class while AWS manages the internal access tier.

Video learning:
- Shows an alternative to manually guessing lifecycle transitions.
- Explains why Intelligent-Tiering is useful when access patterns are uncertain.
- Reinforces that cost savings can be automated, but monitoring and automation charges still matter.

My hands-on:
- Added a safe `INTELLIGENT_TIERING` upload example.
- Documented that Intelligent-Tiering is one storage class with internal tiers.
- Added mistakes notes so I do not expect each access tier to appear as a separate storage class.

Command pattern:

```bash
aws s3 cp lifecycle-demo/storage-class-demo.txt "s3://$S3_BUCKET/storage-class-demo/intelligent-tiering.txt" --storage-class INTELLIGENT_TIERING
```

Files:
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/commands.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/workflow.md`
- `phase-7b-s3-storage-lifecycle/lifecycle-lab/mistakes.md`

## 50. S3 Data Protection And Durability

Concept:
- S3 durability protects object data against storage hardware failure.
- Data protection is broader than durability.
- Data protection includes accidental delete recovery, overwrite recovery, replication, immutable retention, encryption, access control, monitoring, and backup strategy.
- Versioning, replication, Object Lock, lifecycle rules, encryption, Block Public Access, and IAM policies each protect a different part of the S3 workflow.

Video learning:
- Introduces S3 data protection as a full set of controls rather than one feature.
- Separates durability from recovery, security, and compliance.
- Prepares for versioning, replication, Object Lock, and security videos.

My hands-on:
- Expanded the Phase 7C security lab.
- Added a data protection workflow table.
- Documented when to use versioning, replication, Object Lock, encryption, and security controls.
- Added cleanup and mistakes notes to avoid cost or undeletable-object surprises.

Files:
- `phase-7c-s3-data-protection-security/README.md`
- `phase-7c-s3-data-protection-security/security-lab/README.md`
- `phase-7c-s3-data-protection-security/security-lab/workflow.md`
- `phase-7c-s3-data-protection-security/security-lab/mistakes.md`

## 51. Recover Deleted Files With S3 Versioning

Concept:
- S3 Versioning stores multiple versions of an object in the same bucket.
- Uploading the same key creates a new version.
- A normal delete in a versioning-enabled bucket creates a delete marker.
- The object can appear deleted while old versions still exist.
- Removing the delete marker can restore visibility of the previous version.

Video learning:
- Demonstrates how deleted files can be recovered when versioning is enabled.
- Shows the importance of object version IDs.
- Explains why cleanup in versioned buckets requires removing old versions and delete markers.

My hands-on:
- Added versioning CLI commands.
- Added list-object-versions examples.
- Added recovery-by-delete-marker workflow.
- Added cleanup guidance for old versions and delete markers.

Command pattern:

```bash
aws s3api list-object-versions \
  --bucket "$S3_BUCKET" \
  --prefix "versioning-demo/file.txt"
```

Files:
- `phase-7c-s3-data-protection-security/security-lab/commands.md`
- `phase-7c-s3-data-protection-security/security-lab/workflow.md`
- `phase-7c-s3-data-protection-security/security-lab/cleanup.md`
- `phase-7c-s3-data-protection-security/security-lab/mistakes.md`

## 52. S3 Cross-Region Replication Lab

Concept:
- S3 replication copies objects from a source bucket to a destination bucket.
- Cross-Region Replication copies objects into a different AWS Region.
- Same-Region Replication copies objects within the same Region.
- Versioning must be enabled on both source and destination buckets.
- S3 uses an IAM role to perform replication.
- Replication is asynchronous.

Video learning:
- Shows how S3 can keep a second copy of data in another bucket.
- Connects replication to disaster recovery, compliance, latency, and account/Region separation.
- Reinforces cost awareness because replication duplicates objects and can add cross-Region transfer cost.

My hands-on:
- Documented source and destination bucket workflow.
- Added replication inspection and deletion commands.
- Added cleanup steps for source and destination test objects.
- Added warnings that new replication rules do not automatically replicate old objects unless batch replication is planned.

Files:
- `phase-7c-s3-data-protection-security/security-lab/commands.md`
- `phase-7c-s3-data-protection-security/security-lab/workflow.md`
- `phase-7c-s3-data-protection-security/security-lab/cleanup.md`
- `phase-7c-s3-data-protection-security/security-lab/mistakes.md`

## 53. S3 Object Lock

Concept:
- S3 Object Lock protects object versions with a write-once-read-many model.
- It can prevent object versions from being deleted or overwritten for a retention period or legal hold.
- Object Lock works with S3 Versioning.
- Governance mode can be bypassed only with special permissions.
- Compliance mode cannot be bypassed during the retention period.

Video learning:
- Introduces immutable object protection.
- Explains retention period, legal hold, governance mode, and compliance mode.
- Shows why Object Lock is powerful but risky for casual learning buckets.

My hands-on:
- Added Object Lock safety notes and inspection commands.
- Documented that Object Lock should not be enabled casually.
- Added cleanup warnings because Object Lock is intentionally hard to undo.

Beginner rule:

```text
Learn Object Lock conceptually unless the lab intentionally requires an Object Lock bucket.
```

Files:
- `phase-7c-s3-data-protection-security/security-lab/commands.md`
- `phase-7c-s3-data-protection-security/security-lab/workflow.md`
- `phase-7c-s3-data-protection-security/security-lab/cleanup.md`
- `phase-7c-s3-data-protection-security/security-lab/mistakes.md`

## 54. S3 Security

Concept:
- S3 buckets and objects are private by default.
- Public access can be introduced through ACLs, bucket policies, access point policies, or object permissions.
- S3 Block Public Access is a protective control that helps prevent accidental public access.
- IAM policies grant permissions to identities.
- Bucket policies grant permissions on bucket resources.
- Encryption, monitoring, logging, and least privilege are part of the security baseline.

Video learning:
- Summarizes S3 security controls before the deeper IAM-vs-bucket-policy topic.
- Reinforces private-by-default thinking.
- Prepares for bucket policy, encryption, and Block Public Access videos.

My hands-on:
- Expanded the S3 security lab.
- Added bucket policy examples for denying insecure transport and allowing read-only access to a specific role.
- Kept the earlier `user1` read-only IAM policy lab.
- Added mistakes notes for accidental public access and overbroad permissions.

Files:
- `phase-7c-s3-data-protection-security/security-lab/README.md`
- `phase-7c-s3-data-protection-security/security-lab/bucket-policy-examples.json`
- `phase-7c-s3-data-protection-security/security-lab/user1-s3-read-only-policy.json`
- `phase-7c-s3-data-protection-security/security-lab/mistakes.md`

## Supplemental Phase 7C Topic: S3 Access Points

Concept:
- S3 Access Points are named endpoints attached to a bucket or supported FSx file system.
- For S3 buckets, access points are used for object-level operations.
- Each access point can have its own policy.
- Access points help manage access to shared datasets without putting every application rule into one large bucket policy.
- Access points can be configured for internet access or VPC-only access.

Why this belongs in Phase 7C:
- It extends the S3 security topic.
- It prepares for IAM vs bucket policies.
- It gives a cleaner mental model for large shared buckets and data lake access.

Important permission model:
- The access point policy must allow the request.
- The underlying bucket must also allow the request or delegate access control to access points.
- IAM identity policies can still allow or deny the caller.
- Block Public Access can still block public access.
- Access point restrictions apply only to requests made through that access point.

Beginner rule:

```text
Use normal IAM and bucket policies first. Use S3 Access Points when access needs become app-specific, team-specific, or VPC-specific.
```

Files:
- `phase-7c-s3-data-protection-security/security-lab/access-points-notes.md`
- `phase-7c-s3-data-protection-security/security-lab/workflow.md`
- `phase-7c-s3-data-protection-security/security-lab/cleanup.md`
- `phase-7c-s3-data-protection-security/security-lab/mistakes.md`

## 55. IAM Vs Bucket Policies

Concept:
- IAM policies are identity-based policies attached to users, groups, or roles.
- Bucket policies are resource-based policies attached to S3 buckets.
- Both are written in JSON policy language.
- IAM policies answer: what can this identity do?
- Bucket policies answer: who can access this bucket and under what conditions?
- Explicit deny overrides allow.

Video learning:
- Compares identity-side and bucket-side S3 access control.
- Explains why bucket policies are useful for bucket ownership, cross-account access, and resource-side guardrails.
- Prepares for policy troubleshooting: both identity and resource permissions can be involved.

My hands-on:
- Kept the existing `user1` IAM read-only policy example.
- Added bucket policy examples for read-only role access and deny-insecure-transport.
- Added CLI commands to apply, view, and delete bucket policies.
- Added mistakes notes for explicit deny and identity-vs-resource confusion.

Files:
- `phase-7c-s3-data-protection-security/security-lab/user1-s3-read-only-policy.json`
- `phase-7c-s3-data-protection-security/security-lab/bucket-policy-examples.json`
- `phase-7c-s3-data-protection-security/security-lab/commands.md`
- `phase-7c-s3-data-protection-security/security-lab/mistakes.md`

## 56. S3 Encryption

Concept:
- S3 encrypts new objects by default with SSE-S3.
- SSE-S3 uses S3 managed keys.
- SSE-KMS uses AWS KMS keys and gives more key control, CloudTrail visibility, and key policy control.
- SSE-KMS can require extra KMS permissions such as `kms:Decrypt` and `kms:GenerateDataKey`.
- S3 Bucket Keys can reduce KMS request cost for SSE-KMS workloads.
- Encryption protects stored data, but it does not replace access control.

Video learning:
- Explains why encryption is a core S3 security control.
- Shows the difference between S3-managed encryption and KMS-managed encryption.
- Reinforces that S3 security combines encryption, permissions, and public-access controls.

My hands-on:
- Added `get-bucket-encryption` and `put-bucket-encryption` commands.
- Added SSE-S3 upload and object inspection commands.
- Added SSE-KMS default encryption example with S3 Bucket Key enabled.
- Added policy example for denying uploads that do not include server-side encryption.

Files:
- `phase-7c-s3-data-protection-security/security-lab/commands.md`
- `phase-7c-s3-data-protection-security/security-lab/bucket-policy-examples.json`
- `phase-7c-s3-data-protection-security/security-lab/cleanup.md`
- `phase-7c-s3-data-protection-security/security-lab/mistakes.md`

## 57. S3 Block Public Access

Concept:
- S3 Block Public Access is a guardrail against accidental public exposure.
- It can be applied at account, bucket, access point, and organization levels.
- It can block or ignore public ACLs and public policies.
- It does not grant access; it only blocks public access paths.
- Beginner buckets should keep all four Block Public Access settings enabled.

Video learning:
- Shows the S3 safety layer that prevents public bucket mistakes.
- Explains why public access can come from multiple places.
- Reinforces that beginner labs should stay private unless the lab intentionally teaches public hosting.

My hands-on:
- Added `put-public-access-block` and `get-public-access-block` commands.
- Added account-level public access block check with `s3control`.
- Added mistakes notes warning against disabling Block Public Access to solve normal permission errors.

Files:
- `phase-7c-s3-data-protection-security/security-lab/commands.md`
- `phase-7c-s3-data-protection-security/security-lab/workflow.md`
- `phase-7c-s3-data-protection-security/security-lab/cleanup.md`
- `phase-7c-s3-data-protection-security/security-lab/mistakes.md`

## Official References

- https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingObjects.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingMetadata.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/view-object-properties.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-folders.html
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
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/data-protection.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/versioning-workflows.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/DeleteMarker.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-requirements.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock-managing.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-policy-language-overview.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/security_iam_service-with-iam.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-access-points.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-access-points.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points-policies.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points-vpc.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points-naming.html
- https://docs.aws.amazon.com/cli/latest/reference/s3api/list-objects-v2.html
- https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html
- https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
