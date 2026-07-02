# Phase 7D: EC2 Instance Profile with S3

Goal:
Let EC2 read from S3 without hardcoded access keys.

## What Did I Build?

A safe EC2-to-S3 access lab using an IAM role and instance profile.

The lab proves:
- EC2 can access S3 without storing access keys on the instance.
- The permissions come from an IAM role.
- The role is passed to EC2 through an instance profile.
- The EC2 instance receives temporary credentials automatically.

## Which AWS Service Did I Use?

- Amazon EC2
- Amazon S3
- AWS IAM roles
- IAM instance profiles

## What Did I Learn?

- IAM users are for people or long-term identities.
- IAM roles are safer for AWS services.
- EC2 uses an instance profile to receive an IAM role.
- Instance profile credentials are temporary and automatically rotated.
- Least privilege still matters: the role should only allow the S3 actions the instance needs.

## How Do I Run It?

Use:
- `iam-policy.json`
- `trust-policy.json`
- `commands.md`
- `workflow.md`
- `cleanup.md`

Recommended beginner flow:

1. Create a private S3 bucket with a test object.
2. Create an IAM role trusted by EC2.
3. Attach a limited S3 read policy to the role.
4. Create or use the matching instance profile.
5. Attach the instance profile to an EC2 instance.
6. SSH or connect to EC2.
7. Run S3 commands from EC2 without `aws configure`.

## How Do I Delete It?

Use `cleanup.md`.

At minimum:
- Remove the instance profile association from EC2.
- Remove the role from the instance profile.
- Delete the instance profile.
- Delete the inline policy.
- Delete the IAM role.
- Delete the S3 bucket and test objects if they were created only for this lab.
