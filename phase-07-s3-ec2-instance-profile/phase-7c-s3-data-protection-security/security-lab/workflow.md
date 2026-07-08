# Workflow

## Video 50: S3 Data Protection And Durability

Concept:
- S3 durability protects stored object data against hardware failure.
- Data protection also includes recovery from accidental delete, accidental overwrite, bad permissions, Region-level risk, and compliance requirements.
- Durability is not the same as availability, backup, versioning, or access control.

Protection tools:

| Tool | What it protects against |
|---|---|
| Versioning | Accidental overwrite/delete |
| Replication | Regional, account, or compliance copy needs |
| Object Lock | Accidental or malicious delete/overwrite during retention |
| Lifecycle rules | Managed cleanup and archive transitions |
| Encryption | Unauthorized data exposure if storage is accessed |
| Block Public Access | Accidental public exposure |
| IAM and bucket policies | Unauthorized operations |
| Logging and monitoring | Investigation and alerting |

Beginner rule:

```text
Durability protects storage. Versioning, replication, Object Lock, and security controls protect the workflow around storage.
```

## Video 51: Recover Deleted Files With S3 Versioning

Concept:
- S3 Versioning keeps multiple versions of an object in the same bucket.
- Overwriting an object creates a new version instead of replacing history.
- Deleting an object in a versioning-enabled bucket creates a delete marker.
- Removing the delete marker can make the previous version visible again.
- Deleting a specific version ID permanently removes that version.

Safe lab flow:

1. Create or choose a temporary learning bucket.
2. Enable versioning.
3. Upload version 1 of a test object.
4. Upload version 2 using the same object key.
5. Delete the object normally.
6. List object versions and delete markers.
7. Recover by deleting the latest delete marker.
8. Clean up all versions and delete markers.

Important:
- Suspending versioning does not delete existing versions.
- Versioned objects can keep generating storage cost.
- A versioned bucket cannot be emptied with only normal `aws s3 rm` if old versions and delete markers remain.

## Video 52: S3 Cross-Region Replication Lab

Concept:
- S3 replication copies objects from a source bucket to a destination bucket.
- Cross-Region Replication copies to a bucket in another AWS Region.
- Same-Region Replication copies to another bucket in the same Region.
- Replication is asynchronous.
- Versioning must be enabled on source and destination buckets.
- Replication needs an IAM role that S3 can assume.

Typical replication workflow:

1. Create source bucket.
2. Create destination bucket in another Region.
3. Enable versioning on both buckets.
4. Create or let AWS create an IAM replication role.
5. Create a replication rule.
6. Upload a new object to the source bucket.
7. Wait for replication.
8. Verify the object appears in the destination bucket.
9. Delete the replication rule and test buckets after practice.

Cost notes:
- Replication creates another copy of the object.
- Cross-Region traffic can add cost.
- Replication Time Control and metrics can add cost.
- Existing objects are not automatically replicated by a normal new replication rule unless batch replication is configured.

## Video 53: S3 Object Lock

Concept:
- S3 Object Lock uses a write-once-read-many model.
- Object Lock protects object versions from overwrite or deletion.
- It works with S3 Versioning.
- Retention periods protect object versions until a date.
- Legal holds protect object versions until the hold is removed.

Retention modes:

| Mode | Meaning |
|---|---|
| Governance | Protected, but special permission can bypass retention |
| Compliance | Protected even from root until retention expires |

Beginner safety rule:

```text
Do not enable Object Lock on casual learning buckets unless you are intentionally testing immutability and understand cleanup impact.
```

Important:
- After Object Lock is enabled on a bucket, it cannot be disabled.
- After Object Lock is enabled, bucket versioning cannot be suspended.
- Compliance mode can prevent deletion until retention expires.
- Object Lock is useful for compliance, ransomware protection, and immutable backups, but it is not a casual beginner default.

## Video 54: S3 Security

Concept:
- S3 buckets and objects are private by default.
- Public access can happen through ACLs, bucket policies, access point policies, or object permissions.
- S3 Block Public Access is a safety layer that can override public access settings.
- IAM policies grant permissions to identities.
- Bucket policies grant permissions on a bucket resource.
- Encryption protects stored data.
- Logging, CloudTrail, S3 server access logs, and IAM Access Analyzer help with visibility and auditing.

Beginner security baseline:
- Keep Block Public Access enabled.
- Prefer bucket-owner-enforced Object Ownership and disable ACLs.
- Use least privilege IAM policies.
- Avoid `Principal: "*"` unless the lab specifically teaches public access.
- Use encryption by default.
- Do not put secrets in object keys, metadata, tags, or bucket names.
- Remove temporary policies after practice.

## Supplemental Topic: S3 Access Points

Concept:
- S3 Access Points are named endpoints for accessing objects in a bucket.
- One bucket can have multiple access points.
- Each access point can have its own access point policy.
- Access points help avoid one huge bucket policy for many applications or teams.
- Access points can also be restricted to a VPC for private network access.

How they fit with IAM and bucket policies:
- IAM policies still control what an identity is allowed to request.
- Access point policies control what can be done through that access point.
- The underlying bucket must also allow the request or delegate access control to access points.
- Restrictions on an access point apply only to requests made through that access point.
- Direct bucket access still follows the bucket's normal policy and permissions.

Access point ARN pattern:

```text
arn:aws:s3:region:account-id:accesspoint/access-point-name
```

Object ARN through access point:

```text
arn:aws:s3:region:account-id:accesspoint/access-point-name/object/object-key
```

Good use cases:
- Shared data lake bucket.
- Different teams needing access to different prefixes.
- Separate app-specific permissions.
- VPC-only S3 access patterns.

Beginner rule:

```text
Learn Access Points after IAM policies and bucket policies. Use them when access patterns become shared, complex, or network-specific.
```

Detailed notes:
- `access-points-notes.md`

## Video 55: IAM Vs Bucket Policies

Concept:
- IAM policies are identity-based policies.
- Bucket policies are resource-based policies.
- Both use JSON policy language.
- IAM policies are attached to users, groups, or roles.
- Bucket policies are attached to S3 buckets.
- AWS evaluates all applicable policies together.
- Explicit deny overrides allow.

Simple mental model:

| Policy type | Attached to | Best for |
|---|---|---|
| IAM policy | User, group, or role | What this identity can do |
| Bucket policy | S3 bucket | Who can access this bucket and under what conditions |

Common use cases:
- Use IAM policy when giving an IAM role access to one or more buckets.
- Use bucket policy when the bucket owner wants to control bucket access directly.
- Use bucket policy for cross-account access.
- Use bucket policy for resource-side conditions such as deny non-HTTPS requests.
- Use explicit deny for guardrails.

Access decision reminder:

```text
Final access = identity permissions + resource permissions + conditions - explicit denies.
```

## Video 56: S3 Encryption

Concept:
- S3 encrypts new objects by default with SSE-S3.
- SSE-S3 uses Amazon S3 managed keys.
- SSE-KMS uses AWS KMS keys and gives more key control and auditability.
- SSE-KMS can require KMS permissions in addition to S3 permissions.
- S3 Bucket Keys can reduce KMS request cost for SSE-KMS workloads.
- Client-side encryption means the client encrypts data before sending it to S3.

Beginner encryption options:

| Type | Meaning | Beginner note |
|---|---|---|
| SSE-S3 | S3-managed server-side encryption | Safe default for most labs |
| SSE-KMS | KMS-managed server-side encryption | Use when key control/audit is needed |
| Client-side encryption | App encrypts before upload | Advanced application responsibility |

Hands-on checks:
- View bucket encryption.
- Set bucket default encryption.
- Upload an object with SSE-S3.
- Inspect object encryption with `head-object`.

Important:
- Encryption protects stored data.
- Encryption does not replace IAM, bucket policies, Block Public Access, or network controls.
- If an SSE-KMS object gives `AccessDenied`, check both S3 permissions and KMS permissions.

## Video 57: S3 Block Public Access

Concept:
- S3 Block Public Access is a guardrail that helps prevent public access through ACLs, bucket policies, access point policies, and object permissions.
- It can be applied at account, bucket, access point, and organization levels.
- New S3 buckets are private by default.
- Block Public Access settings can override public policies and public ACLs.

Four settings:

| Setting | Meaning |
|---|---|
| `BlockPublicAcls` | Blocks new public ACLs |
| `IgnorePublicAcls` | Ignores existing public ACLs |
| `BlockPublicPolicy` | Blocks new public bucket/access point policies |
| `RestrictPublicBuckets` | Restricts buckets with public policies to trusted AWS service principals and same-account access |

Beginner rule:

```text
Keep all four Block Public Access settings enabled unless the lab specifically teaches public static website hosting.
```

Troubleshooting mindset:
- If public access fails, that is usually good for beginner labs.
- Do not disable Block Public Access just to fix an access error.
- First check IAM permissions, bucket policies, object ownership, and encryption permissions.

## Existing IAM Read-Only Access Workflow

1. Save the inline policy in `user1-s3-read-only-policy.json`.
2. Attach it to IAM user `user1` from an admin-capable profile.
3. Test bucket listing with `aws s3 ls s3://proj1s3-dev/`.
4. Test object read with `aws s3 cp s3://proj1s3-dev/A2-Glossary.pdf -`.
5. If you no longer need access, remove the inline policy from `user1`.

## Official References

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
