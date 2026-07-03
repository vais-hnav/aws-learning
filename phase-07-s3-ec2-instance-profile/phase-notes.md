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

## Official References

- https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-folders.html
- https://docs.aws.amazon.com/cli/latest/reference/s3api/list-objects-v2.html
- https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html
- https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
