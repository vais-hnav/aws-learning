# IAM Explanation

IAM stands for Identity and Access Management.

Simple meaning:
- IAM controls who can log in or call AWS.
- IAM controls what that person, script, or AWS service is allowed to do.
- IAM is global, so IAM users, groups, policies, and roles are not created inside one Region.

## Root User

The root user is the main owner of the AWS account.

Use root only for account-level tasks, such as:
- enabling MFA for root
- changing account settings
- enabling IAM access to billing
- closing the account

Do not use root for daily AWS work.

Why:
- Root has full power.
- A mistake with root can affect the entire account.
- If root credentials are leaked, the whole account is at risk.

## IAM User

An IAM user is a long-term identity for a person or a tool.

An IAM user can have:
- console password for browser login
- access keys for CLI/API access
- MFA for extra login protection
- permissions attached directly or through groups

Beginner rule:
- Use an IAM user for daily work.
- Keep root locked away.

## Access Keys

Access keys are used by AWS CLI, SDKs, and scripts.

They include:
- access key ID
- secret access key

The secret access key is like a password.

Rules:
- Never commit access keys to GitHub.
- Store real credentials only in the default AWS CLI location, such as `~/.aws/credentials`.
- Delete old or unused access keys.
- Rotate keys if they may have been exposed.

Check current identity:

```bash
AWS_PROFILE=user1 aws sts get-caller-identity
```

## IAM Policy

A policy is a JSON permission document.

It says:
- allow or deny
- which actions are allowed
- which AWS resources are affected

Important fields:
- `Version`
- `Statement`
- `Effect`
- `Action`
- `Resource`

Example meaning:

```json
{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::example-bucket/*"
}
```

This means:
- allow reading objects
- only inside `example-bucket`

More video-aligned JSON examples:
- [`json-examples.md`](./json-examples.md)

## IAM Group

A group is a collection of IAM users.

Why groups are useful:
- You attach permissions once to the group.
- Every user in the group receives those permissions.
- Removing a user from the group removes the group permissions.

Beginner rule:
- Prefer group-based permissions instead of attaching many policies directly to each user.

JSON note:
- Groups do not have a special "group JSON" permission format.
- The permission is still a policy JSON document.
- The difference is where the policy is attached: user, group, or role.

## IAM Role

A role is an identity that can be assumed temporarily.

Common use:
- EC2 assumes a role to access S3.
- Lambda assumes a role to write logs or call other AWS services.

A role usually has two parts:
- trust policy: who can assume the role
- permissions policy: what the role can do after it is assumed

Why roles matter:
- AWS services should use roles instead of stored access keys.
- Temporary credentials are safer than permanent access keys.

Basic EC2 trust policy example:

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

This means:
- EC2 is trusted to assume this role.
- This does not say what EC2 can do after assuming the role.
- A separate permissions policy is still required.

## Least Privilege

Least privilege means giving only the permissions needed for the task.

Bad beginner pattern:

```json
{
  "Action": "*",
  "Resource": "*"
}
```

Better pattern:
- allow only the required service actions
- limit resources by ARN where possible
- use read-only permissions when the task only needs reading
- remove permissions after the lab is complete

## Mental Model

Use this question flow:

1. Who is calling AWS?
2. Is it root, an IAM user, a role, or an AWS service?
3. Which policy applies?
4. Does the policy allow this action?
5. Does the policy allow this specific resource?
6. Is there any explicit deny?

If the answer is not clearly allowed, AWS denies the request.
