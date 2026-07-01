# IAM Mistakes

These are beginner IAM mistakes to watch for during AWS labs.

## Using Root For Daily Work

Problem:
- Root has full account power.

Why it is risky:
- One wrong click can affect the whole account.
- If root credentials leak, the whole account is exposed.

Better habit:
- Use root only for account-level tasks.
- Use an IAM user for daily AWS practice.

## Not Enabling MFA

Problem:
- Password-only login is easier to compromise.

Better habit:
- Enable MFA for root.
- Enable MFA for important IAM users.

## Committing Access Keys

Problem:
- Access keys in GitHub can be stolen quickly.

Example of JSON that must not be committed with real values:

```json
{
  "AccessKey": {
    "UserName": "user1",
    "AccessKeyId": "AKIAEXAMPLEONLY1234",
    "SecretAccessKey": "example/secret/key/do/not/store/real/value"
  }
}
```

Better habit:
- Keep real credentials in `~/.aws/credentials`.
- Keep `.aws/` and `.env` out of Git.
- Delete and recreate any key that may have been exposed.

## Confusing Access Key ID With Secret Access Key

Problem:
- The access key ID is visible in many places, but the secret access key is shown only once.

Better habit:
- Store credentials through `aws configure --profile PROFILE_NAME`.
- Do not paste secret keys into notes or docs.

## Attaching Policies Directly To Every User

Problem:
- Permissions become hard to track.

Better habit:
- Put users into groups.
- Attach policies to groups when possible.

## Using `Action: "*"` And `Resource: "*"`

Problem:
- This gives very broad access.

Risky JSON:

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

Better habit:
- Use least privilege.
- Start with read-only permissions when possible.
- Limit resources using ARNs.

## Forgetting S3 Bucket ARN vs Object ARN

Problem:
- S3 permissions fail even though the policy looks close.

Common incomplete JSON:

```json
{
  "Effect": "Allow",
  "Action": [
    "s3:ListBucket",
    "s3:GetObject"
  ],
  "Resource": "arn:aws:s3:::example-bucket"
}
```

Why:
- Bucket-level actions use `arn:aws:s3:::bucket-name`.
- Object-level actions use `arn:aws:s3:::bucket-name/*`.

Better JSON:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::example-bucket"
    },
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::example-bucket/*"
    }
  ]
}
```

Better habit:
- Include the correct ARN type for the action.

## Thinking A Role And User Are The Same

Problem:
- Users are long-term identities.
- Roles are assumed temporarily.

Better habit:
- Use users for people.
- Use roles for AWS services like EC2 and Lambda.

## Forgetting Role Trust Policy

Problem:
- A role has permissions, but nothing can assume it.

Trust policy JSON example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Why:
- The trust policy says who is allowed to use the role.

Better habit:
- Check both the trust policy and the permissions policy.

Role permission policy JSON example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::example-bucket/*"
    }
  ]
}
```

## Putting Access Keys On EC2

Problem:
- Long-term credentials on a server can leak.

Better habit:
- Use an IAM role / instance profile for EC2.
- Let AWS provide temporary credentials to the instance.

## Not Checking Which Profile Is Active

Problem:
- Commands run as the wrong IAM user.

Better habit:

```bash
AWS_PROFILE=user1 aws sts get-caller-identity
```

Use explicit profiles while learning.

## Deleting IAM Resources Too Quickly

Problem:
- You might remove access that another lab depends on.

Better habit:
- Check attachments before deleting policies.
- Check users before deleting groups.
- Check service dependencies before deleting roles.
