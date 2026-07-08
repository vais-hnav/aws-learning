# S3 Data Protection And Security Lab

Use this folder to practice S3 data protection and security safely.

This lab covers:
- S3 data protection and durability concepts.
- S3 Versioning recovery.
- S3 Cross-Region Replication concepts and cleanup.
- S3 Object Lock safety.
- S3 security baseline.
- IAM read-only access for `user1`.

## What Did I Build?

A beginner-safe S3 protection and security lab.

The hands-on parts are intentionally scoped:
- Versioning recovery can be practiced with a temporary bucket and test prefix.
- Replication is documented with a cost-aware workflow and cleanup checklist.
- Object Lock is documented as a caution-first concept because it can make objects hard or impossible to delete during retention.
- `user1` read-only access uses a narrow IAM inline policy.

## Which AWS Service Did I Use?

- Amazon S3
- IAM
- AWS CLI

## What Did I Learn?

- S3 is highly durable, but data protection also means defending against accidental deletes, overwrites, and insecure access.
- Versioning helps recover older object versions and delete-marker deletes.
- Replication can protect or distribute data, but it can duplicate storage cost.
- Object Lock protects object versions with WORM behavior.
- Most beginner buckets should stay private with Block Public Access enabled.

## Existing IAM Read-Only Policy Lab

Goal:
- Let `user1` list the bucket `proj1s3-dev`
- Let `user1` read objects from that bucket
- Keep the permission as small as possible

Policy file:
- [`user1-s3-read-only-policy.json`](./user1-s3-read-only-policy.json)

Attach it to `user1` with:
```bash
AWS_PROFILE=<admin-profile> aws iam put-user-policy \
  --user-name user1 \
  --policy-name Proj1S3DevReadOnly \
  --policy-document file://phase-07-s3-ec2-instance-profile/phase-7c-s3-data-protection-security/security-lab/user1-s3-read-only-policy.json
```

Test it with:
```bash
AWS_PROFILE=user1 aws s3 ls s3://proj1s3-dev/
AWS_PROFILE=user1 aws s3 cp s3://proj1s3-dev/A2-Glossary.pdf -
```

If the object is encrypted with KMS, you may also need `kms:Decrypt` permission for the matching key.
Use the same admin-capable profile to remove the policy later.

## How Do I Run It?

Use:
- `commands.md` for repeatable CLI commands.
- `workflow.md` for concept-by-concept video notes.
- `bucket-policy-examples.json` for safe bucket policy patterns to review.

## How Do I Delete It?

Use `cleanup.md`.

At minimum:
- Delete test object versions and delete markers.
- Remove replication rules from test buckets.
- Delete destination test objects.
- Remove the `user1` inline policy if it is no longer needed.
