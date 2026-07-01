# IAM JSON Examples

These examples match the IAM phase topics:
- policies
- users
- groups
- roles
- access keys
- least privilege

Important:
- These are safe learning examples.
- Replace account IDs, bucket names, user names, and role names before using.
- Do not paste real access keys into this repo.

## 1. Basic IAM Policy Shape

The policy video explains that IAM policies are JSON documents built from `Version`, `Statement`, `Effect`, `Action`, and `Resource`.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "service:ActionName",
      "Resource": "arn:aws:service:::resource-name"
    }
  ]
}
```

Meaning:
- `Version` is the policy language version.
- `Statement` is the list of permission rules.
- `Effect` is usually `Allow` or `Deny`.
- `Action` is the AWS API action.
- `Resource` is where the action is allowed.

## 2. S3 Read-Only Policy

This matches the policy practice in this phase: allow listing a bucket and reading objects from that bucket.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListOnlyThisBucket",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::example-bucket"
    },
    {
      "Sid": "ReadObjectsOnlyInThisBucket",
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::example-bucket/*"
    }
  ]
}
```

Why there are two resources:
- `s3:ListBucket` works on the bucket ARN.
- `s3:GetObject` works on object ARNs inside the bucket.

## 3. EC2 Describe-Only Policy

This is a safe read-only EC2 policy for listing regions and viewing instances.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ViewEC2Only",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeRegions"
      ],
      "Resource": "*"
    }
  ]
}
```

Why `Resource` is `*`:
- Many EC2 `Describe*` actions do not support resource-level permissions.
- This still does not allow creating, stopping, starting, or deleting EC2 instances.

## 4. Policy Attached To A User

The user video shows that an IAM user gets access through attached permissions. The JSON is still a policy document.

Example: a user can view EC2 only.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeRegions",
        "ec2:DescribeAvailabilityZones"
      ],
      "Resource": "*"
    }
  ]
}
```

Use case:
- attach to a learning IAM user that should only inspect EC2
- do not use this for launching EC2

## 5. Policy Attached To A Group

The group video explains that permissions can be attached to a group instead of repeating permissions for every user.

Example: a group can read one S3 bucket.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowGroupToListLearningBucket",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::aws-learning-bucket"
    },
    {
      "Sid": "AllowGroupToReadLearningObjects",
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::aws-learning-bucket/*"
    }
  ]
}
```

Use case:
- attach this policy to a group such as `S3ReadOnlyLearners`
- add users to the group when they need read-only S3 access
- remove users from the group when they no longer need access

## 6. Bad Broad Policy Example

This is the kind of pattern to avoid unless a lab explicitly explains why it is needed.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}
```

Why it is dangerous:
- it allows every action
- it applies to every resource
- it breaks least privilege

## 7. EC2 Role Trust Policy

The roles video explains that a role needs trust. Trust decides who can assume the role.

This example trusts EC2.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "TrustEC2Service",
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Meaning:
- EC2 is allowed to assume this role.
- This is not the role's permission policy.
- This only opens the door for EC2 to use the role.

## 8. EC2 Role Permission Policy For S3 Read

After EC2 is trusted to assume the role, the role still needs permissions.

Example: an EC2 instance role can read one S3 bucket.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowInstanceToListBucket",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::aws-learning-bucket"
    },
    {
      "Sid": "AllowInstanceToReadObjects",
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::aws-learning-bucket/*"
    }
  ]
}
```

Mental model:
- Trust policy: who can use the role?
- Permissions policy: what can the role do?

## 9. Resource-Based S3 Bucket Policy

The policy video description covers identity-based and resource-based policies.

Identity-based policy:
- attached to user, group, or role

Resource-based policy:
- attached directly to the resource, such as an S3 bucket

Example: allow a specific IAM role to read objects from a bucket.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowSpecificRoleToReadObjects",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/AwsLearningS3ReadRole"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::aws-learning-bucket/*"
    }
  ]
}
```

Important:
- Resource-based policies include `Principal`.
- Identity-based permission policies usually do not include `Principal`.

## 10. Explicit Deny Example

Explicit deny overrides allow.

Example: deny deleting objects from a learning bucket.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyObjectDelete",
      "Effect": "Deny",
      "Action": "s3:DeleteObject",
      "Resource": "arn:aws:s3:::aws-learning-bucket/*"
    }
  ]
}
```

Why this matters:
- If another policy allows S3 access, this deny can still block object deletion.
- Deny statements are powerful and can make troubleshooting harder.

## 11. MFA Condition Example

Conditions add extra rules.

Example: allow IAM password change only when MFA is present.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPasswordChangeWithMFA",
      "Effect": "Allow",
      "Action": "iam:ChangePassword",
      "Resource": "arn:aws:iam::123456789012:user/${aws:username}",
      "Condition": {
        "Bool": {
          "aws:MultiFactorAuthPresent": "true"
        }
      }
    }
  ]
}
```

Beginner note:
- Conditions are optional.
- Learn the basic `Effect`, `Action`, and `Resource` pattern first.
- Add conditions when you understand what extra rule you need.

## 12. Access Key JSON Output Example

The user video covers access for users. If access keys are created, AWS returns JSON similar to this.

Never store a real version of this output in GitHub.

```json
{
  "AccessKey": {
    "UserName": "user1",
    "AccessKeyId": "AKIAEXAMPLEONLY1234",
    "Status": "Active",
    "SecretAccessKey": "example/secret/key/do/not/store/real/value",
    "CreateDate": "2026-07-01T00:00:00+00:00"
  }
}
```

Safe rule:
- configure credentials with `aws configure --profile user1`
- keep credentials in `~/.aws/credentials`
- never put real `SecretAccessKey` values in repo files

## 13. CLI Profile Config Example

This is not an IAM policy, but it helps understand how the CLI uses a profile.

Safe placeholder example:

```ini
[profile user1]
region = ap-south-2
output = json
```

Credentials live separately in `~/.aws/credentials`, not in this repo.
